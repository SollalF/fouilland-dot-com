import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { projectDetails } from "./project-details";
import CrtDemoWrapper from "./crt-demo-wrapper";
import fs from "fs";
import path from "path";
import { Monitor, ImageIcon, Video, ExternalLink } from "lucide-react";
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
import {
  Comparison,
  ComparisonItem,
  ComparisonHandle,
} from "@/components/ui/shadcn-io/comparison";

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
        <div className="w-full">
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
          {imageExists && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              Pixel art by{" "}
              <a
                href="https://www.reddit.com/user/vSv_Entertainment/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                vSv_Entertainment <ExternalLink className="w-3 h-3" />
              </a>
            </p>
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

      {/* Article Content */}
      <article className="prose dark:prose-invert prose-zinc max-w-none w-full py-12">
        {/* Introduction */}
        <section>
          <h2>The Inspiration</h2>
          <p>
            I found this artist on Reddit,{" "}
            <a
              href="https://www.reddit.com/user/Alex_DiP/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex_DiP
            </a>
            , who manually paints subpixels which gives a very cool effect. From
            afar, the image looks like it is in color, but from close by, you
            can see that the painting is actually made only of red, green, blue
            (and black).
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <VideoPlayer className="overflow-hidden rounded-lg border border-zinc-700 w-full max-w-4xl">
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
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                View on Reddit <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <p>
            I&apos;ve always liked learning about{" "}
            <a
              href="https://www.youtube.com/watch?v=KuXjwB4LzSA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              image processing at a fairly low level
              <ExternalLink className="w-3 h-3" />
            </a>
            , so I set out to create my own image processing pipeline.
          </p>
        </section>

        {/* The Science of Color Perception */}
        <section>
          <h2>Why This Visual Style Works</h2>
          <p>
            The reason for the existence of this visual style in the first place
            is fairly interesting. Our eyes can only detect 3 colors—red, green,
            and blue—due to our cone receptors in our eyeballs.
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <div className="w-full relative rounded-lg overflow-hidden border border-zinc-700">
              <Image
                src="/projects/crt-subpixel/human-eye-color-sensitivity.jpg"
                alt="Human eye cone receptors diagram"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Image: Human eye cone receptors diagram{" "}
              <a
                href="https://chromatone.center/theory/color/perception/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <p>
            For all the values in between, if the eye cannot perceive them as
            discrete (for example, if there are a lot of very red and green dots
            next to each other), then the brain fills in the gap and
            interpolates the values of the two colors to guess the one in the
            middle.
          </p>
          <p>
            This allows us to do a very cool trick when showing images on
            screen: instead of worrying about having LEDs for all the
            frequencies of visible light, we can just have red, green, and{" "}
            <a
              href="https://www.youtube.com/watch?v=AF8d72mA41M"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              blue lights
              <ExternalLink className="w-3 h-3" />
            </a>
            . If they are far enough apart or small enough, we can trick our
            brain into seeing colors that are not there.
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <div className="w-full relative rounded-lg overflow-hidden border border-zinc-700">
              <Image
                src="/projects/crt-subpixel/rgb-color-illusion.png"
                alt="RGB color illusion demonstrating how the brain interpolates colors"
                width={900}
                height={800}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Image: RGB color illusion{" "}
              <a
                href="https://www.psy.ritsumei.ac.jp/akitaoka/color19e.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </section>

        {/* CRT Display Technology */}
        <section>
          <h2>CRT Displays and Their Artifacts</h2>
          <p>
            For the very first commercially available consumer displays, this
            meant that each &quot;pixel&quot; had discrete subpixels that were
            red, green, and blue. At low resolutions, this is what gives the
            distinct look of old CRT (cathode ray tube) displays that we
            associate with retro games, old-timey videos, and that we can see in
            the work of Alex_DiP.
          </p>
          <p>
            Of course, there are a lot of other factors that contribute to this
            effect:
          </p>
          <ul>
            <li>Low resolution (typically 480 pixels high)</li>
            <li>Interlaced/progressive rendering</li>
            <li>Bloom</li>
            <li>And more...</li>
          </ul>
          <p>
            I&apos;ll be going into a bit more detail on each of the artifacts
            that I implemented in the shader, but you can check{" "}
            <a
              href="https://www.youtube.com/watch?v=2sxKJeYSBmI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              this video
              <ExternalLink className="w-3 h-3" />
            </a>{" "}
            for a more in-depth explanation of these limitations/artifacts and
            where/why they exist:
          </p>
        </section>

        {/* Why Retro Games Need CRT */}
        <section>
          <h2>Why Retro Games Look Better on CRT</h2>
          <p>
            For a lot of older games, enthusiasts will rely on shaders or actual
            CRT displays, as the games were intended to be played on such
            displays and were designed using tricks that made use of those
            &quot;limitations.&quot; As a result, many{" "}
            <a
              href="https://www.youtube.com/watch?v=28u6RoYiCWI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              older games look better on these older displays
              <ExternalLink className="w-3 h-3" />
            </a>
            .
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <div className="w-full relative rounded-lg overflow-hidden border border-zinc-700">
              <Image
                src="/projects/crt-subpixel/crt-lcd-comparison.png"
                alt="CRT vs LCD comparison showing how games looked on CRT displays"
                width={806}
                height={473}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Image: CRT vs LCD comparison{" "}
              <a
                href="https://www.reddit.com/r/gaming/comments/q3vw1q/left_side_is_what_it_looked_like_on_a_crt_tv_no/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </section>

        {/* Implementation Details */}
        <section>
          <h2>Implementation</h2>
          <p>
            My very first goal was to achieve the separation of RGB
            &quot;color&quot; pixels into their separate components/subpixels.
          </p>

          <h3>Splitting the Pixels: The Naive Approach</h3>
          <p>
            My first instinct was to do what I had learned in my college class
            on multimedia processing: simply iterate over the values, get the R,
            G, and B components, and push those values to a new image that would
            contain separate pixels for each of the original pixels.
          </p>
          <p>
            I set on having the output be 3 times the input. This way I could
            keep the aspect ratio of the input and have equal proportions of
            each of the colors. A simple pixel would be split into a 3×3 grid
            with each of the columns representing the red, green, and blue
            channels.
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <div className="w-full relative rounded-lg overflow-hidden border border-zinc-700">
              <Image
                src="/projects/crt-subpixel/rgb-pixel-decomposition.png"
                alt="Illustration showing pixel to 3×3 subpixel grid transformation"
                width={2752}
                height={1536}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Illustration: Pixel to 3×3 subpixel grid transformation (generated
              with nano banana pro)
            </p>
          </div>

          <p>
            This is fairly trivial to do since we store color in RGB values
            already, so it was a matter of accessing the raw data of a pixel and
            adding a bunch of zeros.
          </p>

          <p>
            The main issue with this approach is that it is slow—everything is
            processed through the browser and thus the CPU. This is not
            fundamentally a problem for images, but for video it would be, and I
            wanted to do things &quot;properly.&quot;
          </p>

          <h3>Smarter: Shaders</h3>
          <p>
            I had some experience coding games in Unity, so I knew a bit about
            shaders—mostly in concept, as I had not implemented any on my own.
            Fundamentally, shaders are image processing programs that take
            advantage of the GPU to render games faster.
          </p>
          <p>
            Instead of processing the image pixel by pixel, you
            &quot;batch&quot; the processing. For example, you process pixels 8
            by 8 and send the calculation to 8 different processing units in
            order to parallelize the processing.
          </p>
          <p>
            This is great but involves dealing with a lot of new issues: memory
            access is not the same, so we need to transfer data manually between
            CPU memory and GPU memory. Browser support for GPU workloads is
            disparate and complex.
          </p>
          <p>
            The technologies you can use for this task vary a lot (Vulkan,
            Metal, WebGL) depending on the browser.
          </p>

          <div className="my-8 not-prose">
            <Script
              src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"
              strategy="lazyOnload"
            />
            <div className="w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900/50">
              <p
                className="ciu_embed m-0 p-0"
                data-feature="webgpu"
                data-periods="future_1,current,past_1,past_2"
                data-accessible-colours="false"
              >
                <picture className="block m-0 p-0">
                  <source
                    type="image/webp"
                    srcSet="https://caniuse.bitsofco.de/image/webgpu.webp"
                  />
                  <source
                    type="image/png"
                    srcSet="https://caniuse.bitsofco.de/image/webgpu.png"
                  />
                  <img
                    src="https://caniuse.bitsofco.de/image/webgpu.jpg"
                    alt="Data on support for the webgpu feature across the major browsers from caniuse.com"
                    className="block w-full h-auto m-0 p-0"
                  />
                </picture>
              </p>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Chart: WebGPU browser compatibility{" "}
              <a
                href="https://caniuse.com/webgpu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                View on caniuse.com <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <p>
            You can learn more about graphics APIs{" "}
            <a
              href="https://www.youtube.com/watch?v=oIur9NATg-I"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              here
              <ExternalLink className="w-3 h-3" />
            </a>
            .
          </p>

          <p>
            The thing is, I really don&apos;t want to learn 3 different
            technologies and wrestle with decade-old languages/libraries in
            order to ensure compatibility with every browser/OS. But as I am
            lucky to live in a society where people much smarter than me spend
            good time and money building tools so that I don&apos;t have to
            worry about all this, the recent{" "}
            <a
              href="https://webgpufundamentals.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WebGPU project
            </a>{" "}
            comes to the rescue.
          </p>
          <p>
            WebGPU is a unified package that sits on top of all the
            platform-specific implementations and aims to be the future solution
            for browser-based graphics and GPU compute. One caveat: it is not
            compatible with everything yet and is still very much unstable (
            <a
              href="https://caniuse.com/webgpu"
              target="_blank"
              rel="noopener noreferrer"
            >
              check compatibility
            </a>
            ).
          </p>
          <p>
            Now that&apos;s sad and all, but I&apos;m just here to learn some
            new stuff and I don&apos;t mind a little bit of instability. Also,
            the WebGPU project has some pretty good backers, so I&apos;m not too
            concerned.
          </p>

          <h3>TypeGPU</h3>
          <p>
            Another thing I found is{" "}
            <a
              href="https://docs.swmansion.com/TypeGPU/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeGPU
            </a>
            , a typed implementation of all that good WebGPU stuff. I like typed
            stuff since it reduces the learning curve in my opinion, but I think
            the library is too young to be used efficiently for big projects
            yet. I&apos;ll go into a bit more detail in the{" "}
            <a href="#camera-support">Camera Support section</a>.
          </p>

          <h3>Lower Resolution (Sampling)</h3>
          <p>
            CRT works by rendering pixels from left to right, top to bottom, one
            pixel at a time.
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <div className="w-full relative rounded-lg overflow-hidden border border-zinc-700">
              <Image
                src="/projects/crt-subpixel/crt-slowmo.gif"
                alt="Slow-motion CRT rendering showing pixels being drawn from left to right, top to bottom"
                width={728}
                height={408}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              GIF: Slow-motion CRT rendering{" "}
              <a
                href="https://imgur.com/gallery/how-tv-works-slow-motion-5sYsb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <p>
            The resolution is the number of lines rendered. Most CRTs that
            people were familiar with are 480 lines tall. This means that most
            displays we are used to today are much higher resolution—1920×1080
            (Full HD).
          </p>
          <p>
            Processing the image through the shader leads to us having truly
            massive images on the output, and the look of the CRT display is not
            very visible as pixel art was designed for those 480p displays.
          </p>
          <p>
            In order to achieve this &quot;compression,&quot; I added a
            &quot;sampling&quot; setting. The sampling setting
            &quot;reduces&quot; the amount of pixels by the square of that
            multiplier. For example, a sampling rate of 3 means that each 3×3
            block of pixels will be reduced to 1 pixel before being passed to
            the RGB part of the pipeline.
          </p>
          <p>
            This is achieved by using the value of the &quot;center&quot; pixel
            as the value of that entire block. There might be other ways to do
            it (averaging the color over the entire block, picking the
            darkest/lightest color for better conservation of edges), but this
            solution is the least costly in terms of computation since I only
            need to access the value of one pixel from memory.
          </p>

          <div className="my-8 not-prose">
            <div className="w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900/50">
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
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <p>
            Note that because of the compression, especially at low resolutions,
            high-resolution images tend to become less legible, thus
            highlighting the role of pixel art artists that make design choices
            in order to maintain legibility at the cost of realism.
          </p>

          <div className="my-8 not-prose">
            <div className="w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <div className="flex flex-col">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-600">
                    <Image
                      src="/projects/crt-subpixel/megaman-pixel-art.jpg"
                      alt="Original intentional pixel art of Mega Man"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Original pixel art
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-600">
                    <Image
                      src="/projects/crt-subpixel/megaman-illustration.png"
                      alt="High resolution AI-generated illustration of Mega Man"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    High-res illustration
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-600">
                    <Image
                      src="/projects/crt-subpixel/megaman-downsampled.png"
                      alt="Downsampled version of the illustration showing loss of detail"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Downsampled illustration
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Comparison: Intentional pixel art vs. downsampled realistic image.
              This demonstrates how downsampling cannot replace pixel artists
              and what detail and legibility is lost in the process.
            </p>
          </div>

          <h3>Interlacing</h3>
          <p>
            Another well-known artifact from CRT displays is scan lines. Those
            are often associated with the previously mentioned left-to-right
            rendering of pixels, but in actuality, the visible scan lines are
            due to interlacing.
          </p>
          <p>
            Because of data transfer speed limitations, images were broadcast in
            halves—the even rows and the odd rows alternating.
          </p>

          <div className="my-8 not-prose flex flex-col items-center">
            <div className="w-full relative rounded-lg overflow-hidden border border-zinc-700">
              <Image
                src="/projects/crt-subpixel/intarlicing-vs-progressive.gif"
                alt="Illustration showing interlaced vs. progressive rendering"
                width={400}
                height={130}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Illustration: Interlaced vs. progressive rendering{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Interlace.gif"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <p>
            At high enough speeds, the frames blend together because of image
            persistence and we get a full image, but it also helps smooth some
            animations at the cost of a flicker.
          </p>
          <p>
            Now this &quot;works,&quot; but I find the effect frankly
            distracting—maybe something due to the refresh rate of my display
            being too low? (CRTs were 60fps.)
          </p>
          <p>
            <strong>Note:</strong> Without interlacing, the format is called
            progressive, when all rows are rendered on each frame. This is where
            the &quot;p&quot; (progressive) and &quot;i&quot; (interlaced) comes
            from in YouTube video resolutions (e.g., 1080p, 1080i)—not from
            &quot;pixels&quot; as most people might think!
          </p>

          <h3 id="camera-support">Camera Support</h3>
          <p>
            Now that the shader works, I had to make it compatible with cameras.
            This sadly meant that I kind of had to reduce a lot of the
            advantages of TypeGPU.
          </p>
          <p>
            TypeGPU does not expose all the functions that WebGPU does. Namely,{" "}
            <code>copyExternalImageToTexture()</code> does not exist in TypeGPU.
            The function I had been using,{" "}
            <code>texture.write(imageBitmap)</code>, worked fine for static
            images but could not work with the camera pipeline. I had to switch
            to using WebGPU&apos;s{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/GPUQueue/copyExternalImageToTexture"
              target="_blank"
              rel="noopener noreferrer"
            >
              GPUQueue.copyExternalImageToTexture()
            </a>{" "}
            directly, which required accessing the underlying WebGPU objects.
          </p>
          <p>
            This is at the moment the biggest limitation to TypeGPU I could see.
            You can get around it by accessing the underlying WebGPU objects,
            but that kind of defeats the point of TypeGPU. This is the main
            reason why I think one should be very careful in using TypeGPU for
            large-scale products.
          </p>
          <p>
            That being said, it does not lead to anything being impossible, and
            I simply rewrote most of the pipeline with inspiration from{" "}
            <a
              href="https://docs.swmansion.com/TypeGPU/examples/#example=image-processing--ascii-filter"
              target="_blank"
              rel="noopener noreferrer"
            >
              this example project
            </a>{" "}
            (check out the other demos—they are very cool!).
          </p>

          <h3>Export to Image</h3>
          <p>
            Finally, I added a function to export the video or image to a PNG
            for download. This uses two different but similar pipelines for
            images and videos at the moment, because the data of the image is
            not retained after rendering.
          </p>
          <p>
            I need to reprocess the image before re-rendering, while I can just
            add a flag to the video rendering process to export a single frame.
          </p>

          <h3>Clean Code Architecture</h3>
          <p>
            Now this is a bit overkill as the library is quite small and could
            honestly be a single file, but I&apos;ve been wanting to practice
            better/cleaner coding standards. That&apos;s why I reformatted it
            following the{" "}
            <a
              href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clean Architecture structure
            </a>
            .
          </p>
        </section>

        {/* Usage Section */}
        <section>
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
        </section>

        {/* Conclusion */}
        <section>
          <h2>Conclusion</h2>
          <p>
            All in all, the project was very interesting and allowed me to dive
            deeper into GPU/CPU memory concepts, CRT technologies, clean
            architecture, graphical concepts, and familiarize myself with new
            libraries that will be the foundational stone of a lot of browser
            functionality.
          </p>
          <p>
            You can imagine browser-based local LLMs (
            <a
              href="https://github.com/0hq/WebGPT"
              target="_blank"
              rel="noopener noreferrer"
            >
              like WebGPT
            </a>
            ) and full games running in the browser with minimal installation
            requirements.
          </p>
        </section>

        {/* Future Improvements */}
        <section>
          <h2>Future Improvements</h2>
          <p>
            There are still a few aspects that I would like to improve in the
            future:
          </p>

          <h3>Bloom</h3>
          <p>
            Subpixel colors tend to bleed a bit into each other on CRT displays.
            This effectively functions as anti-aliasing and helps render smooth
            gradients when using dithering.
          </p>

          <h3>Video Processing</h3>
          <p>
            I would like to be able to upload and process videos and re-output
            them as videos.
          </p>

          <h3>Ghosting/Smudging</h3>
          <p>
            I&apos;m unsure by how much, but the phosphor that covers CRT
            screens retains luminosity for a few milliseconds (phosphor
            persistence) after being activated. This leads to a bit of smudging
            which I think could help with the flickering look of interlaced
            video.
          </p>

          <h3>Inter-Pixel Space</h3>
          <p>
            Due to manufacturing limitations, older CRTs had visible black space
            between pixels that were smaller than the pixels themselves.
            I&apos;m wondering if that might help make &quot;scan lines&quot;
            more visible or give a more authentic feel even to the progressive
            rendered images.
          </p>

          <h3>Other Filters</h3>
          <p>
            There are a couple of other effects that I think might improve the
            feel, despite not being CRT-specific artifacts but most commonly due
            to data transfer/camera limitations:
          </p>
          <ul>
            <li>Noise</li>
            <li>Chromatic aberration</li>
            <li>
              Lens distortion (technically to replicate the curved look of a CRT
              display)
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
