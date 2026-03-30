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
  Building2,
  Briefcase,
  HandCoins,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface OtherCommercialCleaningData {
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

  // Restaurants & Food Service Section
  restaurantsTitle: string;
  restaurantsDescription: string;
  restaurantsImage: string;
  restaurantsFeatures: string[];

  // Warehouses & Industrial Spaces Section
  warehousesTitle: string;
  warehousesDescription: string;
  warehousesImage: string;
  warehousesFeatures: string[];

  // Places of Worship Section
  worshipTitle: string;
  worshipDescription: string;
  worshipImage: string;
  worshipFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Industry Expertise
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Custom Scheduling
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Value-Focused Solutions
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // Tailored Cleaning Plans & Pricing Section
  pricingHeading: string;
  pricingSubheading: string;
  pricingPlans: Array<{
    planName: string;
    planSubtitle: string;
    planPrice: string;
    planPriceUnit: string;
    planFeatures: string[];
    planButtonText: string;
    planButtonLink: string;
    isPopular: boolean;
    planColor: string;
  }>;
  pricingCustomSectionHeading: string;
  pricingCustomSectionDescription: string;
  pricingCustomButton1Text: string;
  pricingCustomButton1Link: string;
  pricingCustomButton2Text: string;
  pricingCustomButton2Link: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function OtherCommercialPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<OtherCommercialCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/other-commercial-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching other commercial cleaning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="h-8 w-8 text-[#007BFF]" />;
      case "Clock":
        return <Clock className="h-8 w-8 text-[#007BFF]" />;
      case "HandCoins":
        return <HandCoins className="h-8 w-8 text-[#007BFF]" />;
      default:
        return <Building2 className="h-8 w-8 text-[#007BFF]" />;
    }
  };

  const getPlanColorClasses = (color: string) => {
    switch (color) {
      case "blue-600":
        return {
          bg: "bg-blue-600",
          hover: "hover:bg-blue-700"
        };
      case "blue-700":
        return {
          bg: "bg-blue-700",
          hover: "hover:bg-blue-800"
        };
      case "indigo-600":
        return {
          bg: "bg-indigo-600",
          hover: "hover:bg-indigo-700"
        };
      case "purple-600":
        return {
          bg: "bg-purple-600",
          hover: "hover:bg-purple-700"
        };
      case "green-600":
        return {
          bg: "bg-green-600",
          hover: "hover:bg-green-700"
        };
      default:
        return {
          bg: "bg-blue-600",
          hover: "hover:bg-blue-700"
        };
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
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847158/image53_kdmkgy.png"
            alt="Modern commercial building interior"
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
                {data.heroHeading.includes("Commercial") ? (
                  <>
                    {data.heroHeading.split("Commercial")[0]}
                    <span className="text-white">Commercial</span>
                    {data.heroHeading.split("Commercial")[1]}
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
                    <Clock className="h-5 w-5 mr-2 text-[#007BFF]" />
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
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847199/restaurant-cleaning-services-london_qaonjw.jpg"
                alt="Restaurant dining area cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">
                {data.restaurantsTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {data.restaurantsDescription}
              </p>
              <ul className="space-y-3">
                {data.restaurantsFeatures.map((feature, index) => (
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
                {data.warehousesTitle}
              </h3>
              <p className="text-gray-600 mb-6">{data.warehousesDescription}</p>
              <ul className="space-y-3">
                {data.warehousesFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847223/photo-1586528116311-ad8dd3c8310d_h0y5hk.jpg"
                alt="Warehouse cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847250/20220103-quiapo-church-aa_qbucog.webp"
                alt="Church sanctuary cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.worshipTitle}</h3>
              <p className="text-gray-600 mb-6">{data.worshipDescription}</p>
              <ul className="space-y-3">
                {data.worshipFeatures.map((feature, index) => (
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

      {/* Custom Plans & Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.pricingHeading || "Tailored Cleaning Plans & Pricing"}
            </h2>
            <p className="text-lg text-gray-700">
              {data.pricingSubheading || "We understand that each commercial space has unique requirements. Our flexible packages are designed to provide exactly what your business needs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(data.pricingPlans || []).map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  plan.isPopular
                    ? "relative z-10 transform md:scale-105 shadow-xl hover:scale-110"
                    : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <div className={`${getPlanColorClasses(plan.planColor || 'blue-600').bg} py-6 px-6 text-white text-center`}>
                  <h3 className="text-xl font-bold">{plan.planName || "Service Plan"}</h3>
                  <p className="text-white/80 mt-1">{plan.planSubtitle || "For businesses"}</p>
                </div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.planPrice || "Custom"}</span>
                    <span className="text-gray-500 ml-2">{plan.planPriceUnit || "/ visit"}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {(plan.planFeatures || []).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <Link
                      href={plan.planButtonLink || "/contact"}
                      className={`inline-block ${getPlanColorClasses(plan.planColor || 'blue-600').bg} text-white px-6 py-3 rounded-full text-sm font-medium ${getPlanColorClasses(plan.planColor || 'blue-600').hover} transition-colors duration-300`}
                    >
                      {plan.planButtonText || "Get Quote"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {data.pricingCustomSectionHeading || "Need More Flexibility?"}
            </h3>
            <p className="text-center text-gray-700 mb-8">
              {data.pricingCustomSectionDescription || "We understand that every business has unique requirements. Contact us for a completely customized cleaning plan tailored to your specific needs, budget, and schedule."}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <Link
                href={data.pricingCustomButton1Link || "/contact"}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300"
              >
                {data.pricingCustomButton1Text || "Contact for Custom Quote"}
              </Link>
              <Link
                href={data.pricingCustomButton2Link || "/tel:+18005551234"}
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300"
              >
                {data.pricingCustomButton2Text || "Call (800) 555-1234"}
              </Link>
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
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/80">
              Discover why businesses across different industries trust us for
              their cleaning needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 flex-grow">
                "In the restaurant business, cleanliness isn't just about
                appearance—it's about food safety and customer confidence.
                Clensy understands this perfectly. Their team has been handling
                our after-hours cleaning for three years, and their attention to
                detail in our kitchen and dining areas has helped us maintain
                our perfect health inspection record."
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
                  <p className="font-semibold">Carlos Mendez</p>
                  <p className="text-white/60 text-sm">
                    Owner, Seaside Grill Restaurant
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 flex-grow">
                "Our worship center serves hundreds of people each week, and
                Clensy ensures our facility is always immaculate and welcoming.
                They're respectful of our sacred spaces and artifacts while
                providing thorough cleaning. Their flexibility in handling both
                our regular maintenance and special event cleanups has made them
                an invaluable partner to our ministry."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Reverend Sarah Williams</p>
                  <p className="text-white/60 text-sm">
                    Administrator, Grace Community Church
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-white/80 mb-6 flex-grow">
                "We hired Clensy to handle the specialized cleaning needs of our
                manufacturing facility, and they've exceeded our expectations.
                Their understanding of industrial cleaning requirements and
                attention to safety protocols has made our facility both cleaner
                and safer for our employees."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-lime-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Anita Kapur</p>
                  <p className="text-white/60 text-sm">
                    Operations Manager, PrecisionTech Industries
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
              Learn more about our specialized commercial cleaning services.
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
