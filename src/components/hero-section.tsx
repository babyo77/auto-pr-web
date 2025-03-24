"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChromeIcon, PlayCircle } from "lucide-react";

export default function HeroSection() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <main className="overflow-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44 max-md:pt-32">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  Write PRs in Seconds
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Generate complete, professional pull requests automatically.
                  Save 30 minutes per PR with our Chrome extension.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link href="#link">
                      <ChromeIcon />
                      <span className="text-nowrap">Add to Chrome</span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="link"
                    className="px-5 text-base"
                    onClick={() => setShowDemo(true)}
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span className="text-nowrap">Watch Demo</span>
                  </Button>
                </div>
              </div>
              <Image
                className="-z-10 order-first ml-auto h-56 w-full object-cover  sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-56 lg:order-last lg:h-max lg:w-2/3 lg:object-contain "
                src="https://i.pinimg.com/originals/c4/7b/9a/c47b9a94986b92ac592745ad3a1b8815.gif"
                alt="Abstract Object"
                height="4000"
                width="3000"
              />
            </div>
          </div>
        </section>
      </main>

      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-4xl px-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                onClick={() => setShowDemo(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-sm text-white hover:bg-black/90"
                aria-label="Close demo"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
