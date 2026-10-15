/*
 * Hero background: a drifting neural network that lights up near the cursor,
 * with signals travelling along its connections.
 * To remove it: delete this file, its <script> tag and the <canvas class="hero__net"> in index.html.
 */
(function () {
  'use strict';

  var canvas = document.querySelector('.hero__net');
  if (!canvas || !canvas.getContext) return;
  var hero = canvas.closest('.hero'), ctx = canvas.getContext('2d');
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0, H = 0, dpr = 1, nodes = [], pulses = [];
  var mouse = { x: -9999, y: -9999, on: false };
  var LINK = 150, REACH = 190;
  var colors = { line: '112,142,181', node: '85,114,154', hot: '112,142,181' };

  function rgb(v) {
    var m = v.trim().match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)].join(',') : null;
  }
  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors.line = rgb(cs.getPropertyValue('--steel')) || colors.line;
    colors.node = rgb(cs.getPropertyValue('--steel-deep')) || colors.node;
    colors.hot = rgb(cs.getPropertyValue('--steel')) || colors.hot;
  }

  function resize() {
    var r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = Math.max(28, Math.min(95, Math.round(W * H / 13000)));
    while (nodes.length < target) nodes.push(makeNode());
    nodes.length = target;
    nodes.forEach(function (n) { n.x = Math.min(n.x, W); n.y = Math.min(n.y, H); });
  }
  function makeNode() {
    return {
      x: Math.random() * (W || 1200), y: Math.random() * (H || 700),
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: 1.3 + Math.random() * 1.5, glow: 0,
    };
  }

  function spawnPulse() {
    var a = nodes[(Math.random() * nodes.length) | 0], best = null, bd = LINK;
    nodes.forEach(function (b) {
      if (b === a) return;
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < bd && d > 40 && Math.random() < .5) { bd = d; best = b; }
    });
    if (best) pulses.push({ a: a, b: best, t: 0, speed: 1.6 / bd });
  }

  var frame = 0, last = 0, running = false, visible = true;
  function tick(now) {
    if (!running) return;
    var dt = Math.min(3, (now - (last || now)) / 16.67); last = now;
    if (++frame % 30 === 0) readColors();
    if (!reduceMotion && Math.random() < .045 * dt) spawnPulse();
    draw(dt);
    requestAnimationFrame(tick);
  }

  function draw(dt) {
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, d, dx, dy, alpha;

    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      if (!reduceMotion) {
        a.x += a.vx * dt; a.y += a.vy * dt;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
      }
      d = mouse.on ? Math.hypot(a.x - mouse.x, a.y - mouse.y) : 9999;
      var near = d < REACH ? 1 - d / REACH : 0;
      a.glow += (near - a.glow) * .12;
      // gentle pull toward the cursor
      if (near > 0 && !reduceMotion) { a.x += (mouse.x - a.x) * .0035 * near; a.y += (mouse.y - a.y) * .0035 * near; }
    }

    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y;
        if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d > LINK) continue;
        alpha = (1 - d / LINK) * (.16 + Math.max(a.glow, b.glow) * .5);
        ctx.strokeStyle = 'rgba(' + colors.line + ',' + alpha.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      // links to the cursor
      if (a.glow > .05) {
        ctx.strokeStyle = 'rgba(' + colors.hot + ',' + (a.glow * .35).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }

    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      if (a.glow > .05) {
        ctx.fillStyle = 'rgba(' + colors.hot + ',' + (a.glow * .18).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r + 6 * a.glow, 0, 6.283); ctx.fill();
      }
      ctx.fillStyle = 'rgba(' + colors.node + ',' + (.45 + a.glow * .55).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r + a.glow * 1.2, 0, 6.283); ctx.fill();
    }

    // signals travelling along connections
    for (i = pulses.length - 1; i >= 0; i--) {
      var p = pulses[i];
      p.t += p.speed * dt;
      if (p.t >= 1) { p.b.glow = Math.max(p.b.glow, .6); pulses.splice(i, 1); continue; }
      var x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
      ctx.fillStyle = 'rgba(' + colors.hot + ',.25)';
      ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(' + colors.hot + ',.95)';
      ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 6.283); ctx.fill();
    }
  }

  function setRunning(on) {
    on = on && visible && !document.hidden;
    if (on === running) return;
    running = on; last = 0;
    if (on) requestAnimationFrame(tick);
  }

  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = e.pointerType === 'mouse';
  }, { passive: true });
  hero.addEventListener('pointerleave', function () { mouse.on = false; });

  var resizeTimer;
  addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(function () { resize(); if (reduceMotion) draw(0); }, 150); });

  readColors();
  resize();
  hero.classList.add('has-net');

  if (reduceMotion) {
    // one still frame, redrawn when the theme changes
    draw(0);
    new MutationObserver(function () { readColors(); draw(0); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; setRunning(true); }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { setRunning(!document.hidden); });
  setRunning(true);
})();
