"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Shield,
  Sparkles,
  Clock,
  Leaf,
  Brain,
  Cpu,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";


type ComparisonItem = {
  feature: string;
  clensy: boolean;
  traditional: boolean;
  clensyIcon: React.ReactNode;
  traditionalIcon?: React.ReactNode;
  description: string;
};

const comparisonData: ComparisonItem[] = [
  {
    feature: "Smart Scheduling",
    clensy: true,
    traditional: false,
    clensyIcon: <Clock className="h-5 w-5 text-white" />,
    traditionalIcon: <X className="h-5 w-5 text-gray-500" />,
    description: "AI-powered scheduling that adapts to your lifestyle",
  },
  {
    feature: "Eco-Friendly Products",
    clensy: true,
    traditional: false,
    clensyIcon: <Leaf className="h-5 w-5 text-white" />,
    traditionalIcon: <X className="h-5 w-5 text-gray-500" />,
    description: "100% environmentally safe cleaning solutions",
  },
  {
    feature: "AI Recommendations",
    clensy: true,
    traditional: false,
    clensyIcon: <Brain className="h-5 w-5 text-white" />,
    traditionalIcon: <X className="h-5 w-5 text-gray-500" />,
    description: "Personalized cleaning suggestions based on your space",
  },
  {
    feature: "Smart Home Integration",
    clensy: true,
    traditional: false,
    clensyIcon: <Cpu className="h-5 w-5 text-white" />,
    traditionalIcon: <X className="h-5 w-5 text-gray-500" />,
    description: "Seamless connection with your smart home ecosystem",
  },
  {
    feature: "Professional Staff",
    clensy: true,
    traditional: true,
    clensyIcon: <Users className="h-5 w-5 text-white" />,
    traditionalIcon: <Check className="h-5 w-5 text-gray-500" />,
    description: "Trained and vetted cleaning professionals",
  },
  {
    feature: "Quality Guarantee",
    clensy: true,
    traditional: false,
    clensyIcon: <Shield className="h-5 w-5 text-white" />,
    traditionalIcon: <X className="h-5 w-5 text-gray-500" />,
    description: "100% satisfaction guarantee or we clean again for free",
  },
  {
    feature: "Advanced Cleaning Tech",
    clensy: true,
    traditional: false,
    clensyIcon: <Sparkles className="h-5 w-5 text-white" />,
    traditionalIcon: <X className="h-5 w-5 text-gray-500" />,
    description: "State-of-the-art equipment and cleaning methods",
  },
];

export default function ComparisonSection() {

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern-light opacity-50"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-black/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-black/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black text-glow-dark font-space">
            The Clensy Difference
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Experience the future of cleaning with our smart, AI-enhanced
            services. See how we compare to traditional cleaning services.
          </p>
          <div className="w-20 h-1 bg-black/70 mx-auto mt-6"></div>
        </motion.div>

        {/* Comparison Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Column Headers */}
          <div className="lg:col-span-4"></div>

          {/* Clensy Column */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="backdrop-blur-md bg-black/90 border border-black/20 rounded-2xl p-6 h-full shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-white mr-2" />
                  <h3 className="text-2xl font-bold text-white">Clensy</h3>
                </div>
                <p className="text-white/70 text-center">
                  Smart Cleaning Service
                </p>
              </div>
            </div>
          </motion.div>

          {/* Traditional Column */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="backdrop-blur-md bg-gray-200 border border-gray-300 rounded-2xl p-6 h-full shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-gray-700 mr-2" />
                <h3 className="text-2xl font-bold text-gray-700">
                  Traditional
                </h3>
              </div>
              <p className="text-gray-600 text-center">
                Conventional Cleaning Service
              </p>
            </div>
          </motion.div>

          {/* Comparison Rows */}
          {comparisonData.map((item, index) => (
            <React.Fragment key={index}>
              {/* Feature Name */}
              <motion.div
                className="lg:col-span-4 flex items-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="p-4 w-full">
                  <h4 className="text-lg font-medium text-black">
                    {item.feature}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Clensy Value */}
              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className={cn(
                    "backdrop-blur-md border rounded-xl p-4 h-full flex items-center justify-center relative overflow-hidden group",
                    item.clensy
                      ? "bg-black border-black/20"
                      : "bg-transparent border-black/5"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white blur-xl"></div>
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.clensyIcon}
                  </motion.div>
                </div>
              </motion.div>

              {/* Traditional Value */}
              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className={cn(
                    "backdrop-blur-md border rounded-xl p-4 h-full flex items-center justify-center",
                    item.traditional
                      ? "bg-gray-200 border-gray-300"
                      : "bg-transparent border-gray-200"
                  )}
                >
                  {item.traditionalIcon}
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the future of cleaning today with Clensy's smart
            services.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a
              href="/booking"
              className="inline-flex items-center px-8 py-3 rounded-full bg-black text-white backdrop-blur-sm border border-black/20 font-medium transition-all duration-300 hover:bg-black/80 glow-on-hover"
            >
              <Zap className="mr-2 h-5 w-5" />
              Book Smart Cleaning
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
