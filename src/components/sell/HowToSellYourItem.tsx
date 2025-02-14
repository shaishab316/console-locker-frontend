import Image from "next/image";
import React from "react";

const SELLING_STEPS = [
  {
    number: 1,
    title: "Get a price estimate",
    description:
      "Quickly evaluate your phone and get a price offer in 2 minutes.",
  },
  {
    number: 2,
    title: "Get a free shipping pack",
    description:
      "We will send you a shipping pack within 1-3 working days.\nThe package contains everything you need to send the device for free.",
  },
  {
    number: 3,
    title: "Get paid",
    description:
      "After we receive your device, it will take 2-3 working days for inspection. We will then transfer your money on the same day or send you an email with an adjusted price quote.",
  },
];

const HowToSellYourItem = () => {
  return (
    <div className="bg-blue-50 pt-16">
      <div className="px-4">
        <h2 className="text-2xl text-[40px] text-[#101010] font-semibold text-center mb-16">
          How to sell your Items
        </h2>

        <div className="relative flex items-center justify-center pb-14">
          <div className="hidden lg:block absolute right-[4%] bottom-0">
            <Image
              src="/sell/sell.png"
              alt="Service representative"
              width={538}
              height={484}
              className="object-contain"
            />
          </div>

          <div className="max-w-[718px]">
            {SELLING_STEPS.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-[#FDFDFD] rounded-lg  px-10 py-12 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl text-[#101010] font-semibold">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                {index < SELLING_STEPS.length - 1 && (
                  <div className="h-6 w-6 mx-auto my-3">
                    <svg
                      className="w-full h-full text-[#101010]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToSellYourItem;
