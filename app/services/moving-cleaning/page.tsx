"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Star,
  Package,
  Home,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Calendar,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface FAQItem {
  question: string;
  answer: string;
}

interface MovingCleaningData {
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

  // Move-Out Cleaning Section
  moveOutTitle: string;
  moveOutDescription: string;
  moveOutImage: string;
  moveOutFeatures: string[];

  // Move-In Cleaning Section
  moveInTitle: string;
  moveInDescription: string;
  moveInImage: string;
  moveInFeatures: string[];

  // Post-Renovation Cleaning Section
  postRenovationTitle: string;
  postRenovationDescription: string;
  postRenovationImage: string;
  postRenovationFeatures: string[];

  // Before & After Section
  beforeAfterHeading: string;
  beforeAfterSubheading: string;
  MoveInCleaningDifference: {
    beforeImage: string;
    afterImage: string;
    heading: string;
    caption: string;
  }[];

  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;

  // Benefit 1: Secure Your Deposit
  benefit1Title: string;
  benefit1Description: string;
  benefit1Icon: string;

  // Benefit 2: Reduce Moving Stress
  benefit2Title: string;
  benefit2Description: string;
  benefit2Icon: string;

  // Benefit 3: Health Protection
  benefit3Title: string;
  benefit3Description: string;
  benefit3Icon: string;
  faqs?: FAQItem[];
}

