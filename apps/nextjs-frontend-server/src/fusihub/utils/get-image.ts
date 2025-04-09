const defaultOgImageUrl = "/images/og.jpg";

type Image = {
  url: string;
  type: "image/png" | "image/jpeg";
};

const getExtension = (url: string): string => {
  if (!url.includes(".") || url.endsWith(".")) return "";
  return url.slice(url.lastIndexOf(".") + 1);
};

export const getImageFromUrl = (
  imageUrl?: string,
  defaultImageUrl?: string
): Image => {
  const url = imageUrl ?? defaultImageUrl ?? defaultOgImageUrl;
  const extension = getExtension(url);
  const type = extension === "png" ? "image/png" : "image/jpeg";
  return { url, type };
};
