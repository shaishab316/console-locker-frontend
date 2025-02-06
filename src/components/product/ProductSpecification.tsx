"use client";

import { useState } from "react";

interface SpecificationRow {
  label: string;
  value: string;
}

const specificationData: SpecificationRow[] = [
  { label: "Brand", value: "Sony" },
  { label: "Body", value: "295×55×327 mm | 3.3 kg" },
  { label: "Model", value: "Play Station 4 Pro - PS4 Pro" },
  {
    label: "Interface / Port",
    value:
      "Super-Speed USB (USB 3.1 Gen.1) port | AUX port | HDMI out port | DIGITAL OUT (OPTICAL) port",
  },
  { label: "Connectivity", value: "Ethernet | IEEE 802.11 | Bluetooth® 4.0" },
  { label: "Storage", value: "1TB" },
  {
    label: "Chipset",
    value:
      'x86-64 AMD "Jaguar", 8 cores CPU | 4.20 TFLOPS, AMD Radeon-based graphics engine GPU',
  },
  { label: "Memory", value: "GDDR5 8GB" },
  {
    label: "Other Features / Info",
    value: "BD × 6 CAV | DVD × 8 CAV | 5 °C – 35°C (operating temperature)",
  },
];

type Tab = "Specification" | "Description" | "Warranty";

export default function ProductSpecification() {
  const [activeTab, setActiveTab] = useState<Tab>("Specification");

  const tabs: Tab[] = ["Specification", "Description", "Warranty"];

  return (
    <div className="bg-[#F2F5F7] mt-20 mb-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md transition-colors duration-200 text-sm md:text-base
              ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-[#FDFDFD] rounded-lg shadow-sm">
        {activeTab === "Specification" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Specification</h2>
            {/* <div className="divide-y">
              {specificationData.map((row, index) => (
                <table
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[200px,1fr] py-4 gap-2"
                >
                  <tr className="font-medium text-gray-900">{row.label}</tr>
                  <tr className="text-gray-600">{row.value}</tr>
                </table>
              ))}
            </div> */}

            <div className="overflow-x-auto rounded-[10px] border border-gray-300">
              <table className="min-w-full border border-gray-300 border-collapse rounded-lg">
                <tbody className="rounded-lg">
                  {specificationData.map((row, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="border border-gray-300 px-6 py-4 text-base font-medium text-[#000000]">
                        {row.label}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-[#5F5F5F]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Description" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">
              Product description content would go here.
            </p>
          </div>
        )}

        {activeTab === "Warranty" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Warranty</h2>
            <p className="text-gray-600">Warranty information would go here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
