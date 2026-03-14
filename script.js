/* ════════════════════════════════════════
   MATRIX RAIN
════════════════════════════════════════ */
(function () {
  var canvas = document.getElementById('matrix-canvas');
  var ctx    = canvas.getContext('2d');
  var chars  = 'アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}|;:./\\';
  var fs = 13, W, H, drops;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    drops = [];
    for (var i = 0; i < Math.floor(W / fs); i++) drops[i] = 1;
  }
  function draw() {
    ctx.fillStyle = 'rgba(5,10,14,0.04)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ffe5';
    ctx.font = fs + 'px Share Tech Mono';
    for (var i = 0; i < drops.length; i++) {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
      if (drops[i] * fs > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();


/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
(function () {
  var dot   = document.getElementById('cursor');
  var ring  = document.getElementById('cursor-trail');
  if (!dot || !ring) return;

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var ringX  = mouseX;
  var ringY  = mouseY;

  /* Move dot instantly with mouse */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  /* Animate ring smoothly */
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Grow on hover */
  var targets = document.querySelectorAll('a, button, .project-card, .info-card, .gh-stat-card, .repo-card, .hex, .tech-tags span');
  targets.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', function () {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });
})();


/* ════════════════════════════════════════
   SCROLL PROGRESS
════════════════════════════════════════ */
window.addEventListener('scroll', function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  var d   = document.documentElement;
  var pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
  bar.style.width = pct + '%';
}, { passive: true });


/* ════════════════════════════════════════
   NAVBAR — scroll + active links
════════════════════════════════════════ */
window.addEventListener('scroll', function () {
  var nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

  var cur = '';
  document.querySelectorAll('section[id]').forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.style.color = (a.getAttribute('href') === '#' + cur) ? 'var(--accent)' : '';
  });
}, { passive: true });


/* ════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════ */
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('mobile-menu').classList.toggle('active');
});
function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('active');
}


/* ════════════════════════════════════════
   TYPING EFFECT
════════════════════════════════════════ */
(function () {
  var el    = document.getElementById('typed');
  var texts = ['BSc IT Student', 'Aspiring Cybersecurity Specialist', 'Full Stack Developer', 'Python Enthusiast', 'Problem Solver'];
  var ti = 0, ci = 0, del = false;
  function tick() {
    var cur = texts[ti];
    el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!del && ci === cur.length) { del = true; setTimeout(tick, 1800); return; }
    if (del  && ci === 0)          { del = false; ti = (ti + 1) % texts.length; }
    setTimeout(tick, del ? 50 : 80);
  }
  setTimeout(tick, 1000);
})();


/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
(function () {
  var sel = '.about-grid,.skills-container,.tech-tags,.projects-grid,.github-container,.contact-container,.section-header,.info-card,.skill-item,.project-card,.contact-item,.gh-stat-card';
  document.querySelectorAll(sel).forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('visible'); }, i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();


/* ════════════════════════════════════════
   SKILL BARS
════════════════════════════════════════ */
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute('data-width') + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.skill-fill').forEach(function (f) { io.observe(f); });
})();


/* ════════════════════════════════════════
   CONTRIBUTION GRID
════════════════════════════════════════ */
(function () {
  var grid = document.getElementById('contribution-grid');
  if (!grid) return;
  var levels = [0,0,0,0,1,1,2,2,3,4];
  var frag = document.createDocumentFragment();
  for (var w = 0; w < 52; w++) {
    for (var d = 0; d < 7; d++) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      if (Math.random() > 0.7) {
        var lvl = levels[Math.floor(Math.random() * levels.length)];
        if (lvl) cell.classList.add('l' + lvl);
      }
      frag.appendChild(cell);
    }
  }
  grid.appendChild(frag);
})();


/* ════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════ */
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.getAttribute('data-target'));
      var cur = 0, step = Math.ceil(target / 60);
      var t = setInterval(function () {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(t);
      }, 25);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.gh-num').forEach(function (n) { io.observe(n); });
})();


