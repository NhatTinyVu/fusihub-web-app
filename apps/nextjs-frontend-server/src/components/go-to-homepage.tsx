"use client";

import { useTranslations } from "@fusihub/i18n/client";
import { buttonVariants } from "@fusihub/ui";

import Link from "./link";

const GoToHomepage = () => {
  const t = useTranslations();

  return (
    <Link href="/" className={buttonVariants()}>
      {t("component.go-to-homepage")}
    </Link>
  );
};

export default GoToHomepage;
