export function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value.trim() === "") {
    throw new Error(
      `Missing required environment variable "${name}". Set it in .env.local (local) and in your Vercel project env settings (production).`,
    );
  }
  return value;
}