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
          const projectModule = await import(`./${entry.name}/metadata`);
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
      <div className="mt-4 grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            className="relative aspect-video h-48 w-full rounded-xl border border-gray-200 bg-[url(/projects/boids-battleground/thumbnail.png)] bg-cover hover:border-gray-300"
            href={`/projects/${project.slug}`}
          >
            <div className="absolute inset-0 rounded-xl">
              <Image isZoomed alt={project.title} className="rounded-xl" height={190} src={project.image} />
              <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
              <div className="text-lg font-bold text-white">{project.title}</div>
              <div className="text-sm text-gray-200">{project.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
