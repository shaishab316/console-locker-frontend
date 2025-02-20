"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SelectedProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    // setIsOpen(!isOpen);
  };

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
              src={"/sell/product-detail.png"}
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
                <div className="w-[98px] flex flex-col items-center justify-center gap-3">
                  <h2 className="text-sm font-bold text-[#101010] text-center">
                    Model
                  </h2>

                  <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                    ONE X
                  </div>
                </div>

                <div className="w-[98px] flex flex-col items-center justify-center gap-3">
                  <h2 className="text-sm font-bold text-[#101010] text-center">
                    Condition
                  </h2>

                  <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                    BRAND NEW
                  </div>
                </div>
                <div className="w-[98px] flex flex-col items-center justify-center gap-3">
                  <h2 className="text-sm font-bold text-[#101010] text-center">
                    Technical
                  </h2>

                  <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                    ABSENT
                  </div>
                </div>
                <div className="w-[98px] flex flex-col items-center justify-center gap-3">
                  <h2 className="text-sm font-bold text-[#101010] text-center">
                    Controller
                  </h2>

                  <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                    +1
                  </div>
                </div>
                <div className="w-[98px] flex flex-col items-center justify-center gap-3">
                  <h2 className="text-sm font-bold text-[#101010] text-center">
                    Accessories
                  </h2>

                  <div className="w-full h-[106px] bg-[#64B95E] text-[#FDFDFD] leading-[30px] text-xl font-semibold rounded-md text-center flex items-center justify-center">
                    SI
                  </div>
                </div>
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
              $200,50
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
        <Link href={"/sell/next5"}>
          <button className="w-full h-14 bg-[#FF9934] rounded-lg text-[#FDFDFD] text-base font-semibold">
            CONTINUA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedProduct;
