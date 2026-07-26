/* ============================================================
   MOBILE NAVIGATION TOGGLE
   ============================================================ */
(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector(".nav-list");
  var navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !navList) return;

  /* Toggle the mobile menu */
  function openMenu() {
    navList.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (navList.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  navToggle.addEventListener("click", toggleMenu);

  /* Close menu when a nav link is clicked */
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* Close menu when clicking outside */
  document.addEventListener("click", function (event) {
    var isClickInsideNav = navList.contains(event.target);
    var isClickOnToggle = navToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains("is-open")) {
      closeMenu();
    }
  });

  /* Close menu on Escape key */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navList.classList.contains("is-open")) {
      closeMenu();
      navToggle.focus();
    }
  });
})();


/* ============================================================
   SET CURRENT YEAR IN FOOTER
   ============================================================ */
(function () {
  "use strict";

  var yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();


/* ============================================================
   PROJECT DETAIL MODAL / POPUP
   ============================================================ */
(function () {
  "use strict";

  var projectData = {
    website: {
      title: "Website Development",
      description: "This project focuses on building simple yet responsive websites using semantic HTML, modern CSS, and vanilla JavaScript. The goal was to practice structuring web pages correctly, implementing responsive layouts with CSS Grid and Flexbox, and adding interactive elements without relying on frameworks. Throughout this project, I learned about cross-browser compatibility, accessibility best practices (ARIA labels, keyboard navigation), and performance optimization techniques such as image lazy-loading and CSS preloading.",
      docs: [
        {
          src: "assets/images/doc-website-1.svg",
          alt: "HTML structure documentation showing semantic layout"
        },
        {
          src: "assets/images/doc-website-2.svg",
          alt: "CSS responsive design documentation with color palette"
        }
      ]
    },
    discord: {
      title: "Discord Bot",
      description: "Created basic Discord bots using Python to explore automation and the Discord API. This project involved setting up a bot application through the Discord Developer Portal, writing event-driven command handlers in Python, and implementing features such as auto-moderation, welcome messages, and custom slash commands. I learned about asynchronous programming with discord.py, managing API rate limits, and deploying the bot on a VPS for 24/7 uptime.",
      docs: [
        {
          src: "assets/images/doc-discord-1.svg",
          alt: "Discord bot chat interface showing command handling"
        },
        {
          src: "assets/images/doc-discord-2.svg",
          alt: "Python code structure and event-driven architecture diagram"
        }
      ]
      }
      };

      var modal = document.getElementById("project-modal");
  var modalTitle = document.getElementById("modal-title");
  var modalDescription = modal ? modal.querySelector(".modal-description") : null;
  var modalDocImages = modal ? modal.querySelectorAll(".modal-doc-image") : [];
  var modalClose = modal ? modal.querySelector(".modal-close") : null;
  var modalBackdrop = modal ? modal.querySelector(".modal-backdrop") : null;
  var previouslyFocused = null;

  if (!modal) return;

  function openModal(projectKey) {
    var data = projectData[projectKey];
    if (!data) return;

    previouslyFocused = document.activeElement;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;

    modalDocImages.forEach(function (img, idx) {
      if (data.docs[idx]) {
        img.src = data.docs[idx].src;
        img.alt = data.docs[idx].alt;
        img.parentElement.hidden = false;
      } else {
        img.parentElement.hidden = true;
      }
    });

    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";

    /* Focus close button for accessibility */
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";

    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
      previouslyFocused = null;
    }
  }

  /* Click on project titles */
  document.querySelectorAll(".project-title[data-project]").forEach(function (title) {
    title.addEventListener("click", function () {
      var projectKey = this.getAttribute("data-project");
      openModal(projectKey);
    });

    /* Keyboard: Enter / Space to open */
    title.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        var projectKey = this.getAttribute("data-project");
        openModal(projectKey);
      }
    });
  });

  /* Close button */
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  /* Click backdrop to close */
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  /* Escape key to close */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });

  /* Trap focus inside modal */
  modal.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || modal.hasAttribute("hidden")) return;

    var focusable = modal.querySelectorAll(
      'button:not([hidden]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
    );
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
