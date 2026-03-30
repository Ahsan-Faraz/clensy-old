"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OfficeCleaningData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // Trust Indicators Section
  trustIndicator1Number: string;
  trustIndicator1Text: string;
  trustIndicator2Number: string;
  trustIndicator2Text: string;
  trustIndicator3Number: string;
  trustIndicator3Text: string;
  trustIndicator4Number: string;
  trustIndicator4Text: string;

  // What's Included Section
  includedSectionHeading: string;
  includedSectionSubheading: string;

  // Reception & Common Areas Section
  receptionTitle: string;
  receptionDescription: string;
  receptionImage: string;
  receptionFeatures: string[];

  // Workstations & Office Areas Section
  workstationsTitle: string;
  workstationsDescription: string;
  workstationsImage: string;
  workstationsFeatures: string[];

  // Meeting & Conference Rooms Section
  meetingRoomsTitle: string;
  meetingRoomsDescription: string;
  meetingRoomsImage: string;
  meetingRoomsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Trained Professionals
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Flexible Scheduling
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Eco-Friendly Practices
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function OfficeCleaningAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<OfficeCleaningData>({
    // Hero Section
    heroTopLabel: "",
    heroHeading: "",
    heroSubheading: "",
    heroBackgroundImage: "",
    heroServiceDuration: "",
    heroServiceGuarantee: "",

    // Trust Indicators Section
    trustIndicator1Number: "",
    trustIndicator1Text: "",
    trustIndicator2Number: "",
    trustIndicator2Text: "",
    trustIndicator3Number: "",
    trustIndicator3Text: "",
    trustIndicator4Number: "",
    trustIndicator4Text: "",

    // What's Included Section
    includedSectionHeading: "",
    includedSectionSubheading: "",

    // Reception & Common Areas Section
    receptionTitle: "",
    receptionDescription: "",
    receptionImage: "",
    receptionFeatures: [],

    // Workstations & Office Areas Section
    workstationsTitle: "",
    workstationsDescription: "",
    workstationsImage: "",
    workstationsFeatures: [],

    // Meeting & Conference Rooms Section
    meetingRoomsTitle: "",
    meetingRoomsDescription: "",
    meetingRoomsImage: "",
    meetingRoomsFeatures: [],

    // Why Choose Us Section
    whyChooseHeading: "",
    whyChooseSubheading: "",

    // Feature 1: Trained Professionals
    feature1Title: "",
    feature1Description: "",
    feature1Icon: "",

    // Feature 2: Flexible Scheduling
    feature2Title: "",
    feature2Description: "",
    feature2Icon: "",

    // Feature 3: Eco-Friendly Practices
    feature3Title: "",
    feature3Description: "",
    feature3Icon: "",
    faqs: [
      { question: "", answer: "" },
    ],
  });
  // FAQ Handlers
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const addFaq = () => {
    setData((prev) => ({ ...prev, faqs: [...prev.faqs, { question: '', answer: '' }] }));
  };

  const removeFaq = (index: number) => {
    setData((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any).role !== "admin") {
      router.push("/");
      return;
    }

    fetchData();
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/office-cleaning");
      const result = await response.json();
      if (result.success) {
        // Ensure faqs is always an array
        setData({
          ...result.data,
          faqs: Array.isArray(result.data.faqs) ? result.data.faqs : [],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/cms/office-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Office cleaning data updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating data: " + result.error);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof OfficeCleaningData,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (
    field: keyof OfficeCleaningData,
    index: number,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: keyof OfficeCleaningData) => {
    setData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: keyof OfficeCleaningData, index: number) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Office Cleaning Service Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Edit content for the office cleaning service page
          </p>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            FAQs
            <button
              type="button"
              onClick={addFaq}
              className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" /> Add FAQ
            </button>
          </h2>
          {Array.isArray(data.faqs) && data.faqs.length > 0 ? (
            data.faqs.map((faq, idx) => (
              <div key={idx} className="mb-4 border-b pb-4 flex flex-col md:flex-row md:items-center gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={e => handleFaqChange(idx, 'question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={e => handleFaqChange(idx, 'answer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  title="Remove FAQ"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No FAQs available.</div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Label
                </label>
                <input
                  type="text"
                  value={data.heroTopLabel}
                  onChange={(e) =>
                    handleInputChange("heroTopLabel", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Duration
                </label>
                <input
                  type="text"
                  value={data.heroServiceDuration}
                  onChange={(e) =>
                    handleInputChange("heroServiceDuration", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                value={data.heroHeading}
                onChange={(e) =>
                  handleInputChange("heroHeading", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <textarea
                value={data.heroSubheading}
                onChange={(e) =>
                  handleInputChange("heroSubheading", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image URL
                </label>
                <input
                  type="url"
                  value={data.heroBackgroundImage}
                  onChange={(e) =>
                    handleInputChange("heroBackgroundImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Guarantee
                </label>
                <input
                  type="text"
                  value={data.heroServiceGuarantee}
                  onChange={(e) =>
                    handleInputChange("heroServiceGuarantee", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Trust Indicators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 1 Number
                </label>
                <input
                  type="text"
                  value={data.trustIndicator1Number}
                  onChange={(e) =>
                    handleInputChange("trustIndicator1Number", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 1 Text
                </label>
                <input
                  type="text"
                  value={data.trustIndicator1Text}
                  onChange={(e) =>
                    handleInputChange("trustIndicator1Text", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 2 Number
                </label>
                <input
                  type="text"
                  value={data.trustIndicator2Number}
                  onChange={(e) =>
                    handleInputChange("trustIndicator2Number", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 2 Text
                </label>
                <input
                  type="text"
                  value={data.trustIndicator2Text}
                  onChange={(e) =>
                    handleInputChange("trustIndicator2Text", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 3 Number
                </label>
                <input
                  type="text"
                  value={data.trustIndicator3Number}
                  onChange={(e) =>
                    handleInputChange("trustIndicator3Number", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 3 Text
                </label>
                <input
                  type="text"
                  value={data.trustIndicator3Text}
                  onChange={(e) =>
                    handleInputChange("trustIndicator3Text", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 4 Number
                </label>
                <input
                  type="text"
                  value={data.trustIndicator4Number}
                  onChange={(e) =>
                    handleInputChange("trustIndicator4Number", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 4 Text
                </label>
                <input
                  type="text"
                  value={data.trustIndicator4Text}
                  onChange={(e) =>
                    handleInputChange("trustIndicator4Text", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              What's Included Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.includedSectionHeading}
                  onChange={(e) =>
                    handleInputChange("includedSectionHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.includedSectionSubheading}
                  onChange={(e) =>
                    handleInputChange(
                      "includedSectionSubheading",
                      e.target.value
                    )
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Reception & Common Areas Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Reception & Common Areas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.receptionTitle}
                  onChange={(e) =>
                    handleInputChange("receptionTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.receptionDescription}
                  onChange={(e) =>
                    handleInputChange("receptionDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.receptionImage}
                  onChange={(e) =>
                    handleInputChange("receptionImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.receptionFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange(
                          "receptionFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem("receptionFeatures", index)
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("receptionFeatures")}
                  className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Workstations & Office Areas Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Workstations & Office Areas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.workstationsTitle}
                  onChange={(e) =>
                    handleInputChange("workstationsTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.workstationsDescription}
                  onChange={(e) =>
                    handleInputChange("workstationsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.workstationsImage}
                  onChange={(e) =>
                    handleInputChange("workstationsImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.workstationsFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange(
                          "workstationsFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem("workstationsFeatures", index)
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("workstationsFeatures")}
                  className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Meeting & Conference Rooms Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Meeting & Conference Rooms
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.meetingRoomsTitle}
                  onChange={(e) =>
                    handleInputChange("meetingRoomsTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.meetingRoomsDescription}
                  onChange={(e) =>
                    handleInputChange("meetingRoomsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.meetingRoomsImage}
                  onChange={(e) =>
                    handleInputChange("meetingRoomsImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.meetingRoomsFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange(
                          "meetingRoomsFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem("meetingRoomsFeatures", index)
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("meetingRoomsFeatures")}
                  className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Why Choose Us Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.whyChooseHeading}
                  onChange={(e) =>
                    handleInputChange("whyChooseHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.whyChooseSubheading}
                  onChange={(e) =>
                    handleInputChange("whyChooseSubheading", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Feature 1 */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                Feature 1: Trained Professionals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.feature1Title}
                    onChange={(e) =>
                      handleInputChange("feature1Title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={data.feature1Icon}
                    onChange={(e) =>
                      handleInputChange("feature1Icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Icon name (e.g., Users)"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.feature1Description}
                  onChange={(e) =>
                    handleInputChange("feature1Description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                Feature 2: Flexible Scheduling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.feature2Title}
                    onChange={(e) =>
                      handleInputChange("feature2Title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={data.feature2Icon}
                    onChange={(e) =>
                      handleInputChange("feature2Icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Icon name (e.g., Clock)"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.feature2Description}
                  onChange={(e) =>
                    handleInputChange("feature2Description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                Feature 3: Eco-Friendly Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.feature3Title}
                    onChange={(e) =>
                      handleInputChange("feature3Title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={data.feature3Icon}
                    onChange={(e) =>
                      handleInputChange("feature3Icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Icon name (e.g., Sparkles)"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.feature3Description}
                  onChange={(e) =>
                    handleInputChange("feature3Description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
