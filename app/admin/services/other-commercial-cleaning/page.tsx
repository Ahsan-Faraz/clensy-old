"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface OtherCommercialCleaningData {
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

  // Restaurants & Food Service Section
  restaurantsTitle: string;
  restaurantsDescription: string;
  restaurantsImage: string;
  restaurantsFeatures: string[];

  // Warehouses & Industrial Spaces Section
  warehousesTitle: string;
  warehousesDescription: string;
  warehousesImage: string;
  warehousesFeatures: string[];

  // Places of Worship Section
  worshipTitle: string;
  worshipDescription: string;
  worshipImage: string;
  worshipFeatures: string[];

  // Why Choose Us Section
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Feature 1: Industry Expertise
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;

  // Feature 2: Custom Scheduling
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;

  // Feature 3: Value-Focused Solutions
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;

  // Tailored Cleaning Plans & Pricing Section
  pricingHeading: string;
  pricingSubheading: string;
  pricingPlans: Array<{
    planName: string;
    planSubtitle: string;
    planPrice: string;
    planPriceUnit: string;
    planFeatures: string[];
    planButtonText: string;
    planButtonLink: string;
    isPopular: boolean;
    planColor: string;
  }>;
  pricingCustomSectionHeading: string;
  pricingCustomSectionDescription: string;
  pricingCustomButton1Text: string;
  pricingCustomButton1Link: string;
  pricingCustomButton2Text: string;
  pricingCustomButton2Link: string;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function OtherCommercialCleaningAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<OtherCommercialCleaningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    fetchData();
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/other-commercial-cleaning");
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
      const response = await fetch("/api/cms/other-commercial-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Data updated successfully!");
        setTimeout(() => setMessage(""), 3000);
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

  const handleInputChange = (
    field: keyof OtherCommercialCleaningData,
    value: string
  ) => {
    if (data) {
      setData({ ...data, [field]: value });
    }
  };

  const handleArrayChange = (
    field: keyof OtherCommercialCleaningData,
    index: number,
    value: string
  ) => {
    if (data && Array.isArray(data[field])) {
      const newArray = [...(data[field] as string[])];
      newArray[index] = value;
      setData({ ...data, [field]: newArray });
    }
  };

  const addArrayItem = (field: keyof OtherCommercialCleaningData) => {
    if (data && Array.isArray(data[field])) {
      const newArray = [...(data[field] as string[]), ""];
      setData({ ...data, [field]: newArray });
    }
  };

  const removeArrayItem = (
    field: keyof OtherCommercialCleaningData,
    index: number
  ) => {
    if (data && Array.isArray(data[field])) {
      const newArray = (data[field] as string[]).filter((_, i) => i !== index);
      setData({ ...data, [field]: newArray });
    }
  };

  // Handler for Pricing Plans
  const handlePricingPlanChange = (
    index: number,
    field: keyof OtherCommercialCleaningData['pricingPlans'][0],
    value: string | string[] | boolean
  ) => {
    if (!data) return;
    const newPlans = [...(data.pricingPlans || [])];
    if (field === 'planFeatures') {
      newPlans[index] = { ...newPlans[index], [field]: value as string[] };
    } else {
      newPlans[index] = { ...newPlans[index], [field]: value };
    }
    setData({ ...data, pricingPlans: newPlans });
  };

  // Handler for adding new pricing plan
  const addPricingPlan = () => {
    if (!data) return;
    const newPlans = [...(data.pricingPlans || []), {
      planName: "",
      planSubtitle: "",
      planPrice: "",
      planPriceUnit: "",
      planFeatures: [""],
      planButtonText: "Get Quote",
      planButtonLink: "/contact",
      isPopular: false,
      planColor: "blue-600"
    }];
    setData({ ...data, pricingPlans: newPlans });
  };

  // Handler for removing pricing plan
  const removePricingPlan = (index: number) => {
    if (!data) return;
    const newPlans = (data.pricingPlans || []).filter((_, i) => i !== index);
    setData({ ...data, pricingPlans: newPlans });
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
            Other Commercial Cleaning - Content Management
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
                    Heading
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
                <div className="md:col-span-2">
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
            <div className="bg-gray-50 p-6 rounded-lg">
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
                      handleInputChange(
                        "includedSectionHeading",
                        e.target.value
                      )
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
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Restaurants & Food Service Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Restaurants & Food Service
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.restaurantsTitle}
                    onChange={(e) =>
                      handleInputChange("restaurantsTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.restaurantsDescription}
                    onChange={(e) =>
                      handleInputChange(
                        "restaurantsDescription",
                        e.target.value
                      )
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
                    value={data.restaurantsImage}
                    onChange={(e) =>
                      handleInputChange("restaurantsImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.restaurantsFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "restaurantsFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("restaurantsFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("restaurantsFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Warehouses & Industrial Spaces Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Warehouses & Industrial Spaces
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.warehousesTitle}
                    onChange={(e) =>
                      handleInputChange("warehousesTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.warehousesDescription}
                    onChange={(e) =>
                      handleInputChange("warehousesDescription", e.target.value)
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
                    value={data.warehousesImage}
                    onChange={(e) =>
                      handleInputChange("warehousesImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.warehousesFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "warehousesFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("warehousesFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("warehousesFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Places of Worship Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Places of Worship</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.worshipTitle}
                    onChange={(e) =>
                      handleInputChange("worshipTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.worshipDescription}
                    onChange={(e) =>
                      handleInputChange("worshipDescription", e.target.value)
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
                    value={data.worshipImage}
                    onChange={(e) =>
                      handleInputChange("worshipImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.worshipFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "worshipFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("worshipFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("worshipFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Why Choose Us</h2>
              <div className="grid grid-cols-1 gap-4">
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
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Feature 1 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Feature 1: Industry Expertise
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
                          handleInputChange("feature1Title", e.target.value)
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
                          handleInputChange(
                            "feature1Description",
                            e.target.value
                          )
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
                          handleInputChange("feature1Icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Feature 2: Custom Scheduling
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
                          handleInputChange("feature2Title", e.target.value)
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
                          handleInputChange(
                            "feature2Description",
                            e.target.value
                          )
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
                          handleInputChange("feature2Icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Feature 3: Value-Focused Solutions
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
                          handleInputChange("feature3Title", e.target.value)
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
                          handleInputChange(
                            "feature3Description",
                            e.target.value
                          )
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
                          handleInputChange("feature3Icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tailored Cleaning Plans & Pricing Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Tailored Cleaning Plans & Pricing
                </h2>
                <button
                  type="button"
                  onClick={addPricingPlan}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  Add Pricing Plan
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={data.pricingHeading || ""}
                    onChange={(e) =>
                      handleInputChange("pricingHeading", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subheading
                  </label>
                  <textarea
                    value={data.pricingSubheading || ""}
                    onChange={(e) =>
                      handleInputChange("pricingSubheading", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {(data.pricingPlans || []).map((plan, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Pricing Plan #{index + 1}
                    </h3>
                    {(data.pricingPlans || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePricingPlan(index)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan Name
                      </label>
                      <input
                        type="text"
                        value={plan.planName}
                        onChange={(e) => handlePricingPlanChange(index, 'planName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Essential Clean"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan Subtitle
                      </label>
                      <input
                        type="text"
                        value={plan.planSubtitle}
                        onChange={(e) => handlePricingPlanChange(index, 'planSubtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., For smaller businesses"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        value={plan.planPrice}
                        onChange={(e) => handlePricingPlanChange(index, 'planPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., $150"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Unit
                      </label>
                      <input
                        type="text"
                        value={plan.planPriceUnit}
                        onChange={(e) => handlePricingPlanChange(index, 'planPriceUnit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., / visit"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan Color
                      </label>
                      <select
                        value={plan.planColor}
                        onChange={(e) => handlePricingPlanChange(index, 'planColor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="blue-600">Blue 600</option>
                        <option value="blue-700">Blue 700</option>
                        <option value="indigo-600">Indigo 600</option>
                        <option value="purple-600">Purple 600</option>
                        <option value="green-600">Green 600</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={plan.planButtonText}
                        onChange={(e) => handlePricingPlanChange(index, 'planButtonText', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Get Quote"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={plan.planButtonLink}
                        onChange={(e) => handlePricingPlanChange(index, 'planButtonLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., /contact"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={plan.isPopular}
                        onChange={(e) => handlePricingPlanChange(index, 'isPopular', e.target.checked)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Mark as Popular Plan</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Features
                    </label>
                    {(plan.planFeatures || []).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...(plan.planFeatures || [])];
                            newFeatures[featureIndex] = e.target.value;
                            handlePricingPlanChange(index, 'planFeatures', newFeatures);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Plan feature"
                        />
                        {(plan.planFeatures || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newFeatures = (plan.planFeatures || []).filter((_, i) => i !== featureIndex);
                              handlePricingPlanChange(index, 'planFeatures', newFeatures);
                            }}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = [...(plan.planFeatures || []), ""];
                        handlePricingPlanChange(index, 'planFeatures', newFeatures);
                      }}
                      className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded flex items-center"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4 text-gray-900">Custom Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Section Heading
                    </label>
                    <input
                      type="text"
                      value={data.pricingCustomSectionHeading || ""}
                      onChange={(e) =>
                        handleInputChange("pricingCustomSectionHeading", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Section Description
                    </label>
                    <textarea
                      value={data.pricingCustomSectionDescription || ""}
                      onChange={(e) =>
                        handleInputChange("pricingCustomSectionDescription", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 1 Text
                      </label>
                      <input
                        type="text"
                        value={data.pricingCustomButton1Text || ""}
                        onChange={(e) =>
                          handleInputChange("pricingCustomButton1Text", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 1 Link
                      </label>
                      <input
                        type="text"
                        value={data.pricingCustomButton1Link || ""}
                        onChange={(e) =>
                          handleInputChange("pricingCustomButton1Link", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 2 Text
                      </label>
                      <input
                        type="text"
                        value={data.pricingCustomButton2Text || ""}
                        onChange={(e) =>
                          handleInputChange("pricingCustomButton2Text", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 2 Link
                      </label>
                      <input
                        type="text"
                        value={data.pricingCustomButton2Link || ""}
                        onChange={(e) =>
                          handleInputChange("pricingCustomButton2Link", e.target.value)
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
