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
import Link from "next/link";
import Image from "next/image";

interface IQuestion {
  _id: string;
  name: string;
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

  // track selected item
  const [modal, setModal] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [controller, setController] = useState("");
  const [memory, setMemory] = useState("");

  const userSelectedOptions = useSelector(
    (state: RootState) => state?.questionSlice?.questions
  );

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // const [
  //   getEstimateProductPrice,
  //   { data, isLoading: getPriceLoading, isError: getPriceError },
  // ] = useGetEstimateProductPriceMutation();

  // const [questionId, setQuestionId] = useState("");

  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const lang = localStorage?.getItem("i18nextLng");
    if (lang) setSelectedLang(lang);
  }, []);

  useEffect(() => {
    localStorage?.setItem(
      "userSelectedOptions",
      JSON.stringify(userSelectedOptions)
    );
  }, [userSelectedOptions, userSelectedOptions.length]);

  const {
    data: question,
    isLoading,
    isError,
  } = useGetASingleProductQuery(params?.slug as string);

  useEffect(() => {
    if (question?.data?.questions) {
      const questions = question?.data?.questions;

      // Helper function to get the first option value for a given question name
      const getFirstOption = (name: string) => {
        return (
          questions.find((q: any) => q.name === name)?.options?.[0]?.option ||
          ""
        );
      };

      // Setting the first option of each question into the state
      setModal(getFirstOption("model"));
      setBrand(getFirstOption("brand"));
      setCondition(getFirstOption("condition"));
      setController(getFirstOption("controller"));
      setMemory(getFirstOption("memory"));
    }
  }, [question?.data?.questions]);

  if (isLoading) {
    return <Loading />;
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

      localStorage?.setItem(
        "getEstimateProductId",
        JSON.stringify(params?.slug)
      );

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

    console.log("handleChange", option);

    setAnswer({
      questionTitle: question?.data?.questions[questionIndex]?.name,
      questionAnswer: option?.option,
    });
  };

  const handleClick = (
    id: string,
    name: string,
    option: { _id: string; option: string; price: number; description: string }
  ) => {
    console.log("........", id, name, option);
    switch (name.toLowerCase()) {
      case "model":
        setModal(option.option);
        break;
      case "brand":
        setBrand(option.option);
        break;
      case "condition":
        setCondition(option.option);
        break;
      case "controller":
        setController(option.option);
        break;
      case "memory":
        setMemory(option.option);
        break;
      default:
        console.warn(`Unknown question name: ${name}`);
        break;
    }

    const data = {
      quesId: id,
      optionId: option?._id,
      questionAnswer: {
        questionName: name,
        questionTitle: option?.option,
        questionAnswer: option?.description,
      },
    };

    console.log("handle click....", data);

    dispatch(
      addSelectedQuestions({
        quesId: id,
        optionId: option?._id,
        questionAnswer: {
          questionName: name,
          questionTitle: option?.option,
          questionAnswer: option?.description,
        },
      })
    );
  };

  const submitMobileForm = () => {
    localStorage?.setItem(
      "userSelectedOptions",
      JSON.stringify(userSelectedOptions)
    );

    localStorage?.setItem("getEstimateProductId", JSON.stringify(params?.slug));

    router.push("/sell/estimate-product-mobile");
  };

  const questionsLength = question?.data?.questions.length;

  // console.log({ modal, brand, condition, controller, storage });
  console.log("sell/[.....]", question);

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
      <div className="block md:hidden">
        {/* <MobileProductDetails /> */}

        <div>
          <div className="w-full">
            <Image
              src={`${API_URL}${question?.data?.image}`}
              className="w-full"
              width={700}
              height={800}
              alt="xbox"
            />
          </div>

          {/* Select the Xbox One model */}
          {questionsLength > 0 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-xl font-semibold text-center whitespace-nowrap"
                  }
                >
                  {question?.data?.questions[0]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              {/* Select the Xbox One model */}

              <div className="flex flex-col gap-4 px-5 py-5">
                {question?.data?.questions[0]?.options.map(
                  (option: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={option?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[0]?._id,
                          question?.data?.questions[0]?.name,
                          option
                        )
                      }
                      className={`h-16 rounded-md flex items-center justify-center ${
                        option?.option === modal
                          ? "bg-[#D61D1E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } border border-[#919191] text-center text-2xl font-semibold leading-[36px]`}
                    >
                      {option?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* What is the storage capacity? (Not applicable for Xbox One X) */}
          {questionsLength > 1 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[1]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[0]?.options?.map(
                  (storg: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={storg?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[1]?._id,
                          question?.data?.questions[1]?.name,
                          storg
                        )
                      }
                      className={`${
                        storg?.option === brand
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[98px] h-[106px] text-center flex items-center justify-center rounded-md p-1.5`}
                    >
                      {storg?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* What is the condition of your console? */}

          {questionsLength > 2 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[2]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[2]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[2]?._id,
                          question?.data?.questions[2]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === condition
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* TODO: do it later */}
          {/* BRAND */}
          <div className="p-5">
            <div className="border-2 border-[#64B95E]  p-3 rounded-lg">
              <p className="border-b-2 border-dashed inline-block">
                <span className="text-[#64B95E] inline-block">BRAND NEW:</span>{" "}
                The device is in perfect condition and has no signs
              </p>
              <p className="border-b-2 border-dashed">
                of wear or scratches. Its functionality is equivalent to a
                factory-
              </p>
              <p className="border-b-2 border-dashed">
                fresh item, responsiveness to commands is instantaneous, and it
              </p>
              <p className="border-b-2 border-dashed">
                {" "}
                does not have any overheating issues.
              </p>
            </div>
          </div>

          {/* Is the console fully functional and free of technical defects? */}
          {questionsLength > 3 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[3]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[3]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[3]?._id,
                          question?.data?.questions[3]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === controller
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* How many controllers will you send us? */}
          {questionsLength > 4 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[4]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[4]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[4]?._id,
                          question?.data?.questions[4]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === memory
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* How many controllers will you send us? */}
          {questionsLength > 5 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[5]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[5]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[5]?._id,
                          question?.data?.questions[5]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === condition
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* How many controllers will you send us? */}
          {questionsLength > 6 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[6]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[5]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[6]?._id,
                          question?.data?.questions[6]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === condition
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* if have, another */}
          {questionsLength > 7 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[7]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[7]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[7]?._id,
                          question?.data?.questions[7]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === condition
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* if have, another */}
          {questionsLength > 8 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[8]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[8]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[8]?._id,
                          question?.data?.questions[8]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === condition
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* if have, another */}
          {questionsLength > 9 && (
            <div>
              <div className="flex items-center justify-center pt-14 space-x-2.5">
                <hr className="flex-1 border-b-2 border-gray-300" />
                <h2
                  className={
                    "bg-[#FDFDFD] py-4 px-8 rounded-lg shadow-md text-[#101010] text-lg font-medium text-center whitespace-wrap"
                  }
                >
                  {question?.data?.questions[9]?.description}
                </h2>
                <hr className="flex-1 border-b-2 border-gray-300" />
              </div>

              <div className="p-5 flex items-center gap-4">
                {question?.data?.questions[9]?.options?.map(
                  (cond: {
                    _id: string;
                    option: string;
                    price: number;
                    description: string;
                  }) => (
                    <div
                      key={cond?._id}
                      onClick={() =>
                        handleClick(
                          question?.data?.questions[9]?._id,
                          question?.data?.questions[9]?.name,
                          cond
                        )
                      }
                      className={`${
                        cond.option === condition
                          ? "bg-[#64B95E] text-[#FDFDFD]"
                          : "bg-[#DDDEE3]"
                      } text-xl text-[#101010] font-semibold w-[198px] h-[106px] text-center flex items-center justify-center rounded-md p-4`}
                    >
                      {cond?.option}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* submit button */}

          <div className="p-5 bg-[#FDFDFD]">
            {/* <Link href={"/sell/summary"}> */}
            <button
              onClick={submitMobileForm}
              className="w-full text-[#FDFDFD] font-semibold bg-[#64B95E] h-14 rounded-lg"
            >
              SUBMIT FORM
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
