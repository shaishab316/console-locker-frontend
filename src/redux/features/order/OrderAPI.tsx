import baseAPI from "@/redux/api/baseAPI";

const OrderAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: "/order?",
        method: "GET",
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/checkout",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = OrderAPI;
