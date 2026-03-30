"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Calendar, Check, Smartphone, Bell, MapPin } from "lucide-react";
import Image from "next/image";
import { formatText } from "@/lib/utils/formatText";


// Default data in case the API call fails
const defaultData = {
  step1: {
    title: "Order online",
    description:
      "Our easy online pricing lets you set up a cleaning plan right now. See your price and get scheduled today.",
    featureText: "Takes less than 30 seconds",
  },
  step2: {
    title: "We clean your home",
    description:
      "Our professional team arrives on time and cleans your home according to our 50-point checklist.",
    featureText: "Trained and background-checked professionals",
  },
  step3: {
    title: "Enjoy your clean home",
    description:
      "Relax in your freshly cleaned space. We'll be back on your schedule - weekly, bi-weekly, or monthly.",
    featureText: "Flexible scheduling to fit your lifestyle",
  },
  buttonText: "Book Now",
};

export default function HowItWorks() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState("booking");
  const [sectionData, setSectionData] = useState(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch how-it-works data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/how-it-works");
        const result = await response.json();

        if (result.success && result.data) {
          setSectionData({
            step1: {
              title: result.data.step1?.title || defaultData.step1.title,
              description:
                result.data.step1?.description || defaultData.step1.description,
              featureText:
                result.data.step1?.featureText || defaultData.step1.featureText,
            },
            step2: {
              title: result.data.step2?.title || defaultData.step2.title,
              description:
                result.data.step2?.description || defaultData.step2.description,
              featureText:
                result.data.step2?.featureText || defaultData.step2.featureText,
            },
            step3: {
              title: result.data.step3?.title || defaultData.step3.title,
              description:
                result.data.step3?.description || defaultData.step3.description,
              featureText:
                result.data.step3?.featureText || defaultData.step3.featureText,
            },
            buttonText: result.data.buttonText || defaultData.buttonText,
          });
        }
      } catch (error) {
        console.error("Error fetching how-it-works data:", error);
        // Keep using default data on error
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <div className="w-16 h-1 bg-black mx-auto"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Steps */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="step-indicator">
              <div className="step-number">1</div>
              <div>
                <h3 className="text-xl font-medium mb-2">
                  {formatText(sectionData.step1.title)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formatText(sectionData.step1.description)}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-[#007BFF] mr-2" />
                    <span>{formatText(sectionData.step1.featureText)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="step-indicator">
              <div className="step-number">2</div>
              <div>
                <h3 className="text-xl font-medium mb-2">
                  {formatText(sectionData.step2.title)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formatText(sectionData.step2.description)}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-[#007BFF] mr-2" />
                    <span>{formatText(sectionData.step2.featureText)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="step-indicator">
              <div className="step-number">3</div>
              <div>
                <h3 className="text-xl font-medium mb-2">
                  {formatText(sectionData.step3.title)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formatText(sectionData.step3.description)}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#007BFF] mr-2" />
                    <span>{formatText(sectionData.step3.featureText)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Link
                href="/booking/"
                className="bg-[#007BFF] text-white hover:bg-[#0056b3] px-8 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center transition-all duration-300"
              >
                {sectionData.buttonText}
              </Link>
            </motion.div>
          </div>

          {/* Right side - Interactive features */}
          <motion.div variants={itemVariants} className="relative">
            {/* Tabs for Customer Portal Features */}
            <div className="mb-6 flex space-x-2">
              <button
                onClick={() => setActiveTab("booking")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === "booking"
                    ? "bg-[#007BFF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Booking
              </button>
              <button
                onClick={() => setActiveTab("tracking")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === "tracking"
                    ? "bg-[#007BFF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <MapPin className="h-4 w-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === "notifications"
                    ? "bg-[#007BFF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Bell className="h-4 w-4 inline mr-2" />
                Notifications
              </button>
            </div>

            {/* Phone mockup with different screens */}
            <div className="device-mockup phone mx-auto">
              <div className="screen">
                {/* Header - only for booking and tracking tabs */}
                {activeTab !== "notifications" && (
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
                )}

                {/* Content based on active tab */}
                {activeTab === "booking" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4"
                  >
                    <h5 className="font-medium mb-4">Book Your Cleaning</h5>
                    <div className="space-y-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">
                          Service Type
                        </div>
                        <div className="font-medium">Routine Cleaning</div>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">Date</div>
                        <div className="font-medium">May 15, 2023</div>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">
                          Arrival Window
                        </div>
                        <div className="font-medium">8:00 AM - 10:00 AM</div>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">Frequency</div>
                        <div className="font-medium">Weekly</div>
                      </div>
                      <button className="w-full bg-black text-white py-2 rounded-lg">
                        Confirm Booking
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "tracking" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4"
                  >
                    <h5 className="font-medium mb-4">Upcoming Appointment</h5>
                    <div className="bg-gray-100 p-3 rounded-lg mb-4">
                      <div className="text-xs text-gray-500">
                        Today, 8:00 AM - 10:00 AM EST
                      </div>
                      <div className="font-medium">Maria G.</div>
                      <div className="text-xs text-[#28A745] mt-1">
                        Arriving in 20 minutes
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Status</div>
                      <div className="flex space-x-3">
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-5 h-5 bg-[#28A745] rounded-full mb-1"></div>
                          <div className="text-xs text-center">On the way</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-5 h-5 bg-gray-300 rounded-full mb-1"></div>
                          <div className="text-xs text-center text-gray-400">
                            Arrived
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mt-6 mb-2">
                        Future Appointments
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500">
                              Next week
                            </div>
                            <div className="text-sm font-medium">
                              May 22 • 8:00 - 10:00 AM
                            </div>
                          </div>
                          <div className="text-xs px-2 py-1 bg-gray-200 rounded">
                            Weekly
                          </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500">
                              In 2 weeks
                            </div>
                            <div className="text-sm font-medium">
                              May 29 • 8:00 - 10:00 AM
                            </div>
                          </div>
                          <div className="text-xs px-2 py-1 bg-gray-200 rounded">
                            Weekly
                          </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500">
                              In 3 weeks
                            </div>
                            <div className="text-sm font-medium">
                              Jun 5 • 8:00 - 10:00 AM
                            </div>
                          </div>
                          <div className="text-xs px-2 py-1 bg-gray-200 rounded">
                            Weekly
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "notifications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4"
                  >
                    {/* iPhone style messaging interface */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <div className="font-bold text-xs">C</div>
                        </div>
                        <div className="ml-2">
                          <div className="font-medium text-sm">Clensy</div>
                          <div className="text-xs text-[#28A745]">
                            Active now
                          </div>
                        </div>
                      </div>
                      <Smartphone className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="space-y-3">
                      {/* Yesterday message */}
                      <div className="text-center my-2">
                        <div className="text-xs text-gray-400">
                          Yesterday 11:00 AM
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                          Hey! Your next cleaning is scheduled for tomorrow with
                          an arrival time between 8:00am and 10:00am
                        </div>
                      </div>

                      {/* Today message */}
                      <div className="text-center my-2">
                        <div className="text-xs text-gray-400">
                          Today 7:45 AM
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                          Your cleaner is on the way and should be there in 20
                          minutes. See you soon!
                        </div>
                      </div>

                      {/* Client's response */}
                      <div className="flex justify-end">
                        <div className="bg-[#007BFF] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                          Thanks so much, she just got here!
                        </div>
                      </div>

                      {/* Message input */}
                      <div className="mt-4 flex items-center">
                        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">
                          Message...
                        </div>
                        <div className="ml-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 2L11 13"></path>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <motion.div
              className="hidden sm:block sm:absolute sm:-bottom-6 sm:-right-6 sm:bg-white sm:rounded-lg sm:shadow-lg sm:p-6 sm:max-w-xs"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">Customer Portal</div>
                <div className="w-2 h-2 rounded-full bg-[#007BFF]"></div>
              </div>
              <h4 className="text-lg font-medium mb-2">Stay updated</h4>
              <p className="text-sm text-gray-600">
                Track your cleaning team, manage appointments, and communicate
                directly through our customer portal.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-[#007BFF] text-sm">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <span>Accessible from any device</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
