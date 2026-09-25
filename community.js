import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const config = window.SUPABASE_CONFIG || {};
const form = document.querySelector("#post-form");
const feed = document.querySelector("#community-feed");
const status = document.querySelector("#post-status");
const submitButton = form?.querySelector("button[type=submit]");
const configReady = config.url && config.publishableKey && !config.url.includes("YOUR_PROJECT_REF") && !config.publishableKey.includes("YOUR_SUPABASE");

function setStatus(message, state = "info") {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

function showSetupMessage() {
  if (feed) feed.innerHTML = "";
  const message = document.createElement("p");
  message.className = "feed-empty";
  message.textContent = "Community posts will appear here once the site is connected to its moderation service.";
  feed?.append(message);
  setStatus("Submissions are not active yet. The site owner needs to finish the Supabase setup first.");
}

if (!configReady) {
  showSetupMessage();
  form?.querySelectorAll("input, textarea, button").forEach((control) => { control.disabled = true; });
} else {
  const endpoint = `${config.url.replace(/\/$/, "")}/functions/v1`;

  async function loadApprovedPosts() {
    try {
      const response = await fetch(`${endpoint}/list-approved`, { headers: { apikey: config.publishableKey } });
      if (!response.ok) throw new Error("Could not load approved posts.");
      const { posts = [] } = await response.json();
      feed.replaceChildren();
      if (!posts.length) {
        const empty = document.createElement("p");
        empty.className = "feed-empty";
        empty.textContent = "No approved event posts yet. Be the first to share a memory!";
        feed.append(empty);
        return;
      }
      for (const post of posts) {
        const card = document.createElement("figure");
        card.className = "post-card";
        const image = document.createElement("img");
        image.src = post.image_url;
        image.alt = `Photo shared by ${post.display_name || "a fan"}`;
        image.loading = "lazy";
        const caption = document.createElement("figcaption");
        const author = document.createElement("p");
        author.className = "post-author";
        author.textContent = post.display_name || "Anonymous fan";
        const message = document.createElement("p");
        message.className = "post-message";
        message.textContent = post.message;
        caption.append(author, message);
        card.append(image, caption);
        feed.append(card);
      }
    } catch (error) {
      feed.replaceChildren();
      const message = document.createElement("p");
      message.className = "feed-empty";
      message.textContent = "Approved posts could not load right now. Please try again later.";
      feed.append(message);
      console.error(error);
    }
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const image = fields.get("photo");
    if (!(image instanceof File) || image.size === 0) { setStatus("Choose a photo to include with your message.", "error"); return; }
    if (image.size > 6 * 1024 * 1024) { setStatus("That photo is larger than 6 MB. Please choose a smaller image.", "error"); return; }
    submitButton.disabled = true;
    setStatus("Sending your post for review…");
    try {
      const response = await fetch(`${endpoint}/submit-post`, { method: "POST", headers: { apikey: config.publishableKey }, body: fields });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your post could not be submitted.");
      form.reset();
      setStatus("Thanks! Your message and photo are private while Ody reviews them.", "success");
    } catch (error) {
      setStatus(error.message || "Your post could not be submitted. Please try again.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  loadApprovedPosts();
}
