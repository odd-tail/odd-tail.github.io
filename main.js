(() => {
  const c = window.ODD_TAIL;
  // 위치·크기·속도는 매 방문마다 달라지고, 움직임은 CSS로 처리합니다.
  const snow = document.getElementById('snowfall');
  for (let i = 0; i < 108; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    const duration = 18 + Math.random() * 20;
    flake.style.cssText = `--x:${Math.random() * 100}%;--size:${3 + Math.random() * 5}px;--blur:${0.3 + Math.random() * 0.5}px;--opacity:${0.5 + Math.random() * 0.35};--duration:${duration}s;--delay:${-Math.random() * duration}s;--drift:${Math.random() * 60 - 30}px`;
    snow.append(flake);
  }
  const set = (id, value) => document.getElementById(id).textContent = value;
  set('english-name', c.englishName);
  set('slogan', c.slogan); set('description', c.description);
  document.getElementById('description').hidden = !c.description;
  set('copyright', `© ${c.englishName}. All rights reserved.`);
  document.title = `${c.name} ${c.englishName} — ${c.slogan}`;
  document.querySelector('meta[name="description"]').content = c.metaDescription || c.description;
  document.querySelector('meta[property="og:title"]').content = `${c.name} ${c.englishName}`;
  document.querySelector('meta[property="og:description"]').content = c.metaDescription || c.description;
  if (c.image) {
    const img = new Image(); img.src = c.image; img.alt = c.imageAlt;
    img.addEventListener('error', () => img.remove());
    document.getElementById('brand-image').append(img);
  }
  if (/^https?:\/\//.test(c.shareImage)) {
    const meta = document.createElement('meta'); meta.setAttribute('property', 'og:image');
    meta.content = c.shareImage; document.head.append(meta);
  }
  const news = c.announcement;
  document.getElementById('announcement').hidden = !news?.visible;
  if (news?.visible) {
    set('announcement-title', news.title);
    set('event-name', news.eventName);
    set('event-dates', news.dates);
    set('event-venue', news.venue);
    set('event-booth', news.booth);
    if (/^https?:\/\/[^\s]+$/i.test(news.url.trim())) {
      const link = document.getElementById('announcement-link');
      link.href = news.url.trim(); link.hidden = false;
    }
  }
  const icons = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 3h4.5L20 21h-4.5L4 3Zm0 18 7-8M14 10l6-7"/></svg>',
  };
  c.links.filter(l => l.visible && /^(https?:\/\/|mailto:)[^\s]+$/i.test(l.url.trim())).forEach(l => {
    const social = ['instagram', 'x'].includes(l.icon);
    const a = document.createElement('a'); a.className = social ? 'social-link' : 'link'; a.href = l.url.trim();
    if (social) { a.setAttribute('aria-label', l.label); a.title = l.label; }
    const icon = document.createElement('span'); icon.className = 'link-icon'; icon.setAttribute('aria-hidden', 'true'); icon.innerHTML = icons[l.icon] || '✧';
    const text = document.createElement('span');
    const title = document.createElement('span'); title.className = 'link-title'; title.textContent = l.label;
    const detail = document.createElement('span'); detail.className = 'link-detail'; detail.textContent = l.detail;
    text.append(title, detail);
    a.append(icon);
    if (!social) a.append(text);
    document.getElementById(social ? 'social-links' : 'links').append(a);
  });
  document.getElementById('links').closest('nav').hidden = !document.getElementById('links').children.length;
  document.getElementById('social-links').hidden = !document.getElementById('social-links').children.length;
})();
