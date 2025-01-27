import { BlogCarousel } from "@/components/home/blogs/BlogCarousel";
import HeroBanner from "@/components/home/header/HeroBanner";
import ConsoleSelector from "@/components/home/showcase/ConsoleSector";
import ReviewCarousel from "@/components/share/review-carousel/ReviewCarousel";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <ConsoleSelector />
      <ReviewCarousel />
      <BlogCarousel />
    </div>
  );
}
