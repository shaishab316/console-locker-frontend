import CustomSelect from "@/components/custom/CustomSelect";
import { BlogCarousel } from "@/components/home/blogs/BlogCarousel";
import NewBlogCarousel from "@/components/home/blogs/NewBlogCarousel";
import GreenStory from "@/components/home/greenStory/NewSection";
import HeroBanner from "@/components/home/header/HeroBanner";
import ConsoleSelector from "@/components/home/showcase/ConsoleSector";
import ImageSlider from "@/components/home/slider/ImageSlider";
import ReviewCarousel from "@/components/share/review-carousel/ReviewCarousel";

export default function Home() {
  return (
    <div className="bg-[#F2F5F7]">
      <HeroBanner />
      <ConsoleSelector />
      <ImageSlider />
      <ReviewCarousel />
      <GreenStory />
      {/* <NewBlogCarousel /> */}
      {/* <CustomSelect /> */}
      <BlogCarousel />
    </div>
  );
}
