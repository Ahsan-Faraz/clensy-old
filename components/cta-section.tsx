"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Calendar } from "lucide-react";
import { formatText } from "@/lib/utils/formatText";


// Default data in case the API call fails
const defaultData = {
  heading: "Home cleaning you can trust",
  description:
    "Book our professional cleaning services today and experience the difference.",
  leftCard: {
    title: "Order online",
    description:
      "Our easy online pricing lets you set up a cleaning plan right now.",
    buttonText: "See my price",
  },
  rightCard: {
    title: "Call us now",
    description:
      "Need more information? Prefer a friendly voice over the phone?",
    buttonText: "(123) 456-7890",
  },
};

interface CTAData {
  heading: string;
  description: string;
  leftCard: {
    title: string;
    description: string;
    buttonText: string;
  };
  rightCard: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export default function CTASection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const [ctaData, setCTAData] = useState<CTAData>(defaultData);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Fetch CTA data from API
  useEffect(() => {
    const fetchCTAData = async () => {
      try {
        const response = await fetch("/api/cms/cta");
        const result = await response.json();
        
        if (result.success && result.data) {
          setCTAData({
            heading: result.data.heading || defaultData.heading,
            description: result.data.description || defaultData.description,
            leftCard: {
              title: result.data.leftCard?.title || defaultData.leftCard.title,
              description:
                result.data.leftCard?.description ||
                defaultData.leftCard.description,
              buttonText:
                result.data.leftCard?.buttonText ||
                defaultData.leftCard.buttonText,
            },
            rightCard: {
              title:
                result.data.rightCard?.title || defaultData.rightCard.title,
              description:
                result.data.rightCard?.description ||
                defaultData.rightCard.description,
              buttonText:
                result.data.rightCard?.buttonText ||
                defaultData.rightCard.buttonText,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching CTA data:", error);
        // Keep using default data on error
      } finally {
        setIsLoaded(true);
      }
    };

    fetchCTAData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
    <section ref={ref} className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-800"
          >
            {formatText(ctaData.heading)}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            {formatText(ctaData.description)}
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {formatText(ctaData.leftCard.title)}
              </h3>
              <p className="text-gray-600 mb-6">
                {formatText(ctaData.leftCard.description)}
              </p>
              <Link
                href="/booking/"
                className="bg-[#007BFF] text-white hover:bg-[#0069D9] px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors duration-300"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {ctaData.leftCard.buttonText}
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {formatText(ctaData.rightCard.title)}
              </h3>
              <p className="text-gray-600 mb-6">
                {formatText(ctaData.rightCard.description)}
              </p>
              <a
                href="tel:(551) 305-4081"
                className="bg-[#007BFF] text-white hover:bg-[#0069D9] px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors duration-300"
              >
                <Phone className="h-4 w-4 mr-2" />
                {ctaData.rightCard.buttonText}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    </>
  );
}
