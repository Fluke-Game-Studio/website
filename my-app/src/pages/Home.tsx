import HeroSection from "@/components/home/HeroSection";
import GamesShowcase from "@/components/home/GamesShowcase";
import ServicesGrid from "@/components/home/ServicesGrid";
import StudioCapabilities from "@/components/home/StudioCapabilities";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";
import DevlogsPreview from "@/components/home/DevlogsPreview";
import StudioStory from "@/components/home/StudioStory";
import TeamSection from "@/components/home/TeamSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GamesShowcase />
      <ServicesGrid />
      <StudioCapabilities />
      <FeaturedPortfolio />
      <DevlogsPreview />
      <StudioStory />
      <TeamSection />
      <CtaSection />
    </>
  );
}
