import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductType {
  id: string;
  name: string;
  price: number;
  img: string;
}

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div className="flex flex-col gap-4 bg-[#FDFDFD] border rounded-md hover:shadow">
      <div className="bg-[#7E99CF] h-[350px] relative rounded-t-sm">
        <Image
          src={product.img}
          alt="Product"
          width={300}
          height={300}
          className="object-cover p-5"
        />
      </div>
      <div className="flex justify-between items-center p-5">
        <div>
          <h3 className="text-xl font-semibold text-[#101010]">
            {product.name}
          </h3>
          <p className="text-[#2B2B2B] text-base">
            Price Estimate: ${product.price}
          </p>
        </div>
        <Link
          href={`/sell/${product.id}`}
          className="py-3 px-8 bg-[#101010] text-[#FDFDFD] rounded-sm"
        >
          SELL
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
