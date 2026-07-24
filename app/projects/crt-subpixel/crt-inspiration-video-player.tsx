"use client";

import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerMuteButton,
  VideoPlayerVolumeRange,
} from "@/components/ui/shadcn-io/video-player";
import { ExternalLink } from "lucide-react";

export default function CrtInspirationVideoPlayer() {
  return (
    <div className="my-8 not-prose flex flex-col items-center">
      <VideoPlayer className="overflow-hidden rounded-lg border w-full max-w-4xl">
        <VideoPlayerContent
          crossOrigin=""
          muted
          autoPlay
          preload="auto"
          slot="media"
          className="w-full h-auto max-h-[400px]"
          src="https://packaged-media.redd.it/5v34zzb3444g1/pb/m2-res_854p.mp4?m=DASHPlaylist.mpd&v=1&e=1767524400&s=4e102f003fd17ce4fe7127e46215ed167bb948d5"
        />
        <VideoPlayerControlBar>
          <VideoPlayerPlayButton />
          <VideoPlayerSeekBackwardButton />
          <VideoPlayerSeekForwardButton />
          <VideoPlayerTimeRange />
          <VideoPlayerTimeDisplay showDuration />
          <VideoPlayerMuteButton />
          <VideoPlayerVolumeRange />
        </VideoPlayerControlBar>
      </VideoPlayer>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Video: Alex_DiP subpixel painting demo{" "}
        <a
          href="https://www.reddit.com/user/Alex_DiP/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline inline-flex items-center gap-1"
        >
          View on Reddit <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </div>
  );
}
