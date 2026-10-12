# Oscar Okiya — personal website

Portfolio and blog, built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui. Blog posts are pulled live from [dev.to](https://dev.to/oscarrobertstar).

Live: https://oscarokiya.github.io/

## Local development

```sh
npm ci
npm run dev      # http://localhost:8080/
npm run build    # outputs to dist/
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

The site is served from the root of `oscarokiya.github.io`. Internal links use `import.meta.env.BASE_URL`, so serving it from a subpath only requires changing `base` in [vite.config.ts](vite.config.ts) and updating the URLs in `index.html`.
