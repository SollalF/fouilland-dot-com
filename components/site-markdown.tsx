import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type SiteMarkdownProps = {
  children: string;
  className?: string;
};

export function SiteMarkdown({ children, className }: SiteMarkdownProps) {
  return (
    <div className={cn("prose-site w-full", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
