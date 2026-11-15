# Online Resume — Sharjeel Ahmed

Personal resume / portfolio website built for **Web Engineering – Assignment 1**
(Iqra University, BS Computer Science).

**Live website:** https://<your-github-username>.github.io/online-resume/

## Built With

- **HTML5** — semantic structure (header, nav, section, article, footer)
- **CSS3** — custom properties, Flexbox, CSS Grid, media queries, keyframe animations
- **JavaScript (ES6, no libraries)** — all interactivity written by hand

## Sections

Home · About · Education · Skills · Experience · Projects · Certifications · Achievements · Contact

## Interactive Features (JavaScript)

| # | Feature | Description |
|---|---------|-------------|
| 1 | Responsive navigation | Hamburger menu that opens and closes on small screens |
| 2 | Scroll spy | The navigation link of the section currently on screen is highlighted |
| 3 | Reading progress bar | Thin bar under the navbar showing scroll position |
| 4 | Dark / light theme switch | Preference saved in `localStorage` and restored on the next visit |
| 5 | Typing animation | Job titles typed and deleted in the hero section |
| 6 | Animated counters | Statistics count up when they scroll into view |
| 7 | Animated skill bars | Progress bars fill when the Skills card becomes visible |
| 8 | Project filter | Projects filtered by category (All / Web / Mobile / Backend) |
| 9 | Scroll reveal | Cards fade and slide in using `IntersectionObserver` |
| 10 | Contact form validation | Name, email (regex) and message validated before submission |
| 11 | Back-to-top button | Appears after scrolling and scrolls smoothly to the top |

## Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| ≥ 1200px | Three-column desktop grid |
| 900–1200px | Two-column tablet layout |
| 620–900px | Single column, hamburger navigation |
| < 620px | Mobile layout, stacked cards |

## Project Structure

```
online-resume/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── Sharjeel_Ahmed_CV.pdf
```

## How to Publish on GitHub Pages

1. Create a public repository named `online-resume`.
2. Upload all files (keep `index.html` in the root folder).
3. Go to **Settings → Pages**.
4. Under *Source*, select branch `main` and folder `/ (root)`, then click **Save**.
5. The site becomes available at `https://<username>.github.io/online-resume/`.

## Author

**Sharjeel Ahmed** — BS Computer Science, Iqra University
📧 sharjeelahmeddev1@gmail.com · 📱 +92 316 8286713
