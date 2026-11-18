# JeetStack — Portfolio

Senior Fullstack Engineer portfolio for **Bishwajeet Kumar**, rebuilt with [Aceternity UI](https://ui.aceternity.com/), Next.js, Tailwind CSS, and Motion.

Production: Cloudflare Pages (`https://jeetstack.pages.dev`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & SEO check

```bash
npm run build
npm run seo:check
```

Static output lands in `out/`.

## Deploy to Cloudflare Pages

```bash
npx wrangler login
npx wrangler pages project create jeetstack --production-branch=main
npm run pages:deploy
```

Override the canonical site URL (custom domain) with:

```bash
NEXT_PUBLIC_SITE_URL=https://your.domain npm run pages:deploy
```

Optional subpath hosting:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run pages:deploy
```
