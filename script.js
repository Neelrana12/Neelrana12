/* ════════════════════════════════════════
   MATRIX RAIN
════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas.getContext('2d');
  const chars  = 'アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}|;:./\\';
  const fs     = 13;
  let W, H, drops;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    drops = Array(Math.floor(W / fs)).fill(1);
  }
  function draw() {
    ctx.fillStyle = 'rgba(5,10,14,0.04)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ffe5';
    ctx.font = fs + 'px Share Tech Mono';
    drops.forEach((d, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, d * fs);
      drops[i] = (d * fs > H && Math.random() > 0.975) ? 0 : d + 1;
    });
  }
  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();


/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
(function () {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function loop() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .project-card, .info-card, .gh-stat-card, .repo-card, .hex').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      trail.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      trail.classList.remove('hover');
    });
  });
})();


/* ════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════ */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const d   = document.documentElement;
    const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


/* ════════════════════════════════════════
   NAVBAR SCROLL + ACTIVE LINKS
════════════════════════════════════════ */
(function () {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    let cur = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
    });
  }, { passive: true });
})();


/* ════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════ */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('active');
});
function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('active');
}


/* ════════════════════════════════════════
   TYPING EFFECT
════════════════════════════════════════ */
(function () {
  const el    = document.getElementById('typed');
  const texts = [
    'BSc IT Student',
    'Aspiring Cybersecurity Specialist',
    'Full Stack Developer',
    'Python Enthusiast',
    'Problem Solver'
  ];
  let ti = 0, ci = 0, del = false;
  function tick() {
    const cur = texts[ti];
    el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!del && ci === cur.length) { del = true; setTimeout(tick, 1800); return; }
    if (del && ci === 0)           { del = false; ti = (ti + 1) % texts.length; }
    setTimeout(tick, del ? 50 : 80);
  }
  setTimeout(tick, 1000);
})();


/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
(function () {
  const sel = [
    '.about-grid','.skills-container','.tech-tags','.projects-grid',
    '.github-container','.contact-container','.section-header',
    '.info-card','.skill-item','.project-card','.contact-item','.gh-stat-card'
  ].join(',');

  document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();


/* ════════════════════════════════════════
   SKILL BARS
════════════════════════════════════════ */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute('data-width') + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.skill-fill').forEach(f => io.observe(f));
})();


/* ════════════════════════════════════════
   CONTRIBUTION GRID
════════════════════════════════════════ */
(function () {
  const grid = document.getElementById('contribution-grid');
  if (!grid) return;
  const levels = [0, 0, 0, 0, 1, 1, 2, 2, 3, 4];
  const frag   = document.createDocumentFragment();
  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < 7; d++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (Math.random() > 0.7) {
        const lvl = levels[Math.floor(Math.random() * levels.length)];
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
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.getAttribute('data-target');
      let cur  = 0;
      const step = Math.ceil(target / 60);
      const t    = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(t);
      }, 25);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.gh-num').forEach(n => io.observe(n));
})();


/* ════════════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});


/* ════════════════════════════════════════
   CLICK PARTICLES
════════════════════════════════════════ */
document.addEventListener('click', e => {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    Object.assign(p.style, {
      position:'fixed', left:e.clientX+'px', top:e.clientY+'px',
      width:'4px', height:'4px', borderRadius:'50%',
      background:'var(--accent)', pointerEvents:'none', zIndex:'9999',
      transition:'all .6s ease'
    });
    document.body.appendChild(p);
    const angle = (i / 8) * Math.PI * 2, dist = 30 + Math.random() * 30;
    setTimeout(() => {
      p.style.left      = (e.clientX + Math.cos(angle) * dist) + 'px';
      p.style.top       = (e.clientY + Math.sin(angle) * dist) + 'px';
      p.style.opacity   = '0';
      p.style.transform = 'scale(0)';
    }, 10);
    setTimeout(() => p.remove(), 700);
  }
});


/* ════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('.submit-btn');
  const orig = btn.innerHTML;
  btn.innerHTML        = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background  = '#00ff88';
  btn.style.borderColor = '#00ff88';
  btn.style.color       = '#000';
  setTimeout(() => {
    btn.innerHTML        = orig;
    btn.style.background = btn.style.borderColor = btn.style.color = '';
    e.target.reset();
  }, 3000);
}


/* ════════════════════════════════════════
   RESUME BUTTON RIPPLE
════════════════════════════════════════ */
document.querySelectorAll('.btn-resume').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    Object.assign(ripple.style, {
      position:'absolute', borderRadius:'50%', width:'4px', height:'4px',
      background:'rgba(0,255,229,.5)',
      left:(e.clientX - rect.left)+'px', top:(e.clientY - rect.top)+'px',
      transform:'translate(-50%,-50%) scale(1)',
      transition:'transform .6s ease, opacity .6s ease', pointerEvents:'none'
    });
    btn.appendChild(ripple);
    setTimeout(() => { ripple.style.transform = 'translate(-50%,-50%) scale(60)'; ripple.style.opacity = '0'; }, 10);
    setTimeout(() => ripple.remove(), 700);
  });
});


