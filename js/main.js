(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function chips(list) { return '<div class="chips">' + list.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>'; }

  // ---------- static fills ----------
  $('#footer-year').textContent = new Date().getFullYear();
  $('#name-first').textContent = P.person.first;
  $('#name-last').textContent = P.person.last;
  $('#hero-title').textContent = P.person.title;
  $('#hero-status').textContent = P.person.status;
  $('#nav-cv').href = P.person.cv;

  if (P.draft) {
    var banner = $('#draft-banner');
    banner.innerHTML = '<b>● Draft</b><span>Sample content: edit js/content.js, then set draft: false</span><button type="button" aria-label="Dismiss">✕</button>';
    banner.hidden = false;
    $('button', banner).addEventListener('click', function () { banner.hidden = true; });
  }

  // ---------- hero ----------
  $('#hero-intro').innerHTML = esc(P.hero.intro).replace(esc(P.hero.highlight), '<strong>' + esc(P.hero.highlight) + '</strong>');

  // facts strip: current role, education, certificates (all derived from content)
  var current = P.experience[0];
  var edu = P.experience.filter(function (x) { return /bachelor|master|degree/i.test(x.role); })[0];
  var facts = [
    current && ['Currently', current.role, current.org],
    edu && ['Education', edu.role.replace(/^Bachelor of /, 'B.Sc. '), edu.org],
    P.certificates.length && ['Certified', P.certificates.length + ' certificates', P.certificates.slice(0, 2).map(function (c) {
      var m = c[0].match(/\(([^)]+)\)/); return m ? m[1] : c[0];
    }).join(' · ')],
  ].filter(Boolean);
  $('#hero-facts').innerHTML = facts.map(function (f) {
    return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '<span>' + esc(f[2]) + '</span></dd></div>';
  }).join('');

  // ---------- about ----------
  $('#about-lead').textContent = P.about.lead;
  $('#about-body').innerHTML = P.about.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

  // ---------- skills ----------
  $('#skills-list').innerHTML = P.capabilities.map(function (c, i) {
    return '<li class="skill" data-reveal>' +
      '<span class="skill__n">' + pad(i + 1) + '</span>' +
      '<h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p>' + chips(c.tools) + '</li>';
  }).join('');

  // ---------- experience ----------
  var BADGE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M9 14.5L7.5 22 12 19.5 16.5 22 15 14.5"/></svg>';
  var projCount = 0;
  function project(p) {
    var id = 'proj-more-' + (projCount++);
    return '<article class="proj">' +
      '<h4 class="proj__title">' + esc(p.title) + '</h4>' +
      '<p class="proj__summary">' + esc(p.summary) + (p.ai ? ' ' + esc(p.ai) : '') + '</p>' +
      (p.stack ? '<div class="proj__stack"><b>Tools</b>' + chips(p.stack) + '</div>' : '') +
      '<div class="proj__foot">' +
        '<button class="proj__toggle" type="button" aria-expanded="false" aria-controls="' + id + '"><span>Details</span><i aria-hidden="true"></i></button>' +
        (p.url ? '<a class="proj__link" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">Visit website ↗</a>' : '') +
      '</div>' +
      '<div class="proj__more" id="' + id + '"><div>' +
        '<ul>' + p.points.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' +
      '</div></div>' +
    '</article>';
  }

  $('#xp-list').innerHTML = P.experience.map(function (x) {
    var now = /present/i.test(x.period);
    return '<li data-reveal' + (now ? ' class="is-current"' : '') + '>' +
      '<div class="xp__period">' + esc(x.period) + (now ? ' <span class="xp__now">Now</span>' : '') + '</div>' +
      '<div class="xp__body">' +
        '<h3 class="xp__role">' + esc(x.role) + '<span>' + esc(x.org) + (x.place ? ' · ' + esc(x.place) : '') + '</span></h3>' +
        '<p class="xp__text">' + esc(x.text) + '</p>' +
        (x.highlights ? '<ul class="xp__highlights">' + x.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' : '') +
        (x.tools ? '<div class="xp__tools">' + chips(x.tools) + '</div>' : '') +
        (x.projects ? '<p class="xp__sublabel">' + (x.projects.length > 1 ? 'Projects' : 'Project') + '</p>' +
          '<div class="xp__projects">' + x.projects.map(project).join('') + '</div>' : '') +
      '</div></li>';
  }).join('');

  $('#project-list').innerHTML = P.projects.map(project).join('');

  $$('.proj__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.proj'), open = !card.classList.contains('is-open');
      card.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open);
      $('span', btn).textContent = open ? 'Less' : 'Details';
    });
  });
  $('#cert-list').innerHTML = P.certificates.map(function (c) {
    return '<li><span class="certs__icon">' + BADGE + '</span><div><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></div></li>';
  }).join('');

  // ---------- contact ----------
  var email = P.person.email;
  $('#email-text').textContent = email;
  var links = [{ label: 'Email', href: 'mailto:' + email }].concat(P.person.links, [{ label: 'CV', href: P.person.cv }])
    .filter(function (l) { return l.href; });
  $('#contact-links').innerHTML = links.map(function (l) {
    var ext = /^https?:|\.pdf$/.test(l.href);
    return '<li><a class="btn btn--ghost btn--small" href="' + esc(l.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l.label) + ' ↗</a></li>';
  }).join('');
  $('#email-btn').addEventListener('click', function () {
    var hint = $('#email-hint');
    function done(msg) { hint.textContent = msg; setTimeout(function () { hint.textContent = 'Copy'; }, 2000); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { done('Copied ✓'); }, function () { location.href = 'mailto:' + email; });
    } else {
      location.href = 'mailto:' + email;
    }
  });

  // ---------- theme toggle ----------
  var root = document.documentElement, themeBtn = $('#theme-toggle'), darkMQ = matchMedia('(prefers-color-scheme: dark)');
  function isDark() { var t = root.getAttribute('data-theme'); return t ? t === 'dark' : darkMQ.matches; }
  function syncTheme() {
    var dark = isDark();
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    $$('meta[name="theme-color"]').forEach(function (m) { m.content = dark ? '#0E141E' : '#FAFBFD'; });
  }
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.classList.add('theming');
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncTheme();
    setTimeout(function () { root.classList.remove('theming'); }, 400);
  });
  if (darkMQ.addEventListener) darkMQ.addEventListener('change', syncTheme); else if (darkMQ.addListener) darkMQ.addListener(syncTheme);
  syncTheme();

  // ---------- mobile menu ----------
  var menuBtn = $('#menu-btn'), navEl = $('#nav');
  function setMenu(open) {
    navEl.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!navEl.classList.contains('menu-open')); });
  $$('#mobile-menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navEl.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (navEl.classList.contains('menu-open') && !navEl.contains(e.target)) setMenu(false);
  });
  var wideMQ = matchMedia('(min-width: 721px)'), onWide = function (e) { if (e.matches) setMenu(false); };
  if (wideMQ.addEventListener) wideMQ.addEventListener('change', onWide); else if (wideMQ.addListener) wideMQ.addListener(onWide);

  // ---------- name typing, streamed like an LLM reply ----------
  (function () {
    var h1 = $('.hero__name'), lines = [$('#name-first'), $('#name-last')], texts = [P.person.first, P.person.last];
    h1.setAttribute('aria-label', texts.join(' '));
    lines.forEach(function (el) { el.setAttribute('aria-hidden', 'true'); });
    if (reduceMotion) return;

    var li = 0, ci = 0;
    function render() {
      lines.forEach(function (el, i) {
        var n = i < li ? texts[i].length : i === li ? ci : 0;
        el.innerHTML = esc(texts[i].slice(0, n)) + (i === li ? '<span class="caret"></span>' : '') +
          '<span class="ghost">' + esc(texts[i].slice(n)) + '</span>';
      });
    }
    function step() {
      ci = Math.min(texts[li].length, ci + (Math.random() < .35 ? 2 : 1));
      render();
      if (ci < texts[li].length) return setTimeout(step, 45 + Math.random() * 75);
      if (li < texts.length - 1) { li++; ci = 0; return setTimeout(step, 160); }
      h1.classList.add('is-done');
      setTimeout(function () { var c = $('.caret', h1); if (c) c.remove(); }, 3200);
    }
    render();
    setTimeout(step, 450);
  })();

  // ---------- cursor glow on cards ----------
  $$('.proj, .skill, .certs__list li').forEach(function (el) { el.classList.add('glow'); });
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.glow');
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  // ---------- reveal ----------
  var reveals = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var k = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.setProperty('--d', (k++ * 0.08) + 's');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // ---------- scroll: nav state, progress ----------
  var nav = $('#nav'), bar = $('.progress span'), lastY = scrollY, ticking = false;
  function onScroll() {
    var y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-scrolled', y > 20);
    if (y > 500 && y > lastY + 4 && !nav.classList.contains('menu-open')) nav.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 500) nav.classList.remove('is-hidden');
    lastY = y;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  var navLinks = $$('.nav__links a, .menu a');
  var sectionIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'about', 'experience', 'skills', 'contact'].forEach(function (id) { sectionIO.observe(document.getElementById(id)); });
})();
