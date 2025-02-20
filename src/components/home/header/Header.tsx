"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileMenu } from "./Mobile-Menu";
import LanguageSelector from "../languageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    // <header className="top-0 z-50 md:pt-4 w-full  border-b bg-[#F2F5F7]">
    <header className="top-0 md:pt-4 w-full  border-b bg-[#F2F5F7]">
      {/* <div
        className={`fixed top-0 left-0 w-full  
       h-14 lg:h-[96px] container mx-auto flex items-center justify-between px-4 transition-transform duration-300 ${
         isVisible ? "translate-y-0" : "-translate-y-full"
       }`}
      > */}
      <div
        className="
       h-14 lg:h-[96px] container mx-auto flex items-center justify-between px-4"
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 lg:hidden absolute right-1"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-30 w-30" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link
            href="/"
            className="absolute md:static left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 flex items-center space-x-1"
          >
            <div className="relative h-8 w-44 pt-1">
              <Image
                src="/home/logo.png"
                alt="Console Locker"
                width={700}
                height={200}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-3 lg:space-x-12">
          <Link href="/" className="text-sm font-medium">
            {t("home")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1.5 text-sm font-medium">
              <span>{t("buy")}</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Link href="/buy/playstation" className="w-full px-5">
                  PlayStation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/xbox" className="w-full px-5">
                  Xbox
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/nintendo" className="w-full px-5">
                  Nintendo
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/sell" className="text-sm font-medium">
            {t("sell")}
          </Link>
          <Link href="#" className="text-sm font-medium">
            {t("repair")}
          </Link>
          <Link href="/about" className="text-sm font-medium">
            {t("about")}
          </Link>
          <Link href="/reviews" className="text-sm font-medium">
            {t("reviews")}
          </Link>
          <Link href="/contact" className="text-sm font-medium">
            {t("contact")}
          </Link>
        </nav>

        {/* hide in mobile menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* <Link href="/account" className="p-2">
            <User className="h-5 w-5" />
          </Link> */}
          <Link href="/cart" className="p-2">
            <ShoppingCart className="h-5 w-5" />
          </Link>

          <div className="hidden sm:flex items-center space-x-1 text-sm font-medium cursor-pointer">
            <LanguageSelector />
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
    </header>
  );
}
