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

  const pillLabel = breaking.urgent ? "Breaking" : "Top story";
  const pillClassName = breaking.urgent
    ? "bg-red-500 text-white"
    : "bg-background/20 text-background";

  return (
    <aside
      aria-label={breaking.urgent ? "Breaking news" : "Top story"}
      className="border-b border-border bg-foreground text-background"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-10">
        <span
          className={`font-eyebrow inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 ${pillClassName}`}
        >
          {pillLabel}
        </span>
        <Link
          href={{ pathname: `/articles/${article.slug}` }}
          className="min-w-0 flex-1 hover:underline"
        >
          <span className="block truncate text-sm font-semibold leading-snug">
            {breaking.headline}
          </span>
        </Link>
      </div>
    </aside>
  );
};
