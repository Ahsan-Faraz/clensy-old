"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface GymCleaningData {
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

  // Equipment & Workout Areas Section
  equipmentTitle: string;
  equipmentDescription: string;
  equipmentImage: string;
  equipmentFeatures: string[];

  // Locker Rooms & Shower Facilities Section
  lockerRoomsTitle: string;
  lockerRoomsDescription: string;
  lockerRoomsImage: string;
  lockerRoomsFeatures: string[];

  // Studio & Class Spaces Section
  studioTitle: string;
  studioDescription: string;
  studioImage: string;
  studioFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Specialized Sanitization
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: 24/7 Flexibility
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Health-Focused Approach
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function GymCleaningAdmin() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<GymCleaningData | null>(null);
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
      const response = await fetch("/api/cms/gym-cleaning");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/cms/gym-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Gym cleaning data updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error updating data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (
    field: keyof GymCleaningData,
    value: string | string[]
  ) => {
    if (data) {
      setData({ ...data, [field]: value });
    }
  };

  const addFeature = (
    section: "equipmentFeatures" | "lockerRoomsFeatures" | "studioFeatures"
  ) => {
    if (data) {
      const currentFeatures = data[section] || [];
      setData({ ...data, [section]: [...currentFeatures, ""] });
    }
  };

  const removeFeature = (
    section: "equipmentFeatures" | "lockerRoomsFeatures" | "studioFeatures",
    index: number
  ) => {
    if (data) {
      const currentFeatures = data[section] || [];
      const newFeatures = currentFeatures.filter((_, i) => i !== index);
      setData({ ...data, [section]: newFeatures });
    }
  };

  const updateFeature = (
    section: "equipmentFeatures" | "lockerRoomsFeatures" | "studioFeatures",
    index: number,
    value: string
  ) => {
    if (data) {
      const currentFeatures = [...(data[section] || [])];
      currentFeatures[index] = value;
      setData({ ...data, [section]: currentFeatures });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Gym Cleaning Service - Content Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all content for the gym cleaning service page
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hero Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Hero Section
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Label
                  </label>
                  <input
                    type="text"
                    value={data.heroTopLabel}
                    onChange={(e) =>
                      updateField("heroTopLabel", e.target.value)
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
                      updateField("heroServiceDuration", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      updateField("heroServiceGuarantee", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Trust Indicators Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Trust Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      updateField("trustIndicator1Text", e.target.value)
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
                      updateField("trustIndicator2Number", e.target.value)
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
                      updateField("trustIndicator2Text", e.target.value)
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
                      updateField("trustIndicator3Number", e.target.value)
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
                      updateField("trustIndicator3Text", e.target.value)
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
                      updateField("trustIndicator4Number", e.target.value)
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
                      updateField("trustIndicator4Text", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* What's Included Section */}
            <div className="border-b border-gray-200 pb-8">
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
                      updateField("includedSectionSubheading", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Equipment & Workout Areas Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Equipment & Workout Areas
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.equipmentTitle}
                    onChange={(e) =>
                      updateField("equipmentTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.equipmentDescription}
                    onChange={(e) =>
                      updateField("equipmentDescription", e.target.value)
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
                    value={data.equipmentImage}
                    onChange={(e) =>
                      updateField("equipmentImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.equipmentFeatures?.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature(
                            "equipmentFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFeature("equipmentFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("equipmentFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Locker Rooms & Shower Facilities Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Locker Rooms & Shower Facilities
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.lockerRoomsTitle}
                    onChange={(e) =>
                      updateField("lockerRoomsTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.lockerRoomsDescription}
                    onChange={(e) =>
                      updateField("lockerRoomsDescription", e.target.value)
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
                    value={data.lockerRoomsImage}
                    onChange={(e) =>
                      updateField("lockerRoomsImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.lockerRoomsFeatures?.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature(
                            "lockerRoomsFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFeature("lockerRoomsFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("lockerRoomsFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Studio & Class Spaces Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Studio & Class Spaces
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.studioTitle}
                    onChange={(e) => updateField("studioTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.studioDescription}
                    onChange={(e) =>
                      updateField("studioDescription", e.target.value)
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
                    value={data.studioImage}
                    onChange={(e) => updateField("studioImage", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.studioFeatures?.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature("studioFeatures", index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature("studioFeatures", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("studioFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
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
                      updateField("whyChooseSubheading", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Feature 1 */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Feature 1: Specialized Sanitization
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
                        updateField("feature1Icon", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={data.feature1Description}
                      onChange={(e) =>
                        updateField("feature1Description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Feature 2: 24/7 Flexibility
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
                        updateField("feature2Icon", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={data.feature2Description}
                      onChange={(e) =>
                        updateField("feature2Description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Feature 3: Health-Focused Approach
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
                        updateField("feature3Icon", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={data.feature3Description}
                      onChange={(e) =>
                        updateField("feature3Description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                        Remove
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
                Add FAQ
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
