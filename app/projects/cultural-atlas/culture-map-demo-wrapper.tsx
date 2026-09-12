"use client";

import dynamic from "next/dynamic";

const CultureMapDemo = dynamic(() => import("./culture-map-demo"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-lg">
      <span className="animate-pulse text-muted-foreground">
        Loading comparison tool…
      </span>
    </div>
  ),
});

export default function CultureMapDemoWrapper() {
  return <CultureMapDemo />;
}
