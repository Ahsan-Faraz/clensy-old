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

interface DeepCleaningData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // Client Reviews Section
  clientReviewsHeading: string;
  clientReviewsSubheading: string;
  clientReviews: Array<{
    rating: number;
    review: string;
    clientName: string;
    clientLocation: string;
    avatarBgColor: string;
  }>;

  // Deep vs Regular Cleaning Comparison Section
  comparisonHeading: string;
  comparisonSubheading: string;
  regularCleaning: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    frequency: string;
  };
  deepCleaning: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    frequency: string;
  };

  // What's Included Section
  includedSectionHeading: string;
  includedSectionSubheading: string;

  // Bathroom Section
  bathroomTitle: string;
  bathroomDescription: string;
  bathroomImage: string;
  bathroomFeatures: string[];

  // Kitchen Section
  kitchenTitle: string;
  kitchenDescription: string;
  kitchenImage: string;
  kitchenFeatures: string[];

  // Living Areas Section
  livingAreasTitle: string;
  livingAreasDescription: string;
  livingAreasImage: string;
  livingAreasFeatures: string[];

  // Deep Cleaning Difference Section
  differenceHeading: string;
  differenceSubheading: string;
  deepCleaningDifference: Array<{
    beforeImage: string;
    afterImage: string;
    heading: string;
    caption: string;
  }>;

  // When to Choose Deep Cleaning Section
  whenToChooseHeading: string;
  whenToChooseSubheading: string;

  // When to Choose - Card 1: Moving
  movingTitle: string;
  movingDescription: string;
  movingIcon: string;

  // When to Choose - Card 2: Seasonal
  seasonalTitle: string;
  seasonalDescription: string;
  seasonalIcon: string;

  // When to Choose - Card 3: Special Occasions
  specialOccasionsTitle: string;
  specialOccasionsDescription: string;
  specialOccasionsIcon: string;

  // FAQ Section
  faqs?: FAQItem[];
}
export default function DeepCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<DeepCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/deep-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching deep cleaning data:", error);
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

      {/* Split Hero Section - Different from routine cleaning page */}
      <section className="relative min-h-[85vh] bg-black pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839985/photo-1501183638710-841dd1904471_mqyar3.avif"
            alt="Clean modern home interior"
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
                {data.heroHeading.split(" ").slice(0, 4).join(" ")} <br />
                <span className="text-white">
                  {data.heroHeading.split(" ").slice(4).join(" ")}
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
                <div className="bg-blue-100 text-blue-700 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center w-48 cursor-default select-none">
                  Deep Cleaning Experts
                </div>

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

      {/* What's Included Section with Zigzag Layout - Different from routine cleaning */}
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
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750839467/image51_rdeigp.png"
                alt="Bathroom deep cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
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
          </div>

          {/* Item 2 - Right image, left text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
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
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750841898/image73_lowp7v.png"
                alt="Kitchen deep cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750841934/image80_lzfymb.png"
                alt="Living areas deep cleaning"
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

      {/* Before & After Section - Unique to deep cleaning page */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.differenceHeading}
            </h2>
            <p className="text-lg text-gray-600">{data.differenceSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before & After 1 - Kitchen Transformation */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>

                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.deepCleaningDifference[0].beforeImage}
                      alt="Before deep cleaning - dirty kitchen"
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
                      src={data.deepCleaningDifference[0].afterImage}
                      alt="After deep cleaning - clean kitchen"
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
                {data.deepCleaningDifference[0].heading}
              </h3>
              <p className="text-gray-600">
                {data.deepCleaningDifference[0].caption}
              </p>
            </div>

            {/* Before & After 2 - Bathroom Revival */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.deepCleaningDifference[1].beforeImage}
                      alt="Before deep cleaning bathroom - dirty"
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
                      src={data.deepCleaningDifference[1].afterImage}
                      alt="After deep cleaning bathroom - spotless"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-green-600/70 text-white px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{data.deepCleaningDifference[1].heading}</h3>
              <p className="text-gray-600">
                {data.deepCleaningDifference[1].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to Choose Deep Cleaning - Unique section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.whenToChooseHeading}
            </h2>
            <p className="text-lg text-white/80">
              {data.whenToChooseSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image
                  src={data.movingIcon}
                  alt="Moving in"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{data.movingTitle}</h3>
              <p className="text-white/80">{data.movingDescription}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image
                  src={data.seasonalIcon}
                  alt="Seasonal cleaning"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.seasonalTitle}
              </h3>
              <p className="text-white/80">{data.seasonalDescription}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image
                  src={data.specialOccasionsIcon}
                  alt="Special occasions"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.specialOccasionsTitle}
              </h3>
              <p className="text-white/80">
                {data.specialOccasionsDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.clientReviewsHeading}
            </h2>
            <p className="text-lg text-white/80">
              {data.clientReviewsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.clientReviews.map((review, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 flex-grow">
                  "{review.review}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className={`w-12 h-12 rounded-full bg-${review.avatarBgColor} flex items-center justify-center mr-4`}>
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
                    <p className="font-semibold">{review.clientName}</p>
                    <p className="text-white/60 text-sm">{review.clientLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep vs Regular Cleaning Comparison Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.comparisonHeading}
            </h2>
            <p className="text-lg text-gray-600">
              {data.comparisonSubheading}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Regular Cleaning Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gray-100 p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {data.regularCleaning.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {data.regularCleaning.subtitle}
                  </p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {data.regularCleaning.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{feature.title}</span>
                          <p className="text-sm text-gray-500 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500">
                      Recommended frequency: <br />
                      <span className="font-semibold text-gray-700">
                        {data.regularCleaning.frequency}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Deep Cleaning Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden ring-2 ring-blue-500"
              >
                <div className="bg-blue-600 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white">
                    {data.deepCleaning.title}
                  </h3>
                  <p className="text-blue-100 mt-2">
                    {data.deepCleaning.subtitle}
                  </p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {data.deepCleaning.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{feature.title}</span>
                          <p className="text-sm text-gray-500 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500">
                      Recommended frequency: <br />
                      <span className="font-semibold text-blue-600">
                        {data.deepCleaning.frequency}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
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
              Learn more about our premium deep cleaning service.
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
