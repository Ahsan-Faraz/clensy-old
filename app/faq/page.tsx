"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  Clock,
  Shield,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section";
import { formatText } from "@/lib/utils/formatText";

// TypeScript interfaces
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  questions: FAQItem[];
}

interface StillHaveQuestionsCard {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: string;
}

interface TrustIndicator {
  number: string;
  description: string;
}

interface FAQData {
  heroSection: {
    topLabel: string;
    heading: string;
    description: string;
  };
  faqCategories: {
    general: FAQCategory;
  };
  stillHaveQuestionsSection: {
    heading: string;
    description: string;
    cards: StillHaveQuestionsCard[];
  };
  contactSection: {
    heading: string;
    description: string;
    emailSection: {
      heading: string;
      description: string;
      email: string;
    };
    callSection: {
      heading: string;
      description: string;
      phone: string;
    };
    contactButtonText: string;
  };
  trustIndicatorsSection: {
    indicators: TrustIndicator[];
  };
}

const defaultFAQData: FAQData = {
  heroSection: {
    topLabel: "Answers to your questions",
    heading: "Frequently Asked <blue>Questions</blue>",
    description:
      "Find answers to common questions about our cleaning services, booking process, and pricing. Can't find what you're looking for? Contact us directly for personalized assistance.",
  },
  faqCategories: {
    general: {
      name: "General Questions",
      questions: [
        {
          question: "What areas do you serve?",
          answer:
            "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties. We serve all major cities and towns within these counties.",
        },
        {
          question: "Are your cleaners background checked?",
          answer:
            "Yes, all of our cleaning professionals undergo thorough background checks before joining our team. We prioritize your safety and security, and only employ trustworthy individuals with verified credentials.",
        },
        {
          question: "Are you insured and bonded?",
          answer:
            "Yes, we are fully insured and bonded. This provides protection for both our clients and our team in the rare event of an accident or damage during service.",
        },
        {
          question: "What cleaning products do you use?",
          answer:
            "We use a combination of industry-grade professional cleaning products and eco-friendly options. If you have specific preferences or concerns about allergies, we're happy to accommodate your needs with alternative products.",
        },
        {
          question: "Do I need to be home during the cleaning?",
          answer:
            "No, you don't need to be home during the cleaning service. Many of our clients provide a key or access instructions. We ensure secure handling of all property access methods and can arrange for secure key return or storage.",
        },
      ],
    },
  },
  stillHaveQuestionsSection: {
    heading: "Still Have Questions?",
    description:
      "Here are some other topics our customers frequently ask about.",
    cards: [
      {
        title: "First-Time Customers",
        description:
          "Learn what to expect during your first cleaning appointment and how to prepare your space.",
        buttonText: "Get More Information",
        buttonLink: "/contact",
        icon: "clock",
      },
      {
        title: "Pricing & Estimates",
        description:
          "Learn more about our transparent pricing structure and how to get an accurate estimate for your property.",
        buttonText: "View Pricing",
        buttonLink: "#",
        icon: "credit-card",
      },
      {
        title: "Service Areas",
        description:
          "Find out if we service your area and learn about our coverage throughout Northern New Jersey.",
        buttonText: "Check Service Areas",
        buttonLink: "/locations/bergen",
        icon: "calendar",
      },
    ],
  },
  contactSection: {
    heading: "Can't Find Your Answer?",
    description:
      "Our customer service team is ready to help with any questions not addressed in our FAQ section. Contact us for personalized assistance.",
    emailSection: {
      heading: "Email Us",
      description: "Send us a message and we'll respond within 24 hours.",
      email: "info@clensy.com",
    },
    callSection: {
      heading: "Call Us",
      description: "Speak with our customer service team directly.",
      phone: "(551) 305-4081",
    },
    contactButtonText: "Contact Us",
  },
  trustIndicatorsSection: {
    indicators: [
      {
        number: "1000+",
        description: "Questions Answered",
      },
      {
        number: "24/7",
        description: "Online Support",
      },
      {
        number: "5.0",
        description: "Customer Satisfaction",
      },
      {
        number: "15+",
        description: "Years of Experience",
      },
    ],
  },
};


