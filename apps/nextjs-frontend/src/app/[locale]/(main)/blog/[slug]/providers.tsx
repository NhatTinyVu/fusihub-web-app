"use client";

import type { BlogPost } from "content-collections";

import { BlogPostProvider } from "@/contexts/blogPost";

type ProvidersProps = {
  children: React.ReactNode;
  post: BlogPost;
};

const Providers = (props: ProvidersProps) => {
  const { children, post } = props;

  return <BlogPostProvider value={post}>{children}</BlogPostProvider>;
};

export default Providers;
