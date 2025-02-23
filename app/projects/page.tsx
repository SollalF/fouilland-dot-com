import path from 'path';
import fs from 'fs/promises';

import { title } from '@/components/primitives';

interface ProjectMetadata {
  title: string;
  description: string;
  image: string;
}

export default async function ProjectsPage() {
  const projectsDirectory = path.join(process.cwd(), 'app/projects');
  const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });

  const projects = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
      .map(async (entry) => {
        try {
          const projectModule = await import(`./${entry.name}/page`);
          const metadata = projectModule.metadata as ProjectMetadata;

          return {
            slug: entry.name,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
          };
        } catch (error) {
          return {
            slug: entry.name,
            title: entry.name,
            description: `An error occurred while loading this project. ${error}`,
            image: '/projects/thumbnail.png',
          };
        }
      }),
  );

  return (
    <div className="w-full">
      <h1 className={title()}>Projects</h1>
      <div className="h-128 w-128 bg-white" />
    </div>
  );
}
