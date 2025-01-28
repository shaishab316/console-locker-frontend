"use client";

// import Container from "@/components/common/Container";
import HowDelivery from "@/components/sell/HowDelivery";
import { useRouter } from "next/navigation";

import { useState } from "react";

const STORAGE_OPTIONS = [
  { value: "128", label: "128GB" },
  { value: "256", label: "256GB" },
  { value: "512", label: "512GB" },
  { value: "1024", label: "1024GB" },
];

export default function StorageSelector() {
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const router = useRouter();

  const handleRouter = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStorage) {
      router.push("/sell/next1");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStorage) {
      router.push("/sell/next1");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center mb-24">
      <div className="w-full max-w-[798px] mx-auto my-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Playstation 4
            </h1>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              What is the storage of your items?
            </h2>
            <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
              You can check the storage by going to &quot;Settings&quot; &gt;
              &quot;General&quot; &gt; &quot;About&quot;
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3 mb-6">
              {STORAGE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`block w-full border rounded-md p-3 cursor-pointer transition-colors
                    ${
                      selectedStorage === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                >
                  <input
                    type="radio"
                    name="storage"
                    value={option.value}
                    checked={selectedStorage === option.value}
                    onChange={(e) => setSelectedStorage(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!selectedStorage}
                onClick={handleRouter}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    selectedStorage
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>

      <HowDelivery />
    </div>
  );
}
