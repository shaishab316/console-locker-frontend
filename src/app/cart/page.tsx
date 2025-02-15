"use client";

import Container from "@/components/common/Container";
import PaymentHeader from "@/components/payment/PaymentHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  warranty: string;
  condition: string;
  storage?: string;
  quantity: number;
  available: boolean;
  alternativeAvailable?: boolean;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Nintendo",
      price: 119,
      image: "/products/p1.png",
      warranty: "12 months",
      condition: "Good",
      storage: "128Gb",
      quantity: 1,
      available: false,
      alternativeAvailable: true,
    },
    {
      id: "2",
      name: "Nintendo Lite",
      price: 119,
      image: "/products/p1.png",
      warranty: "12 months",
      condition: "Good",
      storage: "128Gb",
      quantity: 1,
      available: true,
    },
    {
      id: "3",
      name: "Xbox One",
      price: 119,
      image: "/products/p1.png",
      warranty: "12 months",
      condition: "Good",
      storage: "128Gb",
      quantity: 1,
      available: true,
    },
    {
      id: "4",
      name: "Playstation Slim",
      price: 119,
      image: "/products/p1.png",
      warranty: "12 months",
      condition: "Good",
      storage: "128Gb",
      quantity: 1,
      available: true,
    },
  ]);
  const { t } = useTranslation();

  const updateQuantity = (id: string, increment: boolean) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(0, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F2F5F7] pt-16 pb-20">
      <PaymentHeader />
      <Container>
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="bg-[#FDFDFD] rounded-lg flex-grow space-y-4">
            <div className="pt-6 pl-6">
              <h1 className="text-2xl font-bold text-[#101010]">
                {t("checkout")}
              </h1>
            </div>
            {items.map((item) => (
              <div key={item.id} className="bg-[#FDFDFD] rounded-lg p-6">
                <div className="flex flex-wrap items-center justify-between space-x-4">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={120}
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 flex flex-wrap gap-3">
                    <div className="flex-grow flex flex-col justify-between space-y-2.5 h-inherit">
                      <h3 className="text-xl font-semibold text-[#101010] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-base text-[#5F5F5F] mb-1">
                        {t("warranty")}: {item.warranty} | {item.storage} |
                        {t("condition")}: {item.condition}
                      </p>
                      <p className="text-xs md:text-sm text-[#5F5F5F]">
                        {t("salesAndShipping")}:{" "}
                        <span className="underline">Console & you</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        {t("price")}: ${item.price}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, false)}
                          className="w-7 h-7 bg-transparent flex items-center justify-center text-lg border border-[#E6E6E6] rounded-md px-1 py-1 text-[#101010] hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="text-gray-700 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, true)}
                          className="w-7 h-7 bg-transparent flex items-center justify-center text-lg border border-[#E6E6E6] rounded-md px-1 py-1 text-[#101010] hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-[#F04848] font-medium hover:text-[#ed3d3d] mt-2 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {!item.available && (
                  <>
                    <div className="bg-[#F5CECE] text-[#F04848] text-xs px-3 py-2 rounded-md my-4">
                      2/3 Not available
                    </div>
                    <p className="text-[#5F5F5F]">
                      Unfortunately this item is no longer available. You can
                      complete your order without or purchase alternative
                      products.
                    </p>
                  </>
                )}
                {/*  */}
                <div className="flex items-center justify-center py-8 space-x-3">
                  <hr className="flex-1 border-b border-[#D6D6D6]" />
                  <h2 className="text-[#222C9B] text-base font-semibold text-center whitespace-nowrap">
                    + {t("discoverTheAccessories")}
                  </h2>
                  <hr className="flex-1 border-b border-[#D6D6D6]" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-[550px]">
            <div className="bg-[#FDFDFD] rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#101010] mb-4">
                {t("summary")}
              </h2>
              <div>
                <div className="rounded-md bg-[#DAEDF2]">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <span className="text-[#101010] font-semibold">Xbox</span>
                      <span className="text-[#101010]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#101010] font-medium">
                        {t("shipping")}
                      </span>
                      <span className="text[#101010] font-medium">
                        {t("included")}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#cccbcb] p-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-xl text-[#101010]">
                        {t("grandTotal")}
                      </span>
                      <span className="font-semibold text-xl text-[#101010]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-base text-[#101010] mt-1">
                      {t("thePriceIncludesVAT")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 py-3">
                  <input
                    type="text"
                    placeholder="Enter your code"
                    className="w-full px-4 py-2.5 border rounded-lg"
                  />
                  <button className=" bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700">
                    {t("apply")}
                  </button>
                </div>

                <div className="space-y-4 mt-6 pb-2.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6">
                      <Image
                        src={"/payments/warrent-protection.png"}
                        width={30}
                        height={30}
                        alt="warrent-protection"
                      />
                    </div>
                    <span className="text-gray-700">
                      {"12 Months Warranty"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6">
                      <Image
                        src={"/payments/free-return.png"}
                        width={30}
                        height={30}
                        alt="warrent-protection"
                      />
                    </div>
                    <span className="text-gray-700">{t("freeReturn")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6">
                      <Image
                        src={"/payments/like-new.png"}
                        width={30}
                        height={30}
                        alt="warrent-protection"
                      />
                    </div>
                    <span className="text-gray-700">
                      {t("performsLikeNewTitle")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                  <div className="w-[70px] h-12 bg-[#F4B6C7] rounded flex items-center justify-center">
                    <span className="text-[#17120F] font-medium">Klarna</span>
                  </div>
                  <div className="w-[70px] h-12 bg-blue-100 rounded flex items-center justify-center">
                    <Image
                      src={"/payments/paypal.png"}
                      className="w-[74px] h-[48px] object-contain"
                      width={60}
                      height={30}
                      alt="paypal"
                    />
                  </div>
                </div>

                <div className="py-2">
                  <p className="text-sm text-[#5F5F5F]">
                    {t("applicableTaxLaw")}
                  </p>
                </div>

                <Link href={"/checkout"}>
                  <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mt-6">
                    {t("goAhead")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
