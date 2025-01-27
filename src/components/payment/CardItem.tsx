import Image from "next/image";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  warranty: string;
  storage: string;
  condition: string;
  delivery: string;
  isAvailable: boolean;
  hasAlternative?: boolean;
  onAddToCart: (id: string) => void;
}

export function CartItem({
  id,
  name,
  price,
  warranty,
  storage,
  condition,
  delivery,
  isAvailable,
  hasAlternative,
  onAddToCart,
}: CartItemProps) {
  return (
    // <div className="bg-white p-6 rounded-lg shadow-sm">
    //   {!isAvailable && (
    //     <span className="inline-block px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md mb-4">
    //       Not available
    //     </span>
    //   )}
    //   {hasAlternative && (
    //     <span className="inline-block px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-md mb-4">
    //       Alternative option available
    //     </span>
    //   )}
    //   <div className="flex gap-4">
    //     <div className="relative w-32 h-32 flex-shrink-0">
    //       <Image src="/buy/p3.png" alt={name} fill className="object-contain" />
    //     </div>
    //     <div className="flex-grow">
    //       <h3 className="text-lg font-medium">{name}</h3>
    //       <div className="space-y-1 text-sm text-gray-600 mt-2">
    //         <p>
    //           Warranty: {warranty} | {storage}
    //         </p>
    //         <p>Condition: {condition}</p>
    //         <p className="text-green-600">Delivery: {delivery}</p>
    //         <p>Sales & Shipping: Console & you</p>
    //         <p>Warranty: {warranty}</p>
    //       </div>
    //     </div>
    //     <div className="flex flex-col items-end justify-between">
    //       <span className="text-lg font-medium">${price}</span>
    //       <button
    //         onClick={() => onAddToCart(id)}
    //         className="w-32 text-sm font-medium text-[#222C9B]"
    //       >
    //         Add to Cart
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white p-6 rounded-lg shadow-sm">
      {!isAvailable && (
        <span className="inline-block px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md mb-4">
          Not available
        </span>
      )}
      {hasAlternative && (
        <span className="inline-block px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-md mb-4">
          Alternative option available
        </span>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image Section */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0">
          <Image src="/buy/p3.png" alt={name} fill className="object-contain" />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-center md:text-left">
            {name}
          </h3>
          <div className="space-y-1 text-sm text-gray-600 mt-2 text-center md:text-left">
            <p>
              Warranty: {warranty} | {storage}
            </p>
            <p>Condition: {condition}</p>
            <p className="text-green-600">Delivery: {delivery}</p>
            <p>Sales & Shipping: Console & you</p>
            <p>Warranty: {warranty}</p>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex flex-col items-center md:items-end justify-between space-y-4 md:space-y-0">
          <span className="text-lg font-medium">${price}</span>
          <button
            onClick={() => onAddToCart(id)}
            className="w-full md:w-32 text-sm font-medium text-[#222C9B] border border-[#222C9B] rounded-md px-4 py-1"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
