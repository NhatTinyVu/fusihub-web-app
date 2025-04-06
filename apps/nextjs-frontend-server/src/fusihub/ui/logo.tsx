import { cn } from "@fusihub/utils";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type ImageProps = Omit<
  React.ComponentProps<typeof NextImage> & {
    imageClassName?: string;
    lazy?: boolean;
    src?: string;
  },
  "src" | "alt"
>;

const useLogoSrc = () => {
  const [src, setSrc] = useState<string>("/favicon/favicon-96x96.png");
  const { theme } = useTheme();

  useEffect(() => {
    const isLight = theme === "light" || theme === undefined;
    setSrc(
      isLight ? "/favicon/favicon-black.png" : "/favicon/favicon-96x96.png"
    );
  }, [theme]);

  return src;
};

const Logo = (props: ImageProps) => {
  const { className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  const logoSrc = useLogoSrc();

  return (
    <NextImage
      className={cn(
        isLoading && "scale-[1.02] blur-xl grayscale",
        imageClassName
      )}
      src={logoSrc}
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
