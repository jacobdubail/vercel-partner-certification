import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SubscriptionPendingProvider } from "@/components/subscription/subscription-pending-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getPublicationConfig } from "@/utilities/publication";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublicationConfig();

  return {
    applicationName: publication.publicationName,
    title: {
      default: publication.seo.defaultTitle,
      template: publication.seo.titleTemplate,
    },
    description: publication.seo.defaultDescription,
    openGraph: {
      title: publication.seo.defaultTitle,
      description: publication.seo.defaultDescription,
      type: "website",
      siteName: publication.publicationName,
    },
    twitter: {
      card: "summary_large_image",
      title: publication.seo.defaultTitle,
      description: publication.seo.defaultDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SubscriptionPendingProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Suspense
              fallback={
                <footer className="border-t border-border bg-white py-6 text-center text-sm text-muted-foreground dark:bg-card">
                  &copy; Vercel Daily News. All rights reserved.
                </footer>
              }
            >
              <Footer />
            </Suspense>
          </SubscriptionPendingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
