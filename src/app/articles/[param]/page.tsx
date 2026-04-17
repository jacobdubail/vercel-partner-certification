import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleHeader } from "@/components/article/article-header";
import { FeaturedImage } from "@/components/article/featured-image";
import { SubscribeCTA } from "@/components/article/subscribe-cta";
import { TrendingArticles } from "@/components/trending/trending-articles";
import { TrendingArticlesSkeleton } from "@/components/trending/trending-articles-skeleton";
import { getArticle } from "@/utilities/articles";

type ArticlePageProps = {
  params: Promise<{ param: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { param } = await params;
  const article = await getArticle(param);

  if (!article) {
    return {
      title: "Article not found | Vercel Daily",
    };
  }

  return {
    title: `${article.title} | Vercel Daily`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.image, alt: article.title }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { param } = await params;
  const article = await getArticle(param);

  if (!article) {
    notFound();
  }

  return (
    <>
      <article className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 sm:px-10">
        <ArticleHeader article={article} />
        <FeaturedImage article={article} />
        <ArticleBody article={article} />
      </article>

      <SubscribeCTA />

      <Suspense fallback={<TrendingArticlesSkeleton />}>
        <TrendingArticles excludeSlug={article.slug} />
      </Suspense>
    </>
  );
}
