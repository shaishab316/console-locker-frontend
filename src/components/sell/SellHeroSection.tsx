"use client";

import { useState } from "react";
import Image from "next/image";
import { Select } from "antd";
// import { Select, Button, Spin } from "antd";
// import { GiftOutlined, ReloadOutlined, CarOutlined } from "@ant-design/icons";
import Container from "../common/Container";
import { useRouter } from "next/navigation";

const consoles = [
  { id: "ps5", name: "PlayStation 5", basePrice: 400 },
  { id: "ps4", name: "PlayStation 4", basePrice: 200 },
  { id: "ps4pro", name: "PlayStation 4 Pro", basePrice: 250 },
  { id: "xbox-series-x", name: "Xbox Series X", basePrice: 400 },
  { id: "xbox-series-s", name: "Xbox Series S", basePrice: 250 },
  { id: "switch", name: "Nintendo Switch", basePrice: 200 },
];

export default function SellHeroSection() {
  const [selectedConsole, setSelectedConsole] = useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getEstimate = () => {
    router.push("/sell/432");
  };

  return (
    <main className="bg-[url(/sell/sell-hero.png)] bg-cover bg-no-repeat min-h-scree min-h-[calc(100vh-80px)]">
      <Container>
        <div className="flex min-h-">
          {/* Empty Div with 50% Width */}
          <div className="hidden md:block w-1/2"></div>

          {/* Content Section */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col translate-y-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-[#101010] mb-6 ">
                Sell Your Console
              </h1>

              {/* Benefits Section */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-gray-700">
                  <Image
                    src={"/sell/free-shipping.png"}
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <span className="text-lg text-[#2B2B2B]">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Image
                    src={"/sell/free-return.png"}
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <span className="text-lg text-[#2B2B2B]">Free Return</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Image
                    src={"/sell/fast-delivery.png"}
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <span className="text-lg text-[#2B2B2B]">
                    Fast Delivery within 48 hours
                  </span>
                </div>
              </div>

              {/* Console Selection and Price Estimate */}
              <div className="flex flex-col space-y-4">
                <Select
                  placeholder="CHOOSE YOUR CONSOLE"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    color: "white",
                  }}
                  className="w-full lg:w-1/2 text-white custom-select"
                  onChange={(value) => setSelectedConsole(value)}
                  options={consoles.map((console) => ({
                    value: console.id,
                    label: console.name,
                  }))}
                  size="large"
                />

                <button
                  onClick={getEstimate}
                  disabled={!selectedConsole || isLoading}
                  className={`w-full md:w-1/2 h-12 text-white rounded-sm ${
                    !selectedConsole || isLoading
                      ? "bg-[#101010] cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-800"
                  }`}
                >
                  GET A PRICE ESTIMATE
                </button>

                {/* {estimatedPrice !== null && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">
                      Estimated Price: ${estimatedPrice}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      *Final price may vary based on condition
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
