import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/utilities/api";

type PublicationSeo = {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
};

type PublicationConfig = {
  publicationName: string;
  language: string;
  features: {
    newsletter: boolean;
    bookmarks: boolean;
    comments: boolean;
    darkMode: boolean;
    searchSuggestions: boolean;
  };
  socialLinks: {
    twitter: string;
    github: string;
    discord: string;
  };
  seo: PublicationSeo;
};

type PublicationConfigResponse = {
  success: boolean;
  data: PublicationConfig;
};

export async function getPublicationConfig(): Promise<PublicationConfig> {
  "use cache";
  cacheLife("days");
  cacheTag("publication-config");

  const res = await api<PublicationConfigResponse>("publication/config");
  return res.data;
}
