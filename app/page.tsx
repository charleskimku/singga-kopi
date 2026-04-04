import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/sections/AboutSection";
import BentoSection from "@/components/sections/BentoSection";
import StatsSection from "@/components/sections/StatsSection";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <SmoothScroll>
        <main className="bg-black relative">
          {/* Canvas Scrollytelling Hero Area */}
          <SequenceScroll />

          {/* Following Sections (Overlap the end of the 400vh sequence) */}
          <AboutSection />
          <BentoSection />
          <StatsSection />
          <Testimonials />
          <CTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
