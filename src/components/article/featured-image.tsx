import Image from "next/image";
import type { Article } from "@/utilities/articles";

type FeaturedImageProps = {
  article: Article;
};

export const FeaturedImage: React.FC<FeaturedImageProps> = ({ article }) => {
  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-secondary">
      <Image
        src={article.image}
        alt={article.title}
        fill
        priority
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="object-cover"
      />
    </figure>
  );
};
