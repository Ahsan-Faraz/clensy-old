"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface PrivacyPolicySection {
  title: string;
  content: string;
  order: number;
}

interface PrivacyPolicyData {
  heroSection: {
    heading: string;
    description: string;
  };
  companyInfo: {
    websiteUrl: string;
    email: string;
    phone: string;
  };
  sections: PrivacyPolicySection[];
  smsConsent: {
    description: string;
    optOutInstructions: string;
  };
}

export default function PrivacyPolicyPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<PrivacyPolicyData | null>(null);

  useEffect(() => {
    fetchData();
    setIsLoaded(true);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/privacy-policy');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              {data?.heroSection.heading || "Privacy Policy"}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-white/80 mb-8"
            >
              {data?.heroSection.description || "Your privacy is important to us. Learn how we collect, use, and protect your information."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {data?.companyInfo.websiteUrl ? `${data.companyInfo.websiteUrl} Privacy Policy` : "Clensy Cleaning Privacy Policy"}
                </h2>
              </div>

              <div className="space-y-8">
                {data?.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {section.title}
                      </h3>
                      <div 
                        className="text-gray-700 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  ))
                }

                {/* SMS Consent Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">SMS Consent</h3>
                  <p className="text-gray-700 mb-4">
                    {data?.smsConsent.description}
                  </p>
                  <p className="text-gray-700">
                    {data?.smsConsent.optOutInstructions}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 p-6 rounded-lg mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about our Privacy Policy?</h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p>Email: <a href={`mailto:${data?.companyInfo.email}`} className="text-blue-600 hover:text-blue-800">{data?.companyInfo.email}</a></p>
                    <p>Phone: <a href={`tel:${data?.companyInfo.phone}`} className="text-blue-600 hover:text-blue-800">{data?.companyInfo.phone}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}