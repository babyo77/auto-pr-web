"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthChange } from "./auth";
import { useRouter, usePathname } from "next/navigation";

type Billing = {
  subscriptionStatus?: boolean;
  subscriptionTier?: "FREE" | "PRO" | "ENTERPRISE";
  subscriptionStart?: Date;
  subscriptionEnd?: Date;
  isYearlyBilling?: boolean;
  prGenerationCount?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  billing: Billing | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  billing: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [billing, setBilling] = useState<Billing | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setUser(user);
      try {
        if (user) {
          const token = await user.getIdToken();
          localStorage.setItem("xach", user.uid);
          await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({ token }),
          });

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SCI_URI}/sci/login`,
            {
              method: "POST",
              headers: {
                "x-sci-auth": token,
              },
            }
          );
          if (!res.ok) throw new Error("Failed to fetch billing data");
          const billing = await fetch(
            `${process.env.NEXT_PUBLIC_SCI_URI}/sci/billing`,
            {
              headers: {
                "x-sci-auth": token,
              },
            }
          );
          if (billing.ok) {
            const billingData = (await billing.json()) as Billing;
            setBilling(billingData);
          }
        } else {
          await fetch("/api/auth", {
            method: "DELETE",
          });
          await fetch(
            `${
              process.env.NEXT_PUBLIC_SCI_URI
            }/sci/logout?uid=${localStorage.getItem("xach")}`,
            {
              method: "DELETE",
            }
          );
          localStorage.removeItem("xach");
          throw new Error("User not found");
        }
      } catch (error) {
        if (pathname.startsWith("/settings")) router.push("/login");
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, billing }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
