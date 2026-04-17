import { ArticleContent } from "@/components/article/article-content";
import type { Article, ContentBlock } from "@/utilities/articles";
import { getSubscription } from "@/utilities/subscription";

type ArticleBodyProps = {
  article: Article;
};

/**
 * Takes the first N `paragraph` blocks from an article. Everything before the
 * first paragraph (heading, image, etc.) is intentionally dropped from the
 * teaser — the paywall is a prose tease, not a chrome tease.
 */
const pickTeaserBlocks = (
  blocks: ContentBlock[],
  count: number,
): ContentBlock[] => {
  const teaser: ContentBlock[] = [];
  for (const block of blocks) {
    if (block.type === "paragraph") {
      teaser.push(block);
      if (teaser.length >= count) break;
    }
  }
  return teaser;
};

/**
 * Paywall seam. Reads subscription state server-side and decides how much of
 * the article to render. For guests, only the teaser blocks are ever passed to
 * `ArticleContent` — the gated blocks never enter the client tree, which is
 * the contract this component holds up.
 *
 * Must be awaited inside a Suspense boundary on the article route because
 * `getSubscription()` reads cookies (request-time API) under `cacheComponents`.
 */
export const ArticleBody: React.FC<ArticleBodyProps> = async ({ article }) => {
  const { isSubscribed } = await getSubscription();

  if (isSubscribed) {
    return <ArticleContent blocks={article.content} />;
  }

  const teaser = pickTeaserBlocks(article.content, 1);

  if (teaser.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <ArticleContent blocks={teaser} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </div>
  );
};
