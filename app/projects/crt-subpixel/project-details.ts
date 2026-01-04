import { Monitor } from "lucide-react";

export const projectDetails = {
  title: "CRT Subpixel",
  projectSlug: "crt-subpixel",
  description:
    "A WebGPU-based library for expanding images into CRT-style subpixel patterns.",
  longDescription:
    "This library transforms images and camera feeds into authentic CRT-style visuals using WebGPU shaders. Each pixel is expanded into a 3x3 block with vertical RGB stripes, mimicking the phosphor layout of classic cathode ray tube displays. Features include adjustable pixel density, interlaced rendering, and orientation controls.",
  imageUrl: "/projects/crt-subpixel.png",
  tags: ["WebGPU", "Shader", "Image Processing", "TypeScript", "CRT Effect"],
  githubUrl: "https://github.com/SollalF/crt-subpixel",
  icon: Monitor,
};
