import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://naimdev-hazel.vercel.app";
  const currentDate = new Date().toISOString();

  // Primary static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog post routes
  let blogSlugs = [
    "architecting-for-scale",
    "future-of-ai-workflows",
  ];

  try {
    const res = await fetch("http://localhost:4000/api/v1/blogs", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        const fetchedSlugs = json.data.map((b: any) => b.slug).filter(Boolean);
        if (fetchedSlugs.length > 0) {
          blogSlugs = Array.from(new Set([...blogSlugs, ...fetchedSlugs]));
        }
      }
    }
  } catch (err) {
    // Fallback to static blogSlugs if backend is unreachable during build
  }

  const blogPostRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...blogPostRoutes];
}