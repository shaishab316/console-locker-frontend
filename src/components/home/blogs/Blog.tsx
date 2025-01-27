"use client";

import { Card, Typography } from "antd";
import Image from "next/image";

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
          <Text type="secondary">{author}</Text>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/calendar.png" width={12} height={12} alt="Calendar" />
          <Text type="secondary">{date}</Text>
        </div>
      </div>
      <Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        {title}
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        {excerpt}
      </Text>
      <Text className="text-blue-600 hover:text-blue-700">Read More</Text>
    </Card>
  );
}
