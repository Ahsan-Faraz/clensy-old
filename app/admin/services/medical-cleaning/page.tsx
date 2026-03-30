"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface MedicalCleaningData {
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

  // Reception & Waiting Areas Section
  receptionTitle: string;
  receptionDescription: string;
  receptionImage: string;
  receptionFeatures: string[];

  // Examination & Treatment Rooms Section
  examinationTitle: string;
  examinationDescription: string;
  examinationImage: string;
  examinationFeatures: string[];

  // Restrooms & Common Areas Section
  restroomsTitle: string;
  restroomsDescription: string;
  restroomsImage: string;
  restroomsFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Healthcare Compliance
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Specialized Training
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Advanced Technology
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function MedicalCleaningAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<MedicalCleaningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/medical-cleaning");
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
      const response = await fetch("/api/cms/medical-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Medical cleaning data saved successfully!");
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

  const updateField = (field: keyof MedicalCleaningData, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const updateArrayField = (
    field: keyof MedicalCleaningData,
    index: number,
    value: string
  ) => {
    if (!data) return;
    const currentArray = data[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setData({ ...data, [field]: newArray });
  };

  const addArrayItem = (field: keyof MedicalCleaningData) => {
    if (!data) return;
    const currentArray = data[field] as string[];
    setData({ ...data, [field]: [...currentArray, ""] });
  };

  const removeArrayItem = (field: keyof MedicalCleaningData, index: number) => {
    if (!data) return;
    const currentArray = data[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setData({ ...data, [field]: newArray });
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
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Medical Cleaning Service Editor
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow p-6">
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators Section */}
          <div className="bg-white rounded-lg shadow p-6">
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-lg shadow p-6">
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Reception & Waiting Areas Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Reception & Waiting Areas
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
                    updateField("receptionTitle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.receptionDescription}
                  onChange={(e) =>
                    updateField("receptionDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                    updateField("receptionImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                        updateArrayField(
                          "receptionFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("receptionFeatures", index)
                      }
                      className="p-3 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("receptionFeatures")}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Examination & Treatment Rooms Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Examination & Treatment Rooms
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.examinationTitle}
                  onChange={(e) =>
                    updateField("examinationTitle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.examinationDescription}
                  onChange={(e) =>
                    updateField("examinationDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.examinationImage}
                  onChange={(e) =>
                    updateField("examinationImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {data.examinationFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateArrayField(
                          "examinationFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("examinationFeatures", index)
                      }
                      className="p-3 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("examinationFeatures")}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Restrooms & Common Areas Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Restrooms & Common Areas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={data.restroomsTitle}
                  onChange={(e) =>
                    updateField("restroomsTitle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={data.restroomsDescription}
                  onChange={(e) =>
                    updateField("restroomsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                    updateField("restroomsImage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                        updateArrayField(
                          "restroomsFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button
                      onClick={() =>
                        removeArrayItem("restroomsFeatures", index)
                      }
                      className="p-3 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("restroomsFeatures")}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow p-6">
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Feature 1 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">
                  Feature 1: Healthcare Compliance
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
                      className="w-full p-3 border border-gray-300 rounded-lg"
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
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., Shield"
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
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">
                  Feature 2: Specialized Training
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
                      className="w-full p-3 border border-gray-300 rounded-lg"
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
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., Heart"
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
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">
                  Feature 3: Advanced Technology
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
                      className="w-full p-3 border border-gray-300 rounded-lg"
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
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., Activity"
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
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
