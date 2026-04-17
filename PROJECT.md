# Vercel Daily — Project Handoff

A news-site implementation for the Vercel Partner Certification exercise.
This document captures the project requirements, current state, architecture
decisions, and conventions so a new chat can pick up without re-deriving
context from code.

---

## 1. Overview

A Next.js 16 App Router news site powered by the Vercel Daily News API
(`VERCEL_DAILY_NEWS_BYPASS` + `API_BASE` env vars). Three top-level routes:


| Route                                              | Status        |
| -------------------------------------------------- | ------------- |
| `/` (homepage)                                     | ✅ implemented |
| `/search`                                          | ✅ implemented |
| `/articles/[param]` (detail, `param` = id or slug) | ✅ implemented |


Paywall / subscription flow is deliberately **stubbed** — `SubscribeCTA` and
`HeaderActions` render disabled placeholders. The data-fetch seam (`ArticleBody`)
is already in place for the future paywall.

---

## 2. Tech stack

- **Next.js 16** (App Router)
  - `reactCompiler: true`
  - `cacheComponents: true` — all data fetchers use `"use cache"` + `cacheLife` + `cacheTag`
  - `typedRoutes: true`
- **React 19** — `use()`, async RSCs, `useTransition`, Suspense streaming
- **TypeScript strict** — `noImplicitAny`, `strictNullChecks`, `noUnusedParameters`
- **Tailwind CSS v4** with `@custom-variant dark` (class-based dark mode)
- **Biome** for lint + format
- `**next-themes`** — light/dark/system toggle
- `**react-markdown**` — inline markdown in article content (images disabled for XSS safety)

---

## 3. Page requirements

### 3.1 Homepage (`/`)

Three top-level `Suspense` boundaries stream in parallel:

1. **Breaking News Banner** — from breaking-news API. Resolves `articleId` →
  canonical slug via `getArticle()` before linking. Hides gracefully if API
   returns nothing.
2. **Hero** — `featured[0]` if available, falls back to `latest[0]`. Image,
  title, excerpt, CTA to article.
3. **Featured Articles grid** — 6 unique articles. Deduped against the Hero so
  the hero article never appears twice on the page.

### 3.2 Search (`/search`)

- Input with native `type="search"`, label, `aria-describedby` hint.
- Category `<select>` from `getCategories()`.
- Auto-search triggers after **3+ characters**, debounced **300ms**.
- Empty input also auto-submits (clear). Below 3 chars and non-empty = no search.
- Category changes and explicit submit **bypass the debounce**.
- Shows up to **5 results** when searching, **6 recent articles** as default.
- Heading hierarchy: h1 "Search" → h2 "Recent articles"/"Results"/"No results" → h3 per card.
- `role="status" aria-live="polite"` on the count and empty-state container.
- URL is source of truth (`router.replace`); no `startTransition`, so the
Suspense skeleton shows on every nav — visible loading feedback.
- **No pagination** (not required by spec).

### 3.3 Article detail (`/articles/[param]`)

- `param` accepts either id or slug; `getArticle()` is id/slug-agnostic.
- `notFound()` when the API returns null.
- `generateMetadata()` populates SEO + Open Graph (`article` type, author,
published time, image).
- Layout:
  1. `ArticleHeader` — eyebrow category, h1 title, excerpt, author, date
  2. `FeaturedImage` — `next/image` with `priority`
  3. `ArticleBody` (thin wrapper around `ArticleContent` — **paywall seam**)
  4. `SubscribeCTA` — full-width banner, currently disabled
  5. `TrendingArticles` inside `Suspense` — 4 articles excluding current slug
- Body is wrapped in `max-w-3xl` for prose readability.
- `ArticleContent` renders typed `ContentBlock` unions:
`paragraph`, `heading` (2/3), `blockquote`, `unordered-list`,
`ordered-list`, `image`. Inline markdown via `InlineMarkdown` with
`react-markdown` allowing only `a`, `strong`, `em`, `code`. `**img` is
explicitly disallowed** (corpus contains XSS-style markdown images).

---

## 4. Architecture

### 4.1 Folder structure

```text
src/
├── app/
│   ├── articles/[param]/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── search/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── article/            # detail-page pieces (body, header, content, inline-markdown, featured-image, subscribe-cta, article-skeleton)
│   ├── article-card/       # shared card + skeleton (used by home, search, trending)
│   ├── home/               # hero, breaking-news-banner, featured-articles (+ skeletons)
│   ├── layout/             # header, footer, nav-link, header-actions, vercel-logo
│   ├── search/             # filter-form (RSC), search-form (client), search-results (+ skeleton)
│   ├── theme/              # theme-provider, theme-toggle
│   └── trending/           # trending-articles (+ skeleton)
└── utilities/
    ├── api.ts              # fetch wrapper, adds x-vercel-protection-bypass header, typed ApiResponseError
    ├── articles.ts         # all cached fetchers + shared types
    └── require-env.ts      # env-var assertion
```

**No barrel files.** Imports are always `@/components/<feature>/<file>`.
Explicit, greppable, tree-shake-friendly.

**Skeletons live next to the component they fall back for.** No `skeletons/` directory.

`**article-card/` is top-level** (not inside `shared/`) because it's the one truly shared component. Promotion rule: 2+ consumers = out of a feature folder.

