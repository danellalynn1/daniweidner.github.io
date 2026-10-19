(function () {
  // Demos with a fixed native size (e.g. the 1464x928 admin console) are scaled to fit their frame.
  function fit() {
    document.querySelectorAll('.demo--fixed').forEach(function (f) {
      var el = f.querySelector('iframe');
      var w = parseFloat(f.getAttribute('data-w')) || 1464;
      if (el) el.style.transform = 'scale(' + (f.clientWidth / w) + ')';
    });
  }

  // Lazy-load a demo iframe the first time its panel is shown.
  function load(panel) {
    if (!panel) return;
    panel.querySelectorAll('iframe[data-src]').forEach(function (el) {
      el.src = el.getAttribute('data-src');
      el.removeAttribute('data-src');
    });
  }

  // "Try the work" tabs.
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; if (on) load(p); }
      });
      if (focus) tab.focus();
      fit();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    var first = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    if (first) select(first);
  });

  fit();
  window.addEventListener('resize', fit);
})();