/* ════════════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});


/* ════════════════════════════════════════
   CLICK PARTICLES
════════════════════════════════════════ */
document.addEventListener('click', function (e) {
  for (var i = 0; i < 8; i++) {
    (function (i) {
      var p = document.createElement('div');
      p.style.cssText = 'position:fixed;width:4px;height:4px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9999;transition:all .6s ease;left:' + e.clientX + 'px;top:' + e.clientY + 'px';
      document.body.appendChild(p);
      var angle = (i / 8) * Math.PI * 2, dist = 30 + Math.random() * 30;
      setTimeout(function () {
        p.style.left      = (e.clientX + Math.cos(angle) * dist) + 'px';
        p.style.top       = (e.clientY + Math.sin(angle) * dist) + 'px';
        p.style.opacity   = '0';
        p.style.transform = 'scale(0)';
      }, 10);
      setTimeout(function () { p.remove(); }, 700);
    })(i);
  }
});


/* ════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  var btn = e.target.querySelector('.submit-btn'), orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = btn.style.borderColor = '#00ff88';
  btn.style.color = '#000';
  setTimeout(function () {
    btn.innerHTML = orig;
    btn.style.background = btn.style.borderColor = btn.style.color = '';
    e.target.reset();
  }, 3000);
}


/* ════════════════════════════════════════
   RESUME BUTTON RIPPLE
════════════════════════════════════════ */
document.querySelectorAll('.btn-resume').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var r = document.createElement('span');
    var rect = btn.getBoundingClientRect();
    r.style.cssText = 'position:absolute;border-radius:50%;width:4px;height:4px;background:rgba(0,255,229,.5);pointer-events:none;transition:transform .6s ease,opacity .6s ease;left:' + (e.clientX - rect.left) + 'px;top:' + (e.clientY - rect.top) + 'px;transform:translate(-50%,-50%) scale(1)';
    btn.appendChild(r);
    setTimeout(function () { r.style.transform = 'translate(-50%,-50%) scale(60)'; r.style.opacity = '0'; }, 10);
    setTimeout(function () { r.remove(); }, 700);
  });
});


