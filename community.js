import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const config = window.SUPABASE_CONFIG || {};
const form = document.querySelector("#post-form");
const feed = document.querySelector("#community-feed");
const status = document.querySelector("#post-status");
const submitButton = form?.querySelector("button[type=submit]");
const configReady = config.url && config.publishableKey && !config.url.includes("YOUR_PROJECT_REF") && !config.publishableKey.includes("YOUR_SUPABASE");

const messages = {
  en: {
    translatePost: "Translate to English with Google Translate",
    setup: "Community posts will appear here once the site is connected to its moderation service.",
    inactive: "Submissions are not active yet. The site owner needs to finish the Supabase setup first.",
    loadError: "Could not load approved posts.",
    empty: "No approved event posts yet. Be the first to share a memory!",
    anonymous: "Anonymous fan",
    loadingError: "Approved posts could not load right now. Please try again later.",
    choosePhoto: "Choose a photo to include with your message.",
    tooLarge: "That photo is larger than 6 MB. Please choose a smaller image.",
    sending: "Sending your post for review…",
    submitError: "Your post could not be submitted.",
    thanks: "Thanks! Your message and photo are private while Ody reviews them.",
    tryAgain: "Your post could not be submitted. Please try again."
  },
  es: {
    translatePost: "Traducir al español con Google Translate",
    setup: "Las publicaciones de la comunidad aparecerán aquí cuando el sitio se conecte al servicio de moderación.",
    inactive: "Los envíos aún no están activos. La persona administradora debe terminar la configuración de Supabase.",
    loadError: "No se pudieron cargar las publicaciones aprobadas.",
    empty: "Aún no hay publicaciones aprobadas del evento. ¡Comparte tu recuerdo!",
    anonymous: "Fan anónimo",
    loadingError: "No se pudieron cargar las publicaciones aprobadas. Inténtalo más tarde.",
    choosePhoto: "Elige una foto para incluir con tu mensaje.",
    tooLarge: "La foto supera los 6 MB. Elige una imagen más pequeña.",
    sending: "Enviando tu publicación para revisión…",
    submitError: "No se pudo enviar tu publicación.",
    thanks: "¡Gracias! Tu mensaje y tu foto serán privados mientras Ody los revisa.",
    tryAgain: "No se pudo enviar tu publicación. Inténtalo de nuevo."
  },
  th: {
    translatePost: "แปลเป็นภาษาไทยด้วย Google Translate",
    setup: "โพสต์จากชุมชนจะแสดงที่นี่เมื่อเว็บไซต์เชื่อมต่อกับระบบตรวจสอบแล้ว",
    inactive: "ขณะนี้ยังไม่เปิดรับโพสต์ ผู้ดูแลเว็บไซต์ต้องตั้งค่า Supabase ให้เสร็จก่อน",
    loadError: "โหลดโพสต์ที่อนุมัติแล้วไม่สำเร็จ",
    empty: "ยังไม่มีโพสต์จากงานที่ได้รับอนุมัติ มาแบ่งปันความทรงจำกันเป็นคนแรกเลย!",
    anonymous: "แฟนคลับนิรนาม",
    loadingError: "ขณะนี้โหลดโพสต์ที่อนุมัติแล้วไม่ได้ โปรดลองอีกครั้งภายหลัง",
    choosePhoto: "เลือกรูปเพื่อแนบไปกับข้อความ",
    tooLarge: "รูปมีขนาดเกิน 6 MB โปรดเลือกรูปที่มีขนาดเล็กกว่า",
    sending: "กำลังส่งโพสต์ให้ตรวจสอบ…",
    submitError: "ส่งโพสต์ไม่สำเร็จ",
    thanks: "ขอบคุณ! ข้อความและรูปของคุณจะยังเป็นส่วนตัวระหว่างที่ Ody ตรวจสอบ",
    tryAgain: "ส่งโพสต์ไม่สำเร็จ โปรดลองอีกครั้ง"
  }
};
const t = (key) => (messages[document.documentElement.lang]?.[key] || messages.en[key]);
function googleTranslateUrl(text, language = document.documentElement.lang) {
  const url = new URL("https://translate.google.com/");
  url.searchParams.set("sl", "auto");
  url.searchParams.set("tl", ["en", "es", "th"].includes(language) ? language : "en");
  url.searchParams.set("text", text);
  url.searchParams.set("op", "translate");
  return url.href;
}

