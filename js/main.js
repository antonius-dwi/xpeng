(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const slides = [...document.querySelectorAll(".hero-slide")];
  const controls = [...document.querySelectorAll(".hero-slide-button")];
  const modelLabel = document.querySelector(".hero-model");
  const heroCta = document.querySelector(".hero-cta");

  if (header) {
    const syncHeaderState = () => {
      header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });
  }

  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    mobileNav.classList.remove("is-open");
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Buka menu navigasi" : "Tutup menu navigasi",
      );

      mobileNav.classList.toggle("is-open", !isOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });
  }

  if (!slides.length || !controls.length) {
    return;
  }

  let activeIndex = 0;
  let timer;

  const showSlide = (index) => {
    activeIndex = index;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    controls.forEach((button, buttonIndex) => {
      const active = buttonIndex === activeIndex;
      button.classList.toggle("is-active", active);
      if (active) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    const activeSlide = slides[activeIndex];

    if (modelLabel) {
      modelLabel.textContent = activeSlide.dataset.model || "";
    }

    if (heroCta) {
      heroCta.textContent = activeSlide.dataset.cta || "";
      heroCta.href = activeSlide.dataset.url || "#";
    }
  };

  const startAutoSlide = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 6500);
  };

  controls.forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(Number(button.dataset.slide));
      startAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
})();
