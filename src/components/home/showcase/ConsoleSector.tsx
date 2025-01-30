"use client";

import Container from "@/components/common/Container";
import { Tabs } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const consoles = {
  xbox: [
    {
      id: 1,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 2,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 3,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 4,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 5,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 6,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 7,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 8,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 854,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 843,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 8434,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 82,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
  ],
  playstation: [
    {
      id: 1,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 2,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 3,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 4,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 5,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 6,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 7,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 8,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 9,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 11,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 111,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 234,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
  ],
  nintendo: [
    {
      id: 1,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 2,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 3,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 4,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 5,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 6,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 7,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 8,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 832423,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 8243,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 8234,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
    {
      id: 83,
      name: "Xbox",
      model: "Series X",
      price: 399,
      image: "/products/sorif.png",
      condition: "The device is in excellent condition",
    },
  ],
};

export default function ConsoleSelector() {
  const [activeTab, setActiveTab] = useState("xbox");

  return (
    <div className="min-h-screen bg-[#F2F5F7]">
      <div className="flex items-center justify-center py-8 space-x-4">
        <hr className="flex-1 border-b border-gray-300" />
        <h2 className="text-[#101010] text-2xl md:text-5xl font-semibold text-center whitespace-nowrap">
          Choose your console
        </h2>
        <hr className="flex-1 border-b border-gray-300" />
      </div>

      <div className="py-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="custom-tabs"
          items={[
            {
              key: "xbox",
              label: (
                <div className="flex items-center justify-center">
                  <div
                    // className={`w-24 h-24 rounded-full flex items-center justify-center  hover:bg-[#1B9E31] ${
                    //   activeTab === "xbox" ? "bg-[#1B9E31]" : "bg-gray-300"
                    // }`}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      activeTab === "xbox"
                        ? "bg-gradient-to-r from-[#1B9E31] to-[#0E7A22]"
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    } hover:bg-gradient-to-r hover:from-[#1B9E31] hover:to-[#0E7A22]`}
                  >
                    <Image
                      src="/tab/xbox.svg"
                      alt="Xbox"
                      width={60}
                      height={60}
                      className="text-white"
                    />
                  </div>
                </div>
              ),
              children: (
                <div
                  className={`p-8 ${
                    activeTab === "xbox" ? "bg-[#1B9E31]" : ""
                  }`}
                >
                  <Container>
                    <div className="flex items-center py-3 space-x-4">
                      <h2 className="text-5xl font-bold text-[#FDFDFD] mb-8">
                        Xbox
                      </h2>
                      <hr className="flex-1 border-b border-gray-100 -mt-5" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {consoles.xbox.map((console) => (
                        <Link
                          href={`/buy/${console?.id}`}
                          key={console.id}
                          className="bg-white rounded-lg overflow-hidden shadow-sm"
                        >
                          <div className="relative">
                            <Image
                              src={console.image || ""}
                              alt={`${console.name} ${console.model}`}
                              width={355}
                              height={500}
                              className="object-contain w-full h-full p-3"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-[#101010] text-2xl">
                                  {console.name}
                                </h3>
                                <p className="text-base text-[#2B2B2B]">
                                  {console.model}
                                </p>
                              </div>
                              <p className="font-semibold text-3xl text-[#101010] ">
                                ${console.price}
                              </p>
                            </div>
                            <p className="border-t-2 border-[#B5B5B5] text-center text-base font-medium text-[#101010]">
                              {console.condition}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Container>
                </div>
              ),
            },
            {
              key: "playstation",
              label: (
                <div className="flex items-center justify-center">
                  <div
                    // className={`w-24 h-24 rounded-full flex items-center justify-center hover:bg-[#023993] ${
                    //   activeTab === "playstation"
                    //     ? "bg-[#023993]"
                    //     : "bg-gray-300"
                    // }`}

                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      activeTab === "playstation"
                        ? "bg-gradient-to-r from-[#023993] to-[#0050D4]"
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    } hover:bg-gradient-to-r hover:from-[#023993] hover:to-[#0050D4]`}
                  >
                    <Image
                      src="/tab/playstation.svg"
                      alt="PlayStation"
                      width={60}
                      height={60}
                      className="text-white"
                    />
                  </div>
                </div>
              ),
              children: (
                <div className="p-8 bg-[#023993]">
                  <Container>
                    <div className="flex items-center py-3 space-x-4">
                      <h2 className="text-5xl font-bold text-[#FDFDFD] mb-8">
                        PlayStation
                      </h2>
                      <hr className="flex-1 border-b border-gray-100 -mt-5" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* PlayStation content */}
                      {consoles.playstation.map((console) => (
                        <Link
                          href={`/buy/${console?.id}`}
                          key={console.id}
                          className="bg-white rounded-lg overflow-hidden shadow-sm"
                        >
                          <div className="relative">
                            <Image
                              src={console.image || ""}
                              alt={`${console.name} ${console.model}`}
                              width={355}
                              height={500}
                              className="object-cover w-full h-full p-3"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-[#101010] text-2xl">
                                  {console.name}
                                </h3>
                                <p className="text-base text-[#2B2B2B]">
                                  {console.model}
                                </p>
                              </div>
                              <p className="font-semibold text-3xl text-[#101010] ">
                                ${console.price}
                              </p>
                            </div>
                            <p className="border-t-2 border-[#B5B5B5] text-center text-base font-medium text-[#101010]">
                              {console.condition}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Container>
                </div>
              ),
            },
            {
              key: "nintendo",
              label: (
                <div className="flex items-center justify-center w-max mx-auto">
                  <div
                    // className={`w-24 h-24 rounded-full flex items-center justify-center hover:bg-[#EB3333] ${
                    //   activeTab === "nintendo" ? "bg-[#EB3333]" : "bg-gray-300"
                    // }`}

                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      activeTab === "nintendo"
                        ? "bg-gradient-to-r from-red-500 to-red-700"
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    } hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700`}
                  >
                    <Image
                      src="/tab/nintendo.svg"
                      alt="Nintendo"
                      width={60}
                      height={60}
                      className="text-white"
                    />
                  </div>
                </div>
              ),
              children: (
                <div className="p-8 bg-[#EB3333]">
                  <Container>
                    <div className="flex items-center py-3 space-x-4">
                      <h2 className="text-5xl font-bold text-[#FDFDFD] mb-8">
                        Nintendo
                      </h2>
                      <hr className="flex-1 border-b border-gray-100 -mt-5" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Nintendo content */}
                      {consoles.nintendo.map((console) => (
                        <Link
                          href={`/buy/${console?.id}`}
                          key={console.id}
                          className="bg-white rounded-lg overflow-hidden shadow-sm"
                        >
                          <div className="relative">
                            <Image
                              src={console.image || ""}
                              alt={`${console.name} ${console.model}`}
                              width={355}
                              height={500}
                              className="object-cover w-full h-full p-3"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-[#101010] text-2xl">
                                  {console.name}
                                </h3>
                                <p className="text-base text-[#2B2B2B]">
                                  {console.model}
                                </p>
                              </div>
                              <p className="font-semibold text-3xl text-[#101010] ">
                                ${console.price}
                              </p>
                            </div>
                            <p className="border-t-2 border-[#B5B5B5] text-center text-base font-medium text-[#101010]">
                              {console.condition}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Container>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
