"use client";

import { Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  _id: string;
  image: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
}

export function BlogCard({
  _id,
  image,
  title,
  description,
  slug,
  createdAt,
}: BlogCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <Link href={`/blog/${slug}`}>
      <Card
        // hoverable
        cover={
          <Image
            alt={title}
            src={`${API_URL}${image}`}
            className="w-full h-[200px] object-cover"
            width={300}
            height={200}
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
            <p className="text[#101010] text-sm">Admin</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/calendar.png" width={12} height={12} alt="Calendar" />
            <p className="text-[#101010] text-sm">{createdAt.split("T")[0]}</p>
          </div>
        </div>
        <h2 className="text-[#101010] text-xl font-semibold mb-2.5">{title}</h2>
        <p className="text-base text-[#2B2B2B] mb-2">{description}</p>
        <p className="text-[#222C9B] hover:text-[#2c3acf]">Read More</p>
      </Card>
    </Link>
  );
}
