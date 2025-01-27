"use client";

import { useState } from "react";
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

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-4 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-10 w-10" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link
            href="/"
             className="absolute md:static left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 flex items-center space-x-2"
          >
            <div className="relative h-8 w-8">
              <Image
                src="/gamepad.jpg"
                alt="Console Locker"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">Console Locker</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium">
              <span>Buy</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Link href="/buy/playstation">PlayStation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/xbox">Xbox</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/nintendo">Nintendo</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/nintendo">Bundle</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/nintendo">Accessories</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy/nintendo">Games</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/sell" className="text-sm font-medium">
            Sell
          </Link>
          <Link href="/repair" className="text-sm font-medium">
            Repair
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/reviews" className="text-sm font-medium">
            Reviews
          </Link>
          <Link href="/contact" className="text-sm font-medium">
            Contact
          </Link>
        </nav>

        {/* hide in mobile menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/account" className="p-2">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="p-2">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <button className="hidden sm:flex items-center space-x-1 text-sm font-medium">
            <Image
              src="/germany.png"
              alt="German"
              width={20}
              height={20}
              className="rounded"
            />
            <span>German</span>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
    </header>
  );
}
