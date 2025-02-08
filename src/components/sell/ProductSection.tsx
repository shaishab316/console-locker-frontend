import Container from "../common/Container";
import ProductCard from "./ProductCard";

const products = [
  { id: "xbox", img: "/sell/p1.png", name: "Xbox", price: 499 },
  {
    id: "ps5",
    img: "/sell/p2.png",
    name: "PlayStation 5",
    price: 599,
  },
  {
    id: "ps4",
    img: "/sell/p3.png",
    name: "PlayStation 4",
    price: 299,
  },
  {
    id: "switch",
    img: "/sell/p4.png",
    name: "Nintendo Switch",
    price: 199,
  },
  {
    id: "steamdeck",
    img: "/sell/p5.png",
    name: "Steam Deck",
    price: 399,
  },
  {
    id: "xbox360",
    img: "/sell/p1.png",
    name: "Xbox 360",
    price: 149,
  },
  {
    id: "ps3",
    img: "/sell/p2.png",
    name: "PlayStation 3",
    price: 129,
  },
  {
    id: "wii",
    img: "/sell/p3.png",
    name: "Nintendo Wii",
    price: 89,
  },
  {
    id: "gamecube",
    img: "/sell/p4.png",
    name: "Nintendo GameCube",
    price: 69,
  },
  {
    id: "n64",
    img: "/sell/p5.png",
    name: "Nintendo 64",
    price: 49,
  },
  {
    id: "atari",
    img: "/sell/p2.png",
    name: "Atari 2600",
    price: 99,
  },
  {
    id: "ps2",
    img: "/sell/p1.png",
    name: "PlayStation 2",
    price: 199,
  },
];

const ProductSection = () => {
  return (
    <div className="bg-[#F2F5F7] pt-20 pb=12">
      <Container>
        <h2 className="text-center text-[#101010] text-[40px] font-semibold">
          Select your Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductSection;
