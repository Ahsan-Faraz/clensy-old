"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Calendar,
  ChevronRight,
  Clock,
  Mail,
  Building,
} from "lucide-react";

interface HudsonLocationData {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaButton1: string;
    ctaButton2: string;
  };
  contactSection: {
    title: string;
    phone: string;
    email: string;
    address: string;
    hours: { day: string; hours: string }[];
  };
  serviceAreas: string[];
  aboutSection: {
    title: string;
    description: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export default function HudsonCountyPage() {
  const [data, setData] = useState<HudsonLocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/location/hudson");
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError("Failed to load data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff]"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error || "Failed to load data"}</div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section styled like services page */}
      <section className="relative min-h-[60vh] bg-black pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroSection.backgroundImage}
            alt="Hudson County Skyline"
            fill
            className="object-cover brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-8 items-center min-h-[calc(60vh-64px)]">
            <div className="flex flex-col justify-end h-full pb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                {data.heroSection.title}
              </h1>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="flex px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors items-center"
                >
                  <Calendar className="mr-2 h-5 w-5" /> SCHEDULE SERVICE
                </Link>
                <Link
                  href={`tel:${data.contactSection.phone}`}
                  className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md font-medium hover:bg-white/20 transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" /> CALL US NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-4 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-400">
            <Link
              href="/locations"
              className="hover:text-blue-400 transition-colors"
            >
              All Locations
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white font-medium">Hudson County</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info and Hours */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-blue-900/80 to-gray-900 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm border border-blue-900/30">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  Contact Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-gray-300 font-medium mb-1">Phone</h3>
                    <a
                      href={`tel:${data.contactSection.phone}`}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {data.contactSection.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-gray-300 font-medium mb-1">Email</h3>
                    <a
                      href={`mailto:${data.contactSection.email}`}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {data.contactSection.email}
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/booking?location=hudson"
                    className="inline-block w-full py-3 bg-blue-600 text-white rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-gradient-to-br from-gray-900 to-blue-900/70 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm border border-blue-900/30">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Clock className="h-5 w-5 text-blue-400 mr-2" />
                  Hours of Operation
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {data.contactSection.hours.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{hour.day}</span>
                      <span className="text-white">{hour.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Interactive Map */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Service Area</h2>
              </div>
              <div className="relative h-[400px] w-full">
                <Image
                  src="https://www.cccarto.com/nj/hudson_zipcodes/files/hudson_county_zip_codes.jpg"
                  alt="Hudson County Map"
                  fill
                  className="object-cover z-10"
                />

                {/* Map Overlay with Pin */}
                <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm z-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-white px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
                      <span className="font-semibold text-gray-800">
                        Hudson County
                      </span>
                    </div>
                  </div>
                </div>

                {/* Schedule Service Button */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-indigo-800 text-white py-4 px-6 flex justify-center z-30">
                  <Link
                    href="/booking"
                    className="flex items-center font-medium hover:text-blue-200 transition-colors"
                  >
                    <Calendar className="h-5 w-5 mr-2" /> SCHEDULE A CLEANING
                  </Link>
                </div>
              </div>
            </div>

            {/* About This Location */}
            <div className="bg-gradient-to-br from-indigo-900/70 to-gray-900 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm border border-indigo-900/30">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  About Our Hudson County Cleaning Services
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {data.aboutSection.description}
                </p>
                <div>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Contact Us Today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-gray-900 to-blue-900/50 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm border border-blue-900/30">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                Service Areas in Hudson County
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.serviceAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center py-3 px-4 bg-gray-700/50 border border-gray-700 rounded-lg hover:bg-blue-900/20 hover:border-blue-500/50 transition-all"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-white">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}