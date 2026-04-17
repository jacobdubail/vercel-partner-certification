import Image from "next/image";
import { InlineMarkdown } from "@/components/article/inline-markdown";
import type { ContentBlock } from "@/utilities/articles";

type ArticleContentProps = {
  blocks: ContentBlock[];
};

const Block: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-foreground sm:text-lg">
          <InlineMarkdown text={block.text} />
        </p>
      );
    case "heading": {
      const className =
        block.level === 2
          ? "font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl mt-4"
          : "font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl mt-2";
      return block.level === 2 ? (
        <h2 className={className}>{block.text}</h2>
      ) : (
        <h3 className={className}>{block.text}</h3>
      );
    }
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-foreground/20 pl-4 text-base italic leading-relaxed text-muted-foreground sm:text-lg">
          <InlineMarkdown text={block.text} />
        </blockquote>
      );
    case "unordered-list":
      return (
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground sm:text-lg">
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-foreground sm:text-lg">
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className="my-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-secondary">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
  }
};

export const ArticleContent: React.FC<ArticleContentProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
};
