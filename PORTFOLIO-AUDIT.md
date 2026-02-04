# Portfolio Website — Audit Report

**Repository:** hassanyassin (GitHub Pages)  
**Audit date:** February 4, 2026  
**Scope:** Full examination, issue diagnosis, fixes, enhancements, verification.

---

## PHASE 1 — Full Examination Summary

### Repository structure (current)

- **Root:** `index.html`, `projects.html`, `hassan-yassin-cv.pdf`, `fix_folders.py`, `fix_links.py`
- **css:** `reset.css`, `variables.css`, `style.css`
- **js:** `main.js`, `three-bg.js`, `data-viz.js`, `detail-slideshow.js`, `hero-collage.js`
- **images:** `1.jpg`, `2.jpeg`, `3.jpg` (hero)
- **assets/images/projects:** `eatinsight/` (demo.jpg, hero.jpg), `pathtohire/` (flow.jpg, hero.jpg)
- **community:** folders with spaces: `Junior Innovators Challenge (JIK)/`, `Khotota Khair Initiative/`, `Melaka AI Hackathon/`, `Robotics Referee/`
- **Projects/** (capital P): `junior-innovators.html`, `khotota-khair.html`, `melaka-hackathon.html`, `robotics-referee.html`
- **Missing:** No `projects/` (lowercase) folder; no `ecovision.html`, `eatinsight.html`, `pathtohire.html`, `heartattack.html`, `learnback.html`; no `js/background.js`, `js/manual-slideshow.js`

### GitHub Pages compatibility

- Root `index.html` present — OK.
- All links and assets must use relative paths; subpages in `Projects/` must use `../` for root assets — **was broken, fixed**.
- Case sensitivity: GitHub Pages (Linux) is case-sensitive; folder is `Projects/`, not `projects/` — **corrected in links**.

### Syntax and conflict markers

- No merge-conflict remnants (`<<<<<<<`, `=======`, `>>>>>>>`) found.
- No malformed tags (e.g. `<<head`) found.
- CSS uses `===` only inside comment blocks — OK.

---

## PHASE 2 — Issue Diagnosis

### Blocking issues

| # | Issue | Why it breaks | Severity |
|---|--------|----------------|----------|
| 1 | **Impact section links on index** point to `junior-innovators.html`, `khotota-khair.html`, etc. at root. Those files live in `Projects/`. | From `index.html`, the browser requests `/junior-innovators.html`, which does not exist → **404**. | **Blocking** |
| 2 | **projects.html** loads `js/background.js` and `js/manual-slideshow.js`. Those files do not exist; actual files are `js/three-bg.js` and `js/main.js`. | Scripts 404 → no Three.js background, slideshows may not work on Projects page. | **Blocking** |
| 3 | **Projects/*.html** use `href="index.html"`, `href="css/..."`, `src="community/..."` without `../`. When the page URL is `/Projects/junior-innovators.html`, the browser resolves to `/Projects/index.html`, `/Projects/css/...`, `/Projects/community/...` → all missing. | Home link, styles, and community images 404 → broken layout and navigation. | **Blocking** |

### Major issues

| # | Issue | Why it breaks | Severity |
|---|--------|----------------|----------|
| 4 | **Featured project cards** (EcoVision, EatInSight, PathToHire, Heart Attack, LearnBack) link to `projects/ecovision.html`, etc. There is no `projects/` folder or these HTML files. | Every “Featured project” link leads to **404**. | **Major** |
| 5 | **Project card images** use paths like `projects/ecovision/eco1.png`, `projects/eatinsight/e1.jpg`. Only `assets/images/projects/eatinsight/` and `pathtohire/` exist, with different filenames. | Most project card images 404; only EatInSight and PathToHire can be fixed with current assets. | **Major** |

### Minor issues

| # | Issue | Why it matters | Severity |
|---|--------|----------------|----------|
| 6 | **projects.html** has no hamburger/drawer; on small screens the nav is a vertical list. | Mobile UX is acceptable but less polished than index. | **Minor** |
| 7 | **Community paths** use spaces and parentheses (e.g. `Junior Innovators Challenge (JIK)/Main.jpeg`). | May need encoding; some environments can be sensitive. | **Minor** |
| 8 | **Logo on index** is `href="#"`. | Should point to `index.html` for consistency and when opened from subpages. | **Minor** |

---

## PHASE 3 — Fixes Applied

1. **index.html**
   - Impact links: `junior-innovators.html` → `Projects/junior-innovators.html`, and same for `khotota-khair.html`, `melaka-hackathon.html`, `robotics-referee.html`.
   - Logo: `href="#"` → `href="index.html"`.
   - Project card links: `projects/ecovision.html`, etc. → `projects.html` (avoids 404 until detail pages exist).
   - EatInSight card images: use `assets/images/projects/eatinsight/hero.jpg` and `assets/images/projects/eatinsight/demo.jpg` where appropriate.
   - PathToHire card images: use `assets/images/projects/pathtohire/hero.jpg` and `assets/images/projects/pathtohire/flow.jpg`.
   - EcoVision, Heart Attack, LearnBack: card links go to `projects.html`; image paths left as placeholders — add `projects/ecovision/`, `projects/heart-attack-prediction/`, `projects/learnback/` with correct filenames when available.

2. **projects.html**
   - Replaced `js/background.js` with `js/three-bg.js`.
   - Removed `js/manual-slideshow.js` and added `js/main.js` (slideshow logic lives there).
   - Same project card href/image updates as index (links to `projects.html`, EatInSight/PathToHire use `assets/images/projects/...`).

3. **Projects/junior-innovators.html, khotota-khair.html, melaka-hackathon.html, robotics-referee.html**
   - All root-facing links and assets use `../`: `../index.html`, `../projects.html`, `../css/...`, `../js/...`, `../community/...`, `../hassan-yassin-cv.pdf`.

---

## PHASE 4 — Enhancement Recommendations (prioritized)

### High impact

- **Add project detail pages** for EcoVision, EatInSight, PathToHire, Heart Attack, LearnBack (e.g. under `projects/` or `Projects/`) and link cards to them; add images under `projects/<slug>/` or `assets/images/projects/<slug>/`.
- **Unify mobile nav:** Add the same hamburger + drawer pattern to `projects.html` so mobile behavior matches index.
- **Accessibility:** Ensure focus states for all interactive elements; add `role="navigation"` and `aria-current="page"` where appropriate; verify contrast (e.g. WCAG AA).

### Medium impact

- **SEO:** Add canonical URL, Open Graph and Twitter meta tags, and optional `sitemap.xml` for GitHub Pages.
- **Performance:** Lazy-load below-the-fold images; consider `loading="lazy"` and responsive `srcset` for hero/impact images.
- **Semantic HTML:** Use `<main>`, `<nav>`, `<article>`/`<section>` consistently; one `<h1>` per page.

### Lower impact

- **URLs:** Avoid spaces in file/folder names for community assets; use hyphens and encode if needed.
- **Scalability:** Consider a simple data-driven approach (e.g. JSON for projects/impact) for easier updates.

---

## PHASE 5 — Final Verification Checklist

- [ ] Site loads at `https://<user>.github.io/<repo>/` (or custom domain).
- [ ] From index: “Projects” → projects.html; “Impact” cards → `Projects/junior-innovators.html`, etc.; “Download CV” and external links work.
- [ ] From projects.html: “Featured” cards go to projects.html; “Other Projects” repo links work; Three.js and slideshows work.
- [ ] From each `Projects/*.html`: “HY.” → index; “Projects” / “Skills” / “Impact” → index anchors; “Download CV” → PDF; styles and community images load.
- [ ] Test on desktop, tablet, and mobile (viewport, overflow, touch targets).

---

## Recommended Final Folder Structure

```
/
├── index.html
├── projects.html
├── hassan-yassin-cv.pdf
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── style.css
├── js/
│   ├── main.js
│   ├── three-bg.js
│   └── (data-viz.js, detail-slideshow.js, hero-collage.js if used)
├── images/              # hero photos
│   └── 1.jpg, 2.jpeg, 3.jpg
├── assets/
│   └── images/
│       └── projects/    # project card/detail images
│           ├── eatinsight/
│           ├── pathtohire/
│           ├── ecovision/      # add when ready
│           ├── heart-attack-prediction/
│           └── learnback/
├── community/           # impact/community assets (consider no spaces in names)
│   ├── junior-innovators-challenge-jik/
│   ├── khotota-khair/
│   ├── melaka-ai-hackathon/
│   └── robotics-referee/
└── Projects/            # impact detail pages (or rename to impact/ for clarity)
    ├── junior-innovators.html
    ├── khotota-khair.html
    ├── melaka-hackathon.html
    └── robotics-referee.html
```

Optional later: add `projects/` (lowercase) with `ecovision.html`, `eatinsight.html`, etc., and point featured cards there.

---

## Post-fix notes

- **EcoVision, Heart Attack, LearnBack cards:** Links now go to `projects.html` (no 404). Image paths still reference `projects/ecovision/`, `projects/heart-attack-prediction/`, `projects/learnback/` — add those folders and images under the repo root (or under `assets/images/projects/`) to remove image 404s.
- **SVG attributes:** In HTML5, SVG attributes should use lowercase with hyphens (e.g. `stroke-width`). Your SVGs already use this; in XML/SVG strict mode `strokeWidth` is also valid, but `stroke-width` is correct in HTML.
