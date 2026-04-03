// app/page.tsx
import HeroSection from "@/components/HeroSection";
import InternshipList from "@/components/InternshipList";
import HowItWorks from "@/components/HowItWorks";
import CommunitySection from "@/components/CommunitySection";
import OurStory from "@/components/OurStory";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <InternshipList />
      <HowItWorks />
      <OurStory />
      <CommunitySection />
      <Footer/>
    </div>
  );
}
