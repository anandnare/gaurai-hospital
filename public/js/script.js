/* Gaurai Hospital - main script.
   Sections: 1 settings  2 icons  3 data  4 theme+language  5 header/footer  6 page renderers  7 forms  8 init */
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const store = {
  get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---------- 1. SETTINGS: change your hospital details here ---------- */
const CONFIG = {
  phone: '+91 98765 43210', phoneHref: '+919876543210',
  emergency: '+91 98765 00000', emergencyHref: '+919876500000',
  email: 'info@gauraihospital.com',
  social: {
    facebook: 'https://facebook.com/gauraihospital',
    instagram: 'https://instagram.com/gauraihospital',
    youtube: 'https://youtube.com/@gauraihospital',
    x: 'https://x.com/gauraihospital',
    linkedin: 'https://linkedin.com/company/gauraihospital',
    whatsapp: 'https://wa.me/919876543210'
  }
};

/* ---------- 2. ICONS ---------- */
const ICONS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  pill: '<path d="M10.5 20.5l-7-7a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z"/><path d="M8.5 8.5l7 7"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  xray: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M8 10h8M9 14h6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="M9.75 15l5.75-3-5.75-3z"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  whatsapp: '<path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4L3 21z"/><path d="M9 10c0 3 2 5 5 5l1.5-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/>'
};
const ic = (n, s = 22) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ---------- 3. DATA: departments, doctors, tests, gallery ---------- */
const DEPTS = [
  { id: 'gen', key: 'dept_gen', icon: 'user' }, { id: 'cardio', key: 'dept_cardio', icon: 'heart' },
  { id: 'gyn', key: 'dept_gyn', icon: 'user' }, { id: 'peds', key: 'dept_peds', icon: 'smile' },
  { id: 'ortho', key: 'dept_ortho', icon: 'xray' }, { id: 'derm', key: 'dept_derm', icon: 'shield' },
  { id: 'ent', key: 'dept_ent', icon: 'plus' }, { id: 'dental', key: 'dept_dental', icon: 'smile' }
];
// days: 0 = Sunday ... 6 = Saturday
const DOCTORS = [
  { id: 'dr-deshmukh', name: 'Dr. Anita Deshmukh', dept: 'gyn', qual: 'MBBS, MS (Obstetrics & Gynaecology)', exp: 14, days: [1, 2, 3, 4, 5, 6] },
  { id: 'dr-patil', name: 'Dr. Rahul Patil', dept: 'cardio', qual: 'MBBS, MD, DM (Cardiology)', exp: 12, days: [1, 3, 5] },
  { id: 'dr-kulkarni', name: 'Dr. Sameer Kulkarni', dept: 'ortho', qual: 'MBBS, MS (Orthopaedics)', exp: 10, days: [2, 4, 6] },
  { id: 'dr-joshi', name: 'Dr. Neha Joshi', dept: 'peds', qual: 'MBBS, MD (Paediatrics)', exp: 9, days: [1, 2, 3, 4, 5, 6] },
  { id: 'dr-shinde', name: 'Dr. Vikram Shinde', dept: 'gen', qual: 'MBBS, MD (General Medicine)', exp: 16, days: [1, 2, 3, 4, 5, 6] },
  { id: 'dr-jadhav', name: 'Dr. Priya Jadhav', dept: 'derm', qual: 'MBBS, MD (Dermatology)', exp: 8, days: [2, 4, 6] },
  { id: 'dr-more', name: 'Dr. Amit More', dept: 'ent', qual: 'MBBS, MS (ENT)', exp: 11, days: [1, 3, 5] },
  { id: 'dr-pawar', name: 'Dr. Sneha Pawar', dept: 'dental', qual: 'BDS, MDS', exp: 7, days: [1, 2, 3, 4, 5, 6] }
];
// c = category, p = price in rupees, r = report time (same / 24 / walk)
const TESTS = [
  { n: 'Complete Blood Count (CBC)', c: 'blood', p: 250, r: 'same' }, { n: 'Blood Sugar (Fasting / PP)', c: 'blood', p: 80, r: 'same' },
  { n: 'HbA1c', c: 'blood', p: 450, r: 'same' }, { n: 'Lipid Profile', c: 'blood', p: 500, r: 'same' },
  { n: 'Liver Function Test (LFT)', c: 'blood', p: 600, r: 'same' }, { n: 'Kidney Function Test (KFT)', c: 'blood', p: 550, r: 'same' },
  { n: 'Vitamin D', c: 'blood', p: 900, r: '24' }, { n: 'Vitamin B12', c: 'blood', p: 700, r: '24' },
  { n: 'Dengue NS1 / IgM', c: 'blood', p: 700, r: 'same' }, { n: 'Malaria Parasite Test', c: 'blood', p: 200, r: 'same' },
  { n: 'Typhoid (Widal)', c: 'blood', p: 200, r: 'same' }, { n: 'CRP', c: 'blood', p: 450, r: 'same' },
  { n: 'Thyroid Profile (T3, T4, TSH)', c: 'hormone', p: 550, r: 'same' }, { n: 'TSH', c: 'hormone', p: 300, r: 'same' },
  { n: 'Prolactin', c: 'hormone', p: 650, r: '24' }, { n: 'Pregnancy Test (Beta hCG)', c: 'hormone', p: 500, r: 'same' },
  { n: 'X-Ray (Chest / Limb / Spine)', c: 'imaging', p: 350, r: 'walk' }, { n: 'Ultrasound (Abdomen / Pelvis)', c: 'imaging', p: 800, r: 'walk' },
  { n: 'Pregnancy Ultrasound', c: 'imaging', p: 900, r: 'walk' }, { n: 'Dental X-Ray (OPG)', c: 'imaging', p: 500, r: 'walk' },
  { n: 'ECG', c: 'cardiac', p: 150, r: 'walk' }, { n: '2D Echo', c: 'cardiac', p: 1800, r: 'walk' },
  { n: 'Treadmill Test (TMT)', c: 'cardiac', p: 1500, r: 'walk' }, { n: 'Troponin I', c: 'cardiac', p: 900, r: 'same' },
  { n: 'Urine Routine & Microscopy', c: 'urine', p: 100, r: 'same' }, { n: 'Urine Culture', c: 'urine', p: 600, r: '24' },
  { n: 'Stool Routine', c: 'urine', p: 100, r: 'same' },
  { n: 'Basic Health Checkup', c: 'pack', p: 799, r: 'same' }, { n: 'Full Body Checkup', c: 'pack', p: 1999, r: '24' },
  { n: 'Diabetes Care Package', c: 'pack', p: 999, r: 'same' }, { n: 'Heart Health Package', c: 'pack', p: 1799, r: '24' },
  { n: "Women's Wellness Package", c: 'pack', p: 1599, r: '24' }, { n: 'Senior Citizen Package', c: 'pack', p: 2299, r: '24' }
];
const CATS = ['all', 'blood', 'hormone', 'imaging', 'cardiac', 'urine', 'pack'];
// Replace the SVG files in /images with your real photos (same names, or edit f below)
const GAL = [
  { f: 'gallery-1.svg', c: 'hospital', k: 'gc1' }, { f: 'gallery-2.svg', c: 'hospital', k: 'gc2' },
  { f: 'gallery-3.svg', c: 'hospital', k: 'gc3' }, { f: 'gallery-4.svg', c: 'facilities', k: 'gc4' },
  { f: 'gallery-5.svg', c: 'facilities', k: 'gc5' }, { f: 'gallery-6.svg', c: 'facilities', k: 'gc6' },
  { f: 'gallery-7.svg', c: 'events', k: 'gc7' }, { f: 'gallery-8.svg', c: 'events', k: 'gc8' },
  { f: 'gallery-9.svg', c: 'events', k: 'gc9' }, { f: 'gallery-10.svg', c: 'team', k: 'gc10' },
  { f: 'gallery-11.svg', c: 'team', k: 'gc11' }, { f: 'gallery-12.svg', c: 'events', k: 'gc12' }
];
const GCATS = ['all', 'hospital', 'facilities', 'events', 'team'];
const SLOTS = (() => {
  const out = [];
  [[9, 13], [16, 19]].forEach(([a, b]) => { for (let h = a; h < b; h++) { out.push(String(h).padStart(2, '0') + ':00'); out.push(String(h).padStart(2, '0') + ':30'); } });
  return out;
})();

