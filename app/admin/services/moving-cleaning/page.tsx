"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface MovingCleaningData {
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

  // Move-Out Cleaning Section
  moveOutTitle: string;
  moveOutDescription: string;
  moveOutImage: string;
  moveOutFeatures: string[];

  // Move-In Cleaning Section
  moveInTitle: string;
  moveInDescription: string;
  moveInImage: string;
  moveInFeatures: string[];

  // Post-Renovation Cleaning Section
  postRenovationTitle: string;
  postRenovationDescription: string;
  postRenovationImage: string;
  postRenovationFeatures: string[];

  // Before & After Section
  beforeAfterHeading: string;
  beforeAfterSubheading: string;
  MoveInCleaningDifference: {
    heading: string;
    beforeImage: string;
    afterImage: string;
    caption: string;
  }[];
  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;

  // Benefit 1: Secure Your Deposit
  benefit1Title: string;
  benefit1Description: string;
  benefit1Icon: string;

  // Benefit 2: Reduce Moving Stress
  benefit2Title: string;
  benefit2Description: string;
  benefit2Icon: string;

  // Benefit 3: Health Protection
  benefit3Title: string;
  benefit3Description: string;
  benefit3Icon: string;

  // FAQ Section
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function MovingCleaningAdmin() {
  const [data, setData] = useState<MovingCleaningData>({
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

    // Move-Out Cleaning Section
    moveOutTitle: "",
    moveOutDescription: "",
    moveOutImage: "",
    moveOutFeatures: [],

    // Move-In Cleaning Section
    moveInTitle: "",
    moveInDescription: "",
    moveInImage: "",
    moveInFeatures: [],

    // Post-Renovation Cleaning Section
    postRenovationTitle: "",
    postRenovationDescription: "",
    postRenovationImage: "",
    postRenovationFeatures: [],

    // Before & After Section
    beforeAfterHeading: "",
    beforeAfterSubheading: "",
    MoveInCleaningDifference: [
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

    // Benefit 1: Secure Your Deposit
    benefit1Title: "",
    benefit1Description: "",
    benefit1Icon: "",

    // Benefit 2: Reduce Moving Stress
    benefit2Title: "",
    benefit2Description: "",
    benefit2Icon: "",

    // Benefit 3: Health Protection
    benefit3Title: "",
    benefit3Description: "",
    benefit3Icon: "",
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/moving-cleaning");
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/cms/moving-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          faqs: Array.isArray(data.faqs) ? data.faqs : [],
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Moving cleaning content updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error updating content: " + result.error);
      }
    } catch (error) {
      setMessage("Error updating content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof MovingCleaningData,
    value: string
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (
    field: keyof MovingCleaningData,
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

  const addArrayItem = (field: keyof MovingCleaningData) => {
    setData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: keyof MovingCleaningData, index: number) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Moving Cleaning - Content Management
            </h1>
            <p className="text-gray-600">
              Edit the content for the moving cleaning service page
            </p>
          </div>

          {message && (
            <div
              className={`mx-6 mt-4 p-4 rounded-md ${
                message.includes("successfully")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
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
            {/* Hero Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Hero Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Top Label
                  </label>
                  <input
                    type="text"
                    value={data.heroTopLabel}
                    onChange={(e) =>
                      handleInputChange("heroTopLabel", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={data.heroHeading}
                    onChange={(e) =>
                      handleInputChange("heroHeading", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subheading
                  </label>
                  <textarea
                    value={data.heroSubheading}
                    onChange={(e) =>
                      handleInputChange("heroSubheading", e.target.value)
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    value={data.heroBackgroundImage}
                    onChange={(e) =>
                      handleInputChange("heroBackgroundImage", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Service Duration
                    </label>
                    <input
                      type="text"
                      value={data.heroServiceDuration}
                      onChange={(e) =>
                        handleInputChange("heroServiceDuration", e.target.value)
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Service Guarantee
                    </label>
                    <input
                      type="text"
                      value={data.heroServiceGuarantee}
                      onChange={(e) =>
                        handleInputChange(
                          "heroServiceGuarantee",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                What's Included Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Move-Out Cleaning Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Move-Out Cleaning Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.moveOutTitle}
                    onChange={(e) =>
                      handleInputChange("moveOutTitle", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={data.moveOutDescription}
                    onChange={(e) =>
                      handleInputChange("moveOutDescription", e.target.value)
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={data.moveOutImage}
                    onChange={(e) =>
                      handleInputChange("moveOutImage", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.moveOutFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "moveOutFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("moveOutFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("moveOutFeatures")}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Move-In Cleaning Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Move-In Cleaning Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.moveInTitle}
                    onChange={(e) =>
                      handleInputChange("moveInTitle", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={data.moveInDescription}
                    onChange={(e) =>
                      handleInputChange("moveInDescription", e.target.value)
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={data.moveInImage}
                    onChange={(e) =>
                      handleInputChange("moveInImage", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.moveInFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "moveInFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("moveInFeatures", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("moveInFeatures")}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Post-Renovation Cleaning Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Post-Renovation Cleaning Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.postRenovationTitle}
                    onChange={(e) =>
                      handleInputChange("postRenovationTitle", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={data.postRenovationDescription}
                    onChange={(e) =>
                      handleInputChange(
                        "postRenovationDescription",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={data.postRenovationImage}
                    onChange={(e) =>
                      handleInputChange("postRenovationImage", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.postRenovationFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "postRenovationFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("postRenovationFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("postRenovationFeatures")}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Before & After Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Before & After Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={data.beforeAfterHeading}
                    onChange={(e) =>
                      handleInputChange("beforeAfterHeading", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Section Subheading
                  </label>
                  <textarea
                    value={data.beforeAfterSubheading}
                    onChange={(e) =>
                      handleInputChange("beforeAfterSubheading", e.target.value)
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Moving Cleaning Difference Images
                </h3>
              <div className="grid grid-cols-1 gap-4">
                {data.MoveInCleaningDifference.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={item.heading}
                      onChange={(e) =>
                        setData((prev) => {
                          const newDifference = [...prev.MoveInCleaningDifference];
                          newDifference[index].heading = e.target.value;
                          return { ...prev, MoveInCleaningDifference: newDifference };
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
                        setData((prev) => {
                          const newDifference = [...prev.MoveInCleaningDifference];
                          newDifference[index].beforeImage = e.target.value;
                          return { ...prev, MoveInCleaningDifference: newDifference };
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
                        setData((prev) => {
                          const newDifference = [...prev.MoveInCleaningDifference];
                          newDifference[index].afterImage = e.target.value;
                          return { ...prev, MoveInCleaningDifference: newDifference };
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
                        setData((prev) => {
                          const newDifference = [...prev.MoveInCleaningDifference];
                          newDifference[index].caption = e.target.value;
                          return { ...prev, MoveInCleaningDifference: newDifference };
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                </div>
              </div>

              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Benefits Section
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={data.benefitsHeading}
                    onChange={(e) =>
                      handleInputChange("benefitsHeading", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Section Subheading
                  </label>
                  <textarea
                    value={data.benefitsSubheading}
                    onChange={(e) =>
                      handleInputChange("benefitsSubheading", e.target.value)
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Benefit 1 */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Benefit 1: Secure Your Deposit
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={data.benefit1Title}
                        onChange={(e) =>
                          handleInputChange("benefit1Title", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={data.benefit1Description}
                        onChange={(e) =>
                          handleInputChange(
                            "benefit1Description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Icon URL
                      </label>
                      <input
                        type="text"
                        value={data.benefit1Icon}
                        onChange={(e) =>
                          handleInputChange("benefit1Icon", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Benefit 2: Reduce Moving Stress
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={data.benefit2Title}
                        onChange={(e) =>
                          handleInputChange("benefit2Title", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={data.benefit2Description}
                        onChange={(e) =>
                          handleInputChange(
                            "benefit2Description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Icon URL
                      </label>
                      <input
                        type="text"
                        value={data.benefit2Icon}
                        onChange={(e) =>
                          handleInputChange("benefit2Icon", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Benefit 3: Health Protection
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={data.benefit3Title}
                        onChange={(e) =>
                          handleInputChange("benefit3Title", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={data.benefit3Description}
                        onChange={(e) =>
                          handleInputChange(
                            "benefit3Description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Icon URL
                      </label>
                      <input
                        type="text"
                        value={data.benefit3Icon}
                        onChange={(e) =>
                          handleInputChange("benefit3Icon", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
