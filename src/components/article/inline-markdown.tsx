import Markdown from "react-markdown";

type InlineMarkdownProps = {
  text: string;
};

/**
 * Renders inline markdown for article body text fields (paragraphs, list items,
 * blockquotes). Allowlist is intentionally narrow:
 *
 * - `a`, `strong`, `em`, `code` are permitted because they appear in the corpus.
 * - Block-level elements (`p`, headings, lists, blockquote) are *unwrapped*
 *   because we render those at the ContentBlock layer and don't want nested
 *   `<p>` inside our own `<p>`.
 * - `img` is intentionally NOT in the allowlist. The corpus contains a
 *   demonstration of image-markdown exfiltration inside an article literally
 *   warning about it; rendering it would (a) misrepresent the author's intent
 *   and (b) be the exact pattern the article calls out as unsafe.
 */
export const InlineMarkdown: React.FC<InlineMarkdownProps> = ({ text }) => {
  return (
    <Markdown
      allowedElements={["a", "strong", "em", "code"]}
      unwrapDisallowed
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-medium text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.9em] text-foreground">
            {children}
          </code>
        ),
      }}
    >
      {text}
    </Markdown>
  );
};
