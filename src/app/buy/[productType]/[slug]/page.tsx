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
import qs from "qs";
import slugify from "slugify";
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
  title: string;
  condition: string;
  price: string;
  images: [number];
  brand: string;
  slug: string;
}

const ProductDetailsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedController, setSelectedController] = useState<number>();
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

  console.log({
    selectedModel,
    selectedMemory,
    selectedCondition,
    selectedController,
  });

  return (
    <div className="py-16 bg-[#F2F5F7]">
      <Container>
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
                {[1, 2, 3, 4, 5].map((i) => (
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
              <h2 className="font-medium">4.9</h2>
              <p className="underline">(385 reviews)</p>
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
                  scratches, dents and other marks. The phone is unlocked, fully
                  tested and works like new.
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
                      The phone will have heavy signs of wear, such as deeper
                      scratches, dents and other marks. The phone is unlocked,
                      fully tested and works like new.
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
                      trade-in kit to your home address and refund the trade-in
                      value within 2-3 business days from receiving the phone.
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
                  <option value="PlayStation 4 Pro">PlayStation 5</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="OLED Steam Deck">OLED Steam Deck</option>
                  <option value="PlayStation 4 Pro">PlayStation 4 Pro</option>
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
              <Link
                href={"/cart"}
                className="h-14 flex items-center justify-center bg-black text-white text-center px-6 py-3 rounded-md"
              >
                {t("addToCart")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-[32px] font-semibold mb-4">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.data?.products
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
                      alt={product.title}
                      width={300}
                      height={387}
                      className="object-center object-cover w-full h-[387px] rounded-t-lg"
                    />
                    <div className="px-3">
                      <h3 className="text-xl text-[#101010] font-semibold mb-2 mt-5">
                        {product.title}
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
      </Container>
      <ReviewCarousel />
      <BlogCarousel />
    </div>
  );
};

export default ProductDetailsPage;
