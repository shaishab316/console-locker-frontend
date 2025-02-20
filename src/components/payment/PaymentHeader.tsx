"use client";

import { useState } from "react";
import { CartItem } from "./CardItem";
import Container from "../common/Container";
import { useTranslation } from "react-i18next";

const INITIAL_ITEMS = [
  {
    id: "1",
    name: "Nintendo",
    price: 119,
    warranty: "12 months",
    storage: "128Gb",
    condition: "Good",
    delivery: "Jan 20 - Jan 22",
    isAvailable: false,
    hasAlternative: false,
  },
  {
    id: "2",
    name: "Nintendo Lite",
    price: 119,
    warranty: "12 months",
    storage: "128Gb",
    condition: "Good",
    delivery: "Jan 20 - Jan 22",
    isAvailable: true,
    hasAlternative: true,
  },
];

export default function PaymentHeader() {
  const [items] = useState(INITIAL_ITEMS);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleAddToCart = (id: string) => {
    setCartItems((prev) => [...prev, id]);
  };

  return (
    <div className="bg-[#F2F5F7]">
      <Container>
        {/* <div className="px-2 sm:px-6">
          <h1 className="text-2xl font-bold text-center mb-8">{t("cart")}</h1>
          <div className="w-full flex justify-between gap-5 mb-8">
            <h3 className="flex-1 text-lg text-[#a8a8a8] font-medium mb-4 pb-2 border-t-2 border-t-[#a8a8a8]">
              {t("accessories")}
            </h3>
            <h3 className="flex-1 text-lg text-[#101010] font-medium mb-4 pb-2 border-t-2 border-t-[#101010]">
              {t("cart")}
            </h3>
            <h3 className="flex-1 text-lg text-[#a8a8a8] font-medium mb-4 pb-2 border-t-2 border-t-[#a8a8a8]">
              {t("checkout")}
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-2">
              <div className="flex flex-col lg:flex-row gap-8">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
              <button className="text-white bg-[#101010] py-3 px-9 rounded-md">
                {t("addToCart")}
              </button>
            </div>
          </div>
        </div> */}
        <div className="px-2 sm:px-6">
          <h1 className="text-2xl font-bold text-center mb-8">{t("cart")}</h1>
          <div className="w-full flex justify-between gap-5 mb-8">
            <h3 className="flex-1 text-lg text-[#a8a8a8] font-medium mb-4 pb-2 border-t-2 border-t-[#a8a8a8]">
              {t("accessories")}
            </h3>
            <h3 className="flex-1 text-lg text-[#101010] font-medium mb-4 pb-2 border-t-2 border-t-[#101010]">
              {t("cart")}
            </h3>
            <h3 className="flex-1 text-lg text-[#a8a8a8] font-medium mb-4 pb-2 border-t-2 border-t-[#a8a8a8]">
              {t("checkout")}
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-2">
              <div className="flex flex-col lg:flex-row gap-8">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
              <button className="text-white bg-[#101010] py-3 px-9 rounded-md">
                {t("addToCart")}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