/* ════════════════════════════════════════
   GITHUB LIVE REPOS API
════════════════════════════════════════ */
(function () {
  var GITHUB_TOKEN = ''; // paste your token here to raise API limits

  var allRepos = [], filteredRepos = [], activeLang = 'All', currentSort = 'updated', currentPage = 1;
  var PER_PAGE = 9;

  var LANG_COLORS = { JavaScript:'#f1e05a',Python:'#3572A5',Java:'#b07219',TypeScript:'#2b7489','C++':'#f34b7d','C#':'#178600',C:'#555555',Ruby:'#701516',Go:'#00ADD8',Rust:'#dea584',PHP:'#4F5D95',Swift:'#ffac45',Kotlin:'#F18E33',HTML:'#e34c26',CSS:'#563d7c',Shell:'#89e051',Dart:'#00B4AB',Vue:'#2c3e50' };
  function lc(l) { return LANG_COLORS[l] || '#00ffe5'; }
  function $(id) { return document.getElementById(id); }
  function hdrs() { var h = {'Accept':'application/vnd.github.v3+json'}; if (GITHUB_TOKEN) h['Authorization'] = 'token ' + GITHUB_TOKEN; return h; }

  async function fetchAll(user) {
    var page = 1, all = [];
    while (true) {
      var r = await fetch('https://api.github.com/users/' + encodeURIComponent(user) + '/repos?per_page=100&page=' + page, { headers: hdrs() });
      if (!r.ok) {
        if (r.status === 403) throw new Error('Rate limit exceeded. Try later.');
        if (r.status === 404) throw new Error('User "' + user + '" not found on GitHub.');
        throw new Error('GitHub API error ' + r.status);
      }
      var data = await r.json();
      all = all.concat(data);
      if (data.length < 100) break;
      page++;
    }
    return all;
  }

  function sortR(repos, key) {
    return repos.slice().sort(function (a, b) {
      if (key === 'stars') return b.stargazers_count - a.stargazers_count;
      if (key === 'forks') return b.forks_count - a.forks_count;
      if (key === 'name')  return a.name.localeCompare(b.name);
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  }

  function buildPills(repos) {
    var row = $('lang-filter-row'); row.innerHTML = '';
    var langs = ['All'].concat(Array.from(new Set(repos.map(function (r) { return r.language; }).filter(Boolean))).sort());
    langs.forEach(function (lang) {
      var btn = document.createElement('button');
      btn.className = 'lang-pill' + (lang === activeLang ? ' active' : '');
      if (lang !== 'All') { var dot = document.createElement('span'); dot.className = 'lang-dot'; dot.style.background = lc(lang); btn.appendChild(dot); }
      btn.appendChild(document.createTextNode(lang));
      btn.addEventListener('click', function () {
        activeLang = lang;
        document.querySelectorAll('.lang-pill').forEach(function (p) { p.classList.toggle('active', p.textContent.trim() === lang); });
        applyFilter();
      });
      row.appendChild(btn);
    });
  }

  function applyFilter() {
    filteredRepos = activeLang === 'All' ? allRepos : allRepos.filter(function (r) { return r.language === activeLang; });
    currentPage = 1; renderPage();
  }

  function relTime(d) {
    var diff = Date.now() - new Date(d), m = Math.floor(diff / 60000);
    if (m < 60) return m + 'm ago';
    var h = Math.floor(m / 60); if (h < 24) return h + 'h ago';
    var day = Math.floor(h / 24); if (day < 30) return day + 'd ago';
    var mo = Math.floor(day / 30); return mo < 12 ? mo + 'mo ago' : Math.floor(mo / 12) + 'y ago';
  }

  function buildCard(repo) {
    var card = document.createElement('div'); card.className = 'repo-card';
    card.innerHTML =
      '<div class="repo-card-header"><div class="repo-name-wrap"><i class="fas fa-folder" style="color:var(--accent);font-size:.9rem"></i>' +
      '<a href="' + repo.html_url + '" target="_blank" class="repo-name" title="' + repo.name + '">' + repo.name + '</a>' +
      (repo.fork ? '<span class="repo-fork-badge"><i class="fas fa-code-branch"></i> Fork</span>' : '') + '</div>' +
      '<span class="repo-visibility ' + (repo.private ? 'private' : 'public') + '">' + (repo.private ? 'PRIVATE' : 'PUBLIC') + '</span></div>' +
      '<p class="repo-desc' + (!repo.description ? ' empty' : '') + '">' + (repo.description || 'No description provided.') + '</p>' +
      (repo.topics && repo.topics.length ? '<div class="repo-topics">' + repo.topics.slice(0,5).map(function(t){return'<span class="repo-topic">'+t+'</span>';}).join('') + '</div>' : '') +
      '<div class="repo-meta">' +
      (repo.language ? '<span class="repo-meta-item"><span class="repo-lang-dot" style="background:' + lc(repo.language) + '"></span>' + repo.language + '</span>' : '') +
      '<span class="repo-meta-item"><i class="fas fa-star"></i> ' + repo.stargazers_count + '</span>' +
      '<span class="repo-meta-item"><i class="fas fa-code-branch"></i> ' + repo.forks_count + '</span>' +
      (repo.open_issues_count > 0 ? '<span class="repo-meta-item"><i class="fas fa-circle-dot"></i> ' + repo.open_issues_count + '</span>' : '') + '</div>' +
      '<div class="repo-card-footer"><span class="repo-updated">Updated ' + relTime(repo.updated_at) + '</span><div class="repo-links">' +
      (repo.homepage ? '<a href="' + repo.homepage + '" target="_blank" class="repo-link-btn"><i class="fas fa-external-link-alt"></i> Demo</a>' : '') +
      '<a href="' + repo.html_url + '" target="_blank" class="repo-link-btn"><i class="fab fa-github"></i> Code</a></div></div>';
    return card;
  }

  function renderPage() {
    var grid = $('repo-grid'), total = filteredRepos.length;
    grid.innerHTML = '';
    if (!total) { grid.innerHTML = '<div class="repo-empty"><i class="fas fa-folder-open"></i>No repositories match.</div>'; $('repo-pagination').innerHTML = ''; return; }
    filteredRepos.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE).forEach(function (r) { grid.appendChild(buildCard(r)); });
    buildPagination(total);
    grid.querySelectorAll('.repo-card').forEach(function (c, i) {
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
      setTimeout(function () { c.style.transition = 'opacity .5s ease,transform .5s ease,border-color .35s,box-shadow .35s'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 55);
    });
  }

  function buildPagination(total) {
    var pag = $('repo-pagination'), tp = Math.ceil(total / PER_PAGE);
    pag.innerHTML = ''; if (tp <= 1) return;
    function mkBtn(html, dis, active, fn) {
      var b = document.createElement('button');
      b.className = 'page-btn' + (active ? ' active' : ''); b.innerHTML = html; b.disabled = dis;
      if (!dis) b.addEventListener('click', fn); pag.appendChild(b);
    }
    mkBtn('<i class="fas fa-chevron-left"></i>', currentPage===1, false, function(){currentPage--;renderPage();});
    for (var p = 1; p <= tp; p++) {
      (function(pg){ mkBtn(pg, false, pg===currentPage, function(){currentPage=pg;renderPage();}); })(p);
    }
    var info = document.createElement('span'); info.className = 'page-info'; info.textContent = currentPage+'/'+tp; pag.appendChild(info);
    mkBtn('<i class="fas fa-chevron-right"></i>', currentPage===tp, false, function(){currentPage++;renderPage();});
  }

  function setStatus(msg, hide) {
    var el = $('gh-status'); if (!el) return;
    if (hide) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    var cmd = $('tl-cmd'); if (cmd) cmd.textContent = msg;
  }

  async function load() {
    var username = $('gh-username-input').value.trim();
    if (!username) { $('gh-username-input').focus(); return; }
    allRepos=[]; filteredRepos=[]; activeLang='All'; currentPage=1;
    $('repo-grid').innerHTML = $('repo-pagination').innerHTML = $('lang-filter-row').innerHTML = '';
    setStatus('fetching repos for "' + username + '"…');
    $('gh-load-btn').disabled = true; $('gh-load-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading…';
    try {
      allRepos = sortR(await fetchAll(username), currentSort);
      if (!allRepos.length) { setStatus(''); $('repo-grid').innerHTML = '<div class="repo-empty"><i class="fas fa-folder-open"></i>No public repos found.</div>'; return; }
      setStatus(allRepos.length + ' repos found!');
      buildPills(allRepos); applyFilter(); setStatus('', true);
    } catch(err) {
      setStatus(''); $('repo-grid').innerHTML = '<div class="repo-error"><i class="fas fa-triangle-exclamation"></i>' + err.message + '</div>';
    } finally {
      $('gh-load-btn').disabled = false; $('gh-load-btn').innerHTML = '<i class="fas fa-terminal"></i> Load Repos';
    }
  }

  document.querySelectorAll('.gh-filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.gh-filter-btn').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active'); currentSort = btn.getAttribute('data-sort');
      allRepos = sortR(allRepos, currentSort); filteredRepos = sortR(filteredRepos, currentSort);
      currentPage = 1; renderPage();
    });
  });

  $('gh-load-btn').addEventListener('click', load);
  $('gh-username-input').addEventListener('keydown', function(e){ if(e.key==='Enter') load(); });
  window.addEventListener('DOMContentLoaded', function(){ setTimeout(load, 500); });
})();
