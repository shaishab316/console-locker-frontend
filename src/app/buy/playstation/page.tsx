"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Select } from "antd";
import Link from "next/link";

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
  const itemsPerPage = 9;

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
      {/* Sidebar */}
      <div className="w-full max-h-max lg:w-1/4 bg-white shadow-md rounded-md p-4 mb-5">
        <h3 className="text-xl font-semibold mb-4">Filter</h3>
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

      {/* Product Grid */}
      <div className="w-full lg:w-3/4 lg:ml-6">
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center cursor-pointer">
            <div
              onClick={() => setView("grid")}
              className="hover:bg-gray-200 p-3 rounded-lg"
            >
              <LayoutGrid />
            </div>
            <div
              onClick={() => setView("list")}
              className="hover:bg-gray-200 p-3 rounded-lg"
            >
              <LayoutList />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Sort by"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "High to Low",
                },
                {
                  value: "2",
                  label: "Low to High",
                },
              ]}
            />
          </div>
        </div>

        {/* Products */}
        <div
          className={`grid ${
            view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""
          } gap-6`}
        >
          {paginatedProducts.map((product) => (
            <Link key={product.id} href={`/buy/${product.id}`} passHref>
              <div className="shadow-xl rounded-lg pb-2">
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
                  </div>
                  <div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
                    <div className="flex items-center gap-2">
                      <p>Price:</p>
                      <span className="text-green-500 font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <span className="line-through">New: 350</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-6">
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
                Math.min(prev + 1, Math.ceil(products.length / itemsPerPage))
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-md ml-2"
          >
            <ChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
