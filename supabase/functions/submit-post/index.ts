import { createClient } from "npm:@supabase/supabase-js@2";

const URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const HASH_SECRET = Deno.env.get("SUBMISSION_HASH_SECRET")!;
const BUCKET = "community-pending";
const maxBytes = 6 * 1024 * 1024;
const allowedOrigins = (Deno.env.get("SITE_ORIGINS") || "").split(",").map((v) => v.trim()).filter(Boolean);
const db = createClient(URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

function cors(origin: string | null) {
  if (allowedOrigins.length && origin && !allowedOrigins.includes(origin)) return null;
  return { "Access-Control-Allow-Origin": allowedOrigins.length ? (origin || allowedOrigins[0]) : "*", "Access-Control-Allow-Headers": "apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
}
function json(body: unknown, status: number, headers: Record<string,string>) { return new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" } }); }
async function sha256(value: string) { const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)); return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2,"0")).join(""); }
function validImage(bytes: Uint8Array, type: string) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.slice(0,8).join(",") === "137,80,78,71,13,10,26,10";
  if (type === "image/webp") return new TextDecoder().decode(bytes.slice(0,4)) === "RIFF" && new TextDecoder().decode(bytes.slice(8,12)) === "WEBP";
  return false;
}
Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (!headers) return json({ error: "This site is not allowed to submit posts." }, 403, { "Vary": "Origin" });
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, headers);
  try {
    const form = await req.formData();
    if (String(form.get("website") || "").trim()) return json({ ok: true }, 202, headers); // Honeypot
    const displayName = String(form.get("name") || "Anonymous fan").trim() || "Anonymous fan";
    const message = String(form.get("message") || "").trim();
    const image = form.get("photo");
    if (displayName.length > 40 || message.length < 2 || message.length > 500) return json({ error: "Name or message is outside the allowed length." }, 400, headers);
    if (!(image instanceof File) || image.size === 0 || image.size > maxBytes) return json({ error: "Choose an image up to 6 MB." }, 400, headers);
    const bytes = new Uint8Array(await image.arrayBuffer());
    if (!validImage(bytes, image.type)) return json({ error: "Use a valid JPG, PNG, or WebP image." }, 400, headers);
    const clientIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const keyHash = await sha256(`${HASH_SECRET}:${clientIp}`);
    const { data: allowed, error: rateError } = await db.rpc("consume_community_rate_limit", { p_key_hash: keyHash });
    if (rateError) throw rateError;
    if (!allowed) return json({ error: "Please wait before sending another post." }, 429, headers);
    const ext = image.type === "image/jpeg" ? "jpg" : image.type === "image/png" ? "png" : "webp";
    const imagePath = `pending/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await db.storage.from(BUCKET).upload(imagePath, bytes, { contentType: image.type, upsert: false });
    if (uploadError) throw uploadError;
    const { data: post, error: insertError } = await db.from("community_posts").insert({ display_name: displayName, message, image_path: imagePath, status: "pending" }).select("id").single();
    if (insertError) { await db.storage.from(BUCKET).remove([imagePath]); throw insertError; }
    return json({ ok: true, id: post.id }, 202, headers);
  } catch (error) {
    console.error("submit-post failed", error);
    return json({ error: "The post could not be submitted right now." }, 500, headers);
  }
});
