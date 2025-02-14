"use client";

import Image from "next/image";
import Container from "../common/Container";
import { useTranslation } from "react-i18next";

const deliverySteps = [
  {
    number: 1,
    title: "Get a price estimate for your device",
    description:
      "Quickly evaluate your phone and get a price offer in 2 minutes.",
  },
  {
    number: 2,
    title: "Deliver your device to the nearest store, or send it for free",
    description:
      "We will send you a sales pack within 1-3 working days.\nThe package contains everything you need to send the device for free.",
  },
  {
    number: 3,
    title: "Get paid directly to your account",
    description:
      "After receiving your phone, it will take 2-3 working days for inspection. We will then transfer your money on the same day or send you an email with an adjusted price quote.",
  },
];

export default function HowDelivery() {
  const { t } = useTranslation();

  return (
    <main className="bg-[#DAEDF2] w-full  px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl pt-12 font-bold text-center text-gray-900">
        {t("howDeliver")}
      </h1>

      <div className="">
        <div className="relative flex items-center justify-center py-12 ">
          {/* <div></div> */}
          {/* <Container> */}
          <div className="max-w-[718px] bg-white rounded-2xl shadow-sm z-40 p-10">
            {/* {deliverySteps.map((step, index) => (
              <div
                key={step.number}
                className={`flex gap-6 ${
                  index !== deliverySteps.length - 1 ? "mb-8" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="text-2xl text-[#101010] font-semibold">
                    {step.number}
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="font-semibold text-lg text-[#101010]">
                    {step.title}
                  </h2>
                  {step.description.split("\n").map((line, i) => (
                    <p key={i} className="text-base text-[#404040]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))} */}

            <div className={`flex gap-6 mb-8`}>
              <div className="flex-shrink-0">
                <div className="text-2xl text-[#101010] font-semibold">1</div>
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold text-lg text-[#101010]">
                  {t("sellBoxHeading1")}
                </h2>

                <p className="text-base text-[#404040]">{t("sellBoxDesc1")}</p>
              </div>
            </div>

            <div className={`flex gap-6 mb-8`}>
              <div className="flex-shrink-0">
                <div className="text-2xl text-[#101010] font-semibold">2</div>
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold text-lg text-[#101010]">
                  {t("sellBoxHeading2")}
                </h2>

                <p className="text-base text-[#404040]">{t("sellBoxDesc2")}</p>
              </div>
            </div>

            <div className={`flex gap-6`}>
              <div className="flex-shrink-0">
                <div className="text-2xl text-[#101010] font-semibold">3</div>
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold text-lg text-[#101010]">
                  {t("sellBoxHeading3")}
                </h2>

                <p className="text-base text-[#404040]">{t("sellBoxDesc3")}</p>
              </div>
            </div>
          </div>
          {/* </Container> */}

          <div className="hidden lg:inline-block absolute right-3 bottom-0 order-last md:z-20">
            <Image
              // src="/sell/sell.png"
              src="/sell/sell.svg"
              alt="Delivery person with laptop"
              width={560}
              height={560}
              className="object-cover -ml-0 lg:-ml-20"
              priority
            />
          </div>

          {/* <div></div> */}
        </div>
      </div>
    </main>
  );
}
