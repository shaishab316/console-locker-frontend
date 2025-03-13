"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useGetProductsByIdsQuery } from "@/redux/features/products/GetProductByIds";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCreateOrderMutation } from "@/redux/features/order/OrderAPI";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
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

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(3);
  // const [selectedPayment, setSelectedPayment] = useState<
  //   "credit" | "paypal" | "klarna-installment" | "paypal-installment"
  // >("credit");
  const [quantity, setQuantity] = useState(1);
  const [orderIndex, setOrderIndex] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [cartData, setCartData] = useState([]);
  const [customerIdOnlocalStorage, setCustomerIdOnlocalStorage] = useState<
    string | number
  >("");
  const [secondaryPhone, setSecondaryPhone] = useState<string | number>("");

  const { t } = useTranslation();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [createOrder] = useCreateOrderMutation();

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

  const getProductIds = () => {
    const cart = JSON.parse(localStorage?.getItem("cart") || "[]");
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

  // get the cart data from localStorage?
  useEffect(() => {
    const cart = localStorage?.getItem("cart");

    if (cart) {
      try {
        setCartData(JSON.parse(cart));
      } catch {
        setCartData([]);
      }
    }
  }, []);

  // get the secondary phone from localStorage?
  useEffect(() => {
    const phone = localStorage?.getItem("secondary_phone");

    if (phone) {
      try {
        setSecondaryPhone(JSON.parse(phone));
      } catch {
        setSecondaryPhone("");
      }
    }
  }, []);

  // get the customer id from localStorage?
  useEffect(() => {
    const customer = JSON.parse(localStorage?.getItem("customer") || "null");

    if (customer) {
      try {
        setCustomerIdOnlocalStorage(customer?._id);
      } catch {
        setCustomerIdOnlocalStorage("");
      }
    }
  }, []);

  const getProductQuantity = (id: string) => {
    const cart = JSON.parse(localStorage?.getItem("cart") || "[]");
    const product = cart.find(
      (item: { productId: string }) => item.productId === id
    );

    return product ? product.quantity : 0;
  };

  const subtotal = products?.data?.products.reduce(
    (total: number, product: IProduct) => {
      const quantity = getProductQuantity(product?._id);

      // Multiply the quantity by the offer price of the product
      return total + quantity * product.offer_price;
    },
    0
  );

  const increaseQuantity = (id: string) => {
    // Get the cart data from localStorage?
    refetch();
    const cartData = JSON.parse(localStorage?.getItem("cart") || "[]");

    const itemExists = cartData.some((item: any) => item.productId === id);

    if (!itemExists) {
      toast.error("Please, add the product first!");
      return;
    }

    // Check if the product exists in the cart
    const updatedCart = cartData.map((item: any) => {
      if (item.productId === id) {
        return { ...item, quantity: item.quantity + 1 }; // Increase quantity
      }

      return item;
    });

    // Store the updated cart back into localStorage?
    localStorage?.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id: string) => {
    refetch();
    // Get the cart data from localStorage?
    const cartData = JSON.parse(localStorage?.getItem("cart") || "[]");

    const itemExists = cartData.some((item: any) => item.productId === id);

    if (!itemExists) {
      toast.error("Please, add the product first!");
      return;
    }

    // Check if the product exists in the cart
    const updatedCart = cartData.map((item: any) => {
      if (item.productId === id && item.quantity > 1) {
        // Decrease quantity only if it's greater than 1
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    // Store the updated cart back into localStorage?
    localStorage?.setItem("cart", JSON.stringify(updatedCart));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // check existing customer
  //   const existingCustomer = JSON.parse(
  //     localStorage?.getItem("customer") || "null"
  //   );

  //   if (existingCustomer && existingCustomer.email === formData.email) {
  //     router.push("/paymentprocess");
  //   }
  //   // Handle form submission
  //   const customer = {
  //     name: formData.firstName + " " + formData.surname,
  //     email: formData.email,
  //     address: {
  //       address: formData.address,
  //       zip_code: formData.zipCode,
  //       city: formData.city,
  //       country: formData.country,
  //     },
  //     phone: formData.phone,
  //   };

  //   const response = await createCustomer(customer);

  //   if (response?.error) {
  //     console.log(response?.error);
  //     return;
  //   }

  //   localStorage?.setItem("customer", JSON.stringify(response?.data?.data));

  //   console.log(response?.data?.data);
  // };

  const removeItem = (id: string) => {
    refetch();
    setOrderIndex(0);
    const cart = JSON.parse(localStorage?.getItem("cart") || "[]");
    const updatedCart = cart.filter(
      (item: { productId: string }) => item.productId !== id
    );

    localStorage?.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePrevious = () => {
    if (orderIndex === products?.data?.products.length - 1) {
      setOrderIndex(0);
      return;
    }
    setOrderIndex((prev) => prev + 1);
  };

  const handleNext = () => {
    if (orderIndex === products?.data?.products.length - 1) {
      setOrderIndex(0);
      return;
    }
    setOrderIndex((prev) => prev + 1);
  };

  const formattedCartData = cartData.map((item: any) => ({
    product: item.productId,
    quantity: item.quantity,
  }));

  const handlePayment = async () => {
    const orderInformation = {
      productDetails: formattedCartData,
      customer: customerIdOnlocalStorage,
      secondary_phone: secondaryPhone,
    };

    const response = await createOrder(orderInformation).unwrap();

    if (response?.success) {
      toast.success(response?.message);

      window.location.href = response?.data?.checkout_url;

      // do empty cart after payment success
      // localStorage?.removeItem("cart");
    } else if (response?.error) {
      toast.error(response?.error);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F5F7] pt-8 pb-16">
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
          <div className="lg:col-span-2 space-y-6 bg-[#FDFDFD] rounded-xl p-6">
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
                <h2 className="text-2xl font-semibold text-[#101010] capitalize">
                  2. {"pay"}
                </h2>
              </div>

              <div className="lg:p-7 pt-6">
                <div className="space-y-6">
                  <h3 className="font-semibold text-2xl text-[#404040] capitalize">
                    {t("payNow")}:
                  </h3>

                  {/* Pay Now */}
                  <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
                    {/* Credit Card Option */}
                    <div
                      className={`flex items-center justify-between space-x-4 p-2.5 lg:p-5 border rounded-md ${
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
                          <span className="text-base lg:text-lg font-medium text-[#101010]">
                            {t("creditDebitCard")}
                          </span>
                          <span className="text-[#5F5F5F] text-xs md:text-base">
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
                          <span className="text-base lg:text-lg font-medium text-[#101010]">
                            {t("payNow")}
                          </span>
                          <span className="text-[#5F5F5F] text-xs md:text-base">
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
                          <span className="text-base lg:text-lg font-medium text-[#101010]">
                            {t("payInInstallments")}:
                          </span>
                          <span className="text-[#5F5F5F] text-xs md:text-base">
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
                        className="mr-2 scale-150 accent-black text-lg text-[#101010] font-medium"
                      />
                      <label
                        htmlFor="klarna"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <p className="flex flex-col mr-3">
                          <span className="text-base lg:text-lg font-medium text-[#101010]">
                            {t("payInInstallments")}:
                          </span>
                          <span className="text-[#5F5F5F] text-xs md:text-base">
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
                {/* <Link href={"/empty"}> */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition-colors"
                >
                  {t("proceedToPurchase")}
                </button>
                {/* </Link> */}

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
            {/* <h2 className="text-2xl font-semibold text-[#101010] mb-6">
              {t("yourOrder")}
            </h2> */}

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#101010] mb-4">
                {t("yourOrder")} ({products?.data?.products.length})
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="w-8 h-8 border flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="text-black" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 border flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="text-black" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            {/* <div className="flex items-start space-x-4 mb-6">
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
            </div> */}
            <div className="border-b pb-4 mb-4">
              <div className="flex gap-4">
                <div className="relative w-[120px] h-[120px]">
                  <Image
                    src={`${API_URL}/${products?.data?.products[orderIndex].images[0]}`}
                    alt={orderItem.name}
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] object-cover"
                  />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-medium">
                    {products?.data?.products[orderIndex].name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("warranty")}:{" "}
                    {products?.data?.products[orderIndex]?.model} |{" "}
                    {products?.data?.products[orderIndex]?.memory}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("condition")}:{" "}
                    {products?.data?.products[orderIndex]?.controller}
                  </p>
                  {/*
                   */}
                  <p className="text-sm text-gray-600">
                    {t("salesAndShipping")}: Console & you
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    $
                    {(
                      products?.data?.products[orderIndex]?.offer_price *
                      getProductQuantity(
                        products?.data?.products[orderIndex]?._id
                      )
                    ).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          products?.data?.products[orderIndex]?._id
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center border rounded"
                    >
                      -
                    </button>
                    <span>
                      {getProductQuantity(
                        products?.data?.products[orderIndex]?._id
                      )}
                    </span>
                    <button
                      onClick={() =>
                        increaseQuantity(
                          products?.data?.products[orderIndex]?._id
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      removeItem(products?.data?.products[orderIndex]?._id)
                    }
                    className="text-sm text-red-600 mt-2"
                  >
                    Remove
                  </button>
                </div>
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
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span className="text-gray-500">{t("included")}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{t("grandTotal")}</span>
                <span>${subtotal}</span>
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
