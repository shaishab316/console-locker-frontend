import HowDelivery from "@/components/sell/HowDelivery";
import ProductSection from "@/components/sell/ProductSection";
import SellHeroSection from "@/components/sell/SellHeroSection";
import ReviewCarousel from "@/components/share/review-carousel/ReviewCarousel";

const SellPage = () => {
  return (
    <div>
      <SellHeroSection />
      <HowDelivery />
      <ProductSection />
      <ReviewCarousel />
    </div>
  );
};

export default SellPage;
