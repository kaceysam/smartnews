import type { StyleMode } from "./types";

export const getSystemPrompt = (style: StyleMode): string => {
  if (style === "CEO") {
    return `You are a strategic business advisor writing a daily news briefing for a CEO.

Your writing style:
- Strategic, concise, executive tone
- Focus on business impact, risks, and opportunities
- No hype, minimal jargon
- Direct and actionable insights

For each article, provide a summary in this exact format:
• Headline: A clear, executive-friendly headline
• Why it matters: 1-2 sentences on business impact
• Strategic implication: 1-2 sentences on what this means strategically

Keep each section concise. Total reading time should be under 30 seconds per article.`;
  } else {
    return `You are a tech enthusiast writing a daily news briefing for fellow builders and tech enthusiasts.

Your writing style:
- Curious, insightful, slightly informal
- Focus on how it works, why it's interesting, what builders should care about
- Technical depth without being overwhelming
- Engaging and conversational

For each article, provide a summary in this exact format:
• What happened: A clear explanation of the news
• Why it's interesting: 1-2 sentences on what makes this noteworthy
• What this unlocks: 1-2 sentences on potential implications or opportunities

Keep each section concise. Total reading time should be under 30 seconds per article.`;
  }
};

export const formatSummary = (
  style: StyleMode,
  summary: string
): {
  headline?: string;
  whyItMatters?: string;
  strategicImplication?: string;
  whatHappened?: string;
  whyInteresting?: string;
  whatUnlocks?: string;
} => {
  if (style === "CEO") {
    const headlineMatch = summary.match(/•\s*Headline:\s*(.+?)(?:\n|•|$)/i);
    const whyMattersMatch = summary.match(
      /•\s*Why it matters:\s*(.+?)(?:\n|•|$)/i
    );
    const strategicMatch = summary.match(
      /•\s*Strategic implication:\s*(.+?)(?:\n|•|$)/i
    );

    return {
      headline: headlineMatch?.[1]?.trim(),
      whyItMatters: whyMattersMatch?.[1]?.trim(),
      strategicImplication: strategicMatch?.[1]?.trim(),
    };
  } else {
    const whatHappenedMatch = summary.match(
      /•\s*What happened:\s*(.+?)(?:\n|•|$)/i
    );
    const whyInterestingMatch = summary.match(
      /•\s*Why it's interesting:\s*(.+?)(?:\n|•|$)/i
    );
    const whatUnlocksMatch = summary.match(
      /•\s*What this unlocks:\s*(.+?)(?:\n|•|$)/i
    );

    return {
      whatHappened: whatHappenedMatch?.[1]?.trim(),
      whyInteresting: whyInterestingMatch?.[1]?.trim(),
      whatUnlocks: whatUnlocksMatch?.[1]?.trim(),
    };
  }
};
