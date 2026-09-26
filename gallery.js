// Split the existing gallery into two browsable collections.
(() => {
  const section = document.querySelector("#gallery");
  const sourceGrid = section?.querySelector(":scope > .gallery-grid");
  if (!section || !sourceGrid) return;

  const photos = [...sourceGrid.children];
  if (!photos.length) return;

  const collections = [
    { id: "lor-mak", title: "Lor Mak 😎", start: 0, end: Math.ceil(photos.length / 2) },
    { id: "suay-mak", title: "Suay Mak 😍", start: Math.ceil(photos.length / 2), end: photos.length }
  ];
  const copy = {
    en: { choose: "Choose a collection to explore.", back: "← All collections", count: (n) => `${n} photos` },
    es: { choose: "Elige una colección para explorar.", back: "← Todas las colecciones", count: (n) => `${n} fotos` },
    th: { choose: "เลือกคอลเลกชันที่ต้องการชม", back: "← ดูทุกคอลเลกชัน", count: (n) => `${n} รูป` }
  };

  const explorer = document.createElement("div");
  explorer.className = "gallery-explorer";
  const chooser = document.createElement("div");
  chooser.className = "gallery-collections";
  chooser.setAttribute("aria-label", "Photo collections");
  const prompt = document.createElement("p");
  prompt.className = "gallery-collections-prompt";
  chooser.append(prompt);
  const collectionCards = new Map();
  const collectionViews = [];

  for (const collection of collections) {
    const groupPhotos = photos.slice(collection.start, collection.end);
    const card = document.createElement("button");
    card.className = "gallery-collection-card";
    card.type = "button";
    card.setAttribute("aria-controls", `gallery-${collection.id}-view`);

    const preview = document.createElement("img");
    preview.className = "gallery-collection-preview";
    preview.src = groupPhotos[0]?.querySelector("img")?.getAttribute("src") || "";
    preview.alt = "";
    preview.loading = "lazy";
    const label = document.createElement("span");
    label.className = "gallery-collection-title";
    label.textContent = collection.title;
    const count = document.createElement("span");
    count.className = "gallery-collection-count";
    card.append(preview, label, count);
    chooser.append(card);
    collectionCards.set(collection.id, card);

    const view = document.createElement("section");
    view.className = "gallery-collection-view";
    view.id = `gallery-${collection.id}-view`;
    view.hidden = true;
    view.setAttribute("aria-labelledby", `gallery-${collection.id}-title`);

    const heading = document.createElement("div");
    heading.className = "gallery-view-heading";
    const back = document.createElement("button");
    back.className = "gallery-back-button";
    back.type = "button";
    const title = document.createElement("h3");
    title.className = "gallery-collection-heading";
    title.id = `gallery-${collection.id}-title`;
    title.tabIndex = -1;
    title.textContent = collection.title;
    heading.append(back, title);

    const grid = document.createElement("div");
    grid.className = "gallery-grid";
    groupPhotos.forEach((photo) => grid.append(photo));
    view.append(heading, grid);
    explorer.append(view);
    collectionViews.push({ collection, view, back, title });

    card.addEventListener("click", () => {
      chooser.hidden = true;
      collectionViews.forEach(({ view: item }) => { item.hidden = item !== view; });
      title.focus();
    });
    back.addEventListener("click", () => {
      view.hidden = true;
      chooser.hidden = false;
      card.focus();
    });
  }

  sourceGrid.replaceWith(explorer);
  const updateLanguage = (event) => {
    const lang = event?.detail?.language || document.documentElement.lang || "en";
    const words = copy[lang] || copy.en;
    prompt.textContent = words.choose;
    collectionCards.forEach((card, id) => {
      const collection = collections.find((item) => item.id === id);
      card.querySelector(".gallery-collection-count").textContent =
        words.count(collection.end - collection.start);
    });
    collectionViews.forEach(({ back }) => { back.textContent = words.back; });
  };
  document.addEventListener("freen-language-change", updateLanguage);
  updateLanguage();
})();
