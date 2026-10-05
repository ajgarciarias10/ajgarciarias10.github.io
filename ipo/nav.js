/* ============================================================================
   IPO · Barra de navegación compartida + tema claro/oscuro.
   Se carga en <head> (sin defer) para fijar el tema antes del primer pintado.
   ========================================================================== */
(function () {
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  // El modo oscuro (espacial) es el predeterminado.
  document.documentElement.setAttribute('data-theme', stored || 'dark');

  var LINKS = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'ponte-al-dia.html', label: 'Ponte al día' },
    { href: 'tema-1.html', label: 'Temas', match: ['tema-1.html', 'tema-2.html', 'tema-3.html', 'tema-4.html'] },
    { href: 'generador.html', label: 'Practicar', match: ['generador.html', 'test-clevertracker.html'] },
    { href: 'guia-estudio.html', label: 'Guía' },
    { href: 'calendario.html', label: 'Calendario' }
  ];

  function pageName() {
    var p = location.pathname.split('/').pop();
    return p || 'index.html';
  }

  function render() {
    if (document.querySelector('.site-nav')) return;
    var current = pageName();
    var links = LINKS.map(function (l) {
      var active = (l.match || [l.href]).indexOf(current) !== -1;
      return '<a href="' + l.href + '"' + (active ? ' class="is-active" aria-current="page"' : '') + '>' + l.label + '</a>';
    }).join('');

    var nav = document.createElement('header');
    nav.className = 'site-nav';
    nav.innerHTML =
      '<div class="site-nav-inner">' +
        '<a class="site-brand" href="index.html" aria-label="Inicio · IPO Study Lab">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="4" fill="currentColor"/>' +
            '<ellipse cx="12" cy="12" rx="10.5" ry="4.2" stroke="currentColor" stroke-width="1.3" opacity=".55" transform="rotate(-20 12 12)"/>' +
          '</svg>' +
          '<span>IPO<span class="site-brand-sub"> · UJA</span></span>' +
        '</a>' +
        '<nav class="site-links" aria-label="Navegación principal">' + links + '</nav>' +
        '<button type="button" class="site-theme" aria-label="Cambiar entre modo claro y oscuro" title="Modo claro / oscuro">' +
          '<svg class="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>' +
          '<svg class="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>' +
        '</button>' +
      '</div>';

    document.body.insertBefore(nav, document.body.firstChild);

    nav.querySelector('.site-theme').addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });

    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
