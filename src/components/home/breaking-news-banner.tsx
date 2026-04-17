import Link from "next/link";
import { getArticle, getBreakingNews } from "@/utilities/articles";

export const BreakingNewsBanner: React.FC = async () => {
  const breaking = await getBreakingNews().catch(() => null);
  if (!breaking) {
    return null;
  }

  const article = await getArticle(breaking.articleId).catch(() => null);
  if (!article) {
    return null;
  }

  return (
    <aside
      aria-label="Breaking news"
      className="border-b border-border bg-foreground text-background"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-10">
        <span
          className={`font-eyebrow inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 ${
            breaking.urgent
              ? "bg-red-500 text-white"
              : "bg-background/20 text-background"
          }`}
        >
          {breaking.urgent ? "Breaking" : "Trending"}
        </span>
        <Link
          href={{ pathname: `/articles/${article.slug}` }}
          className="flex flex-1 flex-col gap-1 hover:underline sm:flex-row sm:items-baseline sm:gap-2"
        >
          <span className="text-sm font-semibold leading-snug">
            {breaking.headline}
          </span>
          <span className="text-sm text-background/70 sm:line-clamp-1">
            {breaking.summary}
          </span>
        </Link>
      </div>
    </aside>
  );
};
