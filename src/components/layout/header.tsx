import Link from "next/link";
import { HeaderActions } from "@/components/layout/header-actions";
import { NavLink } from "@/components/layout/nav-link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { VercelLogo } from "@/components/layout/vercel-logo";

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

        <nav aria-label="Primary" className="flex items-center gap-6">
          <NavLink href={{ pathname: "/" }} exact>
            Home
          </NavLink>
          <NavLink href={{ pathname: "/search" }}>Search</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
};
