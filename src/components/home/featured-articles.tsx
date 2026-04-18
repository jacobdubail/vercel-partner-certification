import Link from "next/link";
import { ArticleCard } from "@/components/article-card/article-card";
import { getHomeArticles } from "@/utilities/articles";

export const FeaturedArticles: React.FC = async () => {
  const articles = await getHomeArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-10">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Featured
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Handpicked stories from the team.
          </p>
        </div>
        <Link
          href={{ pathname: "/search" }}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
