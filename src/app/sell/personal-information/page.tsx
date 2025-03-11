"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import PaymentInMobile from "@/components/paymentInMobile/PaymentInMobile";
import {
  useGetASingleProductQuery,
  useSellUltimateProductMutation,
} from "@/redux/features/sell/SellProductAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Loading from "@/app/loading";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  city: string;
  address: string;
  apartment: string;
  country: string;
  paymentMethod: "bank" | "paypal";
  iban: string;
  acceptTerms: boolean;
}

interface UserSelectedOption {
  quesId: string;
  optionId: string;
}

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priceEstimate, setPriceEstimate] = useState<number>(0);
  const [productId, setProductId] = useState<string | null>(null);
  const [customerEmailOnLocalStorage, setCustomerEmailOnLocalStorage] =
    useState<string | null>(null);
  const [customerIdOnLocalStorage, setCustomerIdOnLocalStorage] = useState<
    string | null
  >(null);

  const [userSelectedOptions, setUserSelectedOptions] = useState<
    UserSelectedOption[]
  >([]);

  const [sellProduct] = useSellUltimateProductMutation();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    city: "",
    address: "",
    apartment: "",
    country: "Italy",
    paymentMethod: "bank",
    iban: "",
    acceptTerms: false,
  });

  // const userSelectedOptions = useSelector(
  //   (state: RootState) => state?.questionSlice?.questions
  // );

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const { t } = useTranslation();

  const transformedData = userSelectedOptions.map((item) => ({
    quesId: item.quesId,
    optionId: item.optionId,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Submitted successfully!");

    if (!customerIdOnLocalStorage || !productId) {
      toast.error("Customer or product information is missing.");
      return;
    }

    const data = {
      customer: customerIdOnLocalStorage,
      product: productId,
      questions: transformedData,
      payment: {
        paypal: "payol37324828@example.com",
      },
    };

    const stringifiedData = JSON.stringify(data);

    console.log(stringifiedData);

    if (customerEmailOnLocalStorage) {
      const res = await sellProduct(data);
      console.log(res);
      return;
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      city: "",
      address: "",
      apartment: "",
      country: "Italy",
      paymentMethod: "bank",
      iban: "",
      acceptTerms: false,
    });

    console.log("formData in submit", formData);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   toast.success("Submitted successfully!");

  //   const data = {
  //     customer: customerIdOnLocalStorage,
  //     product: productId,
  //     questions: transformedData,
  //     payment: {
  //       paypal: "payol37324828@example.com",
  //     },
  //   };

  //   const stringifiedData = JSON.stringify(data);

  //   console.log({ stringifiedData });

  //   // if (customerEmailOnLocalStorage) {
  //   //   const res = sellProduct(stringifiedData);
  //   //   console.log({ res });

  //   //   return;
  //   // }

  //   // setFormData({
  //   //   firstName: "",
  //   //   lastName: "",
  //   //   email: "",
  //   //   phone: "",
  //   //   zipCode: "",
  //   //   city: "",
  //   //   address: "",
  //   //   apartment: "",
  //   //   country: "",
  //   //   paymentMethod: "bank",
  //   //   iban: "",
  //   //   acceptTerms: false,
  //   // });

  //   // console.log("formData in submit", formData);
  // };

  // get customer data from localstorage
  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customer") || "null");

    if (customerData) {
      setFormData((prev) => ({
        ...prev,
        firstName: customerData.name.split(" ")[0],
        lastName: customerData.name.split(" ")[1] || "",
        address: customerData.address.address,
        zipCode: customerData.address.zip_code,
        city: customerData.address.city,
        country: customerData.address.country,
        email: customerData.email,
        phone: customerData.phone,
      }));

      setCustomerEmailOnLocalStorage(customerData.email);
      setCustomerIdOnLocalStorage(customerData._id);
    }
  }, []);

  // get product id from localstorage
  useEffect(() => {
    const storedProductId = localStorage.getItem("getEstimateProductId");
    if (storedProductId) {
      try {
        setProductId(JSON.parse(storedProductId));
      } catch {
        setProductId(null);
      }
    }
  }, []);

  // get product price from localstorage
  useEffect(() => {
    const storedPrice = localStorage.getItem("getEstimatePrice");
    if (storedPrice) {
      try {
        setPriceEstimate(JSON.parse(storedPrice));
      } catch {
        setPriceEstimate(0);
      }
    }
  }, []);

  // get user selected options from localstorage
  useEffect(() => {
    const storedUserSelectedOptions = localStorage.getItem(
      "userSelectedOptions"
    );
    if (storedUserSelectedOptions) {
      try {
        setUserSelectedOptions(JSON.parse(storedUserSelectedOptions));
      } catch {
        setUserSelectedOptions([]);
      }
    }
  }, []);

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useGetASingleProductQuery(productId as string);

  if (isLoading) {
    return <Loading />;
  }

  console.log({ transformedData });

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
                      htmlFor="zipCode"
                      className="block text-lg font-medium text-[#101010] mb-1"
                    >
                      Postcode{" "}
                      <span className="text-red-500 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-lg font-medium text-[#101010] mb-1"
                    >
                      {t("townCity")}
                      <span className="text-red-500 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address
"
                    className="block text-lg font-medium text-[#101010] mb-1"
                  >
                    {t("streetName")}{" "}
                    <span className="text-red-500 font-semibold">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.address}
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
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
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
                      src={`${API_URL}${
                        product?.data?.image ? product?.data?.image : ""
                      }`}
                      // src={''}
                      alt="Playstation 4"
                      width={300}
                      height={300}
                      className="w-[127px] h-[120px] object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#101010] font-medium mb-6">
                      {product?.data?.name}
                    </h3>
                    <p className="text-lg text-[#2B2B2B]">
                      {t("yourPriceEstimate")}
                    </p>
                    <p className="text-2xl text-[#101010] font-semibold">
                      ${priceEstimate}
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
