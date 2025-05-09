import {
  SiRust,
  SiNextdotjs,
  SiPostgresql,
} from "@icons-pack/react-simple-icons";
import { useTranslations } from "@fusihub/i18n/client";
import { HeartIcon } from "lucide-react";

const FavoriteFrameworks = () => {
  const t = useTranslations();

  return (
    <div className="shadow-feature-card flex flex-col gap-6 rounded-xl p-6 lg:p-6">
      <div className="flex items-center gap-2">
        <HeartIcon className="size-[18px]" />
        <h2 className="text-sm">
          {t("homepage.about-me.favorite-frameworks")}
        </h2>
      </div>
      <div className="flex items-center justify-center gap-6">
        <SiRust size={80} className="text-zinc-800 dark:text-zinc-200" />
        <SiNextdotjs size={80} className="text-zinc-800 dark:text-zinc-200" />
        <SiPostgresql size={80} className="text-zinc-800 dark:text-zinc-200" />
      </div>
    </div>
  );
};

export default FavoriteFrameworks;
