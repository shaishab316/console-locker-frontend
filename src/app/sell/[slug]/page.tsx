"use client";

import MobileProductDetails from "@/components/sell/mobile/MobileProductDetails";
import SellDynamicPage from "@/components/sell/SellDynamicPageDesktop";

export default function StorageSelector() {
  return (
    <>
      <div className="hidden md:block">
        <SellDynamicPage />
      </div>

      <div className="md:hidden bg-[#F2F5F7]">
        <MobileProductDetails />
      </div>
    </>
  );
}
