import type { BlogPost } from "content-collections";

import { createContext, use } from "react";

type BlogPostContext = BlogPost;

const Context = createContext<BlogPostContext | undefined>(undefined);
Context.displayName = "BlogPostContext";

export const useBlogPostContext = () => {
  const context = use(Context);

  if (!context) {
    throw new Error("usePostContext must be used within a BlogPostProvider");
  }

  return context;
};

export const BlogPostProvider = Context.Provider;
