"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface PostConstructionCleaningData {
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

  // Debris Removal Section
  debrisRemovalTitle: string;
  debrisRemovalDescription: string;
  debrisRemovalImage: string;
  debrisRemovalFeatures: string[];

  // Dust Elimination Section
  dustEliminationTitle: string;
  dustEliminationDescription: string;
  dustEliminationImage: string;
  dustEliminationFeatures: string[];

  // Surface Finishing Section
  surfaceFinishingTitle: string;
  surfaceFinishingDescription: string;
  surfaceFinishingImage: string;
  surfaceFinishingFeatures: string[];

  // Before & After Section
  beforeAfterHeading: string;
  beforeAfterSubheading: string;
  postConstructionDifference: {
    heading: string;
    beforeImage: string;
    afterImage: string;
    caption: string;
  }[];

  // Process Section
  processHeading: string;
  processSubheading: string;

  // Process Steps
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  step4Title: string;
  step4Description: string;

  // Safety Standards Section
  safetyHeading: string;
  safetySubheading: string;

  // Safety Standard 1: PPE
  ppeTitle: string;
  ppeDescription: string;
  ppeFeatures: string[];

  // Safety Standard 2: Hazardous Material Handling
  hazmatTitle: string;
  hazmatDescription: string;
  hazmatFeatures: string[];

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function PostConstructionCleaningAdmin() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<PostConstructionCleaningData | null>(null);
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
      const response = await fetch("/api/cms/post-construction-cleaning");
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

  const handleInputChange = (
    field: keyof PostConstructionCleaningData,
    value: string
  ) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const handleArrayChange = (
    field: keyof PostConstructionCleaningData,
    index: number,
    value: string
  ) => {
    if (!data) return;
    const currentArray = data[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setData({ ...data, [field]: newArray });
  };

  const addArrayItem = (field: keyof PostConstructionCleaningData) => {
    if (!data) return;
    const currentArray = data[field] as string[];
    setData({ ...data, [field]: [...currentArray, ""] });
  };

  const removeArrayItem = (
    field: keyof PostConstructionCleaningData,
    index: number
  ) => {
    if (!data) return;
    const currentArray = data[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setData({ ...data, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/cms/post-construction-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Post-construction cleaning data updated successfully!");
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
        <div className="text-red-600">Failed to load data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Post-Construction Cleaning CMS
            </h1>
            <p className="text-gray-600">
              Edit content for the post-construction cleaning service page
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Hero Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Hero Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What's Included Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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

            {/* Debris Removal Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Debris Removal Section
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={data.debrisRemovalTitle}
                      onChange={(e) =>
                        handleInputChange("debrisRemovalTitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={data.debrisRemovalDescription}
                      onChange={(e) =>
                        handleInputChange(
                          "debrisRemovalDescription",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={data.debrisRemovalImage}
                    onChange={(e) =>
                      handleInputChange("debrisRemovalImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.debrisRemovalFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "debrisRemovalFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("debrisRemovalFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("debrisRemovalFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Dust Elimination Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dust Elimination Section
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={data.dustEliminationTitle}
                      onChange={(e) =>
                        handleInputChange(
                          "dustEliminationTitle",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={data.dustEliminationDescription}
                      onChange={(e) =>
                        handleInputChange(
                          "dustEliminationDescription",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={data.dustEliminationImage}
                    onChange={(e) =>
                      handleInputChange("dustEliminationImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.dustEliminationFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "dustEliminationFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("dustEliminationFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("dustEliminationFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Surface Finishing Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Surface Finishing Section
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={data.surfaceFinishingTitle}
                      onChange={(e) =>
                        handleInputChange(
                          "surfaceFinishingTitle",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={data.surfaceFinishingDescription}
                      onChange={(e) =>
                        handleInputChange(
                          "surfaceFinishingDescription",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={data.surfaceFinishingImage}
                    onChange={(e) =>
                      handleInputChange("surfaceFinishingImage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {data.surfaceFinishingFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "surfaceFinishingFeatures",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("surfaceFinishingFeatures", index)
                        }
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("surfaceFinishingFeatures")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Before & After Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Before & After Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={data.beforeAfterHeading}
                    onChange={(e) =>
                      handleInputChange("beforeAfterHeading", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subheading
                  </label>
                  <textarea
                    value={data.beforeAfterSubheading}
                    onChange={(e) =>
                      handleInputChange("beforeAfterSubheading", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                {data.postConstructionDifference.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={item.heading}
                      onChange={(e) =>
                        setData((prev) => {
                          if (!prev) return prev;
                          const newDifference = [...prev.postConstructionDifference];
                          newDifference[index] = { ...newDifference[index], heading: e.target.value };
                          return { ...prev, postConstructionDifference: newDifference };
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
                          if (!prev) return prev;
                          const newDifference = [...prev.postConstructionDifference];
                          newDifference[index] = { ...newDifference[index], beforeImage: e.target.value };
                          return { ...prev, postConstructionDifference: newDifference };
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
                          if (!prev) return prev;
                          const newDifference = [...prev.postConstructionDifference];
                          newDifference[index] = { ...newDifference[index], afterImage: e.target.value };
                          return { ...prev, postConstructionDifference: newDifference };
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
                          if (!prev) return prev;
                          const newDifference = [...prev.postConstructionDifference];
                          newDifference[index] = { ...newDifference[index], caption: e.target.value };
                          return { ...prev, postConstructionDifference: newDifference };
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* Process Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Process Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Process Heading
                  </label>
                  <input
                    type="text"
                    value={data.processHeading}
                    onChange={(e) =>
                      handleInputChange("processHeading", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Process Subheading
                  </label>
                  <textarea
                    value={data.processSubheading}
                    onChange={(e) =>
                      handleInputChange("processSubheading", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Step 1 */}
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Step 1: Initial Assessment & Debris Removal
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={data.step1Title}
                          onChange={(e) =>
                            handleInputChange("step1Title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={data.step1Description}
                          onChange={(e) =>
                            handleInputChange(
                              "step1Description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Step 2: Dust Elimination & Surface Cleaning
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={data.step2Title}
                          onChange={(e) =>
                            handleInputChange("step2Title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={data.step2Description}
                          onChange={(e) =>
                            handleInputChange(
                              "step2Description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Step 3: Floor & Surface Detailing
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={data.step3Title}
                          onChange={(e) =>
                            handleInputChange("step3Title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={data.step3Description}
                          onChange={(e) =>
                            handleInputChange(
                              "step3Description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Step 4: Final Detailing & Inspection
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={data.step4Title}
                          onChange={(e) =>
                            handleInputChange("step4Title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={data.step4Description}
                          onChange={(e) =>
                            handleInputChange(
                              "step4Description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Standards Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Safety Standards Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Safety Heading
                  </label>
                  <input
                    type="text"
                    value={data.safetyHeading}
                    onChange={(e) =>
                      handleInputChange("safetyHeading", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Safety Subheading
                  </label>
                  <textarea
                    value={data.safetySubheading}
                    onChange={(e) =>
                      handleInputChange("safetySubheading", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* PPE Section */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Personal Protective Equipment
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PPE Title
                      </label>
                      <input
                        type="text"
                        value={data.ppeTitle}
                        onChange={(e) =>
                          handleInputChange("ppeTitle", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PPE Description
                      </label>
                      <textarea
                        value={data.ppeDescription}
                        onChange={(e) =>
                          handleInputChange("ppeDescription", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PPE Features
                      </label>
                      {data.ppeFeatures.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleArrayChange(
                                "ppeFeatures",
                                index,
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("ppeFeatures", index)
                            }
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem("ppeFeatures")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Add Feature
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hazmat Section */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Hazardous Material Handling
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hazmat Title
                      </label>
                      <input
                        type="text"
                        value={data.hazmatTitle}
                        onChange={(e) =>
                          handleInputChange("hazmatTitle", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hazmat Description
                      </label>
                      <textarea
                        value={data.hazmatDescription}
                        onChange={(e) =>
                          handleInputChange("hazmatDescription", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hazmat Features
                      </label>
                      {data.hazmatFeatures.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleArrayChange(
                                "hazmatFeatures",
                                index,
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("hazmatFeatures", index)
                            }
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem("hazmatFeatures")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Add Feature
                      </button>
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
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.includes("Error")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
