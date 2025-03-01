import baseAPI from "@/redux/api/baseAPI";


interface GetEstimateProductPriceRequest {
  questions: {
    quesId: string;
    optionId: string;
  }[];
}

const ProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, { product_type?: string; brand?: string;  condition?: string; limit?: number, price?: [number, number]}>({
     
      query: ({ product_type, brand, condition,limit, price  }) => {


        console.log('price range: ', price)

        let queryParams = new URLSearchParams();

        if (product_type && product_type !== "all") queryParams.append("product_type", product_type);
        if (brand && brand !== "all") queryParams.append("brand", brand);
        if (condition && condition !== "all") queryParams.append("condition", condition);
        if (limit) queryParams.append("limit", limit.toString());

        // if(price && price.length === 2) {
        if(price) {
          queryParams.append("min_price", price[0].toString());
          queryParams.append("max_price", price[1].toString());
        }

        return `products?${queryParams.toString()}`;
      },

    }),


    getSingleProduct: builder.query<any, { slug: string }>({
      query: ({ slug }) => `products/${slug}`,
    }),

    createProduct: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/create/product",
        method: "POST",
        body: formData,
      }),
    }),

    getEstimateProductPrice: builder.mutation<any,  { id: string; body: GetEstimateProductPriceRequest }>({
      query: ({ id, body }) => ({
        url: `/sell/products/${id}/price`,
        method: "POST",
        body: body
      }),
    }) 
  }),
});

export const { useGetAllProductsQuery,useGetSingleProductQuery, useCreateProductMutation, useGetEstimateProductPriceMutation } =
  ProductAPI;

export default ProductAPI;