import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Select, Space } from "antd";
import { Check, Group, Info, MoveLeft } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleModal } from "@/lib/features/modal/modalSlice";

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
  const [selectedMemory, setSelectedMemory] = useState<string>("Fair");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<string>("Fat");
  const [selectedTest, setSelectedTest] = useState<string>("Fat");
  const [selectedConsole, setSelectedConsole] = useState("");
  const modalState = useSelector((state: RootState) => state.modal.modal);
  const dispatch = useDispatch();

   

  React.useEffect(() => {
    setIsModalOpen(modalState);
  }, [modalState]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(toggleModal());
  };

  const handleChooseConsole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConsole(e.target.value);
    setCurrentStep(1);
  };

  const handleModel = (memory: string) => {
    setSelectedMemory(memory);
    setCurrentStep(2);
    setSelectedModel(memory); 
  };

  const handleMemory = (memory: string) => {
    setSelectedMemory(memory);
    setCurrentStep(3);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="w-full h-[500px]">
            <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
              Great! Let’s started.
            </h2>
            <p className="text-[#6B6B6B] text-base leading-6 mt-4">
              The phone will have heavy signs of wear, such as deeper scratches,
              dents and other marks. The phone is unlocked, fully tested and
              works like new.
            </p>
            <p className="text-[#101010] text-base leading-6 mt-4">
              Please select your console to add product to cart
            </p>

            <select
              onChange={handleChooseConsole}
              className="w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="console"
              id="console"
              value={selectedConsole || ""}
            >
              <option value="" disabled>
                Choose your console
              </option>
              <option value="lucy">Lucy</option>
              <option value="yiminghe">Yiminghe</option>
              <option value="xios">XIos</option>
            </select>
          </div>
        );

      case 1:
        return (
          // <div className="w-full h-[500px]">
          //   <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
          //     Great! Let’s started.
          //   </h2>
          //   <p className="text-[#6B6B6B] text-base leading-6 mt-4">
          //     The phone will have heavy signs of wear, such as deeper scratches,
          //     dents and other marks. The phone is unlocked, fully tested and
          //     works like new.
          //   </p>
          //   <p className="text-[#101010] text-base leading-6 mt-4">
          //     Please select your location to add product to cart
          //   </p>

          //   <select
          //     className="min-w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          //     // className="w-full px-20 py-2.5 rounded-3xl border border-[#6B6B6B]"
          //     name="Choose your console"
          //     id=""
          //   >
          //     <option
          //       value="Choose your console"
          //       defaultValue={"Choose your console"}
          //       className="max-w-full"
          //     >
          //       Choose your console
          //     </option>
          //     <option value="lucy">Lucy</option>
          //     <option value="Yiminghe">Yiminghe</option>
          //     <option value="disabled">Disabled</option>
          //   </select>

          //   <div className="my-6">
          //     <h4 className="font-semibold text-[24px] mb-2">Model:</h4>
          //     <div className="flex gap-4">
          //       {product.models.map((model) => (
          //         <button
          //           key={model}
          //           className={`lg:px-14 px-10 py-5 border rounded-md ${
          //             selectedModel === model
          //               ? "border-black bg-[#E7E7E7]"
          //               : "border-gray-300"
          //           }`}
          //           onClick={() => handleModel(model)}
          //         >
          //           {model}
          //           <Check />
          //         </button>
          //       ))}
          //     </div>
          //   </div>
          // </div>
          <div className="w-full h-[500px]">
            <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
              Great! Let’s get started.
            </h2>
            <p className="text-[#6B6B6B] text-base leading-6 mt-4">
              The phone will have heavy signs of wear, such as deeper scratches,
              dents, and other marks. The phone is unlocked, fully tested, and
              works like new.
            </p>
            <p className="text-[#101010] text-base leading-6 mt-4">
              Please select your location to add product to cart.
            </p>

            <select
              className="min-w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="Choose your console"
            >
              <option
                value="Choose your console"
                defaultValue={"Choose your console"}
              >
                Choose your console
              </option>
              <option value="Lucy">Lucy</option>
              <option value="Yiminghe">Yiminghe</option>
              <option value="Disabled">Disabled</option>
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
                    onClick={() => handleModel(model)}
                  >
                    {model}
                    {selectedModel === model && <Check />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full min-h-[500px]">
            <h2 className="text-[40px] font-semibold text-[#101010] mt-8">
              Great! Let’s started.
            </h2>
            <p className="text-[#6B6B6B] text-base leading-6 mt-4">
              The phone will have heavy signs of wear, such as deeper scratches,
              dents and other marks. The phone is unlocked, fully tested and
              works like new.
            </p>
            <p className="text-[#101010] text-base leading-6 mt-4">
              Please select your location to add product to cart
            </p>

            <select
              className="min-w-full px-3 py-2 my-3 text-gray-700 bg-white border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    onClick={() => {
                      setSelectedModel(model); // Update the selected model
                    }}
                  >
                    {model}
                    <Check />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-[24px] mb-2">Memory:</h4>
              <div className="flex gap-4">
                {product.memories.map((memory) => (
                  <button
                    key={memory}
                    className={`lg:px-20 px-10 py-5 border rounded-md ${
                      selectedMemory === memory
                        ? "border-black bg-[#E7E7E7]"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleMemory(memory)}
                  >
                    {memory}
                    <Check />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
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
                The estimated value is reimbursed after purchasing your new
                device and inspection of your old device
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-[#101010]">
                What Next?
              </h3>
              <ol className="space-y-3">
                <li className="flex gap-4">
                  <div className="font-semibold text-[#007B52] text-xl">1</div>
                  <div>
                    <h4 className="font-medium text-lg text-[#101010]">
                      Get your new phone
                    </h4>
                    <p className="text-base text-[#5F5F5F]">
                      You&apos;ll keep your old phone until your new one
                      arrives.
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
                      You&apos;ll keep your old phone until your new one
                      arrives.
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
              <button
                onClick={() => dispatch(toggleModal())}
                className="text-base font-medium text-[#222C9B]"
              >
                SKIP TRADE-IN
              </button>
              <button className="py-3 px-[30px] rounded-3xl text-base font-medium text-[#FDFDFD] bg-[#222C9B]">
                ADD TRADE-IN
              </button>
            </div>
          </div>
        );
    }
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
        {renderContent()}
      </Modal>
    </>
  );
};

export default ConsoleModal;
