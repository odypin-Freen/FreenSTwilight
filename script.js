// Language toggle and tap feedback for external links.
(() => {
  const translations = {
    en: {
      pageTitle: "FREEN — Fan Page by Ody",
      fanPage: "FAN PAGE", galleryHeading: "Gallery", featured: "♡ FEATURED ♡", communityHeading: "Community", communitySticker: "♡ COMMUNITY", linksHeading: "Favorite Links", footerCredit: "Made with ♡ · Ody’s fan project ·", admin: "Admin",
      navLabel: "Main navigation",
      navVideo: "Video", navGallery: "Gallery", navCommunity: "Community", navLinks: "Links",
      eyebrow: "A FAN PAGE MADE WITH LOVE",
      tagline: "A little corner of love dedicated to Freen Sarocha Chankimha.",
      watchVideo: "WATCH VIDEO", heroNote: "all the love ♡",
      galleryIntro: "A few favorite moments, collected with love.",
      galleryTip: "A collection of favorite moments, shared with love.",
      communityIntro: "Share a favorite event memory with the fan community.",
      yourName: "Your name", optional: "(optional)", anonymous: "Anonymous fan",
      yourMessage: "Your message", messagePlaceholder: "Leave a kind message about the event…",
      eventPhoto: "Event photo",
      photoHint: "JPG, PNG, or WebP · up to 6 MB. Please upload a photo you have permission to share.",
      consent: "I understand my photo and message will be visible publicly if approved.",
      sendReview: "SEND FOR REVIEW", privateUntilApproval: "Your post and photo stay private until approved by Ody.",
      approvedMoments: "Approved moments", loadingPosts: "Loading approved posts…",
      changeLanguage: "Change language to Spanish", languageGroup: "Choose language"
    },
    es: {
      pageTitle: "FREEN — Página de fans de Ody",
      fanPage: "PÁGINA DE FANS", galleryHeading: "Galería", featured: "♡ DESTACADO ♡", communityHeading: "Comunidad", communitySticker: "♡ COMUNIDAD", linksHeading: "Enlaces favoritos", footerCredit: "Hecho con ♡ · Proyecto de fans de Ody ·", admin: "Administración",
      navLabel: "Navegación principal",
      navVideo: "Video", navGallery: "Galería", navCommunity: "Comunidad", navLinks: "Enlaces",
      eyebrow: "UNA PÁGINA DE FANS HECHA CON AMOR",
      tagline: "Un rinconcito lleno de cariño para Freen Sarocha Chankimha.",
      watchVideo: "VER VIDEO", heroNote: "todo mi cariño ♡",
      galleryIntro: "Algunos momentos favoritos, recopilados con mucho cariño.",
      galleryTip: "Una colección de momentos favoritos, compartidos con cariño.",
      communityIntro: "Comparte tus momentos favoritos del evento.",
      yourName: "Tu nombre", optional: "(opcional)", anonymous: "Fan anónimo",
      yourMessage: "Tu mensaje", messagePlaceholder: "Deja un mensaje amable sobre el evento…",
      eventPhoto: "Foto del evento",
      photoHint: "JPG, PNG o WebP · hasta 6 MB. Sube una foto que tengas permiso para compartir.",
      consent: "Entiendo que mi foto y mi mensaje serán públicos si se aprueban.",
      sendReview: "ENVIAR PARA REVISIÓN", privateUntilApproval: "Tu publicación y foto serán privadas hasta que Ody las apruebe.",
      approvedMoments: "Momentos aprobados", loadingPosts: "Cargando publicaciones aprobadas…",
      changeLanguage: "Cambiar el idioma a tailandés", languageGroup: "Selecciona el idioma"
    },
    th: {
      pageTitle: "FREEN — แฟนเพจโดย Ody",
      fanPage: "แฟนเพจ", galleryHeading: "แกลเลอรี", featured: "♡ ไฮไลต์ ♡", communityHeading: "ชุมชน", communitySticker: "♡ ชุมชน", linksHeading: "ลิงก์โปรด", footerCredit: "สร้างด้วย ♡ · โปรเจกต์แฟนคลับของ Ody ·", admin: "ผู้ดูแล",
      navLabel: "เมนูหลัก", navVideo: "วิดีโอ", navGallery: "แกลเลอรี", navCommunity: "ชุมชน", navLinks: "ลิงก์",
      eyebrow: "แฟนเพจที่สร้างขึ้นด้วยความรัก",
      tagline: "มุมเล็กๆ ที่เต็มไปด้วยความรักและมอบให้ Freen Sarocha Chankimha",
      watchVideo: "ดูวิดีโอ", heroNote: "รักและคิดถึงเสมอ ♡",
      galleryIntro: "รวมช่วงเวลาโปรดที่เก็บไว้ด้วยความรัก",
      galleryTip: "คอลเลกชันช่วงเวลาโปรดที่แบ่งปันด้วยความรัก",
      communityIntro: "แบ่งปันช่วงเวลาที่คุณประทับใจจากงานกับแฟนๆ",
      yourName: "ชื่อของคุณ", optional: "(ไม่บังคับ)", anonymous: "แฟนคลับนิรนาม",
      yourMessage: "ข้อความของคุณ", messagePlaceholder: "ฝากข้อความดีๆ เกี่ยวกับงานไว้ได้เลย…",
      eventPhoto: "รูปจากงาน",
      photoHint: "JPG, PNG หรือ WebP · ขนาดไม่เกิน 6 MB กรุณาอัปโหลดรูปที่คุณได้รับอนุญาตให้แบ่งปัน",
      consent: "ฉันเข้าใจว่ารูปและข้อความของฉันจะเผยแพร่ต่อสาธารณะหากได้รับอนุมัติ",
      sendReview: "ส่งให้ตรวจสอบ", privateUntilApproval: "โพสต์และรูปของคุณจะยังเป็นส่วนตัวจนกว่า Ody จะอนุมัติ",
      approvedMoments: "ช่วงเวลาที่อนุมัติแล้ว", loadingPosts: "กำลังโหลดโพสต์ที่อนุมัติแล้ว…",
      changeLanguage: "เปลี่ยนภาษาเป็นอังกฤษ", languageGroup: "เลือกภาษา"
    }
  };
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll(".language-option");
  const applyLanguage = (language) => {
    const lang = translations[language] ? language : "en";
    const words = translations[lang];
    root.lang = lang;
    document.title = words.pageTitle;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = words[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const value = words[element.dataset.i18nPlaceholder];
      if (value) element.placeholder = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = words[element.dataset.i18nAria];
      if (value) element.setAttribute("aria-label", value);
    });
    languageButtons.forEach((button) => {
      const selected = button.dataset.language === lang;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    localStorage.setItem("freen-language", lang);
    document.dispatchEvent(new CustomEvent("freen-language-change", { detail: { language: lang } }));
  };
  window.freenTranslate = (key) => translations[root.lang]?.[key] || translations.en[key];
  const savedLanguage = localStorage.getItem("freen-language");
  applyLanguage(translations[savedLanguage] ? savedLanguage : "en");
  languageButtons.forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.language)));
})();

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener("click", () => {
    link.classList.add("is-clicked");
    window.setTimeout(() => link.classList.remove("is-clicked"), 140);
  });
});


