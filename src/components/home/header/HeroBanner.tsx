import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="bg-[url(/home/bannermobile1.png)] md:bg-[url(/hero-banner.png)] bg-cover bg-no-repeat min-h-[calc(100vh-80px)]">
      <Container>
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] lg:items-center lg:justify-center">
          {/* Hidden on small screens */}
          <div className="hidden md:block w-1/2"></div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
            {/* for mobile */}
            <h1 className="lg:hidden text-[24px] text-left font-bold text-white leading-tight md:leading-normal mt-8">
              DAI UNA <br /> SECONDA POSSIBILITÀ ALLA TUA CONSOLE!
            </h1>

            {/* for desktop */}
            <h1 className="hidden lg:block text-[32px] md:text-4xl lg:text-[70px] font-bold text-white leading-tight md:leading-normal">
              A SECOND CHANCE <br /> FOR YOUR CONSOLE!
            </h1>

            {/* for mobile - horizontal line */}
            <div className="lg:hidden border-b-4 border-gray-50 my-5"></div>

            {/* for mobile */}
            <p className="lg:hidden text-white text-sm font-semibold text-left leading-[28px] mb-6 md:mb-8 max-w-[380px] mx-auto md:mx-0">
              Console Locker, fai spazio al nuovo <br /> e vendi la tua console
              usata. <br /> Risparmia con una console ricondizionata e vivi
              un&rsquo;esperienza gaming di prima scelta.
            </p>

            {/* for desktop */}
            <p className="hidden lg:block text-white text-sm md:text-lg mb-6 md:mb-8 max-w-[380px] mx-auto md:mx-0">
              Console Locker, make room for the new and sell your used console.{" "}
              <br />
              Save with a refurbished console and enjoy a first-class gaming
              experience.
            </p>

            {/* for mobile */}
            <div className="lg:hidden flex items-center justify-center md:justify-start gap-4 mb-5">
              <Link
                href={"buy/playstation"}
                className="w-1/2 md:w-auto bg-[#FDFDFD] text-base text-[#E95F00] font-semibold px-6 py-3 md:px-10 md:py-4 border rounded-md"
              >
                COMPRÀ ORA
              </Link>
              <Link
                href={"/sell"}
                className="w-1/2  md:w-auto bg-transparent text-base text-[#FDFDFD] font-semibold px-6 py-3 md:px-10 md:py-4 border-2 rounded-md"
              >
                VENDI ORA
              </Link>
            </div>

            {/* for desktop */}
            <div className="hidden lg:flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
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

            {/* for mobile  */}
            <div className="lg:hidden flex items-end justify-end pr-0 md:pr-14">
              <Image
                src={"/home/banner-warranty.png"}
                width={124}
                height={56}
                alt="warranty"
              />
            </div>

            {/* for desktop */}
            <div className="hidden lg:flex items-end justify-end pr-0 md:pr-14">
              <Image
                src={"/home/banner-warranty.png"}
                width={300}
                height={160}
                alt="warranty"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
