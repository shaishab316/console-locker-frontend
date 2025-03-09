"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HowToSellYourItem from "@/components/sell/HowToSellYourItem";
import { useTranslation } from "react-i18next";
import { useGetASingleProductQuery } from "@/redux/features/sell/SellProductAPI";
import Loading from "@/app/loading";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedQuestions } from "@/redux/features/questions/QuestionSlice";
import { RootState } from "@/redux/store/store";
import { useGetEstimateProductPriceMutation } from "@/redux/features/products/ProductAPI";
import { useParams } from "next/navigation";
import MobileProductDetails from "@/components/sell/mobile/MobileProductDetails";

interface IOption {
  _id: string;
  name: string;
  options: [IQuestion];
  description: string;
  price: number;
}

interface IQuestion {
  _id: string;
  option: string;
  description: string;
  price: number;
  quesId: string;
  optionId?: string;
  questionAnswer?: {
    questionTitle: string;
    questionAnswer: string;
  };
}

export default function ScreenCondition() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [answer, setAnswer] = useState({
    questionTitle: "",
    questionAnswer: "",
  });

  const userSelectedOptions = useSelector(
    (state: RootState) => state?.questionSlice?.questions
  );

  const [
    getEstimateProductPrice,
    { data, isLoading: getPriceLoading, isError: getPriceError },
  ] = useGetEstimateProductPriceMutation();
  const [questionId, setQuestionId] = useState("");

  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang) setSelectedLang(lang);
  }, []);

  const {
    data: question,
    isLoading,
    isError,
  } = useGetASingleProductQuery(params?.slug as string);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) return <div>Error Occured!</div>;

  const questionLength = question?.data?.questions.length - 1;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (questionLength === questionIndex) {
      if (selectedOptionId) {
        dispatch(
          addSelectedQuestions({
            quesId: question?.data?.questions[questionIndex]?._id,
            optionId: selectedOptionId,
            questionAnswer: {
              questionTitle: answer?.questionTitle,
              questionAnswer: answer?.questionAnswer,
            },
          })
        );
      }

      localStorage.setItem(
        "getEstimateProductId",
        JSON.stringify(params?.slug)
      );

      const response = await getEstimateProductPrice({
        id: params?.slug as string,
        body: { questions: userSelectedOptions },
      });

      console.log(response);

      router.push("/sell/estimate-product");
    } else {
      if (selectedOptionId) {
        dispatch(
          addSelectedQuestions({
            quesId: question?.data?.questions[questionIndex]?._id,
            optionId: selectedOptionId,
            questionAnswer: {
              questionTitle: answer?.questionTitle,
              questionAnswer: answer?.questionAnswer,
            },
          })
        );
      }
      setQuestionIndex((prev) => prev + 1);
      setSelectedCondition("");
    }
  };

  const handleChange = (option: IQuestion) => {
    setSelectedCondition(option._id);
    setSelectedOptionId(option._id);

    setAnswer({
      questionTitle: option?.option,
      questionAnswer: option?.description,
    });
  };

  console.log("answer... ", userSelectedOptions);

  return (
    <div>
      {/* only for desktop view */}
      <div className="hidden md:block min-h-screen bg-[#F2F5F7] pb-20">
        {/* Screen Condition Section */}
        <div className="max-w-[798px] mx-auto py-10">
          <h1 className="text-[#101010] text-xl font-medium capitalize mb-2">
            {question?.data?.questions[questionIndex]?.name}
          </h1>
          <h2 className="text-2xl text-[#101010] font-semibold mb-4">
            {/* {t("quizTitle")} */}
            {question?.data?.questions[questionIndex]?.description}
          </h2>

          <form className="space-y-4 mb-6">
            {question?.data?.questions[questionIndex]?.options?.map(
              (opt: IQuestion) => (
                <label
                  key={opt?._id}
                  className={`block w-full rounded-md p-4 cursor-pointer transition-colors ${
                    selectedCondition === opt?._id
                      ? "bg-[#DAEDF2]"
                      : "bg-[#FDFDFD] hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5 mt-1">
                      <input
                        type="radio"
                        name="condition"
                        value={opt?._id}
                        checked={selectedCondition === opt?._id}
                        onChange={() => handleChange(opt)}
                        className="h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    {/* <b>{opt?._id}</b> */}
                    <div>
                      <p className="text-xl font-semibold text-[#101010]">
                        {selectedLang === "en" ? opt?.option : opt?.option}
                      </p>
                      <p className="text-[#6B6B6B] text-lg mt-1">
                        {selectedLang === "en"
                          ? opt?.description
                          : opt?.description}
                      </p>
                    </div>
                  </div>
                </label>
              )
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!selectedCondition}
                onClick={handleContinue}
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

      {/* only for mobile */}
      <div className="md:hidden">
        <MobileProductDetails />
      </div>
    </div>
  );
}
