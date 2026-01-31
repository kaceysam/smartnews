import type { NewsArticle } from "./types";

const GNEWS_API_URL = "https://gnews.io/api/v4/search";

export async function fetchNews(): Promise<NewsArticle[]> {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    throw new Error("GNEWS_API_KEY environment variable is not set");
  }

  // Query terms for tech, AI, fintech news
  const queryTerms = [
    "artificial intelligence",
    "AI technology",
    "fintech",
    "technology startups",
    "cloud computing",
    "cryptocurrency",
    "blockchain",
  ];

  const allArticles: NewsArticle[] = [];

  // Fetch news for each query term
  for (const query of queryTerms) {
    try {
      // Construct URL safely to avoid pattern matching errors
      const url = new URL(GNEWS_API_URL);
      // Ensure query is a valid string
      const safeQuery = String(query).trim();
      if (!safeQuery) continue;
      
      url.searchParams.set("q", safeQuery);
      url.searchParams.set("lang", "en");
      url.searchParams.set("max", "5");
      url.searchParams.set("apikey", apiKey);

      const response = await fetch(url.toString(), {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        console.warn(`Failed to fetch news for "${query}": ${response.statusText}`);
        continue;
      }

      const data = await response.json();

      if (data.articles && Array.isArray(data.articles)) {
        const articles: NewsArticle[] = data.articles.map((article: any) => ({
          title: article.title || "",
          source: article.source?.name || "Unknown",
          url: article.url || "",
          content: article.content || article.description || "",
          publishedAt: article.publishedAt || new Date().toISOString(),
        }));

        allArticles.push(...articles);
      }
    } catch (error) {
      console.error(`Error fetching news for "${query}":`, error);
      continue;
    }
  }

  // Remove duplicates based on URL
  const uniqueArticles = Array.from(
    new Map(allArticles.map((article) => [article.url, article])).values()
  );

  // Sort by published date (newest first) and limit to top 15
  return uniqueArticles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 15);
}

// Fallback: Use NewsAPI if GNews is not available
export async function fetchNewsFromNewsAPI(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error("NEWS_API_KEY environment variable is not set");
  }

  const queryTerms = [
    "artificial intelligence",
    "fintech",
    "technology",
    "startups",
    "cloud computing",
    "cryptocurrency",
  ];

  const allArticles: NewsArticle[] = [];

  for (const query of queryTerms) {
    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        console.warn(`Failed to fetch from NewsAPI for "${query}"`);
        continue;
      }

      const data = await response.json();

      if (data.articles && Array.isArray(data.articles)) {
        const articles: NewsArticle[] = data.articles.map((article: any) => ({
          title: article.title || "",
          source: article.source?.name || "Unknown",
          url: article.url || "",
          content: article.content || article.description || "",
          publishedAt: article.publishedAt || new Date().toISOString(),
        }));

        allArticles.push(...articles);
      }
    } catch (error) {
      console.error(`Error fetching from NewsAPI for "${query}":`, error);
      continue;
    }
  }

  const uniqueArticles = Array.from(
    new Map(allArticles.map((article) => [article.url, article])).values()
  );

  return uniqueArticles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 15);
}
