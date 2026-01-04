"use client";

import dynamic from "next/dynamic";

// Dynamically import the demo component with SSR disabled to prevent hydration mismatches
// WebGPU is only available in the browser
const CrtDemo = dynamic(() => import("./crt-demo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-lg">
      <span className="text-zinc-400 animate-pulse">Loading demo...</span>
    </div>
  ),
});

export default function CrtDemoWrapper() {
  return <CrtDemo />;
}
