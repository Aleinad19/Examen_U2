// ============================================================
// DANIELA SARENE DAZA LORENZO · COZY GAMER DEVELOPER
// script.js
// ============================================================

// ══════════════════════════════════════════
// LOADER
// ══════════════════════════════════════════

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    // Iniciar typing y contadores después del loader
    setTimeout(type, 200);
    setTimeout(animateCounters, 400);
  }, 1400);
});

// ══════════════════════════════════════════
// AÑO ACTUAL EN FOOTER
// ══════════════════════════════════════════

const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ══════════════════════════════════════════
// CURSOR PERSONALIZADO
// ══════════════════════════════════════════

const cursor         = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

const animateCursor = () => {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top  = followerY + "px";
  requestAnimationFrame(animateCursor);
};
animateCursor();

// ══════════════════════════════════════════
// CANVAS DE PARTÍCULAS
// ══════════════════════════════════════════

const canvas = document.getElementById("particlesCanvas");
const ctx    = canvas.getContext("2d");

let particles = [];

const resizeCanvas = () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
};

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x      = Math.random() * canvas.width;
    this.y      = Math.random() * canvas.height;
    this.size   = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    // Colores: rosa, violeta, cyan
    const colors = [
      "rgba(244,114,182,",
      "rgba(167,139,250,",
      "rgba(103,232,249,",
    ];
    this.colorBase = colors[Math.floor(Math.random() * colors.length)];
    this.opacity   = Math.random() * 0.5 + 0.1;
    this.life      = 0;
    this.maxLife   = Math.random() * 200 + 100;
  }

  update() {
    this.x    += this.speedX;
    this.y    += this.speedY;
    this.life++;

    if (
      this.x < 0 || this.x > canvas.width ||
      this.y < 0 || this.y > canvas.height ||
      this.life > this.maxLife
    ) {
      this.reset();
    }
  }

  draw() {
    const alpha = this.opacity * Math.sin((this.life / this.maxLife) * Math.PI);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.colorBase + alpha + ")";
    ctx.fill();
  }
}

// Crear partículas
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

const animateParticles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
};

animateParticles();

// ══════════════════════════════════════════
// NAVBAR SCROLL + SPY
// ══════════════════════════════════════════

const navbar     = document.getElementById("navbar");
const navLinks   = document.querySelectorAll(".navbar__link[data-section]");
const sections   = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Clase scrolled
  navbar.classList.toggle("scrolled", window.scrollY > 30);

  // Scroll spy
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.section === current) {
      link.classList.add("active");
    }
  });
});

// ══════════════════════════════════════════
// MENÚ HAMBURGUESA
// ══════════════════════════════════════════

const hamburgerBtn = document.getElementById("hamburgerBtn");

hamburgerBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

document.querySelectorAll(".navbar__link").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("open"));
});

// ══════════════════════════════════════════
// TYPING EFFECT
// ══════════════════════════════════════════

