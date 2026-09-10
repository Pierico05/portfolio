let currentLang = "en";
let typingTimer = null;
let isFirstLanguageApply = true;

const timelineData = [
  {
    icon: "fas fa-graduation-cap",
    title: "timeline.ynov.title",
    company: "timeline.ynov.company",
    date: "timeline.ynov.date",
    description: "timeline.ynov.description"
  },
  {
    icon: "fas fa-handshake",
    title: "timeline.commerce.title",
    company: "timeline.commerce.company",
    date: "timeline.commerce.date",
    description: "timeline.commerce.description"
  },
  {
    icon: "fas fa-heart",
    title: "timeline.tulipe.title",
    company: "timeline.tulipe.company",
    date: "timeline.tulipe.date",
    description: "timeline.tulipe.description"
  }
];

const stackData = [
  {
    title: "stack.frontend",
    items: [
      { icon: "fas fa-clipboard-list", key: "stack.preprod", color: "#c5a059" },
      { icon: "fas fa-tasks", key: "stack.organisation", color: "#c5a059" },
      { icon: "fas fa-comments", key: "stack.communication", color: "#c5a059" }
    ]
  },
  {
    title: "stack.backend",
    items: [
      { icon: "fas fa-camera-retro", key: "stack.production", color: "#c5a059" },
      { icon: "fas fa-camera", key: "stack.photo", color: "#c5a059" },
      { icon: "fas fa-video", key: "stack.premiere", color: "#c5a059" }
    ]
  },
  {
    title: "stack.cloud",
    items: [
      { icon: "fas fa-film", key: "stack.davinci", color: "#c5a059" },
      { icon: "fas fa-cut", key: "stack.montage", color: "#c5a059" },
      { icon: "fas fa-magic", key: "stack.vfx", color: "#c5a059" }
    ]
  }
];

const floatingIconSet = [
  { icon: "fas fa-film", color: "#c5a059" },
  { icon: "fas fa-video", color: "#b89968" },
  { icon: "fas fa-camera", color: "#d4b483" },
  { icon: "fas fa-images", color: "#c5a059" },
  { icon: "fas fa-headphones", color: "#b49363" },
  { icon: "fas fa-sliders-h", color: "#c5a059" },
  { icon: "fas fa-magic", color: "#d4b483" },
  { icon: "fas fa-cut", color: "#b89968" }
];

const galleryCollections = {
  photo: [
    { type: "image", src: "photos/aston-martin.jpg", altKey: "projects.photo1Alt" },
    { type: "image", src: "photos/packshot.jpg", altKey: "projects.photo2Alt" },
    { type: "image", src: "photos/facade.jpg", altKey: "projects.photo3Alt" },
    { type: "image", src: "photos/pont.jpg", altKey: "projects.photo4Alt" },
    { type: "image", src: "photos/portrait.jpg", altKey: "projects.photo5Alt" },
    { type: "image", src: "photos/fleur.jpg", altKey: "projects.photo6Alt" }
  ],
  video: [
    {
      type: "video",
      src: "videos/interview-renault-louvet.mp4",
      altKey: "projects.video.imgAlt",
      poster: "assets/images/interview-renault-louvet.jpg"
    },
    {
      type: "video",
      src: "videos/exercice-montage-girl-on-wave.mp4",
      altKey: "project.video.gowThumbAlt",
      poster: "assets/images/exercice-montage-girl-on-wave.jpg"
    }
  ]
};

const galleryState = {
  open: false,
  collection: "photo",
  index: 0
};

function currentItems() {
  return galleryCollections[galleryState.collection] || [];
}

