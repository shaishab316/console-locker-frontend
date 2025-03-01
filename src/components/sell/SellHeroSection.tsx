"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "../common/Container";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addSelectedSellProduct } from "@/redux/features/sell/SellProductSlice";

const options = [
  { id: 12345, value: "PlayStation 5", label: "PlayStation 5" },
  { id: 12346, value: "PlayStation 4", label: "PlayStation 4" },
  { id: 12347, value: "PlayStation 4 Pro", label: "PlayStation 4 Pro" },
  { id: 12348, value: "Xbox Series X", label: "Xbox Series X" },
  { id: 12349, value: "Xbox Series S", label: "Xbox Series S" },
  { id: 12341, value: "Nintendo Switch", label: "Nintendo Switch" },
];

export default function SellHeroSection() {
  const [selectedConsole, setSelectedConsole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    router.push("/sell/question");
  };

  const handleSelect = (id: number, value: string) => {
    setSelectedConsole(value);
    dispatch(addSelectedSellProduct({ id, selectedConsole: value }));
    setIsOpen(false);
  };

  // Get selected console from Redux store
  const selectedConsoled = useSelector(
    (state: RootState) =>
      state?.sellProduct?.products.find(
        (p: { id: number; selectedConsole: string }) => p.id === 1
      )?.selectedConsole || ""
  );

  console.log({ selectedConsoled });

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
                {t("sellYourConsole")}
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
                    {t("freeShipping")}
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
                    {t("freeReturn")}
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
                    {t("fastDelivery")}
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
                      {selectedConsole ? (
                        options.find((opt) => opt.value === selectedConsole)
                          ?.label
                      ) : (
                        <>{t("selectAConsole")}</>
                      )}
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
                            handleSelect(option?.id, option?.value);
                            // setSelectedConsole(option.value);
                            // setIsOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link href={"/sell/question"}>
                  <button
                    onClick={getEstimate}
                    disabled={!selectedConsole || isLoading}
                    className={`w-full sm:w-1/2 md:w-9/12 h-16 text-white rounded-sm ${
                      !selectedConsole || isLoading
                        ? "bg-[#101010] cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    {t("getAPriceEstimate")}
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