const roles = [
  "Estudiante de Ing. de Sistemas",
  "Amante del código 💻",
  "Gamer empedernida 🎮",
  "Futura dev 🚀",
  "Rock & chill 🎸",
  "Curiosa por naturaleza 🌱",
  "Docker enthusiast 🐳",
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typingEl = document.getElementById("typingText");

const type = () => {
  if (!typingEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 55 : 95);
};

// type() se llama después del loader

// ══════════════════════════════════════════
// CONTADORES ANIMADOS
// ══════════════════════════════════════════

const statNumbers = document.querySelectorAll(".hero__stat-number");

const animateCounters = () => {
  statNumbers.forEach(el => {
    const target   = parseInt(el.dataset.target);
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    update();
  });
};

// ══════════════════════════════════════════
// REVEAL ON SCROLL (Intersection Observer)
// ══════════════════════════════════════════

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ══════════════════════════════════════════
// ANIMACIÓN DE SKILLS (barras de progreso)
// ══════════════════════════════════════════

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level;
        const fill  = entry.target.querySelector(".skill-item__fill");
        if (fill) {
          setTimeout(() => {
            fill.style.width = `${level}%`;
          }, 150);
        }
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-item").forEach(el => skillObserver.observe(el));

// ══════════════════════════════════════════
// FILTRO DE PROYECTOS
// ══════════════════════════════════════════

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards  = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Actualizar botón activo
    filterButtons.forEach(btn => btn.classList.remove("filter-btn--active"));
    button.classList.add("filter-btn--active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      // data-category puede ser "web docker" (múltiples categorías)
      const categories = card.dataset.category?.split(" ") || [];
      const show = filter === "todos" || categories.includes(filter);

      if (show) {
        card.classList.remove("hidden");
        card.style.animation = "none";
        requestAnimationFrame(() => {
          card.style.animation = "popIn .35s ease both";
        });
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ══════════════════════════════════════════
// MODALES DE "SOBRE MÍ"
// ══════════════════════════════════════════

const modalOverlay = document.getElementById("modalOverlay");
const aboutCards   = document.querySelectorAll(".about__card[data-modal]");

// Abrir modal
aboutCards.forEach(card => {
  card.addEventListener("click", () => {
    const modalId = `modal-${card.dataset.modal}`;
    const modal   = document.getElementById(modalId);

    if (!modal) return;

    // Ocultar todos los modales abiertos
    document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));

    modal.classList.add("active");
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Cerrar modal: botón ✕
document.querySelectorAll(".modal__close").forEach(btn => {
  btn.addEventListener("click", closeModal);
});

// Cerrar modal: click en overlay
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Cerrar modal: tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ══════════════════════════════════════════
// PARALLAX EN DECOS DEL HERO
// ══════════════════════════════════════════

const heroDecos = document.querySelectorAll(".hero__deco");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth  - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  heroDecos.forEach(deco => {
    const speed = parseFloat(deco.dataset.speed) || 6;
    const tx = x * speed;
    const ty = y * speed;
    deco.style.transform = `translate(${tx}px, ${ty}px)`;
  });
});

// ══════════════════════════════════════════
// EFECTO 3D EN CARDS DE PROYECTOS
// ══════════════════════════════════════════

projectCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) *  6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.5s ease";
    setTimeout(() => {
      card.style.transition = "";
    }, 500);
  });
});

// ══════════════════════════════════════════
// VALIDACIÓN DEL FORMULARIO
// ══════════════════════════════════════════

const contactForm  = document.getElementById("contactForm");
const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError    = document.getElementById("nameError");
const emailError   = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess  = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    clearFormErrors();

    // Validar nombre
    if (nameInput.value.trim().length < 3) {
      showFormError(nameInput, nameError, "El nombre debe tener al menos 3 caracteres.");
      isValid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showFormError(emailInput, emailError, "Ingresa un correo electrónico válido.");
      isValid = false;
    }

    // Validar mensaje
    if (messageInput.value.trim().length < 10) {
      showFormError(messageInput, messageError, "El mensaje debe tener al menos 10 caracteres.");
      isValid = false;
    }

    if (isValid) {
      formSuccess.hidden = false;
      contactForm.reset();
      setTimeout(() => { formSuccess.hidden = true; }, 5000);
    }
  });
}

