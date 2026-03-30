"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  Users,
  DollarSign,
  Shield,
  Clock,
  TrendingUp,
  Award,
  Star,
  Briefcase,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";

// Types
interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface Position {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  link?: string;
}

interface Testimonial {
  name: string;
  position: string;
  content: string;
  rating: number;
}

interface CareersData {
  heroSection: {
    topLabel: string;
    heading: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    teamMembersCount: string;
    heroImage: string;
  };
  benefitsSection: {
    heading: string;
    description: string;
    benefits: Benefit[];
  };
  positionsSection: {
    heading: string;
    description: string;
    positions: Position[];
  };
  testimonialsSection: {
    heading: string;
    description: string;
    testimonials: Testimonial[];
  };
  applicationSection: {
    heading: string;
    description: string;
    submitButtonText: string;
  };
  contactSection: {
    heading: string;
    description: string;
    phoneText: string;
    emailText: string;
  };
}

const iconOptions = [
  "DollarSign",
  "Shield",
  "Clock",
  "TrendingUp",
  "Users",
  "Award",
  "Star",
  "CheckCircle",
  "Briefcase",
  "MapPin",
];

export default function CareersEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState<CareersData>({
    heroSection: {
      topLabel: "",
      heading: "",
      description: "",
      primaryButtonText: "",
      secondaryButtonText: "",
      teamMembersCount: "",
      heroImage: "",
    },
    benefitsSection: {
      heading: "",
      description: "",
      benefits: [],
    },
    positionsSection: {
      heading: "",
      description: "",
      positions: [],
    },
    testimonialsSection: {
      heading: "",
      description: "",
      testimonials: [],
    },
    applicationSection: {
      heading: "",
      description: "",
      submitButtonText: "",
    },
    contactSection: {
      heading: "",
      description: "",
      phoneText: "",
      emailText: "",
    },
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/careers");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: "error", text: "Failed to load careers data" });
    } finally {
      setIsLoading(false);
    }
  };

  // Save data
  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/cms/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: "Careers page updated successfully",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update careers page",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ type: "error", text: "An error occurred while saving" });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle basic input changes
  const handleBasicChange = (
    section: keyof CareersData,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle benefit changes
  const handleBenefitChange = (
    index: number,
    field: keyof Benefit,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      benefitsSection: {
        ...prev.benefitsSection,
        benefits: prev.benefitsSection.benefits.map((benefit, i) =>
          i === index ? { ...benefit, [field]: value } : benefit
        ),
      },
    }));
  };

  // Add new benefit
  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefitsSection: {
        ...prev.benefitsSection,
        benefits: [
          ...prev.benefitsSection.benefits,
          { title: "", description: "", icon: "DollarSign" },
        ],
      },
    }));
  };

  // Remove benefit
  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefitsSection: {
        ...prev.benefitsSection,
        benefits: prev.benefitsSection.benefits.filter((_, i) => i !== index),
      },
    }));
  };

  // Handle position changes
  const handlePositionChange = (
    index: number,
    field: keyof Position,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      positionsSection: {
        ...prev.positionsSection,
        positions: prev.positionsSection.positions.map((position, i) =>
          i === index ? { ...position, [field]: value } : position
        ),
      },
    }));
  };

  // Add new position
  const addPosition = () => {
    setFormData((prev) => ({
      ...prev,
      positionsSection: {
        ...prev.positionsSection,
        positions: [
          ...prev.positionsSection.positions,
          {
            title: "",
            type: "",
            location: "",
            description: "",
            requirements: [""],
            salary: "",
            link: "",
          },
        ],
      },
    }));
  };

  // Remove position
  const removePosition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      positionsSection: {
        ...prev.positionsSection,
        positions: prev.positionsSection.positions.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Handle requirement changes
  const handleRequirementChange = (
    positionIndex: number,
    reqIndex: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      positionsSection: {
        ...prev.positionsSection,
        positions: prev.positionsSection.positions.map((position, i) =>
          i === positionIndex
            ? {
                ...position,
                requirements: position.requirements.map((req, j) =>
                  j === reqIndex ? value : req
                ),
              }
            : position
        ),
      },
    }));
  };

  // Add requirement to position
  const addRequirement = (positionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      positionsSection: {
        ...prev.positionsSection,
        positions: prev.positionsSection.positions.map((position, i) =>
          i === positionIndex
            ? {
                ...position,
                requirements: [...position.requirements, ""],
              }
            : position
        ),
      },
    }));
  };

  // Remove requirement from position
  const removeRequirement = (positionIndex: number, reqIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      positionsSection: {
        ...prev.positionsSection,
        positions: prev.positionsSection.positions.map((position, i) =>
          i === positionIndex
            ? {
                ...position,
                requirements: position.requirements.filter(
                  (_, j) => j !== reqIndex
                ),
              }
            : position
        ),
      },
    }));
  };

  // Handle testimonial changes
  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      testimonialsSection: {
        ...prev.testimonialsSection,
        testimonials: prev.testimonialsSection.testimonials.map(
          (testimonial, i) =>
            i === index ? { ...testimonial, [field]: value } : testimonial
        ),
      },
    }));
  };

  // Add new testimonial
  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonialsSection: {
        ...prev.testimonialsSection,
        testimonials: [
          ...prev.testimonialsSection.testimonials,
          {
            name: "",
            position: "",
            content: "",
            rating: 5,
          },
        ],
      },
    }));
  };

  // Remove testimonial
  const removeTestimonial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      testimonialsSection: {
        ...prev.testimonialsSection,
        testimonials: prev.testimonialsSection.testimonials.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Check authentication and load data
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/protected");
    } else if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Careers Page Editor
              </h1>
              <p className="text-gray-600">
                Manage your careers page content, job positions, and team
                information
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={saveData} className="space-y-6">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#007bff]" />
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Label
                </label>
                <input
                  type="text"
                  value={formData.heroSection.topLabel}
                  onChange={(e) =>
                    handleBasicChange("heroSection", "topLabel", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Members Count
                </label>
                <input
                  type="text"
                  value={formData.heroSection.teamMembersCount}
                  onChange={(e) =>
                    handleBasicChange(
                      "heroSection",
                      "teamMembersCount",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.heroSection.heading}
                  onChange={(e) =>
                    handleBasicChange("heroSection", "heading", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSection.description}
                  onChange={(e) =>
                    handleBasicChange(
                      "heroSection",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Image URL
                </label>
                <input
                  type="text"
                  value={formData.heroSection.heroImage}
                  onChange={(e) =>
                    handleBasicChange(
                      "heroSection",
                      "heroImage",
                      e.target.value
                    )
                  }
                  placeholder="Enter the URL of the hero section image"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={formData.heroSection.primaryButtonText}
                  onChange={(e) =>
                    handleBasicChange(
                      "heroSection",
                      "primaryButtonText",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={formData.heroSection.secondaryButtonText}
                  onChange={(e) =>
                    handleBasicChange(
                      "heroSection",
                      "secondaryButtonText",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-[#007bff]" />
                Benefits Section
              </h2>
              <button
                type="button"
                onClick={addBenefit}
                className="bg-[#007bff] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Benefit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={formData.benefitsSection.heading}
                  onChange={(e) =>
                    handleBasicChange(
                      "benefitsSection",
                      "heading",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Description
                </label>
                <textarea
                  rows={2}
                  value={formData.benefitsSection.description}
                  onChange={(e) =>
                    handleBasicChange(
                      "benefitsSection",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {formData.benefitsSection.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Benefit {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) =>
                          handleBenefitChange(index, "title", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon
                      </label>
                      <select
                        value={benefit.icon}
                        onChange={(e) =>
                          handleBenefitChange(index, "icon", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={benefit.description}
                        onChange={(e) =>
                          handleBenefitChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Positions Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-[#007bff]" />
                Positions Section
              </h2>
              <button
                type="button"
                onClick={addPosition}
                className="bg-[#007bff] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Position
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={formData.positionsSection.heading}
                  onChange={(e) =>
                    handleBasicChange(
                      "positionsSection",
                      "heading",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Description
                </label>
                <textarea
                  rows={2}
                  value={formData.positionsSection.description}
                  onChange={(e) =>
                    handleBasicChange(
                      "positionsSection",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-6">
              {formData.positionsSection.positions.map((position, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Position {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removePosition(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={position.title}
                        onChange={(e) =>
                          handlePositionChange(index, "title", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <input
                        type="text"
                        value={position.type}
                        onChange={(e) =>
                          handlePositionChange(index, "type", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={position.location}
                        onChange={(e) =>
                          handlePositionChange(
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary
                      </label>
                      <input
                        type="text"
                        value={position.salary}
                        onChange={(e) =>
                          handlePositionChange(index, "salary", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={position.description}
                      onChange={(e) =>
                        handlePositionChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Link (optional)
                    </label>
                    <input
                      type="text"
                      value={position.link || ""}
                      onChange={(e) =>
                        handlePositionChange(index, "link", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Requirements
                      </label>
                      <button
                        type="button"
                        onClick={() => addRequirement(index)}
                        className="text-[#007bff] hover:text-[#0056b3] text-sm flex items-center"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Requirement
                      </button>
                    </div>
                    <div className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <div
                          key={reqIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={req}
                            onChange={(e) =>
                              handleRequirementChange(
                                index,
                                reqIndex,
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => removeRequirement(index, reqIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Star className="h-5 w-5 mr-2 text-[#007bff]" />
                Testimonials Section
              </h2>
              <button
                type="button"
                onClick={addTestimonial}
                className="bg-[#007bff] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Testimonial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={formData.testimonialsSection.heading}
                  onChange={(e) =>
                    handleBasicChange(
                      "testimonialsSection",
                      "heading",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Description
                </label>
                <textarea
                  rows={2}
                  value={formData.testimonialsSection.description}
                  onChange={(e) =>
                    handleBasicChange(
                      "testimonialsSection",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {formData.testimonialsSection.testimonials.map(
                (testimonial, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        Testimonial {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={testimonial.position}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "position",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <select
                          value={testimonial.rating}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "rating",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>
                              {rating} Star{rating !== 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content
                        </label>
                        <textarea
                          rows={3}
                          value={testimonial.content}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "content",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Application Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-[#007bff]" />
              Application Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={formData.applicationSection.heading}
                  onChange={(e) =>
                    handleBasicChange(
                      "applicationSection",
                      "heading",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Submit Button Text
                </label>
                <input
                  type="text"
                  value={formData.applicationSection.submitButtonText}
                  onChange={(e) =>
                    handleBasicChange(
                      "applicationSection",
                      "submitButtonText",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.applicationSection.description}
                  onChange={(e) =>
                    handleBasicChange(
                      "applicationSection",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#007bff]" />
              Contact Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={formData.contactSection.heading}
                  onChange={(e) =>
                    handleBasicChange(
                      "contactSection",
                      "heading",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.contactSection.description}
                  onChange={(e) =>
                    handleBasicChange(
                      "contactSection",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Text
                </label>
                <input
                  type="text"
                  value={formData.contactSection.phoneText}
                  onChange={(e) =>
                    handleBasicChange(
                      "contactSection",
                      "phoneText",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Text
                </label>
                <input
                  type="text"
                  value={formData.contactSection.emailText}
                  onChange={(e) =>
                    handleBasicChange(
                      "contactSection",
                      "emailText",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#007bff] text-white py-3 px-6 rounded-lg hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-medium"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Careers Page
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
