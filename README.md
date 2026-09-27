# SCM Group Management Services — Website

Plain static HTML/CSS/JS website. **No build step, no npm, no yarn, no GitHub Actions needed.**
GitHub Pages serves these files directly, exactly as they are.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `industries.html` — Industries
- `careers.html` — Careers
- `clients.html` — Clients
- `contact.html` — Contact

## How it's built
- Styling: [Tailwind CSS via CDN](https://cdn.tailwindcss.com) (no local install)
- Icons: [Lucide](https://lucide.dev) via CDN
- Fonts: Google Fonts (Outfit + DM Sans), loaded via `<link>`
- `assets/style.css` — small hand-written CSS (scroll-reveal animation, client logo marquee)
- `assets/main.js` — mobile nav toggle, active-link highlighting, FAQ/job accordion, contact form
- `assets/scm-logo.png` — your logo, self-hosted (not on any third-party CDN)

## No backend
This is a pure static site — there is no server, database, or API.
- The **Contact** page's form and the **Careers** page's "Apply Now" buttons open the visitor's
  email app with a pre-filled message (via `mailto:`), addressed to `info@scmgroup-services.com`.
  Nothing is silently lost — if you want an actual database of submissions later, that requires
  hosting a small backend separately (e.g. via Formspree, a simple serverless function, or a
  proper backend host) and is not needed for the site to work correctly as-is.

## Deploying — this is the whole process
1. Upload every file and folder in this directory to your GitHub repo's root (keeping `assets/`
   as an actual folder — see the "How to upload correctly" note below).
2. Repo Settings → Pages → Source → **"Deploy from a branch"** → Branch: `main`, folder: `/ (root)`.
   Save. That's it — no Actions, no workflow file, no build.
3. Confirm your domain's DNS A-records point at GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

## How to upload correctly (avoiding the folder-flattening problem)
GitHub's "choose your files" picker cannot preserve folders — it always dumps everything flat
into the repo root, which breaks the site (assets/ won't exist as a folder). Instead:
1. Extract this zip on your computer into an actual folder.
2. Open that folder in File Explorer/Finder, select everything inside it (Ctrl+A / Cmd+A).
3. **Drag** the selected files and folders directly onto GitHub's upload page — don't click
   "choose your files" and pick through a dialog.
4. Before committing, confirm you see an `assets` folder row (not loose files like `scm-logo.png`
   sitting bare in the list). If it's flattened again, refresh and drag again.

If drag-and-drop keeps flattening things in your browser, install **GitHub Desktop** instead —
point it at the extracted folder and it publishes the structure correctly every time.
