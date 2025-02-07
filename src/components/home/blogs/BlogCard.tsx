"use client";

import { Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Text, Title } = Typography;

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  author: string; 
  date: string;
}

export function BlogCard({
  image,
  title,
  excerpt,
  author,
  date,
}: BlogCardProps) {
  return (
    <Link href={`/blog/101`}>
      <Card
        // hoverable
        cover={
          <img
            alt={title}
            src={image || "/placeholder.svg"}
            style={{
              height: 200,
              objectFit: "cover",
            }}
          />
        }
        styles={{
          body: { padding: 16 },
        }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Image src="/users/user.png" width={12} height={12} alt="User" />
            <p className="text[#101010] text-sm">{author}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/calendar.png" width={12} height={12} alt="Calendar" />
            <p className="text-[#101010] text-sm">{date}</p>
          </div>
        </div>
        <h2 className="text-[#101010] text-xl font-semibold mb-2.5">{title}</h2>
        <p className="text-base text-[#2B2B2B] mb-2">{excerpt}</p>
        <p className="text-[#222C9B] hover:text-[#2c3acf]">Read More</p>
      </Card>
    </Link>
  );
}
