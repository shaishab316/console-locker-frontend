"use client";

import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);

    console.log(isOpen);
  };

  return (
    <div className="z-20 min-h-screen relative bg-[url('/sell/back_sell.png')] bg-cover bg-center overflow-hidden">
      {/* Diagonal lines background */}
      <div className="absolute inset-0 opacity-10" />

      <div className="p-5">
        <div className="bg-[#FDFDFD] h-[100px] flex items-center justify-center text-center rounded-lg p-5">
          <h2 className="text-[#101010] text-2xl font-semibold">
            La Nostra Offerta
            <span className="inline-block w-[3px] h-10 bg-[#D6D6D6] -mb-3" />
            $200,50
          </h2>
        </div>
      </div>

      {/* product with togglable detail */}
      <div className="p-5">
        <div className="bg-[#FDFDFD] p-4 rounded-lg">
          <div className="w-full">
            <Image
              src={"/sell/product-detail.png"}
              width={700}
              height={700}
              alt="product-detail"
            />
          </div>

          <div
            onClick={handleToggle}
            className="border-2 flex items-center justify-end gap-3 border-b border-b-[#DAEDF2] py-3 mb-3"
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

          <div className="flex flex-wrap gap-x-2 gap-y-6">
            <div className="w-[98px] flex flex-col items-center justify-center gap-3">
              <h2 className="text-sm font-bold text-[#101010] text-center">
                Modello
              </h2>

              <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                ONE X
              </div>
            </div>

            <div className="w-[98px] flex flex-col items-center justify-center gap-3">
              <h2 className="text-sm font-bold text-[#101010] text-center">
                Modello
              </h2>

              <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                ONE X
              </div>
            </div>
            <div className="w-[98px] flex flex-col items-center justify-center gap-3">
              <h2 className="text-sm font-bold text-[#101010] text-center">
                Modello
              </h2>

              <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                ONE X
              </div>
            </div>
            <div className="w-[98px] flex flex-col items-center justify-center gap-3">
              <h2 className="text-sm font-bold text-[#101010] text-center">
                Modello
              </h2>

              <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                ONE X
              </div>
            </div>
            <div className="w-[98px] flex flex-col items-center justify-center gap-3">
              <h2 className="text-sm font-bold text-[#101010] text-center">
                Modello
              </h2>

              <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                ONE X
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Payment */}

      <div className="border-2 p-5">
        <div className="bg-[#FDFDFD] h-[209px] rounded-lg flex items-center">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold leading-[27px] text-[#101010] pb-2 border-b border-b-[#D6D6D6]">
              Direct Payment
            </h2>
            <h3 className="text-[41px] text-[#FF9934] font-bold pb-1 border-b border-b-[#D6D6D6]">
              $200,50
            </h3>
            <p className="text-base text-[#404040] leading-6">
              Trasferimento Paypal o sul tuo conto bancario
            </p>
          </div>
        </div>

        <div>
          <Image
            src={"/products/owy-man.png"}
            width={600}
            height={700}
            alt="man"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="bg-[#FDFDFD] p-6">
        <button className="w-full h-14 bg-[#FF9934] rounded-lg text-[#FDFDFD] text-base font-semibold">
          CONTINUA
        </button>
      </div>
    </div>
  );
};

export default Page;
