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
      query: ({ productDetails, customer, secondary_phone, method }) => ({
        url: `/order/checkout?method=${method}`,
        method: "POST",
        body: { productDetails, customer, secondary_phone },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = OrderAPI;
