import type { Article } from "@/utilities/articles";

type ArticleHeaderProps = {
  article: Article;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <header className="flex flex-col gap-5">
      <span className="font-eyebrow self-start rounded-full bg-secondary px-3 py-1 text-foreground">
        {article.category.replace("-", " ")}
      </span>
      <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {article.title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          {article.author.name}
        </span>
        <span aria-hidden>·</span>
        <time dateTime={article.publishedAt}>
          {dateFormatter.format(new Date(article.publishedAt))}
        </time>
      </div>
    </header>
  );
};
