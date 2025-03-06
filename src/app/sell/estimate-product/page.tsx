"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import SelectedProduct from "@/app/new-product-detail/page";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useGetEstimateProductPriceMutation } from "@/redux/features/products/ProductAPI";
import { useGetASingleProductQuery } from "@/redux/features/sell/SellProductAPI";

export default function PlayStationOffer() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { t } = useTranslation();

  const [priceEstimate, setPriceEstimate] = useState<any>(null);
  const [
    getEstimateProductPrice,
    { isLoading: getPriceLoading, isError: getPriceError },
  ] = useGetEstimateProductPriceMutation();
  const [productId, setProductId] = useState<string | null>(null);

  const userSelectedOptions = useSelector(
    (state: RootState) => state?.questionSlice?.questions
  );

  const {
    data: product,
    isLoading,
    isError,
  } = useGetASingleProductQuery(productId as string);

  useEffect(() => {
    const productId = localStorage.getItem("getEstimateProductId");
    setProductId(JSON.parse(productId as string));
  }, [window.location.reload]);

  useEffect(() => {
    const productPrice = localStorage.getItem("getEstimatePrice");
    setPriceEstimate(JSON.parse(productPrice as string));
  }, [window.location.reload]);

  useEffect(() => {
    const fetchPriceEstimate = async () => {
      try {
        const response = await getEstimateProductPrice({
          id: productId as string,
          body: { questions: userSelectedOptions },
        }).unwrap();

        localStorage.setItem(
          "getEstimatePrice",
          JSON.stringify(response?.data?.price)
        );

        setPriceEstimate(response?.data?.price);
        console.log("Price Estimate Response:", response?.data?.price);
      } catch (error) {
        console.error("Error fetching price estimate:", error);
      }
    };

    if (productId) {
      fetchPriceEstimate();
    }
  }, [
    productId,
    getEstimateProductPrice,
    userSelectedOptions,
    window.location.reload,
  ]);

  console.log("user Selected Options ......", userSelectedOptions);

  return (
    <>
      <div className="hidden md:block bg-[#F2F5F7] p-6 md:p-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">{t("ourCurrentOffer")}</h1>

          <div className="grid items-center lg:grid-cols-4 gap-8 py-10">
            <div className="lg:col-span-2">
              <div className="h-max flex flex-col lg:flex-row lg:items-center gap-5 bg-[#F7F7F7] border p-6 rounded-lg mb-12">
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/products/money-dollar.png"
                      width={24}
                      height={24}
                      alt="money"
                    />
                    <p className="text-2xl text-[#404040]">
                      {t("directPayout")}
                    </p>
                  </div>
                  <h2 className="text-[40px] text-[#404040] font-semibold">
                    ${(priceEstimate && priceEstimate) || "00"}
                  </h2>
                  <p className="text-lg text-[#404040] max-w-[350px]">
                    {t("transferVaiPayPal")}
                  </p>
                </div>

                <div className="lg:hidden w-full border-t border-gray-500"></div>
                <div className="hidden lg:block w-[2px] h-36 bg-gray-500 mx-4"></div>

                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/products/gift.png"
                      width={24}
                      height={24}
                      alt="money"
                    />
                    <p className="text-2xl text-[#404040]">{t("basePrice")}</p>
                  </div>
                  <h2 className="text-[40px] text-[#404040] font-semibold">
                    ${priceEstimate ? (priceEstimate * 1.1).toFixed(2) : "00"}
                  </h2>
                  <p className="text-lg font-medium bg-[#DBDDFA] w-max text-[#404040] max-w-[350px] rounded-sm p-1">
                    10% extra
                  </p>
                </div>
              </div>

              <Link href={"/sell/personal-information"}>
                <button className="w-full bg-black text-white py-3 rounded-md mb-5">
                  {t("continue")}
                </button>
              </Link>

              <div className="flex items-start gap-2 text-[#404040] text-2xl font-medium">
                <Image
                  src={"/sell/goon.svg"}
                  width={20}
                  height={20}
                  className="pt-1"
                  alt="goon"
                />
                <p>
                  {t("whenYouCompleteYourTransaction1")}{" "}
                  <span className="text-[#101010]">
                    {t("whenYouCompleteYourTransaction2")}
                  </span>
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="aspect-square relative mb-2">
                  <Image
                    src={`${API_URL}/${product?.data?.image}`}
                    alt="PlayStation 4 Console"
                    width={320}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {product?.data?.name}
                </h2>

                <div className="grid grid-cols-2 gap-y-3">
                  {userSelectedOptions?.map((option: any, index: number) => (
                    <div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">
                          {option?.questionAnswer?.questionTitle} :
                        </span>
                        <span>{option?.questionAnswer?.questionAnswer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* only for mobile */}
      <div className="md:hidden">
        <SelectedProduct />
      </div>
    </>
  );
}
