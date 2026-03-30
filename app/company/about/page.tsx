"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { formatText } from "@/lib/utils/formatText";
import {
  Users,
  Award,
  Shield,
  Target,
  CheckCircle2,
  MessageCircle, 
  Smartphone,
  Home,
  Building2,
} from "lucide-react";


// Types for CMS data
interface CustomerType {
  title: string;
  description: string;
}

interface AboutData {
  heroSection: {
    heading: string;
    tagline: string;
  };
  ourStorySection: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    image: string;
  };
  whyWeStartedSection: {
    heading: string;
    subtitle: string;
    quoteText: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  whatMakesUsDifferentSection: {
    heading: string;
    residentialCommercial: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    eliteTeam: {
      title: string;
      paragraph1: string;
      paragraph2: string;
      image: string;
    };
  };
  clientFocusedTech: {
    heading: string;
    features: string[];
  };
  whoWeServeSection: {
    heading: string;
    subtitle: string;
    customerTypes: CustomerType[];
  };
  ourMissionSection: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    closingLine: string;
  };
  ctaSection: {
    heading: string;
    description: string;
    bookButtonText: string;
    contactButtonText: string;
  };
}

// Default data as fallback
const defaultData: AboutData = {
  heroSection: {
    heading: "About Clensy",
    tagline: "Raising the Standard, One Clean at a Time.",
  },
  ourStorySection: {
    heading: "Our Story",
    paragraph1:
      "Clensy was built to solve a problem — the frustrating experience of unreliable cleaners who are late, don't communicate, and leave you wondering if the job will ever be done right.",
    paragraph2:
      "We set out to create something better. A company that not only delivers amazing results — but makes the entire experience seamless from start to finish.",
    paragraph3:
      "Whether you're managing a busy home, multiple Airbnb properties, or a commercial space that needs to stay spotless and presentable, Clensy is your go-to team.",
    image:
      "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg",
  },
  whyWeStartedSection: {
    heading: "Why We Started",
    subtitle: "Let's be honest: the cleaning industry is broken.",
    quoteText:
      "My cleaner didn't show up. No one responded. The job was half-done.",
    paragraph1:
      "We were tired of the low standards across the industry – Whether it's flaky independent cleaners or cookie-cutter franchises with zero customer service — it's hard to find a company that actually cares and does the job right.",
    paragraph2:
      "We listened. And then we built Clensy — a cleaning company that actually shows up, delivers exceptional results, and treats every client like a priority.",
    paragraph3:
      "We know that when you book a cleaning, you want peace of mind — not more headaches.",
  },
  whatMakesUsDifferentSection: {
    heading: "What Makes Us Different?",
    residentialCommercial: {
      title: "Residential & Commercial Cleaning",
      paragraph1:
        "From homes and apartments to offices, retail spaces, gyms, medical facilities, and even construction sites — if it's indoors and needs to be cleaned, we've got it covered.",
      paragraph2:
        "Not sure if we handle your specific needs? Chances are, we do. If you're looking for something custom, head over to our Contact Us page or give us a call. We're happy to create a tailored plan that fits exactly what you're looking for.",
    },
    eliteTeam: {
      title: "Elite Team",
      paragraph1:
        "Out of every 100 applicants, we only hire 1 cleaner. Seriously. Our hiring process is extensive, and only the best make it through.",
      paragraph2:
        "We're fully licensed, bonded, and insured, so you can feel confident knowing your home, business, or property is in trusted, professional hands.",
      image:
        "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847481/shutterstock_2200915291_vewsyn.jpg",
    },
  },
  clientFocusedTech:{
    heading: "Client-Focused Tech",
    features: [
      "Customer portal to manage your bookings",
      "Text/email reminders before every job",
      "Real-time ETA when your cleaner is en route",
      "Secure online payments for convenience",
    ],
  },
  whoWeServeSection: {
    heading: "Who We Serve",
    subtitle:
      "Clensy is made for people and businesses who expect more from a cleaning company.",
    customerTypes: [
      {
        title: "Busy parents",
        description: "Who need a safe, clean home without the stress",
      },
      {
        title: "Professionals and entrepreneurs",
        description: "Focused on growing, not cleaning",
      },
      {
        title: "Property managers and business owners",
        description: "Who need reliable commercial upkeep",
      },
      {
        title: "Airbnb hosts",
        description: "Who demand fast, spotless turnovers",
      },
      {
        title: "Contractors or developers",
        description: "Who need sharp post-construction cleanup",
      },
      {
        title: "Anyone who values quality",
        description: "And needs a trustworthy cleaning service",
      },
    ],
  },
  ourMissionSection: {
    heading: "Our Mission",
    paragraph1:
      "We're obsessed with making the cleaning process feel effortless for our clients. You book. We show up. We do the job right — the first time.",
    paragraph2:
      "No rescheduling nightmares. No communication breakdowns. No wondering if your space was actually cleaned.",
    paragraph3:
      "With Clensy, you get a team that's committed to your satisfaction — from the first message to the final wipe-down.",
    paragraph4:
      "If you're looking for a company that understands the value of your time, respects your space, and consistently delivers results — welcome to Clensy.",
    closingLine: "We're here to raise the standard.",
  },
  ctaSection: {
    heading: "Ready to Experience the Clensy Difference?",
    description:
      "Join thousands of satisfied customers who've discovered what a truly exceptional cleaning service feels like.",
    bookButtonText: "Book Your Cleaning",
    contactButtonText: "Contact Us",
  },
};

