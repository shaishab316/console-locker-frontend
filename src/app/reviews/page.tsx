// "use client";

// import ReviewsSection from "@/components/share/review-pagination/ReviewSection";
// import { useGetReviewsQuery } from "@/redux/features/review/ReviewAPI";
// import Loading from "../loading";
// import Image from "next/image";
// import { Star } from "lucide-react";

// const ReviewsPage = () => {
//   const { data: reviews, isLoading, isError } = useGetReviewsQuery({});

//   if (isLoading) return <Loading />;

//   console.log(reviews?.data?.reviews);

//   return (
//     <section>
//       <div className="bg-white p-6 rounded-lg h-full flex flex-col">
//         <p className="text-[#000000] leading-7 text-lg mb-6 flex-grow overflow-hidden">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
//           minima.
//         </p>
//         <div className="flex items-center justify-between mt-auto">
//           <div className="flex items-center gap-4">
//             <div className="relative w-12 h-12 rounded-full overflow-hidden">
//               <Image
//                 src={"/placeholder.svg"}
//                 alt={"author"}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">{"author"}</h3>
//               <p className="text-gray-600 text-sm">{"position"}</p>
//             </div>
//           </div>
//           <div className="flex gap-1">
//             {[...Array(5)].map((_, index) =>
//             index < rating ? (
//               <Star /> key={index} className="text-yellow-400 text-lg" />
//             ) : (
//               <Star key={index} className="text-gray-300 text-lg" />
//             )
//           )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewsPage;

"use client";

import ReviewsSection from "@/components/share/review-pagination/ReviewSection";
import { useGetReviewsQuery } from "@/redux/features/review/ReviewAPI";
import Loading from "../loading";
import Image from "next/image";
import { Star } from "lucide-react";
import Container from "@/components/common/Container";

const ReviewsPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data: reviews, isLoading, isError } = useGetReviewsQuery({});

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load reviews.</p>;

  console.log(reviews?.data?.reviews[0]?.customer);

  return (
    <div className="bg-[#F2F5F7] pt-10 pb-20">
      <Container>
        <h2 className="text-[#101010] text-[24px] font-semibold mb-10 text-center md:text-[40px]">Reviews</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </Container>
    </div>
  );
};

export default ReviewsPage;
