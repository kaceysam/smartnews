import type { NewsArticle, SummarizedArticle, StyleMode } from "./types";
import { InferenceClient } from "@huggingface/inference";
import { getSystemPrompt, formatSummary } from "./styles";

export async function summarizeArticle(
  article: NewsArticle,
  style: StyleMode
): Promise<SummarizedArticle> {
  const apiKey = process.env.HF_TOKEN as string;

  if (!apiKey) {
    throw new Error("HF_TOKEN environment variable is not set");
  }

  // const systemPrompt = getSystemPrompt(style); // Not needed for summarization model
  const articleContent = article.content || article.title;

  // Prepare the input text for summarization
  const inputText = `${article.title}\n\n${articleContent.substring(0, 2000)}`;

  const client = new InferenceClient(apiKey);
  const primaryModelName = "facebook/bart-large-cnn";
  const fallbackModels = ["google/pegasus-xsum"];

  try {
    let summaryText = "";
    let modelUsed = "";

    // Try primary model
    try {
      console.log(`Trying primary model: ${primaryModelName}`);
      const output = await client.summarization({
        model: primaryModelName,
        inputs: inputText,
        parameters: {
          max_length: 150,
          min_length: 40,
        },
      });
      summaryText = output.summary_text;
      modelUsed = primaryModelName;
    } catch (primaryError) {
      console.warn(`Primary model ${primaryModelName} failed:`, primaryError);
      // Try fallback models
      for (const fallbackModel of fallbackModels) {
        try {
          console.log(`Trying fallback model: ${fallbackModel}`);
          const output = await client.summarization({
            model: fallbackModel,
            inputs: inputText,
            parameters: {
              max_length: 150,
              min_length: 40,
            },
          });
          summaryText = output.summary_text;
          modelUsed = fallbackModel;
          break; // Exit loop if a fallback model works
        } catch (fallbackError) {
          console.warn(`Fallback model ${fallbackModel} failed:`, fallbackError);
        }
      }
    }

    if (!summaryText) {
      throw new Error("All summarization models failed to return a summary.");
    }

    // Try to format the summary, but use raw if formatting fails
    let formattedSummary;
    try {
      const systemPrompt = getSystemPrompt(style); // Get system prompt for formatting
      // For summarization models, we can use a simple chat completion with the system prompt
      // to reformat the raw summary into the desired structure.
      const reformatClient = new InferenceClient(apiKey);
      const reformatOutput = await reformatClient.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.2", // A good instruction-following model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Summarize the following article based on the provided guidelines:
Article: ${inputText}
Raw Summary: ${summaryText}`},
        ],
        max_new_tokens: 200,
        temperature: 0.7,
      });
      const reformattedText = reformatOutput.choices[0]?.message?.content || summaryText;

      formattedSummary = formatSummary(style, reformattedText);
    } catch (formatError) {
      console.warn("Error formatting summary, using raw summary:", formatError);
      // If formatting fails, create a simple summary
      formattedSummary = {
        headline: article.title,
        whyItMatters: summaryText.substring(0, 200) + "...", // Truncate raw summary
      };
    }

    return {
      title: article.title,
      source: article.source,
      url: article.url,
      summary: {
        headline: formattedSummary.headline || article.title,
        ...formattedSummary,
      },
      publishedAt: article.publishedAt,
    };
  } catch (error) {
    console.error("Error summarizing article:", error);
    
    // Return a fallback summary with error details
    const errorMessage = error instanceof Error 
      ? `Unable to generate summary: ${error.message}` 
      : "Unable to generate summary at this time.";
    
    return {
      title: article.title,
      source: article.source,
      url: article.url,
      summary: {
        headline: article.title,
        whyItMatters: errorMessage,
      },
      publishedAt: article.publishedAt,
    };
  }
}

export async function summarizeArticles(
  articles: NewsArticle[],
  style: StyleMode
): Promise<SummarizedArticle[]> {
  // Process articles in batches to avoid rate limits
  // Hugging Face free tier has stricter rate limits, so smaller batches
  const batchSize = 3;
  const summarizedArticles: SummarizedArticle[] = [];

  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    const summaries = await Promise.all(
      batch.map((article) => summarizeArticle(article, style))
    );
    summarizedArticles.push(...summaries);
    
    // Add a small delay between batches to respect rate limits
    if (i + batchSize < articles.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return summarizedArticles;
}
