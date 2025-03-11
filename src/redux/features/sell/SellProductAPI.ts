import baseAPI from "@/redux/api/baseAPI";

const sellProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sellProduct: builder.query<any, { limit?: number }>({
      query: ({ limit }) => {
        let queryParams = new URLSearchParams();

        if (limit) queryParams.append("limit", limit.toString());

        return `/sell/products?${queryParams.toString()}`;
      },
    }),

    getASingleProduct: builder.query<any, string>({
      query: (id) => `/sell/products/${id}`,
    }),

    sellUltimateProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: "/sell",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSellProductQuery, useGetASingleProductQuery, useSellUltimateProductMutation } =
  sellProductAPI;
