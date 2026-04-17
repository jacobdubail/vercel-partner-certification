"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type NavLinkProps = {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
  exact?: boolean;
};

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  exact = false,
}) => {
  const pathname = usePathname();
  const target = typeof href === "string" ? href : (href.pathname ?? "");
  const isActive = exact
    ? pathname === target
    : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
};