### 4.2 Data layer (`src/utilities/articles.ts`)

All reads are cached RSCs. Shared types: `Article`, `Category`, `CategorySlug`, `BreakingNews`, `ContentBlock`.

Key fetchers:

- `getArticles({ search?, category?, limit? })` — paginated list, `cacheLife('hours')`, `cacheTag('articles')`
- `getArticle(idOrSlug)` — single article, returns `null` on 404
- `getCategories()` — returns `Category[]`
- `getBreakingNews()` — `cacheLife('minutes')`, `cacheTag('breaking-news')`
- `getHomeArticles()` — returns `{ hero, grid: Article[] }`, handles dedupe
- `getTrendingArticles({ excludeSlug?, limit = 4 })`

### 4.3 Route data flow

- Pages are async RSCs that don't `await` in the body — they render `<Suspense>` boundaries immediately.
- Each Suspense child is async and awaits its own `get`* fetcher.
- `loading.tsx` is used only for the article detail page (route-level fallback).

---

## 5. Design system & conventions

### 5.1 Typography

- **Headlines:** Playfair Display (`font-serif`, `--font-playfair-display`).
- **Body:** Source Sans 3 (`font-sans`, `--font-source-sans`).
- **Code / mono:** Tailwind default `font-mono` stack (ui-monospace, SF Mono, …). Used for `<code>` in article body and the error digest in `ErrorFallback`. No custom mono font loaded.

### 5.2 UI chrome — `font-eyebrow`

Custom Tailwind utility in `globals.css`:

```css
@utility font-eyebrow {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

Used for: category badges, form labels, breadcrumbs, any "caps metadata" chrome. Standardizes across components; don't hand-roll these styles.

### 5.3 Color tokens

Class-based dark mode via `@custom-variant dark (&:where(.dark, .dark *))`.
Tokens defined on `:root` and `.dark` and exposed via `@theme inline`:
`--background`, `--foreground`, `--card`, `--secondary`, `--border`, `--muted-foreground`.

### 5.4 Accessibility patterns

- **Article card**: `<article>` with `<h3>` containing the `<Link>` that wraps the title plus an `aria-hidden` `<span class="absolute inset-0">` overlay. Single accessible link, whole card clickable.
- **Dynamic announcements**: `role="status" aria-live="polite"` on search count + empty state.
- **Skeletons**: `aria-hidden` on decorative loading placeholders so SR users aren't announced loading animation noise.
- **Form landmarks**: `<form aria-label="...">` when there's no visible form heading.
- **Heading hierarchy**: every route has a single h1; sections use h2; card titles are h3. Never skip levels.
- **Focus styles**: `focus-visible:outline`/`focus-visible:underline` preserved on interactive elements.

### 5.5 Layout constraints

- Max content width: `max-w-7xl` for grids, `max-w-3xl` for article prose.
- Horizontal padding: `px-4 sm:px-10`.

---

## 6. Environment

```env
VERCEL_DAILY_NEWS_BYPASS=your-vercel-protection-bypass-token
API_BASE=https://your-api-host.example/api
```

- `.env.example` is tracked with obvious placeholders.
- `.env.local` holds real values and is gitignored (`.env*` + `!.env.example`).
- `requireEnv()` throws at module load if either is missing.
- API requests add header `x-vercel-protection-bypass: ${VERCEL_DAILY_NEWS_BYPASS}`.

---

## 7. Commands

```bash
npm run dev        # dev server (assume always running)
npm run build      # production build
npm run lint       # biome check
npx tsc --noEmit   # type check
```

---

## 8. Outstanding work (next phase candidates)

High-signal items for future sessions:

1. **Subscription / paywall**
  - Wire `HeaderActions` "Subscribe" button to real auth/signup flow.
  - `ArticleBody` is already the seam for gated-content rendering.
  - `SubscribeCTA` conditional visibility rules.
2. **Tests** — no test harness yet. Consider Vitest + Playwright for E2E on the three routes.
3. **Deploy** — Vercel deploy + `revalidateTag` hooks for `articles` / `breaking-news` tags.
4. **Open Graph image generation** (`opengraph-image.tsx`).

---

## 9. Important gotchas

- **Next.js 16 breaking changes.** APIs may differ from training data — read `node_modules/next/dist/docs/` before writing new route features.
- `**typedRoutes`** complains about dynamic query strings. Current workaround: `// @ts-expect-error` on `router.replace(buildSearchHref(...))` in `search-form.tsx`.
- `**cacheComponents**` means all data reads must be inside functions with `"use cache"`. Adding a fetch without that directive will break the build.
- `**react-markdown`'s image XSS vector.** The API corpus includes markdown like `![x](javascript:...)`. `InlineMarkdown` allowlists only `a`, `strong`, `em`, `code`. Don't relax this without a DOMPurify layer.
- **Auto-search behavior.** 3-char minimum + 300ms debounce. Clearing the input (empty string) also triggers a search to reset results. Don't change to `onBlur` or form-only submit without confirming with the spec.

---

## 10. Git state at handoff

- Branch: `cursor/news-site-scaffold`
- Base: `main`
- HEAD: `e1f2613` — *Scaffold Vercel Daily news site* (root commit, pushed to `origin`)
- Tracking: set to `origin/cursor/news-site-scaffold`

