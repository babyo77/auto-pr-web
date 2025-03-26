"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { DialogHeader, Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
const menuItems = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Github", href: "https://github.com/babyo77/auto-pr-web" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const openSupportModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLTextAreaElement)
      .value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SCI_URI}/support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zara-auth": (await user?.getIdToken()) || "",
      },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      toast.success("Message sent successfully");
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <header>
        <nav
          data-state={menuState && "active"}
          className="bg-background/50 fixed z-50 w-full border-b backdrop-blur-3xl"
        >
          <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <Logo />
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>

                <div className="hidden lg:block">
                  <ul className="flex gap-8 text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent ">
                <div className="lg:hidden">
                  <ul className="space-y-6 text-base">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setMenuState(false)}
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-1 sm:space-y-0 md:w-fit items-center">
                  <Link
                    href="https://x.com/tanmay7_"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X/Twitter"
                    className="text-muted-foreground hover:text-primary block"
                  >
                    <svg
                      className="size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                      ></path>
                    </svg>
                  </Link>
                  <Button
                    asChild
                    variant={"link"}
                    size="sm"
                    onClick={(e) => {
                      setMenuState(false);
                      openSupportModal(e);
                    }}
                    className=" max-md:text-base cursor-pointer max-md:h-10"
                  >
                    <span>Support</span>
                  </Button>
                  {!user ? (
                    <Button
                      asChild
                      size="sm"
                      className=" max-md:text-base max-md:h-10"
                    >
                      <Link href="/login">
                        <span>Get Started</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      onClick={() => {
                        setMenuState(false);
                      }}
                      className=" max-md:text-base max-md:h-10"
                    >
                      <Link href="/settings">
                        <span>Dashboard</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Support Modal with Shadcn UI */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="mb-0">
            <DialogTitle className="text-xl font-semibold">
              Contact Support
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeModal();
            }}
            className=" space-y-4 *:space-y-2"
          >
            <div>
              <Label htmlFor="name" className="text-xs font-semibold">
                Name
              </Label>
              <Input
                defaultValue={user?.displayName || ""}
                id="name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-semibold">
                Email
              </Label>
              <Input
                defaultValue={user?.email || ""}
                id="email"
                type="email"
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-xs font-semibold">
                Message
              </Label>
              <Textarea id="message" rows={3} required />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