function currentAge() {
  const birth = new Date(2005, 11, 24);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function t(key) {
  return translations[currentLang][key] || "";
}

function detectLanguage() {
  const stored = localStorage.getItem("preferred-language");
  if (stored === "fr" || stored === "en") {
    return stored;
  }
  const browser = (navigator.language || "en").toLowerCase();
  return browser.startsWith("fr") ? "fr" : "en";
}

function initUIComponents() {
  currentLang = detectLanguage();
  document.documentElement.lang = currentLang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function createTimeline() {
  const root = document.getElementById("timeline");
  if (!root) {
    return;
  }
  root.innerHTML = "";

  timelineData.forEach((item) => {
    const wrapper = document.createElement("article");
    wrapper.className = "timeline-item fade-up";

    const iconWrap = document.createElement("div");
    iconWrap.className = "timeline-icon";
    const icon = document.createElement("i");
    icon.className = item.icon;
    icon.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(icon);

    const card = document.createElement("div");
    card.className = "timeline-card";

    const title = document.createElement("h3");
    title.setAttribute("data-i18n", item.title);
    title.textContent = translations[currentLang][item.title];

    const company = document.createElement("p");
    company.className = "company";
    company.setAttribute("data-i18n", item.company);
    company.textContent = translations[currentLang][item.company];

    const date = document.createElement("span");
    date.className = "date";
    date.setAttribute("data-i18n", item.date);
    date.textContent = translations[currentLang][item.date];

    const description = document.createElement("p");
    description.className = "description";
    description.setAttribute("data-i18n", item.description);
    description.textContent = translations[currentLang][item.description];

    card.append(title, company, date, description);
    wrapper.append(iconWrap, card);
    root.appendChild(wrapper);
  });
}

function createStackItems() {
  const root = document.getElementById("stack-categories");
  if (!root) {
    return;
  }
  root.innerHTML = "";

  stackData.forEach((category) => {
    const col = document.createElement("div");
    col.className = "stack-category fade-up";

    const heading = document.createElement("h3");
    heading.setAttribute("data-i18n", category.title);
    heading.textContent = translations[currentLang][category.title];

    const list = document.createElement("div");
    list.className = "stack-items";

    category.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "stack-item";

      const icon = document.createElement("i");
      icon.className = item.icon;
      icon.style.color = item.color;
      icon.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.setAttribute("data-i18n", item.key);
      label.textContent = translations[currentLang][item.key];

      card.append(icon, label);
      list.appendChild(card);
    });

    col.append(heading, list);
    root.appendChild(col);
  });
}

function createFloatingIcons() {
  const root = document.getElementById("floating-icons");
  if (!root) {
    return;
  }
  root.innerHTML = "";

  for (let i = 0; i < 12; i += 1) {
    const source = floatingIconSet[i % floatingIconSet.length];
    const el = document.createElement("i");
    el.className = `${source.icon} floating-icon`;
    el.style.color = source.color;
    el.style.left = `${Math.random() * 92 + 2}%`;
    el.style.top = `${Math.random() * 84 + 6}%`;
    el.style.fontSize = `${Math.random() * 1.6 + 0.9}rem`;
    el.style.animationDuration = `${8 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 6}s`;
    root.appendChild(el);
  }
}

function typeText(element, text) {
  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  element.textContent = "";
  element.classList.add("typing");
  let index = 0;

  typingTimer = setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;
    if (index >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      setTimeout(() => element.classList.remove("typing"), 1200);
    }
  }, 55);
}

function fillTranslatedContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);

    if (el.tagName === "META") {
      el.setAttribute("content", value);
      return;
    }

    if (el.tagName === "TITLE") {
      document.title = value;
      el.textContent = value;
      return;
    }

    if (key === "about.birthdate") {
      el.textContent = value.replace("{age}", String(currentAge()));
      return;
    }

    if (key === "hero.greeting") {
      typeText(el, value);
      return;
    }

    el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });

  if (galleryState.open) {
    renderGalleryItem();
  }
}

function renderGalleryItem() {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    return;
  }

  const imageEl = document.getElementById("gallery-image");
  const videoEl = document.getElementById("gallery-video");
  const captionEl = document.getElementById("gallery-caption");
  const titleEl = document.getElementById("gallery-title");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  const items = currentItems();
  const item = items[galleryState.index];
  if (!item) {
    return;
  }

  const label = t(item.altKey);
  titleEl.textContent = galleryState.collection === "photo" ? t("projects.photo.title") : t("projects.video.title");
  captionEl.textContent = label;
  prevBtn.hidden = items.length < 2;
  nextBtn.hidden = items.length < 2;

  if (item.type === "video") {
    imageEl.classList.remove("is-active");
    videoEl.classList.add("is-active");
    videoEl.poster = item.poster || "";
    if (videoEl.getAttribute("src") !== item.src) {
      videoEl.src = item.src;
    }
    videoEl.setAttribute("aria-label", label);
  } else {
    videoEl.pause();
    videoEl.removeAttribute("src");
    videoEl.load();
    videoEl.classList.remove("is-active");
    imageEl.classList.add("is-active");
    imageEl.src = item.src;
    imageEl.alt = label;
  }
}

