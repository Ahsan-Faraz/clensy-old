"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PropertyCleaningData {
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

  // Lobbies & Entrance Areas Section
  lobbiesTitle: string;
  lobbiesDescription: string;
  lobbiesImage: string;
  lobbiesFeatures: string[];

  // Hallways & Corridors Section
  hallwaysTitle: string;
  hallwaysDescription: string;
  hallwaysImage: string;
  hallwaysFeatures: string[];

  // Stairwells & Elevators Section
  stairwellsTitle: string;
  stairwellsDescription: string;
  stairwellsImage: string;
  stairwellsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Property Management Focus
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Reliable Scheduling
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Resident Satisfaction
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function PropertyCleaningAdminPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<PropertyCleaningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/api/auth/signin");
    }
  }, [status]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/property-cleaning");
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const response = await fetch("/api/cms/property-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Property cleaning data saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error saving data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof PropertyCleaningData, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const updateArrayField = (
    field: keyof PropertyCleaningData,
    index: number,
    value: string
  ) => {
    if (!data) return;
    const array = [...(data[field] as string[])];
    array[index] = value;
    setData({ ...data, [field]: array });
  };

  const addArrayItem = (field: keyof PropertyCleaningData) => {
    if (!data) return;
    const array = [...(data[field] as string[]), ""];
    setData({ ...data, [field]: array });
  };

  const removeArrayItem = (
    field: keyof PropertyCleaningData,
    index: number
  ) => {
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

  if (!session) {
    return null;
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
                Property Cleaning CMS
              </h1>
              <p className="text-gray-600 mt-2">
                Manage content for the property cleaning service page
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

        {/* Success/Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
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
                  onChange={(e) => updateField("heroTopLabel", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={data.heroHeading}
                  onChange={(e) => updateField("heroHeading", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheading
                </label>
                <textarea
                  value={data.heroSubheading}
                  onChange={(e) =>
                    updateField("heroSubheading", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Duration Text
                </label>
                <input
                  type="text"
                  value={data.heroServiceDuration}
                  onChange={(e) =>
                    updateField("heroServiceDuration", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Guarantee Text
                </label>
                <input
                  type="text"
                  value={data.heroServiceGuarantee}
                  onChange={(e) =>
                    updateField("heroServiceGuarantee", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
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
                    updateField("trustIndicator1Number", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Lobbies & Entrance Areas Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Lobbies & Entrance Areas
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.lobbiesTitle}
                    onChange={(e) =>
                      updateField("lobbiesTitle", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={data.lobbiesImage}
                    onChange={(e) =>
                      updateField("lobbiesImage", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.lobbiesDescription}
                  onChange={(e) =>
                    updateField("lobbiesDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <button
                    onClick={() => addArrayItem("lobbiesFeatures")}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                {data.lobbiesFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "lobbiesFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      onClick={() => removeArrayItem("lobbiesFeatures", index)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hallways & Corridors Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hallways & Corridors
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.hallwaysTitle}
                    onChange={(e) =>
                      updateField("hallwaysTitle", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={data.hallwaysImage}
                    onChange={(e) =>
                      updateField("hallwaysImage", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.hallwaysDescription}
                  onChange={(e) =>
                    updateField("hallwaysDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <button
                    onClick={() => addArrayItem("hallwaysFeatures")}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                {data.hallwaysFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "hallwaysFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      onClick={() => removeArrayItem("hallwaysFeatures", index)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stairwells & Elevators Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Stairwells & Elevators
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.stairwellsTitle}
                    onChange={(e) =>
                      updateField("stairwellsTitle", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={data.stairwellsImage}
                    onChange={(e) =>
                      updateField("stairwellsImage", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.stairwellsDescription}
                  onChange={(e) =>
                    updateField("stairwellsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <button
                    onClick={() => addArrayItem("stairwellsFeatures")}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                {data.stairwellsFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "stairwellsFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("stairwellsFeatures", index)
                      }
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Why Choose Us
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Feature 1 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Feature 1: Property Management Focus
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
                        updateField("feature1Title", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon (Building, Clock, Home, etc.)
                    </label>
                    <input
                      type="text"
                      value={data.feature1Icon}
                      onChange={(e) =>
                        updateField("feature1Icon", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      updateField("feature1Description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Feature 2: Reliable Scheduling
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
                        updateField("feature2Title", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon (Building, Clock, Home, etc.)
                    </label>
                    <input
                      type="text"
                      value={data.feature2Icon}
                      onChange={(e) =>
                        updateField("feature2Icon", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      updateField("feature2Description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Feature 3: Resident Satisfaction
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
                        updateField("feature3Title", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon (Building, Clock, Home, etc.)
                    </label>
                    <input
                      type="text"
                      value={data.feature3Icon}
                      onChange={(e) =>
                        updateField("feature3Icon", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      updateField("feature3Description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            FAQ Section
          </h2>
          
          {data?.faqs.map((faq, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  FAQ {index + 1}
                </h3>
                {data.faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newFaqs = data.faqs.filter((_, i) => i !== index);
                      setData({ ...data, faqs: newFaqs });
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const newFaqs = [...data.faqs];
                      newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                      setData({ ...data, faqs: newFaqs });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter FAQ question"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const newFaqs = [...data.faqs];
                      newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                      setData({ ...data, faqs: newFaqs });
                    }}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter FAQ answer"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => {
              setData({
                ...data!,
                faqs: [...data!.faqs, { question: "", answer: "" }],
              });
            }}
            className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </button>
        </div>

        {/* Save Button at Bottom */}
        <div className="mt-8 flex justify-end">
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
  );
}
