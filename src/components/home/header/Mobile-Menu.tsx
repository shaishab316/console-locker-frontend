"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-4">
          <Link
            href="/"
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            Home
          </Link>
          <Accordion type="single" collapsible>
            <AccordionItem value="buy">
              <AccordionTrigger className="text-lg font-medium">
                Buy
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link
                    href="/buy/playstation"
                    className="text-sm"
                    onClick={() => onOpenChange(false)}
                  >
                    PlayStation
                  </Link>
                  <Link
                    href="/buy/xbox"
                    className="text-sm"
                    onClick={() => onOpenChange(false)}
                  >
                    Xbox
                  </Link>
                  <Link
                    href="/buy/nintendo"
                    className="text-sm"
                    onClick={() => onOpenChange(false)}
                  >
                    Nintendo
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            href="/sell"
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            Sell
          </Link>
          <Link
            href="/repair"
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            Repair
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            About
          </Link>
          <Link
            href="/reviews"
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            Reviews
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            Contact
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
