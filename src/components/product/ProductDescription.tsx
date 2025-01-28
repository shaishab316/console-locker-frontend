"use client";

export default function ProductDescription() {
  const features = [
    "Comes with a sleek and elegant design that blends with alluring matte finish",
    "It holds more power than PS4, it is more than double as powerful in gaming",
    "It increases immersion in PS4 games through an unbelievable boost in frame rate",
    "Comes with HDR technology to deliver vibrant, lifelike colors and details in visual",
    "Amazing 4K clarity makes everything so clear and life like never before",
    "PS4 pro has stunning graphical details with sharper and super contrasts visual",
    "In Sony Bravia 4K TV, PS4 pro shows the most vibrant and clear display ever",
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>

      {/* Hero Banner Section */}
      <div className="relative mb-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <div className="absolute inset-0 grid grid-cols-3">
            {/* Game Characters Background */}
            <div className="bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x999999999999999-cLYr2Q5e6aJ9PhTZe8XAuWuTkPlKZ1.png')] bg-cover bg-center"></div>
            <div className="relative flex items-center justify-center bg-gradient-to-r from-black/50 to-black/20">
              {/* 4K HDR Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1">
                  4K
                </div>
                <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 mt-1">
                  HDR
                </div>
              </div>

              {/* PS4 Pro Logo */}
              <div className="text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">PS4</h1>
                <span className="text-xl md:text-2xl font-semibold">Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Systems & Benefits Button */}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors">
          Systems & benefits
        </button>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Play Station 4 Pro - PS4 Pro
      </h1>

      {/* Main Description */}
      <p className="text-gray-600 mb-8 leading-relaxed">
        The PlayStation 4 Pro (PS4 Pro) is a powerful gaming console from Sony.
        It's a significant upgrade from the standard PS4, offering enhanced
        graphics and 4K support. It delivers stunning visual fidelity, more
        power than PS4, and great GPU that is general PS4. With this
        combination, it provides smoother gameplay and much faster frame rates.
        The Pro's expanded storage caters to the demands of modern gaming,
        allowing for larger game libraries. With an extensive catalog of
        exclusive titles and immersive gaming experiences, The PS4 Pro became a
        cornerstone of entertainment, captivating gamers with its unparalleled
        graphics and seamless gameplay.
      </p>

      {/* Secondary Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Play Station 4 Pro - PS4 Pro
      </h2>

      {/* Features List */}
      <ul className="space-y-3 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1 text-xs">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
