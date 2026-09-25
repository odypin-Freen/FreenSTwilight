import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cfg = window.SUPABASE_CONFIG || {};
const ready = cfg.url && cfg.publishableKey && !cfg.url.includes("YOUR_PROJECT_REF") && !cfg.publishableKey.includes("YOUR_SUPABASE");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");
const panel = document.querySelector("#review-panel");
const list = document.querySelector("#review-list");
const count = document.querySelector("#review-count");

if (!ready) {
  loginStatus.textContent = "Connect the Supabase project in supabase-config.js before using the review dashboard.";
  loginForm.querySelector("button").disabled = true;
} else {
  const supabase = createClient(cfg.url, cfg.publishableKey);
  const say = (message, state = "info") => { loginStatus.textContent = message; loginStatus.dataset.state = state; };

  async function showQueue() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    loginForm.hidden = true;
    panel.hidden = false;
    const { data, error } = await supabase.from("community_posts").select("id, display_name, message, image_path, created_at").eq("status", "pending").order("created_at", { ascending: true });
    if (error) {
      list.textContent = "Could not load the queue. Check that this account is listed as a community admin.";
      count.textContent = "";
      return;
    }
    list.replaceChildren();
    count.textContent = `${data.length} awaiting review`;
    if (!data.length) { const empty = document.createElement("p"); empty.className = "review-message"; empty.textContent = "The queue is clear. New fan submissions will appear here."; list.append(empty); return; }
    for (const post of data) {
      const { data: signed } = await supabase.storage.from("community-pending").createSignedUrl(post.image_path, 600);
      const article = document.createElement("article"); article.className = "review-card";
      const image = document.createElement("img"); image.src = signed?.signedUrl || ""; image.alt = "Submitted fan photo";
      const details = document.createElement("div");
      const author = document.createElement("h3"); author.textContent = post.display_name || "Anonymous fan";
      const message = document.createElement("p"); message.textContent = post.message;
      const date = document.createElement("p"); date.className = "review-meta"; date.textContent = new Date(post.created_at).toLocaleString();
      const actions = document.createElement("div"); actions.className = "review-actions";
      const approve = document.createElement("button"); approve.className = "button approve-button"; approve.type = "button"; approve.textContent = "APPROVE";
      const reject = document.createElement("button"); reject.className = "button reject-button"; reject.type = "button"; reject.textContent = "REJECT";
      approve.addEventListener("click", () => review(post, "approved", approve, reject));
      reject.addEventListener("click", () => review(post, "rejected", approve, reject));
      actions.append(approve, reject); details.append(author, date, message, actions); article.append(image, details); list.append(article);
    }
  }

  async function review(post, decision, approve, reject) {
    approve.disabled = reject.disabled = true;
    if (decision === "rejected") {
      const { error: storageError } = await supabase.storage.from("community-pending").remove([post.image_path]);
      if (storageError) { say("Could not remove the rejected photo; the post remains pending.", "error"); approve.disabled = reject.disabled = false; return; }
    }
    const { error } = await supabase.from("community_posts").update({ status: decision, reviewed_at: new Date().toISOString() }).eq("id", post.id);
    if (error) { say("Could not save the review decision. Check admin permissions.", "error"); approve.disabled = reject.disabled = false; return; }
    say(decision === "approved" ? "Post approved and now visible on the page." : "Post rejected and its photo removed.", "success");
    await showQueue();
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = loginForm.querySelector("button"); button.disabled = true; say("Signing in…");
    const { error } = await supabase.auth.signInWithPassword({ email: document.querySelector("#admin-email").value.trim(), password: document.querySelector("#admin-password").value });
    button.disabled = false;
    if (error) { say("Sign-in failed. Check the email and password, then try again.", "error"); return; }
    await showQueue();
  });
  document.querySelector("#sign-out").addEventListener("click", async () => { await supabase.auth.signOut(); panel.hidden = true; loginForm.hidden = false; say("Signed out."); });
  showQueue();
}
