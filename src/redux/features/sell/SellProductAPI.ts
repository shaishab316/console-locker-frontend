import baseAPI from "@/redux/api/baseAPI";

const sellProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sellProduct: builder.query<any, string>({
        query: (id) => `/sell/products`,
    }),

    getASingleProduct: builder.query<any, string>({
        query: (id) => `/sell/products/${id}`,
    }),
  }),
});

export const { useSellProductQuery, useGetASingleProductQuery } = sellProductAPI;
