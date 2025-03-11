"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import ReviewCarousel from "@/components/share/review-carousel/ReviewCarousel";
import Container from "@/components/common/Container";
import { BlogCarousel } from "@/components/home/blogs/BlogCarousel";
import ConsoleModal from "@/components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/modal/modalSlice";

import ProductSpecification from "@/components/product/ProductSpecification";
import ProductDescription from "@/components/product/ProductDescription";
import Link from "next/link";
import { showTradeInDescription } from "@/redux/features/tradeIn/showTradeInSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "@/redux/store/store";
import {
  useFindSlugProductQuery,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/products/ProductAPI";
import Loading from "@/app/loading";
import { useParams, useRouter } from "next/navigation";
import { useSellProductQuery } from "@/redux/features/sell/SellProductAPI";
import toast from "react-hot-toast";

interface Product {
  title: string;
  price: string;
  image: string;
  description: string;
  models: string[];
  controllers: number[];
  memories: string[];
  conditions: string[];
}

interface RelatedProduct {
  _id: string;
  name: string;
  condition: string;
  price: string;
  images: [number];
  brand: string;
  slug: string;
}

const ProductDetailsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedController, setSelectedController] = useState<
    string | number | undefined
  >();
  const [selectedMemory, setSelectedMemory] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [deviceValue, setDeviceValue] = useState(5.0);
  const [deviceModel, setDeviceModel] = useState("IpHOME 8 PLUS, 500gb");
  const [addTradeIn, setAddTradeIn] = useState(true);
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state?.modal?.modal);
  const isOpenTradeIn = useSelector(
    (state: RootState) => state?.showTradeInData?.isOpenTradeIn
  );
  const modalTradeInData = useSelector(
    (state: RootState) => state?.modalTradeInDataSlice?.modalTradeInData
  );

  const { t } = useTranslation();
  const { slug } = useParams();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const {
    data: singleProduct,
    isLoading,
    isError,
  } = useGetSingleProductQuery({
    slug: slug as string | undefined,
  });

  const { data: slugRes } = useFindSlugProductQuery(
    {
      productName: singleProduct?.data?.product?.name,
      condition: selectedCondition,
      controller: selectedController,
      memory: selectedMemory,
      model: selectedModel,
    },
    {
      skip:
        !selectedCondition ||
        !selectedController ||
        !selectedMemory ||
        !selectedModel,
    }
  );

  useEffect(() => {
    if (!singleProduct?.data?.product?.slug || !slugRes?.data?.slug) return;

    if (singleProduct?.data?.product?.slug !== slugRes?.data?.slug)
      router.replace(`/buy/${slugRes?.data?.slug}`);
  }, [slugRes]);

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductsQuery({});

  // Choose your console
  const { data: consoleLists } = useSellProductQuery({
    limit: 10,
  });

  useEffect(() => {
    console.log({ singleProduct });

    setSelectedModel(singleProduct?.data?.product?.model);
    setSelectedController(singleProduct?.data?.product?.controller);
    setSelectedMemory(singleProduct?.data?.product?.memory);
    setSelectedCondition(singleProduct?.data?.product?.condition);
  }, [singleProduct]);

  if (isLoading || productsLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error Occur!</div>;

  const product = singleProduct?.data;

  const handleTrade = () => {
    dispatch(toggleModal());
    setAddTradeIn((prev) => !prev);
  };

  const startOver = () => {
    dispatch(toggleModal());
    dispatch(showTradeInDescription());
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newProduct = {
      productId: product?.product?._id,
      quantity: 1,
      tradeIn: modalTradeInData || null,
    };

    // Check if the productId already exists to prevent duplicates
    interface CartItem {
      productId: string;
      quantity: number;
      tradeIn: any; // Replace 'any' with the appropriate type if known
    }

    const isDuplicate: boolean = existingCart.some(
      (item: CartItem) => item.productId === newProduct.productId
    );

    if (isDuplicate) {
      const updatedCart = existingCart.map((item: CartItem) => {
        if (item.productId === newProduct.productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    if (!isDuplicate) {
      toast.success("Product added to cart successfully!");
      existingCart.push(newProduct); // Add new product
      localStorage.setItem("cart", JSON.stringify(existingCart)); // Save updated cart
    }

    router.push("/cart");
  };

  console.log(
    "addition info ...........",
    singleProduct?.data?.product?.product_type
  );

  return (
    <div>
      {/* only for desktop */}
      <div className="hidden lg:block py-16 bg-[#F2F5F7]">
        <Container>
          <div className="hidden lg:block">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="xl:w-1/2">
                <Image
                  src={`${API_URL}${product?.product?.images[0]}`}
                  alt="Console Locker"
                  width={1400}
                  height={900}
                  className="rounded-lg w-full "
                />
              </div>

              <div className="xl:w-1/2">
                <div className="flex justify-between items-center mb-2.5">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl lg:text-[40px] text-[#101010] font-semibold">
                      {product?.product?.name}
                    </h1>
                    <p className="text-[#2B2B2B] text-lg mb-2 flex items-center justify-between">
                      {" "}
                      {selectedModel} | {selectedMemory} | Black{" "}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 items-end">
                    <h2 className="text-2xl lg:text-5xl font-semibold text-[#101010]">
                      ${product?.product?.offer_price}
                    </h2>
                    <p className="text-lg text-[#6B6B6B]">incl. tax</p>
                  </div>
                </div>

                {/* reviews */}
                <div className="flex items-center gap-2.5 mb-6">
                  <p className="flex items-center gap-1">
                    {[...Array(product?.product?.ratings)].map((i) => (
                      <svg
                        key={i}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" fill="#00B67A" />
                        <path
                          d="M11.2392 7.14165C11.4787 6.4046 12.5214 6.40461 12.7609 7.14165L13.6166 9.77509C13.7237 10.1047 14.0309 10.3279 14.3774 10.3279H17.1464C17.9214 10.3279 18.2436 11.3196 17.6166 11.7751L15.3765 13.4026C15.0961 13.6064 14.9788 13.9675 15.0859 14.2971L15.9415 16.9305C16.181 17.6676 15.3374 18.2805 14.7104 17.8249L12.4703 16.1974C12.1899 15.9937 11.8102 15.9937 11.5299 16.1974L9.28972 17.8249C8.66275 18.2805 7.81917 17.6676 8.05865 16.9305L8.9143 14.2971C9.0214 13.9675 8.90408 13.6064 8.62369 13.4026L6.38355 11.7751C5.75658 11.3196 6.0788 10.3279 6.85378 10.3279H9.62274C9.96932 10.3279 10.2765 10.1047 10.3836 9.77509L11.2392 7.14165Z"
                          fill="#FDFDFD"
                        />
                      </svg>
                    ))}
                  </p>
                  <h2 className="font-medium">{product?.product?.ratings}</h2>
                  <p className="underline">
                    ({product?.product?.reviewCount} reviews)
                  </p>
                </div>

                {/* Model */}
                <div className="mb-6">
                  <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                    {t("model")}:
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {product?.meta?.models?.map((model: string) => (
                      <button
                        key={model}
                        disabled={selectedModel === model}
                        className={`w-[110px] md:w-[200px] 2xl:w-[256px] h-[91px] lg:h-[111px] lg:flex-none flex flex-col items-center justify-center lg:px-20 sm:px-10 py-5 border rounded-md ${
                          selectedModel === model
                            ? "border-black bg-[#E7E7E7] cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedModel(model)}
                      >
                        {model}
                        <Check />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#daedf2] w-full p-6 rounded-lg border-l-4 border-black">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <p className="text-[#6B6B6B]">
                      <span className="text-base text-[#101010] font-normal">
                        {t("model")}:{" "}
                      </span>
                      The phone will have heavy signs of wear, such as deeper
                      scratches, dents and other marks. The phone is unlocked,
                      fully tested and works like new.
                    </p>
                  </div>
                  <p className="text-[#2E7EF6] text-base font-medium underline cursor-pointer">
                    Learn more
                  </p>
                </div>

                {/* Controller */}
                <div className="mb-6 mt-3">
                  <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                    {t("controller")}:
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {product?.meta?.controllers?.map((controller: number) => (
                      <button
                        key={controller}
                        disabled={selectedController === controller}
                        className={`w-[110px] md:w-[200px] 2xl:w-[256px] h-[91px] lg:h-[111px] lg:flex-none flex flex-col items-center justify-center lg:px-20 sm:px-10 py-5 border rounded-md ${
                          selectedController === controller
                            ? "border-black bg-[#E7E7E7] cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedController(controller)}
                      >
                        {controller}
                        <Check />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Memory */}
                <div className="mb-6">
                  <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                    {t("memory")}:
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {product?.meta?.memories?.map((memory: string) => (
                      <button
                        key={memory}
                        disabled={selectedMemory === memory}
                        className={`w-[110px] md:w-[200px] 2xl:w-[256px] h-[91px] lg:h-[111px] flex flex-col items-center justify-center lg:px-20 sm:px-10  py-5 border rounded-md ${
                          selectedMemory === memory
                            ? "border-black bg-[#E7E7E7] cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedMemory(memory)}
                      >
                        {memory}
                        <Check />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div className="mb-6">
                  <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                    {t("conditions")}:
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {product?.meta?.conditions?.map((condition: string) => (
                      <button
                        key={condition}
                        disabled={selectedCondition === condition}
                        className={`w-[110px] md:w-[200px] 2xl:w-[256px] h-[91px] lg:h-[111px] lg:flex-none flex flex-col items-center justify-center lg:px-20 sm:px-10  py-5 border rounded-md ${
                          selectedCondition === condition
                            ? "border-black bg-[#E7E7E7] cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedCondition(condition)}
                      >
                        {condition}
                        <Check />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trade-in */}
                <div className="mb-6">
                  {!isOpenTradeIn ? (
                    <>
                      <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                        {t("tradeIn")}:
                      </h4>
                      <button
                        className={`w-[120px] md:w-[200px] 2xl:w-[256px] h-[91px] lg:h-[111px] lg:flex-none flex flex-col items-center justify-center lg:px-20 sm:px-10  py-8 border rounded-md ${
                          modalState
                            ? "border-black bg-[#E7E7E7]"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          handleTrade();
                        }}
                      >
                        {modalState ? "No" : "Yes"}
                      </button>
                    </>
                  ) : (
                    <div>
                      {/* Conditions Box */}
                      <div className="bg-[#f0f7ff] p-4 rounded-lg mb-6">
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium text-gray-900">
                            Conditions:
                          </span>{" "}
                          The phone will have heavy signs of wear, such as
                          deeper scratches, dents and other marks. The phone is
                          unlocked, fully tested and works like new.
                        </p>
                        <button className="text-blue-600 hover:underline text-sm">
                          Learn More
                        </button>
                      </div>

                      {/* Trade-in Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Trade-in
                        </h2>
                        <button
                          onClick={() => startOver()}
                          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                          {t("startOver")}
                        </button>
                      </div>

                      {/* Value Display */}
                      <div className="bg-[#e8f7f1] p-4 rounded-lg mb-6">
                        <div className="flex items-start justify-start gap-2">
                          <button className="text-gray-600 hover:text-gray-900 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                          </button>
                          <p className="text-center text-gray-600">
                            yOUR {deviceModel} IS VALUED AT $
                            {deviceValue.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="text-gray-600 border-l-4 border-black rounded-s-lg">
                        <p className="p-3">
                          After trade-in price estimate. We will ship the free
                          trade-in kit to your home address and refund the
                          trade-in value within 2-3 business days from receiving
                          the phone.
                        </p>
                      </div>

                      <div className="my-4 border-b"></div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <p className="text-black text-[18px] font-medium flex items-center justify-between">
                    {selectedModel} | {selectedMemory} | Black
                  </p>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {product.price}
                    </h2>
                    <span className="text-sm text-gray-500">incl. tax</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-normal mb-2">
                    {t("pleaseSelectYourConsole")}
                  </h4>

                  <div className="relative w-full">
                    <select
                      name="phoneCode"
                      // value={formData.phoneCode}
                      // onChange={(e) => handleInputChange(e as any)}
                      className="px-4 py-3 border rounded-3xl bg-white text-sm sm:text-base appearance-none w-full"
                    >
                      <option value="" defaultValue={"Choose a console"}>
                        {t("chooseAConsole")}
                      </option>
                      {/* {consoleLists?.data?.products?.map((console: any) => (
                    
                  ))} */}
                      <option value="PlayStation 4 Pro">PlayStation 5</option>
                      {/* <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="OLED Steam Deck">OLED Steam Deck</option>
                  <option value="PlayStation 4 Pro">PlayStation 4 Pro</option> */}
                    </select>

                    <div className="absolute inset-y-0 right-0 flex items-center px-3">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#DAEDF2] p-3 rounded-md">
                      <Image
                        src="/sell/ship-ready.svg"
                        width={20}
                        height={20}
                        alt="usb"
                      />
                    </div>
                    <h2 className="text-base font-medium text-[#101010]">
                      Ready to be shipped.
                    </h2>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="h-14 flex items-center justify-center bg-black text-white text-center px-6 py-3 rounded-md"
                  >
                    {t("addToCart")}
                  </button>
                </div>
              </div>
            </div>

            {/* related products */}
            <div className="mt-16">
              <h3 className="text-[32px] font-semibold mb-4">
                You may also like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {singleProduct?.data?.relatedProducts
                  ?.slice(0, 4)
                  .map((product: RelatedProduct) => (
                    <Link
                      key={product._id}
                      href={`/buy/${product?.slug}`}
                      className="rounded-lg"
                      passHref
                    >
                      <div className="bg-[#FDFDFD] hover:shadow-md border border-gray-100 rounded-lg pb-2">
                        <Image
                          src={`${API_URL}${product.images[0]}`}
                          alt={product?.title}
                          width={300}
                          height={387}
                          className="object-center object-cover w-full h-[387px] rounded-t-lg"
                        />
                        <div className="px-3">
                          <h3 className="text-xl text-[#101010] font-semibold mb-2 mt-5">
                            {product?.name}
                          </h3>
                          <div className="text-[#2B2B2B] mb-2 flex items-center justify-between">
                            <div>
                              Condition:
                              <span className="font-medium text-[#2B2B2B]">
                                {product.condition}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
                            <div className="flex items-center gap-2">
                              <p className="text-[#2B2B2B] text-base">Price:</p>
                              <span className="text-[#00B67A] text-lg font-semibold">
                                {product.price}
                              </span>
                            </div>
                            <span className="text-sm text-[#919191] line-through">
                              New: 350
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <ProductSpecification />
            <ProductDescription />

            {/* {tradeIn && <ConsoleModal  />} */}
            {modalState && <ConsoleModal />}

            {/* <ProductDescription /> */}
            {/* <Blogs /> */}
          </div>
        </Container>

        <div className="hidden md:block">
          <ReviewCarousel />
          <BlogCarousel />
        </div>
      </div>

      {/* only for mobile */}
      <div className="md:hidden">
        <div className="w-full">
          <Image
            src={`${API_URL}${product?.product?.images[0]}`}
            className="w-full"
            width={700}
            height={800}
            alt="xbox"
          />
        </div>

        <div
          className={`${
            singleProduct?.data?.product?.product_type === "xbox" &&
            "bg-[#49A947]"
          } ${
            singleProduct?.data?.product?.product_type === "playstation" &&
            "bg-[#1861C0]"
          } ${
            singleProduct?.data?.product?.product_type === "nintendo" &&
            "bg-[#D61D1E]"
          } -mt-1`}
        >
          {/* product into */}
          <div className="pt-8 mx-5">
            <div className="pt-10 pb-3 border-b-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg text-[#FDFDFD]">Review</h3>

                  <div className="flex items-center">
                    <p className="flex items-center gap-1">
                      {[...Array(product?.product?.ratings)].map((i) => (
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2122_18709)">
                            <path
                              d="M11.0202 2.50976L12.5488 5.27412C12.7583 5.65357 13.2839 6.01403 13.7162 6.06276L16.2893 6.3862C17.9368 6.58972 18.3617 7.75894 17.2405 8.98361L15.3303 11.0584C15.0114 11.406 14.8458 12.0693 14.974 12.5246L15.6433 14.9672C16.1697 16.8957 15.1686 17.695 13.4093 16.7478L10.9516 15.4243C10.504 15.1823 9.79299 15.2175 9.37248 15.4892L7.03288 17.0035C5.35804 18.086 4.2923 17.3734 4.6598 15.4099L5.1304 12.925C5.21826 12.4605 5.00762 11.8124 4.65993 11.4935L2.57381 9.58021C1.35634 8.45484 1.68383 7.2554 3.30616 6.91534L5.8393 6.38621C6.26681 6.29335 6.76225 5.90146 6.93619 5.50274L8.23399 2.61726C8.94337 1.06262 10.1949 1.01363 11.0202 2.50976Z"
                              fill="#FDFDFD"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2122_18709">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0 0.0507812)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ))}
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4421 2.975L12.9087 5.90833C13.1087 6.31667 13.6421 6.70833 14.0921 6.78333L16.7504 7.225C18.4504 7.50833 18.8504 8.74167 17.6254 9.95833L15.5587 12.025C15.2087 12.375 15.0171 13.05 15.1254 13.5333L15.7171 16.0917C16.1837 18.1167 15.1087 18.9 13.3171 17.8417L10.8254 16.3667C10.3754 16.1 9.63375 16.1 9.17541 16.3667L6.68375 17.8417C4.90041 18.9 3.81708 18.1083 4.28375 16.0917L4.87541 13.5333C4.98375 13.05 4.79208 12.375 4.44208 12.025L2.37541 9.95833C1.15875 8.74167 1.55041 7.50833 3.25041 7.225L5.90875 6.78333C6.35041 6.70833 6.88375 6.31667 7.08375 5.90833L8.55041 2.975C9.35041 1.38333 10.6504 1.38333 11.4421 2.975Z"
                          stroke="#FDFDFD"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#FDFDFD] flex items-center gap-1 h-10 px-5 rounded-lg"
                  >
                    <span>Add</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 14.5508C5.77614 14.5508 6 14.3269 6 14.0508C6 13.7746 5.77614 13.5508 5.5 13.5508C5.22386 13.5508 5 13.7746 5 14.0508C5 14.3269 5.22386 14.5508 5.5 14.5508Z"
                        stroke="#404040"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.5 14.5508C12.7761 14.5508 13 14.3269 13 14.0508C13 13.7746 12.7761 13.5508 12.5 13.5508C12.2239 13.5508 12 13.7746 12 14.0508C12 14.3269 12.2239 14.5508 12.5 14.5508Z"
                        stroke="#404040"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.5 3.55078H3.5L5 12.0508H13"
                        stroke="#404040"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 10.0508H12.795C12.8528 10.0508 12.9089 10.0308 12.9536 9.99418C12.9983 9.95755 13.029 9.90654 13.0403 9.84984L13.9403 5.34984C13.9476 5.31356 13.9467 5.27611 13.9377 5.24021C13.9288 5.20431 13.9119 5.17084 13.8885 5.14223C13.865 5.11362 13.8355 5.09057 13.802 5.07476C13.7686 5.05895 13.732 5.05076 13.695 5.05078H4"
                        stroke="#404040"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="10"
                        y="1.05078"
                        width="8"
                        height="8"
                        rx="4"
                        fill="#FDFDFD"
                      />
                      <path
                        d="M14 9.05078C16.2 9.05078 18 7.25078 18 5.05078C18 2.85078 16.2 1.05078 14 1.05078C11.8 1.05078 10 2.85078 10 5.05078C10 7.25078 11.8 9.05078 14 9.05078Z"
                        stroke="#FD9A34"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.667 5.05078H15.3337"
                        stroke="#FD9A34"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 6.38444V3.71777"
                        stroke="#FD9A34"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-10 pb-3 border-b-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-[#FDFDFD]">
                    {product?.product?.name}
                  </h2>
                  <h3 className="text-lg text-[#FDFDFD]">
                    {selectedModel} | {selectedMemory} | {selectedCondition}
                  </h3>
                </div>

                <h2 className="text-[40px] font-semibold text-[#FDFDFD]">
                  ${product?.product?.offer_price}
                </h2>
              </div>
            </div>
          </div>

          {/* Select the Xbox One model */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-xl font-semibold text-center whitespace-nowrap"
                }
              >
                {t("consoleHeaderTitle")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            {/* Select the Xbox One model */}

            <div className="flex flex-col gap-4 px-5 py-5">
              {product?.meta?.models?.map((model: string) => (
                <div
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`h-16 rounded-md flex items-center justify-center border-4 border-[#FDFDFD] ${
                    model === selectedModel
                      ? "bg-[#FDFDFD] text-[#64B95E]"
                      : "bg-transparent"
                  } border border-[#919191] text-center text-2xl font-semibold leading-[36px]`}
                >
                  {model}
                </div>
              ))}
            </div>
          </div>

          {/* What is the storage capacity? (Not applicable for Xbox One X) */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                }
              >
                {t("storageCapacity")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            <div className="p-5 flex items-center gap-4">
              {product?.meta?.memories?.map((memory: string) => (
                <div
                  key={memory}
                  onClick={() => setSelectedMemory(memory)}
                  className={`${
                    memory === selectedMemory
                      ? "bg-[#FDFDFD] text-[#64B95E]"
                      : "bg-transparent"
                  } text-xl text-[#101010] border-4 border-[#FDFDFD] font-semibold w-[98px] h-[106px] text-center flex items-center justify-center rounded-md`}
                >
                  {memory}
                </div>
              ))}
            </div>
          </div>

          {/* What is the condition of your console? */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                }
              >
                {t("consoleCondition")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            <div className="p-5 flex items-center gap-4">
              {product?.meta?.conditions?.map((condition: string) => (
                <div
                  key={condition}
                  onClick={() => setSelectedCondition(condition)}
                  className={`${
                    condition === selectedCondition
                      ? "bg-[#FDFDFD] text-[#64B95E]"
                      : "bg-transparent"
                  } text-xl text-[#101010] capitalize border-4 border-[#FDFDFD] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                >
                  {condition}
                </div>
              ))}
            </div>
          </div>

          {/* TODO: do it later */}
          {/* BRAND */}
          <div className="p-5">
            <p className="text-[#FDFDFD]">
              <span className="font-medium">BRAND NEW:</span> The device is in
              perfect condition and has no signs of wear or scratches. Its
              functionality is equivalent to a factory- fresh item,
              responsiveness to commands is instantaneous, and it does not have
              any overheating issues.
            </p>
          </div>

          {/* Is the console fully functional and free of technical defects? */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-[14px] rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                }
              >
                {t("consoleFullyFunctional")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            {/* <div className="p-5 flex items-center gap-4">
                {functionals?.map((func: { id: number; title: string }) => (
                  <div
                    key={func.id}
                    onClick={() => setFunctional(func.title)}
                    className={`${
                      func.title === functional
                        ? "bg-[#FDFDFD] text-[#64B95E]"
                        : "bg-transparent"
                    } text-xl text-[#101010] border-4 border-[#FDFDFD] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                  >
                    {func.title}
                  </div>
                ))}
              </div> */}
          </div>

          {/* How many controllers will you send us? */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-[14px] rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                }
              >
                {t("consoleControllers")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            <div className="p-5 flex items-center gap-4">
              {product?.meta?.controllers?.map(
                (controller: string | number) => (
                  <div
                    key={controller}
                    onClick={() => setSelectedController(controller)}
                    className={`${
                      controller === selectedController
                        ? "bg-[#FDFDFD] text-[#64B95E]"
                        : "bg-transparent"
                    } text-xl text-[#101010] border-4 border-[#FDFDFD] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                  >
                    {controller}
                  </div>
                )
              )}
            </div>
          </div>

          {/* How many controllers will you send us? */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-[14px] rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                }
              >
                {t("originalAccessories")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            {/* <div className="p-5 flex items-center gap-4">
                {accessories?.map((access: { id: number; title: string }) => (
                  <div
                    key={access.id}
                    onClick={() => setAccessory(access.title)}
                    className={`${
                      access.title === accessory
                        ? "bg-[#FDFDFD] text-[#64B95E]"
                        : "bg-transparent"
                    } text-xl text-[#101010] border-4 border-[#FDFDFD] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                  >
                    {access.title}
                  </div>
                ))}
              </div> */}
          </div>

          {/* How many controllers will you send us? */}
          <div>
            <div className="flex items-center justify-center pt-14 space-x-2.5">
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
              <h2
                className={
                  "bg-[#FDFDFD] py-4 px-[14px] rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                }
              >
                {t("leaveUsANote")}
              </h2>
              <hr className="flex-1 border-b-2 border-[#B5B5B5]" />
            </div>

            <div className="p-5">
              <p className="text-[#FDFDFD]">
                <span className="font-medium">BRAND NEW:</span> The device is in
                perfect condition and has no signs of wear or scratches. Its
                functionality is equivalent to a factory- fresh item,
                responsiveness to commands is instantaneous, and it does not
                have any overheating issues.
              </p>
            </div>
          </div>
        </div>

        {/* submit button */}

        <div className="p-5 bg-[#FDFDFD]">
          <Link href={"/sell/summary"}>
            <button
              className={`${
                singleProduct?.data?.product?.product_type === "xbox" &&
                "bg-[#49A947]"
              } ${
                singleProduct?.data?.product?.product_type === "playstation" &&
                "bg-[#1861C0]"
              } ${
                singleProduct?.data?.product?.product_type === "nintendo" &&
                "bg-[#D61D1E]"
              } w-full text-[#FDFDFD] font-semibold h-14 rounded-lg`}
            >
              ADD TO CART
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
