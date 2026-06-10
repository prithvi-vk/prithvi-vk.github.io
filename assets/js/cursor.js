/* PVK brutalist cursor — yellow targeting reticle + lagging lock-on brackets.
   Theme-aware (reads --accent / --red / --fg-dim). Disabled on touch devices.
   Drive the "hot" state externally with document.body.classList.toggle('pvk-target', bool). */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
  if (window.__pvkCursor) return; window.__pvkCursor = true;

  var css = document.createElement("style");
  css.textContent = [
    "html.pvk-cursor-on, html.pvk-cursor-on *{cursor:none !important;}",
    "#pvk-cur,#pvk-ret{position:fixed;top:0;left:0;pointer-events:none;z-index:99999;will-change:transform;opacity:0;}",
    "#pvk-cur i,#pvk-ret i{position:absolute;display:block;}",
    /* inner reticle */
    "#pvk-cur{width:20px;height:20px;margin:-10px 0 0 -10px;}",
    "#pvk-cur .rg{left:50%;top:50%;width:6px;height:6px;margin:-3px;border:1.5px solid var(--accent,#FFD400);background:transparent;transition:border-color .1s,background .1s;}",
    "#pvk-cur .t{background:var(--accent,#FFD400);transition:background .1s;}",
    "#pvk-cur .t.n{left:50%;top:0;width:1.5px;height:4px;margin-left:-.75px;}",
    "#pvk-cur .t.s{left:50%;bottom:0;width:1.5px;height:4px;margin-left:-.75px;}",
    "#pvk-cur .t.e{right:0;top:50%;width:4px;height:1.5px;margin-top:-.75px;}",
    "#pvk-cur .t.w{left:0;top:50%;width:4px;height:1.5px;margin-top:-.75px;}",
    "#pvk-cur .bk{left:50%;top:50%;width:2px;height:2px;margin:-1px;background:var(--accent,#FFD400);animation:pvkblink 1.05s steps(1) infinite;}",
    "@keyframes pvkblink{50%{opacity:0;}}",
    /* lagging lock-on brackets */
    "#pvk-ret{width:30px;height:30px;margin:-15px 0 0 -15px;transition:width .14s,height .14s,margin .14s,opacity .18s;}",
    "#pvk-ret .c{width:8px;height:8px;border:1.5px solid var(--fg-dim,rgba(242,241,234,.5));transition:border-color .12s;}",
    "#pvk-ret .c1{left:0;top:0;border-right:none;border-bottom:none;}",
    "#pvk-ret .c2{right:0;top:0;border-left:none;border-bottom:none;}",
    "#pvk-ret .c3{left:0;bottom:0;border-right:none;border-top:none;}",
    "#pvk-ret .c4{right:0;bottom:0;border-left:none;border-top:none;}",
    /* hot / lock-on */
    "html.pvk-hot #pvk-cur .rg{border-color:var(--red,#FF2D2D);background:rgba(255,45,45,.18);}",
    "html.pvk-hot #pvk-cur .t{background:var(--red,#FF2D2D);}",
    "html.pvk-hot #pvk-cur .bk{background:var(--red,#FF2D2D);}",
    "html.pvk-hot #pvk-ret{width:21px;height:21px;margin:-10.5px 0 0 -10.5px;}",
    "html.pvk-hot #pvk-ret .c{border-color:var(--red,#FF2D2D);}",
    /* press */
    "html.pvk-down #pvk-ret{width:15px;height:15px;margin:-7.5px 0 0 -7.5px;}",
    "@media (prefers-reduced-motion: reduce){#pvk-cur .bk{animation:none;}}"
  ].join("");
  document.head.appendChild(css);

  function build() {
    var cur = document.createElement("div");
    cur.id = "pvk-cur";
    cur.innerHTML = '<i class="rg"></i><i class="t n"></i><i class="t s"></i><i class="t e"></i><i class="t w"></i><i class="bk"></i>';
    var ret = document.createElement("div");
    ret.id = "pvk-ret";
    ret.innerHTML = '<i class="c c1"></i><i class="c c2"></i><i class="c c3"></i><i class="c c4"></i>';
    document.body.appendChild(cur);
    document.body.appendChild(ret);
    document.documentElement.classList.add("pvk-cursor-on");

    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    var hot = false, down = false, seen = false;
    var SEL = "a,button,input,textarea,select,.row,.chip,.irow,.toggle,.read-link,[data-cursor]";

    // Restore the last pointer position from the previous page so the reticle
    // is visible immediately after a same-session navigation, instead of
    // vanishing until the next mouse move (the native cursor is hidden).
    try {
      var saved = sessionStorage.getItem("pvk-cur-pos");
      if (saved) {
        var p = saved.split(",");
        mx = rx = parseFloat(p[0]); my = ry = parseFloat(p[1]);
        seen = true;
        cur.style.opacity = ret.style.opacity = 1;
      }
    } catch (e) {}

    function reveal() { if (!seen) { seen = true; cur.style.opacity = ret.style.opacity = 1; } }

    addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      var t = e.target;
      hot = !!(t && t.closest && t.closest(SEL));
      reveal();
    }, { passive: true });
    addEventListener("mouseover", reveal, { passive: true });
    addEventListener("mousedown", function () { down = true; });
    addEventListener("mouseup", function () { down = false; });
    document.addEventListener("mouseleave", function () { cur.style.opacity = ret.style.opacity = 0; });
    document.addEventListener("mouseenter", function () { if (seen) cur.style.opacity = ret.style.opacity = 1; });

    var root = document.documentElement, save = 0;
    function loop() {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      cur.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      ret.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      var hotNow = hot || document.body.classList.contains("pvk-target");
      root.classList.toggle("pvk-hot", hotNow);
      root.classList.toggle("pvk-down", down);
      if ((save = (save + 1) % 12) === 0) { try { sessionStorage.setItem("pvk-cur-pos", Math.round(mx) + "," + Math.round(my)); } catch (e) {} }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
