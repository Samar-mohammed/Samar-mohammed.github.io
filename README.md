# Samar Alawlaqi | Portfolio

A static, dependency-free portfolio site: no build step, no framework. Open `index.html` directly or host the folder anywhere.

## Editing content

All text, projects, experience and links live in **`js/content.js`**. You shouldn't need to touch the HTML, CSS or JS.

1. Replace the sample projects, experience, location, email and social links (look for `TODO`).
2. Put your CV in `assets/` and set `person.cv` to its path.
3. Set `draft: false` to remove the "Draft" banner.

Each project becomes a row in **Projects**, with a "Details" button that expands the problem, approach and stack in place.

## Structure

```
index.html        page shell, meta tags
css/styles.css    design system (light + dark themes)
js/content.js     ← all content
js/main.js        rendering and interactions
js/network.js     hero neural-network background
assets/           favicon, iPhone icon, link-preview image (og-image.png), Figtree font, CV
```

## Preview locally

```
npx serve .
```

## Deploy

Any static host works. Upload the folder to Netlify Drop, Vercel, Cloudflare Pages or GitHub Pages; there are no build settings.

Live at https://samar-mohammed.github.io (GitHub Pages, deploys from `main`). If the address changes, update `og:url`, `og:image`, `twitter:image`, `canonical` and the JSON-LD `url` in `index.html`.
