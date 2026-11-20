/* Gaurai Hospital - backend. Pure Node.js (no npm install needed).
   Run:  node server.js     then open http://localhost:3000
   Data is saved in /data/*.json. Admin key: set ADMIN_KEY env variable (default below). */
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'gaurai@123';
const PUBLIC = path.join(__dirname, 'public'), DATA = path.join(__dirname, 'data');
const F_APPT = path.join(DATA, 'appointments.json'), F_MSG = path.join(DATA, 'messages.json');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json' };
const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

fs.mkdirSync(DATA, { recursive: true });
for (const f of [F_APPT, F_MSG]) if (!fs.existsSync(f)) fs.writeFileSync(f, '[]');
const read = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return []; } };
const write = (f, d) => fs.writeFileSync(f, JSON.stringify(d, null, 2));

const hits = new Map(); // very small rate limiter: 30 POST per minute per IP
function limited(ip) {
  const now = Date.now(), arr = (hits.get(ip) || []).filter(t => now - t < 60000); arr.push(now); hits.set(ip, arr); return arr.length > 30;
}
const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(obj)); };
const body = req => new Promise((ok, no) => {
  let b = ''; req.on('data', c => { b += c; if (b.length > 1e6) { req.destroy(); no(new Error('too big')); } });
  req.on('end', () => { try { ok(JSON.parse(b || '{}')); } catch (e) { no(new Error('bad json')); } });
});
const clean = (s, n = 300) => String(s == null ? '' : s).replace(/[<>]/g, '').trim().slice(0, n);
const isAdmin = req => req.headers['x-admin-key'] === ADMIN_KEY;

async function api(req, res, u) {
  const ip = req.socket.remoteAddress;
  if (req.method === 'POST' && limited(ip)) return send(res, 429, { error: 'Too many requests. Please wait a minute.' });

  if (u.pathname === '/api/slots' && req.method === 'GET') {
    const doctor = u.searchParams.get('doctor'), date = u.searchParams.get('date');
    const booked = read(F_APPT).filter(a => a.doctor === doctor && a.date === date && a.status !== 'Cancelled').map(a => a.time);
    return send(res, 200, { booked });
  }
  if (u.pathname === '/api/appointments' && req.method === 'POST') {
    const b = await body(req);
    const a = { name: clean(b.name, 80), phone: clean(b.phone, 10), age: Number(b.age), gender: clean(b.gender, 10), dept: clean(b.dept, 20), doctor: clean(b.doctor, 40), date: clean(b.date, 10), time: clean(b.time, 5), reason: clean(b.reason, 500) };
    if (a.name.length < 2 || !/^\d{10}$/.test(a.phone) || !(a.age >= 0 && a.age <= 120) || !['Male', 'Female', 'Other'].includes(a.gender) ||
        !/^[a-z-]+$/.test(a.dept) || !/^[a-z-]+$/.test(a.doctor) || !/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !/^\d{2}:\d{2}$/.test(a.time))
      return send(res, 400, { error: 'Please fill all required fields correctly.' });
    const today = new Date().toISOString().slice(0, 10);
    if (a.date < today) return send(res, 400, { error: 'Date cannot be in the past.' });
    const all = read(F_APPT);
    if (all.some(x => x.doctor === a.doctor && x.date === a.date && x.time === a.time && x.status !== 'Cancelled'))
      return send(res, 409, { error: 'This slot is already booked.' });
    a.id = 'GAU-' + a.date.replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    a.status = 'Pending'; a.createdAt = new Date().toISOString();
    all.push(a); write(F_APPT, all);
    return send(res, 201, { appointment: a });
  }
  if (u.pathname === '/api/contact' && req.method === 'POST') {
    const b = await body(req);
    const m = { name: clean(b.name, 80), email: clean(b.email, 120), phone: clean(b.phone, 15), subject: clean(b.subject, 120), message: clean(b.message, 2000), createdAt: new Date().toISOString() };
    if (m.name.length < 2 || !/^\S+@\S+\.\S+$/.test(m.email) || m.message.length < 5) return send(res, 400, { error: 'Please fill all required fields correctly.' });
    const all = read(F_MSG); all.push(m); write(F_MSG, all);
    return send(res, 201, { ok: true });
  }
  // ---- admin routes (need header x-admin-key) ----
  if (u.pathname.startsWith('/api/admin/')) {
    if (!isAdmin(req)) return send(res, 401, { error: 'Wrong admin key.' });
    if (u.pathname === '/api/admin/appointments' && req.method === 'GET') return send(res, 200, { appointments: read(F_APPT).reverse() });
    if (u.pathname === '/api/admin/messages' && req.method === 'GET') return send(res, 200, { messages: read(F_MSG).reverse() });
    const m = u.pathname.match(/^\/api\/admin\/appointments\/([A-Z0-9-]+)$/);
    if (m && req.method === 'PATCH') {
      const b = await body(req); if (!STATUSES.includes(b.status)) return send(res, 400, { error: 'Bad status.' });
      const all = read(F_APPT), a = all.find(x => x.id === m[1]); if (!a) return send(res, 404, { error: 'Not found.' });
      a.status = b.status; write(F_APPT, all); return send(res, 200, { appointment: a });
    }
  }
  send(res, 404, { error: 'Not found.' });
}

function serveStatic(req, res, u) {
  let p = decodeURIComponent(u.pathname); if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(PUBLIC, p));
  if (!file.startsWith(PUBLIC + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end('<h1>404 - Page not found</h1><p><a href="/">Go home</a></p>'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  });
}

http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://localhost');
    if (u.pathname.startsWith('/api/')) return await api(req, res, u);
    serveStatic(req, res, u);
  } catch (e) { send(res, 400, { error: e.message || 'Bad request' }); }
}).listen(PORT, () => console.log(`Gaurai Hospital running: http://localhost:${PORT}\nAdmin page: http://localhost:${PORT}/admin.html  (key: ${ADMIN_KEY})`));
