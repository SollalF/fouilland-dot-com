import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { projectDetails } from "./project-details";
import CrtDemoWrapper from "./crt-demo-wrapper";
import fs from "fs";
import path from "path";
import { Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: projectDetails.title,
  description: projectDetails.description,
};

export default function CrtSubpixelPage() {
  // Check if image exists
  const imagePath = path.join(process.cwd(), "public", projectDetails.imageUrl);
  const imageExists = fs.existsSync(imagePath);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl relative">
      <div className="flex flex-col items-center space-y-8 relative">
        <h1 className="text-4xl font-bold text-center">
          {projectDetails.title}
        </h1>

        {/* Image Section */}
        <div className="w-full relative h-[400px]">
          {imageExists ? (
            <Image
              src={projectDetails.imageUrl}
              alt={projectDetails.title}
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-24 h-24 text-emerald-500/50 mx-auto mb-4" />
                <p className="text-zinc-500 text-sm">
                  Project image coming soon
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 justify-center">
          {projectDetails.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description Section */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-center text-lg text-muted-foreground">
            {projectDetails.description}
          </p>
          <p className="whitespace-pre-line">
            {projectDetails.longDescription}
          </p>
        </div>

        {/* Links Section */}
        <div className="flex gap-4 justify-center">
          {projectDetails.githubUrl && (
            <a
              href={projectDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 inline-block"
            >
              View Source →
            </a>
          )}
        </div>
      </div>

      {/* CRT Demo Container */}
      <div className="w-full min-h-[700px] mt-12 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900/50 p-4">
        <CrtDemoWrapper />
      </div>

      {/* Usage Section */}
      <div className="prose dark:prose-invert max-w-none w-full py-8">
        <h2>Usage</h2>
        <p>Install the package from GitHub:</p>
        <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
          <code>pnpm add github:SollalF/crt-subpixel</code>
        </pre>
        <p>Then use it in your project:</p>
        <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
          <code>{`import { CrtSubpixelProcessor } from 'crt-subpixel';

const processor = new CrtSubpixelProcessor();
await processor.init();

// Process an image
const bitmap = await createImageBitmap(imageFile);
await processor.renderImage(canvas, bitmap);

// Or use camera mode
await processor.startCamera(canvas);`}</code>
        </pre>
      </div>
    </main>
  );
}
