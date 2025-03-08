"use client";

import Container from "@/components/common/Container";
import PaymentHeader from "@/components/payment/PaymentHeader";
import { useGetProductsByIdsQuery } from "@/redux/features/products/GetProductByIds";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../loading";

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

interface IProduct {
  _id: string;
  admin: string;
  images: string[];
  name: string;
  description: string;
  price: number;
  offer_price: number;
  brand: string;
  model: string;
  condition: string;
  controller: string;
  memory: string;
  quantity: number;
  isVariant: boolean;
  product_type: string;
  slug: string;
  __v: number;
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getProductIds = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]"); // Retrieve cart data
    const productIds: string[] = cart.map(
      (item: { productId: string; tradeIn: any }) => item.productId
    );
    return productIds.join(",");
  };

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductsByIdsQuery(getProductIds());

  const getProductQuantity = (id: string) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = cart.find(
      (item: { productId: string }) => item.productId === id
    );

    return product ? product.quantity : 0;
  };

  const removeItem = (id: string) => {
    refetch();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter(
      (item: { productId: string }) => item.productId !== id
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = products?.data?.products.reduce(
    (total: number, product: IProduct) => {
      const quantity = getProductQuantity(product._id);

      // Multiply the quantity by the offer price of the product
      return total + quantity * product.offer_price;
    },
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  if (isLoading) {
    return <Loading />;
  }

  const increaseQuantity = (id: string) => {
    // Get the cart data from localStorage
    refetch();
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product exists in the cart
    const updatedCart = cartData.map((item: any) => {
      if (item.productId === id) {
        return { ...item, quantity: item.quantity + 1 }; // Increase quantity
      }
      return item;
    });

    // Store the updated cart back into localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id: string) => {
    refetch();
    // Get the cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product exists in the cart
    const updatedCart = cartData.map((item: any) => {
      if (item.productId === id && item.quantity > 1) {
        // Decrease quantity only if it's greater than 1
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    // Store the updated cart back into localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-[#F2F5F7] pt-16 pb-20">
      <PaymentHeader />
      <Container>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="bg-[#FDFDFD] rounded-lg flex-grow space-y-4">
            <div className="pt-6 pl-6">
              <h1 className="text-2xl font-bold text-[#101010]">{t("cart")}</h1>
            </div>
            {products?.data?.products.map((product: IProduct) => (
              <div key={product?._id} className="bg-[#FDFDFD] rounded-lg p-6">
                <div className="flex flex-wrap items-center justify-between space-x-4">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={`${API_URL}/${product?.images[0]}`}
                      alt={product?.name}
                      width={100}
                      height={120}
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 flex flex-wrap gap-3">
                    <div className="flex-grow flex flex-col justify-between space-y-2.5 h-inherit">
                      <h3 className="text-xl font-semibold text-[#101010] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-base text-[#5F5F5F] mb-1 capitalize">
                        {t("brand")}: {product?.brand} | {product?.memory} |{" "}
                        {t("condition")}: {product?.condition}
                      </p>
                      <p className="text-xs md:text-sm text-[#5F5F5F]">
                        {t("salesAndShipping")}:{" "}
                        <span className="underline">Console & you</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        {t("price")}: $
                        {(
                          product?.offer_price *
                          getProductQuantity(product?._id)
                        ).toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(product?._id)}
                          className={`${
                            getProductQuantity(product?._id) === 1 &&
                            "cursor-not-allowed"
                          } w-7 h-7 bg-transparent flex items-center justify-center text-lg border border-[#E6E6E6] rounded-md px-1 py-1 text-[#101010] hover:text-gray-700`}
                        >
                          -
                        </button>
                        <span className="text-gray-700 px-1">
                          {getProductQuantity(product?._id)}
                        </span>
                        <button
                          onClick={() => increaseQuantity(product?._id)}
                          className="w-7 h-7 bg-transparent flex items-center justify-center text-lg border border-[#E6E6E6] rounded-md px-1 py-1 text-[#101010] hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product?._id)}
                        className="text-sm text-[#F04848] font-medium hover:text-[#ed3d3d] mt-2 underline"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                </div>

                {!product.quantity && (
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
                      <span className="text-[#101010] font-semibold">
                        Total
                      </span>
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
                    <span className="text-[#101010]">
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
                    <span className="text-[#101010]">{t("freeReturn")}</span>
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
                    <span className="text-[#101010]">
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
