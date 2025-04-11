import { cn } from "@fusihub/utils";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type ImageProps = Omit<
  React.ComponentProps<typeof NextImage> & {
    imageClassName?: string;
    lazy?: boolean;
    src?: string;
    theme?: "light" | "dark";
  },
  "src" | "alt"
>;

const useLogoSrc = (props?: { theme?: "light" | "dark" }) => {
  const [src, setSrc] = useState<string>("/favicon/favicon-96x96.png");
  const { theme } = useTheme();

  useEffect(() => {
    const isDark = props?.theme
      ? props?.theme === "dark"
      : theme === "dark" || !theme;
    setSrc(
      isDark ? "/favicon/favicon-96x96.png" : "/favicon/favicon-black.png"
    );
  }, [props?.theme, theme]);

  return src;
};

const Logo = (props: ImageProps) => {
  const { className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  const logoSrc = useLogoSrc({ theme: props?.theme });

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
