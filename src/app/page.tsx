import type { Metadata } from "next";
import { Suspense } from "react";
import { BreakingNewsBanner } from "@/components/home/breaking-news-banner";
import { BreakingNewsSkeleton } from "@/components/home/breaking-news-skeleton";
import { FeaturedArticles } from "@/components/home/featured-articles";
import { FeaturedArticlesSkeleton } from "@/components/home/featured-articles-skeleton";
import { Hero } from "@/components/home/hero";
import { HeroSkeleton } from "@/components/home/hero-skeleton";

export const metadata: Metadata = {
  title: "Vercel Daily — news for builders",
  description:
    "Daily briefings on changelog releases, engineering deep-dives, customer stories, and community updates from across the Vercel ecosystem.",
  openGraph: {
    title: "Vercel Daily — news for builders",
    description:
      "Daily briefings on changelog releases, engineering deep-dives, customer stories, and community updates from across the Vercel ecosystem.",
    type: "website",
  },
};

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
