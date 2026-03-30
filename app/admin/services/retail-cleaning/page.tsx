"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RetailCleaningData {
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

  // Entrances & Display Areas Section
  entrancesTitle: string;
  entrancesDescription: string;
  entrancesImage: string;
  entrancesFeatures: string[];

  // Sales Floor & Merchandise Areas Section
  salesFloorTitle: string;
  salesFloorDescription: string;
  salesFloorImage: string;
  salesFloorFeatures: string[];

  // Fitting Rooms & Customer Areas Section
  fittingRoomsTitle: string;
  fittingRoomsDescription: string;
  fittingRoomsImage: string;
  fittingRoomsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Flexible Scheduling
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Retail Experience
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Safe, Gentle Products
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function RetailCleaningAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<RetailCleaningData | null>({
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
    // Entrances & Display Areas Section
    entrancesTitle: "",
    entrancesDescription: "",
    entrancesImage: "",
    entrancesFeatures: [],
    // Sales Floor & Merchandise Areas Section
    salesFloorTitle: "",
    salesFloorDescription: "",
    salesFloorImage: "",
    salesFloorFeatures: [],
    // Fitting Rooms & Customer Areas Section
    fittingRoomsTitle: "",
    fittingRoomsDescription: "",
    fittingRoomsImage: "",
    fittingRoomsFeatures: [],
    // Why Choose Us Section
    whyChooseHeading: "",
    whyChooseSubheading: "",
    // Feature 1: Flexible Scheduling
    feature1Title: "",
    feature1Description: "",
    feature1Icon: "",
    // Feature 2: Retail Experience
    feature2Title: "",
    feature2Description: "",
    feature2Icon: "",
    // Feature 3: Safe, Gentle Products
    feature3Title: "",
    feature3Description: "",
    feature3Icon: "",
    faqs: [
      { question: "", answer: "" },
    ],
  });
  // FAQ Handlers
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    if (!data) return;
    setData({
      ...data,
      faqs: data.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    });
  };

  const addFaq = () => {
    if (!data) return;
    setData({ ...data, faqs: [...data.faqs, { question: '', answer: '' }] });
  };

  const removeFaq = (index: number) => {
    if (!data) return;
    setData({ ...data, faqs: data.faqs.filter((_, i) => i !== index) });
  };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/retail-cleaning");
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const response = await fetch("/api/cms/retail-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Data saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error saving data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof RetailCleaningData, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const updateArrayField = (
    field: keyof RetailCleaningData,
    index: number,
    value: string
  ) => {
    if (!data) return;
    const array = [...(data[field] as string[])];
    array[index] = value;
    setData({ ...data, [field]: array });
  };

  const addArrayItem = (field: keyof RetailCleaningData) => {
    if (!data) return;
    const array = [...(data[field] as string[]), ""];
    setData({ ...data, [field]: array });
  };

  const removeArrayItem = (field: keyof RetailCleaningData, index: number) => {
    if (!data) return;
    const array = (data[field] as string[]).filter((_, i) => i !== index);
    setData({ ...data, [field]: array });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Data
          </h1>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
          {data.faqs.map((faq, idx) => (
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
          ))}
        </div>
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Retail Cleaning Service
              </h1>
              <p className="text-gray-600">
                Manage content for the retail cleaning service page
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Label
                </label>
                <input
                  type="text"
                  value={data.heroTopLabel}
                  onChange={(e) => updateField("heroTopLabel", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("heroServiceDuration", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                onChange={(e) => updateField("heroHeading", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <textarea
                value={data.heroSubheading}
                onChange={(e) => updateField("heroSubheading", e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("heroBackgroundImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("heroServiceGuarantee", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Trust Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indicator 1 Number
                </label>
                <input
                  type="text"
                  value={data.trustIndicator1Number}
                  onChange={(e) =>
                    updateField("trustIndicator1Number", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator1Text", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator2Number", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator2Text", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator3Number", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator3Text", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator4Number", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    updateField("trustIndicator4Text", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
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
                    updateField("includedSectionHeading", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.includedSectionSubheading}
                  onChange={(e) =>
                    updateField("includedSectionSubheading", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Entrances & Display Areas Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Entrances & Display Areas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.entrancesTitle}
                  onChange={(e) =>
                    updateField("entrancesTitle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.entrancesDescription}
                  onChange={(e) =>
                    updateField("entrancesDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.entrancesImage}
                  onChange={(e) =>
                    updateField("entrancesImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.entrancesFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "entrancesFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("entrancesFeatures", index)
                      }
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("entrancesFeatures")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Sales Floor & Merchandise Areas Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Sales Floor & Merchandise Areas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.salesFloorTitle}
                  onChange={(e) =>
                    updateField("salesFloorTitle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.salesFloorDescription}
                  onChange={(e) =>
                    updateField("salesFloorDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.salesFloorImage}
                  onChange={(e) =>
                    updateField("salesFloorImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.salesFloorFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "salesFloorFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("salesFloorFeatures", index)
                      }
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("salesFloorFeatures")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Fitting Rooms & Customer Areas Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Fitting Rooms & Customer Areas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.fittingRoomsTitle}
                  onChange={(e) =>
                    updateField("fittingRoomsTitle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.fittingRoomsDescription}
                  onChange={(e) =>
                    updateField("fittingRoomsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.fittingRoomsImage}
                  onChange={(e) =>
                    updateField("fittingRoomsImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.fittingRoomsFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "fittingRoomsFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("fittingRoomsFeatures", index)
                      }
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("fittingRoomsFeatures")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
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
                    updateField("whyChooseHeading", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.whyChooseSubheading}
                  onChange={(e) =>
                    updateField("whyChooseSubheading", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Feature 1 */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                Feature 1: Flexible Scheduling
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.feature1Title}
                    onChange={(e) =>
                      updateField("feature1Title", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.feature1Description}
                    onChange={(e) =>
                      updateField("feature1Description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Lucide icon name)
                  </label>
                  <input
                    type="text"
                    value={data.feature1Icon}
                    onChange={(e) =>
                      updateField("feature1Icon", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                Feature 2: Retail Experience
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.feature2Title}
                    onChange={(e) =>
                      updateField("feature2Title", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.feature2Description}
                    onChange={(e) =>
                      updateField("feature2Description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Lucide icon name)
                  </label>
                  <input
                    type="text"
                    value={data.feature2Icon}
                    onChange={(e) =>
                      updateField("feature2Icon", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                Feature 3: Safe, Gentle Products
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.feature3Title}
                    onChange={(e) =>
                      updateField("feature3Title", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.feature3Description}
                    onChange={(e) =>
                      updateField("feature3Description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Lucide icon name)
                  </label>
                  <input
                    type="text"
                    value={data.feature3Icon}
                    onChange={(e) =>
                      updateField("feature3Icon", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center text-lg"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
