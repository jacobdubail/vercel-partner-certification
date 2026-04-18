import Link from "next/link";
import { SubscribeButton } from "@/components/article/subscribe-button";
import { SubscribeForm } from "@/components/subscription/subscribe-form";
import { getPublicationConfig } from "@/utilities/publication";
import { getSubscription } from "@/utilities/subscription";

export const Hero: React.FC = async () => {
  const [{ isSubscribed }, publication] = await Promise.all([
    getSubscription(),
    getPublicationConfig(),
  ]);

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-10 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-5">
          <span className="font-eyebrow text-muted-foreground">
            {publication.publicationName}
          </span>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            News and insights for modern web developers.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {publication.seo.defaultDescription}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={{ pathname: "/search" }}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Browse articles
              <span aria-hidden>→</span>
            </Link>
            {isSubscribed ? (
              <span className="font-eyebrow inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-foreground">
                Subscribed
              </span>
            ) : (
              <SubscribeForm ariaLabel="Subscribe to Vercel Daily from the homepage hero">
                <SubscribeButton
                  label="Subscribe"
                  className="font-eyebrow inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-60"
                />
              </SubscribeForm>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
