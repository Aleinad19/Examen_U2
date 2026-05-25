// ============================================
// PORTAFOLIO · JAVASCRIPT
// ============================================

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===============================
// MENÚ HAMBURGUESA
// ===============================

const hamburgerBtn = document.getElementById("hamburgerBtn");

hamburgerBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

// Cerrar menú al hacer click en un link
const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
  });
});

// ===============================
// REVEAL ANIMATION ON SCROLL
// ===============================

// Seleccionamos elementos a animar
const revealElements = document.querySelectorAll(
  ".about__card, .skills__category, .project-card, .contact__form-wrapper, .contact__social-link"
);

// Añadimos clase reveal inicialmente
revealElements.forEach(el => {
  el.classList.add("reveal");
});

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// Ejecutar una vez al cargar
revealOnScroll();

// ===============================
// ANIMACIÓN DE SKILLS
// ===============================

const skillItems = document.querySelectorAll(".skill-item");

const animateSkills = () => {
  skillItems.forEach(skill => {
    const level = skill.dataset.level;
    const fill = skill.querySelector(".skill-item__fill");

    const rect = skill.getBoundingClientRect();

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
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    // Remover active
    filterButtons.forEach(btn => {
      btn.classList.remove("filter-btn--active");
    });

    // Activar botón actual
    button.classList.add("filter-btn--active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "todos" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===============================
// VALIDACIÓN FORMULARIO
// ===============================

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Reset errores
  clearErrors();

  // ===============================
  // VALIDAR NOMBRE
  // ===============================

  if (nameInput.value.trim().length < 3) {
    showError(
      nameInput,
      nameError,
      "El nombre debe tener al menos 3 caracteres."
    );
    isValid = false;
  }

  // ===============================
  // VALIDAR EMAIL
  // ===============================

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value.trim())) {
    showError(
      emailInput,
      emailError,
      "Ingresa un correo válido."
    );
    isValid = false;
  }

  // ===============================
  // VALIDAR MENSAJE
  // ===============================

  if (messageInput.value.trim().length < 10) {
    showError(
      messageInput,
      messageError,
      "El mensaje debe tener al menos 10 caracteres."
    );
    isValid = false;
  }

  // ===============================
  // SI TODO ESTÁ BIEN
  // ===============================

  if (isValid) {

    formSuccess.hidden = false;

    contactForm.reset();

    // Ocultar mensaje luego de 5 segundos
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  }
});

// ===============================
// FUNCIONES AUXILIARES
// ===============================

function showError(input, errorElement, message) {
  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.add("visible");
}

function clearErrors() {

  const inputs = document.querySelectorAll(".form-input");
  const errors = document.querySelectorAll(".form-error");

  inputs.forEach(input => {
    input.classList.remove("error");
  });

  errors.forEach(error => {
    error.textContent = "";
    error.classList.remove("visible");
  });
}

// ===============================
// SCROLL SPY (LINK ACTIVO)
// ===============================

const sections = document.querySelectorAll("section");
const navMenuLinks = document.querySelectorAll(".navbar__link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
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
// EFECTO PARALLAX HERO
// ===============================

const heroDecos = document.querySelectorAll(".hero__deco");

window.addEventListener("mousemove", (e) => {

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  heroDecos.forEach((deco, index) => {

    const speed = (index + 1) * 8;

    deco.style.transform = `
      translate(
        ${x * speed}px,
        ${y * speed}px
      )
    `;
  });
});