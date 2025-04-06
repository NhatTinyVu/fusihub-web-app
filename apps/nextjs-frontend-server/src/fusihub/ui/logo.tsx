import { cn } from "@fusihub/utils";
import NextImage from "next/image";
import { useState } from "react";

type ImageProps = Omit<
  React.ComponentProps<typeof NextImage> & {
    imageClassName?: string;
    lazy?: boolean;
    src?: string;
  },
  "src" | "alt"
>;

const Logo = (props: ImageProps) => {
  const { className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NextImage
      className={cn(
        isLoading && "scale-[1.02] blur-xl grayscale",
        imageClassName
      )}
      src="/favicon/apple-touch-icon.png"
      alt="fusihub"
      loading={lazy ? "lazy" : undefined}
      priority={!lazy}
      quality={100}
      onLoad={() => setIsLoading(false)}
      {...rest}
    />
  );
};

export { Logo };
