"use client";
import React from "react";
import { HeroHeader } from "@/components/hero8-header";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Link from "next/link";
import useClarity from "@/hook/useClarity";
const links = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Service",
    href: "/terms",
  },
];

function layout({ children }: { children: React.ReactNode }) {
  useClarity();
  return (
    <>
      <HeroHeader />
      {children}
      <footer className="py-20 pb-0 @container mx-auto max-w-6xl px-6">
        <div className="my-8 flex md:justify-between gap-6 gap-y-4 justify-center flex-wrap text-base">
          <div className=" flex gap-4 flex-wrap items-center justify-center">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground/80 hover:underline-offset-4 hover:underline hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
          <Link
            href={"https://tanmay.xyz/"}
            className="text-muted-foreground/80 hover:underline-offset-4 hover:underline hover:text-primary block duration-150 md:justify-end"
          >
            made with ❤️ by babyo7_
          </Link>
        </div>
      </footer>
      <div className="@container mx-auto max-w-[1380px]">
        <TextHoverEffect text="m3labs" />
      </div>
    </>
  );
}

export default layout;
