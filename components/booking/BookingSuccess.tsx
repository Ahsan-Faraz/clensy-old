"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Star,
  Download,
  Home,
  CreditCard,
  Users,
  Sparkles,
} from "lucide-react"
import type { BookingData } from "../../types/booking"

interface BookingSuccessProps {
  formData: BookingData
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ formData }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8"
      >
        {/* Success Header */}
        <motion.div variants={itemVariants} className="text-center">
         

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 bg-gradient-to-r from-zinc-800 to-zinc-950 bg-clip-text text-transparent">
              Booking Confirmed!
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-2">
              Thank you, <span className="font-semibold text-zinc-800">{formData.lead.firstName}</span>!
            </p>
            <p className="text-base sm:text-lg text-slate-500">Your cleaning service has been successfully booked and confirmed.</p>
          </motion.div>

          {/* Celebration Animation */}
          
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-950 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Booking Details</h2>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wide">Service Date</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1">
                      {formData.selectedDate &&
                        new Date(formData.selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
                  </div>
                </div>

                {formData.selectedTime && (
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-800" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wide">Service Time</p>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1">{formData.selectedTime}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-800" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1">{formData.lead.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-800" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wide">Phone</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1">{formData.lead.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Address */}
            <div className="pt-4 sm:pt-6 border-t border-slate-200">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-800" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wide">Service Address</p>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 mt-1">
                    <p>{formData.lead.address.street}</p>
                    <p>
                      {formData.lead.address.city}, {formData.lead.address.state} {formData.lead.address.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Price Summary */}
        {formData.quote && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl"
          >
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-zinc-800" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Payment Summary</h2>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-800 mb-2">
                  ${formData.quote.priceCalculation.total.toFixed(2)}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Payment: {formData.paymentMethod}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>{formData.quote.priceCalculation.frequencyName}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* What's Next Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-zinc-50 to-zinc-100 border-2 border-zinc-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-800" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">What's Next?</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                step: 1,
                title: "Confirmation Email",
                description:
                  "You’ll receive a detailed confirmation email with all booking information within the next few minutes.",
                icon: Mail,
                color: "bg-zinc-700",
              },
              {
                step: 2,
                title: "Reminder & Arrival Window Update",
                description:
                  " You’ll receive a text and email reminder 24 hours before your cleaning — including your team’s estimated arrival window and any important notes about your service.",
                icon: Phone,
                color: "bg-zinc-800",
              },
              {
                step: 3,
                title: "Service Day",
                description:
                  "Our professional cleaning team will arrive at your scheduled time with all necessary equipment and supplies, ready to make your home shine.",
                icon: Users,
                color: "bg-zinc-950",
              },
            ].map((item, index) => (
                             <motion.div
                 key={index}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.8 + index * 0.1 }}
                 className="flex items-start space-x-3 sm:space-x-4"
               >
                 <div
                   className={`w-8 h-8 sm:w-10 sm:h-10 ${item.color} text-white rounded-full flex items-center justify-center text-sm sm:text-lg font-bold flex-shrink-0`}
                 >
                   {item.step}
                 </div>
                 <div className="flex-1">
                   <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                   <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.description}</p>
                 </div>
                 <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 flex-shrink-0 mt-1" />
               </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-800" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Need to Make Changes?</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">Call us anytime to modify your booking</p>
            <a href="tel:+15513054081" className="text-sm sm:text-base text-zinc-600 font-semibold hover:text-blue-700 transition-colors">
            551-305-4081
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-800" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Email Support</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">Get help via email support</p>
            <a
              href="mailto:info@clensy.com"
              className="text-sm sm:text-base text-zinc-600 font-semibold hover:text-zinc-700 transition-colors"
            >
              info@clensy.com
            </a>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex justify-center pt-4 sm:pt-6">
          <motion.button
            onClick={() => (window.location.href = "/booking")}
            className="group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-zinc-600 to-zinc-700 text-white rounded-xl hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-transform duration-300 group-hover:-translate-y-1" />
            Book Another Service
          </motion.button>
        </motion.div>

        {/* Footer Message */}
        <motion.div variants={itemVariants} className="text-center pt-6 sm:pt-8">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-slate-200">
            <p className="text-slate-600 text-base sm:text-lg">
              Thank you for choosing our professional cleaning services!
              <br />
              <span className="font-semibold text-zinc-600">We look forward to making your space sparkle! ✨</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
