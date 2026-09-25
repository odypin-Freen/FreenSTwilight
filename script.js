// Language toggle and tap feedback for external links.
(() => {
  const translations = {
    en: {
      pageTitle: "FREEN — Fan Page by Ody",
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
      changeLanguage: "Change language to Spanish"
    },
    es: {
      pageTitle: "FREEN — Página de fans de Ody",
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
      changeLanguage: "Cambiar el idioma a inglés"
    }
  };
  const root = document.documentElement;
  const toggle = document.querySelector("#language-toggle");
  const applyLanguage = (language) => {
    const lang = language === "es" ? "es" : "en";
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
    if (toggle) {
      toggle.textContent = lang === "en" ? "ES" : "EN";
      toggle.setAttribute("aria-pressed", String(lang === "es"));
      toggle.setAttribute("aria-label", words.changeLanguage);
    }
    localStorage.setItem("freen-language", lang);
    document.dispatchEvent(new CustomEvent("freen-language-change", { detail: { language: lang } }));
  };
  window.freenTranslate = (key) => translations[root.lang === "es" ? "es" : "en"][key];
  const savedLanguage = localStorage.getItem("freen-language");
  applyLanguage(savedLanguage === "es" ? "es" : "en");
  toggle?.addEventListener("click", () => applyLanguage(root.lang === "en" ? "es" : "en"));
})();

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener("click", () => {
    link.classList.add("is-clicked");
    window.setTimeout(() => link.classList.remove("is-clicked"), 140);
  });
});
