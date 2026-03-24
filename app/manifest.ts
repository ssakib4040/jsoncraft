import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JSONCraft",
    short_name: "JSONCraft",
    description:
      "Generate realistic JSON mock data from templates with built-in dynamic functions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/newlogo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/newlogo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
