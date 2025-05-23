import { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  projectSlug: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  icon: LucideIcon;
}
