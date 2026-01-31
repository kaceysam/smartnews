export type StyleMode = "CEO" | "ENTHUSIAST";

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  content: string;
  publishedAt: string;
}

export interface SummarizedArticle {
  title: string;
  source: string;
  url: string;
  summary: {
    headline: string;
    whyItMatters?: string; // CEO mode
    strategicImplication?: string; // CEO mode
    whatHappened?: string; // Tech Enthusiast mode
    whyInteresting?: string; // Tech Enthusiast mode
    whatUnlocks?: string; // Tech Enthusiast mode
  };
  publishedAt: string;
}
