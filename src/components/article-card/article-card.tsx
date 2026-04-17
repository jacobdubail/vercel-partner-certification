import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/utilities/articles";

type ArticleCardProps = {
  article: Article;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const publishedAt = new Date(article.publishedAt);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/40 focus-within:border-foreground/40">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-eyebrow rounded-full bg-secondary px-2 py-0.5 text-foreground">
            {article.category.replace("-", " ")}
          </span>
          <time dateTime={article.publishedAt}>
            {dateFormatter.format(publishedAt)}
          </time>
        </div>
        <h3 className="line-clamp-2 min-h-[2lh] font-serif text-lg font-semibold leading-snug text-foreground">
          <Link
            href={{ pathname: `/articles/${article.slug}` }}
            className="outline-none focus-visible:underline group-hover:underline"
          >
            {article.title}
            <span aria-hidden className="absolute inset-0" />
          </Link>
        </h3>
        <p className="line-clamp-2 min-h-[2lh] text-sm text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
};
