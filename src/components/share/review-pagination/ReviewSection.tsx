"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import Pagination from "./Pagination";
import { getReviews } from "@/lib/action";
import { useTranslation } from "react-i18next";

interface Review {
  id: string;
  text: string;
  rating: number;
  author: {
    name: string;
    title: string;
    image: string; 
  };
  createdAt: string;
}

// interface ReviewCardProps {
//   review: Review;
// }

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  async function fetchReviews(page: number) {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getReviews(page);
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(`Failed to load reviews. Please try again later. ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of reviews section
    document
      .getElementById("reviews-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="reviews-section" className="py-12 bg-[#F2F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t("reviews")}</h2>

        {error ? (
          <div className="text-center text-red-600 mb-8">
            {error}
            <button
              onClick={() => fetchReviews(currentPage)}
              className="ml-2 text-blue-600 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            {isLoading && currentPage === 1
              ? // Show skeleton loading state for first page load
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#FDFDFD] p-6 rounded-lg shadow-sm animate-pulse"
                  >
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                          <div className="h-3 w-32 bg-gray-200 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 bg-gray-200 rounded"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              : reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
