"use client";

import { useTranslation } from "react-i18next";
import Container from "../common/Container";
import ProductCard from "./ProductCard";
import { useSellProductQuery } from "@/redux/features/sell/SellProductAPI";
import Loading from "@/app/loading";

interface IProduct {
  _id: string;
  image: string;
  name: string;
  base_price: number;
}

const ProductSection = () => {
  const { t } = useTranslation();

  const {
    data: products,
    isLoading,
    isError,
  } = useSellProductQuery({
    limit: 100,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error...</div>;

  return (
    <div className="bg-[#F2F5F7] pt-20 pb=12">
      <Container>
        <h2 className="text-center text-[#101010] text-[40px] font-semibold">
          {t("selectyourItems")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products?.data?.products?.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductSection;
