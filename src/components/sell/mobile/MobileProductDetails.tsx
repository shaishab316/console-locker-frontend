"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const storages = [
  {
    id: 1,
    title: "500 GB",
  },
  {
    id: 2,
    title: "1 TB",
  },
];

const MobileProductDetails = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [storage, setStorage] = useState("")

  return (
    <div>
      <div className="w-fill">
        <Image
          src={"/sell/product-detail.png"}
          width={700}
          height={800}
          alt="xbox"
        />
      </div>

      {/* Title - Select the Xbox One model */}
      <div className="flex items-center justify-center pt-14 space-x-7 lg:space-x-9">
        <hr className="flex-1 border-b-2 border-gray-300" />
        <h2
          className={
            "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-2xl md:text-5xl font-semibold text-center whitespace-nowrap"
          }
        >
          {t("consoleHeaderTitle")}
        </h2>
        <hr className="flex-1 border-b-2 border-gray-300" />
      </div>

      {/* Select the Xbox One model */}

      <div className="flex flex-col gap-4 px-5 py-5">
        <div className="h-16 rounded-md flex items-center justify-center bg-[#DDDEE3] border border-[#919191] text-2xl font-semibold leading-[36px]">
          One
        </div>
        <div className="h-16 rounded-md flex items-center justify-center bg-[#DDDEE3] border border-[#919191] text-2xl font-semibold leading-[36px]">
          One S
        </div>
        <div className="h-16 rounded-md flex items-center justify-center bg-[#DDDEE3] border border-[#919191] text-2xl font-semibold leading-[36px]">
          One S - Digital
        </div>
        <div className="h-16 rounded-md flex items-center justify-center bg-[#DDDEE3] border border-[#919191] text-2xl font-semibold leading-[36px]">
          One X
        </div>
      </div>

      {/* Title - What is the storage capacity? (Not applicable for Xbox One X) */}
      <div className="flex items-center justify-center pt-14 space-x-7 lg:space-x-9">
        <hr className="flex-1 border-b-2 border-gray-300" />
        <h2
          className={
            "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-2xl md:text-5xl font-semibold text-center whitespace-nowrap"
          }
        >
          {t("consoleHeaderTitle")}
        </h2>
        <hr className="flex-1 border-b-2 border-gray-300" />
      </div>

      <div className="p-5">
        <div className="bg-[#DDDEE3] text-xl text-[#101010] font-semibold w-[98px] h-[106px] flex items-center justify-center rounded-md">
          500 GB
        </div>
      </div>
    </div>
  );
};

export default MobileProductDetails;
