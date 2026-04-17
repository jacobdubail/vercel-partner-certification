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
    <section className="border-b border-border bg-background lg:grid lg:grid-cols-[minmax(0,1fr)_50vw] lg:items-stretch lg:bg-card">
      <div className="px-4 py-12 sm:px-10 lg:px-0 lg:py-20">
        <div className="flex flex-col gap-4 lg:ml-auto lg:max-w-[40rem] lg:py-8 lg:pl-10 lg:pr-16">
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
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Read the story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="pb-12 lg:px-0 lg:py-20 lg:pl-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:min-h-[30rem] lg:rounded-l-2xl lg:rounded-r-none lg:border lg:border-border lg:border-r-0 lg:bg-white dark:lg:bg-card lg:p-2">
          <Image
            src={hero.image}
            alt={hero.title}
            priority
						fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};
