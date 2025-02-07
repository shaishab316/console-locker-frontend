// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Container from "../common/Container";
// import { useRouter } from "next/navigation";

// const consoles = [
//   { id: "ps5", name: "PlayStation 5", basePrice: 400 },
//   { id: "ps4", name: "PlayStation 4", basePrice: 200 },
//   { id: "ps4pro", name: "PlayStation 4 Pro", basePrice: 250 },
//   { id: "xbox-series-x", name: "Xbox Series X", basePrice: 400 },
//   { id: "xbox-series-s", name: "Xbox Series S", basePrice: 250 },
//   { id: "switch", name: "Nintendo Switch", basePrice: 200 },
// ];

// export default function SellHeroSection() {
//   const [selectedConsole, setSelectedConsole] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const getEstimate = () => {
//     if (!selectedConsole) return;
//     setIsLoading(true);
//     router.push(`/sell/${selectedConsole}`);
//   };

//   return (
//     <main className="bg-[url(/sell/sell-hero.png)] bg-cover bg-no-repeat min-h-[calc(100vh-180px)] bg-left-bottom">
//       <Container>
//         <div className="flex h-[700px]">
//           {/* Empty Div with 50% Width */}
//           <div className="hidden md:block w-1/2"></div>

//           {/* Content Section */}
//           <div className="w-full md:w-1/2 lg:pl-32">
//             <div className="flex flex-col translate-y-1/2">
//               <h1 className="text-4xl md:text-5xl font-bold text-[#FDFDFD] lg:text-[#101010] mb-6">
//                 Sell Your Console
//               </h1>

//               {/* Benefits Section */}
//               {/* <div className="space-y-4 mb-6">
//                 {[
//                   { src: "free-shipping", text: "Free Shipping" },
//                   { src: "free-return", text: "Free Return" },
//                   {
//                     src: "fast-delivery",
//                     text: "Fast Delivery within 48 hours",
//                   },
//                 ].map(({ src, text }, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <Image
//                       src={`/sell/${src}-white.png`}
//                       className="md:hidden"
//                       width={18}
//                       height={18}
//                       alt={text}
//                     />
//                     <Image
//                       src={`/sell/${src}.png`}
//                       className="hidden md:inline-block"
//                       width={18}
//                       height={18}
//                       alt={text}
//                     />
//                     <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
//                       {text}
//                     </span>
//                   </div>
//                 ))}
//               </div> */}

//               <div className="space-y-4 mb-6">
//                 <div className="flex items-start gap-3 text-[#FDFDFD] lg:text-[#101010]">
//                   <Image
//                     src={"/sell/free-shipping-white.png"}
//                     className="md:hidden"
//                     width={18}
//                     height={18}
//                     alt="free shipping"
//                   />
//                   <Image
//                     src={"/sell/free-shipping.png"}
//                     className="hidden md:inline-block"
//                     width={18}
//                     height={18}
//                     alt="free shipping"
//                   />
//                   <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
//                     Free Shipping
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Image
//                     src={"/sell/free-return-white.png"}
//                     className="md:hidden"
//                     width={18}
//                     height={18}
//                     alt="free shipping"
//                   />
//                   <Image
//                     src={"/sell/free-return.png"}
//                     className="hidden md:inline-block"
//                     width={18}
//                     height={18}
//                     alt="free shipping"
//                   />
//                   <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
//                     Free Return
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <Image
//                     src={"/sell/fast-payment-white.png"}
//                     className="md:hidden"
//                     width={20}
//                     height={20}
//                     alt="free shipping"
//                   />
//                   <Image
//                     src={"/sell/fast-delivery.png"}
//                     className="hidden md:inline-block"
//                     width={18}
//                     height={18}
//                     alt="free shipping"
//                   />
//                   <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
//                     Fast Delivery within 48 hours
//                   </span>
//                 </div>
//               </div>

