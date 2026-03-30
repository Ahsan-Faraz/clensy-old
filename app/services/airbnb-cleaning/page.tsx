"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Clock,
  Calendar,
  Sparkles,
  Heart,
  Users,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  ThumbsUp,
  Check,
  Shield,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";

interface AirbnbCleaningData {
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

  // Guest-Ready Bedrooms Section
  bedroomsTitle: string;
  bedroomsDescription: string;
  bedroomsImage: string;
  bedroomsFeatures: string[];

  // Spotless Bathrooms Section
  bathroomsTitle: string;
  bathroomsDescription: string;
  bathroomsImage: string;
  bathroomsFeatures: string[];

  // Kitchen Excellence Section
  kitchenTitle: string;
  kitchenDescription: string;
  kitchenImage: string;
  kitchenFeatures: string[];

  // Before & After Section
  beforeAfterHeading: string;
  beforeAfterSubheading: string;
  airBNBCleaningDifference: {
    heading: string;
    beforeImage: string;
    afterImage: string;
    caption: string;
  }[];

  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;

  // Benefit 1: Higher Ratings
  benefit1Title: string;
  benefit1Description: string;
  benefit1Icon: string;

  // Benefit 2: Efficient Turnovers
  benefit2Title: string;
  benefit2Description: string;
  benefit2Icon: string;

  // Benefit 3: Delighted Guests
  benefit3Title: string;
  benefit3Description: string;
  benefit3Icon: string;

  // Client Reviews Section
  clientReviewsHeading: string;
  clientReviewsSubheading: string;
  clientReviews: Array<{
    name: string;
    role: string;
    avatar: string;
    text: string;
    rating: number;
  }>;

  // Service Features Section
  serviceFeatures: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Success Stories Section
  successStoriesHeading: string;
  successStoriesSubheading: string;
  successStories: Array<{
    title: string;
    description: string;
    metric: string;
    hostName: string;
    hostTitle: string;
    avatarColor: string;
  }>;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function AirbnbCleaningPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [data, setData] = useState<AirbnbCleaningData | null>(null);
  const [loading, setLoading] = useState(true);

  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-100px" });

  // Use dynamic reviews from CMS data
  const reviews = data?.clientReviews || [];

  // Use dynamic service features from CMS data
  const serviceFeatures = data?.serviceFeatures || [];

  // Icon mapping for dynamic features
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Clock,
      Star,
      Calendar,
      Heart,
      Check,
      Shield,
      ArrowRight,
    };
    return iconMap[iconName] || Check;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/airbnb-cleaning");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching airbnb cleaning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsLoaded(true);

    // Auto-rotate reviews
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
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
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750844626/image4_lfilgx.png"
            alt="Pristine Airbnb living room"
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
                {data.heroHeading.includes("Ratings") ? (
                  <>
                    {data.heroHeading.split("Ratings")[0]}
                    <span className="text-blue-300">Ratings</span>
                    {data.heroHeading.split("Ratings")[1]}
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
                  href="/contact"
                  className="bg-white text-blue-900 hover:bg-white/90 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300 w-48"
                >
                  <span className="text-center w-full">Schedule Cleaning</span>
                </Link>

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

          {/* Item 1 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src={data.bedroomsImage}
                // src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750844704/photo-1592928302636-c83cf1e1c887_dbjfmb.jpg"
                alt="Guest-ready bedroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4">{data.bedroomsTitle}</h3>
              <p className="text-gray-600 mb-6">{data.bedroomsDescription}</p>
              <ul className="space-y-3">
                {data.bedroomsFeatures.map((feature, index) => (
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
              <h3 className="text-2xl font-bold mb-4">{data.bathroomsTitle}</h3>
              <p className="text-gray-600 mb-6">{data.bathroomsDescription}</p>
              <ul className="space-y-3">
                {data.bathroomsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={data.bathroomsImage}
                // src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750844754/Ibiza1432B_masterbath.jpg_jqa7sk.jpg"
                alt="Pristine bathroom"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Item 3 - Left image, right text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src={data.kitchenImage}
                // src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750844849/image46_ymaai0.png"
                alt="Modern kitchen"
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
        </div>
      </section>

      {/* Before & After Section */}
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
                      src={data.airBNBCleaningDifference[0].beforeImage}
                      alt="Before cleaning - messy bedroom"
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
                      src={data.airBNBCleaningDifference[0].afterImage}
                      alt="After cleaning - pristine bedroom"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-blue-600/70 text-white px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {data.airBNBCleaningDifference[0].heading}
              </h3>
              <p className="text-gray-600">
                {data.airBNBCleaningDifference[0].caption}
              </p>
            </div>

            {/* Before & After 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={data.airBNBCleaningDifference[1].beforeImage}
                      alt="Before cleaning - messy kitchen"
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
                      src={data.airBNBCleaningDifference[1].afterImage}
                      alt="After cleaning - spotless kitchen"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-blue-600/70 text-white px-3 py-1 text-sm">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{data.airBNBCleaningDifference[1].heading}</h3>
              <p className="text-gray-600">
                {data.airBNBCleaningDifference[1].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section - Following Deep Cleaning layout */}
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
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
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
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
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
              <div className="bg-blue-600/20 rounded-full w-14 h-14 flex items-center justify-center mb-6">
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

      {/* Host Success Stories - Unique to Airbnb */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Host Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how our specialized Airbnb cleaning services have transformed
              hosting experiences and helped boost ratings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  Rating increased by 1.2 stars
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Downtown Loft</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                "After switching to Clensy, my cleanliness ratings went from 4.2
                to 4.9. Guests now regularly mention how spotless the apartment
                is."
              </p>
              <div className="flex items-center pt-4 border-t border-gray-100 mt-auto">
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Rachel</p>
                  <p className="text-gray-500 text-sm">Superhost since 2019</p>
                </div>
              </div>
            </motion.div>

            {/* Success Story 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  Bookings up 40%
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Beachfront Villa</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                "Clensy's reliability means I can accept more last-minute
                bookings. Their quick turnovers and attention to detail have
                helped me become a Superhost."
              </p>
              <div className="flex items-center pt-4 border-t border-gray-100 mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">David</p>
                  <p className="text-gray-500 text-sm">Property Manager</p>
                </div>
              </div>
            </motion.div>

            {/* Success Story 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  Revenue increased by 25%
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Mountain Retreat</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                "With Clensy handling the cleaning, I've been able to raise my
                nightly rates. The quality of cleaning justifies the premium
                price, and guests are happy to pay it."
              </p>
              <div className="flex items-center pt-4 border-t border-gray-100 mt-auto">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Sarah</p>
                  <p className="text-gray-500 text-sm">Host since 2017</p>
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
              Common questions about our Airbnb cleaning services.
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