function syncPhotoPreview(index) {
  const featuredPhoto = document.getElementById("photo-featured");
  const item = galleryCollections.photo[index];
  if (!featuredPhoto || !item) {
    return;
  }
  featuredPhoto.src = item.src;
  featuredPhoto.alt = t(item.altKey);
  document.querySelectorAll(".photo-thumb").forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("is-active", thumbIndex === index);
  });
}

function openGallery(collection, index) {
  galleryState.collection = collection;
  galleryState.index = index;
  galleryState.open = true;
  document.getElementById("gallery").hidden = false;
  document.body.classList.add("gallery-open");
  renderGalleryItem();
  document.querySelector(".gallery-close")?.focus();
}

function closeGallery() {
  const videoEl = document.getElementById("gallery-video");
  galleryState.open = false;
  document.getElementById("gallery").hidden = true;
  document.body.classList.remove("gallery-open");
  videoEl?.pause();
}

function stepGallery(direction) {
  const items = currentItems();
  if (items.length < 2) {
    return;
  }
  galleryState.index = (galleryState.index + direction + items.length) % items.length;
  renderGalleryItem();
  if (galleryState.collection === "photo") {
    syncPhotoPreview(galleryState.index);
  }
}

function setupNativeVideos() {
  document.querySelectorAll("video.media-native").forEach((videoEl) => {
    videoEl.addEventListener("loadedmetadata", () => {
      videoEl.width = videoEl.videoWidth;
      videoEl.height = videoEl.videoHeight;
      videoEl.style.aspectRatio = `${videoEl.videoWidth} / ${videoEl.videoHeight}`;
    });
  });
}

function setupGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    return;
  }

  const videoEl = document.getElementById("gallery-video");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");

  if (videoEl) {
    videoEl.addEventListener("loadedmetadata", () => {
      videoEl.width = videoEl.videoWidth;
      videoEl.height = videoEl.videoHeight;
      videoEl.style.aspectRatio = `${videoEl.videoWidth} / ${videoEl.videoHeight}`;
    });
  }

  document.querySelectorAll("button.photo-thumb[data-gallery-index]").forEach((thumb) => {
    thumb.addEventListener("click", (event) => {
      event.preventDefault();
      const index = Number(thumb.dataset.galleryIndex || 0);
      syncPhotoPreview(index);
      openGallery("photo", index);
    });
  });

  gallery.querySelectorAll("[data-gallery-close]").forEach((el) => {
    el.addEventListener("click", closeGallery);
  });

  prevBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    stepGallery(-1);
  });

  nextBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    stepGallery(1);
  });

  document.addEventListener("keydown", (event) => {
    if (!galleryState.open) {
      return;
    }
    if (event.key === "Escape") {
      closeGallery();
    }
    if (event.key === "ArrowLeft") {
      stepGallery(-1);
    }
    if (event.key === "ArrowRight") {
      stepGallery(1);
    }
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem("preferred-language", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  if (isFirstLanguageApply) {
    fillTranslatedContent();
    isFirstLanguageApply = false;
    return;
  }

  const nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach((el) => {
    el.style.opacity = "0";
  });

  window.setTimeout(() => {
    fillTranslatedContent();
    nodes.forEach((el) => {
      el.style.opacity = "1";
    });
  }, 180);
}

function setupNavMenu() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!navbar || !toggle || !links) {
    return;
  }

  const closeMenu = () => {
    navbar.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = !navbar.classList.contains("is-open");
    navbar.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 480) {
      closeMenu();
    }
  });
}

function setupEventListeners() {
  setupNavMenu();
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang && lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  });

  window.addEventListener("scroll", () => {
    document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 20);
  });

  document.querySelectorAll(".project-link[aria-disabled='true']").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  setupNativeVideos();
  setupGallery();
}

function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el, index) => {
    if (el.closest(".hero")) {
      el.style.transitionDelay = `${index * 0.12}s`;
      requestAnimationFrame(() => el.classList.add("visible"));
    } else {
      observer.observe(el);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initUIComponents();
  createTimeline();
  createStackItems();
  createFloatingIcons();
  applyLanguage(currentLang);
  setupEventListeners();
  initAnimations();
});
