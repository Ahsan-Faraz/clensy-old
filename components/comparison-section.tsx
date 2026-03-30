"use client"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, ShieldCheck, Phone, Leaf, Users, UserCheck, Settings, Medal, Calendar, Sparkles } from "lucide-react"
import { formatText } from "@/lib/utils/formatText"

// Updated icon mapping with more relevant icons
const iconComponents = {
  users: Users,
  phone: Phone,
  "shield-check": ShieldCheck,
  leaf: Leaf,
  settings: Settings,
  medal: Medal,
  "user-check": UserCheck,
  calendar: Calendar,
  sparkles: Sparkles,
}

// Updated default data with reordered features and better icons
const defaultData = {
  heading: "The Clensy <blue>Difference</blue>",
  description:
    "We're leading the cleaning industry in customer satisfaction and service quality. Try Clensy and see why cleaning is a big deal to us.",
  features: [
    {
      name: "Locally Owned and Operated",
      clensy: true,
      others: true,
      icon: "users",
    },
    {
      name: "Customized Cleaning Packages",
      clensy: true,
      others: true,
      icon: "settings",
    },
    {
      name: "Easy Online Booking",
      clensy: true,
      others: false,
      icon: "calendar",
    },
    {
      name: "Over The Phone Estimates",
      clensy: true,
      others: false,
      icon: "phone",
    },
    {
      name: "Bonded and Insured",
      clensy: true,
      others: false,
      icon: "shield-check",
    },
    {
      name: "Eco-Friendly Supplies Included",
      clensy: true,
      others: false,
      icon: "leaf",
    },
    {
      name: "Background Checked Cleaners",
      clensy: true,
      others: false,
      icon: "user-check",
    },
    {
      name: "PRO Clean Promise",
      clensy: true,
      others: false,
      icon: "medal",
    },
    {
      name: "Premium Cleaning Supplies",
      clensy: true,
      others: false,
      icon: "sparkles",
    },
  ],
}

interface Feature {
  name: string
  clensy: boolean
  others: boolean
  icon: string
}

interface ComparisonData {
  heading: string
  description: string
  features: Feature[]
}

export default function ComparisonSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [isLoaded, setIsLoaded] = useState(false)
  const [comparisonData, setComparisonData] = useState<ComparisonData>(defaultData)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Fetch comparison data from API
  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await fetch("/api/cms/comparison")
        const result = await response.json()
        if (result.success && result.data) {
          setComparisonData({
            heading: result.data.heading || defaultData.heading,
            description: result.data.description || defaultData.description,
            features: result.data.features || defaultData.features,
          })
        }
      } catch (error) {
        console.error("Error fetching comparison data:", error)
        // Keep using default data on error
      } finally {
        setIsLoaded(true)
      }
    }

    fetchComparisonData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            {formatText(comparisonData.heading)}
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mt-4 text-center text-sm sm:text-base">
            {formatText(comparisonData.description)}
          </p>
          <div className="w-24 h-1 bg-[#007BFF] mx-auto mt-6"></div>
        </div>

        <div className="relative z-10">
          {/* Desktop View - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header Row integrated into table */}
            <div className="grid grid-cols-12 border-b border-gray-200">
              {/* Features Header */}
              <div className="col-span-6 py-4 px-8">
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide">Features</h3>
              </div>
              {/* Comparison Headers */}
              <div className="col-span-6 grid grid-cols-2">
                <div className="bg-[#007BFF] text-white py-4 text-center font-semibold tracking-wide">Clensy</div>
                <div className="bg-[#444b54] text-white py-4 text-center font-semibold tracking-wide">
                  Independent Maids
                </div>
              </div>
            </div>

            {/* Comparison rows */}
            {comparisonData.features.map((item, index) => {
              const IconComponent = iconComponents[item.icon as keyof typeof iconComponents] || Users
              return (
                <div
                  key={index}
                  className={`grid grid-cols-12 hover:bg-gray-50 transition-colors duration-200 ${
                    index !== comparisonData.features.length - 1 ? "border-b border-gray-100" : ""
                  } ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  {/* Feature Label */}
                  <div className="col-span-6 py-5 px-8 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } border border-gray-200 flex items-center justify-center mr-4`}
                    >
                      <IconComponent className="w-5 h-5 text-[#007BFF]" />
                    </div>
                    <span className="text-gray-800 font-medium">{item.name}</span>
                  </div>

                  {/* Checkmarks */}
                  <div className="col-span-6 grid grid-cols-2">
                    {/* Clensy checkmark */}
                    <div className="py-5 flex justify-center items-center">
                      <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    {/* Independent maids checkmark or empty */}
                    <div className="py-5 flex justify-center items-center">
                      {item.others ? (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">—</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile View - Hidden on desktop */}
          <div className="md:hidden">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Header Row */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="bg-[#007BFF] text-white py-3 text-center font-semibold text-sm">Clensy</div>
                <div className="bg-gray-400 text-white py-3 text-center font-semibold text-sm">Independent Maids</div>
              </div>

              {/* Features List */}
              <div className="divide-y divide-gray-100">
                {comparisonData.features.map((item, index) => {
                  const IconComponent = iconComponents[item.icon as keyof typeof iconComponents] || Users
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      {/* Feature Name Row */}
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            <IconComponent className="w-3 h-3 text-[#007BFF]" />
                          </div>
                          <span className="text-sm font-medium text-gray-800">{item.name}</span>
                        </div>
                      </div>

                      {/* Comparison Row */}
                      <div className="grid grid-cols-2">
                        {/* Clensy Column */}
                        <div className="py-4 flex justify-center items-center">
                          <div className="w-6 h-6 bg-[#007BFF] rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>

                        {/* Independent Maids Column */}
                        <div className="py-4 flex justify-center items-center border-l border-gray-100">
                          {item.others ? (
                            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-400 text-sm font-bold">×</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-4 text-white">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Medal className="w-4 h-4" />
                  <span className="font-bold text-base">Ready to Experience the Difference?</span>
                </div>
                <p className="text-blue-100 text-xs">Book your cleaning service today and see why Clensy stands out</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
