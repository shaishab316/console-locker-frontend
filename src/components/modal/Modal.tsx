import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Select, Space } from "antd";
import { Check, Group, Info, MoveLeft } from "lucide-react";
import Image from "next/image";

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

const ConsoleModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>("Fat");
  const [selectedMemory, setSelectedMemory] = useState<string>("500 Gb");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {/* initial content after modal */}

        {/* <div className="w-full border-2">
          <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
            Great! Let’s started.
          </h2>
          <p className="text-[#6B6B6B] text-base leading-6 mt-4">
            The phone will have heavy signs of wear, such as deeper scratches,
            dents and other marks. The phone is unlocked, fully tested and works
            like new.
          </p>
          <p className="text-[#101010] leading-6 mt-4">
            Please select your location to add product to cart
          </p>

          <Space wrap style={{ width: "100%" }}>
            <Select
              defaultValue="lucy"
              style={{ width: "100%" }}
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "Yiminghe" },
                { value: "disabled", label: "Disabled" },
              ]}
            />
          </Space>
        </div> */}

        {/* second content */}
        {/* <div className="w-full h-[500px]">
          <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
            Great! Let’s started.
          </h2>
          <p className="text-[#6B6B6B] text-base leading-6 mt-4">
            The phone will have heavy signs of wear, such as deeper scratches,
            dents and other marks. The phone is unlocked, fully tested and works
            like new.
          </p>
          <p className="text-[#101010] text-base leading-6 mt-4">
            Please select your location to add product to cart
          </p>

          <select
            className="w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            // className="w-full px-20 py-2.5 rounded-3xl border border-[#6B6B6B]"
            name="Choose your console"
            id=""
          >
            <option
              value="Choose your console"
              defaultValue={"Choose your console"}
            >
              Choose your console
            </option>
            <option value="lucy">Lucy</option>
            <option value="Yiminghe">Yiminghe</option>
            <option value="disabled">Disabled</option>
          </select>
        </div> */}

        {/* third content */}

        {/* <div className="w-full h-[500px]">
          <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
            Great! Let’s started.
          </h2>
          <p className="text-[#6B6B6B] text-base leading-6 mt-4">
            The phone will have heavy signs of wear, such as deeper scratches,
            dents and other marks. The phone is unlocked, fully tested and works
            like new.
          </p>
          <p className="text-[#101010] text-base leading-6 mt-4">
            Please select your location to add product to cart
          </p>

          <select
            className="w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            // className="w-full px-20 py-2.5 rounded-3xl border border-[#6B6B6B]"
            name="Choose your console"
            id=""
          >
            <option
              value="Choose your console"
              defaultValue={"Choose your console"}
            >
              Choose your console
            </option>
            <option value="lucy">Lucy</option>
            <option value="Yiminghe">Yiminghe</option>
            <option value="disabled">Disabled</option>
          </select>

          
          <div className="my-6">
            <h4 className="font-semibold text-[24px] mb-2">Model:</h4>
            <div className="flex gap-4">
              {product.models.map((model) => (
                <button
                  key={model}
                  className={`lg:px-14 px-10 py-5 border rounded-md ${
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
        </div> */}

        {/* fourth content */}
        {/* <div className="w-full min-h-[500px]">
          <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
            Great! Let’s started.
          </h2>
          <p className="text-[#6B6B6B] text-base leading-6 mt-4">
            The phone will have heavy signs of wear, such as deeper scratches,
            dents and other marks. The phone is unlocked, fully tested and works
            like new.
          </p>
          <p className="text-[#101010] text-base leading-6 mt-4">
            Please select your location to add product to cart
          </p>

          <select
            className="w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            // className="w-full px-20 py-2.5 rounded-3xl border border-[#6B6B6B]"
            name="Choose your console"
            id=""
          >
            <option
              value="Choose your console"
              defaultValue={"Choose your console"}
            >
              Choose your console
            </option>
            <option value="lucy">Lucy</option>
            <option value="Yiminghe">Yiminghe</option>
            <option value="disabled">Disabled</option>
          </select>

          <div className="my-6">
            <h4 className="font-semibold text-[24px] mb-2">Model:</h4>
            <div className="flex gap-4">
              {product.models.map((model) => (
                <button
                  key={model}
                  className={`lg:px-14 px-10 py-5 border rounded-md ${
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
        </div> */}

        {/* fifth content */}
        <div className="w-full min-h-[500px]">
          <h2 className="flex items-center gap-5 text-lg font-semibold text-[#101010] mt-8">
            <Image
              src={"/modal/arrow-left.png"}
              width={20}
              height={20}
              alt="arrow"
            />{" "}
            Great! Let’s started.
          </h2>
          <p className="text-[#6B6B6B] text-base leading-6 mt-4">
            Your estimated trade-in your iPhone 8 Plus, 500GBis:
          </p>

          <div className="bg-[#D1FCEE] my-6 p-6 rounded-lg">
            <h2 className="text-[#007B52] text-center text-5xl font-semibold leading-[]">
              $5,00
            </h2>

            <p className="text-base text-center max-w-80 mx-auto text-[#007B52] leading-6 mt-4">
              The estimated value is reimbursed after purchasing your new device
              and inspection of your old device
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-[#101010]">What Next?</h3>
            <ol className="space-y-3">
              <li className="flex gap-4">
                <div className="font-semibold text-[#007B52] text-xl">1</div>
                <div>
                  <h4 className="font-medium text-lg text-[#101010]">
                    Get your new phone
                  </h4>
                  <p className="text-base text-[#5F5F5F]">
                    You&apos;ll keep your old phone until your new one arrives.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="font-semibold text-[#007B52] text-xl">2</div>
                <div>
                  <h4 className="font-medium text-lg text-[#101010]">
                    Send your old phone for free
                  </h4>
                  <p className="text-base text-[#5F5F5F]">
                    You&apos;ll keep your old phone until your new one arrives.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="font-semibold text-[#007B52] text-xl">3</div>
                <div>
                  <h4 className="font-medium text-lg text-[#101010]">
                    Get paid
                  </h4>
                  <p className="text-base text-[#5F5F5F]">
                    We'll inspect the device and make the refund in 2-3 days
                    after we have receive your phone
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 p-4 my-2 rounded-lg flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-600 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-sm text-blue-600">
              We are not able to return any accessories or packaging sent with
              the device.
            </p>
          </div>

          <div className="flex gap-4 justify-end my-3">
            <button className="text-base font-medium text-[#222C9B]">
              SKIP TRADE-IN
            </button>
            <button className="py-3 px-[30px] rounded-3xl text-base font-medium text-[#FDFDFD] bg-[#222C9B]">
              ADD TRADE-IN
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConsoleModal;

// test

// ("use client");

// import { useState } from "react";
// import Link from "next/link";

// export default function TradeIn() {
//   const [deviceModel] = useState("iPhone 8 Plus, 500GB");
//   const [tradeInValue] = useState(5.0);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header Section */}
//       <header className="p-4 flex items-center border-b">
//         <Link href="/previous-page" className="text-gray-600">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 19.5L8.25 12l7.5-7.5"
//             />
//           </svg>
//         </Link>
//       </header>

//       {/* Main Content */}
//       <main className="p-4 max-w-2xl mx-auto">
//         <div className="space-y-6">
//           {/* Title Section */}
//           <div className="space-y-2">
//             <h1 className="text-xl font-semibold">
//               Great! Let&apos;s started.
//             </h1>
//             <p className="text-sm text-gray-600">
//               Your estimated trade-in your {deviceModel}:
//             </p>
//           </div>

//           {/* Trade-in Value Box */}
//           <div className="bg-[#e8f7f1] p-6 rounded-xl text-center space-y-2">
//             <h2 className="text-3xl font-bold text-gray-900">
//               ${tradeInValue.toFixed(2)}
//             </h2>
//             <p className="text-sm text-gray-600 max-w-xs mx-auto">
//               The estimated value is reimbursed after purchasing your new device
//               and inspection of your old device
//             </p>
//           </div>

//           {/* What Next Section */}
//           <div className="space-y-4">
//             <h3 className="font-semibold">What Next?</h3>
//             <ol className="space-y-6">
//               <li className="flex gap-4">
//                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
//                   1
//                 </div>
//                 <div>
//                   <h4 className="font-medium">Get your new phone</h4>
//                   <p className="text-sm text-gray-600">
//                     You&apos;ll keep your old phone until your new one arrives.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex gap-4">
//                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
//                   2
//                 </div>
//                 <div>
//                   <h4 className="font-medium">Send your old phone for free</h4>
//                   <p className="text-sm text-gray-600">
//                     You&apos;ll keep your old phone until your new one arrives.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex gap-4">
//                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
//                   3
//                 </div>
//                 <div>
//                   <h4 className="font-medium">Get paid</h4>
//                   <p className="text-sm text-gray-600">
//                     We&apos;ll inspect the device and make the refund in 2-3
//                     days after we have receive your phone
//                   </p>
//                 </div>
//               </li>
//             </ol>
//           </div>

//           {/* Info Box */}
//           <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 text-blue-600 flex-shrink-0"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
//               />
//             </svg>
//             <p className="text-sm text-blue-600">
//               We are not able to return any accessories or packaging sent with
//               the device.
//             </p>
//           </div>
//         </div>
//       </main>

//       {/* Footer Buttons */}
//       <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-4 md:static md:mt-6">
//         <button className="flex-1 px-4 py-3 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//           SKIP TRADE-IN
//         </button>
//         <button className="flex-1 px-4 py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
//           ADD TRADE-IN
//         </button>
//       </footer>
//     </div>
//   );
// }
