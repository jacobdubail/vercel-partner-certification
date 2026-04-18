import { connection } from "next/server";

export const Footer: React.FC = async () => {
  await connection();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white py-6 text-center text-sm text-muted-foreground dark:bg-card">
      &copy; {year} Vercel Daily News. All rights reserved.
    </footer>
  );
};
