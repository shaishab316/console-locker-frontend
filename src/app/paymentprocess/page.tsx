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
  const [selectedPayment, setSelectedPayment] = useState<
    "credit" | "paypal" | "klarna-installment" | "paypal-installment"
  >("credit");
  const [quantity, setQuantity] = useState(1);

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
    image: "/placeholder.svg",
  };

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Progress Steps */}
      <Container>
        <div className="flex items-center justify-between mb-8">
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
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            {/* Delivery Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">1. Delivery Details</h2>
              {/* Add delivery form fields here */}
            </div>

            {/* Payment Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">2. Pay</h2>

              <div className="space-y-6">
                <h3 className="font-medium">Pay Now:</h3>
                {/* Credit Card Option */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="credit"
                    name="payment"
                    checked={selectedPayment === "credit"}
                    onChange={() => setSelectedPayment("credit")}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="credit"
                    className="flex items-center space-x-2"
                  >
                    <span>Credit / Debit Card</span>
                    <div className="flex space-x-2">
                      {/* <Image
                        src="/placeholder.svg"
                        alt="Visa"
                        width={32}
                        height={20}
                        className="h-5 w-auto"
                      /> */}
                      {/* <Image
                        src="/placeholder.svg"
                        alt="Mastercard"
                        width={32}
                        height={20}
                        className="h-5 w-auto"
                      /> */}
                    </div>
                  </label>
                </div>

                {/* PayPal Option */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    checked={selectedPayment === "paypal"}
                    onChange={() => setSelectedPayment("paypal")}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="paypal"
                    className="flex items-center space-x-2"
                  >
                    <span>Pay Now</span>
                    {/* <Image
                      src="/placeholder.svg"
                      alt="PayPal"
                      width={80}
                      height={20}
                      className="h-5 w-auto"
                    /> */}
                  </label>
                </div>

                <h3 className="font-medium pt-4">Pay in installments:</h3>
                {/* PayPal Installments */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="paypal-installment"
                    name="payment"
                    checked={selectedPayment === "paypal-installment"}
                    onChange={() => setSelectedPayment("paypal-installment")}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="paypal-installment"
                    className="flex items-center space-x-2"
                  >
                    <span>Pay in 3 interest-free installments</span>
                    {/* <Image
                      src="/products/p1.png"
                      alt="PayPal"
                      width={80}
                      height={20}
                      className="h-5 w-auto"
                    /> */}
                  </label>
                </div>

                {/* Klarna Installments */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="klarna-installment"
                    name="payment"
                    checked={selectedPayment === "klarna-installment"}
                    onChange={() => setSelectedPayment("klarna-installment")}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="klarna-installment"
                    className="flex items-center space-x-2"
                  >
                    <span>Pay in 3 interest-free installments</span>
                    {/* <Image
                      src="/placeholder.svg"
                      alt="Klarna"
                      width={80}
                      height={20}
                      className="h-5 w-auto"
                    /> */}
                  </label>
                </div>
              </div>

              {/* Error Message */}
              <div className="mt-6 text-red-500 text-sm">
                <p>Did you miss a field or make a typo?</p>
                <p className="text-xs">Please re-enter your details below.</p>
              </div>

              {/* Proceed Button */}
              <button className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition-colors">
                Proceed to Purchase
              </button>

              {/* Terms and Privacy */}
              <p className="mt-4 text-sm text-gray-600">
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

          {/* Right Column - Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6">Your Order</h2>

            {/* Product Details */}
            <div className="flex items-start space-x-4 mb-6">
              {/* <Image
                src={orderItem.image || "/placeholder.svg"}
                alt={orderItem.name}
                width={80}
                height={80}
                className="rounded-lg"
              /> */}
              <div className="flex-1">
                <h3 className="font-medium">{orderItem.name}</h3>
                <p className="text-sm text-gray-500">
                  Currently in stock | Sales
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${orderItem.price}</p>
                <button className="text-red-500 text-sm hover:underline">
                  Remove
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
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
