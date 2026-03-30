"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Users,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  MapPin,
  DollarSign,
  Star,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Award,
  Briefcase,
  Home,
  Building2,
  ArrowRight,
  Send,
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description:
      "Above-market wages with performance bonuses and regular raises",
  },
  {
    icon: Shield,
    title: "Health Benefits",
    description: "Comprehensive health, dental, and vision insurance coverage",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work-life balance with flexible hours and part-time options",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Training programs and advancement opportunities within the company",
  },
  {
    icon: Users,
    title: "Team Environment",
    description: "Supportive team culture with collaborative work environment",
  },
  {
    icon: Award,
    title: "Recognition Program",
    description: "Employee of the month awards and performance recognition",
  },
];

const positions = [
  {
    title: "Residential Cleaner",
    type: "Full-time / Part-time",
    location: "Multiple NJ Counties",
    description:
      "Join our residential cleaning team and help families maintain beautiful, clean homes.",
    requirements: [
      "Previous cleaning experience preferred but not required",
      "Reliable transportation",
      "Attention to detail",
      "Physical ability to perform cleaning tasks",
      "Background check required",
    ],
    salary: "$18-22/hour",
  },
  {
    title: "Commercial Cleaner",
    type: "Full-time / Part-time",
    location: "Multiple NJ Counties",
    description:
      "Clean offices, medical facilities, and commercial spaces with our professional team.",
    requirements: [
      "Experience in commercial cleaning preferred",
      "Ability to work evenings/weekends",
      "Reliable and punctual",
      "Team player attitude",
      "Background check required",
    ],
    salary: "$19-23/hour",
  },
  {
    title: "Team Leader",
    type: "Full-time",
    location: "Bergen County",
    description:
      "Lead a team of cleaners and ensure quality standards are met on every job.",
    requirements: [
      "2+ years cleaning experience",
      "Leadership experience",
      "Valid driver's license",
      "Excellent communication skills",
      "Quality control mindset",
    ],
    salary: "$25-30/hour",
  },
  {
    title: "Customer Service Representative",
    type: "Full-time",
    location: "Remote/Office",
    description:
      "Help customers schedule services and manage their cleaning needs.",
    requirements: [
      "Customer service experience",
      "Excellent phone skills",
      "Computer proficiency",
      "Problem-solving abilities",
      "Bilingual (English/Spanish) preferred",
    ],
    salary: "$17-21/hour",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    position: "Residential Cleaner",
    content:
      "I love working at Clensy! The team is supportive, the pay is great, and I have the flexibility I need for my family.",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    position: "Team Leader",
    content:
      "Started as a cleaner and worked my way up to team leader. Clensy really invests in their employees' growth.",
    rating: 5,
  },
  {
    name: "Lisa Chen",
    position: "Commercial Cleaner",
    content:
      "Best cleaning company I've worked for. They provide all the equipment and training you need to succeed.",
    rating: 5,
  },
];

