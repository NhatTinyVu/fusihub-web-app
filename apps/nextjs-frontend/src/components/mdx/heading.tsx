import { useTranslations } from "@fusihub/i18n/client";
import { cn } from "@fusihub/utils";
import { LinkIcon } from "lucide-react";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = Omit<React.ComponentProps<T>, "as"> & {
  as?: T;
};

const Heading = <T extends Types = "h1">(props: HeadingProps<T>) => {
  const { as, className, children, id, ...rest } = props;
  const Component = as ?? "h1";
  const t = useTranslations();

  return (
    <Component className={cn("scroll-m-32", className)} id={id} {...rest}>
      <a href={`#${id}`} className="group">
        {children}
        <LinkIcon
          aria-label={t("mdx.link-to-section")}
          className="text-muted-foreground ml-2 inline size-4 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </a>
    </Component>
  );
};

export default Heading;
