import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Conundrums from "@/components/Conundrums";
import Testimonials from "@/components/Testimonials";
import JourneyGallery from "@/components/JourneyGallery";
import PricingBento from "@/components/PricingBento";
import FAQ from "@/components/FAQ";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Conundrums />
        <Testimonials />
        <JourneyGallery />
        <PricingBento />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
