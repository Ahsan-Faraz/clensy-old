"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  // Remove theme state and set to black permanently
  const bgColor = "bg-black";
  const textColor = "text-white";
  const headingColor = "text-white";
  const borderColor = "border-gray-800";
  const iconColor = "text-gray-400";
  const hoverColor = "text-[#007BFF]"; // Changed to blue

  return (
    <footer className={`py-16 ${bgColor} relative overflow-hidden`}>
      {/* Remove theme toggle buttons */}

      {/* Animated wavy line at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg width="100%" height="20" className="fill-current text-[#111]">
          <motion.path
            d="M0,0 C150,20 350,0 500,10 C650,20 850,0 1000,10 C1150,20 1350,0 1500,10 C1650,20 1850,0 2000,10 L2000,0 L0,0 Z"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clensy-3YxRqAp8bxVkkiFlQmcTlgTeLxuJ4t.png"
                alt="Clensy Logo"
                width={120}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className={`${textColor} text-sm mb-6`}>
              Professional cleaning services tailored to your needs.
            </p>
            <div className="flex space-x-4 mb-6">
              <motion.a
                href="https://facebook.com/clensycleaning" target="_blank" rel="noopener noreferrer"
                className={`${iconColor} hover:${hoverColor}`}
                whileHover={{ scale: 1.2, color: "#007BFF" }}
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com/clensycleaning" target="_blank" rel="noopener noreferrer"
                className={`${iconColor} hover:${hoverColor}`}
                whileHover={{ scale: 1.2, color: "#007BFF" }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className={`h-5 w-5 ${iconColor}`} />
                <p className={`${textColor} text-sm`}>
                124 Little Falls Rd, Suite C-1, Fairfield, NJ 07004
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`h-5 w-5 ${iconColor}`} />
                <a
                  href="tel:+15513054081"
                  className={`${textColor} text-sm hover:${hoverColor}`}
                >
                  (551) 305-4081
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`h-5 w-5 ${iconColor}`} />
                <a
                  href="mailto:info@clensy.com"
                  className={`${textColor} text-sm hover:${hoverColor}`}
                >
                  info@clensy.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-sm font-bold ${headingColor} mb-4`}>
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/routine-cleaning"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Routine Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/deep-cleaning"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/moving-cleaning"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Moving Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/post-construction-cleaning"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Post Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/services/airbnb-cleaning"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Airbnb Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/other-commercial"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Commercial Cleaning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-bold ${headingColor} mb-4`}>
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/company/checklist"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Cleaning Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/company/about"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Join The Team
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-bold ${headingColor} mb-4`}>
              Locations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/locations/bergen"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Bergen County
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/hudson"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Hudson County
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/essex"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Essex County
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/passaic"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Passaic County
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/union"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Union County
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/morris"
                  className={`text-sm ${textColor} hover:${hoverColor}`}
                >
                  Morris County
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${borderColor} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
        >
          <p className={`${textColor} text-sm`}>
            &copy; {new Date().getFullYear()} Clensy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className={`text-sm ${textColor} hover:${hoverColor}`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className={`text-sm ${textColor} hover:${hoverColor}`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
