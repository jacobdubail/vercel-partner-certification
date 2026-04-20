import { ArticleContent } from "@/components/article/article-content";
import type { Article, ContentBlock } from "@/utilities/articles";
import { getSubscription } from "@/utilities/subscription";

type ArticleBodyProps = {
  article: Article;
};

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