export default function CareersPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    availability: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/careers");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching careers data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        availability: "",
        message: "",
      });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Use CMS data or fallback to static data
  const heroData = data?.heroSection || {
    topLabel: "Now Hiring - Multiple Positions",
    heading: "Join The Clensy Team",
    description:
      "Build a rewarding career with New Jersey's premier cleaning service. We offer competitive pay, great benefits, and opportunities for growth in a supportive environment.",
    primaryButtonText: "View Open Positions",
    secondaryButtonText: "Apply Now",
    teamMembersCount: "50+",
  };

  const benefitsData = data?.benefitsSection || {
    heading: "Why Work With Us?",
    description:
      "We believe in taking care of our team members because happy employees provide the best service to our customers.",
    benefits: benefits,
  };

  const positionsData = data?.positionsSection || {
    heading: "Open Positions",
    description:
      "Find the perfect role that matches your skills and career goals.",
    positions: positions,
  };

  const testimonialsData = data?.testimonialsSection || {
    heading: "What Our Team Says",
    description:
      "Hear from our employees about their experience working at Clensy.",
    testimonials: testimonials,
  };

  const applicationData = data?.applicationSection || {
    heading: "Ready to Join Our Team?",
    description:
      "Fill out the application below and we'll get back to you within 24 hours.",
    submitButtonText: "Submit Application",
  };

  const contactData = data?.contactSection || {
    heading: "Have Questions About Working With Us?",
    description:
      "Contact our HR team for more information about career opportunities.",
    phoneText: "Call Us: (551) 305-4081",
    emailText: "Email: careers@clensy.com",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-[#1a2542] pt-16 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="hero-grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0 L40 0 L40 40 L0 40 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
          </svg>
        </div>

        {/* Glowing orb effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/20 filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/15 filter blur-[100px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(85vh-64px)]">
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
                className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
              >
                <span className="text-white/90 text-sm font-medium flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {heroData.topLabel}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                {heroData.heading.includes("Clensy") ? (
                  <>
                    {heroData.heading.split("Clensy")[0]}
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Clensy{heroData.heading.split("Clensy")[1]}
                    </span>
                  </>
                ) : (
                  heroData.heading
                )}
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {heroData.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="#positions"
                    className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-xl hover:shadow-2xl"
                  >
                    {heroData.primaryButtonText}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="https://jobs.gusto.com/postings/clensy-cleaning-residential-cleaner-3c7fb08b-f3fa-4a1a-b198-b2490e6ff648"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white/10 text-white hover:bg-white/20 border border-white/20 px-8 py-4 rounded-lg text-lg font-medium transition-all backdrop-blur-sm"
                  >
                    {heroData.secondaryButtonText}
                    <Send className="h-5 w-5 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroData.heroImage || "https://www.stathakis.com/hs-fs/hubfs/cleaning-team-more-efficient.png?width=837&height=554&name=cleaning-team-more-efficient.png"}
                  alt="Professional cleaning team working together"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {heroData.teamMembersCount}
                    </div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {benefitsData.heading}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {benefitsData.description}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefitsData.benefits.map((benefit: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
              >
                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                  {benefit.icon === "DollarSign" && (
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "Shield" && (
                    <Shield className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "Clock" && (
                    <Clock className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "TrendingUp" && (
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "Users" && (
                    <Users className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "Award" && (
                    <Award className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "Star" && (
                    <Star className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "CheckCircle" && (
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "Briefcase" && (
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  )}
                  {benefit.icon === "MapPin" && (
                    <MapPin className="h-6 w-6 text-blue-600" />
                  )}
                  {![
                    "DollarSign",
                    "Shield",
                    "Clock",
                    "TrendingUp",
                    "Users",
                    "Award",
                    "Star",
                    "CheckCircle",
                    "Briefcase",
                    "MapPin",
                  ].includes(benefit.icon) && (
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {positionsData.heading}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {positionsData.description}
            </p>
          </motion.div>

          <div className="space-y-6">
            {positionsData.positions.map((position: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {position.salary}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={
                        position.link && position.link.trim() !== ""
                          ? position.link
                          : "#apply"
                      }
                      target={
                        position.link && position.link.trim() !== ""
                          ? "_blank"
                          : undefined
                      }
                      className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </motion.div>
                </div>

                <p className="text-gray-600 mb-6">{position.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {position.requirements.map(
                      (req: string, reqIndex: number) => (
                        <li key={reqIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{req}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {testimonialsData.heading}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {testimonialsData.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.testimonials.map(
              (testimonial: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-8 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.position}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {contactData.heading}
            </h3>
            <p className="text-gray-600 mb-8">{contactData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`tel:${contactData.phoneText.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                {contactData.phoneText}
              </Link>
              <Link
                href={`mailto:${contactData.emailText.replace("Email: ", "")}`}
                className="inline-flex items-center bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                {contactData.emailText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
