import { ArticleCard } from "@/components/article-card/article-card";
import { getHomeArticles } from "@/utilities/articles";

export const FeaturedArticles: React.FC = async () => {
  const { grid } = await getHomeArticles();

  if (grid.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Featured Articles
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The latest from across changelog, engineering, and community.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
