import Container from "@/components/common/Container";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-[#F2F5F7] md:px-6 lg:px-8">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

        <div className="space-y-6 text-gray-600">
          <p>
            Welcome to our website, the reference point for refurbished gaming
            consoles in Italy! We are a young and dynamic company, born from a
            passion for video games and the desire to offer our customers an
            excellent gaming experience at affordable prices.
          </p>

          <p>
            Our journey began on eBay, where thanks to the dedication and
            quality of our products we quickly became the first seller of
            refurbished consoles in Italy. The success achieved on the platform
            pushed us to take a step forward and open our e-commerce, to be able
            to offer an even better and more direct service to our customers.
            Our mission is simple: to make quality gaming consoles accessible to
            everyone. We believe every gamer deserves to live unforgettable
            gaming experiences without having to spend a fortune. For this
            reason, we are committed to carefully selecting, testing and
            refurbishing every console we sell, ensuring that it is as good as
            new.
          </p>

          <p>
            Each console undergoes rigorous quality control and functional
            testing to ensure it is in top condition. Our experience as a top
            seller on eBay is a testament to our reliability and commitment to
            our customers. We put our customers&apos; needs first, offering a
            fast and available support service for any need. We offer a
            guarantee on all our products, because we are confident in the
            quality of our work and want our customers to purchase with complete
            peace of mind.
          </p>

          <p>
            We love video games as much as you do, and this is reflected in the
            care with which we select and refurbish our consoles. We always
            strive for excellence in everything we do, from the refurbishment
            process to customer service. We believe in giving consoles a second
            life, thus helping to reduce electronic waste and promote more
            responsible consumption.
          </p>

          <p>
            Thank you for choosing us for your gaming needs. We are excited to
            take you on your next gaming journey with our high-quality
            refurbished consoles. Play more. Spend less. Be happy.
          </p>

          <p>
            For any questions or needs, do not hesitate to contact us. We are
            here for you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <div className="bg-blue-50 w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4">
              <Image
                src="/about/a1.png"
                alt="Tools icon"
                width={32}
                height={32}
                className="text-blue-500"
              />
            </div>
            <h3 className="font-semibold mb-2">Start thinking circular</h3>
            <p className="text-sm text-gray-600">
              Let&apos;s take technology further. It&apos;s good for the planet
              and your wallet.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-50 w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4">
              <Image
                src="/about/a2.png"
                alt="Gift box icon"
                width={32}
                height={32}
                className="text-blue-500"
              />
            </div>
            <h3 className="font-semibold mb-2">Performs like new</h3>
            <p className="text-sm text-gray-600">
              Reliable, high-quality phones refurbished by our experts in
              Europe.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-50 w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4">
              <Image
                src="/about/a3.png"
                alt="Delivery truck icon"
                width={32}
                height={32}
                className="text-blue-500"
              />
            </div>
            <h3 className="font-semibold mb-2">Fast delivery</h3>
            <p className="text-sm text-gray-600">
              Full, money-back guarantee, free returns & a 12-month warranty
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
