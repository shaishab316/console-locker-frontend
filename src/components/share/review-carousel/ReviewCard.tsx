"use client";

import Image from "next/image";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface ReviewCardProps {
  comment: string;
  createdAt: string;
  customer: { name: string; avatar: string };
  product: string;
  rating: 3;
  updatedAt: string;
  _id: string;
}

export default function ReviewCard({
  comment,
  createdAt,
  customer: { name, avatar },
  product,
  rating,
  updatedAt,
  _id,
}: ReviewCardProps) {
  const [textLength, setTextLength] = useState(130);

  const [selectedLang, setSelectedLang] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const lang = localStorage?.getItem("i18nextLng");
    setSelectedLang(lang || "");
  }, []);

  // console.log(comment);

  return (
    <div className="bg-white p-6 rounded-lg h-full flex flex-col">
      {" "}
      {/* Full height */}
      <p className="text-[#000000] leading-7 text-lg mb-6 flex-grow overflow-y-auto">
        {comment}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={`${API_URL}${avatar}`}
              alt={"author"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">{name}</h3>
            {/* <p className="text-gray-600 text-sm">{position}</p> */}
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) =>
            index < rating ? (
              <StarFilled key={index} className="text-yellow-400 text-lg" />
            ) : (
              <StarOutlined key={index} className="text-gray-300 text-lg" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
