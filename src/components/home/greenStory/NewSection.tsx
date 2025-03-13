"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export default function GreenStory() {
  const ecologicalPoints = Array(4).fill(
    "Acquistare o vendere una console usata non è solo conveniente, ma è anche una scelta ecologica."
  );

  const [selectedLang, setSelectedLang] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const lang = localStorage?.getItem("i18nextLng");
    setSelectedLang(lang || "");
  }, []);

  console.log(selectedLang);

  return (
    <div className="md:h-[864px] bg-[#F2F5F7] flex flex-col md:flex-row md:mb-10">
      {/* Image Section */}

      {/* <div
        className="md:hidden relative h-screen flex  bg-cover bg-center"
        style={{ backgroundImage: "url('/home/eco1.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative p-4">
          <h1 className="text-2xl font-medium text-[#FFFFFF] pb-3">
            LA STORIA VERDE DI <br /> CONSOLE LOCKER.
          </h1>
          <div className="border h-[2px] min-w-full"></div>
        </div>
      </div> */}

      {/* for mobile */}
      <div className="md:hidden relative w-full md:w-1/2 h-full -mb-1">
        <Image
          src="/home/eco2.png"
          alt="PlayStation 5 on green moss"
          width={900}
          height={900}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* for desktop */}
      <div className="hidden md:block relative w-full md:w-1/2 h-full">
        <Image
          src="/home/eco1.png"
          alt="PlayStation 5 on green moss"
          width={700}
          height={700}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-[#63B95E] p-4 md:p-12 h-full">
        <div>
          {/* Heading */}
          <h1 className="hidden md:block uppercase text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <Trans i18nKey="greenHistroy" components={{ br: <br /> }} />
          </h1>

          <div className="hidden md:block w-full h-2 border-b-2 border-white mb-10"></div>

          {/* Cards */}
          {/* <div className="max-w-[760px] space-y-5">
            {ecologicalPoints.map((text, index) => (
              <div
                key={index}
                className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
              >
                <p className="max-w-[440px] mx-auto text-center text-[#FFFFFF] text-xs sm:text-base md:text-xl leading-6">
                  {text}
                </p>
              </div>
            ))}
          </div> */}

          <div
            className={`${
              selectedLang === "en"
                ? "max-w-[760px] space-y-5"
                : "max-w-[920px] space-y-4"
            }`}
          >
            <div
              className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
            >
              <p
                className={`${
                  selectedLang === "en" ? "max-w-[440px]" : "max-w-[690px]"
                } mx-auto text-center text-[#FFFFFF] text-xs sm:text-base md:text-xl leading-6`}
              >
                {t("greenHistoryDescription")}
              </p>
            </div>
            <div
              className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
            >
              <p
                className={`${
                  selectedLang === "en" ? "max-w-[440px]" : "max-w-[690px]"
                } mx-auto text-center text-[#FFFFFF] text-xs sm:text-base md:text-xl leading-6`}
              >
                {t("greenHistoryDescription")}
              </p>
            </div>
            <div
              className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
            >
              <p
                className={`${
                  selectedLang === "en" ? "max-w-[440px]" : "max-w-[690px]"
                } mx-auto text-center text-[#FFFFFF] text-xs sm:text-base md:text-xl leading-6`}
              >
                {t("greenHistoryDescription")}
              </p>
            </div>
            <div
              className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
            >
              <p
                className={`${
                  selectedLang === "en" ? "max-w-[440px]" : "max-w-[690px]"
                } mx-auto text-center text-[#FFFFFF] text-xs sm:text-base md:text-xl leading-6`}
              >
                {t("greenHistoryDescription")}
              </p>
            </div>
            <div
              className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
            >
              <p
                className={`${
                  selectedLang === "en" ? "max-w-[440px]" : "max-w-[690px]"
                } mx-auto text-center text-[#FFFFFF] text-xs sm:text-base md:text-xl leading-6`}
              >
                {t("greenHistoryDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
