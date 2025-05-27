"use client";

import { Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { BlogCard } from "./BlogCard";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import { useGetBlogsQuery } from "@/redux/features/blogs/BlogAPI";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const [page, setPage] = useState<number>(1);

  const next = () => carouselRef.current?.next();
  const previous = () => carouselRef.current?.prev();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetBlogsQuery({ page, limit: 3 });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error Occured! {isError.valueOf()}</div>;

  return (
    <section
      className={`bg-transparent
    
    pt-8 pb-20 md:pb-28`}
    >
      <div className='flex items-center justify-center py-8 space-x-4'>
        <hr className='flex-1 border-b border-gray-300' />
        <h2 className='w-max mx-auto text-[#101010] text-2xl md:text-5xl font-semibold text-center'>
          {t("ourRecentBlogs")}
        </h2>
        <hr className='flex-1 border-b border-gray-300' />
      </div>

      <Container>
        <div className='flex justify-between items-center mb-8'>
          {/* <h2
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${
              pathname.startsWith("/buy") ? "text-[#FDFDFD]" : "text-[#101010]"
            }`}
          >
            {t("ourRecentBlogs")}
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
          {[...(blogs?.data?.blogs || []), ...Array(3)]
            .slice(0, 3)
            .map((blog: IBlog | null, index) => (
              <div key={blog?._id || index} className='px-2'>
                <BlogCard {...blog} />
              </div>
            ))}
        </Carousel>
      </Container>
    </section>
  );
}
