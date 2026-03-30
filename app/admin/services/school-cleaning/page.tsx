"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SchoolCleaningData {
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

  // Classrooms & Learning Spaces Section
  classroomsTitle: string;
  classroomsDescription: string;
  classroomsImage: string;
  classroomsFeatures: string[];

  // Cafeterias & Food Service Areas Section
  cafeteriasTitle: string;
  cafeteriasDescription: string;
  cafeteriasImage: string;
  cafeteriasFeatures: string[];

  // Restrooms & Common Areas Section
  restroomsTitle: string;
  restroomsDescription: string;
  restroomsImage: string;
  restroomsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Child-Safe Products
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Flexible Scheduling
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

export default function SchoolCleaningAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<SchoolCleaningData | null>(null);
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
      const response = await fetch("/api/cms/school-cleaning");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/cms/school-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("School cleaning data updated successfully!");
      } else {
        setMessage("Error updating data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const updateData = (field: keyof SchoolCleaningData, value: any) => {
    if (data) {
      setData({ ...data, [field]: value });
    }
  };

  const addFeature = (
    section: "classroomsFeatures" | "cafeteriasFeatures" | "restroomsFeatures"
  ) => {
    if (data) {
      const newFeatures = [...data[section], ""];
      setData({ ...data, [section]: newFeatures });
    }
  };

  const removeFeature = (
    section: "classroomsFeatures" | "cafeteriasFeatures" | "restroomsFeatures",
    index: number
  ) => {
    if (data) {
      const newFeatures = data[section].filter((_, i) => i !== index);
      setData({ ...data, [section]: newFeatures });
    }
  };

  const updateFeature = (
    section: "classroomsFeatures" | "cafeteriasFeatures" | "restroomsFeatures",
    index: number,
    value: string
  ) => {
    if (data) {
      const newFeatures = [...data[section]];
      newFeatures[index] = value;
      setData({ ...data, [section]: newFeatures });
    }
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
    return <div>Error loading data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            School Cleaning Service - Content Management
          </h1>

          {message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Label
                  </label>
                  <input
                    type="text"
                    value={data.heroTopLabel}
                    onChange={(e) => updateData("heroTopLabel", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={data.heroHeading}
                    onChange={(e) => updateData("heroHeading", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subheading
                  </label>
                  <textarea
                    value={data.heroSubheading}
                    onChange={(e) =>
                      updateData("heroSubheading", e.target.value)
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
                      updateData("heroBackgroundImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Duration
                    </label>
                    <input
                      type="text"
                      value={data.heroServiceDuration}
                      onChange={(e) =>
                        updateData("heroServiceDuration", e.target.value)
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
                        updateData("heroServiceGuarantee", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Trust Indicators</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indicator 1 Number
                  </label>
                  <input
                    type="text"
                    value={data.trustIndicator1Number}
                    onChange={(e) =>
                      updateData("trustIndicator1Number", e.target.value)
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
                      updateData("trustIndicator1Text", e.target.value)
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
                      updateData("trustIndicator2Number", e.target.value)
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
                      updateData("trustIndicator2Text", e.target.value)
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
                      updateData("trustIndicator3Number", e.target.value)
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
                      updateData("trustIndicator3Text", e.target.value)
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
                      updateData("trustIndicator4Number", e.target.value)
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
                      updateData("trustIndicator4Text", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* What's Included Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                What's Included Section
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={data.includedSectionHeading}
                    onChange={(e) =>
                      updateData("includedSectionHeading", e.target.value)
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
                      updateData("includedSectionSubheading", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Classrooms & Learning Spaces Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Classrooms & Learning Spaces
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.classroomsTitle}
                    onChange={(e) =>
                      updateData("classroomsTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.classroomsDescription}
                    onChange={(e) =>
                      updateData("classroomsDescription", e.target.value)
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
                    value={data.classroomsImage}
                    onChange={(e) =>
                      updateData("classroomsImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.classroomsFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature(
                            "classroomsFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFeature("classroomsFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("classroomsFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Cafeterias & Food Service Areas Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Cafeterias & Food Service Areas
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.cafeteriasTitle}
                    onChange={(e) =>
                      updateData("cafeteriasTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.cafeteriasDescription}
                    onChange={(e) =>
                      updateData("cafeteriasDescription", e.target.value)
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
                    value={data.cafeteriasImage}
                    onChange={(e) =>
                      updateData("cafeteriasImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.cafeteriasFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature(
                            "cafeteriasFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFeature("cafeteriasFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("cafeteriasFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Restrooms & Common Areas Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Restrooms & Common Areas
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.restroomsTitle}
                    onChange={(e) =>
                      updateData("restroomsTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.restroomsDescription}
                    onChange={(e) =>
                      updateData("restroomsDescription", e.target.value)
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
                    value={data.restroomsImage}
                    onChange={(e) =>
                      updateData("restroomsImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.restroomsFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          updateFeature(
                            "restroomsFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFeature("restroomsFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("restroomsFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Why Choose Us Section
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={data.whyChooseHeading}
                    onChange={(e) =>
                      updateData("whyChooseHeading", e.target.value)
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
                      updateData("whyChooseSubheading", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Feature 1 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Feature 1: Child-Safe Products
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={data.feature1Title}
                        onChange={(e) =>
                          updateData("feature1Title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={data.feature1Description}
                        onChange={(e) =>
                          updateData("feature1Description", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon URL
                      </label>
                      <input
                        type="url"
                        value={data.feature1Icon}
                        onChange={(e) =>
                          updateData("feature1Icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Feature 2: Flexible Scheduling
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={data.feature2Title}
                        onChange={(e) =>
                          updateData("feature2Title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={data.feature2Description}
                        onChange={(e) =>
                          updateData("feature2Description", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon URL
                      </label>
                      <input
                        type="url"
                        value={data.feature2Icon}
                        onChange={(e) =>
                          updateData("feature2Icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Feature 3: Health-Focused Approach
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={data.feature3Title}
                        onChange={(e) =>
                          updateData("feature3Title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={data.feature3Description}
                        onChange={(e) =>
                          updateData("feature3Description", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon URL
                      </label>
                      <input
                        type="url"
                        value={data.feature3Icon}
                        onChange={(e) =>
                          updateData("feature3Icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
