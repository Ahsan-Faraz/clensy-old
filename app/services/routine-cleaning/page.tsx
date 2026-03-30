"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Clock, Shield } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";


interface FAQItem {
  question: string;
  answer: string;
}

interface RoutineCleaningData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // What's Included Section
  includedSectionHeading: string;
  includedSectionSubheading: string;

  // Kitchen Section
  kitchenTitle: string;
  kitchenDescription: string;
  kitchenImage: string;
  kitchenFeatures: string[];

  // Bathroom Section
  bathroomTitle: string;
  bathroomDescription: string;
  bathroomImage: string;
  bathroomFeatures: string[];

  // Living Areas Section
  livingAreasTitle: string;
  livingAreasDescription: string;
  livingAreasImage: string;
  livingAreasFeatures: string[];

  // Feature Section
  featureSectionHeading: string;
  featureSectionSubheading: string;
  featureSectionImage: string;
  featureSectionPoints: string[];

  // How It Works Section
  howItWorksHeading: string;
  howItWorksSubheading: string;

  // Step 1: Book Online
  step1Title: string;
  step1Description: string;
  step1Image: string;
  step1Badge: string;

  // Step 2: We Clean
  step2Title: string;
  step2Description: string;
  step2Image: string;

  // Step 3: Relax & Enjoy
  step3Title: string;
  step3Description: string;
  step3Image: string;

  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;
  benefitsImage: string;

  // Benefit 1: Consistent Excellence
  benefit1Title: string;
  benefit1Description: string;

  // Benefit 2: Reclaimed Time & Energy
  benefit2Title: string;
  benefit2Description: string;

  // Benefit 3: Enhanced Well-being
  benefit3Title: string;
  benefit3Description: string;

  // Client Testimonials Section
  clientTestimonialsHeading: string;
  clientTestimonialsSubheading: string;
  clientTestimonials: Array<{
    rating: number;
    review: string;
    clientName: string;
    clientLocation: string;
    avatarBgColor: string;
  }>;

  // Cleaning Frequency Guide Section
  frequencyGuideHeading: string;
  frequencyGuideSubheading: string;
  
  // Weekly Option
  weeklyTitle: string;
  weeklyPerfectFor: string[];
  weeklyBenefits: string[];

  // Bi-Weekly Option  
  biWeeklyTitle: string;
  biWeeklyPerfectFor: string[];
  biWeeklyBenefits: string[];

  // Monthly Option
  monthlyTitle: string;
  monthlyPerfectFor: string[];
  monthlyBenefits: string[];

  // FAQ Section
  faqs?: FAQItem[];
}

