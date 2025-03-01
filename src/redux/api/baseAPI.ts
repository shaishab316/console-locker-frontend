import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.132:3000/api/v1",   
  }),
  tagTypes: [
    "Products",
     
  ],
  endpoints: () => ({}),
});

export default baseAPI;