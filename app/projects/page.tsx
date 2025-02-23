import path from 'path';
import fs from 'fs/promises';

import { Image } from '@heroui/image';
import { Link } from '@heroui/link';
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
            description: 'An error occurred while loading this project.',
            image: '/projects/thumbnail.png',
          };
        }
      }),
  );

  return (
    <div className="w-full">
      <h1 className={title()}>Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            className="block p-6 rounded-lg border border-default-200 hover:border-default-400 transition-colors"
            key={project.slug}
          >
            <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                alt={`${project.title} thumbnail`}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                src={project.image}
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-default-600">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