export default function RoutineCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<RoutineCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/routine-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching routine cleaning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Split Hero Section - Matching deep cleaning layout */}
      <section className="relative min-h-[85vh] bg-black pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png"
            alt="Pristine clean living room"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(85vh-64px)]">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full"
              >
                <span className="text-white/90 text-sm font-medium">
                  {data.heroTopLabel}
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 hero-text-shadow">
                {data.heroHeading.split(" ").slice(0, 2).join(" ")} <br />
                <span className="text-white">
                  {data.heroHeading.split(" ").slice(2).join(" ")}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg text-white/80 mb-8 max-w-xl"
              >
                {data.heroSubheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contact"
                  className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300 w-48"
                >
                  <span className="text-center w-full">Get a Free Quote</span>
                </Link>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-8">
                    <Clock className="h-5 w-5 mr-2 text-[#28A745]" />
                    <span className="text-sm whitespace-nowrap">
                      {data.heroServiceDuration}
                    </span>
                  </div>

                  <div className="flex items-center text-white/90">
                    <Shield className="h-5 w-5 mr-2 text-[#28A745]" />
                    <span className="text-sm whitespace-nowrap">
                      {data.heroServiceGuarantee}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Empty space for better balance */}
            <div className="hidden md:block"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Trust indicators section - New section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">12K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <p className="text-gray-600">Customer Support</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">4.9</div>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <p className="text-gray-600">Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section with Zigzag Layout - Following deep cleaning pattern */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.includedSectionHeading}
            </h2>
            <p className="text-lg text-gray-600">
              {data.includedSectionSubheading}
            </p>
          </div>

          {/* Item 1 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838451/9_e4iama.png"
                alt="Kitchen cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.kitchenTitle}</h3>
              <p className="text-gray-600 mb-6">{data.kitchenDescription}</p>
              <ul className="space-y-3">
                {data.kitchenFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Item 2 - Right image, left text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4">{data.bathroomTitle}</h3>
              <p className="text-gray-600 mb-6">{data.bathroomDescription}</p>
              <ul className="space-y-3">
                {data.bathroomFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839467/image51_rdeigp.png"
                alt="Bathroom cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839328/image80_uzyl0v.png"
                alt="Living areas cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">
                {data.livingAreasTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.livingAreasDescription}
              </p>
              <ul className="space-y-3">
                {data.livingAreasFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - "Exceptional Cleaning Results, Every Time" */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-90"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {data.featureSectionHeading}
              </h2>
              <p className="text-lg text-white/80 mb-8">
                {data.featureSectionSubheading}
              </p>
              <div className="space-y-4">
                {data.featureSectionPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-white/10 rounded-full p-2 mr-4 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/90">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839531/image86_di8j8g.png"
                alt="Professional home cleaning"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.howItWorksHeading}
            </h2>
            <p className="text-lg text-gray-600">{data.howItWorksSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="relative h-40 rounded-xl overflow-hidden mb-6 mt-2">
                <Image
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839593/image47_npjiyh.png"
                  alt="Booking cleaning service online"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{data.step1Title}</h3>
              <p className="text-gray-600 mb-4">{data.step1Description}</p>
              <Link
                href="/booking"
                className="bg-blue-100 text-blue-700 px-8 py-3 rounded-lg text-sm font-medium inline-flex items-center justify-center w-48 hover:bg-blue-200 transition-colors"
              >
                Instant Online Pricing
              </Link>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="relative h-40 rounded-xl overflow-hidden mb-6 mt-2">
                <Image
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839700/image21_qgnpkg.png"
                  alt="Professional cleaning team at work"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{data.step2Title}</h3>
              <p className="text-gray-600 mb-4">{data.step2Description}</p>
              <Link
                href="/company/checklist"
                className="text-black font-medium flex items-center hover:underline"
              >
                See Our Checklist <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="relative h-40 rounded-xl overflow-hidden mb-6 mt-2">
                <Image
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839766/image68_npznqj.png"
                  alt="Relaxing in clean home"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{data.step3Title}</h3>
              <p className="text-gray-600 mb-4">{data.step3Description}</p>
              <button
                type="button"
                onClick={() => window.location.href = "/booking"}
                className="text-black font-medium flex items-center hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
              >
                See Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - "Why Choose Our Routine Cleaning Service" */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {data.benefitsHeading}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {data.benefitsSubheading}
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {data.benefit1Title}
                    </h3>
                    <p className="text-gray-600">{data.benefit1Description}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {data.benefit2Title}
                    </h3>
                    <p className="text-gray-600">{data.benefit2Description}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {data.benefit3Title}
                    </h3>
                    <p className="text-gray-600">{data.benefit3Description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839832/image84_rjmtgy.png"
                alt="Clean luxurious home"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - New section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.clientTestimonialsHeading}
            </h2>
            <p className="text-lg text-white/80">
              {data.clientTestimonialsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.clientTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 flex-grow">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className={`w-12 h-12 rounded-full bg-${testimonial.avatarBgColor} flex items-center justify-center mr-4`}>
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.clientName}</p>
                    <p className="text-white/60 text-sm">{testimonial.clientLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Frequency Guide - Unique to Routine Cleaning */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.frequencyGuideHeading}
            </h2>
            <p className="text-lg text-gray-600">
              {data.frequencyGuideSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Weekly Option */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="bg-green-600 p-6">
                <h3 className="text-xl font-bold text-white text-center">
                  Weekly
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Perfect For:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Busy families with children</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Homes with pets</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>High-traffic areas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Allergy sufferers</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Benefits:</h4>
                  <p className="text-gray-600">
                    Maintains a consistently clean home with no build-up of dust
                    or allergens. Best for families who want to enjoy a clean
                    home all week long.
                  </p>
                </div>

                <div className="text-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Most Popular Choice
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bi-Weekly Option */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="bg-blue-600 p-6">
                <h3 className="text-xl font-bold text-white text-center">
                  Bi-Weekly
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Perfect For:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Couples or small families</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Average-sized homes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Those who tidy regularly</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Moderate use spaces</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Benefits:</h4>
                  <p className="text-gray-600">
                    Good balance between maintaining cleanliness and budget.
                    Most popular option for average households who can handle
                    light cleaning in between.
                  </p>
                </div>

                <div className="text-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Best Value Option
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Monthly Option */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="bg-purple-600 p-6">
                <h3 className="text-xl font-bold text-white text-center">
                  Monthly
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Perfect For:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Singles or couples</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Smaller living spaces</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Those who clean regularly</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Limited use areas</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Benefits:</h4>
                  <p className="text-gray-600">
                    Good for getting a professional deep clean while handling
                    regular maintenance yourself. Ideal for those on a tighter
                    budget.
                  </p>
                </div>

                <div className="text-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Budget-Friendly Option
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-12">
            <p className="text-gray-600 italic">
              "Not sure what frequency is right for you? Contact us for a
              personalized recommendation based on your specific needs."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dynamic from backend */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Learn more about our routine cleaning service.
            </p>

            <div className="space-y-8">
              {data.faqs && data.faqs.length > 0 ? (
                data.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-600">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No FAQs available at this time.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection />
      <Footer />
    </main>
  );
}
