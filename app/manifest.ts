import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brandName,
    short_name: "Nastasia",
    description: "Strength and health coaching for women. Health first, never restriction.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1e8d9",
    theme_color: "#c02d1e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
