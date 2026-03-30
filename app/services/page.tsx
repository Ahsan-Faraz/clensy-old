"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState("standard-cleaning");
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100]);
  const backgroundOpacity = useTransform(scrollY, [0, 200], [1, 0.3]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const serviceItem = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Service details based on selected service
  const serviceDetails = {
    "standard-cleaning": [
      "Kitchen (clean & disinfect sink, countertop, stove top)",
      "Clean and polish appliances",
      "Wipe exterior of all cabinets",
      "Clean stove top",
      "Dust all exterior surfaces of rooms",
      "Vacuum & Mop Floors",
      "Bathroom (Clean & Disinfect toilet, shower & sink)",
      "Dust bedroom shelving, night stand, bed frame",
    ],
    "deep-cleaning": [
      "Everything in Standard Cleaning plus:",
      "Deep clean inside oven and refrigerator",
      "Clean inside cabinets and drawers",
      "Scrub tile grout",
      "Clean baseboards and crown molding",
      "Wash windows (interior)",
      "Deep clean upholstery",
      "Clean light fixtures and ceiling fans",
    ],
    "move-in-out": [
      "Everything in Deep Cleaning plus:",
      "Clean inside all closets",
      "Clean inside all kitchen appliances",
      "Detailed cleaning of all fixtures",
      "Clean all window tracks and frames",
      "Clean all vents and registers",
      "Detailed cleaning of all baseboards",
      "Clean garage and storage areas",
    ],
    "office-cleaning": [
      "Clean and sanitize all desks and workstations",
      "Dust all office equipment and furniture",
      "Clean and sanitize break rooms",
      "Clean and disinfect restrooms",
      "Vacuum all carpeted areas",
      "Mop all hard floors",
      "Empty and clean trash receptacles",
      "Clean glass doors and partitions",
    ],
  };

  const serviceImages = {
    "standard-cleaning": "/placeholder.svg?height=400&width=600",
    "deep-cleaning": "/placeholder.svg?height=400&width=600",
    "move-in-out": "/placeholder.svg?height=400&width=600",
    "office-cleaning": "/placeholder.svg?height=400&width=600",
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black relative z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-10"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Services
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Professional cleaning services tailored to your needs. Choose the
              service that best fits your requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="py-12 bg-white relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs
            defaultValue="standard-cleaning"
            onValueChange={setSelectedService}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-black/90 backdrop-blur-sm border border-black/20 rounded-2xl p-1">
              <TabsTrigger
                value="standard-cleaning"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl text-white"
              >
                Standard Cleaning
              </TabsTrigger>
              <TabsTrigger
                value="deep-cleaning"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl text-white"
              >
                Deep Cleaning
              </TabsTrigger>
              <TabsTrigger
                value="move-in-out"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl text-white"
              >
                Move In/Out
              </TabsTrigger>
              <TabsTrigger
                value="office-cleaning"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl text-white"
              >
                Office Cleaning
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              {[
                "standard-cleaning",
                "deep-cleaning",
                "move-in-out",
                "office-cleaning",
              ].map((service) => (
                <TabsContent key={service} value={service} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left side - Image */}
                    <motion.div
                      className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/10"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Image
                        src={
                          serviceImages[
                            service as keyof typeof serviceImages
                          ] || "/placeholder.svg"
                        }
                        alt={service.replace("-", " ")}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </motion.div>

                    {/* Right side - Service details */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <h2 className="text-3xl font-bold mb-6 capitalize">
                        {service.replace(/-/g, " ")}
                      </h2>
                      <p className="text-gray-600 mb-8">
                        {service === "standard-cleaning" &&
                          "Our standard cleaning service covers all the basics to keep your home clean and tidy."}
                        {service === "deep-cleaning" &&
                          "A thorough cleaning service that gets into all the nooks and crannies of your home."}
                        {service === "move-in-out" &&
                          "Perfect for when you're moving in or out of a property, ensuring it's spotless."}
                        {service === "office-cleaning" &&
                          "Keep your workplace clean and professional with our office cleaning service."}
                      </p>

                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4 mb-8"
                      >
                        {serviceDetails[
                          service as keyof typeof serviceDetails
                        ].map((detail, index) => (
                          <motion.div
                            key={index}
                            variants={serviceItem}
                            className="flex items-start gap-3"
                          >
                            <Check className="h-5 w-5 text-[#ff0080] mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </motion.div>

                      <Link
                        href="/booking"
                        className="brand-button inline-flex items-center"
                      >
                        Book This Service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </motion.div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to experience the Clensy difference?
            </h2>
            <p className="text-gray-600 mb-8">
              Book your cleaning service today and enjoy a spotless home or
              office.
            </p>
            <Link
              href="/booking"
              className="brand-button inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
