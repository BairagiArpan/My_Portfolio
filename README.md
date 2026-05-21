# Arpan Bairagi — Portfolio

A clean, responsive personal portfolio website built with pure HTML, CSS, and JavaScript.

---

## 📁 Files

```
portfolio/
├── index.html   → Page structure & content
├── styles.css   → All styling & responsive design
├── script.js    → Interactivity & animations
└── README.md    → This file
```

---

## 🚀 Getting Started

Just open `index.html` in your browser — no install needed.

```bash
# Or run a local server
npx serve .
```

---

## ✨ Features

- Dark / Light theme toggle
- Typing animation in hero section
- Scroll-triggered reveal animations
- Animated skill progress bars
- Project filter (All / Web App / Mobile / Design)
- Contact form with validation
- Fully responsive (mobile, tablet, desktop)

---

## ✏️ Quick Customisation

**Your name & bio** → edit `index.html`

**Accent color** → change `--accent` in `styles.css`

```css
:root {
  --accent: #6c63ff; /* change this */
}
```

**Typing phrases** → edit the array in `script.js`

```js
const phrases = ['your text here.', 'another phrase.'];
```

**Resume** → place `resume.pdf` in the folder, link is already set.

**Social links** → search `aria-label="GitHub"` in `index.html` and update `href`.

---

## 🌐 Deploy

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push to repo → Settings → Pages → main branch |
| **Netlify** | Drag & drop the folder at netlify.com |
| **Vercel** | Run `vercel` in the project folder |

---

## 🔧 Built With

- HTML5 · CSS3 · Vanilla JavaScript (ES6+)
- [Font Awesome 6](https://fontawesome.com) — icons
- [Google Fonts](https://fonts.google.com) — Plus Jakarta Sans

---
