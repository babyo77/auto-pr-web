"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X, Clock, MinusCircle, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Script from "next/script";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const { user, billing } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showProDialog, setShowProDialog] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const token = await user?.getIdToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCI_URI}/sci/upgrade`,
        {
          method: "POST",
          body: JSON.stringify({ isYearly }),
          headers: {
            "Content-Type": "application/json",
            "x-sci-auth": `${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: data.name,
        description: data.description,
        order_id: data.orderId,
        handler: async (response: any) => {
          const paymentData = {
            orderId: data.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            planId: data.planId,
            currency: data.currency,
            amount: data.amount,
            description: data.description,
          };
          const verifyResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SCI_URI}/sci/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-sci-auth": `${token}`,
              },
              body: JSON.stringify(paymentData),
            }
          );
          if (!verifyResponse.ok) throw new Error("Failed to verify payment");

          // Show the Pro animation when payment is successful
          setShowProDialog(true);
        },
        prefill: {
          name: user?.displayName,
          email: user?.email,
          phone: user?.phoneNumber,
        },
        theme: {
          color: "#000000",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!user) return;

    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get("p");
    if (payment) {
      const pricingElement = document.getElementById("pricing");
      if (pricingElement) {
        pricingElement.scrollIntoView({ behavior: "smooth" });
      }
      handlePayment();
    }
    urlParams.delete("payment");
    window.history.replaceState({}, "", window.location.pathname);
  }, [user, handlePayment]);

  // Function to handle closing the dialog and redirecting
  const handleProDialogClose = () => {
    setShowProDialog(false);
    window.location.href = "/settings";
  };

  return (
    <section id="pricing">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing
          </h2>
          <div className="max-w-xl text-center mx-auto md:max-w-[400px]">
            <p>
              Choose the plan that fits your PR workflow needs. From occasional
              use to daily development.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2 md:pt-5">
            <Label htmlFor="billing-toggle" className="font-medium">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className="font-medium">
              Yearly
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Save 25%
              </span>
            </Label>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-medium">Hobby</CardTitle>

              <span className="my-3 block text-2xl font-semibold">$0</span>

              <CardDescription className="text-sm">
                Perfect for occasional PRs
              </CardDescription>
              <Button asChild variant="default" className="mt-4 w-full">
                <Link href="/login">Try for Free</Link>
              </Button>
              <span className="text-[11px] text-center -mb-4 text-muted-foreground">
                No credit card required
              </span>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  { text: "3 Free PR Message Generations", available: true },
                  { text: "Auto-Fill PR Description", available: true },
                  { text: "One-Click Generation", available: true },
                  { text: "Readme Generation", status: "unavailable" },
                  { text: "Priority Support", status: "unavailable" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {item.available ? (
                      <Check className="size-3" />
                    ) : item.status === "coming" ? (
                      <Clock className="size-3 text-muted-foreground" />
                    ) : (
                      <X className="size-3 text-red-500" />
                    )}
                    <span
                      className={!item.available ? "text-muted-foreground" : ""}
                    >
                      {item.text}
                      {item.status === "coming" && " (Coming Soon)"}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="relative bg-black text-white">
            <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Most Popular
            </span>

            <CardHeader>
              <CardTitle className="font-medium text-white">
                Professional
              </CardTitle>

              <div className="my-3 block text-2xl font-semibold text-white">
                <div className="relative h-9 overflow-hidden">
                  <div
                    className={`absolute transform transition-all duration-300 ${
                      isYearly
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                    }`}
                  >
                    <span className="line-through text-base text-gray-400">
                      $2.99
                    </span>{" "}
                    <span>$1.99</span> / mo
                    <span className="text-sm text-gray-400">
                      {" "}
                      billed annually
                    </span>
                  </div>
                  <div
                    className={`absolute transform transition-all duration-300 ${
                      isYearly
                        ? "translate-y-full opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    <span>$2.99</span> / mo
                  </div>
                </div>
              </div>

              <CardDescription className="text-sm text-gray-400">
                For active developers
              </CardDescription>

              {!user ? (
                <Button
                  asChild
                  className="mt-4 w-full bg-white text-black hover:bg-gray-200"
                >
                  <Link href="/login">Get Started</Link>
                </Button>
              ) : billing?.subscriptionTier !== "PRO" ? (
                <Button
                  onClick={handlePayment}
                  className="mt-4 w-full cursor-pointer bg-white text-black hover:bg-gray-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Upgrade Now"}
                </Button>
              ) : (
                <Button
                  disabled
                  className="mt-4 w-full cursor-pointer bg-white text-black hover:bg-gray-200"
                >
                  Already on PRO
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  {
                    text: "Multiple PR Message Generations",
                    status: "available",
                  },
                  { text: "Auto-Fill PR Description", status: "available" },
                  { text: "One-Click Generation", status: "available" },
                  { text: "Readme Generation", status: "coming" },
                  { text: "Priority Support", status: "available" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {item.status === "available" ? (
                      <Check className="size-3" />
                    ) : item.status === "coming" ? (
                      <Sparkles className="size-3 text-amber-500" />
                    ) : (
                      <MinusCircle className="size-3 text-muted-foreground" />
                    )}
                    <span
                      className={
                        item.status !== "available"
                          ? "text-muted-foreground"
                          : ""
                      }
                    >
                      {item.text}
                      {item.status === "coming" && " (Coming Soon)"}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader>
              <CardTitle className="font-medium">Enterprise</CardTitle>

              <span className="my-3 block text-2xl font-semibold">Custom</span>

              <CardDescription className="text-sm">
                For teams and organizations
              </CardDescription>

              <Button asChild variant="default" className="mt-4 w-full">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cal.com/m3agency/auto-pr-demo"
                >
                  Talk to Us
                </Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm text-muted-foreground">
                {[
                  "Everything in Professional Plan",
                  "Unlimited Team Members",
                  "Direct GitHub Integration",
                  "Diagram Generation",
                  "Auto Analysis",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add the ProAnimation component with updated onClick handler */}
      <ProAnimation
        showProDialog={showProDialog}
        setShowProDialog={handleProDialogClose}
      />
    </section>
  );
}

const ProAnimation = ({
  showProDialog,
  setShowProDialog,
}: {
  showProDialog: boolean;
  setShowProDialog: (show: boolean) => void;
}) => {
  return (
    <AnimatePresence mode="wait">
      {showProDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ exit: { duration: 0.5 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-yellow-50 to-white"
          onClick={() => setShowProDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              exit: { type: "tween", duration: 0.4 },
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1, exit: { duration: 0.3 } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="url(#star-gradient)"
                className="w-32 h-32 mb-8 star-polish shimmer-effect"
              >
                <defs>
                  <radialGradient
                    id="star-gradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="70%" stopColor="#FFC000" />
                    <stop offset="100%" stopColor="#FF8A00" />
                  </radialGradient>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl font-semibold text-center leading-tight"
            >
              You Are Now Pro!
            </motion.h2>

            {/* Add glitter effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 8 + 2 + "px",
                    height: Math.random() * 8 + 2 + "px",
                    background: `rgba(255, ${200 + Math.random() * 55}, ${
                      Math.random() * 80
                    }, ${Math.random() * 0.4 + 0.6})`,
                    boxShadow: `0 0 ${
                      Math.random() * 6 + 2
                    }px rgba(255, 215, 0, 0.8)`,
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, Math.random() * 0.5 + 0.5, 0],
                    scale: [0, Math.random() * 0.8 + 0.8, 0],
                    y: [0, -Math.random() * 100 - 50],
                    x: [0, (Math.random() - 0.5) * 40],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            {/* Add blur fade gradient background */}
            <motion.div
              className="absolute inset-0 -z-20 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Add star glow effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="w-64 h-64 rounded-full blur-xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,225,150,0.2) 40%, rgba(255,255,255,0) 70%)",
                }}
                animate={{
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Polish star with shadow and gradient */}
            <style jsx global>{`
              .star-polish {
                filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
              }
              @keyframes shimmer {
                0% {
                  filter: brightness(1)
                    drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
                }
                50% {
                  filter: brightness(1.1)
                    drop-shadow(0 0 12px rgba(255, 215, 0, 0.9));
                }
                100% {
                  filter: brightness(1)
                    drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
                }
              }
              .shimmer-effect {
                animation: shimmer 3s infinite ease-in-out;
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
