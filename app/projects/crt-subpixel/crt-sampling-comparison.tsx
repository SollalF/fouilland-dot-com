"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-load motion-based comparison slider (bundle-dynamic-imports).
 */
const CrtSamplingComparisonInner = dynamic(
  () => import("./crt-sampling-comparison-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 not-prose">
        <div className="w-full aspect-video animate-pulse rounded-lg border bg-muted" />
      </div>
    ),
  },
);

export default function CrtSamplingComparison() {
  return <CrtSamplingComparisonInner />;
}
