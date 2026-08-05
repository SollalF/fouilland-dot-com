import { Newspaper } from "lucide-react";

export const projectDetails = {
  title: "Daily News Scraper",
  projectSlug: "ai-newsletter",
  description:
    "A self-healing, database-backed news scraper that uses AI to automatically generate and repair web parsers. Built on Crawl4AI and Playwright for reliable SSR + SPA scraping.",
  longDescription:
    "The Daily News Scraper is an intelligent news aggregation system that automatically adapts to website changes. When given a URL, it looks up a declarative parser by URL regex, creates one with AI if missing, runs it against a Crawl4AI-rendered page (SSR + SPA), validates the output with news-aware checks, and repairs the parser when checks fail.\n\nKey features:\n• Self-healing parsers that automatically repair when websites change\n• Database-backed parser storage with PostgreSQL and Alembic migrations\n• Batch scraping with resilient error handling\n• AI-powered parser generation using GPT-4\n• Support for both SSR and SPA pages via Crawl4AI + Playwright\n• Declarative JSON parsers (selectors, wait rules, field maps) instead of executable code\n\nThe system is designed for daily news aggregation workflows, with a CLI interface that integrates seamlessly with agent-based automation for ranking, filtering, and delivering curated news digests.",
  imageUrl: "/projects/ai-newsletter.png",
  tags: ["Python", "AI", "Web Scraping", "PostgreSQL", "Crawl4AI", "Playwright", "GPT-4", "Automation"],
  githubUrl: "https://github.com/SollalF/daily-news",
  liveUrl: undefined,
  icon: Newspaper,
};
