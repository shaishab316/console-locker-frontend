"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import PaymentInMobile from "@/components/paymentInMobile/PaymentInMobile";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  town: string;
  streetName: string;
  apartment: string;
  country: string;
  paymentMethod: "bank" | "paypal";
  iban: string;
  acceptTerms: boolean;
}

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    town: "",
    streetName: "",
    apartment: "",
    country: "",
    paymentMethod: "bank",
    iban: "",
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    toast.success("Submitted successfully!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postcode: "",
      town: "",
      streetName: "",
      apartment: "",
      country: "",
      paymentMethod: "bank",
      iban: "",
      acceptTerms: false,
    });
  };

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
  };

  console.log(formData);

  return (
    <>
      <div className="hidden md:block min-h-screen bg-[#F2F5F7] py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            {/* Main Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-[32px] font-semibold text-[#101010] mb-6">
                  {t("personalInformation")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-lg font-medium text-[#101010] mb-1"
                    >
                      {t("firstName")}
                      <span className="text-red-500 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-lg font-medium text-[#101010] mb-1"
                    >
                      {t("lastName")}
                      <span className="text-red-500 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-[#101010] mb-1"
                  >
                    {t("email")}{" "}
                    <span className="text-red-500 font-semibold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-lg font-medium text-[#101010] mb-1"
                  >
                    {t("phone")}
                  </label>
                  <div className="flex">
                    <div className="w-20 mr-2">
                      <button
                        type="button"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between"
                      >
                        <Image
                          src="/germany.png"
                          alt="German flag"
                          width={20}
                          height={15}
                          className="mr-1"
                        />
                        +42
                      </button>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    Please provide a mobile phone number in case we need to
                    contact you about your order.
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">{t("Address")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="postcode"
                      className="block text-lg font-medium text-[#101010] mb-1"
                    >
                      Postcode{" "}
                      <span className="text-red-500 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.postcode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="town"
                      className="block text-lg font-medium text-[#101010] mb-1"
                    >
                      {t("townCity")}
                      <span className="text-red-500 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      id="town"
                      name="town"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.town}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="streetName"
                    className="block text-lg font-medium text-[#101010] mb-1"
                  >
                    {t("streetName")}{" "}
                    <span className="text-red-500 font-semibold">*</span>
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.streetName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="apartment"
                    className="block text-lg font-medium text-[#101010] mb-1"
                  >
                    {t("appointment")}
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.apartment}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-lg font-medium text-[#101010] mb-1"
                  >
                    Country{" "}
                    <span className="text-red-500 font-semibold">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select a country</option>
                    <option value="IT">Italy</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">{t("payment")}</h2>
                <div className="space-y-4 mb-8">
                  <label
                    onClick={() => handlePayment("bank")}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-[#101010] text-xl font-semibold">
                        Bank transfer (IBAN)
                      </span>
                    </div>
                    <span className="font-medium">$5.00</span>
                  </label>

                  {/* {formData.paymentMethod === "paypal" && ( */}
                  {paymentMethod === "bank" && (
                    <div className="pl-6">
                      <label
                        htmlFor="iban"
                        className="block text-lg font-medium text-[#101010] mb-1"
                      >
                        Bank details, IBAN{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        id="iban"
                        name="iban"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Example: FI14 1009 3000 1234 58"
                        value={formData.iban}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>

                {/* Paypal Payment */}
                <div>
                  <div className="space-y-4">
                    <label
                      onClick={() => handlePayment("paypal")}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={paymentMethod === "paypal"}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-[#101010] text-xl font-semibold">
                          PayPal: $5,00 minus $0,10 fees
                        </span>
                      </div>
                      <span className="font-medium">$5.00</span>
                    </label>

                    {/* {formData.paymentMethod === "paypal" && ( */}
                    {paymentMethod === "paypal" && (
                      <div className="pl-6">
                        <label
                          htmlFor="iban"
                          className="block text-lg font-medium text-[#101010] mb-1"
                        >
                          Bank details, IBAN{" "}
                          <span className="text-red-500 font-semibold">*</span>
                        </label>
                        <input
                          type="text"
                          id="iban"
                          name="iban"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Example: FI14 1009 3000 1234 58"
                          value={formData.iban}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* take user email for receive payment */}
                {/* <div className="mt-8">
                <label
                  htmlFor="streetName"
                  className="block text-lg font-medium text-[#101010] mb-1"
                >
                  Email <span className="text-red-500 font-semibold">*</span>
                </label>
                <input
                  type="email"
                  id="streetName"
                  name="streetName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.streetName}
                  onChange={handleInputChange}
                />
              </div> */}

                {/* Terms and Submit */}
                <div className="space-y-4 mt-6">
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {t("send")}
                  </button>

                  <p className="ml-2 text-base text-[#2B2B2B]">
                    {t("next5TermsOfSale1")}{" "}
                    <Link
                      href="#"
                      className="text-[#222C9B] font-medium hover:underline"
                    >
                      {t("next5TermsOfSale2")}
                    </Link>{" "}
                    {t("next5TermsOfSale3")}{" "}
                    <Link
                      href="#"
                      className="text-[#222C9B] font-medium hover:underline"
                    >
                      {t("next5TermsOfSale4")}
                    </Link>
                  </p>
                </div>
              </div>
            </form>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                <h2 className="text-2xl text-[#101010] font-semibold mb-6">
                  {t("summary")}
                </h2>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src="/sell/sell-checkout-product.png"
                      alt="Playstation 4"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#101010] font-medium">
                      Playstation 4
                    </h3>
                    <p className="text-lg text-[#2B2B2B]">
                      {t("yourPriceEstimate")}
                    </p>
                    <p className="text-2xl text-[#101010] font-semibold">
                      $5.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* only for mobile */}
      <div className="md:hidden">
        <PaymentInMobile />
      </div>
    </>
  );
}
