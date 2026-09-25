import { createClient } from "npm:@supabase/supabase-js@2";

const URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BUCKET = "community-pending";
const allowedOrigins = (Deno.env.get("SITE_ORIGINS") || "").split(",").map((v) => v.trim()).filter(Boolean);
const db = createClient(URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
function cors(origin: string | null) {
  if (allowedOrigins.length && origin && !allowedOrigins.includes(origin)) return null;
  return { "Access-Control-Allow-Origin": allowedOrigins.length ? (origin || allowedOrigins[0]) : "*", "Access-Control-Allow-Headers": "apikey", "Access-Control-Allow-Methods": "GET, OPTIONS", "Vary": "Origin" };
}
Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (!headers) return Response.json({ error: "Origin not allowed." }, { status: 403, headers: { "Vary": "Origin" } });
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "GET") return Response.json({ error: "Method not allowed." }, { status: 405, headers });
  const { data, error } = await db.from("community_posts").select("id, display_name, message, image_path, created_at").eq("status", "approved").order("created_at", { ascending: false }).limit(60);
  if (error) { console.error("list-approved failed", error); return Response.json({ error: "Could not load approved posts." }, { status: 500, headers }); }
  const posts = await Promise.all((data || []).map(async (post) => {
    const { data: signed, error: signError } = await db.storage.from(BUCKET).createSignedUrl(post.image_path, 1800);
    return signError ? null : { id: post.id, display_name: post.display_name, message: post.message, created_at: post.created_at, image_url: signed.signedUrl };
  }));
  return Response.json({ posts: posts.filter(Boolean) }, { headers: { ...headers, "Cache-Control": "no-store" } });
});
