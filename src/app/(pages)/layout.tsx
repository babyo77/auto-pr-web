import React from "react";
import { HeroHeader } from "@/components/hero8-header";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Link from "next/link";

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
  return (
    <>
      <HeroHeader />
      {children}
      <footer className="py-20 pb-0">
        <div className="my-8 flex md:justify-between gap-6 gap-y-4 justify-center  flex-wrap px-7 md:px-48 text-base">
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
            href={"/https://tanmay.xyz/"}
            className="text-muted-foreground/80 hover:underline-offset-4 hover:underline hover:text-primary block duration-150 md:justify-end"
          >
            made with ❤️ by babyo7_
          </Link>
        </div>
        <div className="flex justify-center items-center text-sm md:px-10">
          <TextHoverEffect text="m3labs" />
        </div>
      </footer>
    </>
  );
}

export default layout;
