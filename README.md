# Gaurai Hospital – Website + Online Appointments

## Run it
1. Install Node.js (https://nodejs.org) – version 18 or newer.
2. Open a terminal in this folder and run:  `node server.js`
3. Open http://localhost:3000
4. Admin page (see appointments and messages): http://localhost:3000/admin.html
   Default key: `gaurai@123`. Change it before going live:  `ADMIN_KEY=MySecretKey node server.js`

No `npm install` is needed. If you only double-click `public/index.html`, the pages work but bookings are saved in the browser (demo mode).

## Edit your details
- Phone, email, social links: top of `public/js/script.js` (CONFIG)
- All texts in English / Marathi / Hindi: `public/js/i18n.js`
- Doctors, departments, tests and prices: `public/js/script.js` (DEPTS, DOCTORS, TESTS)
- Gallery: replace `public/images/gallery-1.svg … gallery-12.svg` with your real photos (keep names, or edit GAL in script.js)
- Colors and fonts: top of `public/css/style.css`
- Map: `public/contact.html` (paste your Google Maps embed code)
- Doctor names, qualifications, years and the address in this package are sample data. Replace them with real details.

## Files
server.js (backend API) · data/ (appointments.json, messages.json are created automatically) · public/ (website)