/* ---------- 4. THEME + LANGUAGE ---------- */
let lang = store.get('gh_lang', 'en');
if (!I18N[lang]) lang = 'en';
const t = k => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
const LOCALES = { en: 'en-IN', mr: 'mr-IN', hi: 'hi-IN' };
const PAGE = document.body.dataset.page || 'index';
const PAGE_KEY = { index: 'nav_home', about: 'nav_about', services: 'nav_services', doctors: 'nav_doctors', appointment: 'nav_book', gallery: 'nav_gallery', contact: 'nav_contact' };
const deptOf = id => DEPTS.find(d => d.id === id);
const doctorOf = id => DOCTORS.find(d => d.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rupee = n => '₹' + Number(n).toLocaleString('en-IN');

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  store.set('gh_theme', mode);
  const b = $('#themeBtn'); if (b) b.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
function dayRange(days) {
  const fmt = new Intl.DateTimeFormat(LOCALES[lang], { weekday: 'short' });
  const nm = d => fmt.format(new Date(2024, 0, 7 + d));
  const contiguous = days.every((d, i) => i === 0 || d === days[i - 1] + 1);
  return contiguous && days.length > 2 ? nm(days[0]) + '–' + nm(days[days.length - 1]) : days.map(nm).join(', ');
}
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
  $$('[data-i18n-ph]').forEach(e => { e.placeholder = t(e.dataset.i18nPh); });
  $$('.lang button').forEach(b => { const on = b.dataset.lang === lang; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  document.title = t(PAGE_KEY[PAGE] || 'nav_home') + ' | Gaurai Hospital';
  const yr = $('#rights'); if (yr) yr.textContent = '© ' + new Date().getFullYear() + ' ' + t('ft_rights');
  renderAll();
}

/* ---------- 5. HEADER + FOOTER (one place for every page) ---------- */
const NAV = [['index.html', 'nav_home', 'index'], ['about.html', 'nav_about', 'about'], ['services.html', 'nav_services', 'services'],
  ['doctors.html', 'nav_doctors', 'doctors'], ['gallery.html', 'nav_gallery', 'gallery'], ['contact.html', 'nav_contact', 'contact']];
const socialLinks = () => Object.entries(CONFIG.social).map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ic(n, 20)}</a>`).join('');
const logo = `<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="13" fill="var(--primary)"/><path d="M19 10h6v9h9v6h-9v9h-6v-9h-9v-6h9z" fill="#fff"/><circle cx="34" cy="10" r="4" fill="var(--accent)"/></svg>`;

function buildChrome() {
  const h = $('#site-header');
  if (h) h.innerHTML = `
  <div class="topbar"><div class="wrap"><span><span data-i18n="em_bar"></span> <a href="tel:${CONFIG.emergencyHref}">${CONFIG.emergency}</a></span>
  <span class="hide-sm">${CONFIG.email} &nbsp;|&nbsp; <span data-i18n="h1"></span></span></div></div>
  <header class="site-header"><div class="wrap nav">
    <a class="brand" href="index.html" aria-label="Gaurai Hospital">${logo}<span><b>Gaurai</b><small data-i18n="tagline"></small></span></a>
    <nav id="nav" aria-label="Main">${NAV.map(([href, key, id]) => `<a href="${href}" data-i18n="${key}" class="${id === PAGE ? 'active' : ''}"></a>`).join('')}
      <a class="btn btn-accent btn-sm" href="appointment.html" data-i18n="nav_book" style="margin:6px 0 0"></a></nav>
    <div class="tools">
      <div class="lang" role="group" aria-label="Language">
        <button type="button" data-lang="en">EN</button><button type="button" data-lang="mr">मराठी</button><button type="button" data-lang="hi">हिंदी</button></div>
      <button class="icon-btn" id="themeBtn" type="button" aria-label="Toggle dark mode"><span class="moon">${ic('moon', 20)}</span><span class="sun">${ic('sun', 20)}</span></button>
      <button class="icon-btn" id="menuBtn" type="button" aria-label="Menu" aria-expanded="false">${ic('menu', 20)}</button>
    </div></div></header>`;
  const f = $('#site-footer');
  if (f) f.innerHTML = `
  <footer class="site-footer"><div class="wrap">
    <div class="foot">
      <div><a class="brand" href="index.html">${logo}<span><b>Gaurai</b><small data-i18n="tagline"></small></span></a>
        <p style="margin-top:14px" data-i18n="ft_about"></p></div>
      <div><h3 data-i18n="ft_links"></h3><ul>${NAV.map(([href, key]) => `<li><a href="${href}" data-i18n="${key}"></a></li>`).join('')}<li><a href="appointment.html" data-i18n="nav_book"></a></li></ul></div>
      <div><h3 data-i18n="ft_contact"></h3><ul>
        <li>${ic('pin', 16)} <span data-i18n="c_address"></span></li>
        <li>${ic('phone', 16)} <a href="tel:${CONFIG.phoneHref}">${CONFIG.phone}</a></li>
        <li>${ic('mail', 16)} <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li></ul></div>
      <div><h3 data-i18n="ft_follow"></h3><div class="social">${socialLinks()}</div></div>
    </div>
    <div class="credit"><span id="rights"></span><span data-i18n="ft_credit"></span></div>
  </div></footer>
  <a class="wa-float" href="${CONFIG.social.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('whatsapp', 26)}</a>
  <button class="icon-btn to-top hidden" id="toTop" type="button" aria-label="Back to top">${ic('up', 20)}</button>`;
}

/* ---------- 6. PAGE RENDERERS ---------- */
const state = { cat: 'all', q: '', dept: 'all', gcat: 'all' };

function deptOptions(sel) {
  return `<option value="">${t('sel_dept')}</option>` + DEPTS.map(d => `<option value="${d.id}"${d.id === sel ? ' selected' : ''}>${esc(t(d.key))}</option>`).join('');
}
function docCard(d) {
  const dep = deptOf(d.dept);
  const initials = d.name.replace('Dr. ', '').split(' ').map(w => w[0]).join('');
  const hue = (d.name.length * 37) % 360;
  return `<article class="doc"><div class="avatar" style="--h:${hue}" aria-hidden="true">${initials}</div>
    <h3>${esc(d.name)}</h3><p class="dept">${esc(t(dep.key))}</p><p class="muted small">${esc(d.qual)}</p>
    <p class="muted small">${d.exp} ${t('exp')}</p><p class="muted small">${t('avail')}: ${dayRange(d.days)}</p>
    <a class="btn btn-sm" href="appointment.html?dept=${d.dept}&doctor=${d.id}">${t('book_with')}</a></article>`;
}
function chipRow(list, current, labelFn, attr) {
  return list.map(c => `<button type="button" class="chip${c === current ? ' on' : ''}" ${attr}="${c}">${esc(labelFn(c))}</button>`).join('');
}

function renderHome() {
  const q = $('#qDept'); if (q) q.innerHTML = deptOptions(q.value);
  const d = $('#homeDocs'); if (d) d.innerHTML = DOCTORS.slice(0, 4).map(docCard).join('');
}
function renderServices() {
  const dg = $('#deptGrid');
  if (dg) dg.innerHTML = DEPTS.map(d => `<div class="service"><div class="ico">${ic(d.icon, 26)}</div><h3>${esc(t(d.key))}</h3></div>`).join('');
  const chips = $('#catChips');
  if (chips) chips.innerHTML = chipRow(CATS, state.cat, c => t('cat_' + c), 'data-cat');
  const body = $('#testBody'); if (!body) return;
  const q = state.q.trim().toLowerCase();
  const rows = TESTS.filter(x => (state.cat === 'all' || x.c === state.cat) && (!q || x.n.toLowerCase().includes(q)));
  body.innerHTML = rows.length ? rows.map(x => `<tr><td>${esc(x.n)}</td><td>${esc(t('cat_' + x.c))}</td><td class="price">${rupee(x.p)}</td><td>${t('tat_' + ({ same: 'same', 24: '24', walk: 'walk' }[x.r]))}</td></tr>`).join('')
    : `<tr><td colspan="4" class="muted">${t('no_results')}</td></tr>`;
}
function renderDoctors() {
  const chips = $('#deptChips');
  if (chips) chips.innerHTML = chipRow(['all'].concat(DEPTS.map(d => d.id)), state.dept, id => id === 'all' ? t('cat_all') : t(deptOf(id).key), 'data-dept');
  const g = $('#docGrid');
  if (g) g.innerHTML = DOCTORS.filter(d => state.dept === 'all' || d.dept === state.dept).map(docCard).join('');
}
function renderGallery() {
  const chips = $('#galChips');
  if (chips) chips.innerHTML = chipRow(GCATS, state.gcat, c => c === 'all' ? t('cat_all') : t('g_' + c), 'data-gcat');
  const g = $('#galGrid');
  if (g) g.innerHTML = GAL.filter(x => state.gcat === 'all' || x.c === state.gcat).map((x, i) =>
    `<figure data-i="${i}" tabindex="0"><img src="images/${x.f}" alt="${esc(t(x.k))}" loading="lazy"><figcaption>${esc(t(x.k))}</figcaption></figure>`).join('');
}
function renderAll() {
  renderHome(); renderServices(); renderDoctors(); renderGallery(); renderAppointmentSelects();
}

/* gallery lightbox */
let lbList = [], lbIdx = 0, lb;
function openLightbox(i) {
  lbList = GAL.filter(x => state.gcat === 'all' || x.c === state.gcat); lbIdx = i;
  if (!lb) {
    lb = document.createElement('div'); lb.className = 'lightbox hidden'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<button class="lb-x" aria-label="Close">×</button><button class="lb-p" aria-label="Previous">‹</button><img alt=""><p></p><button class="lb-n" aria-label="Next">›</button>';
    document.body.appendChild(lb);
    lb.addEventListener('click', e => {
      if (e.target.closest('.lb-p')) showLb(lbIdx - 1); else if (e.target.closest('.lb-n')) showLb(lbIdx + 1);
      else if (!e.target.matches('img')) closeLb();
    });
  }
  lb.classList.remove('hidden'); showLb(i);
}
function showLb(i) { lbIdx = (i + lbList.length) % lbList.length; const x = lbList[lbIdx]; $('img', lb).src = 'images/' + x.f; $('img', lb).alt = t(x.k); $('p', lb).textContent = t(x.k); }
function closeLb() { if (lb) lb.classList.add('hidden'); }

/* ---------- 7. FORMS ---------- */
async function api(path, opts) {
  const r = await fetch(path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts));
  let data = {}; try { data = await r.json(); } catch (e) {}
  return { ok: r.ok, status: r.status, data };
}
const localList = k => { try { return JSON.parse(store.get(k, '[]')); } catch (e) { return []; } };
const to12 = s => { const [h, m] = s.split(':').map(Number); return ((h + 11) % 12 + 1) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM'); };
const isoToday = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
let chosenSlot = '';

function renderAppointmentSelects() {
  const f = $('#apForm'); if (!f) return;
  const dept = f.dept.value, doc = f.doctor.value;
  f.dept.innerHTML = deptOptions(dept);
  const list = DOCTORS.filter(d => !f.dept.value || d.dept === f.dept.value);
  f.doctor.innerHTML = `<option value="">${t('sel_doctor')}</option>` + list.map(d => `<option value="${d.id}"${d.id === doc ? ' selected' : ''}>${esc(d.name)}</option>`).join('');
  loadSlots();
}
async function loadSlots() {
  const box = $('#slots'); const f = $('#apForm'); if (!box || !f) return;
  const docId = f.doctor.value, date = f.date.value; chosenSlot = '';
  const hint = k => { box.innerHTML = `<p class="muted">${t(k)}</p>`; };
  if (!docId || !date) return hint('slot_hint');
  const doc = doctorOf(docId);
  if (!doc.days.includes(new Date(date + 'T00:00:00').getDay())) return hint('slot_closed');
  let booked = [];
  try {
    const r = await api(`/api/slots?doctor=${encodeURIComponent(docId)}&date=${encodeURIComponent(date)}`);
    if (!r.ok) throw new Error('x'); booked = r.data.booked || [];
  } catch (e) { booked = localList('gh_appts').filter(a => a.doctor === docId && a.date === date).map(a => a.time); }
  const now = new Date(); const today = date === isoToday();
  const free = SLOTS.filter(s => !(today && (+s.slice(0, 2) * 60 + +s.slice(3)) <= now.getHours() * 60 + now.getMinutes()));
  if (!free.length) return hint('slot_none');
  box.innerHTML = free.map(s => `<button type="button" class="slot" data-time="${s}"${booked.includes(s) ? ' disabled' : ''}>${to12(s)}</button>`).join('');
}
function showMsg(el, kind, text) { if (!el) return; el.className = 'msg ' + kind; el.textContent = text; el.classList.remove('hidden'); }

function initAppointment() {
  const f = $('#apForm'); if (!f) return;
  f.date.min = isoToday();
  const max = new Date(); max.setDate(max.getDate() + 60); f.date.max = max.toISOString().slice(0, 10);
  const p = new URLSearchParams(location.search);
  if (p.get('name')) f.name.value = p.get('name');
  if (p.get('phone')) f.phone.value = p.get('phone');
  if (p.get('date') && p.get('date') >= f.date.min) f.date.value = p.get('date');
  if (p.get('dept')) f.dept.value = p.get('dept');
  renderAppointmentSelects();
  if (p.get('doctor') && doctorOf(p.get('doctor'))) { f.dept.value = doctorOf(p.get('doctor')).dept; renderAppointmentSelects(); f.doctor.value = p.get('doctor'); loadSlots(); }
  f.dept.addEventListener('change', () => { f.doctor.value = ''; renderAppointmentSelects(); });
  f.doctor.addEventListener('change', () => {
    const d = doctorOf(f.doctor.value);
    if (d && f.dept.value !== d.dept) { f.dept.value = d.dept; renderAppointmentSelects(); }
    loadSlots();
  });
  f.date.addEventListener('change', loadSlots);
  $('#slots').addEventListener('click', e => {
    const b = e.target.closest('.slot'); if (!b || b.disabled) return;
    $$('.slot', f).forEach(x => x.classList.remove('on')); b.classList.add('on'); chosenSlot = b.dataset.time;
  });
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = $('#apMsg'); msg.classList.add('hidden');
    const v = { name: f.name.value.trim(), phone: f.phone.value.replace(/\s|-/g, ''), age: +f.age.value, gender: (f.gender.value || ''), dept: f.dept.value, doctor: f.doctor.value, date: f.date.value, time: chosenSlot, reason: f.reason.value.trim() };
    if (!v.dept && v.doctor && doctorOf(v.doctor)) v.dept = doctorOf(v.doctor).dept;
    if (!/^\d{10}$/.test(v.phone)) return showMsg(msg, 'err', t('ap_phone_err'));
    if (v.name.length < 2 || !(v.age >= 0 && v.age <= 120) || !v.gender || !v.dept || !v.doctor || !v.date || !v.time) return showMsg(msg, 'err', t('ap_err'));
    const btn = $('button[type=submit]', f); btn.disabled = true;
    let result, demo = false;
    try {
      const r = await api('/api/appointments', { method: 'POST', body: JSON.stringify(v) });
      if (r.status === 409) { showMsg(msg, 'err', t('ap_taken')); loadSlots(); btn.disabled = false; return; }
      if (!r.ok) { showMsg(msg, 'err', r.data.error || t('ap_err')); btn.disabled = false; return; }
      result = r.data.appointment;
    } catch (err) {
      demo = true; result = Object.assign({ id: 'GAU-' + v.date.replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(), status: 'Pending' }, v);
      const all = localList('gh_appts'); all.push(result); store.set('gh_appts', JSON.stringify(all));
    }
    btn.disabled = false; showTicket(result, demo);
  });
  $('#apNew').addEventListener('click', () => { $('#apDone').classList.add('hidden'); f.classList.remove('hidden'); f.reset(); f.date.min = isoToday(); renderAppointmentSelects(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  $('#apPrint').addEventListener('click', () => window.print());
}
function showTicket(a, demo) {
  const doc = doctorOf(a.doctor), dep = deptOf(a.dept);
  const date = new Date(a.date + 'T00:00:00').toLocaleDateString(LOCALES[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  $('#ticket').innerHTML = `<p class="muted" style="margin:0">${t('ap_ok_id')}</p><p class="bid">${esc(a.id)}</p>
   <dl><dt>${t('f_name')}</dt><dd>${esc(a.name)}</dd><dt>${t('f_doctor')}</dt><dd>${esc(doc ? doc.name : a.doctor)}</dd>
   <dt>${t('f_dept')}</dt><dd>${esc(dep ? t(dep.key) : a.dept)}</dd><dt>${t('f_date')}</dt><dd>${esc(date)}</dd><dd style="grid-column:2">${to12(a.time)}</dd></dl>`;
  $('#apDemo').classList.toggle('hidden', !demo);
  $('#apForm').classList.add('hidden'); $('#apDone').classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initContact() {
  const f = $('#contactForm'); if (!f) return;
  f.addEventListener('submit', async e => {
    e.preventDefault(); const msg = $('#cMsg');
    const v = { name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(), subject: f.subject.value.trim(), message: f.message.value.trim() };
    if (v.name.length < 2 || !/^\S+@\S+\.\S+$/.test(v.email) || v.message.length < 5) return showMsg(msg, 'err', t('ap_err'));
    try { const r = await api('/api/contact', { method: 'POST', body: JSON.stringify(v) }); if (!r.ok) throw new Error('x'); }
    catch (err) { const all = localList('gh_msgs'); all.push(v); store.set('gh_msgs', JSON.stringify(all)); }
    showMsg(msg, 'ok', t('c_ok')); f.reset();
  });
}

/* ---------- 8. INIT ---------- */
function counters() {
  const els = $$('[data-count]'); if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; io.unobserve(en.target);
    const end = +en.target.dataset.count; const plus = en.target.dataset.suffix || ''; const t0 = performance.now();
    const step = now => { const k = Math.min(1, (now - t0) / 1200); en.target.textContent = Math.round(end * k).toLocaleString('en-IN') + plus; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .4 });
  els.forEach(e => io.observe(e));
}
function init() {
  buildChrome();
  setTheme(document.documentElement.dataset.theme || 'light');
  const qd = $('#qDate'); if (qd) { qd.min = isoToday(); }
  document.addEventListener('click', e => {
    const lb_ = e.target.closest('.lang button'); if (lb_) { lang = lb_.dataset.lang; store.set('gh_lang', lang); applyLang(); return; }
    if (e.target.closest('#themeBtn')) { setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); return; }
    if (e.target.closest('#menuBtn')) { const n = $('#nav'); const o = n.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', o); return; }
    if (e.target.closest('#nav a')) $('#nav').classList.remove('open');
    if (e.target.closest('#toTop')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const c = e.target.closest('[data-cat]'); if (c) { state.cat = c.dataset.cat; renderServices(); return; }
    const d = e.target.closest('[data-dept]'); if (d) { state.dept = d.dataset.dept; renderDoctors(); return; }
    const g = e.target.closest('[data-gcat]'); if (g) { state.gcat = g.dataset.gcat; renderGallery(); return; }
    const fig = e.target.closest('#galGrid figure'); if (fig) openLightbox(+fig.dataset.i);
  });
  document.addEventListener('keydown', e => {
    if (lb && !lb.classList.contains('hidden')) { if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowRight') showLb(lbIdx + 1); if (e.key === 'ArrowLeft') showLb(lbIdx - 1); }
    else if (e.key === 'Enter' && e.target.matches('#galGrid figure')) openLightbox(+e.target.dataset.i);
  });
  const s = $('#testSearch'); if (s) s.addEventListener('input', () => { state.q = s.value; renderServices(); });
  window.addEventListener('scroll', () => { const b = $('#toTop'); if (b) b.classList.toggle('hidden', window.scrollY < 500); }, { passive: true });
  const cs = $('#contactSocial'); if (cs) cs.innerHTML = socialLinks();
  initAppointment(); initContact(); counters();
  applyLang();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
