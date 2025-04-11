"use client";

import type { BlogPost } from "content-collections";

import { useTranslations } from "@fusihub/i18n/client";

import BlogPostCards from "./blog-post-cards";

type ListBlogPostsProps = {
  blogPosts: BlogPost[];
};

const ListBlogPosts = (props: ListBlogPostsProps) => {
  const { blogPosts } = props;
  const t = useTranslations();

  return (
    <>
      {blogPosts.length === 0 ? (
        <div className="my-24 text-center text-xl">
          {t("component.list-blog-posts.no-posts-found")}
        </div>
      ) : null}
      <BlogPostCards blogPosts={blogPosts} />
    </>
  );
};

export default ListBlogPosts;
