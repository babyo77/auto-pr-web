"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function SettingsPage() {
  const { user, billing } = useAuth();

  if (!user || !billing) {
    return (
      <div className="container flex justify-center items-center h-[calc(100vh-15rem)] tracking-tighter leading-tight py-16 md:py-32 mx-auto max-w-6xl p-6">
        <div className="mb-8">Loading...</div>
      </div>
    );
  }
  return (
    <div className="container py-16 md:py-32 mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-medium">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, billing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Basic Information</CardTitle>
            <CardDescription className="text-sm -mt-0.5">
              Your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Name</Label>
              <p className="text-sm text-muted-foreground">
                {user?.displayName}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Email</Label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
          <CardFooter className="-mt-2 -ml-1">
            <Button size={"sm"} variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          </CardFooter>
        </Card>

        {/* Account */}
        <Card className=" relative">
          {billing?.subscriptionTier === "PRO" && (
            <BorderBeam duration={8} size={100} />
          )}
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Account</CardTitle>
              <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">
                {billing?.subscriptionTier} Plan
              </span>
            </div>
            <CardDescription className="-mt-0.5 text-sm">
              {billing?.subscriptionTier === "FREE"
                ? `${
                    Number(billing?.prGenerationCount ?? 0) > 3
                      ? "Unlimited"
                      : 3 - Number(billing?.prGenerationCount ?? 0)
                  } PR Message Generations Left`
                : "Unlimited PR Message Generations"}
            </CardDescription>
          </CardHeader>
          <CardContent className="-pt-3 space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-muted-foreground">Usage</span>
                <span>
                  {billing?.prGenerationCount} /{" "}
                  {billing?.subscriptionTier === "FREE" ? 3 : "∞"}
                </span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full">
                <div
                  className={`h-2.5 rounded-full transition-all ${
                    billing?.subscriptionTier === "FREE" &&
                    (billing?.prGenerationCount ?? 0) >= 2
                      ? "bg-red-500"
                      : "bg-primary"
                  }`}
                  style={{
                    width:
                      billing?.subscriptionTier === "FREE"
                        ? `${Math.min(
                            100,
                            ((billing?.prGenerationCount ?? 0) / 3) * 100
                          )}%`
                        : "100%",
                  }}
                />
              </div>
            </div>

            {billing?.subscriptionTier !== "PRO" && (
              <Button size={"sm"} variant="default">
                <Link href="/pricing?p=true">UPGRADE TO PRO</Link>
              </Button>
            )}

            {billing?.subscriptionTier === "FREE" && (
              <p className="text-muted-foreground text-xs">
                Upgrade to get unlimited PR messages
              </p>
            )}
            {billing?.subscriptionTier === "PRO" && (
              <p className="text-muted-foreground text-xs">
                Enjoy unlimited PR message generations
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
