import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { DirectionalTransition } from "@/components/directional-transition";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <DirectionalTransition>
      <main className="flex flex-col min-h-[100dvh] space-y-10 bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <section>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
              Writing
            </h1>
          </BlurFade>
          <div className="space-y-8">
            {posts.map((post, id) => (
              <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  {post.metadata.image && (
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {post.metadata.title}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {post.metadata.summary}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </BlurFade>
            ))}
          </div>
        </section>
      </main>
    </DirectionalTransition>
  );
}