export default function FAQPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQs, setOpenFAQs] = useState<Record<string, boolean>>({});
  const [faqData, setFAQData] = useState<FAQData>(defaultFAQData);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // New comprehensive FAQ system state
  const [comprehensiveFAQs, setComprehensiveFAQs] = useState<any[]>([]);
  const [isLoadingFAQs, setIsLoadingFAQs] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loadMoreClicks, setLoadMoreClicks] = useState(0); // Track load more clicks
  const [questionsAfterFirstLoad, setQuestionsAfterFirstLoad] = useState<any[]>([]); // Track questions after first load more
  const [isHiding, setIsHiding] = useState(false); // Track hide loading state
  const faqSectionRef = useRef<HTMLDivElement>(null); // Ref for FAQ section
  
  // For load more/view all
  const DEFAULT_FAQ_LIMIT = 5;
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const COMPREHENSIVE_FAQ_LIMIT = 12;

  // Fetch comprehensive FAQs
  const fetchComprehensiveFAQs = async (page = 1, search = '', category = 'all', reset = false) => {
    try {
      setIsLoadingFAQs(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: COMPREHENSIVE_FAQ_LIMIT.toString(),
        search: search,
        category: category
      });

      const response = await fetch(`/api/cms/faq-questions?${params}`);
      const result = await response.json();

      if (result.success && result.data) {
        if (reset || page === 1) {
          setComprehensiveFAQs(result.data.questions);
        } else {
          // Ensure no duplicate questions by filtering out existing IDs
          setComprehensiveFAQs(prev => {
            const existingIds = new Set(prev.map(q => q._id));
            const newQuestions = result.data.questions.filter((q: any) => !existingIds.has(q._id));
            return [...prev, ...newQuestions];
          });
        }
        
        setHasMore(result.data.pagination.hasMore);
        setCurrentPage(result.data.pagination.currentPage);
        setTotalQuestions(result.data.pagination.totalQuestions);
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Error fetching comprehensive FAQs:", error);
    } finally {
      setIsLoadingFAQs(false);
    }
  };

  // Initialize comprehensive FAQs if they don't exist
  const initializeFAQs = async () => {
    try {
      const response = await fetch('/api/cms/faq-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initialize: true })
      });
      const result = await response.json();
      console.log('FAQ initialization:', result.message);
      
      // If duplicates were cleaned up, refresh the data
      if (result.message.includes('Cleaned')) {
        setTimeout(() => {
          fetchComprehensiveFAQs(1, '', 'all', true);
        }, 1000);
      }
    } catch (error) {
      console.error("Error initializing FAQs:", error);
    }
  };

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch("/api/cms/faq");
        const result = await response.json();

        if (result.success && result.data) {
          setFAQData(result.data);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchFAQData();
    
    // Initialize and fetch comprehensive FAQs
    initializeFAQs().then(() => {
      fetchComprehensiveFAQs(1, '', 'all', true);
    });
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery !== undefined) {
        fetchComprehensiveFAQs(1, searchQuery, selectedCategory, true);
        setCurrentPage(1);
        setLoadMoreClicks(0); // Reset load more clicks
        setQuestionsAfterFirstLoad([]); // Reset saved questions
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, selectedCategory]);

  const toggleFAQ = (id: string) => {
    setOpenFAQs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingFAQs) {
      // Save questions after first load more click
      if (loadMoreClicks === 0) {
        setQuestionsAfterFirstLoad([...comprehensiveFAQs]);
      }
      
      fetchComprehensiveFAQs(currentPage + 1, searchQuery, selectedCategory, false);
      setLoadMoreClicks((prev) => prev + 1);
    }
  };

  const handleHide = () => {
    setIsHiding(true);
    
    // Get the FAQ section position before hiding
    const faqSection = faqSectionRef.current;
    let targetScrollPosition = window.scrollY;
    
    if (faqSection) {
      const faqSectionTop = faqSection.offsetTop;
      const currentScrollY = window.scrollY;
      
      // If user is below the FAQ section, scroll to the FAQ section
      if (currentScrollY > faqSectionTop + 200) {
        targetScrollPosition = faqSectionTop + 100; // Scroll to FAQ section with some padding
      } else {
        targetScrollPosition = currentScrollY; // Keep current position if already in FAQ area
      }
    }
    
    // Use setTimeout to show loading state briefly
    setTimeout(() => {
      setComprehensiveFAQs(questionsAfterFirstLoad); // Hide to questions after first load more
      setLoadMoreClicks(1); // Reset to 1 click (after first load more)
      setCurrentPage(2); // Reset to page 2 since we're showing first load more results
      setHasMore(true); // Enable load more again
      setIsHiding(false);
      
      // Scroll to the calculated position after DOM updates
      setTimeout(() => {
        window.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth'
        });
      }, 50);
    }, 300); // Brief delay to show loading state
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setLoadMoreClicks(0); // Reset load more clicks
    setQuestionsAfterFirstLoad([]); // Reset saved questions
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const faqs = {
    general: faqData.faqCategories.general.questions,
  };

  // Enhanced filtering for search functionality
  const filteredFAQs = Object.entries(faqs).reduce(
    (acc, [category, questions]) => {
      if (searchQuery.trim() === "") {
        return { ...acc, [category]: questions };
      }

      const filtered = questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          // Enhanced search: also search within common keywords
          (searchQuery.toLowerCase().includes("clean") &&
            (faq.question.toLowerCase().includes("clean") ||
              faq.answer.toLowerCase().includes("clean"))) ||
          (searchQuery.toLowerCase().includes("price") &&
            (faq.question.toLowerCase().includes("cost") ||
              faq.answer.toLowerCase().includes("cost") ||
              faq.question.toLowerCase().includes("price") ||
              faq.answer.toLowerCase().includes("price"))) ||
          (searchQuery.toLowerCase().includes("service") &&
            (faq.question.toLowerCase().includes("service") ||
              faq.answer.toLowerCase().includes("service"))) ||
          (searchQuery.toLowerCase().includes("book") &&
            (faq.question.toLowerCase().includes("book") ||
              faq.answer.toLowerCase().includes("book") ||
              faq.question.toLowerCase().includes("schedule") ||
              faq.answer.toLowerCase().includes("schedule")))
      );

      return { ...acc, [category]: filtered };
    },
    {} as Record<string, FAQItem[]>
  );

  if (isLoadingData) {
    return (
      <main className="overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff]"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-black pt-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847616/shutterstock_2209715823_1_x80cn8.jpg"
            alt="Cleaning FAQ hero image"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[calc(60vh-64px)]">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6 px-6 py-2 bg-blue-600 rounded-lg"
              >
                <span className="text-white font-semibold text-sm uppercase tracking-wider">
                  {formatText(faqData.heroSection.topLabel)}
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 hero-text-shadow">
                {formatText(faqData.heroSection.heading)}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg text-white/80 mb-8"
              >
                {formatText(faqData.heroSection.description)}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSectionRef} className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Search Bar */}
            <div className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search from 110+ questions about cleaning, pricing, booking, and more..."
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <span className="text-gray-400 hover:text-gray-600">
                      Clear
                    </span>
                  </button>
                )}
              </div>
              
              {/* Category Filter */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories {totalQuestions > 0 && `(${totalQuestions})`}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formatCategoryName(category)}
                  </button>
                ))}
              </div>
              
              {searchQuery && (
                <div className="mt-2 text-center text-sm text-gray-600">
                  Showing FAQ results for "{searchQuery}"
                </div>
              )}
            </div>

            {/* Comprehensive FAQ Questions Display */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {searchQuery ? `Search Results` : selectedCategory === 'all' ? 'All Questions' : formatCategoryName(selectedCategory)}
              </h2>

              {/* Comprehensive FAQ Items */}
              <div className="space-y-6">
                {comprehensiveFAQs.map((faq, index) => (
                  <motion.div
                    key={faq._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(faq._id)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {formatCategoryName(faq.category)}
                          </span>
                          {faq.tags && faq.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                            <span
                              key={`${faq._id}-${tag}-${tagIndex}`}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {openFAQs[faq._id] ? (
                        <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQs[faq._id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-8 pb-6"
                      >
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed">
                            {formatText(faq.answer)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Load More and Hide Buttons */}
              <div className="text-center mt-12">
                <div className="flex justify-center gap-4 flex-wrap">
                  {/* Load More Button - Only show if there are more questions */}
                  {hasMore && !isHiding && (
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingFAQs}
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingFAQs ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Questions
                          <ChevronDown className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  )}

                  {/* Hide Button - Only show after 2 load more clicks */}
                  {loadMoreClicks >= 2 && !isLoadingFAQs && (
                    <button
                      onClick={handleHide}
                      disabled={isHiding}
                      className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isHiding ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600 mr-2"></div>
                          Hiding...
                        </>
                      ) : (
                        <>
                          Hide
                          <ChevronDown className="ml-2 h-5 w-5 rotate-180" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>



              {/* No Results */}
              {comprehensiveFAQs.length === 0 && !isLoadingFAQs && (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                    <Search className="h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchQuery ? 'No results found' : 'No questions available'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery 
                      ? 'Try adjusting your search terms or browse our categories.'
                      : 'Questions will appear here once they are added.'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Clear search to see all questions
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {formatText(faqData.stillHaveQuestionsSection.heading)}
            </h2>
            <p className="text-lg text-gray-600">
              {formatText(faqData.stillHaveQuestionsSection.description)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {faqData.stillHaveQuestionsSection.cards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {card.icon === "clock" && (
                    <Clock className="h-8 w-8 text-blue-600" />
                  )}
                  {card.icon === "credit-card" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  )}
                  {card.icon === "calendar" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {formatText(card.title)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formatText(card.description)}
                </p>
                <Link
                  href={card.buttonLink}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center"
                >
                  {card.buttonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gray-900 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {formatText(faqData.contactSection.heading)}
                </h2>
                <p className="text-white/80 mb-8">
                  {formatText(faqData.contactSection.description)}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {formatText(
                          faqData.contactSection.emailSection.heading
                        )}
                      </h3>
                      <p className="text-white/70">
                        {formatText(
                          faqData.contactSection.emailSection.description
                        )}
                      </p>
                      <a
                        href={`mailto:${faqData.contactSection.emailSection.email}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors mt-1 inline-block"
                      >
                        {faqData.contactSection.emailSection.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {formatText(faqData.contactSection.callSection.heading)}
                      </h3>
                      <p className="text-white/70">
                        {formatText(
                          faqData.contactSection.callSection.description
                        )}
                      </p>
                      <a
                        href={`tel:${faqData.contactSection.callSection.phone.replace(
                          /[^\d]/g,
                          ""
                        )}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors mt-1 inline-block"
                      >
                        {faqData.contactSection.callSection.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-3 rounded-lg text-sm font-medium inline-flex items-center transition-all duration-300"
                  >
                    {faqData.contactSection.contactButtonText}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative">
                <Image
                  src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=870&auto=format&fit=crop"
                  alt="Customer service representative"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {faqData.trustIndicatorsSection.indicators.map(
              (indicator, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-black mb-2">
                    {indicator.number}
                  </div>
                  {index === 2 && (
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                    </div>
                  )}
                  <p className="text-gray-600">{indicator.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection />

      <Footer />
    </main>
  );
}
