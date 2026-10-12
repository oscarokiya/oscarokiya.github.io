# Oscar Okiya — personal website

Portfolio and blog, built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui. Blog posts are pulled live from [dev.to](https://dev.to/oscarrobertstar).

**Live:** https://oscarokiya.github.io/

Every push to `main` is built and published automatically. The usual loop is: edit → check locally → push → confirm it's live.

---

## 1. One-time setup

You need [Node.js 22](https://nodejs.org/) (`node -v` to check), Git, and optionally the [GitHub CLI](https://cli.github.com/) (`gh`) for watching deploys.

```sh
git clone https://github.com/oscarokiya/oscarokiya.github.io.git
cd oscarokiya.github.io
npm ci
```

`npm ci` installs the exact dependency versions from `package-lock.json`. Run it again whenever `package-lock.json` changes.

## 2. Make changes

Start the dev server; it reloads the page every time you save a file:

```sh
npm run dev
```

Open http://localhost:8080/.

### Where things live

| What you want to change | File |
|---|---|
| Name, subtitle, tagline, GitHub/LinkedIn links | [src/components/Hero.tsx](src/components/Hero.tsx) |
| About text and the skills list | [src/components/About.tsx](src/components/About.tsx) |
| Jobs, dates, achievements ("View Wins") | [src/components/Experience.tsx](src/components/Experience.tsx), in the `experiences` list |
| Featured project, certifications, talks | [src/components/Highlights.tsx](src/components/Highlights.tsx), in `project`, `certifications` and `talks` |
| Email, phone, location | [src/components/Contact.tsx](src/components/Contact.tsx) |
| Nav bar links and the "Oscar Okiya" logo text | [src/components/Navigation.tsx](src/components/Navigation.tsx) |
| Browser tab title, Google and link-preview text | [index.html](index.html): `<title>`, `description`, the `og:*` and `twitter:*` tags, and the JSON-LD block |
| Downloadable CV | [public/CV_Oscar_Okiya.pdf](public/CV_Oscar_Okiya.pdf) |
| Link-preview image | [public/og-image.png](public/og-image.png) |
| Colours and fonts | [src/index.css](src/index.css) (CSS variables) and [tailwind.config.ts](tailwind.config.ts) |
| Blog posts | Nothing to edit here. Publish on dev.to and they appear automatically. |
| Blog name ("Tech With Okiya") and blurb | [src/pages/Blog.tsx](src/pages/Blog.tsx) (blog page) and [src/components/RecentBlogs.tsx](src/components/RecentBlogs.tsx) (home page section) |

### Common edits

**Add a job or achievement.** In `Experience.tsx`, copy an existing entry in `experiences` and edit it. The newest job goes first. Each string in `wins` is one bullet.

**Add a certification or talk.** In `Highlights.tsx`, add a line to `certifications`, or copy an entry in `talks`.

**Replace the CV.** Overwrite `public/CV_Oscar_Okiya.pdf` with the new file, keeping the same name. If you change the name, also update the link in `Experience.tsx`. Anything in the CV, such as your phone number, becomes public.

**Change the link-preview image.** Replace `public/og-image.png` with any 1200×630 PNG of the same name. LinkedIn caches previews, so use the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to refresh it.

**Add a photo (when you have one).** Put the image in `public/` (for example `public/oscar.jpg`) and reference it in a component as `` `${import.meta.env.BASE_URL}oscar.jpg` ``. Keep photos under about 300 KB; resize large phone photos first.

### Rules that keep the site working

- **Internal links must start with `import.meta.env.BASE_URL`**, or use React Router's `<Link to="/...">`. Don't hardcode `href="/blog"`.
- **A new page needs three things:** a route in [src/App.tsx](src/App.tsx); a `cp dist/index.html dist/<page>.html` line in [.github/workflows/deploy.yml](.github/workflows/deploy.yml), so it loads with a 200 status rather than a 404; and an entry in [public/sitemap.xml](public/sitemap.xml).
- **Never commit secrets** such as API keys or tokens. This repository is public.

## 3. Build and check locally

Before pushing, run the same build the deploy runs, then preview the result:

```sh
npm run lint      # should report 0 errors (a few warnings are expected)
npm run build     # production build into dist/; must end with "✓ built"
npm run preview   # serves dist/ at http://localhost:4173/
```

In the preview, click through the home page, every nav link, the blog, an article, and the Download CV button. Narrow the browser window to check the phone layout. If the build fails, it prints the file and line to fix.

## 4. Deploy

Commit and push to `main`:

```sh
git add -A
git commit -m "Describe what you changed"
git push
```

This starts the [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow, which installs dependencies, builds, and publishes `dist/`. It takes about a minute. To watch it:

```sh
gh run watch           # or open the repo's Actions tab on GitHub
```

When it finishes, open https://oscarokiya.github.io/ and hard-refresh (Cmd+Shift+R) to bypass your browser cache.

> **Bigger changes:** push to a branch and open a pull request instead. Only merges to `main` deploy, so you can review the diff first.

## 5. Undo a bad deploy

Revert the commit and push. The previous version goes back up in about a minute:

```sh
git log --oneline      # find the commit to undo
git revert <commit>
git push
```

## 6. Troubleshooting

| Symptom | Fix |
|---|---|
| The workflow failed | Open the run in the Actions tab and read the red step. Usually the build failed: run `npm run build` locally and fix the error it prints. |
| Deployed, but the change isn't visible | Hard-refresh (Cmd+Shift+R). GitHub Pages can also take a minute or two to update. |
| `npm ci` fails | Check that `node -v` shows 22. If `package.json` changed, run `npm install` once and commit the updated `package-lock.json`. |
| A page shows "404 Oops! Page not found" | The route is missing from `src/App.tsx`, or a link is hardcoded without `BASE_URL`. |
| Blog section is empty or stale | Posts come from dev.to's API and are cached in the visitor's browser for an hour. New posts can take up to an hour to show for returning visitors; if dev.to is down, it recovers by itself. |
| LinkedIn shows an old preview | Re-scrape the URL with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). |

## Project layout

```
index.html                    page title and social/SEO metadata
public/                       files served as-is (CV, preview image, robots.txt, sitemap.xml)
src/App.tsx                   routes: / and /blog
src/pages/                    Index (home), Blog, NotFound
src/components/               home page sections, plus blog pieces (ArticleDetail, SeriesView, FeaturedSeries)
src/components/ui/            shadcn/ui building blocks; rarely edited
src/services/devtoApi.ts      fetches and caches posts from dev.to
.github/workflows/deploy.yml  builds and publishes on every push to main
```
