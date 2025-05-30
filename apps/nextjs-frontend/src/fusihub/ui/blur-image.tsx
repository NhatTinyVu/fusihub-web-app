import { cn } from "@fusihub/utils";
import NextImage from "next/image";
import { useState } from "react";

type ImageProps = {
  imageClassName?: string;
  lazy?: boolean;
} & React.ComponentProps<typeof NextImage>;

const BlurImage = (props: ImageProps) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn("overflow-hidden", isLoading && "animate-pulse", className)}
    >
      <NextImage
        className={cn(
          isLoading && "scale-[1.02] blur-xl grayscale",
          imageClassName
        )}
        style={{
          transition: "filter 700ms ease, scale 150ms ease",
        }}
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        priority={!lazy}
        quality={100}
        onLoad={() => setIsLoading(false)}
        {...rest}
      />
    </div>
  );
};

export { BlurImage };