export default function MovingCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("moveOut");
  const [data, setData] = useState<MovingCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/moving-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching moving cleaning data:", error);
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
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842260/Move-In-Move-Out-Cleaning_b9ghos.jpg"
            alt="Moving cleaning service"
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
                {data.heroHeading.includes("Clean Slate") ? (
                  <>
                    {data.heroHeading.split("Clean Slate")[0]}
                    <span className="text-[#4CAF50]">Clean Slate</span>
                  </>
                ) : (
                  data.heroHeading
                )}
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
                <div className="bg-green-100 text-green-700 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center w-48 cursor-default select-none">
                  Move-In Cleaning Experts
                </div>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-8">
                    <Clock className="h-5 w-5 mr-2 text-[#4CAF50]" />
                    <span className="text-sm whitespace-nowrap">
                      {data.heroServiceDuration}
                    </span>
                  </div>

                  <div className="flex items-center text-white/90">
                    <Shield className="h-5 w-5 mr-2 text-[#4CAF50]" />
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

          {/* Item 1 - Left image, right text - Move-Out Cleaning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842325/image57_zrdwhw.png"
                alt="Move-out cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.moveOutTitle}</h3>
              <p className="text-gray-600 mb-6">{data.moveOutDescription}</p>
              <ul className="space-y-3">
                {data.moveOutFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Item 2 - Right image, left text - Move-In Cleaning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4">{data.moveInTitle}</h3>
              <p className="text-gray-600 mb-6">{data.moveInDescription}</p>
              <ul className="space-y-3">
                {data.moveInFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842477/kitchen_mf180f.jpg"
                alt="Move-in cleaning team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text - Post-Renovation Cleaning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842477/kitchen_mf180f.jpg"
                alt="Post-renovation cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">
                {data.postRenovationTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.postRenovationDescription}
              </p>
              <ul className="space-y-3">
                {data.postRenovationFeatures.map((feature, index) => (
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

      {/* Before & After Section - Matching deep cleaning page */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.beforeAfterHeading}
            </h2>
            <p className="text-lg text-gray-600">
              {data.beforeAfterSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before & After 1 - Move-Out */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.MoveInCleaningDifference[0].beforeImage}
                      alt="Before move-out cleaning - dirty kitchen"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black/70 text-white px-3 py-1 text-sm">
                      Before
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.MoveInCleaningDifference[0].afterImage}
                      alt="After move-out cleaning - spotless kitchen"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-green-600/70 text-white px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {data.MoveInCleaningDifference[0].heading}
              </h3>
              <p className="text-gray-600">
                {data.MoveInCleaningDifference[0].caption}
              </p>
            </div>

            {/* Before & After 2 - Move-In */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.MoveInCleaningDifference[1].beforeImage}
                      alt="Before move-in cleaning - dirty bathroom"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black/70 text-white px-3 py-1 text-sm">
                      Before
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.MoveInCleaningDifference[1].afterImage}
                      alt="After move-in cleaning - sparkling bathroom"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-green-600/70 text-white px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {data.MoveInCleaningDifference[1].heading}
              </h3>
              <p className="text-gray-600">
                {data.MoveInCleaningDifference[1].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Cleaning Benefits - Similar to deep cleaning's "When to Choose" section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.benefitsHeading}
            </h2>
            <p className="text-lg text-white/80">{data.benefitsSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-[#4CAF50]/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image
                  src={data.benefit1Icon}
                  alt={data.benefit1Title}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.benefit1Title}
              </h3>
              <p className="text-white/80">{data.benefit1Description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-[#4CAF50]/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image
                  src={data.benefit2Icon}
                  alt={data.benefit2Title}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.benefit2Title}
              </h3>
              <p className="text-white/80">{data.benefit2Description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-[#4CAF50]/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image
                  src={data.benefit3Icon}
                  alt={data.benefit3Title}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.benefit3Title}
              </h3>
              <p className="text-white/80">{data.benefit3Description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/80">
              Read testimonials from customers who have used our moving cleaning
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 flex-grow italic">
                "I was so stressed about getting my security deposit back from
                my old apartment. Clensy's move-out cleaning service was a
                lifesaver! They cleaned areas I didn't even think about, and I
                got my full deposit back. Worth every penny!"
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Jessica Miller</p>
                  <p className="text-white/60 text-sm">
                    Move-Out Cleaning Customer
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 flex-grow italic">
                "Moving into our new home was chaotic enough without having to
                worry about cleaning. Clensy came in before we moved our
                furniture and made the place spotless. It was such a relief to
                move into a clean, fresh-smelling home!"
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Michael Chang</p>
                  <p className="text-white/60 text-sm">
                    Move-In Cleaning Customer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Stress Reduction - Unique to Moving Cleaning */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reduce Your Moving Stress
            </h2>
            <p className="text-lg text-gray-600">
              Moving is consistently ranked as one of life's most stressful
              events. Let us handle the cleaning so you can focus on settling
              into your new home.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750843652/shutterstock_24719252552_q5witg.jpg"
                alt="Person relieved from moving stress"
                width={600}
                height={450}
                className="rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">
                How Professional Moving Cleaning Helps
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-black/5 rounded-full p-3 mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Save Valuable Time
                    </h4>
                    <p className="text-gray-600">
                      The average person spends 12-16 hours cleaning when moving
                      out. Our team can complete the job in 4-6 hours, giving
                      you back precious time during your move.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black/5 rounded-full p-3 mr-4 flex-shrink-0">
                    <Shield className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Avoid Deposit Disputes
                    </h4>
                    <p className="text-gray-600">
                      Security deposit disputes are common and stressful. Our
                      professional cleaning service provides documentation that
                      you've fulfilled your lease's cleaning requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black/5 rounded-full p-3 mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Focus on Your Family's Transition
                    </h4>
                    <p className="text-gray-600">
                      Moving is especially challenging for families with
                      children. Our service lets you focus on helping your
                      family adjust to their new environment rather than
                      scrubbing your old one.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* FAQ Section (Dynamic, inline, no extra component) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Get answers to common questions about our moving cleaning services.
            </p>
            {data.faqs && data.faqs.length > 0 ? (
              <div className="space-y-6">
                {data.faqs.map((faq, idx) => (
                  <div className="bg-gray-50 p-6 rounded-xl" key={idx}>
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No FAQs available at this time.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection />

      <Footer />
    </main>
  );
}
