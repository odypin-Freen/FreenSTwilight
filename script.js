// Language toggle and tap feedback for external links.
(() => {
  const translations = {
    en: {
      pageTitle: "FREEN — Fan Page by Ody",
      fanPage: "FAN PAGE", galleryHeading: "Gallery", featured: "♡ FEATURED ♡", communityHeading: "Community", communitySticker: "♡ COMMUNITY", linksHeading: "Favorite Links", footerCredit: "Made with ♡ · Fan project ·", admin: "Admin",
      footerMessage: "I created this page so we can have a place to share our memories of the CDMX 2026 event graciously made happen for Mexican Fans. I hope you enjoy this space and respectfully post your thoughts and pictures. Profanity and hate will not be tolerated; this space is only for love for the fandom and for Freen.",
      navLegal: "Legal Notice",
      legalHeading: "Legal Notice", legalIntro: "Information about ownership, fan submissions, and use of media on this independent fan page.",
      legalOwnershipHeading: "Copyright and ownership", legalOwnership: "Photos and video clips credited to Solenn Entertainment are attributed to Solenn Entertainment and/or the applicable rights holders. Other photos, videos, and playlist music remain the property of their respective copyright owners. No ownership of third-party material is claimed.",
      legalFanHeading: "Fan-submitted photos", legalFan: "Fan-submitted photos are displayed for fan appreciation only and remain the property of their respective rights holders. By submitting a photo, contributors confirm they have the necessary rights or permission to share it and authorize its public display if approved.",
      legalProjectHeading: "Independent fan project", legalProject: "This is an independent, noncommercial fan project created to express Mexican fans’ appreciation and love for Freen Sarocha. It is not affiliated with, sponsored by, or endorsed by Freen Sarocha or Solenn Entertainment.",
      legalPermissionsHeading: "Permissions and reuse", legalPermissions: "This notice does not grant a license or permission to reproduce, repost, or otherwise reuse any content. A noncommercial purpose or disclaimer alone does not establish that a use is legally authorized. Please obtain permission from the relevant rights holder before reusing material.",
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
      fanPage: "PÁGINA DE FANS", galleryHeading: "Galería", featured: "♡ DESTACADO ♡", communityHeading: "Comunidad", communitySticker: "♡ COMUNIDAD", linksHeading: "Enlaces favoritos", footerCredit: "Hecho con ♡ · Proyecto de fans ·", admin: "Administración",
      footerMessage: "Creé esta página para que tengamos un lugar donde compartir nuestros recuerdos del evento CDMX 2026, hecho posible generosamente para los fans mexicanos. Espero que disfrutes este espacio y compartas tus pensamientos y fotos con respeto. No se tolerarán las groserías ni el odio; este espacio es solo para el amor por el fandom y por Freen.",
      navLegal: "Aviso legal",
      legalHeading: "Aviso legal", legalIntro: "Información sobre la propiedad, las contribuciones de fans y el uso de contenido en esta página independiente.",
      legalOwnershipHeading: "Derechos de autor y propiedad", legalOwnership: "Las fotografías y los videos acreditados a Solenn Entertainment se atribuyen a Solenn Entertainment o a los titulares de derechos correspondientes. Las demás fotografías, videos y la música de la lista de reproducción siguen siendo propiedad de sus respectivos titulares de derechos de autor. No se reclama la propiedad de contenido de terceros.",
      legalFanHeading: "Fotos enviadas por fans", legalFan: "Las fotos enviadas por fans se muestran únicamente como muestra de aprecio y siguen siendo propiedad de sus respectivos titulares de derechos. Al enviar una foto, la persona colaboradora confirma que cuenta con los derechos o permisos necesarios para compartirla y autoriza su exhibición pública si se aprueba.",
      legalProjectHeading: "Proyecto independiente de fans", legalProject: "Este es un proyecto independiente y sin fines comerciales, creado para expresar el cariño y la admiración de los fans mexicanos por Freen Sarocha. No está afiliado, patrocinado ni cuenta con el respaldo de Freen Sarocha ni de Solenn Entertainment.",
      legalPermissionsHeading: "Permisos y reutilización", legalPermissions: "Este aviso no concede una licencia ni permiso para reproducir, volver a publicar o reutilizar contenido. El propósito no comercial o la inclusión de un aviso, por sí solos, no determinan que un uso esté legalmente autorizado. Solicita permiso al titular de derechos correspondiente antes de reutilizar cualquier material.",
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
      fanPage: "แฟนเพจ", galleryHeading: "แกลเลอรี", featured: "♡ ไฮไลต์ ♡", communityHeading: "ชุมชน", communitySticker: "♡ ชุมชน", linksHeading: "ลิงก์โปรด", footerCredit: "จัดทำด้วย ♡ · โปรเจกต์แฟนคลับ ·", admin: "ผู้ดูแล",
      footerMessage: "ฉันสร้างหน้านี้ขึ้นเพื่อให้เรามีพื้นที่แบ่งปันความทรงจำจากงาน CDMX 2026 ที่จัดขึ้นอย่างเอื้อเฟื้อเพื่อแฟนๆ ชาวเม็กซิกัน หวังว่าคุณจะเพลิดเพลินกับพื้นที่นี้ และแบ่งปันความคิดกับรูปภาพอย่างให้เกียรติกัน จะไม่ยอมรับคำหยาบคายหรือความเกลียดชัง พื้นที่นี้มีไว้เพื่อความรักที่มีต่อแฟนด้อมและ Freen เท่านั้น",
      navLegal: "ประกาศทางกฎหมาย",
      legalHeading: "ประกาศทางกฎหมาย", legalIntro: "ข้อมูลเกี่ยวกับสิทธิ์ในผลงาน ภาพที่แฟนๆ ส่งมา และการใช้สื่อต่างๆ บนแฟนเพจอิสระนี้",
      legalOwnershipHeading: "ลิขสิทธิ์และความเป็นเจ้าของ", legalOwnership: "ภาพถ่ายและคลิปวิดีโอที่ให้เครดิตแก่ Solenn Entertainment เป็นผลงานของ Solenn Entertainment และ/หรือผู้ถือสิทธิ์ที่เกี่ยวข้อง ภาพถ่าย วิดีโอ และเพลงในเพลย์ลิสต์รายการอื่นยังคงเป็นทรัพย์สินของเจ้าของลิขสิทธิ์แต่ละราย แฟนเพจนี้ไม่ได้อ้างความเป็นเจ้าของเนื้อหาของบุคคลที่สาม",
      legalFanHeading: "ภาพถ่ายที่แฟนๆ ส่งมา", legalFan: "ภาพถ่ายที่แฟนๆ ส่งมาจะแสดงเพื่อชื่นชมแฟนด้อมเท่านั้น และยังคงเป็นทรัพย์สินของผู้ถือสิทธิ์ที่เกี่ยวข้อง เมื่อส่งภาพ ผู้ร่วมแบ่งปันยืนยันว่าตนมีสิทธิ์หรือได้รับอนุญาตให้แบ่งปันภาพ และยินยอมให้เผยแพร่ต่อสาธารณะหากได้รับอนุมัติ",
      legalProjectHeading: "แฟนโปรเจกต์อิสระ", legalProject: "นี่คือแฟนโปรเจกต์อิสระที่ไม่แสวงหากำไร จัดทำขึ้นเพื่อแสดงความชื่นชมและความรักของแฟนๆ ชาวเม็กซิกันที่มีต่อ Freen Sarocha แฟนเพจนี้ไม่ได้เป็นพันธมิตร ได้รับการสนับสนุน หรือได้รับการรับรองจาก Freen Sarocha หรือ Solenn Entertainment",
      legalPermissionsHeading: "การขออนุญาตและการนำไปใช้ซ้ำ", legalPermissions: "ประกาศนี้ไม่ได้ให้สิทธิ์หรืออนุญาตให้ทำซ้ำ เผยแพร่ซ้ำ หรือนำเนื้อหาไปใช้ในรูปแบบอื่น การใช้เพื่อไม่แสวงหากำไรหรือการใส่คำชี้แจงเพียงอย่างเดียวไม่ได้หมายความว่าการใช้นั้นได้รับอนุญาตตามกฎหมาย กรุณาขออนุญาตจากผู้ถือสิทธิ์ที่เกี่ยวข้องก่อนนำเนื้อหาไปใช้ซ้ำ",
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


// Rotate the hero photo through five curated images every 10 seconds.
(() => {
  const heroImage = document.querySelector(".hero-art img");
  const photos = [
  "images/072F229B-A4A3-4390-B3E0-C7E95CB2543D.jpg",
  "images/4C5C6B0F-3ADE-4951-8A43-AD99F9D6344D.jpg",
  "images/1512B914-90C5-413E-BC37-B7EC594AEE92.jpg",
  "images/60D311D6-847E-48D8-BF13-9D53F818B751.png",
  "images/A895C2C6-5FCA-45EE-BF1B-5C5967840A3D.jpg"
];
  if (!heroImage || photos.length < 2) return;

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
          ? "Foto destacada de Freen Sarocha"
          : document.documentElement.lang === "th"
            ? "ภาพไฮไลต์ของ Freen Sarocha"
            : "Featured photo of Freen Sarocha";
        requestAnimationFrame(() => heroImage.classList.remove("is-changing"));
      }, 180);
    };
    preload.src = src;
  };

  window.setInterval(showNextPhoto, 10000);
})();


// Let visitors tap or keyboard-activate the floating flower, heart, star, and pet decorations.
(() => {
  const reactions = {
    tulip: ["clicked-bloom", "clicked-twirl"],
    heart: ["clicked-heart", "clicked-wiggle"],
    star: ["clicked-twinkle", "clicked-twirl"],
    bunny: ["clicked-hop", "clicked-wiggle"],
    puppy: ["clicked-hop", "clicked-twirl"]
  };
  const allReactionClasses = [...new Set(Object.values(reactions).flat())];

  document.querySelectorAll(".sparkle[data-floater], .pet-doodle[data-floater]").forEach((decoration) => {
    let previous = "";
    decoration.addEventListener("click", () => {
      const options = reactions[decoration.dataset.floater] || reactions.star;
      const choices = options.filter((name) => name !== previous);
      const reaction = choices[Math.floor(Math.random() * choices.length)];
      previous = reaction;
      decoration.classList.remove(...allReactionClasses);
      void decoration.offsetWidth;
      decoration.classList.add(reaction);
      window.setTimeout(() => decoration.classList.remove(reaction), 900);
    });

    decoration.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        decoration.click();
      }
    });
  });
})();
