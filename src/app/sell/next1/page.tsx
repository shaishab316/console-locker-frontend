"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SCREEN_CONDITIONS = [
  {
    id: "cracked",
    title: "Cracked or broken",
    description:
      "The screen is cracked, detached or has dead pixels. Cracks can be felt with fingernail.",
  },
  {
    id: "wear",
    title: "Signs of wear",
    description:
      "The screen has scratches or shows light signs of use. Scratches are visible with or without a light source.",
  },
  {
    id: "new",
    title: "No Signs of use",
    description:
      "The screen looks brand new. No signs of wear. No visible scratches that can be seen under a light source.",
  },
];

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

export default function ScreenCondition() {
  const [selectedCondition, setSelectedCondition] = useState("");
 const router = useRouter();

  const handleRouter = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCondition) {
      router.push("/sell/next2");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Screen Condition Section */}
      <div className="max-w-[798px] mx-auto p-4 pt-8">
        <h1 className="text-[#101010] text-xl font-semibold mb-2">
          Playstation 4
        </h1>
        <h2 className="text-2xl text-[#101010] font-semibold mb-4">
          What is the condition of the screen?
        </h2>

        <form className="space-y-3 mb-6">
          {SCREEN_CONDITIONS.map((condition) => (
            <label
              key={condition.id}
              className={`block w-full rounded-md border p-4 cursor-pointer transition-colors
                ${
                  selectedCondition === condition.id
                    ? "border-blue-500 bg-[#DAEDF2]"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="radio"
                    name="condition"
                    value={condition.id}
                    checked={selectedCondition === condition.id}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#101010]">
                    {condition.title}
                  </p>
                  <p className="text-[#6B6B6B] text-lg mt-1">
                    {condition.description}
                  </p>
                </div>
              </div>
            </label>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!selectedCondition}
              onClick={handleRouter}
              // className={`px-6 py-2 border border-[#101010] rounded-md text-base font-medium transition-colors`}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    selectedCondition
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
            >
              CONTINUE
            </button>
          </div>
        </form>
      </div>

      {/* How to Sell Section */}
      <div className="bg-blue-50 pt-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-12">
            How to sell your Items
          </h2>

          <div className="relative">
            <div className="hidden lg:block absolute -right-4 bottom-0">
              <Image
                src="/sell/sell.png"
                alt="Service representative"
                width={300}
                height={400}
                className="object-contain"
              />
            </div>

            <div className="space-y-8 max-w-xl lg:pl-10">
              {SELLING_STEPS.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
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
                    <div className="h-8 w-8 mx-auto my-2">
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
    </div>
  );
}
