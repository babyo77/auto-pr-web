"use client";

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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  if (!user) {
    return <div>Loading...</div>;
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
            <Button size={"sm"} variant="destructive" onClick={() => signOut()}>
              Logout
            </Button>
          </CardFooter>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Account</CardTitle>
              <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">
                Free Plan
              </span>
            </div>
            <CardDescription className="-mt-0.5 text-sm">
              3 PR Message Generations Left
            </CardDescription>
          </CardHeader>
          <CardContent className="-pt-3 space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-muted-foreground">Usage</span>
                <span>0 / 3</span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full">
                <div
                  className="h-2.5 bg-primary rounded-full transition-all"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            <Button size={"sm"} variant="default">
              <Link href="/pricing?p=true">UPGRADE TO PRO</Link>
            </Button>

            <p className="text-muted-foreground text-xs">
              Upgrade to get unlimited PR messages
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
