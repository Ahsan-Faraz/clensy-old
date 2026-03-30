"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  HelpCircle,
  Mail,
  Phone,
  Star,
  Users,
  CheckCircle,
  Clock,
  CreditCard,
  Calendar,
} from "lucide-react";

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

interface FormData {
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

const iconOptions = ["clock", "credit-card", "calendar"];

export default function FAQEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeSection, setActiveSection] = useState("hero");

  // Form state with default values
  const [formData, setFormData] = useState<FormData>({
    heroSection: {
      topLabel: "",
      heading: "",
      description: "",
    },
    faqCategories: {
      general: { name: "", questions: [] },
    },
    stillHaveQuestionsSection: {
      heading: "",
      description: "",
      cards: [],
    },
    contactSection: {
      heading: "",
      description: "",
      emailSection: {
        heading: "",
        description: "",
        email: "",
      },
      callSection: {
        heading: "",
        description: "",
        phone: "",
      },
      contactButtonText: "",
    },
    trustIndicatorsSection: {
      indicators: [],
    },
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/faq");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: "error", text: "Failed to load FAQ data" });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save data
  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/cms/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: "FAQ content updated successfully!",
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update FAQ content",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ type: "error", text: "An error occurred while saving" });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle basic input changes
  const handleBasicChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData],
        [field]: value,
      },
    }));
  };

  // Handle nested input changes
  const handleNestedChange = (path: string[], value: string) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;

      for (let i = 0; i < path.length - 1; i++) {
        if (Array.isArray(current[path[i]])) {
          current[path[i]] = [...current[path[i]]];
        } else {
          current[path[i]] = { ...current[path[i]] };
        }
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  // Handle FAQ question/answer changes
  const handleFAQChange = (
    questionIndex: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      faqCategories: {
        ...prev.faqCategories,
        general: {
          ...prev.faqCategories.general,
          questions: prev.faqCategories.general.questions.map((q, i) =>
            i === questionIndex ? { ...q, [field]: value } : q
          ),
        },
      },
    }));
  };

  // Add new FAQ question
  const addFAQQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      faqCategories: {
        ...prev.faqCategories,
        general: {
          ...prev.faqCategories.general,
          questions: [
            ...prev.faqCategories.general.questions,
            { question: "", answer: "" },
          ],
        },
      },
    }));
  };

  // Remove FAQ question
  const removeFAQQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqCategories: {
        ...prev.faqCategories,
        general: {
          ...prev.faqCategories.general,
          questions: prev.faqCategories.general.questions.filter(
            (_, i) => i !== index
          ),
        },
      },
    }));
  };

  // Add card
  const addCard = () => {
    setFormData((prev) => ({
      ...prev,
      stillHaveQuestionsSection: {
        ...prev.stillHaveQuestionsSection,
        cards: [
          ...prev.stillHaveQuestionsSection.cards,
          {
            title: "",
            description: "",
            buttonText: "",
            buttonLink: "",
            icon: "clock",
          },
        ],
      },
    }));
  };

  // Remove card
  const removeCard = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stillHaveQuestionsSection: {
        ...prev.stillHaveQuestionsSection,
        cards: prev.stillHaveQuestionsSection.cards.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Add trust indicator
  const addTrustIndicator = () => {
    setFormData((prev) => ({
      ...prev,
      trustIndicatorsSection: {
        ...prev.trustIndicatorsSection,
        indicators: [
          ...prev.trustIndicatorsSection.indicators,
          { number: "", description: "" },
        ],
      },
    }));
  };

  // Remove trust indicator
  const removeTrustIndicator = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      trustIndicatorsSection: {
        ...prev.trustIndicatorsSection,
        indicators: prev.trustIndicatorsSection.indicators.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Check authentication and load data
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/protected");
    } else if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="inline-flex items-center text-[#007bff] hover:text-blue-700 mr-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Admin
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  FAQ Page Management
                </h1>
                <p className="text-gray-600">
                  Manage your FAQ page content, questions, and all sections
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <HelpCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          </motion.div>
        )}

        <form onSubmit={saveData} className="space-y-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {[
                  { id: "hero", name: "Hero Section", icon: Users },
                  { id: "faq", name: "FAQ Questions", icon: HelpCircle },
                  {
                    id: "stillHaveQuestions",
                    name: "Still Have Questions",
                    icon: CheckCircle,
                  },
                  { id: "contact", name: "Contact Section", icon: Phone },
                  {
                    id: "trustIndicators",
                    name: "Trust Indicators",
                    icon: Star,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveSection(tab.id)}
                    className={`${
                      activeSection === tab.id
                        ? "border-[#007bff] text-[#007bff]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Hero Section */}
            {activeSection === "hero" && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-[#007bff]" />
                  Hero Section
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Top Label
                    </label>
                    <input
                      type="text"
                      value={formData.heroSection.topLabel}
                      onChange={(e) =>
                        handleBasicChange(
                          "heroSection",
                          "topLabel",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                      placeholder="e.g., Answers to your questions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={formData.heroSection.heading}
                      onChange={(e) =>
                        handleBasicChange(
                          "heroSection",
                          "heading",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                      placeholder="e.g., Frequently Asked <blue>Questions</blue>"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Use &lt;blue&gt;&lt;/blue&gt; tags to highlight text in
                      blue
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.heroSection.description}
                      onChange={(e) =>
                        handleBasicChange(
                          "heroSection",
                          "description",
                          e.target.value
                        )
                      }
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                      placeholder="Brief description of the FAQ section"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Questions Section */}
            {activeSection === "faq" && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-3 text-[#007bff]" />
                  FAQ Questions
                </h2>

                {/* Category Name */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.faqCategories.general.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        faqCategories: {
                          ...prev.faqCategories,
                          general: {
                            ...prev.faqCategories.general,
                            name: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                    placeholder="e.g., General Questions"
                  />
                </div>

                {/* Questions */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Questions & Answers (
                      {formData.faqCategories.general.questions.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addFAQQuestion}
                      className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </button>
                  </div>

                  {formData.faqCategories.general.questions.map(
                    (faq, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Question {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFAQQuestion(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) =>
                                handleFAQChange(
                                  index,
                                  "question",
                                  e.target.value
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              placeholder="Enter your question here"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Answer
                            </label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) =>
                                handleFAQChange(index, "answer", e.target.value)
                              }
                              rows={4}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              placeholder="Enter your detailed answer here"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {formData.faqCategories.general.questions.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 mb-4">
                        No questions added yet.
                      </p>
                      <button
                        type="button"
                        onClick={addFAQQuestion}
                        className="bg-[#007bff] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Add First Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Still Have Questions Section */}
            {activeSection === "stillHaveQuestions" && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-[#007bff]" />
                  Still Have Questions Section
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={formData.stillHaveQuestionsSection.heading}
                        onChange={(e) =>
                          handleNestedChange(
                            ["stillHaveQuestionsSection", "heading"],
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                        placeholder="e.g., Still Have Questions?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Description
                      </label>
                      <input
                        type="text"
                        value={formData.stillHaveQuestionsSection.description}
                        onChange={(e) =>
                          handleNestedChange(
                            ["stillHaveQuestionsSection", "description"],
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                        placeholder="Brief description"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Information Cards
                      </h3>
                      <button
                        type="button"
                        onClick={addCard}
                        className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Card
                      </button>
                    </div>

                    {formData.stillHaveQuestionsSection.cards.map(
                      (card, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-gray-900">
                              Card {index + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeCard(index)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <input
                                type="text"
                                value={card.title}
                                onChange={(e) =>
                                  handleNestedChange(
                                    [
                                      "stillHaveQuestionsSection",
                                      "cards",
                                      index.toString(),
                                      "title",
                                    ],
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icon
                              </label>
                              <select
                                value={card.icon}
                                onChange={(e) =>
                                  handleNestedChange(
                                    [
                                      "stillHaveQuestionsSection",
                                      "cards",
                                      index.toString(),
                                      "icon",
                                    ],
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              >
                                {iconOptions.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon.charAt(0).toUpperCase() +
                                      icon.slice(1).replace("-", " ")}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={card.description}
                              onChange={(e) =>
                                handleNestedChange(
                                  [
                                    "stillHaveQuestionsSection",
                                    "cards",
                                    index.toString(),
                                    "description",
                                  ],
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                              </label>
                              <input
                                type="text"
                                value={card.buttonText}
                                onChange={(e) =>
                                  handleNestedChange(
                                    [
                                      "stillHaveQuestionsSection",
                                      "cards",
                                      index.toString(),
                                      "buttonText",
                                    ],
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Link
                              </label>
                              <input
                                type="text"
                                value={card.buttonLink}
                                onChange={(e) =>
                                  handleNestedChange(
                                    [
                                      "stillHaveQuestionsSection",
                                      "cards",
                                      index.toString(),
                                      "buttonLink",
                                    ],
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                                placeholder="e.g., /contact"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === "contact" && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-[#007bff]" />
                  Contact Section
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={formData.contactSection.heading}
                        onChange={(e) =>
                          handleNestedChange(
                            ["contactSection", "heading"],
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Button Text
                      </label>
                      <input
                        type="text"
                        value={formData.contactSection.contactButtonText}
                        onChange={(e) =>
                          handleNestedChange(
                            ["contactSection", "contactButtonText"],
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Description
                    </label>
                    <textarea
                      value={formData.contactSection.description}
                      onChange={(e) =>
                        handleNestedChange(
                          ["contactSection", "description"],
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Section
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Heading
                          </label>
                          <input
                            type="text"
                            value={formData.contactSection.emailSection.heading}
                            onChange={(e) =>
                              handleNestedChange(
                                ["contactSection", "emailSection", "heading"],
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Description
                          </label>
                          <input
                            type="text"
                            value={
                              formData.contactSection.emailSection.description
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                [
                                  "contactSection",
                                  "emailSection",
                                  "description",
                                ],
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.contactSection.emailSection.email}
                            onChange={(e) =>
                              handleNestedChange(
                                ["contactSection", "emailSection", "email"],
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Call Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                        <Phone className="h-5 w-5 mr-2" />
                        Call Section
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Call Heading
                          </label>
                          <input
                            type="text"
                            value={formData.contactSection.callSection.heading}
                            onChange={(e) =>
                              handleNestedChange(
                                ["contactSection", "callSection", "heading"],
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Call Description
                          </label>
                          <input
                            type="text"
                            value={
                              formData.contactSection.callSection.description
                            }
                            onChange={(e) =>
                              handleNestedChange(
                                [
                                  "contactSection",
                                  "callSection",
                                  "description",
                                ],
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.contactSection.callSection.phone}
                            onChange={(e) =>
                              handleNestedChange(
                                ["contactSection", "callSection", "phone"],
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Indicators Section */}
            {activeSection === "trustIndicators" && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-3 text-[#007bff]" />
                  Trust Indicators
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Indicators
                    </h3>
                    <button
                      type="button"
                      onClick={addTrustIndicator}
                      className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Indicator
                    </button>
                  </div>

                  {formData.trustIndicatorsSection.indicators.map(
                    (indicator, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Indicator {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeTrustIndicator(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Number/Value
                            </label>
                            <input
                              type="text"
                              value={indicator.number}
                              onChange={(e) =>
                                handleNestedChange(
                                  [
                                    "trustIndicatorsSection",
                                    "indicators",
                                    index.toString(),
                                    "number",
                                  ],
                                  e.target.value
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              placeholder="e.g., 1000+ or 5.0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <input
                              type="text"
                              value={indicator.description}
                              onChange={(e) =>
                                handleNestedChange(
                                  [
                                    "trustIndicatorsSection",
                                    "indicators",
                                    index.toString(),
                                    "description",
                                  ],
                                  e.target.value
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                              placeholder="e.g., Questions Answered"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Remember to save your changes before leaving this page.
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#007bff] text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