// Rotate the hero photo through the gallery every 10 seconds.
(() => {
  const heroImage = document.querySelector(".hero-art img");
  const galleryImages = [...document.querySelectorAll(".gallery-grid img")];
  if (!heroImage || galleryImages.length < 2) return;

  // Five evenly spaced gallery photos, keeping the hero rotation concise.
  const heroPhotoIndexes = [0, 6, 12, 18, 24];
  const photos = [...new Set(heroPhotoIndexes
    .map((photoIndex) => galleryImages[photoIndex]?.getAttribute("src"))
    .filter(Boolean))]
    .filter((src) => new URL(src, document.baseURI).href !== new URL(heroImage.getAttribute("src"), document.baseURI).href);
  if (!photos.length) return;

  let index = 0;
  const showNextPhoto = () => {
    if (document.hidden) return;
    const src = photos[index % photos.length];
    index += 1;
    const preload = new Image();
    preload.onload = () => {
      heroImage.classList.add("is-changing");
      window.setTimeout(() => {
        heroImage.src = src;
        heroImage.alt = document.documentElement.lang === "es"
          ? "Foto de Freen Sarocha de la galería"
          : document.documentElement.lang === "th"
            ? "รูป Freen Sarocha จากแกลเลอรี"
            : "Freen Sarocha photo from the gallery";
        requestAnimationFrame(() => heroImage.classList.remove("is-changing"));
      }, 180);
    };
    preload.src = src;
  };

  window.setInterval(showNextPhoto, 10000);
})();


// Give every gallery photo a decorated label in a shuffled order each visit.
(() => {
  const labels = ["🌷 Tulip", "Freen ❤️", "Suey Mak 😍", "Sarooo ❤️"];
  const stickers = [...document.querySelectorAll(".gallery-label")];
  const shuffledLabels = [];

  while (shuffledLabels.length < stickers.length) {
    const batch = [...labels];
    for (let i = batch.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [batch[i], batch[j]] = [batch[j], batch[i]];
    }
    shuffledLabels.push(...batch);
  }

  stickers.forEach((sticker, index) => {
    sticker.textContent = shuffledLabels[index];
  });
})();
