import { cacheLife, cacheTag } from "next/cache";
import { api, ApiResponseError } from "@/utilities/api";

export type Author = {
  name: string;
  avatar: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "blockquote"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export type CategorySlug =
  | "changelog"
  | "engineering"
  | "customers"
  | "company-news"
  | "community";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  category: CategorySlug;
  author: Author;
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  articleCount: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type ArticleListResponse = {
  success: boolean;
  data: Article[];
  meta: { pagination: PaginationMeta };
};

type CategoryListResponse = {
  success: boolean;
  data: Category[];
};

type ArticleResponse = {
  success: boolean;
  data: Article;
};

type TrendingArticlesResponse = {
  success: boolean;
  data: Article[];
};

type BreakingNewsResponse = {
  success: boolean;
  data: BreakingNews | null;
};

export type BreakingNews = {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: CategorySlug;
  publishedAt: string;
  urgent: boolean;
};

export type GetArticlesParams = {
  search?: string;
  category?: CategorySlug | "";
  page?: number;
  limit?: number;
  featured?: "true" | "false";
};

/**
 * Fetch articles from the news API. Cached per unique parameter set so identical
 * search queries reuse the same response across requests.
 */
export async function getArticles(
  params: GetArticlesParams = {},
): Promise<ArticleListResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.featured) query.set("featured", params.featured);

  const qs = query.toString();
  return api<ArticleListResponse>(`articles${qs ? `?${qs}` : ""}`);
}

/** Fetch all article categories. Cached aggressively since the list rarely changes. */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  const res = await api<CategoryListResponse>("categories");
  return res.data;
}

/**
 * Fetch the current breaking-news headline. Returns `null` when the API reports
 * no active breaking item, so callers can trivially hide the banner.
 */
export async function getBreakingNews(): Promise<BreakingNews | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("breaking-news");

  const res = await api<BreakingNewsResponse>("breaking-news");
  return res.data ?? null;
}

/**
 * Fetch a single article by slug or id. Returns `null` on 404 so callers can
 * render a graceful fallback instead of tripping an error boundary.
 */
export async function getArticle(idOrSlug: string): Promise<Article | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  try {
    const res = await api<ArticleResponse>(
      `articles/${encodeURIComponent(idOrSlug)}`,
    );
    return res.data;
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Fetch trending articles from the dedicated API endpoint. The API accepts an
 * optional `exclude` slug so the article detail page can avoid recommending the
 * piece the reader is already on.
 */
export async function getTrendingArticles({
  excludeSlug,
  limit = 4,
}: {
  excludeSlug?: string;
  limit?: number;
} = {}): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const query = new URLSearchParams();
  if (excludeSlug) {
    query.set("exclude", excludeSlug);
  }

  const res = await api<TrendingArticlesResponse>(
    `articles/trending${query.size > 0 ? `?${query.toString()}` : ""}`,
  );
  return res.data
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, limit);
}

/**
 * Source of truth for the homepage article data. Picks a hero (featured[0] with
 * latest[0] fallback) and returns a deduped grid of six latest articles that
 * never includes the hero. Over-fetches by one so the grid stays size-6 even
 * when the hero is present in the latest list.
 */
export async function getHomeArticles(): Promise<{
  hero: Article | null;
  grid: Article[];
}> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const [featuredRes, latestRes] = await Promise.all([
    getArticles({ featured: "true", limit: 1 }),
    getArticles({ limit: 7 }),
  ]);

  const hero = featuredRes.data[0] ?? latestRes.data[0] ?? null;
  const grid = latestRes.data
    .filter((article) => article.slug !== hero?.slug)
    .slice(0, 6);

  return { hero, grid };
}

/**
 * Build-time helper for article-route SSG. Fetches every page of article list
 * data and returns the canonical slugs we link to throughout the app.
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const PAGE_SIZE = 100;
  const firstPage = await getArticles({ page: 1, limit: PAGE_SIZE });

  if (firstPage.meta.pagination.totalPages <= 1) {
    return firstPage.data.map((article) => article.slug);
  }

  const remainingPages = await Promise.all(
    Array.from(
      { length: firstPage.meta.pagination.totalPages - 1 },
      (_, index) => getArticles({ page: index + 2, limit: PAGE_SIZE }),
    ),
  );

  return [firstPage, ...remainingPages]
    .flatMap((page) => page.data.map((article) => article.slug))
    .filter((slug, index, allSlugs) => allSlugs.indexOf(slug) === index);
}
