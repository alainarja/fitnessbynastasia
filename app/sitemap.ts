import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/coaching", "/shift", "/calculator", "/results", "/contact", "/privacy", "/terms"];
  return routes.map((path) => ({
    url: `${site.baseUrl}${path}`,
    changeFrequency: path === "" || path === "/shift" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/shift" ? 0.9 : 0.6,
  }));
}
