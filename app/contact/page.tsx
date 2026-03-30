"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, CheckCircle, Calendar, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { formatText } from "@/lib/utils/formatText"
import ContactModal from "@/components/ContactModal"
// Default data in case the API call fails
const defaultContactData = {
  heroSection: {
    topLabel: "We'd Love To Hear From You",
    heading: "Let's Start A <blue>Conversation</blue>",
    description:
      "Have questions or need a personalized cleaning solution? Our team is ready to provide the support you need for all your requirements.",
    sendMessageButtonText: "Send a Message",
    supportText: "24/7 Support",
    responseText: "Quick Response",
  },
  trustSection: {
    mainText: "Trusted by 5,000+ Customers",
    subtitle: "Professional cleaning for every need",
    serviceTags: [{ name: "Residential" }, { name: "Commercial" }, { name: "Specialized" }],
  },
  statsSection: {
    indicators: [
      {
        number: "24/7",
        description: "Customer Support",
      },
      {
        number: "1h",
        description: "Response Time",
      },
      {
        number: "4.9",
        description: "Customer Rating",
      },
      {
        number: "100%",
        description: "Satisfaction Guarantee",
      },
    ],
  },
  contactInformation: {
    sectionTitle: "Contact Information",
    phone: {
      title: "Phone",
      description: "Speak directly with our customer service team",
      phoneNumber: "(123) 456-7890",
    },
    email: {
      title: "Email",
      description: "Get a response within 24 hours",
      emailAddress: "info@clensy.com",
    },
    officeLocation: {
      title: "Office Location",
      description: "Our headquarters",
      addressLine1: "123 Cleaning Street",
      addressLine2: "Suite 456",
      cityStateZip: "Jersey City, NJ 07302",
    },
    businessHours: {
      title: "Business Hours",
      description: "When you can reach us",
      hours: [
        {
          day: "Monday - Friday",
          hours: "8:00 AM - 6:00 PM",
        },
        {
          day: "Saturday",
          hours: "9:00 AM - 3:00 PM",
        },
        {
          day: "Sunday",
          hours: "Closed",
        },
      ],
    },
    immediateAssistance: {
      title: "Need Immediate Assistance?",
      description: "Our customer support team is available during business hours to help you with any questions.",
      buttonText: "Call Us Now",
    },
  },
  consultationSection: {
    heading: "Need a Personalized Cleaning Solution?",
    description:
      "Schedule a consultation with our cleaning experts to discuss your unique requirements and get a customized cleaning plan tailored to your specific needs.",
    buttonText: "Schedule a Consultation",
  },
}

