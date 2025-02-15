"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HowToSellYourItem from "@/components/sell/HowToSellYourItem";
import { useTranslation } from "react-i18next";

const SCREEN_CONDITIONS = [
  {
    id: "cracked",
    title: "Cracked or broken",
    title2: "Incrinato o rotto",
    description:
      "The screen is cracked, detached or has dead pixels. Cracks can be felt with fingernail.",
    description2:
      "Lo schermo è incrinato, staccato o ha pixel morti. Le crepe possono essere percepite con l'unghia.",
  },
  {
    id: "Visible wear",
    title: "Visible wear",
    title2: "Usura visibile",
    description:
      "The screen has scratches or shows light signs of use. Scratches are visible with or without a light source.",
    description2:
      "Lo schermo ha graffi o mostra lievi segni di utilizzo. I graffi sono visibili con o senza una fonte di luce.",
  },
  {
    id: "wear",
    title: "Signs of wear",
    title2: "Segni di usura",
    description:
      "The screen has scratches or shows light signs of use. Scratches are visible with or without a light source.",
    description2:
      "Lo schermo ha graffi o mostra lievi segni di utilizzo. I graffi sono visibili con o senza una fonte di luce.",
  },
  {
    id: "Minimal Signs of wear",
    title: "Minimal Signs of wear",
    title2: "Minimi segni di usura",
    description:
      "The screen has scratches or shows light signs of use. Scratches are visible with or without a light source.",
    description2:
      "Lo schermo ha graffi o mostra lievi segni di utilizzo. I graffi sono visibili con o senza una fonte di luce.",
  },
  {
    id: "new",
    title: "No Signs of use",
    title2: "Nessun segno di utilizzo",
    description:
      "The screen looks brand new. No signs of wear. No visible scratches that can be seen under a light source.",
    description2:
      "Lo schermo sembra nuovo di zecca. Nessun segno di usura. Nessun graffio visibile che possa essere visto sotto una fonte di luce.",
  },
];

export default function ScreenCondition() {
  const [selectedCondition, setSelectedCondition] = useState("");
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    setSelectedLang(lang || "");
  }, []);

  const handleRouter = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCondition) {
      router.push("/sell/next3");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F5F7] pb-20">
      {/* Screen Condition Section */}
      <div className="max-w-[798px] mx-auto py-10">
        <h1 className="text-[#101010] text-base font-medium mb-3">
          Playstation 4
        </h1>
        <h2 className="text-2xl text-[#101010] font-semibold mb-6">
          {t("quizTitle")}
        </h2>

        <form className="space-y-4 mb-6">
          {SCREEN_CONDITIONS.map((condition) => (
            <label
              key={condition.id}
              className={`block w-full bg-[#FDFDFD] rounded-md p-4 cursor-pointer transition-colors
                ${
                  selectedCondition === condition.id
                    ? "bg-[#cbe4ea]"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="radio"
                    name="condition"
                    value={condition.id}
                    checked={selectedCondition === condition.id}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#101010] mb-2">
                    {selectedLang === "en" ? condition.title : condition.title2}
                  </p>
                  <p className="text-[#6B6B6B] text-lg mt-1">
                    {selectedLang === "en"
                      ? condition.description
                      : condition.description2}
                  </p>
                </div>
              </div>
            </label>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!selectedCondition}
              onClick={handleRouter}
              className={`px-6 py-2 border rounded-md text-base font-medium transition-colors
                  ${
                    selectedCondition
                      ? "bg-[#F2F5F7] text-[#101010] border-[#101010] font-semibold"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
            >
              {t("continue")}
            </button>
          </div>
        </form>
      </div>

      {/* How to Sell Section */}

      <HowToSellYourItem />
    </div>
  );
}
