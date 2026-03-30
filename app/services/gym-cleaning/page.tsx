"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Dumbbell,
  Heart,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface GymCleaningData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // Trust Indicators Section
  trustIndicator1Number: string;
  trustIndicator1Text: string;
  trustIndicator2Number: string;
  trustIndicator2Text: string;
  trustIndicator3Number: string;
  trustIndicator3Text: string;
  trustIndicator4Number: string;
  trustIndicator4Text: string;

  // What's Included Section
  includedSectionHeading: string;
  includedSectionSubheading: string;

  // Equipment & Workout Areas Section
  equipmentTitle: string;
  equipmentDescription: string;
  equipmentImage: string;
  equipmentFeatures: string[];

  // Locker Rooms & Shower Facilities Section
  lockerRoomsTitle: string;
  lockerRoomsDescription: string;
  lockerRoomsImage: string;
  lockerRoomsFeatures: string[];

  // Studio & Class Spaces Section
  studioTitle: string;
  studioDescription: string;
  studioImage: string;
  studioFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Specialized Sanitization
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: 24/7 Flexibility
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Health-Focused Approach
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function GymCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<GymCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/gym-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching gym cleaning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="h-8 w-8 text-blue-600" />;
      case "Clock":
        return <Clock className="h-8 w-8 text-blue-600" />;
      case "Heart":
        return <Heart className="h-8 w-8 text-blue-600" />;
      case "Sparkles":
        return <Sparkles className="h-8 w-8 text-blue-600" />;
      default:
        return <Shield className="h-8 w-8 text-blue-600" />;
    }
  };

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

      {/* Split Hero Section */}
      <section className="relative min-h-[85vh] bg-black pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846490/image94_krf7c0.png"
            alt="Modern fitness center interior"
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
                {data.heroHeading.includes("&") ? (
                  <>
                    {data.heroHeading.split("&")[0]}& <br />
                    <span className="text-white">
                      {data.heroHeading.split("&")[1]}
                    </span>
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
                <Link
                  href="/booking"
                  className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300 w-48"
                >
                  <span className="text-center w-full">Get a Free Quote</span>
                </Link>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-8">
                    <Dumbbell className="h-5 w-5 mr-2 text-[#007BFF]" />
                    <span className="text-sm whitespace-nowrap">
                      {data.heroServiceDuration}
                    </span>
                  </div>

                  <div className="flex items-center text-white/90">
                    <Shield className="h-5 w-5 mr-2 text-[#007BFF]" />
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

      {/* Trust indicators section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">
                {data.trustIndicator1Number}
              </div>
              <p className="text-gray-600">{data.trustIndicator1Text}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">
                {data.trustIndicator2Number}
              </div>
              <p className="text-gray-600">{data.trustIndicator2Text}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">
                {data.trustIndicator3Number}
              </div>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              </div>
              <p className="text-gray-600">{data.trustIndicator3Text}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-black mb-2">
                {data.trustIndicator4Number}
              </div>
              <p className="text-gray-600">{data.trustIndicator4Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section with Zigzag Layout */}
      <section className="py-24 bg-white">
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
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846533/photo-1571902943202-507ec2618e8f_g98vlk.jpg"
                alt="Gym equipment cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.equipmentTitle}</h3>
              <p className="text-gray-600 mb-6">{data.equipmentDescription}</p>
              <ul className="space-y-3">
                {data.equipmentFeatures.map((feature, index) => (
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
              <h3 className="text-2xl font-bold mb-4">
                {data.lockerRoomsTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.lockerRoomsDescription}
              </p>
              <ul className="space-y-3">
                {data.lockerRoomsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846563/kiilto-wetroom-hygiene-concept-hygiene-in-locker-rooms-1300-x-650-px-1_c2ymkt.jpg"
                alt="Gym locker room cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846589/photo-1518611012118-696072aa579a_gp0qsn.jpg"
                alt="Gym studio cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.studioTitle}</h3>
              <p className="text-gray-600 mb-6">{data.studioDescription}</p>
              <ul className="space-y-3">
                {data.studioFeatures.map((feature, index) => (
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.whyChooseHeading}
            </h2>
            <p className="text-lg text-white/80">{data.whyChooseSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                {getIconComponent(data.feature1Icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.feature1Title}
              </h3>
              <p className="text-white/80">{data.feature1Description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                {getIconComponent(data.feature2Icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.feature2Title}
              </h3>
              <p className="text-white/80">{data.feature2Description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                {getIconComponent(data.feature3Icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {data.feature3Title}
              </h3>
              <p className="text-white/80">{data.feature3Description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Equipment Section - Unique to Gym Cleaning */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Specialized Equipment & Protocols
            </h2>
            <p className="text-lg text-gray-600">
              We use industry-leading equipment and follow strict protocols
              designed specifically for fitness facility cleaning and
              sanitization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Electrostatic Sprayers
              </h3>
              <p className="text-gray-600 text-sm">
                Advanced electrostatic technology ensures even coverage of
                disinfectant on all surfaces and equipment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Hospital-Grade Disinfectants
              </h3>
              <p className="text-gray-600 text-sm">
                EPA-approved disinfectants that eliminate 99.9% of bacteria,
                viruses, and fungi common in gym environments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">HEPA Filtration</h3>
              <p className="text-gray-600 text-sm">
                High-efficiency particulate air filters capture microscopic
                particles and allergens for cleaner air quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">UV-C Sanitization</h3>
              <p className="text-gray-600 text-sm">
                Ultraviolet-C light technology provides chemical-free
                sanitization of air and surfaces in sensitive areas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Health & Safety Standards - Unique to Gym Cleaning */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Health & Safety Standards
            </h2>
            <p className="text-lg text-gray-600">
              Our cleaning protocols are designed to meet and exceed health
              department standards for fitness facilities, ensuring a safe
              environment for your members.
                </p>
              </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://media.istockphoto.com/id/1344805054/vector/occupational-safety-and-health.jpg?s=612x612&w=0&k=20&c=d2byqWkPg-Vq86l3HTbbLZNf10GuenWG4EfHzVGFMas="
                alt="Health and safety protocols"
                width={600}
                height={400}
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
                Comprehensive Safety Protocols
                </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      CDC-Compliant Procedures
                    </h4>
                <p className="text-gray-600">
                      All cleaning procedures follow CDC guidelines for fitness
                      facilities, with special attention to high-touch surfaces
                      and shared equipment.
                </p>
              </div>
              </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Trained & Certified Staff
                    </h4>
                <p className="text-gray-600">
                      Our cleaning technicians are trained in proper
                      sanitization techniques and certified in bloodborne
                      pathogen safety protocols.
                    </p>
                  </div>
              </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Documentation & Reporting
                    </h4>
                <p className="text-gray-600">
                      Detailed cleaning logs and inspection reports provide
                      transparency and help maintain compliance with health
                      regulations.
                </p>
              </div>
            </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Learn more about our gym and fitness facility cleaning services.
            </p>

            <div className="space-y-8">
              {data?.faqs && data.faqs.length > 0 ? (
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
