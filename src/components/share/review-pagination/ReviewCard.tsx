import Image from "next/image";
import { StarRating } from "./StarRating";

export interface Review {
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

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm transition-shadow hover:shadow-md">
      <p className="text-gray-700 mb-4 line-clamp-4">"{review.text}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={review.author.image || "/clients/client1.png"}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{review.author.name}</h3>
            <p className="text-sm text-gray-500">{review.author.title}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
    </div>
  );
}
