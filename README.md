# notyour.regularsaga — Tote Painting Workshop site

A static one-page site for the Tote Painting Workshop.
Plain HTML + CSS + JS. No build step. Deploy anywhere.

## Structure

```
tote-workshop/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── images/
    │   ├── poster.jpg      ← Instagram poster (hero)
    │   ├── tote-1.jpg      ← blue/coral abstract tote
    │   ├── tote-2.jpg      ← monstera / botanical tote
    │   ├── tote-3.jpg      ← cherry + pink bow tote
    │   └── tote-4.jpg      ← group-shot workshop table
    └── video/
        └── workshop-preview.mp4   ← the WhatsApp clip (already copied in)
```

## Swap in your real images

The site already ships with pastel placeholder JPGs at `assets/images/`
so nothing looks broken out of the box.

To use your real photos, just **overwrite the placeholder files** with
your images at the **same filenames** — no code changes needed:

| File name | What it is | Good size |
|-----------|-----------|-----------|
| `poster.jpg` | Instagram poster (hero) | 900 × 1200 (3:4) |
| `tote-1.jpg` | first gallery tile | 800 × 1000 (4:5) |
| `tote-2.jpg` | second gallery tile | 800 × 1000 (4:5) |
| `tote-3.jpg` | third gallery tile | 800 × 1000 (4:5) |
| `tote-4.jpg` | fourth gallery tile | 800 × 1000 (4:5) |

Want to regenerate the pastel placeholders (different colours/labels)?
Edit and re-run `assets/_generate-placeholders.ps1`.

## Run locally

Any static server works. Simplest options:

```powershell
# with Python
python -m http.server 5500

# with Node
npx serve .
```

Then open http://localhost:5500

## Deploy

Any of these work — no build required:

- **Netlify**: drag-and-drop the `tote-workshop` folder into netlify.com/drop
- **Vercel**: `vercel .` in this folder
- **GitHub Pages**: push to a repo, enable Pages on `main`
- **Cloudflare Pages**: connect the repo, no build command needed

## Editing content

All copy, dates, venues, and section text lives in `index.html`.
Palette + fonts live at the top of `styles.css` under `:root`.

## Palette

Pulled from the poster:

- cream `#FAF3E6`
- sage green `#7A8B6B`
- terracotta / coral `#C97B5A`
- mustard `#C9A961`
- charcoal (nav) `#141414`
