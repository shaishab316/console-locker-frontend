"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Check, Group, Info } from "lucide-react";
import ReviewCarousel from "@/components/share/review-carousel/ReviewCarousel";
import Container from "@/components/common/Container";
import { BlogCarousel } from "@/components/home/blogs/BlogCarousel";
import ConsoleModal from "@/components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/lib/features/modal/modalSlice";
import { RootState } from "@/lib/store";
import ProductSpecification from "@/components/product/ProductSpecification";
import ProductDescription from "@/components/product/ProductDescription";
import Link from "next/link";
import { showTradeInDescription } from "@/lib/features/tradeIn/showTradeInSlice";
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
  const [tradeIn, setTradeIn] = useState<boolean | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deviceValue, setDeviceValue] = useState(5.0);
  const [deviceModel, setDeviceModel] = useState("IpHOME 8 PLUS, 500gb");
  const [addTradeIn, setAddTradeIn] = useState(true);
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal.modal);
  const isOpenTradeIn = useSelector(
    (state: RootState) => state.showTradeInData.isOpenTradeIn
  );

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

  const handleTrade = () => {
    dispatch(toggleModal());
    setAddTradeIn((prev) => !prev);
  };

  const startOver = () => {
    dispatch(toggleModal());
    dispatch(showTradeInDescription());
    // setAddTradeIn(true);
  };

  console.log(addTradeIn);

  return (
    <div className="py-16 bg-[#F2F5F7]">
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
            <p className="text-[#2B2B2B] text-lg mb-2 flex items-center justify-between">
              {selectedModel} | {selectedMemory} | Black{" "}
              <span className="text-sm text-gray-500">incl. tax</span>
            </p>

            {/* Model */}
            <div className="mb-6">
              <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                Model:
              </h4>
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
              <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                Controller:
              </h4>
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
              <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                Memory:
              </h4>
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
              <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                Conditions:
              </h4>
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
              {!isOpenTradeIn ? (
                <>
                  <h4 className="text-2xl font-semibold text-[#101010] mb-2">
                    Trade-in:
                  </h4>
                  <button
                    className={`px-20 py-8 border rounded-md ${
                      modalState
                        ? "border-black bg-[#E7E7E7]"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      handleTrade();
                      // setTradeIn(!tradeIn);
                      // setOpenModal(!openModal);
                    }}
                  >
                    {modalState ? "No" : "Yes"}
                  </button>
                </>
              ) : (
                <div>
                  {/* Conditions Box */}
                  <div className="bg-[#f0f7ff] p-4 rounded-lg mb-6">
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium text-gray-900">
                        Conditions:
                      </span>{" "}
                      The phone will have heavy signs of wear, such as deeper
                      scratches, dents and other marks. The phone is unlocked,
                      fully tested and works like new.
                    </p>
                    <button className="text-blue-600 hover:underline text-sm">
                      Learn More
                    </button>
                  </div>

                  {/* Trade-in Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Trade-in
                    </h2>
                    <button
                      onClick={() => startOver()}
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      Start over
                    </button>
                  </div>

                  {/* Value Display */}
                  <div className="bg-[#e8f7f1] p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </button>
                      <p className="text-center flex-1 text-gray-600">
                        yOUR {deviceModel} IS VALUED AT $
                        {deviceValue.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="text-gray-600 border-l-4 border-black rounded-s-lg">
                    <p className="p-3">
                      After trade-in price estimate. We will ship the free
                      trade-in kit to your home address and refund the trade-in
                      value within 2-3 business days from receiving the phone.
                    </p>
                  </div>

                  <div className="my-4 border-b"></div>
                </div>
              )}
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
              {/* <select className="w-full border p-5 rounded-3xl">
                <option>PlayStation 5 </option>
                <option>Xbox Series X </option>
                <option>Nintendo Switch </option>
                <option>OLED Steam Deck</option>
                <option>PlayStation 4 Pro</option>
              </select> */}

              <div className="relative w-full">
                <select
                  name="phoneCode"
                  // value={formData.phoneCode}
                  // onChange={(e) => handleInputChange(e as any)}
                  className="px-3 py-2 border rounded-3xl bg-white text-sm sm:text-base appearance-none w-full"
                >
                  <option value="PlayStation 4 Pro">PlayStation 5</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="OLED Steam Deck">OLED Steam Deck</option>
                  <option value="PlayStation 4 Pro">PlayStation 4 Pro</option>
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center px-3">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#DAEDF2] p-3 rounded-md">
                  <Image
                    src="/sell/microusb.png"
                    width={20}
                    height={20}
                    alt="usb"
                  />
                </div>
                <h2 className="text-base font-medium text-[#101010]">
                  Micro USB, HDMI Cable, Power Cable.
                </h2>
              </div>
              <Link
                href={"/cart"}
                className="bg-black text-white text-center px-6 py-3 rounded-md"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-[32px] font-semibold mb-4">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/buy/${product.id}`} passHref>
                <div className="shadow-sm hover:shadow-md border border-gray-100 rounded-lg pb-2">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="object-center object-cover w-full"
                  />
                  <div className="px-3">
                    <h3 className="text-xl text-[#101010] font-semibold mb-2 mt-5">
                      {product.title}
                    </h3>
                    <div className="text-[#2B2B2B] mb-2 flex items-center justify-between">
                      <div>
                        Condition:
                        <span className="font-medium text-[#2B2B2B]">
                          {product.condition}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
                      <div className="flex items-center gap-2">
                        <p className="text-[#2B2B2B] text-base">Price:</p>
                        <span className="text-[#00B67A] text-lg font-semibold">
                          {product.price}
                        </span>
                      </div>
                      <span className="text-sm text-[#919191] line-through">
                        New: 350
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ProductSpecification />
        <ProductDescription />

        {/* {tradeIn && <ConsoleModal  />} */}
        {modalState && <ConsoleModal />}

        {/* <ProductDescription /> */}
        {/* <Blogs /> */}
      </Container>
      <ReviewCarousel />
      <BlogCarousel />
    </div>
  );
};

export default ProductDetailsPage;
