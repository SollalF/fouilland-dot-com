import { getPost } from "@/data/blog";
import { notFound } from "next/navigation";
import { DirectionalTransition } from "@/components/directional-transition";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";
import { Metadata } from "next";

const BLUR_FADE_DELAY = 0.04;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <DirectionalTransition>
      <main className="flex flex-col min-h-[100dvh] space-y-10 bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <article>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
              {post.metadata.title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </BlurFade>

          {post.metadata.image && (
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  fill
                  className="object-cover"
                />
              </div>
            </BlurFade>
          )}

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.source }}
            />
          </BlurFade>
        </article>
      </main>
    </DirectionalTransition>
  );
}