/* ════════════════════════════════════════
   GITHUB LIVE REPOS API
════════════════════════════════════════ */
const GitHubRepos = (() => {

  const GITHUB_TOKEN = ''; // optional: paste your token here

  let allRepos = [], filteredRepos = [], activeLang = 'All', currentSort = 'updated', currentPage = 1;
  const PER_PAGE = 9;

  const $ = id => document.getElementById(id);

  const LANG_COLORS = {
    JavaScript:'#f1e05a', Python:'#3572A5', Java:'#b07219', TypeScript:'#2b7489',
    'C++':'#f34b7d', 'C#':'#178600', C:'#555555', Ruby:'#701516', Go:'#00ADD8',
    Rust:'#dea584', PHP:'#4F5D95', Swift:'#ffac45', Kotlin:'#F18E33',
    HTML:'#e34c26', CSS:'#563d7c', Shell:'#89e051', Dart:'#00B4AB',
    Scala:'#c22d40', R:'#198CE7', Vue:'#2c3e50'
  };
  const lc = lang => LANG_COLORS[lang] || '#00ffe5';

  function hdrs() {
    const h = { 'Accept': 'application/vnd.github.v3+json' };
    if (GITHUB_TOKEN) h['Authorization'] = 'token ' + GITHUB_TOKEN;
    return h;
  }

  async function fetchAll(username) {
    let page = 1, all = [];
    while (true) {
      const r = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}`, { headers: hdrs() });
      if (!r.ok) {
        if (r.status === 403) throw new Error('Rate limit exceeded. Try later or add a GitHub token.');
        if (r.status === 404) throw new Error(`User "${username}" not found on GitHub.`);
        throw new Error(`GitHub API error ${r.status}.`);
      }
      const data = await r.json();
      all = all.concat(data);
      if (data.length < 100) break;
      page++;
    }
    return all;
  }

  function sort(repos, key) {
    return [...repos].sort((a, b) => {
      if (key === 'stars') return b.stargazers_count - a.stargazers_count;
      if (key === 'forks') return b.forks_count - a.forks_count;
      if (key === 'name')  return a.name.localeCompare(b.name);
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  }

  function buildLangPills(repos) {
    const row   = $('lang-filter-row');
    row.innerHTML = '';
    const langs = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))).sort()];
    langs.forEach(lang => {
      const btn = document.createElement('button');
      btn.className = 'lang-pill' + (lang === activeLang ? ' active' : '');
      if (lang !== 'All') {
        const dot = document.createElement('span');
        dot.className = 'lang-dot'; dot.style.background = lc(lang);
        btn.appendChild(dot);
      }
      btn.appendChild(document.createTextNode(lang));
      btn.addEventListener('click', () => {
        activeLang = lang;
        document.querySelectorAll('.lang-pill').forEach(p => p.classList.toggle('active', p.textContent.trim() === lang));
        applyFilter();
      });
      row.appendChild(btn);
    });
  }

  function applyFilter() {
    filteredRepos = activeLang === 'All' ? allRepos : allRepos.filter(r => r.language === activeLang);
    currentPage = 1;
    renderPage();
  }

  function renderPage() {
    const grid  = $('repo-grid');
    const total = filteredRepos.length;
    grid.innerHTML = '';
    if (total === 0) {
      grid.innerHTML = '<div class="repo-empty"><i class="fas fa-folder-open"></i>No repositories match this filter.</div>';
      $('repo-pagination').innerHTML = '';
      return;
    }
    filteredRepos.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE).forEach(r => grid.appendChild(buildCard(r)));
    buildPagination(total);
    grid.querySelectorAll('.repo-card').forEach((card, i) => {
      card.style.cssText += 'opacity:0;transform:translateY(20px)';
      setTimeout(() => { card.style.transition = 'opacity .5s ease, transform .5s ease, border-color .35s, box-shadow .35s'; card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, i * 55);
    });
  }

  function relTime(d) {
    const diff = Date.now() - new Date(d), m = Math.floor(diff / 60000);
    if (m < 60) return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    const day = Math.floor(h / 24);
    if (day < 30) return day + 'd ago';
    const mo = Math.floor(day / 30);
    return mo < 12 ? mo + 'mo ago' : Math.floor(mo / 12) + 'y ago';
  }

  function buildCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.innerHTML = `
      <div class="repo-card-header">
        <div class="repo-name-wrap">
          <i class="fas fa-folder" style="color:var(--accent);font-size:.9rem"></i>
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-name" title="${repo.name}">${repo.name}</a>
          ${repo.fork ? '<span class="repo-fork-badge"><i class="fas fa-code-branch"></i> Fork</span>' : ''}
        </div>
        <span class="repo-visibility ${repo.private ? 'private' : 'public'}">${repo.private ? 'PRIVATE' : 'PUBLIC'}</span>
      </div>
      <p class="repo-desc${!repo.description ? ' empty' : ''}">${repo.description || 'No description provided.'}</p>
      ${repo.topics && repo.topics.length ? '<div class="repo-topics">' + repo.topics.slice(0,5).map(t=>`<span class="repo-topic">${t}</span>`).join('') + '</div>' : ''}
      <div class="repo-meta">
        ${repo.language ? `<span class="repo-meta-item"><span class="repo-lang-dot" style="background:${lc(repo.language)}"></span>${repo.language}</span>` : ''}
        <span class="repo-meta-item"><i class="fas fa-star"></i> ${repo.stargazers_count.toLocaleString()}</span>
        <span class="repo-meta-item"><i class="fas fa-code-branch"></i> ${repo.forks_count.toLocaleString()}</span>
        ${repo.open_issues_count > 0 ? `<span class="repo-meta-item"><i class="fas fa-circle-dot"></i> ${repo.open_issues_count}</span>` : ''}
      </div>
      <div class="repo-card-footer">
        <span class="repo-updated">Updated ${relTime(repo.updated_at)}</span>
        <div class="repo-links">
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="repo-link-btn"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-link-btn"><i class="fab fa-github"></i> Code</a>
        </div>
      </div>`;
    return card;
  }

  function buildPagination(total) {
    const pag = $('repo-pagination'), totalPages = Math.ceil(total / PER_PAGE);
    pag.innerHTML = '';
    if (totalPages <= 1) return;

    const mk = (label, disabled, active, onClick) => {
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (active ? ' active' : '');
      btn.innerHTML = label; btn.disabled = disabled;
      if (!disabled) btn.addEventListener('click', onClick);
      pag.appendChild(btn);
    };

    mk('<i class="fas fa-chevron-left"></i>', currentPage === 1, false, () => { currentPage--; renderPage(); });

    const lo = Math.max(2, currentPage - 2), hi = Math.min(totalPages - 1, currentPage + 2);
    mk('1', false, currentPage === 1, () => { currentPage = 1; renderPage(); });
    if (lo > 2) { const s = document.createElement('span'); s.className='page-info'; s.textContent='…'; pag.appendChild(s); }
    for (let p = lo; p <= hi; p++) {
      const pg = p;
      mk(p, false, p === currentPage, () => { currentPage = pg; renderPage(); });
    }
    if (hi < totalPages - 1) { const s = document.createElement('span'); s.className='page-info'; s.textContent='…'; pag.appendChild(s); }
    if (totalPages > 1) mk(totalPages, false, currentPage === totalPages, () => { currentPage = totalPages; renderPage(); });

    const info = document.createElement('span'); info.className='page-info'; info.textContent=`${currentPage}/${totalPages}`; pag.appendChild(info);
    mk('<i class="fas fa-chevron-right"></i>', currentPage === totalPages, false, () => { currentPage++; renderPage(); });
  }

  function setStatus(msg, hide = false) {
    const el = $('gh-status');
    if (hide) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    const cmd = $('tl-cmd'); if (cmd) cmd.textContent = msg;
  }

  async function load() {
    const username = $('gh-username-input').value.trim();
    if (!username) { $('gh-username-input').focus(); return; }

    allRepos = []; filteredRepos = []; activeLang = 'All'; currentPage = 1;
    $('repo-grid').innerHTML = $('repo-pagination').innerHTML = $('lang-filter-row').innerHTML = '';

    setStatus(`fetching repos for "${username}"…`);
    $('gh-load-btn').disabled = true;
    $('gh-load-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading…';

    try {
      allRepos = sort(await fetchAll(username), currentSort);
      if (!allRepos.length) { setStatus(''); $('repo-grid').innerHTML = '<div class="repo-empty"><i class="fas fa-folder-open"></i>No public repositories found.</div>'; return; }
      setStatus(`${allRepos.length} repos found!`);
      buildLangPills(allRepos); applyFilter(); setStatus('', true);
    } catch (err) {
      setStatus('');
      $('repo-grid').innerHTML = `<div class="repo-error"><i class="fas fa-triangle-exclamation"></i>${err.message}</div>`;
    } finally {
      $('gh-load-btn').disabled = false;
      $('gh-load-btn').innerHTML = '<i class="fas fa-terminal"></i> Load Repos';
    }
  }

  document.querySelectorAll('.gh-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gh-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.getAttribute('data-sort');
      allRepos = sort(allRepos, currentSort);
      filteredRepos = sort(filteredRepos, currentSort);
      currentPage = 1; renderPage();
    });
  });

  $('gh-load-btn').addEventListener('click', load);
  $('gh-username-input').addEventListener('keydown', e => { if (e.key === 'Enter') load(); });
  window.addEventListener('DOMContentLoaded', () => setTimeout(load, 500));

  return { load };
})();