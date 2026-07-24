"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  Comparison,
  ComparisonItem,
  ComparisonHandle,
} from "@/components/ui/shadcn-io/comparison";

export default function CrtSamplingComparisonInner() {
  return (
    <div className="my-8 not-prose">
      <div className="w-full rounded-lg overflow-hidden border">
        <Comparison className="aspect-video">
          <ComparisonItem position="left">
            <Image
              src="/projects/crt-subpixel/test-image.jpg"
              alt="Original test image"
              fill
              className="object-cover"
              unoptimized
            />
          </ComparisonItem>
          <ComparisonItem position="right">
            <Image
              src="/projects/crt-subpixel/test-image-subsampled.png"
              alt="Subsampled test image showing pixelation effect"
              fill
              className="object-cover"
              unoptimized
            />
          </ComparisonItem>
          <ComparisonHandle />
        </Comparison>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Example: Pixelation effect at different sampling rates{" "}
        <a
          href="https://fr.pinterest.com/pin/3166662233351865/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline inline-flex items-center gap-1"
        >
          Source <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </div>
  );
}
