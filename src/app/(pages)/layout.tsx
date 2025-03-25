import React from "react";
import { HeroHeader } from "@/components/hero8-header";
import Footer from "@/components/footer";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroHeader />
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default layout;
