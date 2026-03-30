"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckSquare,
  Trash2,
  Sparkles,
  HardHat,
  Brush,
  Clock,
  Calendar,
  Star,
  Shield,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface PostConstructionCleaningData {
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

  // Debris Removal Section
  debrisRemovalTitle: string;
  debrisRemovalDescription: string;
  debrisRemovalImage: string;
  debrisRemovalFeatures: string[];

  // Dust Elimination Section
  dustEliminationTitle: string;
  dustEliminationDescription: string;
  dustEliminationImage: string;
  dustEliminationFeatures: string[];

  // Surface Finishing Section
  surfaceFinishingTitle: string;
  surfaceFinishingDescription: string;
  surfaceFinishingImage: string;
  surfaceFinishingFeatures: string[];

  // Before & After Section
  beforeAfterHeading: string;
  beforeAfterSubheading: string;
  postConstructionDifference: {
    heading: string;
    beforeImage: string;
    afterImage: string;
    caption: string;
  }[];

  // Process Section
  processHeading: string;
  processSubheading: string;

  // Process Steps
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  step4Title: string;
  step4Description: string;

  // Safety Standards Section
  safetyHeading: string;
  safetySubheading: string;

  // Safety Standard 1: PPE
  ppeTitle: string;
  ppeDescription: string;
  ppeFeatures: string[];

  // Safety Standard 2: Hazardous Material Handling
  hazmatTitle: string;
  hazmatDescription: string;
  hazmatFeatures: string[];

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function PostConstructionCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState<PostConstructionCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/post-construction-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching post-construction cleaning data:", error);
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

      {/* Split Hero Section - Following Deep Cleaning layout */}
      <section className="relative min-h-[85vh] bg-black pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750843867/Post-Construction-Cleaning-Alexandria-VA_ohsoll.jpg"
            alt="Post-construction site"
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
                className="inline-block mb-6 px-6 py-2 bg-yellow-500 rounded-lg"
              >
                <span className="text-black font-semibold text-sm uppercase tracking-wider">
                  {data.heroTopLabel}
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 hero-text-shadow">
                {data.heroHeading.includes("Construction Zone") ? (
                  <>
                    From <span className="text-yellow-500">Construction Zone</span>{" "}
                    <br />
                    to Move-In Ready
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
                <div className="bg-yellow-100 text-yellow-700 px-8 py-3 rounded-lg text-sm font-medium inline-flex items-center justify-center w-48 cursor-default select-none">
                  Free On-Site Estimates
                </div>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-8">
                    <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="text-sm whitespace-nowrap">
                      {data.heroServiceDuration}
                    </span>
                  </div>

                  <div className="flex items-center text-white/90">
                    <Shield className="h-5 w-5 mr-2 text-yellow-500" />
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

      {/* What's Included Section with Zigzag Layout */}
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

          {/* Item 1 - Left image, right text - Debris Removal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750843958/post-construction-cleaning-services-1080x675_hwvovl.jpg"
                alt="Debris removal team"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.debrisRemovalTitle}</h3>
              <p className="text-gray-600 mb-6">
                {data.debrisRemovalDescription}
              </p>
              <ul className="space-y-3">
                {data.debrisRemovalFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Item 2 - Right image, left text - Dust Elimination */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4">{data.dustEliminationTitle}</h3>
              <p className="text-gray-600 mb-6">
                {data.dustEliminationDescription}
              </p>
              <ul className="space-y-3">
                {data.dustEliminationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750844110/shutterstock_2199850967_rnhuq8.jpg"
                alt="Dust elimination process"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text - Surface Finishing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750844265/shutterstock_2419275107_1_wjr0tt.jpg"
                alt="Surface finishing"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.surfaceFinishingTitle}</h3>
              <p className="text-gray-600 mb-6">
                {data.surfaceFinishingDescription}
              </p>
              <ul className="space-y-3">
                {data.surfaceFinishingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section - Following Deep Cleaning layout */}
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
            {/* Before & After 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.postConstructionDifference[0].beforeImage}
                      alt="Before cleaning - construction debris"
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
                      src={data.postConstructionDifference[0].afterImage}
                      alt="After cleaning - pristine room"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-yellow-500/70 text-black px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {data.postConstructionDifference[0].heading}
              </h3>
              <p className="text-gray-600">
                {data.postConstructionDifference[0].caption}
              </p>
            </div>

            {/* Before & After 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.postConstructionDifference[1].beforeImage}
                      alt="Before cleaning - construction kitchen"
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
                      src={data.postConstructionDifference[1].afterImage}
                      alt="After cleaning - pristine kitchen"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-yellow-500/70 text-black px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{data.postConstructionDifference[1].heading}</h3>
              <p className="text-gray-600">
                {data.postConstructionDifference[1].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section - Similar to Deep Cleaning's "When to Choose" section */}
      <section id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.processHeading}
            </h2>
            <p className="text-lg text-white/80">
              {data.processSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-yellow-500/20 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-yellow-500 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.step1Title}
              </h3>
              <p className="text-white/80">
                {data.step1Description}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-yellow-500/20 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-yellow-500 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.step2Title}
              </h3>
              <p className="text-white/80">
                {data.step2Description}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-yellow-500/20 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-yellow-500 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.step3Title}
              </h3>
              <p className="text-white/80">
                {data.step3Description}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-yellow-500/20 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-yellow-500 font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.step4Title}
              </h3>
              <p className="text-white/80">
                {data.step4Description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Following Deep Cleaning layout */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/80">
              Hear from our satisfied clients about their experience with our
              post-construction cleaning service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 flex-grow">
                "The attention to detail was incredible. My construction site
                has never felt so clean and fresh. I've tried other services
                before, but Clensy's post-construction cleaning is in a league
                of its own."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-white/60 text-sm">New Jersey, NJ</p>
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
              <p className="text-white/80 mb-6 flex-grow">
                "I've been using Clensy for multiple construction projects now,
                and it's been a game-changer. The consistency and reliability of
                their service is outstanding. My sites always look immaculate."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Michael Rodriguez</p>
                  <p className="text-white/60 text-sm">New Jersey, NJ</p>
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
              <p className="text-white/80 mb-6 flex-grow">
                "As a busy contractor, having Clensy's post-construction
                cleaning service has been life-changing. I hand over spotless
                properties every time, and their staff is always professional
                and thorough."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Jennifer Park</p>
                  <p className="text-white/60 text-sm">New Jersey, NJ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards Section - Unique to Post Construction */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.safetyHeading}
            </h2>
            <p className="text-lg text-gray-600">
              {data.safetySubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <div className="flex items-start mb-6">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <HardHat className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {data.ppeTitle}
                  </h3>
                  <p className="text-gray-600">
                    {data.ppeDescription}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {data.ppeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckSquare className="h-5 w-5 mr-2 text-yellow-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <div className="flex items-start mb-6">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {data.hazmatTitle}
                  </h3>
                  <p className="text-gray-600">
                    {data.hazmatDescription}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {data.hazmatFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckSquare className="h-5 w-5 mr-2 text-yellow-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Following Deep Cleaning Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Common questions about our post-construction cleaning services.
            </p>

            <div className="space-y-8">
              {data?.faqs && data.faqs.length > 0 ? (
                data.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-yellow-500">
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
