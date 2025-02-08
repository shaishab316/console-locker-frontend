"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function PlayStationOffer() {
  const [selectedPayment, setSelectedPayment] = useState<"direct" | "voucher">(
    "direct"
  );

  return (
    <div className="bg-[#F2F5F7] p-6 md:p-12">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Our Current offer:</h1>

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
                  <p className="text-2xl text-[#404040]">Direct Payout</p>
                </div>
                <h2 className="text-[40px] text-[#404040] font-semibold">
                  $96.96
                </h2>
                <p className="text-lg text-[#404040] max-w-[350px]">
                  Transfer vai PayPal or to your bank account
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
                  <p className="text-2xl text-[#404040]">Direct Payout</p>
                </div>
                <h2 className="text-[40px] text-[#404040] font-semibold">
                  $96.96
                </h2>
                <p className="text-lg font-medium bg-[#DBDDFA] w-max text-[#404040] max-w-[350px] rounded-sm p-1">
                  10% extra
                </p>
              </div>
            </div>

            <Link href={"/sell/next5"}>
              <button className="w-full bg-black text-white py-3 rounded-md mb-5">
                Continue
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
                When you complete your transaction, your{" "}
                <span className="text-[#101010]">
                  price will be reserved for 14 days.
                </span>
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            {/* <div className="w-full max-w-md"> */}
            <div className="flex flex-col items-center justify-center">
              <div className="aspect-square relative mb-2">
                <Image
                  src="/products/next3.png"
                  alt="PlayStation 4 Console"
                  width={320}
                  height={300}
                  className="object-contain"
                  priority
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">Playstation 4</h2>

              <div className="grid grid-cols-2 gap-y-3">
                <div className="flex gap-2">
                  <span className="text-gray-600">Model :</span>
                  <span>Fat</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Memory :</span>
                  <span>1 TB</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Controller :</span>
                  <span>1</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Conditions :</span>
                  <span>Good</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
