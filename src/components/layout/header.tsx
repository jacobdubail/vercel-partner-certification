import Link from "next/link";
import { Suspense } from "react";
import { HeaderActions } from "@/components/layout/header-actions";
import { HeaderActionsSkeleton } from "@/components/layout/header-actions-skeleton";
import { NavLink } from "@/components/layout/nav-link";
import { VercelLogo } from "@/components/layout/vercel-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-10">
        <Link
          href={{ pathname: "/" }}
          className="inline-flex items-center gap-2 text-foreground"
          aria-label="Vercel Daily — home"
        >
          <VercelLogo className="h-5 w-auto" />
          <span className="font-serif text-lg font-semibold tracking-tight">
            Vercel Daily
          </span>
        </Link>

        <Suspense
          fallback={
            <nav aria-label="Primary" className="flex items-center gap-6" />
          }
        >
          <nav aria-label="Primary" className="flex items-center gap-6">
            <NavLink href={{ pathname: "/" }} exact>
              Home
            </NavLink>
            <NavLink href={{ pathname: "/search" }}>Search</NavLink>
          </nav>
        </Suspense>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Suspense fallback={<HeaderActionsSkeleton />}>
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </header>
  );
};
