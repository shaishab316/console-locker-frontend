"use client";

import * as React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

export default function ImageSlider() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 2.3, // Show 2 full images and 10% of previous/next images
      spacing: 15, // Adjust spacing for smooth layout
    },
  });

  return (
    <div className="md:hidden w-full">
      <div className="flex items-center justify-center py-8 space-x-4">
        <hr className="flex-1 border-b border-gray-300" />
        <h2 className="max-w-[290px] mx-auto text-[#101010] text-2xl md:text-5xl font-semibold text-center">
          Confonta le recensioni dei nostri clienti
        </h2>
        <hr className="flex-1 border-b border-gray-300" />
      </div>
      <div ref={ref} className="keen-slider">
        <div className="keen-slider__slide">
          <Image
            src={"/home/slide.png"}
            width={300}
            height={600}
            alt="slider"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            src={"/home/slide.png"}
            width={300}
            height={600}
            alt="slider"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            src={"/home/slide.png"}
            width={300}
            height={600}
            alt="slider"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            src={"/home/slide.png"}
            width={300}
            height={600}
            alt="slider"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            src={"/home/slide.png"}
            width={300}
            height={600}
            alt="slider"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            src={"/home/slide.png"}
            width={300}
            height={600}
            alt="slider"
            className=""
          />
        </div>
      </div>
    </div>
  );
}

// "use client";

// import * as React from "react";
// import "./styles.css";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

// export default function ImageSlider() {
//   const [ref] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     mode: "free-snap",
//     slides: {
//       perView: 2.5,
//       spacing: 15,
//     },
//   });
//   return (
//     <div ref={ref} className="keen-slider">
//       <div className="keen-slider__slide number-slide1">1</div>
//       <div className="keen-slider__slide number-slide2">2</div>
//       <div className="keen-slider__slide number-slide3">3</div>
//       <div className="keen-slider__slide number-slide4">4</div>
//       <div className="keen-slider__slide number-slide5">5</div>
//       <div className="keen-slider__slide number-slide6">6</div>
//     </div>
//   );
// }
