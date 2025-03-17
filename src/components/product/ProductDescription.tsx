"use client";

import Image from "next/image";
import Container from "../common/Container";
import Link from "next/link";

export default function ProductDescription() {
  const features = [
    "Comes with a sleek and elegant design that blends with alluring matte finish",
    "It holds more power than PS4, it is more than double as powerful in gaming",
    "It increases immersion in PS4 games through an unbelievable boost in frame rate",
    "Comes with HDR technology to deliver vibrant, lifelike colors and details in visual",
    "Amazing 4K clarity makes everything so clear and life like never before",
    "PS4 pro has stunning graphical details with sharper and super contrasts visual",
    "In Sony Bravia 4K TV, PS4 pro shows the most vibrant and clear display ever",
  ];

  return (
    <div className="flex flex-col gap-8 rounded-lg">
      <div>
        <div className="bg-[#FDFDFD] rounded-2xl p-6">
          {/* <Container> */}
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Description
          </h2>

          <Image
            src={"/products/product-description.png"}
            className="w-full"
            width={900}
            height={900}
            alt="pdesc"
          />

          {/* Product Title */}
          <h1 className="text-2xl font-bold text-gray-900 my-10">
            Play Station 4 Pro - PS4 Pro
          </h1>

          {/* Main Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            The PlayStation 4 Pro (PS4 Pro) is a powerful gaming console from
            Sony. It's a significant upgrade from the standard PS4, offering
            enhanced graphics and 4K support. It delivers stunning visual
            fidelity, more power than PS4, and great GPU that is general PS4.
            With this combination, it provides smoother gameplay and much faster
            frame rates. The Pro's expanded storage caters to the demands of
            modern gaming, allowing for larger game libraries. With an extensive
            catalog of exclusive titles and immersive gaming experiences, The
            PS4 Pro became a cornerstone of entertainment, captivating gamers
            with its unparalleled graphics and seamless gameplay.
          </p>

          {/* Secondary Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Play Station 4 Pro - PS4 Pro
          </h2>

          {/* Features List */}
          <ul className="space-y-3 text-gray-600">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 text-xs">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {/* </Container> */}
        </div>
      </div>

      <div className="bg-[#FDFDFD] p-6 rounded-lg">
        <h3 className="text-2xl text-[#101010] font-semibold mb-4">
          Description
        </h3>
        <h2 className="text-[32px] font-semibold mb-4">
          Play Station 4 Pro - PS4 Pro
        </h2>

        <p className="text-base text-[#5F5F5F] ">
          Explore our{" "}
          <Link href={"#"} className="text-[#222C9B] underline">
            Warranty Policy
          </Link>{" "}
          page for detailed information about our warranty coverage.
        </p>
      </div>
    </div>
  );
}
