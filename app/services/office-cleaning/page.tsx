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
  Building,
  Users,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface FAQItem {
  question: string;
  answer: string;
}

interface OfficeCleaningData {
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

  // Reception & Common Areas Section
  receptionTitle: string;
  receptionDescription: string;
  receptionImage: string;
  receptionFeatures: string[];

  // Workstations & Office Areas Section
  workstationsTitle: string;
  workstationsDescription: string;
  workstationsImage: string;
  workstationsFeatures: string[];

  // Meeting & Conference Rooms Section
  meetingRoomsTitle: string;
  meetingRoomsDescription: string;
  meetingRoomsImage: string;
  meetingRoomsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Trained Professionals
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Flexible Scheduling
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Eco-Friendly Practices
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;
  faqs?: FAQItem[];
}

export default function OfficeCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<OfficeCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/office-cleaning");
        const result = await response.json();
        if (result.success) {
          // Ensure faqs is always an array
          setData({
            ...result.data,
            faqs: Array.isArray(result.data.faqs) ? result.data.faqs : [],
          });
        }
      } catch (error) {
        console.error("Error fetching office cleaning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6 text-[#007BFF]" />;
      case "Clock":
        return <Clock className="h-6 w-6 text-[#007BFF]" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-[#007BFF]" />;
      default:
        return <Building className="h-6 w-6 text-[#007BFF]" />;
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
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845773/photo-1497215842964-222b430dc094_myg23r.jpg"
            alt="Modern clean office space"
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
                    <Building className="h-5 w-5 mr-2 text-[#007BFF]" />
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

          {/* Item 1 - Left image, right text - Reception & Common Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845829/reception-are-ideas-blog-webres_bdszbh.jpg"
                alt="Office reception area cleaning"
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
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Item 2 - Right image, left text - Workstations & Office Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {data.workstationsTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.workstationsDescription}
              </p>
              <ul className="space-y-3">
                {data.workstationsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845904/photo-1604328698692-f76ea9498e76_apywe7.jpg"
                alt="Office workspace cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text - Meeting & Conference Rooms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845940/Header_Veranstaltungen_K_C3_96_Desktopansicht___2__tngenb.png"
                alt="Meeting room cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">
                {data.meetingRoomsTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.meetingRoomsDescription}
              </p>
              <ul className="space-y-3">
                {data.meetingRoomsFeatures.map((feature, index) => (
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.whyChooseHeading}
            </h2>
            <p className="text-lg text-gray-600">{data.whyChooseSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                {getIconComponent(data.feature1Icon)}
              </div>
              <h3 className="text-xl font-bold mb-4">{data.feature1Title}</h3>
              <p className="text-gray-600">{data.feature1Description}</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                {getIconComponent(data.feature2Icon)}
              </div>
              <h3 className="text-xl font-bold mb-4">{data.feature2Title}</h3>
              <p className="text-gray-600">{data.feature2Description}</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                {getIconComponent(data.feature3Icon)}
              </div>
              <h3 className="text-xl font-bold mb-4">{data.feature3Title}</h3>
              <p className="text-gray-600">{data.feature3Description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Business Benefits of Professional Office Cleaning
            </h2>
            <p className="text-lg text-gray-600">
              Discover how our office cleaning services can positively impact
              your business operations and workplace culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Increased Productivity
              </h3>
              <p className="text-gray-600">
                A clean workspace reduces distractions and creates an
                environment where employees can focus on their tasks more
                effectively.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Professional Image</h3>
              <p className="text-gray-600">
                Maintain a professional appearance that impresses clients,
                partners, and potential employees who visit your office.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Employee Health</h3>
              <p className="text-gray-600">
                Regular professional cleaning reduces germs and allergens,
                leading to fewer sick days and healthier employees.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Time Savings</h3>
              <p className="text-gray-600">
                Let your employees focus on their core responsibilities instead
                of spending time on cleaning tasks.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Cost Effective</h3>
              <p className="text-gray-600">
                Professional cleaning extends the life of your office furniture,
                carpets, and equipment, saving money long-term.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Compliance</h3>
              <p className="text-gray-600">
                Meet health and safety regulations and maintain standards
                required for your industry and insurance policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Business Clients Say
            </h2>
            <p className="text-lg text-white/80">
              Hear from companies that trust us with their office cleaning
              needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 italic">
                "Clensy has been cleaning our corporate headquarters for over
                two years. Their attention to detail and reliability is
                exceptional. Our employees and clients always comment on how
                clean and professional our office looks."
              </p>
              <div className="flex items-center">
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
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-white/60 text-sm">
                    Operations Manager, TechCorp
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 italic">
                "The flexibility of Clensy's scheduling has been a game-changer
                for our business. They work around our hours and never disrupt
                our operations. The quality of their work is consistently
                excellent."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-white/60 text-sm">
                    Facility Director, Financial Services Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section (Dynamic, inline, like other pages) */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 text-center mb-12">
              Answers to common questions about our office cleaning services.
            </p>
            {Array.isArray(data.faqs) && data.faqs.length > 0 ? (
              <div className="space-y-8">
                {data.faqs.map((faq, idx) => (
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl" key={idx}>
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-white/80">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No FAQs available at this time.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <CTASection/>
      <Footer />
    </main>
  );
}
