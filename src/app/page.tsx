import { Suspense } from "react";
import { BreakingNewsBanner } from "@/components/home/breaking-news-banner";
import { BreakingNewsSkeleton } from "@/components/home/breaking-news-skeleton";
import { FeaturedArticles } from "@/components/home/featured-articles";
import { FeaturedArticlesSkeleton } from "@/components/home/featured-articles-skeleton";
import { Hero } from "@/components/home/hero";
import { HeroSkeleton } from "@/components/home/hero-skeleton";

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
