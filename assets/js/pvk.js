/* PVK shared behavior: theme toggle (persisted) + marquee builder.
   Include after the DOM chrome. Pairs with style.css + cursor.js.
   Note: initial theme is applied by an inline <head> script (see default.html)
   to avoid a flash of the wrong theme before paint. */
(function () {
  "use strict";

  /* ---- theme ---- */
  var root = document.documentElement;
  function setLabel() {
    var l = document.getElementById("themeLabel");
    if (l) l.textContent = (root.getAttribute("data-theme") || "dark").toUpperCase();
  }

  function bind() {
    setLabel();
    var btn = document.getElementById("themeBtn");
    if (btn) btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem("pvk-theme", next); } catch (e) {}
      root.setAttribute("data-theme", next);
      setLabel();
      document.dispatchEvent(new CustomEvent("pvk:themechange", { detail: next }));
    });
  }
  if (document.readyState !== "loading") bind();
  else document.addEventListener("DOMContentLoaded", bind);

  /* ---- marquee helper ---- */
  // PVK.marquee('#track', '<span>...</span>')  → fills + duplicates for seamless loop
  window.PVK = window.PVK || {};
  window.PVK.marquee = function (sel, innerHtml) {
    var el = document.querySelector(sel);
    if (el) el.innerHTML = innerHtml + innerHtml;
  };
})();
