"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import ComparisonSection from "@/components/comparison-section";
import ChecklistSection from "@/components/checklist-section";
import ReviewsSection from "@/components/reviews-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div className="max-w-full">
        <HowItWorks />
        <ChecklistSection />
        <ReviewsSection />
        <ComparisonSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
