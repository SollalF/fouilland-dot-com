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

/** Omit icon (function) so RSC pages can pass project data (server-serialization). */
export type ProjectCardData = Omit<Project, "icon" | "longDescription">;

export function toProjectCardData(project: Project): ProjectCardData {
  const { icon: _icon, longDescription: _longDescription, ...cardData } =
    project;
  return cardData;
}