//               {/* Console Selection and Price Estimate */}
//               <div className="flex flex-col space-y-4">
//                 <select
//                   className="w-full md:w-1/2 h-14 text-[#010101] rounded-sm px-2 border border-[#101010] bg-transparent"
//                   value={selectedConsole}
//                   onChange={(e) => setSelectedConsole(e.target.value)}
//                 >
//                   <option value="">CHOOSE YOUR CONSOLE</option>
//                   {consoles.map(({ id, name }) => (
//                     <option key={id} value={id}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   onClick={getEstimate}
//                   disabled={!selectedConsole || isLoading}
//                   className={`w-full md:w-1/2 h-16 text-white rounded-sm transition ${
//                     !selectedConsole || isLoading
//                       ? "bg-gray-500 cursor-not-allowed"
//                       : "bg-gray-700 hover:bg-gray-800"
//                   }`}
//                 >
//                   {isLoading ? "Loading..." : "GET A PRICE ESTIMATE"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Select } from "antd";
// import { Select, Button, Spin } from "antd";
// import { GiftOutlined, ReloadOutlined, CarOutlined } from "@ant-design/icons";
import Container from "../common/Container";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const consoles = [
  { id: "ps5", name: "PlayStation 5", basePrice: 400 },
  { id: "ps4", name: "PlayStation 4", basePrice: 200 },
  { id: "ps4pro", name: "PlayStation 4 Pro", basePrice: 250 },
  { id: "xbox-series-x", name: "Xbox Series X", basePrice: 400 },
  { id: "xbox-series-s", name: "Xbox Series S", basePrice: 250 },
  { id: "switch", name: "Nintendo Switch", basePrice: 200 },
];

const options = [
  { value: "ps5", label: "PlayStation 5" },
  { value: "ps4", label: "PlayStation 4" },
  { value: "ps4pro", label: "PlayStation 4 Pro" },
  { value: "xbox-series-x", label: "Xbox Series X" },
  { value: "xbox-series-s", label: "Xbox Series S" },
  { value: "switch", label: "Nintendo Switch" },
];

export default function SellHeroSection() {
  const [selectedConsole, setSelectedConsole] = useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getEstimate = () => {
    router.push("/sell/432");
  };

  return (
    <main className="bg-[url(/sell/sell-hero.png)] bg-cover bg-no-repeat min-h-[calc(100vh-180px)] bg-left-bottom">
      <Container>
        <div className="flex h-[700px]">
          {/* Empty Div with 50% Width */}
          <div className="hidden lg:block w-1/2"></div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 lg:pl-32">
            <div className="flex flex-col translate-y-1/2 lg:-translate-x-20 xl:-translate-x-0">
              <h1 className="text-4xl md:text-5xl font-bold text-[#FDFDFD] lg:text-[#101010] mb-6 ">
                Sell Your Console
              </h1>

              {/* Benefits Section */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-[#FDFDFD] lg:text-[#101010]">
                  <Image
                    src={"/sell/free-shipping-white.png"}
                    className="md:hidden"
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <Image
                    src={"/sell/free-shipping.png"}
                    className="hidden md:inline-block"
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
                    Free Shipping
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={"/sell/free-return-white.png"}
                    className="md:hidden"
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <Image
                    src={"/sell/free-return.png"}
                    className="hidden md:inline-block"
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
                    Free Return
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Image
                    src={"/sell/fast-payment-white.png"}
                    className="md:hidden"
                    width={20}
                    height={20}
                    alt="free shipping"
                  />
                  <Image
                    src={"/sell/fast-delivery.png"}
                    className="hidden md:inline-block"
                    width={18}
                    height={18}
                    alt="free shipping"
                  />
                  <span className="text-lg text-[#FDFDFD] lg:text-[#101010]">
                    Fast Delivery within 48 hours
                  </span>
                </div>
              </div>

              {/* Console Selection and Price Estimate */}
              <div className="flex flex-col space-y-4">
                <div
                  className="relative w-full sm:w-1/2 md:w-9/12"
                  ref={selectRef}
                >
                  {/* Select Box */}
                  <div
                    className="flex justify-between items-center bg-transparent border border-[#FDFDFD] md:border-[#101010] rounded-md px-4 py-3 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="text-[#FDFDFD] md:text-gray-700">
                      {selectedConsole
                        ? options.find((opt) => opt.value === selectedConsole)
                            ?.label
                        : "Select a console"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FDFDFD] md:text-gray-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedConsole(option.value);
                            setIsOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link href={"/sell/next1"}>
                  <button
                    onClick={getEstimate}
                    disabled={!selectedConsole || isLoading}
                    className={`w-full sm:w-1/2 md:w-9/12 h-16 text-white rounded-sm ${
                      !selectedConsole || isLoading
                        ? "bg-[#101010] cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    GET A PRICE ESTIMATE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
