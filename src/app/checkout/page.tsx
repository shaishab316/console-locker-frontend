"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Link from "next/link";
import PaymentHeader from "@/components/payment/PaymentHeader";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  warranty: string;
  storage: string;
  condition: string;
  delivery: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    surname: "",
    address: "",
    zipCode: "",
    city: "",
    nation: "",
    email: "",
    phone: "",
    phoneCode: "+32",
    sameAddress: false,
  });

  const [orderItem] = useState<OrderItem>({
    id: "1",
    name: "Xbox One",
    price: 119,
    warranty: "12 months",
    storage: "128Gb",
    condition: "Good",
    delivery: "Jan 20 - Jan 22",
    quantity: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Narrow the type for `checked`
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  // const updateQuantity = (increment: boolean) => {
  //   // const newQuantity = increment
  //   //   ? orderItem.quantity + 1
  //   //   : Math.max(1, orderItem.quantity - 1);
  //   // Update quantity logic here
  // };

  return (
    <div className="min-h-screen bg-[#F2F5F7] py-14 md:py-20">
      <Container>
        <h1 className="text-3xl md:text-[40px] font-semibold text-center mb-8">Cart</h1>
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <div className="flex items-center justify-center py-8 space-x-3">
                  <hr className="flex-1 border-b border-[#D6D6D6]" />
                  <h2 className="text-[#101010] text-lg text-center whitespace-nowrap">
                    Pay Faster
                  </h2>
                  <hr className="flex-1 border-b border-[#D6D6D6]" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <button className="flex-1 bg-[#ffc439] text-[#101010] py-2.5 px-4 rounded font-medium hover:bg-[#f4b800] transition-colors">
                    <span className="text-xl text-[#003087] font-bold">
                      Pay
                    </span>
                    <span className="text-xl text-[#009CDE] font-bold">
                      Pal
                    </span>{" "}
                    Checkout
                  </button>
                  <button className="flex-1 bg-black text-white py-2.5 px-4 rounded font-medium hover:bg-gray-800 transition-colors">
                    Page.com{" "}
                    <span
                      className="bg-[#F4B6C7] text-[#17120F] rounded-md border border-white 
                    px-2 py-1.5"
                    >
                      Klarna
                    </span>
                  </button>
                </div>
                <p className="text-lg text-gray-600">
                  By confirming your order, you accept our{" "}
                  <Link href="#" className="underline">
                    General Terms and Conditions
                  </Link>
                  ,{" "}
                  <Link href="#" className="underline">
                    the Warranty Conditions
                  </Link>{" "}
                  and our{" "}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>

                <div className="flex items-center justify-center py-4 space-x-3">
                  <hr className="flex-1 border-b border-[#D6D6D6]" />
                  <h2 className="text-[#101010] text-lg text-center whitespace-nowrap">
                    Proceed without registration
                  </h2>
                  <hr className="flex-1 border-b border-[#D6D6D6]" />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[32px] text-[#101010] font-semibold mb-4">
                      1. Delivery Details
                    </h2>

                    <div className="mb-4">
                      <p className="mb-4 text-2xl text-[#404040] font-semibold">
                        Your Name
                      </p>
                      <div className="flex gap-4 mb-5">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="title"
                            value="Mr"
                            checked={formData.title === "Mr"}
                            onChange={handleInputChange}
                            className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                          />
                          Mr
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="title"
                            value="Mrs"
                            checked={formData.title === "Mrs"}
                            onChange={handleInputChange}
                            className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                          />
                          Mrs
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="title"
                            value="Agency"
                            checked={formData.title === "Agency"}
                            onChange={handleInputChange}
                            className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                          />
                          Agency
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-lg font-medium leading-7">
                            First Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Jhon"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-lg font-medium leading-7">
                            Surname<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-[#404040] mb-2">
                        Shipping Information{" "}
                        <span className="text-[#5F5F5F] text-base font-normal">
                          (no parcel delivery station)
                        </span>
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg text-[#101010] font-medium mb-1">
                            Address<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-lg text-[#101010] font-medium mb-1">
                              ZIP CODE<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-lg text-[#101010] font-medium mb-1">
                              City<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg text-[#101010] font-medium mb-1">
                            Nation<span className="text-red-500">*</span>
                          </label>
                          <select
                            name="nation"
                            value={formData.nation}
                            onChange={(e) => handleInputChange(e as any)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="">Select country</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                            <option value="IT">Italy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-lg text-[#101010] font-medium mb-1">
                            Further contact information
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="47012345"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="block text-2xl font-semibold text-[#101010] mb-1">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg text-[#101010] font-medium mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="yourname@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-lg text-[#101010] font-medium mb-1">
                            Phone
                          </label>
                          {/* <div className="flex">
                            <select
                              name="phoneCode"
                              value={formData.phoneCode}
                              onChange={(e) => handleInputChange(e as any)}
                              className="px-3 py-2 border rounded-l-md"
                            >
                              <option value="+32">+32</option>
                              <option value="+33">+33</option>
                              <option value="+34">+34</option>
                            </select>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="max-w-[75%] lg:max-w-full flex-1 px-3 py-2 border-y border-r rounded-r-md"
                              placeholder="470123456"
                            />
                          </div> */}

                          <div className="flex w-full">
                            <select
                              name="phoneCode"
                              value={formData.phoneCode}
                              onChange={(e) => handleInputChange(e as any)}
                              className="px-3 py-2 border rounded-l-md bg-white text-sm sm:text-base"
                            >
                              <option value="+32">+32</option>
                              <option value="+33">+33</option>
                              <option value="+34">+34</option>
                            </select>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="flex-1 px-3 py-2 border-y border-r rounded-r-md text-sm sm:text-base"
                              placeholder="470123456"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center text-lg">
                        <input
                          type="checkbox"
                          name="sameAddress"
                          checked={formData.sameAddress}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Billing address is the same as shipping address
                      </label>
                    </div>

                    <p className="text-lg text-[#2B2B2B] mb-4">
                      * Fields marked with an asterisk are mandatory
                    </p>
                    <Link href={"/paymentprocess"}>
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Continue
                      </button>
                    </Link>
                  </div>

                  <div className="border p-5 rounded">
                    <h2 className="text-xl font-semibold">2. Pay</h2>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>

              <div className="border-b pb-4 mb-4">
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
                    <button className="text-sm text-red-600 mt-2">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">1 Article</span>
                  <span>${orderItem.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Grand Total</span>
                  <span>
                    ${(orderItem.price * orderItem.quantity).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">The price includes VAT</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>12 Months Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Free Return</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Performs Like New</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-[70px] h-[48px] bg-[#F4B6C7] rounded flex items-center justify-center">
                  <span className="text-[#17120F] font-medium">Klarna</span>
                </div>
                <div className="w-[70px] h-12 bg-blue-100 rounded flex items-center justify-center">
                  <Image
                    src={"/payments/paypal.svg"}
                    className="w-[70px] h-[48px] object-fill"
                    width={70}
                    height={48}
                    alt="paypal"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                One of your products is subject to the margin regime according
                to the applicable tax law. VAT is not shown on the invoices
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
