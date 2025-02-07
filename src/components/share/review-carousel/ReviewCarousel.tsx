"use client";

import { Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ReviewCard from "./ReviewCard";
import Container from "@/components/common/Container";

// Sample review data
const reviews = [
  {
    id: 1,
    text: "I bought a refurbished PlayStation 5, and it looks and works like new! The delivery was super fast, and the customer support team answered all my questions. Highly recommended!",
    author: "Wade Warren",
    position: "President of Sales",
    rating: 4,
    avatar: "/clients/client1.png",
  },
  {
    id: 2,
    text: "Amazing service! The refurbished iPhone I bought was practically new. Customer service was prompt and friendly. Will shop again.",
    author: "Jane Cooper",
    position: "CEO of Marketing",
    rating: 5,
    avatar: "/clients/client1.png",
  },
  {
    id: 3,
    text: "Fast delivery, great product quality, and very helpful customer service. Thank you for an awesome experience!",
    author: "Robert Fox",
    position: "Tech Enthusiast",
    rating: 5,
    avatar: "/clients/client1.png",
  },
  {
    id: 4,
    text: "Product arrived earlier than expected, and I’m very happy with the quality. Will recommend it to friends!",
    author: "Kristin Watson",
    position: "Software Engineer",
    rating: 4,
    avatar: "/clients/client1.png",
  },
];

export default function ReviewCarousel() {
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current?.next();
  };

  const previous = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="py-20 bg-[#F2F5F7]">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className=" text-xl md:text-3xl font-bold text-gray-900">
            Our Client Reviews
          </h2>
          <div className="hidden md:flex gap-4">
            <button
              onClick={previous}
              className="px-2.5 py-2 rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
              aria-label="Previous review"
            >
              <ArrowLeftOutlined className="text-xl" />
            </button>
            <button
              onClick={next}
              className="px-2.5 py-2 rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
              aria-label="Next review"
            >
              <ArrowRightOutlined className="text-xl" />
            </button>
          </div>
        </div>

        <Carousel
          ref={carouselRef}
          dots={false}
          slidesToShow={3}
          slidesToScroll={1}
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
          {reviews.map((review) => (
            <div key={review.id} className="px-2 h-60">
              <ReviewCard {...review} />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
