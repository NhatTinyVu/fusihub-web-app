"use client";

import {
  SiRust,
  SiGo,
  SiAstro,
  SiCloudflare,
  SiAmazon,
  SiCloudflarepages,
  SiGit,
  SiMarkdown,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiDocker,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { useTranslations } from "@fusihub/i18n/client";
import { Marquee } from "@fusihub/ui";
import { ZapIcon } from "lucide-react";

const StacksCard = () => {
  const t = useTranslations();

  return (
    <div className="shadow-feature-card flex h-60 flex-col gap-2 overflow-hidden rounded-xl p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <ZapIcon className="size-[18px]" />
        <h2 className="text-sm">{t("homepage.about-me.stacks")}</h2>
      </div>
      <Marquee gap="20px" className="py-4" fade pauseOnHover>
        <SiRust className="size-10" />
        <SiTypescript className="size-10" />
        <SiNextdotjs className="size-10" />
        <SiReact className="size-10" />
        <SiAstro className="size-10" />
        <SiPython className="size-10" />
        <SiGo className="size-10" />
        <SiPostgresql className="size-10" />
      </Marquee>
      <Marquee gap="20px" className="py-4" reverse fade pauseOnHover>
        <SiCloudflare className="size-10" />
        <SiCloudflarepages className="size-10" />
        <SiGit className="size-10" />
        <SiMarkdown className="size-10" />
        <SiAmazon className="size-10" />
        <SiDocker className="size-10" />
      </Marquee>
    </div>
  );
};

export default StacksCard;
