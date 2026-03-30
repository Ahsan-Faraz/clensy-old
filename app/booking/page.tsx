"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProgressBar } from "../../components/booking/ProgressBar";
import { StepOne } from "../../components/booking/StepOne";
import { StepTwo } from "../../components/booking/StepTwo";
import { StepThree } from "../../components/booking/StepThree";
import { BookingSuccess } from "../../components/booking/BookingSuccess";
import type { BookingData, Lead } from "../../types/booking";
import {
  Star,
  Sparkles,
  Shield,
  Clock,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);
  const [bookingData, setBookingData] = useState<BookingData>({
    lead: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "NJ",
        zipCode: "",
      },
      scopeIds: [],
      answers: {},
    },
  });

  const steps = ["Lead Info & Services", "Quote & Pricing", "Final Booking"];

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
      lead: {
        ...prev.lead,
        ...data.lead,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeBooking = () => {
    setCurrentStep(4);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  useEffect(() => {
    if (currentStep > 1) {
      window.scrollTo(0, 350);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors closeButton duration={5000} />

    <Navbar/>
      <section className="h-[50vh] relative pt-16 flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.freepik.com/free-photo/empty-modern-room-with-furniture_23-2149178335.jpg?t=st=1753346336~exp=1753349936~hmac=7badfb42b1614ce855172e3d69e2c72c907e1c4dfea593be03eb3188d41148bd&w=826"
            alt="Clean modern kitchen"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full py-8">
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
                className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full"
              >
                <span className="text-white/90 text-sm font-medium">
                  Professional Cleaning Services
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 hero-text-shadow">
                Book Now Our services
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg text-white/80 mb-6 max-w-xl"
              >
                We offer reliable, personalized service with flexible
                scheduling to suit your needs. Whether it's a quick fix or a
                full solution, we're just a click away.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              ></motion.div>
            </motion.div>

            {/* Right side - Empty space for better balance */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="py-16  z-10">
        <div className="container mx-auto px-0 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            {currentStep <= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <ProgressBar
                  currentStep={currentStep}
                  totalSteps={3}
                  steps={steps}
                />
              </motion.div>
            )}

            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${
                currentStep === 4 ? "bg-transparent" : "bg-white"
              } rounded-2xl shadow-xl ${
                currentStep !== 4 ? "p-2 border border-gray-100" : ""
              } min-h-[600px] relative overflow-hidden`}
            >
              {/* Background Pattern for non-success steps */}
              {currentStep !== 4 && (
                <div className="absolute inset-0 opacity-5 ">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full -translate-x-20 -translate-y-20" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600 rounded-full translate-x-16 translate-y-16" />
                </div>
              )}

              <div className=" z-10">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepOne
                        formData={bookingData.lead}
                        onUpdateData={(data) =>
                          updateBookingData({ lead: data as Lead })
                        }
                        onNext={nextStep}
                      />
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepTwo
                        formData={bookingData}
                        onUpdateData={updateBookingData}
                        onNext={nextStep}
                        onPrevious={previousStep}
                      />
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepThree
                        formData={bookingData}
                        onUpdateData={updateBookingData}
                        onComplete={completeBooking}
                        onPrevious={previousStep}
                      />
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BookingSuccess formData={bookingData} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Trusted by 10,000+ Happy Customers</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Professional, reliable, and eco-friendly cleaning services since 2015
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <p className="text-sm text-gray-600">Customer Support</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1h</div>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>

              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-500">© 2024 Professional Cleaning Services. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Booking;