interface ContactData {
  heroSection: {
    topLabel: string
    heading: string
    description: string
    sendMessageButtonText: string
    supportText: string
    responseText: string
    image?: string
  }
  trustSection: {
    mainText: string
    subtitle: string
    serviceTags: { name: string }[]
  }
  statsSection: {
    indicators: { number: string; description: string }[]
  }
  contactInformation: {
    sectionTitle: string
    phone: {
      title: string
      description: string
      phoneNumber: string
    }
    email: {
      title: string
      description: string
      emailAddress: string
    }
    officeLocation: {
      title: string
      description: string
      addressLine1: string
      addressLine2: string
      cityStateZip: string
    }
    businessHours: {
      title: string
      description: string
      hours: { day: string; hours: string }[]
    }
    immediateAssistance: {
      title: string
      description: string
      buttonText: string
    }
  }
  consultationSection: {
    heading: string
    description: string
    buttonText: string
  }
}

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [contactData, setContactData] = useState<ContactData>(defaultContactData)
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  // Fetch contact data from API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("/api/cms/contact")
        const result = await response.json()

        if (result.success && result.data) {
          setContactData({
            heroSection: result.data.heroSection || defaultContactData.heroSection,
            trustSection: result.data.trustSection || defaultContactData.trustSection,
            statsSection: result.data.statsSection || defaultContactData.statsSection,
            contactInformation: result.data.contactInformation || defaultContactData.contactInformation,
            consultationSection: result.data.consultationSection || defaultContactData.consultationSection,
          })
        }
      } catch (error) {
        console.error("Error fetching contact data:", error)
        // Keep using default data on error
      } finally {
        setIsLoaded(true)
      }
    }

    fetchContactData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    }, 1000)
  }

  // Animation variants
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
    <main className="overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black pt-16 overflow-hidden">
        {/* Background gradient and decorative elements */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px] -z-10"></div>
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px] -z-10"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

        {/* Accent lines */}
        <div className="absolute top-20 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-20 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-64px)]">
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
                className="inline-block mb-6 px-4 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
              >
                <span className="text-white/90 text-sm font-medium">
                  {formatText(contactData.heroSection.topLabel)}
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 hero-text-shadow">
                {formatText(contactData.heroSection.heading)}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg text-white/80 mb-8 max-w-xl"
              >
                {formatText(contactData.heroSection.description)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="#form"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  <span className="text-center w-full">{contactData.heroSection.sendMessageButtonText}</span>
                </Link>

                <div className="flex items-center sm:mt-0 mt-4">
                  <div className="flex items-center text-white/90 mr-8">
                    <Phone className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="text-sm whitespace-nowrap">{contactData.heroSection.supportText}</span>
                  </div>

                  <div className="flex items-center text-white/90">
                    <Clock className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="text-sm whitespace-nowrap">{contactData.heroSection.responseText}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block"
            >
              <div className="relative h-[550px] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10">
                {/* Multiple layered images for depth effect */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src={contactData.heroSection.image || "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847694/shutterstock_2478230727_bt7fos.jpg"}
                    alt="Professional cleaning staff"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 via-transparent to-transparent"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 h-72 w-72 bg-blue-600 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 z-0"></div>
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-400 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3 z-0"></div>

                {/* Foreground content */}
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <div className="flex items-center mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 mr-3">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{contactData.trustSection.mainText}</h3>
                        <p className="text-white/70 text-sm">{contactData.trustSection.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      {contactData.trustSection.serviceTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-blue-600/20 px-3 py-1 text-xs text-white"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Trust indicators section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {contactData.statsSection.indicators.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-black mb-2">{stat.number}</div>
                {stat.number === "4.9" && (
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                  </div>
                )}
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Information Section */}
      <section className="py-24 bg-gray-50" id="form">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form Column - NOT EDITABLE */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="bg-white/20 p-3 rounded-full mr-4">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Send Us a Message</h2>
                          <p className="text-blue-100">We're here to help you</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {formStatus === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                        >
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                        <p className="text-gray-600 mb-6 text-lg">
                          Thank you for reaching out. Our team will get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => setFormStatus(null)}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <div className="space-y-6">
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Quick Response</p>
                              <p className="text-sm text-gray-600">Within 1 hour</p>
                            </div>
                          </div>

                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Free Consultation</p>
                              <p className="text-sm text-gray-600">No obligation</p>
                            </div>
                          </div>
                        </div>

                        {/* Main CTA */}
                        <div className="text-center">
                          <p className="text-gray-600 mb-6">
                            Ready to get started? Fill out our quick form and we'll get back to you with a personalized
                            solution.
                          </p>

                          <motion.button
                            onClick={() => setIsContactModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                          >
                            <Mail className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                            {contactData.heroSection.sendMessageButtonText}
                          </motion.button>
                        </div>

                        {/* Alternative Contact Methods */}
                        <div className="border-t pt-6 mt-6">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a
                              href={`tel:${contactData.contactInformation.phone.phoneNumber}`}
                              className="flex-1 flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                            >
                              <Phone className="h-4 w-4 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-medium text-gray-700">Call Us</span>
                            </a>

                            <a
                              href={`mailto:${contactData.contactInformation.email.emailAddress}`}
                              className="flex-1 flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                            >
                              <Mail className="h-4 w-4 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-medium text-gray-700">Email Us</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
              </motion.div>

              {/* Information Column - EDITABLE */}
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 text-gray-900">
                  {formatText(contactData.contactInformation.sectionTitle)}
                </motion.h2>

                <div className="space-y-6">
                  {/* Contact Cards */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="bg-white p-6 rounded-xl shadow-md flex items-start transition-all duration-300"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {formatText(contactData.contactInformation.phone.title)}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {formatText(contactData.contactInformation.phone.description)}
                      </p>
                      <a
                        href={`tel:${contactData.contactInformation.phone.phoneNumber}`}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        {contactData.contactInformation.phone.phoneNumber}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="bg-white p-6 rounded-xl shadow-md flex items-start transition-all duration-300"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{contactData.contactInformation.email.title}</h3>
                      <p className="text-gray-600 mb-2">{contactData.contactInformation.email.description}</p>
                      <a
                        href={`mailto:${contactData.contactInformation.email.emailAddress}`}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        {contactData.contactInformation.email.emailAddress}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="bg-white p-6 rounded-xl shadow-md flex items-start transition-all duration-300"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {contactData.contactInformation.officeLocation.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{contactData.contactInformation.officeLocation.description}</p>
                      <address className="not-italic text-gray-700">
                        {contactData.contactInformation.officeLocation.addressLine1}
                        <br />
                        {contactData.contactInformation.officeLocation.addressLine2}
                        <br />
                        {contactData.contactInformation.officeLocation.cityStateZip}
                      </address>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="bg-white p-6 rounded-xl shadow-md flex items-start transition-all duration-300"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {contactData.contactInformation.businessHours.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{contactData.contactInformation.businessHours.description}</p>
                      <ul className="space-y-1 text-gray-700">
                        {contactData.contactInformation.businessHours.hours.map((hour, index) => (
                          <li key={index}>
                            {hour.day}: {hour.hours}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-xl"
                >
                  <h3 className="font-bold text-xl mb-3">{contactData.contactInformation.immediateAssistance.title}</h3>
                  <p className="text-white/90 mb-4">{contactData.contactInformation.immediateAssistance.description}</p>
                  <Link
                    href={`tel:${contactData.contactInformation.phone.phoneNumber}`}
                    className="inline-flex items-center bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {contactData.contactInformation.immediateAssistance.buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule a Consultation Section */}
      <section className="py-24 bg-[#1a2542] text-white relative overflow-hidden">
        {/* Add a subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/20 filter blur-[100px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-10 relative"
            >
              <div className="absolute inset-0 rounded-full bg-blue-600 opacity-80 blur-md"></div>
              <div className="relative bg-blue-600 p-5 rounded-full">
                <Calendar className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-bold mb-6"
            >
              {contactData.consultationSection.heading}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {contactData.consultationSection.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#form"
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-lg text-lg font-medium transition-all shadow-xl hover:shadow-2xl"
              >
                {contactData.consultationSection.buttonText}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Contact Us" />
    </main>
  )
}
