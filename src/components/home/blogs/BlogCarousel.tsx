"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BlogCard } from "./BlogCard";
import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import { useGetBlogsQuery } from "@/redux/features/blogs/BlogAPI";
import Loading from "@/app/loading";

interface IBlog {
	_id: string;
	image: string;
	title: string;
	description: string;
	slug: string;
	createdAt: string;
}

export function BlogCarousel() {
	const { t } = useTranslation();

	const [page, setPage] = useState<number>(1);

	const {
		data: blogs,
		isLoading,
		isError,
	} = useGetBlogsQuery({ page, limit: 2 });

	const meta = blogs?.data?.meta ?? {};

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
			<div className="flex items-center justify-center py-8 space-x-4">
				<hr className="flex-1 border-b border-gray-300" />
				<h2 className="w-max mx-auto text-[#101010] text-2xl md:text-5xl font-semibold text-center">
					{t("ourRecentBlogs")}
				</h2>
				<hr className="flex-1 border-b border-gray-300" />
			</div>

			<Container>
				<div className="flex justify-between items-center mb-8">
					<div className="hidden md:flex gap-4 items-center">
						<button
							onClick={() =>
								setPage((prev) => (prev > 1 ? prev - 1 : meta?.totalPages))
							}
							className="w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
							aria-label="Previous review"
						>
							<ArrowLeftOutlined className="text-sm" />
						</button>
						{page} / {meta?.totalPages}
						<button
							onClick={() =>
								setPage((prev) => (prev < meta?.totalPages ? prev + 1 : 1))
							}
							className="w-12 h-12 flex items-center justify-center rounded bg-[#FDFDFD] hover:bg-[#FDFDFD] transition-colors"
							aria-label="Next review"
						>
							<ArrowRightOutlined className="text-sm" />
						</button>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{blogs?.data?.blogs?.map((blog: IBlog) => (
						<div key={blog?._id} className="px-2">
							<BlogCard {...blog} />
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}
