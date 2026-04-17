import Image from "next/image";
import Link from "next/link";
import { getHomeArticles } from "@/utilities/articles";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const Hero: React.FC = async () => {
  const { hero } = await getHomeArticles();

  if (!hero) {
    return null;
  }

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-10 lg:flex-row lg:items-center lg:gap-12 lg:py-20">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-eyebrow rounded-full bg-secondary px-3 py-1 text-foreground">
              {hero.category.replace("-", " ")}
            </span>
            <time dateTime={hero.publishedAt}>
              {dateFormatter.format(new Date(hero.publishedAt))}
            </time>
          </div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.excerpt}
          </p>
          <div>
            <Link
              href={{ pathname: `/articles/${hero.slug}` }}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Read the story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border lg:flex-1">
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
