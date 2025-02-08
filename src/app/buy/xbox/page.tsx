"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  LayoutList,
  X,
} from "lucide-react";
import { Select } from "antd";
import Link from "next/link";
import Container from "@/components/common/Container";

interface Product {
  title: string;
  condition: string;
  price: string;
  image: string;
  brand: string;
  id: number;
}

const products: Product[] = [
  {
    id: 1,
    title: "PlayStation 5",
    condition: "Good",
    price: "$299",
    image: "/buy/p1.png",
    brand: "PlayStation",
  },
  {
    id: 2,
    title: "Zeust Xbox One S",
    condition: "Good",
    price: "$299",
    image: "/buy/p2.png",
    brand: "Xbox",
  },
  {
    id: 3,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p3.png",
    brand: "Xbox",
  },
  {
    id: 4,
    title: "PlayStation 5",
    condition: "Good",
    price: "$299",
    image: "/buy/p4.png",
    brand: "PlayStation",
  },
  {
    id: 5,
    title: "Zeust Xbox One S",
    condition: "Good",
    price: "$299",
    image: "/buy/p5.png",
    brand: "Xbox",
  },
  {
    id: 6,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p6.png",
    brand: "Xbox",
  },
  {
    id: 7,
    title: "PlayStation 5",
    condition: "Good",
    price: "$299",
    image: "/buy/p7.png",
    brand: "PlayStation",
  },
  {
    id: 8,
    title: "Zeust Xbox One S",
    condition: "Good",
    price: "$299",
    image: "/buy/p8.png",
    brand: "Xbox",
  },
  {
    id: 9,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 943,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 935,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 921,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 249,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 93543,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 589,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 4079,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 3079,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
  {
    id: 325439,
    title: "Xbox",
    condition: "Good",
    price: "$299",
    image: "/buy/p9.png",
    brand: "Xbox",
  },
];

const ProductPage: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(1);
  const [filterView, setFilterView] = useState(false);
  const itemsPerPage = 9;

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="relative bg-[#F2F5F7] flex flex-col lg:flex-row py-8">
      <Container>
        {/* Sidebar */}
        <div className="flex">
          <div
            className={`w-0 lg:max-h-max lg:w-1/4 bg-white rounded-md lg:p-5 lg:mb-5`}
          >
            <h3 className="hidden md:flex text-xl font-semibold mb-4">
              Filter
            </h3>

            {/* filter icon for mobile device */}
            {/* <div
              onClick={() => setFilterView(!filterView)}
              className={`flex md:hidden items-center gap-2 border ${
                filterView && "bg-gray-200"
              } rounded-lg w-max p-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-filter"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <h3 className="text-lg font-medium">Filter</h3>
            </div> */}

            {/* for mobile */}
            {filterView && (
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-lg p-5">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold mb-2">Products</h4>
                    <p>
                      <X onClick={() => setFilterView(false)} />
                    </p>
                  </div>

                  <select className="w-full border rounded-md p-2">
                    <option>All</option>
                    <option>PlayStation</option>
                    <option>Xbox</option>
                    <option>Nintendo</option>
                  </select>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Brand</h4>
                  <select className="w-full border rounded-md p-2">
                    <option>All</option>
                    <option>PlayStation</option>
                    <option>Xbox</option>
                    <option>Nintendo</option>
                  </select>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Price Range</h4>
                  <select className="w-full border rounded-md p-2">
                    <option>All</option>
                    <option>$100 - $300</option>
                    <option>$300 - $500</option>
                    <option>$500+</option>
                  </select>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Condition</h4>
                  <select className="w-full border rounded-md p-2">
                    <option>All</option>
                    <option>Good</option>
                    <option>New</option>
                  </select>
                </div>
                <button
                  onClick={() => setFilterView(!filterView)}
                  className="bg-black text-white text-lg w-full rounded-xl py-3"
                >
                  Filter
                </button>
              </div>
            )}

            {/* for desktop */}
            <div className="hidden lg:block">
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Products</h4>
                <select className="w-full border rounded-md p-2">
                  <option>All</option>
                  <option>PlayStation</option>
                  <option>Xbox</option>
                  <option>Nintendo</option>
                </select>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Brand</h4>
                <select className="w-full border rounded-md p-2">
                  <option>All</option>
                  <option>PlayStation</option>
                  <option>Xbox</option>
                  <option>Nintendo</option>
                </select>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Price Range</h4>
                <select className="w-full border rounded-md p-2">
                  <option>All</option>
                  <option>$100 - $300</option>
                  <option>$300 - $500</option>
                  <option>$500+</option>
                </select>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Condition</h4>
                <select className="w-full border rounded-md p-2">
                  <option>All</option>
                  <option>Good</option>
                  <option>New</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4 lg:ml-6">
            {/* View Toggle */}
            <div className="lg:bg-[#FDFDFD] flex justify-between items-center p-2.5 rounded-md mb-4">
              {/*  */}
              <div
                onClick={() => setFilterView(!filterView)}
                className={`flex lg:hidden items-center gap-2 border ${
                  filterView && "bg-gray-200"
                } rounded-lg w-max p-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-filter"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <h3 className="text-lg font-medium">Filter</h3>
              </div>

              {/* view - grid / list */}
              <div className="hidden lg:flex gap-2 items-center cursor-pointer">
                <div
                  onClick={() => setView("grid")}
                  className={`hover:bg-[#DAEDF2] p-3 rounded-lg ${
                    view === "grid" ? "bg-[#DAEDF2]" : ""
                  }`}
                >
                  {/* <LayoutGrid /> */}
                  <Image
                    src="/sell/grid.svg"
                    width={20}
                    height={20}
                    alt="grid"
                  />
                </div>
                <div
                  onClick={() => setView("list")}
                  className={`hover:bg-[#DAEDF2] p-3 rounded-lg ${
                    view === "list" ? "bg-[#DAEDF2]" : ""
                  }`}
                >
                  {/* <LayoutList /> */}
                  <Image
                    src="/sell/list.svg"
                    width={20}
                    height={20}
                    alt="grid"
                  />
                </div>
              </div>

              {/* sorting */}
              <div className="flex gap-2">
                <select className="w-48 md:w-56 px-4 py-2 border border-gray-300 rounded-md text-xs bg-white text-[#101010] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer">
                  <option defaultValue={"Sort by"}>Sort by</option>
                  <option value="High to low">High to Low</option>
                  <option value="Low to high">Low to High</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {view === "grid" ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
              >
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/buy/${product.id}`}
                    className="rounded-lg"
                    passHref
                  >
                    <div className="shadow-sm hover:shadow-md bg-[#FDFDFD]  border border-gray-100 rounded-lg pb-2">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={200}
                        className="object-center object-cover w-full rounded-lg"
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
            ) : null}

            {view === "list" ? (
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12`}>
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/buy/${product.id}`}
                    className="rounded-lg"
                    passHref
                  >
                    <div className="flex items-center shadow-sm hover:shadow-md bg-[#FDFDFD]  border border-gray-100 rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={200}
                        className="object-center object-cover w-1/2 h-full rounded-lg"
                        //
                      />
                      <div className="px-3">
                        <h3 className="text-xl text-[#101010] font-semibold mb-2 mt-5">
                          {product.title}
                        </h3>
                        <div className="text-[#2B2B2B] mb-2 flex items-center justify-between">
                          <div>
                            Condition:
                            <span className="font-medium text-[#2B2B2B]">
                              {" "}
                              {product.condition}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
                          <div className="flex items-center gap-2">
                            <p className="text-[#2B2B2B] text-base">
                              Price:{" "}
                              <span className="text-[#00B67A] text-lg font-semibold">
                                {product.price}
                              </span>
                            </p>
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
            ) : null}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 my-12">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-200 rounded-md mr-2"
              >
                <ChevronsLeft />
              </button>
              {[1, 2, 3].map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 rounded-md ${
                    page === pageNumber ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(products.length / itemsPerPage)
                    )
                  )
                }
                className="px-4 py-2 bg-gray-200 rounded-md ml-2"
              >
                <ChevronsRight />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
