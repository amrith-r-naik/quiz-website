"use client";
import React from "react";
import { Home } from "lucide-react";
import ModeSwitcherButton from "./mode-switcher";
import { useRouter, usePathname } from "next/navigation";

const MobileNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleRedirectHome = () => {
    if (pathname.startsWith("/quiz/")) {
      if (
        !confirm("Your changes will be lost. Are you sure you want to leave?")
      ) {
        return;
      }
    }
    router.push("/");
  };
  return (
    <div className="fixed top-0 border-b w-full items-center h-14 px-4 flex justify-between bg-background/70 backdrop-blur-xl shadow-lg z-40">
      <Home
        className="opacity-80 hover:opacity-100 hover:cursor-pointer"
        size={20}
        onClick={handleRedirectHome}
      />
      <ModeSwitcherButton />
    </div>
  );
};

export default MobileNavbar;
