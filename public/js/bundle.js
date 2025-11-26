(() => {
  // <stdin>
  (function() {
    "use strict";
    window.addEventListener("DOMContentLoaded", () => {
      let menu = document.getElementById("nav-dropdown-menu");
      const menu_btn = document.getElementById("nav-dropdown-button");
      menu_btn.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.toggle("hidden");
        window.addEventListener("click", () => {
        });
        window.addEventListener("scroll", () => {
        });
      });
    });
  })();
  (function() {
    "use strict";
    const defaultTheme = "dark";
    const getCachedTheme = () => {
      const cachedTheme = localStorage.getItem("color-scheme");
      const preferLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      return defaultTheme;
    };
    document.documentElement.setAttribute("color-scheme", getCachedTheme());
  })();
})();
