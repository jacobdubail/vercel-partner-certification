import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");

  // `connection()` would force request-time rendering, but the copyright year
  // only needs to roll over around New Year's, so a daily cached value is enough.
  return new Date().getFullYear();
}

export const Footer: React.FC = async () => {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-border bg-white py-6 text-center text-sm text-muted-foreground dark:bg-card">
      &copy; {year} Vercel Daily News. All rights reserved.
    </footer>
  );
};
