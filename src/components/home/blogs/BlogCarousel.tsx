"use client";

import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { BlogCard } from "./Blog";
import Container from "@/components/common/Container";

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

export function BlogCarousel() {
  const carouselRef = useRef<any>(null);

  const next = () => carouselRef.current?.next();
  const previous = () => carouselRef.current?.prev();

  return (
    <section className="py-12 mb-12">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Our Recent Blogs
          </h2>
          <div className="flex gap-2">
            <Button
              icon={<LeftOutlined />}
              onClick={previous}
              className="flex items-center justify-center"
              shape="circle"
            />
            <Button
              icon={<RightOutlined />}
              onClick={next}
              className="flex items-center justify-center"
              shape="circle"
            />
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
          {blogs.map((blog, index) => (
            <div key={index} className="px-2">
              <BlogCard {...blog} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
