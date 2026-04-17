import { ArticleCard } from "@/components/article-card/article-card";
import { getTrendingArticles } from "@/utilities/articles";

type TrendingArticlesProps = {
  excludeSlug?: string;
};

export const TrendingArticles: React.FC<TrendingArticlesProps> = async ({
  excludeSlug,
}) => {
  const articles = await getTrendingArticles({ excludeSlug, limit: 3 });

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Trending now
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
