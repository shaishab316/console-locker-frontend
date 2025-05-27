"use client";

import { Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import Loading from "@/app/loading";
import { useGetReviewsQuery } from "@/redux/features/review/ReviewAPI";

interface IReview {
  comment: string;
  createdAt: string;
  customer: { name: string; avatar: string };
  product: string;
  rating: 3;
  updatedAt: string;
  _id: string;
}

export default function ReviewCarousel({
  productName,
}: {
  productName: string;
}) {
  const carouselRef = useRef<any>(null);
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);

  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetReviewsQuery({ productName, page, limit: 3 });

  if (isLoading) return <Loading />;
  if (isError) return <p className='text-red-500'>Failed to load reviews.</p>;

  const next = () => {
    carouselRef.current?.next();
  };

  const previous = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className={`py-24 bg-transparent`}>
      <div className='flex items-center justify-center py-8 space-x-4'>
        <hr className='flex-1 border-b border-gray-300' />
        <h2 className='w-max mx-auto text-[#101010] text-2xl md:text-5xl font-semibold text-center'>
          {t("reviewTitle")}
        </h2>
        <hr className='flex-1 border-b border-gray-300' />
      </div>
      <Container>
        <div className='flex justify-between items-center mb-8'>
          {/* <h2
            className={`text-xl md:text-3xl font-bold  ${
              pathname.startsWith("/buy") ? "text-[#FDFDFD]" : "text-[#101010]"
            }`}
          >
            {t("reviewTitle")}
          </h2> */}
          <div className='hidden md:flex gap-4'>
            <button
              onClick={previous}
              className='w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors'
              aria-label='Previous review'
            >
              <ArrowLeftOutlined className='text-sm' />
            </button>
            <button
              onClick={next}
              className='w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors'
              aria-label='Next review'
            >
              <ArrowRightOutlined className='text-sm' />
            </button>
          </div>
        </div>

        <Carousel
          ref={carouselRef}
          dots={false}
          beforeChange={(_, to) => {
            setPage(to + 1);
          }}
          slidesToShow={3}
          slidesToScroll={1}
          className='space-x-4'
          infinite
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {reviews?.data?.reviews?.map((review: IReview) => (
            <div key={review._id} className='px-2 h-60'>
              <ReviewCard {...review} />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
