# NexaStudio — Dynamic About Page with Team Management System

A professional About Page featuring a fully dynamic team member system with admin panel, search/filter, modal profiles, dark/light mode, and scroll animations.

---

## Features

### Front-End
- **Hero Section** — Animated gradient orbs, grid background, counter animations
- **About / Mission Section** — Company info, services grid with hover effects
- **Team Grid** — Responsive card layout with hover overlay and lazy-loaded images
- **Search** — Real-time search by name or role
- **Filter Tabs** — Filter by Developer, Designer, Manager, DevOps, Marketing
- **Member Modal** — Full-profile popup with social links
- **Dark / Light Mode** — Toggle with localStorage persistence
- **Scroll Animations** — IntersectionObserver-based fade-in on scroll
- **Fully Responsive** — Mobile, tablet, and desktop

### Admin Panel (Back-End Logic)
- **Add Member** — Name, Role, Image URL, Bio, LinkedIn, GitHub
- **Edit Member** — Pre-fills form with existing data
- **Delete Member** — Confirmation before removal
- **Persistent Storage** — All data saved to `localStorage` (acts as client-side database)

---

## File Structure

```
about-page/
├── index.html       # Main page structure
├── style.css        # All styles (CSS variables, responsive, animations)
├── app.js           # All logic: data, rendering, admin, filter, modal
├── team-data.json   # Initial seed data (reference / for server import)
└── README.md        # This file
```

---

## How to Run

1. **Locally** — Just open `index.html` in any modern browser. No build step, no server required.
2. **Deploy** — Upload all files to any static host (Netlify, Vercel, GitHub Pages).

---

## Extending to a Real Backend

To connect to a real database, replace the `localStorage` functions in `app.js`:

```js
// Replace loadMembers() with:
async function loadMembers() {
  const res = await fetch('/api/members');
  members = await res.json();
  renderTeam();
}

// Replace saveMembers() calls with:
await fetch('/api/members', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(memberData)
});
```

Then build a REST API in Node.js/Express, Django, or Flask using the `team-data.json` as your seed data and any SQL or MongoDB database.

---

## Customization

- **Company name / content** — Edit the HTML in `index.html` (hero, about section)
- **Colors / fonts** — Modify CSS variables in `:root` in `style.css`
- **Roles** — Add new `<option>` values in the `<select>` in `index.html` and new `.filter-btn` elements

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | Vanilla CSS (CSS Variables, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | localStorage (client-side DB) |
| Fonts | Google Fonts (Syne + DM Sans) |

---

## Deadline Achievement

All required features completed:
- [x] Static About section (Company name, Mission, Vision, Services)
- [x] Dynamic team cards (4–6+ members with image, name, role, bio, social links)
- [x] Admin panel (Add / Edit / Delete)
- [x] Search by name
- [x] Filter by role
- [x] Card hover effects (scale, overlay, social icon reveal)
- [x] Modal popup with full profile
- [x] Dark / Light mode toggle
- [x] Scroll animations
- [x] Lazy loading for images
- [x] Fully responsive design
- [x] JSON data file included
