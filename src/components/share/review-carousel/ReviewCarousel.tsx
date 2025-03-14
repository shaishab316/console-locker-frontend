"use client";

import { Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Loading from "@/app/loading";
import { useGetReviewsQuery } from "@/redux/features/review/ReviewAPI";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample review data
// const reviews = [
//   {
//     id: 1,
//     text: "I bought a refurbished PlayStation 5, and it looks and works like new! The delivery was super fast, and the customer support team answered all my questions. Highly recommended!",
//     text2:
//       "Ho comprato una PlayStation 5 ristrutturata e sembra e funziona come nuova! La consegna è stata super veloce e il team di supporto clienti ha risposto a tutte le mie domande. Altamente raccomandato!",
//     author: "Wade Warren",
//     position: "President of Sales",
//     rating: 4,
//     avatar: "/clients/client1.png",
//   },
//   {
//     id: 2,
//     text: "Amazing service! The refurbished iPhone I bought was practically new. Customer service was prompt and friendly. Will shop again.",
//     text2:
//       "Servizio fantastico! L'iPhone ristrutturato che ho acquistato era praticamente nuovo. Il servizio clienti è stato rapido e cordiale. Acquisterò di nuovo.",
//     author: "Jane Cooper",
//     position: "CEO of Marketing",
//     rating: 5,
//     avatar: "/clients/client1.png",
//   },
//   {
//     id: 3,
//     text: "Fast delivery, great product quality, and very helpful customer service. Thank you for an awesome experience!",
//     text2:
//       "Consegna veloce, ottima qualità del prodotto e servizio clienti molto utile. Grazie per un'esperienza fantastica!",
//     author: "Robert Fox",
//     position: "Tech Enthusiast",
//     rating: 5,
//     avatar: "/clients/client1.png",
//   },
//   {
//     id: 4,
//     text: "Product arrived earlier than expected, and I’m very happy with the quality. Will recommend it to friends!",
//     text2:
//       "Il prodotto è arrivato prima del previsto e sono molto soddisfatto della qualità. Lo consiglierò agli amici!",
//     author: "Kristin Watson",
//     position: "Software Engineer",
//     rating: 4,
//     avatar: "/clients/client1.png",
//   },
// ];

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
  if (isError) return <p className="text-red-500">Failed to load reviews.</p>;

  const next = () => {
    carouselRef.current?.next();
  };

  const previous = () => {
    carouselRef.current?.prev();
  };

  // console.log(reviews?.data?.reviews[0]);

  return (
    <div className="py-24 bg-[#F2F5F7]">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            {t("reviewTitle")}
          </h2>
          <div className="hidden md:flex gap-4">
            <button
              onClick={previous}
              className="w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
              aria-label="Previous review"
            >
              <ArrowLeftOutlined className="text-sm" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
              aria-label="Next review"
            >
              <ArrowRightOutlined className="text-sm" />
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
          className="space-x-4"
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
            <div key={review._id} className="px-2 h-60">
              <ReviewCard {...review} />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
