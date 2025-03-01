import baseAPI from "@/redux/api/baseAPI";


const BlogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
    }),

    getBlog: builder.query({
      query: (slug: string) => `/blogs/${slug}`,
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
} = BlogAPI;