"use client";

import { Carousel, Button } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import { BlogCard } from "./BlogCard";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import { useGetBlogsQuery } from "@/redux/features/blogs/BlogAPI";
import Loading from "@/app/loading";

const blogs = [
  {
    image: "/blogs/blog1.png",
    title: "Why It's Smarter To Buy A Refurbished iPhone Rather",
    excerpt:
      "I type and scrambled it to make a type specimen book. It has survived...",
    author: "Admin",
    date: "19Jun2024",
  },
  {
    image: "/blogs/blog2.png",
    title: "Why It's Smarter To Buy A Refurbished iPhone Rather",
    excerpt:
      "I type and scrambled it to make a type specimen book. It has survived...",
    author: "Admin",
    date: "19Jun2024",
  },
  {
    image: "/blogs/blog3.png",
    title: "Why It's Smarter To Buy A Refurbished iPhone Rather",
    excerpt:
      "I type and scrambled it to make a type specimen book. It has survived...",
    author: "Admin",
    date: "19Jun2024",
  },
  {
    image: "/blogs/blog4.png",
    title: "Why It's Smrter To Buy A Refurbished iPhone Rather",
    excerpt:
      "I type and scrambled it to make a type specimen book. It has survived...",
    author: "Admin",
    date: "19Jun2024",
  },
];

interface IBlog {
  _id: string;
  image: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
}

export function BlogCarousel() {
  const carouselRef = useRef<any>(null);
  const { t } = useTranslation();

  const next = () => carouselRef.current?.next();
  const previous = () => carouselRef.current?.prev();

  const { data: blogs, isLoading, isError } = useGetBlogsQuery({});

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error Occured! {isError.valueOf()}</div>;

  return (
    <section className="bg-[#F2F5F7] pt-8 pb-20 md:pb-28">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {t("ourRecentBlogs")}
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
          slidesToShow={4}
          slidesToScroll={1}
          dots={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {blogs?.data?.blogs?.map((blog: IBlog) => (
            <div key={blog?._id} className="px-2">
              <BlogCard {...blog} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
