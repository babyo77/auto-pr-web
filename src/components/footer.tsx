"use client";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Chrome, Github } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";

const links = [
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Support",
    href: "",
  },
  {
    title: "Github",
    href: "https://github.com/babyo77/auto-pr-web",
  },
];

export default function FooterSection() {
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
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <Logo />
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
              onClick={link.title === "Support" ? openSupportModal : undefined}
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="https://x.com/tanmay7_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
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
          <Link
            href="https://github.com/babyo77/auto-pr-web"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-primary block"
          >
            <Github className="size-6" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chrome"
            className="text-muted-foreground hover:text-primary block"
          >
            <Chrome className="size-6" />
          </Link>
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {new Date().getFullYear()} Tanmay, All rights reserved
        </span>

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
                  Full name
                </Label>
                <Input
                  defaultValue={user?.displayName || ""}
                  id="name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-xs font-semibold">
                  Work Email
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
      </div>
    </footer>
  );
}