function showFormError(input, errorEl, message) {
  input.classList.add("error");
  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

function clearFormErrors() {
  document.querySelectorAll(".form-input").forEach(i => i.classList.remove("error"));
  document.querySelectorAll(".form-error").forEach(e => {
    e.textContent = "";
    e.classList.remove("visible");
  });
}

// Input: quitar error al escribir
[nameInput, emailInput, messageInput].forEach(input => {
  if (!input) return;
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});

// ══════════════════════════════════════════
// SMOOTH SCROLL PARA LINKS ANCLA
// ══════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ══════════════════════════════════════════
// FIN DEL SCRIPT
// ══════════════════════════════════════════
// ══════════════════════════════════════════
// LIGHTBOX UNIVERSAL
// Maneja: imágenes (certs, proyectos) y PDFs (CV)
// ══════════════════════════════════════════

const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxTitle   = document.getElementById("lightboxTitle");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose   = document.getElementById("lightboxClose");
const lightboxDl      = document.getElementById("lightboxDl");
const lightboxImgWrap = document.getElementById("lightboxImgWrap");
const lightboxPdfWrap = document.getElementById("lightboxPdfWrap");
const lightboxImg     = document.getElementById("lightboxImg");
const lightboxPdf     = document.getElementById("lightboxPdf");
const lightboxNav     = document.getElementById("lightboxNav");

// Índice actual para galería de proyectos
let galleryItems = [];
let galleryIndex = 0;

// ── Abrir lightbox: imagen única ──
function openLightboxImage(src, title, caption, downloadHref = src) {
  lightboxTitle.textContent   = title || "";
  lightboxCaption.textContent = caption ? `· ${caption}` : "";

  lightboxImgWrap.style.display = "flex";
  lightboxPdfWrap.style.display = "none";
  lightboxNav.style.display     = "none";

  lightboxImg.src = src;

  lightboxDl.href     = downloadHref;
  lightboxDl.download = title || "archivo";
  lightboxDl.style.display = "inline-flex";

  lightboxOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ── Abrir lightbox: PDF ──
function openLightboxPdf(src, title) {
  lightboxTitle.textContent   = title || "Vista previa";
  lightboxCaption.textContent = "";

  lightboxImgWrap.style.display = "none";
  lightboxPdfWrap.style.display = "block";
  lightboxNav.style.display     = "none";

  // Usar objeto embed más compatible
  lightboxPdf.src = src + "?#toolbar=0&navpanes=0";

  lightboxDl.href     = src;
  lightboxDl.download = title || "cv";
  lightboxDl.style.display = "inline-flex";

  lightboxOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ── Abrir lightbox: galería (múltiples imágenes) ──
function openLightboxGallery(items, startIndex = 0) {
  galleryItems = items;
  galleryIndex = startIndex;

  lightboxImgWrap.style.display = "flex";
  lightboxPdfWrap.style.display = "none";
  lightboxDl.style.display      = "inline-flex";

  // Renderizar dots de navegación
  lightboxNav.style.display = items.length > 1 ? "flex" : "none";
  lightboxNav.innerHTML = items.map((_, i) =>
    `<span class="lightbox__nav-dot ${i === startIndex ? "active" : ""}" data-idx="${i}"></span>`
  ).join("");

  // Click en dots
  lightboxNav.querySelectorAll(".lightbox__nav-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      galleryIndex = parseInt(dot.dataset.idx);
      updateGallery();
    });
  });

  updateGallery();
  lightboxOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateGallery() {
  const item = galleryItems[galleryIndex];
  lightboxImg.src             = item.src;
  lightboxTitle.textContent   = item.title || "";
  lightboxCaption.textContent = item.caption ? `· ${item.caption}` : "";
  lightboxDl.href             = item.src;
  lightboxDl.download         = item.title || "imagen";

  lightboxNav.querySelectorAll(".lightbox__nav-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === galleryIndex);
  });
}

// ── Cerrar lightbox ──
function closeLightbox() {
  lightboxOverlay.classList.remove("active");
  document.body.style.overflow = "";
  // Limpiar src del iframe al cerrar para evitar que siga cargando
  setTimeout(() => { lightboxPdf.src = ""; }, 350);
}

lightboxClose.addEventListener("click", closeLightbox);

lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightboxOverlay.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight" && galleryItems.length > 1) {
    galleryIndex = (galleryIndex + 1) % galleryItems.length;
    updateGallery();
  }
  if (e.key === "ArrowLeft" && galleryItems.length > 1) {
    galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery();
  }
});

// ══════════════════════════════════════════
// CERTIFICADOS → abrir en lightbox
// ══════════════════════════════════════════

document.querySelectorAll(".cert-card[data-cert-img]").forEach(card => {
  card.addEventListener("click", () => {
    const src     = card.dataset.certImg;
    const title   = card.dataset.certTitle   || "Certificado";
    const caption = card.dataset.certCaption || "";
    openLightboxImage(src, title, caption);
  });
});

// ══════════════════════════════════════════
// PROYECTOS → galería de imágenes al hacer click en la foto
// ══════════════════════════════════════════

document.querySelectorAll(".project-card__image[data-gallery]").forEach(imgDiv => {
  imgDiv.addEventListener("click", () => {
    const raw   = imgDiv.dataset.gallery;       // JSON stringificado
    const title = imgDiv.dataset.galleryTitle || "";
    try {
      const items = JSON.parse(raw);
      openLightboxGallery(items);
    } catch {
      // Fallback: src único
      const src = imgDiv.querySelector("img")?.src || "";
      if (src) openLightboxImage(src, title, "");
    }
  });
});

// También abrir con click en el placeholder si no hay img real
document.querySelectorAll(".project-card__image:not([data-gallery])").forEach(imgDiv => {
  const img = imgDiv.querySelector("img");
  if (!img) return; // Sin imagen real, no abrir lightbox
  imgDiv.style.cursor = "zoom-in";
  imgDiv.addEventListener("click", () => {
    openLightboxImage(img.src, imgDiv.closest(".project-card").querySelector(".project-card__title")?.textContent || "", "");
  });
});

// ══════════════════════════════════════════
// BOTÓN VISTA PREVIA CV
// ══════════════════════════════════════════

document.querySelectorAll("[data-cv-preview]").forEach(btn => {
  btn.addEventListener("click", () => {
    openLightboxPdf(btn.dataset.cvPreview, "Curriculum Vitae — Daniela Sarene Daza Lorenzo");
  });
});