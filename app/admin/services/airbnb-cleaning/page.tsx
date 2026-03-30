"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface FormData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // What's Included Section
  includedSectionHeading: string;
  includedSectionSubheading: string;

  // Guest-Ready Bedrooms Section
  bedroomsTitle: string;
  bedroomsDescription: string;
  bedroomsImage: string;
  bedroomsFeatures: string[];

  // Spotless Bathrooms Section
  bathroomsTitle: string;
  bathroomsDescription: string;
  bathroomsImage: string;
  bathroomsFeatures: string[];

  // Kitchen Excellence Section
  kitchenTitle: string;
  kitchenDescription: string;
  kitchenImage: string;
  kitchenFeatures: string[];

  // Before & After Section
  beforeAfterHeading: string;
  beforeAfterSubheading: string;
  airBNBCleaningDifference: Array<{
    heading: string;
    beforeImage: string;
    afterImage: string;
    caption: string;
  }>;

  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;


  // Benefit 1: Higher Ratings
  benefit1Title: string;
  benefit1Description: string;
  benefit1Icon: string;

  // Benefit 2: Efficient Turnovers
  benefit2Title: string;
  benefit2Description: string;
  benefit2Icon: string;

  // Benefit 3: Delighted Guests
  benefit3Title: string;
  benefit3Description: string;
  benefit3Icon: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function AirbnbCleaningAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    // Hero Section
    heroTopLabel: "",
    heroHeading: "",
    heroSubheading: "",
    heroBackgroundImage: "",
    heroServiceDuration: "",
    heroServiceGuarantee: "",

    // What's Included Section
    includedSectionHeading: "",
    includedSectionSubheading: "",

    // Guest-Ready Bedrooms Section
    bedroomsTitle: "",
    bedroomsDescription: "",
    bedroomsImage: "",
    bedroomsFeatures: [],

    // Spotless Bathrooms Section
    bathroomsTitle: "",
    bathroomsDescription: "",
    bathroomsImage: "",
    bathroomsFeatures: [],

    // Kitchen Excellence Section
    kitchenTitle: "",
    kitchenDescription: "",
    kitchenImage: "",
    kitchenFeatures: [],

    // Before & After Section
    beforeAfterHeading: "",
    beforeAfterSubheading: "",
    airBNBCleaningDifference: [
      {
        heading: "",
        beforeImage: "",
        afterImage: "",
        caption: "",
      },
    ],

    // Benefits Section
    benefitsHeading: "",
    benefitsSubheading: "",

    // Benefit 1: Higher Ratings
    benefit1Title: "",
    benefit1Description: "",
    benefit1Icon: "",

    // Benefit 2: Efficient Turnovers
    benefit2Title: "",
    benefit2Description: "",
    benefit2Icon: "",

    // Benefit 3: Delighted Guests
    benefit3Title: "",
    benefit3Description: "",
    benefit3Icon: "",

    // FAQ Section
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
  });

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
      const response = await fetch("/api/cms/airbnb-cleaning");
      const result = await response.json();
      if (result.success) {
        setFormData(result.data);
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
      const response = await fetch("/api/cms/airbnb-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Airbnb cleaning content updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating content");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (
    field: keyof FormData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => ({
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

  if (status === "unauthenticated") {
    return null;
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
            Airbnb Cleaning Content Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage the content for the Airbnb cleaning service page
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
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
                  value={formData.heroTopLabel}
                  onChange={(e) =>
                    handleInputChange("heroTopLabel", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.heroHeading}
                  onChange={(e) =>
                    handleInputChange("heroHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheading
                </label>
                <textarea
                  value={formData.heroSubheading}
                  onChange={(e) =>
                    handleInputChange("heroSubheading", e.target.value)
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
                  value={formData.heroBackgroundImage}
                  onChange={(e) =>
                    handleInputChange("heroBackgroundImage", e.target.value)
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
                  value={formData.heroServiceDuration}
                  onChange={(e) =>
                    handleInputChange("heroServiceDuration", e.target.value)
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
                  value={formData.heroServiceGuarantee}
                  onChange={(e) =>
                    handleInputChange("heroServiceGuarantee", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              What's Included Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={formData.includedSectionHeading}
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
                  value={formData.includedSectionSubheading}
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

          {/* Guest-Ready Bedrooms Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Guest-Ready Bedrooms Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.bedroomsTitle}
                  onChange={(e) =>
                    handleInputChange("bedroomsTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.bedroomsImage}
                  onChange={(e) =>
                    handleInputChange("bedroomsImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.bedroomsDescription}
                  onChange={(e) =>
                    handleInputChange("bedroomsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              {formData.bedroomsFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleArrayChange(
                        "bedroomsFeatures",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("bedroomsFeatures", index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("bedroomsFeatures")}
                className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </button>
            </div>
          </div>

          {/* Spotless Bathrooms Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Spotless Bathrooms Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.bathroomsTitle}
                  onChange={(e) =>
                    handleInputChange("bathroomsTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.bathroomsImage}
                  onChange={(e) =>
                    handleInputChange("bathroomsImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.bathroomsDescription}
                  onChange={(e) =>
                    handleInputChange("bathroomsDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              {formData.bathroomsFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleArrayChange(
                        "bathroomsFeatures",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("bathroomsFeatures", index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("bathroomsFeatures")}
                className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </button>
            </div>
          </div>

          {/* Kitchen Excellence Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Kitchen Excellence Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.kitchenTitle}
                  onChange={(e) =>
                    handleInputChange("kitchenTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.kitchenImage}
                  onChange={(e) =>
                    handleInputChange("kitchenImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.kitchenDescription}
                  onChange={(e) =>
                    handleInputChange("kitchenDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              {formData.kitchenFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleArrayChange(
                        "kitchenFeatures",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("kitchenFeatures", index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("kitchenFeatures")}
                className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </button>
            </div>
          </div>

          {/* Before & After Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Before & After Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  value={formData.beforeAfterHeading}
                  onChange={(e) =>
                    handleInputChange("beforeAfterHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheading
                </label>
                <textarea
                  value={formData.beforeAfterSubheading}
                  onChange={(e) =>
                    handleInputChange("beforeAfterSubheading", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {formData.airBNBCleaningDifference.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={item.heading}
                      onChange={(e) =>
                        setFormData((prev) => {
                          const newDifference = [...prev.airBNBCleaningDifference];
                          newDifference[index].heading = e.target.value;
                          return { ...prev, airBNBCleaningDifference: newDifference };
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                      Before Image URL
                    </label>
                    <input
                      type="url"
                      value={item.beforeImage}
                      onChange={(e) =>
                        setFormData((prev) => {
                          const newDifference = [...prev.airBNBCleaningDifference];
                          newDifference[index].beforeImage = e.target.value;
                          return { ...prev, airBNBCleaningDifference: newDifference };
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                      After Image URL
                    </label>
                    <input
                      type="url"
                      value={item.afterImage}
                      onChange={(e) =>
                        setFormData((prev) => {
                          const newDifference = [...prev.airBNBCleaningDifference];
                          newDifference[index].afterImage = e.target.value;
                          return { ...prev, airBNBCleaningDifference: newDifference };
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                      Caption
                    </label>
                    <textarea
                      value={item.caption}
                      onChange={(e) =>
                        setFormData((prev) => {
                          const newDifference = [...prev.airBNBCleaningDifference];
                          newDifference[index].caption = e.target.value;
                          return { ...prev, airBNBCleaningDifference: newDifference };
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Benefits Section
            </h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={formData.benefitsHeading}
                  onChange={(e) =>
                    handleInputChange("benefitsHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={formData.benefitsSubheading}
                  onChange={(e) =>
                    handleInputChange("benefitsSubheading", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Benefit 1: Higher Ratings */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Benefit 1: Higher Ratings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.benefit1Title}
                    onChange={(e) =>
                      handleInputChange("benefit1Title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon URL
                  </label>
                  <input
                    type="url"
                    value={formData.benefit1Icon}
                    onChange={(e) =>
                      handleInputChange("benefit1Icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.benefit1Description}
                    onChange={(e) =>
                      handleInputChange("benefit1Description", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Benefit 2: Efficient Turnovers */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Benefit 2: Efficient Turnovers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.benefit2Title}
                    onChange={(e) =>
                      handleInputChange("benefit2Title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon URL
                  </label>
                  <input
                    type="url"
                    value={formData.benefit2Icon}
                    onChange={(e) =>
                      handleInputChange("benefit2Icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.benefit2Description}
                    onChange={(e) =>
                      handleInputChange("benefit2Description", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Benefit 3: Delighted Guests */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Benefit 3: Delighted Guests
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.benefit3Title}
                    onChange={(e) =>
                      handleInputChange("benefit3Title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon URL
                  </label>
                  <input
                    type="url"
                    value={formData.benefit3Icon}
                    onChange={(e) =>
                      handleInputChange("benefit3Icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.benefit3Description}
                    onChange={(e) =>
                      handleInputChange("benefit3Description", e.target.value)
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
            
            {formData.faqs.map((faq, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    FAQ {index + 1}
                  </h3>
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newFaqs = formData.faqs.filter((_, i) => i !== index);
                        setFormData({ ...formData, faqs: newFaqs });
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
                        const newFaqs = [...formData.faqs];
                        newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                        setFormData({ ...formData, faqs: newFaqs });
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
                        const newFaqs = [...formData.faqs];
                        newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                        setFormData({ ...formData, faqs: newFaqs });
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
                setFormData({
                  ...formData,
                  faqs: [...formData.faqs, { question: "", answer: "" }],
                });
              }}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
