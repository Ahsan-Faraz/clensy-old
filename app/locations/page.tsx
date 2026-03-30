"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Calendar, Phone } from "lucide-react";

export default function LocationsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // County locations data
  const locations = [
    {
      county: "Bergen County",
      address: "600 Kinderkamack Road, Suite 200",
      city: "Oradell, NJ 07649",
      phone: "551-305-4081",
      image:
        "https://www.northjersey.com/gcdn/presto/2020/11/27/PNJM/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002.JPG?crop=6015,3384,x0,y308",
      slug: "bergen",
    },
    {
      county: "Hudson County",
      address: "88 River Street, Suite 302",
      city: "Hoboken, NJ 07030",
      phone: "551-305-4081",
      image:
        "https://pyxis.nymag.com/v1/imgs/c31/3a5/c01b3f0cb3f32f34ac1670ff10991d9e47-hoboken-lede.2x.rsocial.w600.jpg",
      slug: "hudson",
    },
    {
      county: "Essex County",
      address: "280 South Harrison Street, Suite 1F",
      city: "East Orange, NJ 07018",
      phone: "551-305-4081",
      image:
        "https://images.squarespace-cdn.com/content/v1/619d5ebc238e542fb0c33dc1/1638832803220-BZGEE966XUF7ZT2OXSI3/pasted-image-0-1.png",
      slug: "essex",
    },
    {
      county: "Passaic County",
      address: "1225 Clifton Avenue, Suite 3B",
      city: "Clifton, NJ 07013",
      phone: "551-305-4081",
      image:
        "https://takeahike.us/wp/wp-content/uploads/2019/10/paterson-fall2.jpg",
      slug: "passaic",
    },
    {
      county: "Union County",
      address: "500 North Avenue East, Suite 400",
      city: "Westfield, NJ 07090",
      phone: "551-305-4081",
      image:
        "https://uploads.thealternativepress.com/uploads/photos/ff/2e92932ca009d6bbf5a9_44fa2dd46be6f378a435_IMG_1532__1_.JPG?id=1152529",
      slug: "union",
    },
    {
      county: "Morris County",
      address: "10 DeHart Street, Suite 103",
      city: "Morristown, NJ 07960",
      phone: "551-305-4081",
      image:
        "https://admin.onlyinyourstate.com/wp-content/uploads/sites/2/2023/05/GettyImages-1403661247.jpg",
      slug: "morris",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section styled like services page */}
      <section className="relative min-h-[60vh] bg-black pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cleaning-hero.jpg"
            alt="Professional Cleaning Service"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(60vh-64px)]">
            {/* Text content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Clensy Service Locations
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-xl">
                Find a Clensy cleaning service location near you. We provide
                professional cleaning services throughout Northern New Jersey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors items-center"
                >
                  Contact Us Today
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Book Now
                </Link>
              </div>
            </div>

            {/* Right side - Empty space or image */}
            <div className="hidden md:block">
              <Image
                src="/images/cleaning-hero.jpg"
                alt="Professional Cleaning Service"
                width={500}
                height={300}
                className="rounded-md shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 pb-2 border-b border-blue-500 inline-block">
            Our Service Locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <motion.div
                key={location.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-blue-900/30"
              >
                <div className="relative h-64">
                  <Image
                    src={location.image}
                    alt={`${location.county} office`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <h3 className="text-2xl font-bold text-white p-6">
                      {location.county}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">{location.phone}</p>
                    </div>
                  </div>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mt-4 p-2 border border-blue-600 rounded-md hover:bg-blue-900/30 transition-all"
                  >
                    View Details <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}