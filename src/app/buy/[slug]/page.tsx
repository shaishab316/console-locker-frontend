"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Check, Group, Info } from "lucide-react";
import ReviewCarousel from "@/components/share/review-carousel/ReviewCarousel";
import Container from "@/components/common/Container";
import { BlogCarousel } from "@/components/home/blogs/BlogCarousel";
import ConsoleModal from "@/components/modal/Modal";
// import ProductDescription from "@/pages/ProductDescription";

interface Product {
  title: string;
  price: string;
  image: string;
  description: string;
  models: string[];
  controllers: number[];
  memories: string[];
  conditions: string[];
}

interface RelatedProduct {
  id: number;
  title: string;
  condition: string;
  price: string;
  image: string;
  brand: string;
}

const ProductDetailsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("Fat");
  const [selectedController, setSelectedController] = useState<number>(0);
  const [selectedMemory, setSelectedMemory] = useState<string>("500 Gb");
  const [selectedCondition, setSelectedCondition] = useState<string>("Fair");
  const [tradeIn, setTradeIn] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const product: Product = {
    title: "Xbox One",
    price: "$1191",
    image: "/productss/a1.png",
    description:
      "The phone will have heavy signs of wear, such as deeper scratches, dents, and other marks. The phone is unlocked, fully tested, and works like new.",
    models: ["Fat", "Slim", "Pro"],
    controllers: [0, 1, 2],
    memories: ["500 Gb", "1 Tb"],
    conditions: ["Fair", "Good", "Excellent"],
  };

  const products: RelatedProduct[] = [
    {
      title: "PlayStation 5",
      condition: "Good",
      price: "$299",
      image: "/dynamic/p1.png",
      brand: "PlayStation",
      id: 1,
    },
    {
      title: "Zeust Xbox One S",
      condition: "Good",
      price: "$299",
      image: "/dynamic/p2.png",
      brand: "Xbox",
      id: 2,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/dynamic/p3.png",
      brand: "Xbox",
      id: 3,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/dynamic/p4.png",
      brand: "Xbox",
      id: 4,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/dynamic/a5.png",
      brand: "Xbox",
      id: 5,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/products/a6.png",
      brand: "Xbox",
      id: 6,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/products/a7.png",
      brand: "Xbox",
      id: 7,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/products/a8.png",
      brand: "Xbox",
      id: 8,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/products/a9.png",
      brand: "Xbox",
      id: 9,
    },
    {
      title: "Xbox",
      condition: "Good",
      price: "$299",
      image: "/products/a10.png",
      brand: "Xbox",
      id: 10,
    },
  ];

  return (
    <div className="py-16">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Image
              src="/buy1.png"
              alt="Console Locker"
              width={1400}
              height={900}
              className="rounded-lg"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {product.price}
              </h2>
            </div>
            <p className="text-gray-600 mb-2 flex items-center justify-between">
              {selectedModel} | {selectedMemory} | Black{" "}
              <span className="text-sm text-gray-500">incl. tax</span>
            </p>

            {/* Model */}
            <div className="mb-6">
              <h4 className="font-semibold text-[24px] mb-2">Model:</h4>
              <div className="flex gap-4">
                {product.models.map((model) => (
                  <button
                    key={model}
                    className={`lg:px-20 px-10 py-5 border rounded-md ${
                      selectedModel === model
                        ? "border-black bg-[#E7E7E7]"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    {model}
                    <Check />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#daedf2] p-4 py-6 rounded-lg border-l-4 border-black">
              {product.description}
            </div>

            {/* Controller */}
            <div className="mb-6 mt-3">
              <h4 className="font-semibold mb-2">Controller:</h4>
              <div className="flex gap-4">
                {product.controllers.map((controller) => (
                  <button
                    key={controller}
                    className={`lg:px-20 px-10 py-5 border rounded-md ${
                      selectedController === controller
                        ? "border-black bg-[#E7E7E7]"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedController(controller)}
                  >
                    {controller}
                    <Check />
                  </button>
                ))}
              </div>
            </div>

            {/* Memory */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Memory:</h4>
              <div className="flex gap-4">
                {product.memories.map((memory) => (
                  <button
                    key={memory}
                    className={`lg:px-20 px-10 py-5 border rounded-md ${
                      selectedMemory === memory
                        ? "border-black bg-[#E7E7E7]"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedMemory(memory)}
                  >
                    {memory}
                    <Check />
                  </button>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Conditions:</h4>
              <div className="flex gap-4">
                {product.conditions.map((condition) => (
                  <button
                    key={condition}
                    className={`lg:px-20 px-8 py-5 border rounded-md ${
                      selectedCondition === condition
                        ? "border-black bg-[#E7E7E7]"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedCondition(condition)}
                  >
                    {condition}
                    <Check />
                  </button>
                ))}
              </div>
            </div>

            {/* Trade-in */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Trade-in:</h4>
              <button
                className={`px-20 py-8 border rounded-md ${
                  tradeIn ? "border-black bg-[#E7E7E7]" : "border-gray-300"
                }`}
                onClick={() => {
                  setTradeIn(!tradeIn);
                  setOpenModal(!openModal);
                }}
              >
                {tradeIn ? "Yes" : "No"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-black text-[18px] font-medium mb-2 flex items-center justify-between">
                {selectedModel} | {selectedMemory} | Black
              </p>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {product.price}
                </h2>
                <span className="text-sm text-gray-500">incl. tax</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-normal mb-2">
                Please select your console to add product to cart
              </h4>
              <select className="w-full border p-5 rounded-3xl">
                <option>PlayStation 5 </option>
                <option>Xbox Series X </option>
                <option>Nintendo Switch </option>
                <option>OLED Steam Deck</option>
                <option>PlayStation 4 Pro</option>
              </select>
            </div>

            <div className="flex flex-col gap-4 space-y-4">
              <div className="flex items-center gap-4">
                <Group />
                <h1>Ready to be shipped.</h1>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-[32px] font-semibold mb-4">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div className="shadow-xl rounded-lg" key={product.id}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="object-center object-cover w-full"
                />

                <div className="px-3">
                  <h3 className="text-lg font-semibold mb-2 mt-5">
                    {product.title}
                  </h3>
                  <div className="text-gray-600 mb-2 flex items-center justify-between">
                    <div>
                      Condition:
                      <span className="font-semibold">{product.condition}</span>
                    </div>
                    <Info />
                  </div>
                  <div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
                    <div className="flex items-center gap-2">
                      <p> Price:</p>
                      <span className="text-green-500 font-semibold">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {openModal && <ConsoleModal />}

        {/* <ProductDescription /> */}
        {/* <Blogs /> */}
      </Container>
      <ReviewCarousel />
      <BlogCarousel />
    </div>
  );
};

export default ProductDetailsPage;
