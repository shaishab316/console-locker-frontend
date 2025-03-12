"use client";

import Loading from "@/app/loading";
import { useGetEstimateProductPriceMutation } from "@/redux/features/products/ProductAPI";
import { useGetASingleProductQuery } from "@/redux/features/sell/SellProductAPI";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserSelectedOption {
  questionAnswer: {
    questionName: string;
    questionTitle: string;
  };
}

const SelectedProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [priceEstimate, setPriceEstimate] = useState<any>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const [userSelectedOptions, setUserSelectedOptions] = useState<
    UserSelectedOption[]
  >([]);

  // get product id from locaStorage
  useEffect(() => {
    const productId = localStorage.getItem("getEstimateProductId");
    setProductId(JSON.parse(productId as string));
  }, []);

  const [
    getEstimateProductPrice,
    { isLoading: getPriceLoading, isError: getPriceError },
  ] = useGetEstimateProductPriceMutation();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetASingleProductQuery(productId as string);

  if (isLoading) {
    <Loading />;
  }

  // get User Selected Options from locaStorage
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("userSelectedOptions") || "null"
    );
    setUserSelectedOptions(data);
  }, []);

  // get product price from locaStorage
  useEffect(() => {
    const productPrice = localStorage.getItem("getEstimatePrice");
    setPriceEstimate(JSON.parse(productPrice as string));
  }, []);

  // get product price by calling API
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
  }, [productId, getEstimateProductPrice, userSelectedOptions]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(
    "userSelectedOptions",
    userSelectedOptions[0]?.questionAnswer?.questionTitle
  );

  return (
    <div className="z-20 min-h-screen relative bg-[url('/sell/back_sell.png')] bg-cover bg-center overflow-hidden">
      {/* Diagonal lines background */}

      {/* <div className="p-5">
        <div className="bg-[#FDFDFD] h-[100px] flex items-center justify-between text-center rounded-lg p-5">
          <h3 className="text-[#101010] text-lg font-semibold">
            La Nostra Offerta
          </h3>
          <h3 className="text-[#101010] text-lg font-semibold">$200,50</h3>
        </div>
      </div> */}

      {/* product with togglable detail */}
      <div className="p-5">
        <div className="bg-[#FDFDFD] p-4 rounded-lg">
          <div className="w-full">
            <Image
              src={`${API_URL}${
                product?.data?.image ? product?.data?.image : ""
              }`}
              className="w-full"
              width={700}
              height={700}
              alt="product-detail"
            />
          </div>

          <div
            onClick={handleToggle}
            className="flex items-center justify-end gap-3 z-10 relative border-b border-b-[#DAEDF2] py-3 mb-3"
          >
            <h2 className="text-sm text-[#101010]">
              {isOpen ? "Reduce" : "View the summary in detail"}
            </h2>
            {isOpen ? (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 13.5195L10 7.26953L16.25 13.5195"
                  stroke="#737163"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 7.26953L10 13.5195L3.75 7.26953"
                  stroke="#737163"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>

          {/* togglable description */}

          {isOpen && (
            <div className="">
              <div className="flex flex-wrap gap-x-2 gap-y-6 mb-6">
                {userSelectedOptions.length > 0 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[0]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[0]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 1 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[1]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[1]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 2 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[2]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[2]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 3 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[3]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[3]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 4 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[4]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[4]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 5 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[5]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[5]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 6 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[6]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[6]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 7 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[7]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[7]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}

                {userSelectedOptions.length > 8 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[8]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[8]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}
                {userSelectedOptions.length > 9 && (
                  <div className="flex-1 max-w-max flex flex-col items-center justify-center gap-3">
                    <h2 className="text-sm font-bold text-[#101010] text-center capitalize">
                      {userSelectedOptions[9]?.questionAnswer?.questionName}
                    </h2>

                    <div className="min-w-[98px] h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center p-2">
                      {userSelectedOptions[9]?.questionAnswer?.questionTitle}
                    </div>
                  </div>
                )}
              </div>

              {/* Note */}

              <div>
                <h2 className="text-lg font-semibold text-[#101010] text-center mb-3">
                  Note
                </h2>

                <div className="h-[104px] text-[10px] leading-4 text-center border border-[#5F5F5F] rounded-lg p-3">
                  <p>La playstation ha a accumulato un po’ di polvere</p>

                  <div className="h-[1px] border-b border-dashed border-[#919191] mt-4 mb-8"></div>
                  <div className="h-[1px] border-b border-dashed border-[#919191]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Direct Payment */}

      <div className="relative p-5">
        <div className="bg-[#FDFDFD] h-[209px] rounded-lg flex items-center">
          <div className="w-[40%]"></div>
          <div className="w-[60%]">
            <h2 className="text-lg font-semibold leading-[27px] text-[#101010] pb-2 border-b border-b-[#D6D6D6]">
              Direct Payment
            </h2>
            <h3 className="text-[41px] text-[#FF9934] font-bold pb-1 border-b border-b-[#D6D6D6]">
              ${priceEstimate}
            </h3>
            <p className="text-base text-[#404040] leading-6">
              Trasferimento Paypal o sul tuo conto bancario
            </p>
          </div>
        </div>

        <div className="py-5 max-w-[250px] ml-auto text-right">
          <p className="text-xs text-[#FDFDFD] PL-2">
            Quando completi la tua transazione, il tou prezzo sara riservato per
            14 giorni
          </p>
        </div>

        <div className="absolute -bottom-2.5 -left-9 rounded-lg p-2">
          <Image
            src={"/products/owy-man.png"}
            className="max-w-[187px] max-h-[291px]"
            width={500}
            height={500}
            alt="man"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="bg-[#FDFDFD] p-6">
        <Link href={"/sell/personal-information"}>
          <button className="w-full h-14 bg-[#FF9934] rounded-lg text-[#FDFDFD] text-base font-semibold">
            CONTINUA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedProduct;
