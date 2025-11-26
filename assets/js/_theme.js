(function() {
    "use strict";

    // No light theme on my website, not on my watch
    const defaultTheme = "dark";

    const getCachedTheme = () => {
      const cachedTheme = localStorage.getItem("color-scheme");
      const preferLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      // return cachedTheme || (preferLight ? "light" : "dark")
      return defaultTheme
    };

    document.documentElement.setAttribute("color-scheme", getCachedTheme());

    // window.addEventListener("DOMContentLoaded", () => {
    //   requestAnimationFrame(() => document.body.classList.remove("notransition"))
    //   document.getElementById("theme-switcher").addEventListener("click", e => {
    //     e.preventDefault();
    //     const state = getCachedTheme() === "light" ? "dark" : "light";
    //     document.documentElement.setAttribute("color-scheme", state);
    //     localStorage.setItem("color-scheme", state);
    //   });
    // });
})();
