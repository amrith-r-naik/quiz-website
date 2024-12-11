"use client";
import React from "react";
import ModeSwitcherButton from "./mode-switcher";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

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
      <div
        onClick={handleRedirectHome}
        className="md:flex md:gap-2 md:font-black cursor-pointer"
      >
        <Image
          src={"/logo.png"}
          width={24}
          height={24}
          alt="logo"
          className="dark:invert"
        />
        <p className="hidden md:block">Those MCQ Subjects</p>
      </div>
      <ModeSwitcherButton />
    </div>
  );
};

export default MobileNavbar;
