import { NextRequest, NextResponse } from "next/server";
import { fetchNews } from "@/lib/fetchNews";
import { summarizeArticles } from "@/lib/summarize";
import type { StyleMode } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const style = (searchParams.get("style") || "CEO") as StyleMode;

    if (style !== "CEO" && style !== "ENTHUSIAST") {
      return NextResponse.json(
        { error: "Invalid style. Must be 'CEO' or 'ENTHUSIAST'" },
        { status: 400 }
      );
    }

    // Fetch news articles
    const articles = await fetchNews();

    if (articles.length === 0) {
      return NextResponse.json(
        { error: "No articles found" },
        { status: 404 }
      );
    }

    // Summarize articles
    const summarizedArticles = await summarizeArticles(articles, style);

    return NextResponse.json({
      style,
      articles: summarizedArticles,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in news API:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch news",
      },
      { status: 500 }
    );
  }
}
