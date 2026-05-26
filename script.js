// ============================================
// PORTAFOLIO · JAVASCRIPT
// ============================================

// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1300);
});

// ===============================
// AÑO ACTUAL EN FOOTER  ← fix
// ===============================

document.getElementById("currentYear").textContent = new Date().getFullYear();

// ===============================
// CURSOR PERSONALIZADO
// ===============================

const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

// El follower se mueve con lerp para efecto suave
const animateCursor = () => {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;

  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top  = followerY + "px";

  requestAnimationFrame(animateCursor);
};
animateCursor();

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ===============================
// MENÚ HAMBURGUESA
// ===============================

const hamburgerBtn = document.getElementById("hamburgerBtn");

hamburgerBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

document.querySelectorAll(".navbar__link").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
  });
});

// ===============================
// TYPING EFFECT
// ===============================

const roles = [
  "Estudiante de Ing. de Sistemas",
  "Amante del código 💻",
  "Gamer empedernida 🎮",
  "Futura dev 🚀",
  "Rock & chill 🎸",
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typingEl = document.getElementById("typingText");

const type = () => {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 2000);
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

  setTimeout(type, isDeleting ? 60 : 100);
};

// Iniciar después del loader
setTimeout(type, 1400);

// ===============================
// CONTADOR ANIMADO (ESTADÍSTICAS)
// ===============================

const statNumbers = document.querySelectorAll(".hero__stat-number");

const animateCounters = () => {
  statNumbers.forEach(el => {
    const target   = parseInt(el.dataset.target);
    const duration = 1500;
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

// Activar cuando el hero sea visible (una sola vez)
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      setTimeout(animateCounters, 1500); // Esperar al loader
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById("inicio");
if (heroSection) counterObserver.observe(heroSection);

// ===============================
// REVEAL ANIMATION ON SCROLL
// ===============================

const revealElements = document.querySelectorAll(
  ".about__card, .skills__category, .project-card, .contact__form-wrapper, .contact__social-link"
);

revealElements.forEach(el => el.classList.add("reveal"));

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===============================
// ANIMACIÓN DE SKILLS
// ===============================

const skillItems = document.querySelectorAll(".skill-item");

const animateSkills = () => {
  skillItems.forEach(skill => {
    const level = skill.dataset.level;
    const fill  = skill.querySelector(".skill-item__fill");
    const rect  = skill.getBoundingClientRect();

    if (rect.top < window.innerHeight - 50) {
      fill.style.width = `${level}%`;
    }
  });
};

window.addEventListener("scroll", animateSkills);
animateSkills();

// ===============================
// FILTRO DE PROYECTOS
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards  = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("filter-btn--active"));
    button.classList.add("filter-btn--active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const show = filter === "todos" || card.dataset.category === filter;

      if (show) {
        card.classList.remove("hidden");
        // Pequeña animación de reentrada
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

// ===============================
// VALIDACIÓN FORMULARIO
// ===============================

const contactForm  = document.getElementById("contactForm");
const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError    = document.getElementById("nameError");
const emailError   = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess  = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  clearErrors();

  if (nameInput.value.trim().length < 3) {
    showError(nameInput, nameError, "El nombre debe tener al menos 3 caracteres.");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError, "Ingresa un correo válido.");
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, "El mensaje debe tener al menos 10 caracteres.");
    isValid = false;
  }

  if (isValid) {
    formSuccess.hidden = false;
    contactForm.reset();
    setTimeout(() => { formSuccess.hidden = true; }, 5000);
  }
});

function showError(input, errorEl, message) {
  input.classList.add("error");
  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

function clearErrors() {
  document.querySelectorAll(".form-input").forEach(i => i.classList.remove("error"));
  document.querySelectorAll(".form-error").forEach(e => {
    e.textContent = "";
    e.classList.remove("visible");
  });
}

// ===============================
// SCROLL SPY (LINK ACTIVO)
// ===============================

const sections     = document.querySelectorAll("section");
const navMenuLinks = document.querySelectorAll(".navbar__link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navMenuLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ===============================
// PARALLAX HERO DECOS
// ===============================

const heroDecos = document.querySelectorAll(".hero__deco");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  heroDecos.forEach((deco, index) => {
    const speed = (index + 1) * 8;
    deco.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});