function setStatus(message, state = "info") {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

function showSetupMessage() {
  if (feed) feed.innerHTML = "";
  const message = document.createElement("p");
  message.className = "feed-empty";
  message.dataset.communityMessage = "setup";
  message.textContent = t("setup");
  feed?.append(message);
  setStatus(t("inactive"));
}

if (!configReady) {
  showSetupMessage();
  form?.querySelectorAll("input, textarea, button").forEach((control) => { control.disabled = true; });
} else {
  const endpoint = `${config.url.replace(/\/$/, "")}/functions/v1`;

  async function loadApprovedPosts() {
    try {
      const response = await fetch(`${endpoint}/list-approved`, { headers: { apikey: config.publishableKey } });
      if (!response.ok) throw new Error(t("loadError"));
      const { posts = [] } = await response.json();
      feed.replaceChildren();
      if (!posts.length) {
        const empty = document.createElement("p");
        empty.className = "feed-empty";
        empty.dataset.communityMessage = "empty";
        empty.textContent = t("empty");
        feed.append(empty);
        return;
      }
      for (const post of posts) {
        const card = document.createElement("figure");
        card.className = "post-card";
        const image = document.createElement("img");
        image.src = post.image_url;
        image.alt = `${document.documentElement.lang === "es" ? "Foto compartida por" : document.documentElement.lang === "th" ? "รูปที่แบ่งปันโดย" : "Photo shared by"} ${post.display_name || t("anonymous")}`;
        image.loading = "lazy";
        const caption = document.createElement("figcaption");
        const author = document.createElement("p");
        author.className = "post-author";
        author.textContent = post.display_name || t("anonymous");
        const message = document.createElement("p");
        message.className = "post-message";
        message.textContent = post.message;
        const translateLink = document.createElement("a");
        translateLink.className = "post-translate-link";
        translateLink.href = googleTranslateUrl(post.message);
        translateLink.target = "_blank";
        translateLink.rel = "noopener noreferrer";
        translateLink.dataset.translateText = post.message;
        translateLink.textContent = t("translatePost");
        caption.append(author, message, translateLink);
        card.append(image, caption);
        feed.append(card);
      }
    } catch (error) {
      feed.replaceChildren();
      const message = document.createElement("p");
      message.className = "feed-empty";
      message.dataset.communityMessage = "loadingError";
      message.textContent = t("loadingError");
      feed.append(message);
      console.error(error);
    }
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const image = fields.get("photo");
    if (!(image instanceof File) || image.size === 0) { setStatus(t("choosePhoto"), "error"); return; }
    if (image.size > 6 * 1024 * 1024) { setStatus(t("tooLarge"), "error"); return; }
    submitButton.disabled = true;
    setStatus(t("sending"));
    try {
      const response = await fetch(`${endpoint}/submit-post`, { method: "POST", headers: { apikey: config.publishableKey }, body: fields });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || t("submitError"));
      form.reset();
      setStatus(t("thanks"), "success");
    } catch (error) {
      setStatus(error.message || t("tryAgain"), "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  loadApprovedPosts();
}

document.addEventListener("freen-language-change", () => {
  feed?.querySelectorAll(".post-translate-link").forEach((link) => {
    link.href = googleTranslateUrl(link.dataset.translateText || "");
    link.textContent = t("translatePost");
  });
  const message = feed?.querySelector("[data-community-message]");
  if (message) message.textContent = t(message.dataset.communityMessage);
  if (status?.dataset.state === "info" || status?.dataset.state === "success") {
    status.textContent = document.documentElement.lang === "es"
      ? "Tu publicación y foto permanecerán privadas hasta que Ody las apruebe."
      : document.documentElement.lang === "th"
        ? "โพสต์และรูปของคุณจะยังเป็นส่วนตัวจนกว่า Ody จะอนุมัติ"
        : "Your post and photo stay private until approved by Ody.";
  }
});
