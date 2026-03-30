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
  Heart,
  Stethoscope,
  Activity,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface MedicalCleaningData {
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

  // Reception & Waiting Areas Section
  receptionTitle: string;
  receptionDescription: string;
  receptionImage: string;
  receptionFeatures: string[];

  // Examination & Treatment Rooms Section
  examinationTitle: string;
  examinationDescription: string;
  examinationImage: string;
  examinationFeatures: string[];

  // Restrooms & Common Areas Section
  restroomsTitle: string;
  restroomsDescription: string;
  restroomsImage: string;
  restroomsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Healthcare Compliance
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Specialized Training
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Advanced Technology
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function MedicalCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<MedicalCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/medical-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching medical cleaning data:", error);
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
        return <Shield className="h-8 w-8 text-[#007BFF]" />;
      case "Heart":
        return <Heart className="h-8 w-8 text-[#007BFF]" />;
      case "Activity":
        return <Activity className="h-8 w-8 text-[#007BFF]" />;
      default:
        return <Shield className="h-8 w-8 text-[#007BFF]" />;
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
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846005/photo-1579684385127-1ef15d508118_pwceg2.jpg"
            alt="Clean medical facility hallway"
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
                    <Stethoscope className="h-5 w-5 mr-2 text-[#007BFF]" />
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
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846050/image6_ydkdec.png"
                alt="Medical reception and waiting areas"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.receptionTitle}</h3>
              <p className="text-gray-600 mb-6">{data.receptionDescription}</p>
              <ul className="space-y-3">
                {data.receptionFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
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
                {data.examinationTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.examinationDescription}
              </p>
              <ul className="space-y-3">
                {data.examinationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846159/shutterstock_2407190313_1_ekavzo.jpg"
                alt="Medical examination room"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846255/image12_oygjub.png"
                alt="Medical laboratory cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.restroomsTitle}</h3>
              <p className="text-gray-600 mb-6">{data.restroomsDescription}</p>
              <ul className="space-y-3">
                {data.restroomsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.whyChooseHeading}
            </h2>
            <p className="text-lg text-gray-600">{data.whyChooseSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                {getIconComponent(data.feature1Icon)}
              </div>
              <h3 className="text-xl font-bold mb-3">{data.feature1Title}</h3>
              <p className="text-gray-600">{data.feature1Description}</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                {getIconComponent(data.feature2Icon)}
              </div>
              <h3 className="text-xl font-bold mb-3">{data.feature2Title}</h3>
              <p className="text-gray-600">{data.feature2Description}</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                {getIconComponent(data.feature3Icon)}
              </div>
              <h3 className="text-xl font-bold mb-3">{data.feature3Title}</h3>
              <p className="text-gray-600">{data.feature3Description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/80">
              Hear from our satisfied healthcare clients about their experience
              with our medical facility cleaning service.
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
                "Clensy's understanding of healthcare facility cleaning is
                unmatched. They consistently maintain our clinic to the highest
                standards, giving our staff and patients confidence in our
                infection control practices."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Dr. Michael Chen</p>
                  <p className="text-white/60 text-sm">
                    Northside Medical Center
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
              <p className="text-white/80 mb-6 flex-grow">
                "Since partnering with Clensy, our infection control metrics
                have improved significantly. Their attention to detail in our
                operatories and sterilization areas has been exceptional. I
                appreciate their documentation and adherence to our protocols."
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
                  <p className="font-semibold">Sarah Johnson, RN</p>
                  <p className="text-white/60 text-sm">Eastside Dental Group</p>
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
                "Clensy provides the level of clean that our patients expect and
                deserve. Their cleaning technicians understand the unique
                requirements of medical environments, and their detailed
                cleaning protocols have helped us maintain a safe and sanitary
                facility for everyone."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Dr. Rebecca Taylor</p>
                  <p className="text-white/60 text-sm">
                    Westview Medical Associates
                  </p>
                </div>
              </div>
            </div>
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
              Learn more about our healthcare facility cleaning services.
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

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </main>
  );
}
