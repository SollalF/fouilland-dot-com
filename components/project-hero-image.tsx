import { ViewTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectHeroImageProps = {
  projectSlug: string;
  imageUrl: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Fill a relative parent; defaults to true for detail heroes. */
  fill?: boolean;
  width?: number;
  height?: number;
  unoptimized?: boolean;
};

/**
 * Shared-element hero image for project list ↔ detail morphs.
 */
export function ProjectHeroImage({
  projectSlug,
  imageUrl,
  alt,
  className,
  imageClassName,
  fill = true,
  width,
  height,
  unoptimized,
}: ProjectHeroImageProps) {
  return (
    <ViewTransition
      name={`project-image-${projectSlug}`}
      share="morph"
      default="none"
    >
      <div className={cn("relative overflow-hidden", className)}>
        {fill ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className={cn("object-cover", imageClassName)}
            unoptimized={unoptimized}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            className={cn("object-cover", imageClassName)}
            unoptimized={unoptimized}
          />
        )}
      </div>
    </ViewTransition>
  );
}
