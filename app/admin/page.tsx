"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    landingPage: true, // Start with landing page expanded
    companyPages: false,
    contactPage: false,
    faqPage: false,
    servicesPages: false,
    locationsPages: false,
    pageExtras: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/protected");
    } else if (status === "authenticated") {
      setIsLoading(false);
    } else if (status === "loading") {
      // Keep loading state
      setIsLoading(true);
    }
  }, [status, router]);

  // Toggle section expansion
  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">If this takes too long, please refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069431/website-images/x50aedpsjrpfubhn0d8b.png"
                alt="Clensy Logo"
                width={120}
                height={40}
                className="object-contain"
              />
              <span className="ml-4 text-sm font-medium text-gray-500">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">
                {session?.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/protected" })}
                className="text-sm text-gray-700 hover:text-[#007bff]"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {/* Landing Page Section */}
          <div>
            {/* Landing Page Header */}
            <button
              onClick={() => toggleSection("landingPage")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.landingPage ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      Landing Page
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage all sections of the main landing page
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#007bff] text-white px-2 py-1 rounded-md text-xs font-medium">
                6 sections
              </div>
            </button>

            {/* Landing Page Sub-sections */}
            {expandedSections.landingPage && (
              <div className="bg-gray-50">
                {/* Hero Section */}
                <Link
                  href="/admin/hero"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Hero Section
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section content, images, and buttons
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* How It Works Section */}
                <Link
                  href="/admin/how-it-works"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        How It Works Section
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the three-step process section
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Comparison Section */}
                <Link
                  href="/admin/comparison"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Comparison Section
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the Clensy Difference comparison table
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Checklist Section */}
                <Link
                  href="/admin/checklist"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Checklist Section
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the 50-Point Cleaning Checklist
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Reviews Section */}
                <Link
                  href="/admin/reviews"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Reviews Section
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the reviews section heading and button
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* CTA Section */}
                <Link
                  href="/admin/cta"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        CTA Section
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the call-to-action section content
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Company Pages Section */}
          <div className="border-t border-gray-200">
            {/* Company Pages Header */}
            <button
              onClick={() => toggleSection("companyPages")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.companyPages ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      Company Pages
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage all company pages and locations
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#007bff] text-white px-2 py-1 rounded-md text-xs font-medium">
                5 sections
              </div>
            </button>

            {/* Company Pages Sub-sections */}
            {expandedSections.companyPages && (
              <div className="bg-gray-50">
                {/* About Us Page */}
                <Link
                  href="/admin/about"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        About Page
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the about page content and team section
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
                {/* Careers Page */}
                <Link
                  href="/admin/careers"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Careers Page
                      </p>
                      <p className="text-xs text-gray-500">
                        Manage job positions, benefits, testimonials, and all
                        careers content
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Checklist Page */}
                <Link
                  href="/admin/checklist-page"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        50-Point Checklist
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit the complete checklist page content including all
                        cleaning items and sections
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>
          

          {/* Locations Section */}
          <div className="border-t border-gray-200">
            {/* Locations Header */}
            <button
              onClick={() => toggleSection("locationsPages")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.locationsPages ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      Locations
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage content for all location pages
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#007bff] text-white px-2 py-1 rounded-md text-xs font-medium">
                6 locations
              </div>
            </button>

            {/* Locations Sub-sections */}
            {expandedSections.locationsPages && (
              <div className="bg-gray-50">
                {/* Bergen County */}
                <Link
                  href="/admin/locations/bergen"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Bergen County
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, service areas, and all content for
                        Bergen County
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Hudson County */}
                <Link
                  href="/admin/locations/hudson"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Hudson County
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, service areas, and all content for
                        Hudson County
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Essex County */}
                <Link
                  href="/admin/locations/essex"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Essex County
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, service areas, and all content for
                        Essex County
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Passaic County */}
                <Link
                  href="/admin/locations/passaic"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Passaic County
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, service areas, and all content for
                        Passaic County
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Union County */}
                <Link
                  href="/admin/locations/union"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Union County
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, service areas, and all content for
                        Union County
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Morris County */}
                <Link
                  href="/admin/locations/morris"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Morris County
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, service areas, and all content for
                        Morris County
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Contact Page Section */}
          <div className="border-t border-gray-200">
            {/* Contact Page Header */}
            <button
              onClick={() => toggleSection("contactPage")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.contactPage ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      Contact Page
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage all sections of the Contact Us page
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                5 sections
              </div>
            </button>

            {/* Contact Page Sub-sections */}
            {expandedSections.contactPage && (
              <div className="bg-gray-50">
                {/* Contact Page Editor */}
                <Link
                  href="/admin/contact"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Contact Page Content Editor
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, trust indicators, contact info,
                        stats, and consultation section
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* FAQ Page Section */}
          <div className="border-t border-gray-200">
            {/* FAQ Page Header */}
            <button
              onClick={() => toggleSection("faqPage")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.faqPage ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      FAQ Management
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage FAQ page content and 110+ comprehensive questions
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                2 sections
              </div>
            </button>

            {/* FAQ Page Sub-sections */}
            {expandedSections.faqPage && (
              <div className="bg-gray-50">
                {/* FAQ Content Editor */}
                <Link
                  href="/admin/faq"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        FAQ Page Content
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero section, categories, contact info, and trust indicators
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
                
                {/* FAQ Questions Manager */}
                <Link
                  href="/admin/faq-questions"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors border-t border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        FAQ Questions Manager
                      </p>
                      <p className="text-xs text-gray-500">
                        Manage 110+ comprehensive FAQ questions with search and categories
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Services Pages Section */}
          <div className="border-t border-gray-200">
            {/* Services Pages Header */}
            <button
              onClick={() => toggleSection("servicesPages")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.servicesPages ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      Services Pages (13 services)
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage content for individual service pages
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                13 services
              </div>
            </button>

            {/* Services Pages Sub-sections */}
            {expandedSections.servicesPages && (
              <div className="bg-gray-50">
                {/* Deep Cleaning Service */}
                <Link
                  href="/admin/services/deep-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Deep Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, what's included, when to choose and all
                        content for the deep cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Routine Cleaning Service */}
                <Link
                  href="/admin/services/routine-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Routine Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, what's included, how it works and all content
                        for the routine cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Moving Cleaning Service */}
                <Link
                  href="/admin/services/moving-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Moving Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, what's included, benefits and all content for
                        the moving cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Airbnb Cleaning Service */}
                <Link
                  href="/admin/services/airbnb-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Airbnb Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, what's included, benefits and all content for
                        the Airbnb cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Extras Service */}
                <Link
                  href="/admin/services/extras-service"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Extras Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, extras and all content for
                        the extras service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Post-Construction Cleaning Service */}
                <Link
                  href="/admin/services/post-construction-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Post-Construction Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, what's included, process steps, safety
                        standards and all content for the post-construction
                        cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Office Cleaning Service */}
                <Link
                  href="/admin/services/office-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Office Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the office cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Medical Cleaning Service */}
                <Link
                  href="/admin/services/medical-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Medical Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the medical cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Retail Cleaning Service */}
                <Link
                  href="/admin/services/retail-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Retail Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the retail cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Gym Cleaning Service */}
                <Link
                  href="/admin/services/gym-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Gym Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the gym cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Property Cleaning Service */}
                <Link
                  href="/admin/services/property-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Property Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the property cleaning service
                        page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* School Cleaning Service */}
                <Link
                  href="/admin/services/school-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        School Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the school cleaning service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Other Commercial Cleaning Service */}
                <Link
                  href="/admin/services/other-commercial-cleaning"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Other Commercial Cleaning Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit hero, trust indicators, what's included, why choose
                        us and all content for the other commercial cleaning
                        service page
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Page Extras Section */}
          <div className="border-t border-gray-200">
            {/* Page Extras Header */}
            <button
              onClick={() => toggleSection("pageExtras")}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  {expandedSections.pageExtras ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-base font-semibold text-gray-900">
                      Page Extras
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage additional pages like Privacy Policy and Terms of Service
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                2 pages
              </div>
            </button>

            {/* Page Extras Sub-sections */}
            {expandedSections.pageExtras && (
              <div className="bg-gray-50">
                {/* Privacy Policy */}
                <Link
                  href="/admin/privacy-policy"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Privacy Policy
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit privacy policy content, sections, and company information
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Terms of Service */}
                <Link
                  href="/admin/terms-of-service"
                  className="block pl-12 pr-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#007bff]">
                        Terms of Service
                      </p>
                      <p className="text-xs text-gray-500">
                        Edit terms of service content, sections, and agreement information
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Welcome message */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 mt-6">
          <p className="text-gray-600">
            Welcome to the Clensy admin dashboard. This is where you'll be able
            to manage website content. Click on any section above to start
            editing.
          </p>
        </div>
      </main>
    </div>
  );
}
