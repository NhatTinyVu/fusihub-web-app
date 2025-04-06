"use client";

import { useTranslations } from "@fusihub/i18n/client";
import { linkVariants } from "@fusihub/ui";
import { StarIcon } from "lucide-react";

import { FOOTER_LINKS } from "@/config/links";

import Link from "../link";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-background/30 shadow-xs relative mx-auto mb-6 flex w-full max-w-5xl flex-col rounded-2xl p-8 saturate-100 backdrop-blur-[10px]">
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3">
        {FOOTER_LINKS.map((list) => (
          <div
            key={list.id}
            className="mb-10 flex flex-col items-start gap-4 pr-4"
          >
            {list.links.map((link) => {
              const { href, key } = link;

              return (
                <Link
                  key={href}
                  href={href}
                  className={linkVariants({ variant: "muted" })}
                >
                  {t(`layout.${key}`)}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-20 flex items-center justify-between text-sm">
        <div>&copy; {new Date().getFullYear()} Nhat Tiny Vu</div>
        <Link
          href="https://github.com/NhatTinyVu/fusihub-web-app"
          className="flex items-center justify-center overflow-hidden rounded-md border"
        />
      </div>
    </footer>
  );
};

export default Footer;
