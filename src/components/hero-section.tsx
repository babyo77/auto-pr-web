"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChromeIcon, PlayCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function HeroSection() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <main className="overflow-hidden">
      <section>
        <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44 max-md:pt-32">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-semibold md:text-6xl lg:mt-16 xl:text-7xl">
                Write PRs in Seconds
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg md:max-w-[500px]">
                Generate complete, professional pull requests in seconds. Save
                hours every week with our Chrome extension.
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
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="sm:max-w-7xl p-0 border-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <video
              poster="/og-image.png"
              className="absolute inset-0 h-full w-full"
              src="https://us-east-1.tixte.net/uploads/tanmay111-files.tixte.co/PR_AI_Video.mp4"
              controls
              preload="auto"
              autoPlay
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
