import { ArticleContent } from "@/components/article/article-content";
import type { Article } from "@/utilities/articles";

type ArticleBodyProps = {
  article: Article;
};

/**
 * Thin wrapper around ArticleContent. Exists as a deliberate seam: when the
 * paywall lands, this is the single component the gate wraps / swaps. Today it
 * always renders the full body; once subscription state arrives, the gate will
 * decide between this and a teaser-only variant.
 */
export const ArticleBody: React.FC<ArticleBodyProps> = ({ article }) => {
  return <ArticleContent blocks={article.content} />;
};
