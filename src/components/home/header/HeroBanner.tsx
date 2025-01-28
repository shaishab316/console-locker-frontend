import Container from "@/components/common/Container";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="bg-[url(/hero-banner.png)] bg-cover bg-no-repeat min-h-[calc(100vh-80px)]">
      <Container>
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] items-center justify-center">
          {/* Hidden on small screens */}
          <div className="hidden md:block w-1/2"></div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
            <h1 className="text-[32px] md:text-4xl lg:text-[70px] font-bold text-white leading-tight md:leading-normal">
              A SECOND CHANCE <br /> FOR YOUR CONSOLE!
            </h1>
            <p className="text-white text-sm md:text-lg mb-6 md:mb-8 max-w-[380px] mx-auto md:mx-0">
              Console Locker, make room for the new and sell your used console.{" "}
              <br />
              Save with a refurbished console and enjoy a first-class gaming
              experience.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
              <Link
                href={"buy/playstation"}
                className="bg-[#FDFDFD] text-[#E95F00] font-medium px-8 py-3 md:px-10 md:py-4 border rounded-md w-full md:w-auto"
              >
                Buy Now
              </Link>
              <Link
                href={"/sell"}
                className="bg-transparent text-[#FDFDFD] font-medium px-8 py-3 md:px-10 md:py-4 border rounded-md w-full md:w-auto"
              >
                Sell Now
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
