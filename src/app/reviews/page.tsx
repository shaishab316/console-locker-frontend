"use client";

import { useGetReviewsQuery } from "@/redux/features/review/ReviewAPI";
import Loading from "../loading";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "@/components/common/Container";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ReviewsPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [page, setPage] = useState<number>(1);

  const queries = useSearchParams();

  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetReviewsQuery({
    productName: queries.get("productName")?.toString() || "",
    page,
  });
  // const { data: review, isLoading: isLoadingReview } = useGetReviewQuery({});

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load reviews.</p>;

  // console.log(reviews?.data?.reviews[0]?.customer);

  return (
    <div className="bg-[#F2F5F7] pt-10 pb-20">
      <Container>
        <h2 className="text-[#101010] text-[24px] font-semibold mb-10 text-center md:text-[40px]">
          Reviews
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.data?.reviews?.length === 0 && (
            <p className="text-[#000000] text-2xl font-semibold text-center">
              No review found.
            </p>
          )}
          {reviews?.data?.reviews?.map((review: any) => (
            <div
              key={review?._id}
              className="bg-[#FDFDFD] p-8 rounded-lg h-full flex flex-col"
            >
              {/* Review Comment */}
              <p className="text-[#000000] leading-7 text-lg mb-3 flex-grow overflow-hidden">
                {review?.comment?.split(0, 1) || "No review available."}
              </p>

              {/* Reviewer & Rating */}
              <div className="flex items-center justify-between mt-auto">
                {/* Reviewer Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={`${API_URL}${review?.customer?.avatar}`}
                      alt={review?.customer?.name || "Reviewer"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review?.customer?.name || "Anonymous"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {review?.product || "Unknown Product"}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`text-lg ${
                        index < (review?.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="flex justify-center items-center gap-3 my-12">
          <button
            title="Previous"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`w-10 h-10 flex items-center justify-center bg-transparent ${
              page === 1 && "cursor-not-allowed"
            }`}
          >
            <ChevronLeft />
          </button>
          {Array.from(
            { length: reviews?.data?.meta?.totalPage },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                page === pageNumber
                  ? "bg-black text-white"
                  : "bg-transparent border-2 border-[#101010]"
              } ${page === pageNumber && "cursor-not-allowed"}`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            title="Next"
            onClick={() =>
              setPage(Math.min(page + 1, reviews?.data?.meta?.totalPage))
            }
            className={`w-10 h-10 flex items-center justify-center bg-transparent ml-2 ${
              page === reviews?.data?.meta?.totalPage && "cursor-not-allowed"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ReviewsPage;
