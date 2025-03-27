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
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const { user, billing } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

          toast.success("Payment successful");
          window.location.href = "/settings";
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
    </section>
  );
}
