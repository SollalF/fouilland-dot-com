"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-load media-chrome video player so it is not in the initial CRT page chunk
 * (bundle-dynamic-imports).
 */
const CrtInspirationVideoPlayer = dynamic(
  () => import("./crt-inspiration-video-player"),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 not-prose flex flex-col items-center">
        <div className="w-full aspect-video max-w-4xl animate-pulse rounded-lg border bg-muted" />
      </div>
    ),
  },
);

export default function CrtInspirationVideo() {
  return <CrtInspirationVideoPlayer />;
}
