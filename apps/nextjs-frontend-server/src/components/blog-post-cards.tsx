"use client";

import type { BlogPost } from "content-collections";

import { BlurImage } from "@fusihub/ui";

import { useFormattedDate } from "@/hooks/use-formatted-date";

import Link from "./link";
import { getImageFromUrl } from "@/fusihub/utils";

type BlogPostCardsProps = {
  blogPosts: BlogPost[];
};

type BlogPostCardProps = BlogPost;

const BlogPostCards = (props: BlogPostCardsProps) => {
  const { blogPosts } = props;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blogPosts.map((blogPost) => (
        <BlogPostCard key={blogPost.slug} {...blogPost} />
      ))}
    </div>
  );
};

const BlogPostCard = (props: BlogPostCardProps) => {
  const { slug, title, summary, date, imageUrl } = props;
  const image = getImageFromUrl(imageUrl);
  const formattedDate = useFormattedDate(date);

  return (
    <Link
      href={`/blog/${slug}`}
      className="shadow-feature-card group rounded-xl px-2 py-4"
    >
      <BlurImage
        src={image.url}
        className="rounded-lg"
        width={1200}
        height={630}
        imageClassName="transition-transform group-hover:scale-105"
        alt={title}
      />
      <div className="flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500">
        {formattedDate}
      </div>
      <div className="flex flex-col px-2 py-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-2">{summary}</p>
      </div>
    </Link>
  );
};

export default BlogPostCards;
