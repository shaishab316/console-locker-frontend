import baseAPI from "@/redux/api/baseAPI";
import { get } from "http";

const ReviewAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ productName, page = 1 }) => ({
        url: `/reviews?limit=9&page=${page}&productName=${productName}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useGetReviewsQuery } = ReviewAPI;
