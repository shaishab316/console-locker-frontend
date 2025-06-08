"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import { useGetReviewsQuery } from "@/redux/features/review/ReviewAPI";
import { Spin } from "antd";

interface IReview {
	comment: string;
	createdAt: string;
	customer: { name: string; avatar: string };
	product: string;
	rating: number;
	updatedAt: string;
	_id: string;
}

export default function ReviewCarousel({
	productName,
}: {
	productName: string;
}) {
	const { t } = useTranslation();
	const [page, setPage] = useState<number>(1);

	const {
		data: reviews,
		isFetching,
		refetch,
		isError,
	} = useGetReviewsQuery({ productName, page, limit: 3 });

	const totalPage = reviews?.data?.meta?.totalPage ?? 1;

	return (
		<div className={`py-24 bg-transparent`}>
			<div className="flex items-center justify-center py-8 space-x-4">
				<hr className="flex-1 border-b border-gray-300" />
				<h2 className="w-max mx-auto text-[#101010] text-2xl md:text-5xl font-semibold text-center">
					{t("reviewTitle")}
				</h2>
				<hr className="flex-1 border-b border-gray-300" />
			</div>
			<Container>
				<div className="flex justify-between items-center mb-8">
					<div className="hidden md:flex gap-4 items-center">
						<button
							onClick={() =>
								setPage((prev) => (prev > 1 ? prev - 1 : totalPage))
							}
							className="w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
							aria-label="Previous review"
						>
							<ArrowLeftOutlined className="text-sm" />
						</button>
						{page} / {isFetching ? <Spin size="small" /> : totalPage}
						<button
							onClick={() =>
								setPage((prev) => (prev < totalPage ? prev + 1 : 1))
							}
							className="w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
							aria-label="Next review"
						>
							<ArrowRightOutlined className="text-sm" />
						</button>
					</div>
				</div>

				{isError && (
					<p className="text-red-500 text-2xl">
						Failed to load reviews.{" "}
						<div className="inline-flex">
							<button
								onClick={refetch}
								className="underline cursor-pointer click font-bold text-black hover:scale-90 transition"
							>
								Retry
							</button>
							<span className="relative flex size-3">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
								<span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
							</span>
						</div>
					</p>
				)}

				{isFetching ? (
					<Spin size="large" />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{reviews?.data?.reviews?.map((review: IReview) => (
							<div key={review._id} className="px-2 h-60">
								<ReviewCard {...review} />
							</div>
						))}
					</div>
				)}
			</Container>
		</div>
	);
}
