"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import type { SummarizedArticle, StyleMode } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  article: SummarizedArticle;
  style: StyleMode;
}

export function NewsCard({ article, style }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-tight">
            {article.summary.headline}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            asChild
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read full article"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium">{article.source}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {timeAgo}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {style === "CEO" ? (
          <>
            {article.summary.whyItMatters && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-primary">
                  Why it matters
                </h4>
                <p className="text-sm text-muted-foreground">
                  {article.summary.whyItMatters}
                </p>
              </div>
            )}
            {article.summary.strategicImplication && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-primary">
                  Strategic implication
                </h4>
                <p className="text-sm text-muted-foreground">
                  {article.summary.strategicImplication}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {article.summary.whatHappened && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-primary">
                  What happened
                </h4>
                <p className="text-sm text-muted-foreground">
                  {article.summary.whatHappened}
                </p>
              </div>
            )}
            {article.summary.whyInteresting && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-primary">
                  Why it&apos;s interesting
                </h4>
                <p className="text-sm text-muted-foreground">
                  {article.summary.whyInteresting}
                </p>
              </div>
            )}
            {article.summary.whatUnlocks && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-primary">
                  What this unlocks
                </h4>
                <p className="text-sm text-muted-foreground">
                  {article.summary.whatUnlocks}
                </p>
              </div>
            )}
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          asChild
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full article
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
