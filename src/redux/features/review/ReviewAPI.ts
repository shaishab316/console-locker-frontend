import baseAPI from "@/redux/api/baseAPI";

const ReviewAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: `/reviews`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useGetReviewsQuery } = ReviewAPI;
