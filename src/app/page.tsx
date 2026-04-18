import type { Metadata } from "next";
import { Suspense } from "react";
import { BreakingNewsBanner } from "@/components/home/breaking-news-banner";
import { BreakingNewsSkeleton } from "@/components/home/breaking-news-skeleton";
import { FeaturedArticles } from "@/components/home/featured-articles";
import { FeaturedArticlesSkeleton } from "@/components/home/featured-articles-skeleton";
import { Hero } from "@/components/home/hero";
import { HeroSkeleton } from "@/components/home/hero-skeleton";
import { getPublicationConfig } from "@/utilities/publication";

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublicationConfig();

  return {
    title: {
      absolute: publication.seo.defaultTitle,
    },
    description: publication.seo.defaultDescription,
    openGraph: {
      title: publication.seo.defaultTitle,
      description: publication.seo.defaultDescription,
      type: "website",
      siteName: publication.publicationName,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<BreakingNewsSkeleton />}>
        <BreakingNewsBanner />
      </Suspense>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<FeaturedArticlesSkeleton />}>
        <FeaturedArticles />
      </Suspense>
    </>
  );
}
