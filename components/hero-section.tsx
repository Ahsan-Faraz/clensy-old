"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { formatText } from "@/lib/utils/formatText"


// Default data in case the API call fails
const defaultHeroData = {
  topLabel: "Professional Cleaning Services",
  heading: "Professional cleaning for your home",
  subheading: "We make it easy to get your home cleaned. Professional cleaning services tailored to your needs.",
  buttonText: "See my price",
  feature1: "30-second pricing",
  feature2: "100% Satisfaction guaranteed",
  backgroundImage:
    "https://res.cloudinary.com/dgjmm3usy/image/upload/v1751356490/shutterstock_2392393465__3_.jpg-0LMVCo8sUiQDVXDeUykdUtzKRTrvHa_qkbjiu.jpg",
}

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [heroData, setHeroData] = useState(defaultHeroData)


  useEffect(() => {
    // Load hero data from API
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/cms/hero")
        const result = await response.json()

        // Add debugging
        console.log("API Response:", result)

        if (result.success && result.data) {
          // Only update fields that exist and are not empty
          setHeroData((prevData) => ({
            topLabel: result.data.topLabel || prevData.topLabel,
            heading: result.data.heading || prevData.heading,
            subheading: result.data.subheading || prevData.subheading,
            buttonText: result.data.buttonText || prevData.buttonText,
            feature1: result.data.feature1 || prevData.feature1,
            feature2: result.data.feature2 || prevData.feature2,
            // Keep the existing backgroundImage if the API doesn't provide one
            backgroundImage:
              result.data.backgroundImage && result.data.backgroundImage.trim() !== ""
                ? result.data.backgroundImage
                : prevData.backgroundImage,
          }))
        }
      } catch (error) {
        console.error("Error fetching hero data:", error)
        // Keep using default data on error
      } finally {
        setIsLoaded(true)
      }
    }

    fetchHeroData()
  }, [])

  // Don't render until we have loaded the data to prevent flickering
  if (!isLoaded) {
    return (
      <section className="relative min-h-screen pt-16 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </section>
    )
  }

  return (
    <>
      <section className="relative min-h-screen pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroData.backgroundImage || "/placeholder.svg"}
            alt="Clean modern kitchen"
            fill
            className="object-cover opacity-70"
            priority
            unoptimized // Add this if you're having issues with external images
            onError={(e) => {
              console.error("Image failed to load:", heroData.backgroundImage)
              // Fallback to default image on error
              const target = e.target as HTMLImageElement
              target.src = defaultHeroData.backgroundImage
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)]">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full"
              >
                <span className="text-white/90 text-sm font-medium">{formatText(heroData.topLabel)}</span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 hero-text-shadow">
                {formatText(heroData.heading)}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg text-white/80 mb-8 max-w-xl"
              >
                {formatText(heroData.subheading)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/booking/"
                  className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300 w-48"
                >
                  <span className="text-center w-full">{heroData.buttonText}</span>
                </Link>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-4">
                    <Check className="h-5 w-5 mr-2 text-[#28A745]" />
                    <span className="text-sm whitespace-nowrap">{heroData.feature1}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Check className="h-5 w-5 mr-2 text-[#28A745]" />
                    <span className="text-sm whitespace-nowrap">{heroData.feature2}</span>
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
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>


    </>
  )
}
