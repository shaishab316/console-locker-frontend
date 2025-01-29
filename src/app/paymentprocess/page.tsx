"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

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
  const [selectedPayment, setSelectedPayment] = useState("");

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
          <h1 className="text-2xl font-bold text-center mb-8">Cart</h1>
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

        {/* <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`text-sm ${
                  index + 1 === activeStep ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.name}
              </div>
              {index < steps.length - 1 && (
                <div className="h-[1px] w-full mx-4 bg-gray-300" />
              )}
            </div>
          ))}
        </div> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#F2F5F7]">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-6 bg-[#FDFDFD] p-6">
            {/* Delivery Details */}
            <div className="bg-[#FBFBFB] border p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-[#101010]">
                1. Delivery Details
              </h2>
              {/* Add delivery form fields here */}
            </div>

            {/* Payment Section */}
            <div className="bg-transparent rounded-lg shadow-sm">
              <div className="border p-5 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-[#101010]">
                  2. Pay
                </h2>
              </div>

              <div className="p-7">
                <div className="space-y-6">
                  <h3 className="font-semibold text-2xl text-[#404040]">
                    Pay Now:
                  </h3>

                  {/* Pay Now */}
                  <div className="flex items-center justify-between gap-6">
                    {/* Credit Card Option */}
                    <div
                      className={`flex items-center space-x-4 p-5 border border-transparent rounded-md cursor-pointer ${
                        selectedPayment === "credit" ? "border-red-500" : null
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
                        className="flex items-center space-x-2"
                      >
                        <p className="flex flex-col">
                          <span className="text-lg font-medium text-[#101010]">
                            Credit / Debit Card
                          </span>
                          <span className="text-[#5F5F5F]">
                            Instant payment by credit card
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
                      className={`flex items-center space-x-4 p-5 border border-transparent rounded-md cursor-pointer ${
                        selectedPayment === "paypal" ? "border-red-500" : null
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
                        className="flex items-center space-x-2"
                      >
                        <p className="flex flex-col">
                          <span className="text-lg font-medium text-[#101010]">
                            Pay Now
                          </span>
                          <span className="text-[#5F5F5F]">
                            Pay now with you PayPal account
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
                    Pay in installments:
                  </h3>
                  {/* PayPal Installments */}
                  <div className="flex items-center justify-between gap-6">
                    {/* Credit Card Option */}
                    <div
                      className={`flex items-center space-x-4 p-5 border border-transparent rounded-md cursor-pointer ${
                        selectedPayment === "paypal2" ? "border-red-500" : null
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
                        className="flex items-center space-x-2"
                      >
                        <p className="flex flex-col">
                          <span className="text-lg font-medium text-[#101010]">
                            Pay in installments
                          </span>
                          <span className="text-[#5F5F5F]">
                            Pay in 3 interest-free installments
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
                      className={`flex items-center space-x-4 p-5 border border-transparent rounded-md cursor-pointer ${
                        selectedPayment === "klarna" ? "border-red-500" : null
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
                        className="flex items-center space-x-2"
                      >
                        <p className="flex flex-col">
                          <span className="text-lg font-medium text-[#101010]">
                            Pay in Installments
                          </span>
                          <span className="text-[#5F5F5F]">
                            Pay in 3 interest-free installments
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
                </div>

                {/* Error Message */}
                <div className="mt-6">
                  <p className="text-xl font-semibold text-[#F04848]">
                    Did you miss a field or make a typo?
                  </p>
                  <p className="text-base text-[#F04848]">
                    Please re-enter your details below.
                  </p>
                </div>

                {/* Proceed Button */}
                <Link href={"/empty"}>
                  <button className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition-colors">
                    Proceed to Purchase
                  </button>
                </Link>

                {/* Terms and Privacy */}
                <p className="mt-4 text-lg text-[#2B2B2B]">
                  By placing an order, you agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and understand that we process your personal information in
                  accordance with our{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-[#FDFDFD] p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#101010] mb-6">
              Your Order
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
                  Warranty: 12 months | 128Gb
                </p>
                <p className="text-xs text-[#2B2B2B]">Condition: Good</p>
                <p className="text-xs text-[#00B67A]">
                  Delivery: Jan 20 - Jan 22
                </p>
                <p className="text-xs text-[#2B2B2B]">
                  Sales & Shipping: Console & you
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
            <div className="bg-[#DAEDF2] p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>1 Article</span>
                <span>${orderItem.price * quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">Included</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Grand Total</span>
                <span>${orderItem.price * quantity}</span>
              </div>
              <p className="text-xs text-gray-500">The price includes VAT</p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  />
                </svg>
                <span className="text-sm">12 Months Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
                <span className="text-sm">Free Return</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Performs Like New</span>
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