export default function AboutPage() {
  // Animation control for sections
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // CMS data state
  const [aboutData, setAboutData] = useState<AboutData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Fetch About data from CMS
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/cms/about");
        const result = await response.json();

        if (result.success && result.data) {
          setAboutData(result.data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        // Keep using default data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
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
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[60vh] flex items-center justify-center bg-gradient-to-r from-black to-[#0a0a0a] text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069427/website-images/guvnsgfqcmcx8k1gusum.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 text-white"
          >
            {formatText(aboutData.heroSection.heading)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg text-gray-100 mb-8"
          >
            {formatText(aboutData.heroSection.tagline)}
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {formatText(aboutData.ourStorySection.heading)}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {formatText(aboutData.ourStorySection.paragraph1)}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                {formatText(aboutData.ourStorySection.paragraph2)}
              </p>
              <p className="text-lg text-gray-600">
                {formatText(aboutData.ourStorySection.paragraph3)}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src={aboutData.ourStorySection.image || "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg"}
                alt="Professional cleaning team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-lg font-bold">
                  Dedicated to excellence in every clean
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why We Started Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {formatText(aboutData.whyWeStartedSection.heading)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {formatText(aboutData.whyWeStartedSection.subtitle)}
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <p className="text-xl text-gray-700 italic mb-6 text-center">
                "{formatText(aboutData.whyWeStartedSection.quoteText)}"
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-gray-600 mb-4">
                  {formatText(aboutData.whyWeStartedSection.paragraph1)}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  {formatText(aboutData.whyWeStartedSection.paragraph2)}
                </p>
                <p className="text-lg text-gray-600">
                  {formatText(aboutData.whyWeStartedSection.paragraph3)}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {formatText(aboutData.whatMakesUsDifferentSection.heading)}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Residential & Commercial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500 mr-4" />
                <h3 className="text-2xl font-bold">
                  {formatText(
                    aboutData.whatMakesUsDifferentSection.residentialCommercial
                      .title
                  )}
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {formatText(
                  aboutData.whatMakesUsDifferentSection.residentialCommercial
                    .paragraph1
                )}
              </p>
              <p className="text-lg text-gray-600">
                {formatText(
                  aboutData.whatMakesUsDifferentSection.residentialCommercial
                    .paragraph2
                )}
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Home className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Homes</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Building2 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Offices</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Target className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Retail</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Shield className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Medical</span>
                </div>
              </div>
            </motion.div>

            {/* Elite Team */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500 mr-4" />
                <h3 className="text-2xl font-bold">
                  {formatText(
                    aboutData.whatMakesUsDifferentSection.eliteTeam.title
                  )}
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {formatText(
                  aboutData.whatMakesUsDifferentSection.eliteTeam.paragraph1
                )}
              </p>
              <p className="text-lg text-gray-600">
                {formatText(
                  aboutData.whatMakesUsDifferentSection.eliteTeam.paragraph2
                )}
              </p>
              <div className="relative h-48 mt-8 rounded-lg overflow-hidden">
                <Image
                  src={aboutData.whatMakesUsDifferentSection.eliteTeam.image || "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847481/shutterstock_2200915291_vewsyn.jpg"}
                  alt="Professional cleaning team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Client-Focused Tech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 md:col-span-2"
            >
              <div className="flex items-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500 mr-4" />
                <h3 className="text-2xl font-bold">{aboutData.clientFocusedTech.heading}</h3>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <Smartphone className="h-10 w-10 mx-auto text-blue-600 mb-4" />
                  <p className="text-lg text-gray-700">
                    {aboutData.clientFocusedTech.features[0]}
                  </p>
                </div>
                <div className="text-center p-4">
                  <MessageCircle className="h-10 w-10 mx-auto text-blue-600 mb-4" />
                  <p className="text-lg text-gray-700">
                    {aboutData.clientFocusedTech.features[1]}
                  </p>
                </div>
                <div className="text-center p-4">
                  <Target className="h-10 w-10 mx-auto text-blue-600 mb-4" />
                  <p className="text-lg text-gray-700">
                    {aboutData.clientFocusedTech.features[2]}
                  </p>
                </div>
                <div className="text-center p-4">
                  <Shield className="h-10 w-10 mx-auto text-blue-600 mb-4" />
                  <p className="text-lg text-gray-700">
                    {aboutData.clientFocusedTech.features[3]}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {formatText(aboutData.whoWeServeSection.heading)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {formatText(aboutData.whoWeServeSection.subtitle)}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.whoWeServeSection.customerTypes.map((client, index) => {
              // Icon mapping based on index
              const icons = [Users, Award, Building2, Home, Target, Shield];
              const IconComponent = icons[index] || Users;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white p-8 rounded-xl shadow-sm text-center"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {formatText(client.title)}
                  </h3>
                  <p className="text-gray-600">
                    {formatText(client.description)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {formatText(aboutData.ourMissionSection.heading)}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {formatText(aboutData.ourMissionSection.paragraph1)}
              </p>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {formatText(aboutData.ourMissionSection.paragraph2)}
              </p>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {formatText(aboutData.ourMissionSection.paragraph3)}
              </p>
              <p className="text-2xl font-medium mb-8">
                {formatText(aboutData.ourMissionSection.paragraph4)}
              </p>
              <p className="text-2xl font-bold">
                {formatText(aboutData.ourMissionSection.closingLine)}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {formatText(aboutData.ctaSection.heading)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              {formatText(aboutData.ctaSection.description)}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/booking/"
                className="inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                {aboutData.ctaSection.bookButtonText}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                {aboutData.ctaSection.contactButtonText}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>

    </>
  );
}
