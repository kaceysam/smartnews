"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news-card";
import { StyleToggle } from "@/components/style-toggle";
import { Sparkles, RefreshCw, Loader2 } from "lucide-react";
import type { SummarizedArticle, StyleMode } from "@/lib/types";

export default function Home() {
  const [style, setStyle] = useState<StyleMode>("CEO");
  const [articles, setArticles] = useState<SummarizedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (styleMode: StyleMode) => {
    try {
      setError(null);
      const response = await fetch(`/api/news?style=${styleMode}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch news");
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews(style);
  }, [style]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews(style);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SmartNews</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              AI-Powered Daily Briefing
            </span>
          </div>
          <div className="flex items-center gap-4">
            <StyleToggle value={style} onValueChange={setStyle} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing || loading}
            >
              {refreshing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your Daily
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              AI News Briefing
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Stay informed with AI-powered summaries of the latest news in
            technology, AI, and fintech. Choose your reading style and get
            insights tailored to your needs.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">
              Fetching and summarizing the latest news...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mx-auto max-w-2xl rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-destructive">
              Error Loading News
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && articles.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {style === "CEO"
                    ? "Executive Briefing"
                    : "Tech Enthusiast Briefing"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {articles.length} articles • Updated just now
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} style={style} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="mx-auto max-w-2xl rounded-lg border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No articles found. Try refreshing or check your API configuration.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">SmartNews</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by OpenAI GPT-4o-mini • News from GNews API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
