"use client";

import Image from "next/image";

export default function GreenStory() {
  const ecologicalPoints = Array(4).fill(
    "Acquistare o vendere una console usata non è solo conveniente, ma è anche una scelta ecologica."
  );

  return (
    <div className="h-[864px] flex flex-col md:flex-row mb-40 md:mb-10">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-full">
        <Image
          src="/home/eco1.png"
          alt="PlayStation 5 on green moss"
          width={700}
          height={700}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-[#63B95E] p-8 md:p-12 h-full">
        <div>
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            LA STORIA VERDE DI
            <br />
            CONSOLE LOCKER.
          </h1>

          <div className="w-full h-2 border-b-2 border-white mb-6"></div>

          {/* Cards */}
          <div className="space-y-5">
            {ecologicalPoints.map((text, index) => (
              <div
                key={index}
                className="bg-[#209C54] backdrop-blur-sm p-6 rounded-lg 
              transform transition-all duration-300 hover:translate-x-2
              cursor-pointer"
              >
                <p className="text-white text-sm md:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    
  );
}
