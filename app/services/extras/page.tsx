"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Sparkles,
  Calendar,
  Plus,
  DollarSign,
  Timer,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Shirt,
  Utensils,
  Droplets,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface ExtrasServiceData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // Trust Indicators Section
  trustIndicatorsHeading: string;
  trustIndicator1Number: string;
  trustIndicator1Text: string;
  trustIndicator2Number: string;
  trustIndicator2Text: string;
  trustIndicator3Number: string;
  trustIndicator3Text: string;
  trustIndicator4Number: string;
  trustIndicator4Text: string;

  // Premium Extra Services Section
  extrasHeading: string;
  extrasSubheading: string;
  premiumExtraServices: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    icon: string;
    features: string[];
  }>;

  // How To Add Extra Services Section
  howItWorksHeading: string;
  howItWorksSubheading: string;
  howToAddExtraServicesSteps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    badge: string;
    icon: string;
  }>;

  // Extras Pricing Section
  pricingHeading: string;
  pricingSubheading: string;
  extrasPricing: Array<{
    serviceId: string;
    serviceName: string;
    price: string;
    priceUnit: string;
    icon: string;
    features: string[];
  }>;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ExtrasPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeExtra, setActiveExtra] = useState("windows");
  const [data, setData] = useState<ExtrasServiceData | null>(null);
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
        const response = await fetch("/api/cms/extras-service");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching extras service data:", error);
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

  // Use dynamic extras from CMS data
  const extras = data?.premiumExtraServices || [];

  // Icon mapping for dynamic extras
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Sparkles,
      Plus,
      FolderOpen,
      Shirt,
      Droplets,
      Utensils,
      Check,
      Shield,
      ArrowRight,
    };
    return iconMap[iconName] || Plus;
  };

  return (
    <main className="overflow-x-hidden">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .device-mockup {
          position: relative;
          width: 320px;
          height: 640px;
        }

        .device-mockup.phone {
          background: #000000;
          border-radius: 20px;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .device-mockup .screen {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 640px) {
          .device-mockup {
            width: 280px;
            height: 560px;
          }
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] bg-black pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845101/ai-generated-minimalist-vivid-advertisment-spring-cleaning-background-with-copy-space-free-photo_mklbfv.jpg"
            alt="A clean home with extras services"
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
                className="inline-block mb-6 px-6 py-2 bg-blue-600 rounded-lg"
              >
                <span className="text-white font-semibold text-sm uppercase tracking-wider">
                  {data.heroTopLabel}
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 hero-text-shadow">
                {data.heroHeading.includes("Services") ? (
                  <>
                    {data.heroHeading.split("Services")[0]}
                    <span className="text-blue-500">Services</span>
                    {data.heroHeading.split("Services")[1]}
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
                <div className="bg-blue-100 text-blue-700 px-8 py-3 rounded-lg text-sm font-medium inline-flex items-center justify-center w-48 cursor-default select-none">
                  Customizable Extras
                </div>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-8">
                    <Clock className="h-5 w-5 mr-2 text-blue-300" />
                    <span className="text-sm whitespace-nowrap">
                      {data.heroServiceDuration}
                    </span>
                  </div>

                  <div className="flex items-center text-white/90">
                    <Shield className="h-5 w-5 mr-2 text-blue-300" />
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

      {/* Interactive Extras Section - UNIQUE SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.extrasHeading}
            </h2>
            <p className="text-lg text-gray-600">{data.extrasSubheading}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
            {extras.map((extra) => (
              <motion.div
                key={extra.id}
                whileHover={{ y: -5 }}
                className={`rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  activeExtra === extra.id
                    ? "bg-blue-100 border-l-4 border-blue-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => setActiveExtra(extra.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full ${
                      activeExtra === extra.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    } mr-3`}
                  >
                    {React.createElement(getIconComponent(extra.icon), {
                      className: "h-5 w-5",
                    })}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{extra.name}</h3>
                    <p className="text-xs text-gray-500">{extra.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic content based on selection */}
          {extras.map((extra) => (
            <div
              key={extra.id}
              className={`${activeExtra === extra.id ? "block" : "hidden"}`}
            >
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-[400px]">
                    <Image
                      src={extra.image}
                      alt={extra.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{extra.name}</h3>
                    <p className="text-gray-600 mb-6">{extra.description}</p>
                    <ul className="space-y-3">
                      {extra.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link
                        href="/booking"
                        className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-all duration-300"
                      >
                        Add This Service <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Phone Mockup */}
            <div className="relative mx-auto">
              <div className="device-mockup phone mx-auto">
                <div className="screen">
                  {/* Header */}
                  <div className="bg-black text-white p-4">
                    <h4 className="text-center font-medium">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clensy-3YxRqAp8bxVkkiFlQmcTlgTeLxuJ4t.png"
                        alt="Clensy Logo"
                        width={80}
                        height={30}
                        className="mx-auto brightness-0 invert"
                      />
                    </h4>
                  </div>

                  {/* App Content */}
                  <div className="p-6">
                    <h5 className="text-lg font-medium mb-6">
                      Add Extra Services
                    </h5>

                    <div className="space-y-6 mb-8">
                      {/* Window Cleaning */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            Window Cleaning
                          </div>
                          <div className="text-sm text-gray-500">
                            $5 per window
                          </div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                          <Plus className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>

                      {/* Refrigerator Cleaning - Selected */}
                      <div className="border-2 border-blue-500 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              Refrigerator Cleaning
                            </div>
                            <div className="text-sm text-gray-500">
                              $35 per service
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Oven Cleaning */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            Oven Cleaning
                          </div>
                          <div className="text-sm text-gray-500">
                            $35 per service
                          </div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                          <Plus className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>

                      {/* Laundry Service */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            Laundry Service
                          </div>
                          <div className="text-sm text-gray-500">
                            $20 per service
                          </div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                          <Plus className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button className="w-full bg-black text-white py-3 rounded-lg font-medium">
                      Continue Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Process Steps */}
            <div className="space-y-8">
              {data.howToAddExtraServicesSteps.map((step, index) => (
                <div key={index} className="step-indicator">
                  <div className="step-number">{step.stepNumber}</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center text-sm text-gray-600">
                        {React.createElement(getIconComponent(step.icon), {
                          className: "h-4 w-4 text-blue-600 mr-2",
                        })}
                        <span>{step.badge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.pricingHeading}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {data.pricingSubheading}
            </p>
            <div className="flex justify-center items-center text-sm text-gray-500">
              <ArrowRight className="h-4 w-4 animate-pulse mr-2" />
              <span>Scroll horizontally to see more pricing options</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Left Navigation Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow-lg z-20 hover:bg-blue-700 transition-all"
              onClick={() => {
                const container = document.querySelector(".scrollbar-hide");
                if (container) {
                  container.scrollBy({ left: -300, behavior: "smooth" });
                }
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Navigation Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow-lg z-20 hover:bg-blue-700 transition-all"
              onClick={() => {
                const container = document.querySelector(".scrollbar-hide");
                if (container) {
                  container.scrollBy({ left: 300, behavior: "smooth" });
                }
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex overflow-x-auto py-8 px-4 -mx-4 scrollbar-hide">
              <div className="flex gap-6 px-4">
                {/* Dynamic Pricing Cards */}
                {data.extrasPricing.map((service, index) => (
                  <motion.div
                    key={service.serviceId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex-shrink-0 w-80"
                    whileHover={{
                      y: -10,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{service.serviceName}</h3>
                    </div>
                    <div className="flex items-center mb-6">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-3xl font-bold">{service.price}</span>
                      <span className="text-gray-500 ml-2">{service.priceUnit}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/booking"
                      className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 w-full"
                    >
                      Add To Booking
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/80">
              Hear from clients who have enhanced their cleaning experience with
              our extra services.
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
                "I added window cleaning to my regular service and the
                difference is incredible. The natural light in my home is so
                much better with crystal clear windows!"
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Amanda Peterson</p>
                  <p className="text-white/60 text-sm">
                    Window Cleaning Client
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
                "The oven cleaning service is worth every penny. My oven looked
                brand new after years of built-up grease. I didn't even know it
                could look that clean again!"
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
                  <p className="font-semibold">David Richards</p>
                  <p className="text-white/60 text-sm">Oven Cleaning Client</p>
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
                "Having my refrigerator completely emptied, cleaned, and
                reorganized was amazing. It's so much more efficient now and I
                can find everything!"
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500 flex items-center justify-center mr-4">
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
                  <p className="font-semibold">Jennifer Liu</p>
                  <p className="text-white/60 text-sm">
                    Refrigerator Cleaning Client
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
              Common questions about our extra cleaning services.
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
