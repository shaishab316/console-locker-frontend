"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(3);
  // const [selectedPayment, setSelectedPayment] = useState<
  //   "credit" | "paypal" | "klarna-installment" | "paypal-installment"
  // >("credit");
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const { t } = useTranslation();

  const steps = [
    { id: 1, name: "Accessories" },
    { id: 2, name: "Cart" },
    { id: 3, name: "Checkout" },
  ];

  const orderItem: OrderItem = {
    id: "1",
    name: "Xbox One",
    price: 119,
    quantity: quantity,
    image: "/products/sorif.png",
  };

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F5F7] py-8">
      {/* Progress Steps */}
      <Container>
        <div>
          <h1 className="text-2xl font-bold text-center mb-8">
            {t("checkout")}
          </h1>
          <div className="w-full flex justify-between gap-5 mb-8">
            <h3 className="flex-1 text-lg text-[#101010] font-medium mb-4 pb-2 border-t-2 border-t-[#101010]">
              Accessories
            </h3>
            <h3 className="flex-1 text-lg text-[#101010] font-medium mb-4 pb-2 border-t-2 border-t-[#101010]">
              Cart
            </h3>
            <h3 className="flex-1 text-lg text-[#101010] font-medium mb-4 pb-2 border-t-2 border-t-[#101010]">
              Checkout
            </h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#F2F5F7]">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-6 bg-[#FDFDFD] p-6">
            {/* Delivery Details */}
            <div className="bg-[#FBFBFB] border p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-[#101010]">
                1. {t("deliveryDetails")}
              </h2>
              {/* Add delivery form fields here */}
            </div>

            {/* Payment Section */}
            <div className="bg-transparent rounded-lg shadow-sm">
              <div className="border p-5 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-[#101010]">
                  2. {"pay"}
                </h2>
              </div>

              <div className="p-7">
                <div className="space-y-6">
                  <h3 className="font-semibold text-2xl text-[#404040]">
                    {t("payNow")}:
                  </h3>

                  {/* Pay Now */}
                  <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
                    {/* Credit Card Option */}
                    <div
                      className={`flex items-center space-x-4 p-5 border rounded-md ${
                        selectedPayment === "credit"
                          ? "border-emerald-950"
                          : "border-[#FDFDFD]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="credit"
                        name="payment"
                        checked={selectedPayment === "credit"}
                        onChange={() => setSelectedPayment("credit")}
                        // className="h-4 w-4 text-blue-600"
                        className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                      />
                      <label
                        htmlFor="credit"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <p className="flex flex-col mr-3">
                          <span className="text-lg font-medium text-[#101010]">
                            {t("creditDebitCard")}
                          </span>
                          <span className="text-[#5F5F5F]">
                            {t("instantPaymentByCreditCard")}
                          </span>
                        </p>
                        <div className="flex space-x-2">
                          <Image
                            src="/payments/visa-mastercard.svg"
                            alt="Visa"
                            width={32}
                            height={20}
                            className="h-5 w-auto"
                          />
                        </div>
                      </label>
                    </div>

                    {/* PayPal Option */}
                    <div
                      className={`flex items-center space-x-4 p-5 border rounded-md ${
                        selectedPayment === "paypal"
                          ? "border-emerald-950"
                          : "border-[#FDFDFD]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="paypal"
                        name="payment"
                        checked={selectedPayment === "paypal"}
                        onChange={() => setSelectedPayment("paypal")}
                        // className="h-4 w-4 text-blue-600"
                        className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                      />
                      <label
                        htmlFor="paypal"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <p className="flex flex-col mr-3">
                          <span className="text-lg font-medium text-[#101010]">
                            {t("payNow")}
                          </span>
                          <span className="text-[#5F5F5F]">
                            {t("payNowWithYouPayPalAccount")}
                          </span>
                        </p>
                        <div className="flex space-x-2">
                          <Image
                            src="/payments/paypal2.svg"
                            alt="Visa"
                            width={32}
                            height={20}
                            className="h-5 w-auto"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#404040] pt-4">
                    {t("payInInstallments")}:
                  </h3>
                  {/* PayPal Installments */}
                  <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
                    {/* Credit Card Option */}
                    <div
                      className={`flex items-center space-x-4 p-5 border rounded-md ${
                        selectedPayment === "paypal2"
                          ? "border-emerald-950"
                          : "border-[#FDFDFD]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="paypal2"
                        name="payment"
                        checked={selectedPayment === "paypal2"}
                        onChange={() => setSelectedPayment("paypal2")}
                        // className="h-4 w-4 text-blue-600"
                        className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                      />
                      <label
                        htmlFor="paypal2"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <p className="flex flex-col mr-3">
                          <span className="text-lg font-medium text-[#101010]">
                            {t("payInInstallments")}:
                          </span>
                          <span className="text-[#5F5F5F]">
                            {t("payIn3InterestFreeInstallments")}
                          </span>
                        </p>
                        <div className="flex space-x-2">
                          <Image
                            src="/payments/paypal2.svg"
                            alt="Visa"
                            width={32}
                            height={20}
                            className="h-5 w-auto"
                          />
                        </div>
                      </label>
                    </div>

                    {/* PayPal Option */}
                    <div
                      className={`flex items-center space-x-4 p-5 border rounded-md ${
                        selectedPayment === "klarna"
                          ? "border-emerald-950"
                          : "border-[#FDFDFD]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="klarna"
                        name="payment"
                        checked={selectedPayment === "klarna"}
                        onChange={() => setSelectedPayment("klarna")}
                        // className="h-4 w-4 text-blue-600"
                        className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                      />
                      <label
                        htmlFor="klarna"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <p className="flex flex-col mr-3">
                          <span className="text-lg font-medium text-[#101010]">
                            {t("payInInstallments")}:
                          </span>
                          <span className="text-[#5F5F5F]">
                            {t("payIn3InterestFreeInstallments")}
                          </span>
                        </p>
                        <div className="flex space-x-2">
                          <Image
                            src="/payments/klarna.png"
                            alt="Visa"
                            width={60}
                            height={60}
                            className="h-10 w-auto"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                <div className="mt-6">
                  <p className="text-xl font-semibold text-[#F04848]">
                    {t("didYouMissAField")}
                  </p>
                  <p className="text-base text-[#F04848]">
                    {t("pleaseReEnterYourDetailsBelow")}
                  </p>
                </div>

                {/* Proceed Button */}
                <Link href={"/empty"}>
                  <button className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition-colors">
                    {t("proceedToPurchase")}
                  </button>
                </Link>

                {/* Terms and Privacy */}
                <p className="mt-4 text-lg text-[#2B2B2B]">
                  {t("paymentProcessT1")}{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    {t("paymentProcessT2")}
                  </Link>{" "}
                  {t("paymentProcessT3")}{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    {t("paymentProcessT4")}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-[#FDFDFD] p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#101010] mb-6">
              {t("yourOrder")}
            </h2>

            {/* Product Details */}
            <div className="flex items-start space-x-4 mb-6">
              <Image
                src={orderItem.image || "/placeholder.svg"}
                alt={orderItem.name}
                width={120}
                height={120}
                className="rounded-lg"
              />
              <div className="flex-1 space-y-1.5">
                <h3 className="font-semibold text-xl text-[#101010]">
                  {orderItem.name}
                </h3>
                <p className="text-xs text-[#2B2B2B]">
                  {t("warranty")}: 12 months | 128Gb
                </p>
                <p className="text-xs text-[#2B2B2B]">{t("condition")}: Good</p>
                <p className="text-xs text-[#00B67A]">
                  {t("delivery")}: Jan 20 - Jan 22
                </p>
                <p className="text-xs text-[#2B2B2B]">
                  {t("salesAndShipping")}: Console & you
                </p>
              </div>
              <div className="text-right space-y-4">
                <p className="font-semibold text-2xl text-[#404040]">
                  ${orderItem.price}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="w-6 h-6 flex items-center justify-center border rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="w-6 h-6 flex items-center justify-center border rounded"
                  >
                    +
                  </button>
                </div>
                <button className="text-[#F04848] text-sm font-medium hover:underline">
                  Remove
                </button>
              </div>
            </div>

            {/* <div className="border-b pb-4 mb-4">
              <div className="flex gap-4">
                <div className="relative w-20 h-20">
                  <Image
                    src="/buy/p1.png"
                    alt={orderItem.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{orderItem.name}</h3>
                  <p className="text-sm text-gray-600">
                    Warranty: {orderItem.warranty} | {orderItem.storage}
                  </p>
                  <p className="text-sm text-gray-600">
                    Condition: {orderItem.condition}
                  </p>
                  <p className="text-sm text-green-600">
                    Delivery: {orderItem.delivery}
                  </p>
                  <p className="text-sm text-gray-600">
                    Sales & Shipping: Console & you
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">${orderItem.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      // onClick={() => updateQuantity(false)}
                      className="w-6 h-6 flex items-center justify-center border rounded"
                    >
                      -
                    </button>
                    <span>{orderItem.quantity}</span>
                    <button
                      // onClick={() => updateQuantity(true)}
                      className="w-6 h-6 flex items-center justify-center border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button className="text-sm text-red-600 mt-2">Remove</button>
                </div>
              </div>
            </div> */}

            {/* Price Summary */}
            <div className="bg-[#DAEDF2] mb-6 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">Xbox One</span>
                <span>${orderItem.price * quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span className="text-gray-500">{t("included")}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{t("grandTotal")}</span>
                <span>${orderItem.price * quantity}</span>
              </div>
              <p className="text-xs text-gray-500">
                {t("thePriceIncludesVAT")}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/payments/warrent-protection.png"
                  width={25}
                  height={25}
                  alt="Warranty"
                />
                <span className="text-lg text-[#101010] font-medium">
                  {t("monthsWarranty")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/payments/free-return.png"
                  width={25}
                  height={25}
                  alt="Warranty"
                />
                <span className="text-lg text-[#101010] font-medium">
                  {t("freeReturn")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/payments/like-new.png"
                  width={25}
                  height={25}
                  alt="Warranty"
                />
                <span className="text-lg text-[#101010] font-medium">
                  {t("performsLikeNewTitle")}
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 flex items-center space-x-2">
              {/* <Image
                src="/placeholder.svg"
                alt="Klarna"
                width={60}
                height={20}
                className="h-6 w-auto"
              />
              <Image
                src="/placeholder.svg"
                alt="PayPal"
                width={60}
                height={20}
                className="h-6 w-auto"
              /> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
