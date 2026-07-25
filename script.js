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
