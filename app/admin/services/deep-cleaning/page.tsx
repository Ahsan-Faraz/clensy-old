"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // Client Reviews Section
  clientReviewsHeading: string;
  clientReviewsSubheading: string;
  clientReviews: Array<{
    rating: number;
    review: string;
    clientName: string;
    clientLocation: string;
    avatarBgColor: string;
  }>;

  // Deep vs Regular Cleaning Comparison Section
  comparisonHeading: string;
  comparisonSubheading: string;
  regularCleaning: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    frequency: string;
  };
  deepCleaning: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    frequency: string;
  };

  // What's Included Section
  includedSectionHeading: string;
  includedSectionSubheading: string;

  // Bathroom Section
  bathroomTitle: string;
  bathroomDescription: string;
  bathroomImage: string;
  bathroomFeatures: string[];

  // Kitchen Section
  kitchenTitle: string;
  kitchenDescription: string;
  kitchenImage: string;
  kitchenFeatures: string[];

  // Living Areas Section
  livingAreasTitle: string;
  livingAreasDescription: string;
  livingAreasImage: string;
  livingAreasFeatures: string[];

  // Deep Cleaning Difference Section
  differenceHeading: string;
  differenceSubheading: string;
  // Deep Cleaning Difference Images
  deepCleaningDifference: Array<{
    heading: string;
    beforeImage: string;
    afterImage: string;
    caption: string;
  }>;

  // When to Choose Deep Cleaning Section
  whenToChooseHeading: string;
  whenToChooseSubheading: string;

  // When to Choose - Card 1: Moving
  movingTitle: string;
  movingDescription: string;
  movingIcon: string;

  // When to Choose - Card 2: Seasonal
  seasonalTitle: string;
  seasonalDescription: string;
  seasonalIcon: string;

  // When to Choose - Card 3: Special Occasions
  specialOccasionsTitle: string;
  specialOccasionsDescription: string;
  specialOccasionsIcon: string;

  // Process Section
  processHeading: string;
  processSubheading: string;

  // Process Steps
  processStep1Title: string;
  processStep1Description: string;
  processStep1Icon: string;
  processStep2Title: string;
  processStep2Description: string;
  processStep2Icon: string;
  processStep3Title: string;
  processStep3Description: string;
  processStep3Icon: string;

  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;

  // Benefits Items
  benefit1Title: string;
  benefit1Description: string;
  benefit1Icon: string;
  benefit2Title: string;
  benefit2Description: string;
  benefit2Icon: string;
  benefit3Title: string;
  benefit3Description: string;
  benefit3Icon: string;
  benefit4Title: string;
  benefit4Description: string;
  benefit4Icon: string;

  // FAQ Section
  faqHeading: string;
  faqSubheading: string;
  faqs?: Array<{ question: string; answer: string }>;

  // Pricing Section
  pricingHeading: string;
  pricingSubheading: string;
}
const defaultFormData: FormData = {
  // Hero Section
  heroTopLabel: "Premium Deep Cleaning",
  heroHeading: "Revitalize Your Space With Deep Cleaning",
  heroSubheading:
    "Our comprehensive deep cleaning service targets built-up dirt, grime, and allergens to transform your home with an intensive cleaning experience beyond the surface.",
  heroBackgroundImage:
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop",
  heroServiceDuration: "4-6 Hour Service",
  heroServiceGuarantee: "100% Satisfaction",

  // FAQ Section (initialize as empty array)
  faqs: [],

  // Client Reviews Section
  clientReviewsHeading: "What Our Clients Say",
  clientReviewsSubheading: "Real feedback from satisfied customers who chose our deep cleaning service",
  clientReviews: [
    {
      rating: 5,
      review: "The deep cleaning service exceeded my expectations. My kitchen looks brand new!",
      clientName: "Sarah Johnson",
      clientLocation: "Bergen County, NJ",
      avatarBgColor: "blue-500"
    },
    {
      rating: 5,
      review: "Professional, thorough, and attention to detail. Highly recommend!",
      clientName: "Michael Chen",
      clientLocation: "Essex County, NJ",
      avatarBgColor: "green-500"
    },
    {
      rating: 5,
      review: "They transformed my bathroom completely. Worth every penny.",
      clientName: "Lisa Rodriguez",
      clientLocation: "Hudson County, NJ",
      avatarBgColor: "purple-500"
    }
  ],

  // Deep vs Regular Cleaning Comparison Section
  comparisonHeading: "Deep Cleaning vs Regular Cleaning",
  comparisonSubheading: "Understand the difference between our standard and deep cleaning services",
  regularCleaning: {
    title: "Regular Cleaning",
    subtitle: "Maintenance cleaning for daily upkeep",
    features: [
      {
        title: "Surface Cleaning",
        description: "Basic dusting and wiping of visible surfaces"
      },
      {
        title: "Vacuum & Mop",
        description: "Standard floor cleaning and vacuuming"
      },
      {
        title: "Bathroom Basics",
        description: "Clean toilets, sinks, and basic fixtures"
      },
      {
        title: "Kitchen Essentials",
        description: "Wipe counters and clean basic appliances"
      }
    ],
    frequency: "Weekly or Bi-weekly"
  },
  deepCleaning: {
    title: "Deep Cleaning",
    subtitle: "Comprehensive cleaning for thorough results",
    features: [
      {
        title: "Detailed Surface Cleaning",
        description: "Deep cleaning of all surfaces including hard-to-reach areas"
      },
      {
        title: "Appliance Deep Clean",
        description: "Clean inside ovens, refrigerators, and other appliances"
      },
      {
        title: "Bathroom Deep Clean",
        description: "Remove soap scum, descale fixtures, clean grout"
      },
      {
        title: "Upholstery & Carpet Deep Clean",
        description: "Deep clean furniture, carpets, and fabric surfaces"
      }
    ],
    frequency: "Quarterly or Semi-annually"
  },

  // What's Included Section
  includedSectionHeading: "What's Included in Our Deep Cleaning",
  includedSectionSubheading:
    "Our deep cleaning service goes beyond standard cleaning to address areas that require special attention.",

  // Bathroom Section
  bathroomTitle: "Bathroom Transformation",
  bathroomDescription:
    "Our deep cleaning service gives your bathrooms a complete refresh, targeting built-up soap scum, water stains, and hidden dirt in overlooked areas.",
  bathroomImage:
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop",
  bathroomFeatures: [
    "Deep clean tile grout and remove mold/mildew",
    "Descale shower heads and faucets",
    "Deep clean behind toilet and under sink",
    "Sanitize all surfaces, including light switches and door knobs",
  ],

  // Kitchen Section
  kitchenTitle: "Kitchen Deep Clean",
  kitchenDescription:
    "Our kitchen deep cleaning targets grease build-up, appliance interiors, and hidden dirt in cabinets and drawers for a truly fresh kitchen.",
  kitchenImage:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1470&auto=format&fit=crop",
  kitchenFeatures: [
    "Clean inside oven, microwave, and refrigerator",
    "Degrease range hood, stovetop, and backsplash",
    "Deep clean cabinet fronts and drawer pulls",
    "Sanitize countertops and disinfect sink",
  ],

  // Living Areas Section
  livingAreasTitle: "Living Areas Deep Clean",
  livingAreasDescription:
    "We thoroughly clean all living spaces, focusing on areas that accumulate dust, allergens, and everyday wear.",
  livingAreasImage:
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1470&auto=format&fit=crop",
  livingAreasFeatures: [
    "Deep vacuum all carpets and upholstery",
    "Clean baseboards, window sills, and light fixtures",
    "Dust and polish all furniture surfaces",
    "Clean mirrors, glass surfaces, and picture frames",
  ],

  // Deep Cleaning Difference Section
  differenceHeading: "The Deep Cleaning Difference",
  differenceSubheading:
    "See the dramatic transformation our deep cleaning service delivers. These before and after comparisons showcase our thorough approach.",
  deepCleaningDifference: [
    {
      beforeImage: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842015/image17_iuidbj.png",
      afterImage: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750841995/image81_gteekm.png",
      heading:"Kitchen Transformation",
      caption: "Our deep cleaning removes built-up grease and grime from kitchen surfaces, leaving them spotless and sanitized.",
    },  
    {
      beforeImage: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842131/image59_fnzycd.png",
      afterImage: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750842162/image83_uvz5sr.png",
      heading:"Bathroom Revival",
      caption: "Deep cleaning removes stubborn stains, soap scum, and sanitizes all surfaces for a like-new bathroom.",
    }
  ],

  // When to Choose Deep Cleaning Section
  whenToChooseHeading: "When to Choose Deep Cleaning",
  whenToChooseSubheading:
    "Our deep cleaning service is ideal for specific situations when standard cleaning isn't enough.",

  // When to Choose - Card 1: Moving
  movingTitle: "Moving In or Out",
  movingDescription:
    "Start fresh in your new home or ensure you leave your old one in perfect condition for the next residents. Deep cleaning addresses years of accumulated dirt.",
  movingIcon:
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=100&auto=format&fit=crop",

  // When to Choose - Card 2: Seasonal
  seasonalTitle: "Seasonal Refresh",
  seasonalDescription:
    "Ideal for spring cleaning or seasonal refreshes when homes need extra attention after prolonged indoor time during winter months.",
  seasonalIcon:
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=100&auto=format&fit=crop",

  // When to Choose - Card 3: Special Occasions
  specialOccasionsTitle: "Special Occasions",
  specialOccasionsDescription:
    "Preparing for holidays, important guests, or events? Deep cleaning ensures your home is immaculate for those special moments that matter.",
  specialOccasionsIcon:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=100&auto=format&fit=crop",

  // Process Section
  processHeading: "Our Deep Cleaning Process",
  processSubheading:
    "We follow a systematic approach to ensure every corner of your home receives thorough attention.",

  // Process Steps
  processStep1Title: "Assessment & Planning",
  processStep1Description:
    "We start with a thorough walkthrough to identify areas that need special attention and plan our cleaning strategy.",
  processStep1Icon: "Search",
  processStep2Title: "Room-by-Room Deep Clean",
  processStep2Description:
    "Our team systematically cleans each room, focusing on details and hard-to-reach areas often missed in regular cleaning.",
  processStep2Icon: "Home",
  processStep3Title: "Final Inspection",
  processStep3Description:
    "We conduct a final quality check to ensure every detail meets our high standards before considering the job complete.",
  processStep3Icon: "CheckCircle",

  // Benefits Section
  benefitsHeading: "Why Choose Our Deep Cleaning Service",
  benefitsSubheading:
    "Experience the difference of professional deep cleaning that goes beyond surface-level maintenance.",

  // Benefits Items
  benefit1Title: "Healthier Living Environment",
  benefit1Description:
    "Remove allergens, dust mites, and bacteria that regular cleaning can't reach.",
  benefit1Icon: "Heart",
  benefit2Title: "Improved Air Quality",
  benefit2Description:
    "Deep cleaning eliminates hidden dust and pollutants for fresher, cleaner air.",
  benefit2Icon: "Wind",
  benefit3Title: "Extended Home Lifespan",
  benefit3Description:
    "Regular deep cleaning helps preserve your home's fixtures, surfaces, and materials.",
  benefit3Icon: "Clock",
  benefit4Title: "Stress Relief",
  benefit4Description:
    "Enjoy the peace of mind that comes with a thoroughly clean and organized space.",
  benefit4Icon: "Smile",

  // FAQ Section
  faqHeading: "Deep Cleaning FAQ",
  faqSubheading: "Common questions about our deep cleaning service",

  // Pricing Section
  pricingHeading: "Deep Cleaning Pricing",
  pricingSubheading:
    "Transparent, competitive pricing for thorough deep cleaning services",
};

export default function DeepCleaningEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/deep-cleaning");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData({
          ...result.data,
          faqs: Array.isArray(result.data.faqs) ? result.data.faqs : [],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: "error", text: "Failed to load deep cleaning data" });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save data
  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/cms/deep-cleaning", {
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
          text: "Deep cleaning content updated successfully",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update content",
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle array input changes
  const handleArrayChange = (
    arrayName: "bathroomFeatures" | "kitchenFeatures" | "livingAreasFeatures",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  // Add new feature
  const addFeature = (
    arrayName: "bathroomFeatures" | "kitchenFeatures" | "livingAreasFeatures"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  // Remove feature
  const removeFeature = (
    arrayName: "bathroomFeatures" | "kitchenFeatures" | "livingAreasFeatures",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Deep Cleaning Service Editor
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage content for the deep cleaning service page
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Back to Admin
              </Link>
              <Link
                href="/services/deep-cleaning"
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={saveData} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Hero Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Label
                </label>
                <input
                  type="text"
                  name="heroTopLabel"
                  value={formData.heroTopLabel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  name="heroHeading"
                  value={formData.heroHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading
                </label>
                <textarea
                  name="heroSubheading"
                  value={formData.heroSubheading}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Image URL
                </label>
                <input
                  type="url"
                  name="heroBackgroundImage"
                  value={formData.heroBackgroundImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Duration
                  </label>
                  <input
                    type="text"
                    name="heroServiceDuration"
                    value={formData.heroServiceDuration}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Guarantee
                  </label>
                  <input
                    type="text"
                    name="heroServiceGuarantee"
                    value={formData.heroServiceGuarantee}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  name="includedSectionHeading"
                  value={formData.includedSectionHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Subheading
                </label>
                <textarea
                  name="includedSectionSubheading"
                  value={formData.includedSectionSubheading}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Bathroom Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Bathroom Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="bathroomTitle"
                  value={formData.bathroomTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="bathroomDescription"
                  value={formData.bathroomDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="bathroomImage"
                  value={formData.bathroomImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {formData.bathroomFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange(
                          "bathroomFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature description"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature("bathroomFeatures", index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFeature("bathroomFeatures")}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Kitchen Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Kitchen Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="kitchenTitle"
                  value={formData.kitchenTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="kitchenDescription"
                  value={formData.kitchenDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="kitchenImage"
                  value={formData.kitchenImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature description"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature("kitchenFeatures", index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFeature("kitchenFeatures")}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Living Areas Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Living Areas Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="livingAreasTitle"
                  value={formData.livingAreasTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="livingAreasDescription"
                  value={formData.livingAreasDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="livingAreasImage"
                  value={formData.livingAreasImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {formData.livingAreasFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange(
                          "livingAreasFeatures",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature description"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeFeature("livingAreasFeatures", index)
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFeature("livingAreasFeatures")}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Deep Cleaning Difference Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Deep Cleaning Difference Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  name="differenceHeading"
                  value={formData.differenceHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading
                </label>
                <textarea
                  name="differenceSubheading"
                  value={formData.differenceSubheading}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Deep Cleaning Difference Images
                </h3>
              <div className="grid grid-cols-1 gap-4">
                {formData.deepCleaningDifference.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={item.heading}
                      onChange={(e) =>
                        setFormData((prev) => {
                          const newDifference = [...prev.deepCleaningDifference];
                          newDifference[index].heading = e.target.value;
                          return { ...prev, deepCleaningDifference: newDifference };
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
                          const newDifference = [...prev.deepCleaningDifference];
                          newDifference[index].beforeImage = e.target.value;
                          return { ...prev, deepCleaningDifference: newDifference };
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
                          const newDifference = [...prev.deepCleaningDifference];
                          newDifference[index].afterImage = e.target.value;
                          return { ...prev, deepCleaningDifference: newDifference };
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
                          const newDifference = [...prev.deepCleaningDifference];
                          newDifference[index].caption = e.target.value;
                          return { ...prev, deepCleaningDifference: newDifference };
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
  
            {/* When to Choose Deep Cleaning Section */}
            <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              When to Choose Deep Cleaning Section
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  name="whenToChooseHeading"
                  value={formData.whenToChooseHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Subheading
                </label>
                <textarea
                  name="whenToChooseSubheading"
                  value={formData.whenToChooseSubheading}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Moving Card */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Moving In or Out Card
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="movingTitle"
                      value={formData.movingTitle}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="movingDescription"
                      value={formData.movingDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon Image URL
                    </label>
                    <input
                      type="url"
                      name="movingIcon"
                      value={formData.movingIcon}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Seasonal Card */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Seasonal Refresh Card
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="seasonalTitle"
                      value={formData.seasonalTitle}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="seasonalDescription"
                      value={formData.seasonalDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon Image URL
                    </label>
                    <input
                      type="url"
                      name="seasonalIcon"
                      value={formData.seasonalIcon}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Special Occasions Card */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Special Occasions Card
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="specialOccasionsTitle"
                      value={formData.specialOccasionsTitle}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="specialOccasionsDescription"
                      value={formData.specialOccasionsDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon Image URL
                    </label>
                    <input
                      type="url"
                      name="specialOccasionsIcon"
                      value={formData.specialOccasionsIcon}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Reviews Section */}
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Client Reviews Section</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                <input
                  type="text"
                  name="clientReviewsHeading"
                  value={formData.clientReviewsHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                <textarea
                  name="clientReviewsSubheading"
                  value={formData.clientReviewsSubheading}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Reviews</label>
                {formData.clientReviews?.map((review, index) => (
                  <div key={index} className="mb-6 border-b pb-4 border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Review #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            clientReviews: prev.clientReviews?.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={review.rating}
                          onChange={e => {
                            const value = Number(e.target.value);
                            setFormData(prev => ({
                              ...prev,
                              clientReviews: prev.clientReviews?.map((r, i) =>
                                i === index ? { ...r, rating: value } : r
                              )
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                        <textarea
                          value={review.review}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              clientReviews: prev.clientReviews?.map((r, i) =>
                                i === index ? { ...r, review: value } : r
                              )
                            }));
                          }}
                          rows={3}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input
                          type="text"
                          value={review.clientName}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              clientReviews: prev.clientReviews?.map((r, i) =>
                                i === index ? { ...r, clientName: value } : r
                              )
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Location</label>
                        <input
                          type="text"
                          value={review.clientLocation}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              clientReviews: prev.clientReviews?.map((r, i) =>
                                i === index ? { ...r, clientLocation: value } : r
                              )
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Background Color</label>
                        <input
                          type="text"
                          value={review.avatarBgColor}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              clientReviews: prev.clientReviews?.map((r, i) =>
                                i === index ? { ...r, avatarBgColor: value } : r
                              )
                            }));
                          }}
                          placeholder="e.g., purple-500, teal-500"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      clientReviews: [...(prev.clientReviews || []), {
                        rating: 5,
                        review: '',
                        clientName: '',
                        clientLocation: '',
                        avatarBgColor: 'blue-500'
                      }]
                    }));
                  }}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Review
                </button>
              </div>
            </div>
          </div>

          {/* Deep vs Regular Cleaning Comparison Section */}
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Deep vs Regular Cleaning Comparison</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
                <input
                  type="text"
                  name="comparisonHeading"
                  value={formData.comparisonHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Subheading</label>
                <textarea
                  name="comparisonSubheading"
                  value={formData.comparisonSubheading}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Regular Cleaning */}
              <div className="border-t pt-4">
                <h3 className="text-md font-medium text-gray-800 mb-3">Regular Cleaning</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.regularCleaning?.title}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          regularCleaning: {
                            ...prev.regularCleaning,
                            title: value
                          }
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={formData.regularCleaning?.subtitle}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          regularCleaning: {
                            ...prev.regularCleaning,
                            subtitle: value
                          }
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    {formData.regularCleaning?.features?.map((feature, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700">Feature #{idx + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                regularCleaning: {
                                  ...prev.regularCleaning,
                                  features: prev.regularCleaning.features.filter((_, i) => i !== idx)
                                }
                              }));
                            }}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              regularCleaning: {
                                ...prev.regularCleaning,
                                features: prev.regularCleaning.features.map((f, i) =>
                                  i === idx ? { ...f, title: value } : f
                                )
                              }
                            }));
                          }}
                          placeholder="Feature title"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={feature.description}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              regularCleaning: {
                                ...prev.regularCleaning,
                                features: prev.regularCleaning.features.map((f, i) =>
                                  i === idx ? { ...f, description: value } : f
                                )
                              }
                            }));
                          }}
                          placeholder="Feature description"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          regularCleaning: {
                            ...prev.regularCleaning,
                            features: [
                              ...prev.regularCleaning.features,
                              { title: '', description: '' }
                            ]
                          }
                        }));
                      }}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Add Feature
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={formData.regularCleaning?.frequency}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          regularCleaning: {
                            ...prev.regularCleaning,
                            frequency: value
                          }
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Deep Cleaning */}
              <div className="border-t pt-4">
                <h3 className="text-md font-medium text-gray-800 mb-3">Deep Cleaning</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.deepCleaning?.title}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          deepCleaning: {
                            ...prev.deepCleaning,
                            title: value
                          }
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={formData.deepCleaning?.subtitle}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          deepCleaning: {
                            ...prev.deepCleaning,
                            subtitle: value
                          }
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    {formData.deepCleaning?.features?.map((feature, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700">Feature #{idx + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                deepCleaning: {
                                  ...prev.deepCleaning,
                                  features: prev.deepCleaning.features.filter((_, i) => i !== idx)
                                }
                              }));
                            }}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              deepCleaning: {
                                ...prev.deepCleaning,
                                features: prev.deepCleaning.features.map((f, i) =>
                                  i === idx ? { ...f, title: value } : f
                                )
                              }
                            }));
                          }}
                          placeholder="Feature title"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={feature.description}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              deepCleaning: {
                                ...prev.deepCleaning,
                                features: prev.deepCleaning.features.map((f, i) =>
                                  i === idx ? { ...f, description: value } : f
                                )
                              }
                            }));
                          }}
                          placeholder="Feature description"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          deepCleaning: {
                            ...prev.deepCleaning,
                            features: [
                              ...prev.deepCleaning.features,
                              { title: '', description: '' }
                            ]
                          }
                        }));
                      }}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Add Feature
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={formData.deepCleaning?.frequency}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          deepCleaning: {
                            ...prev.deepCleaning,
                            frequency: value
                          }
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">FAQ Section</h2>
            <p className="text-gray-600 mb-4">Manage the Frequently Asked Questions for the Deep Cleaning service page.</p>
            {formData.faqs && formData.faqs.length > 0 ? (
              formData.faqs.map((faq, idx) => (
                <div key={idx} className="mb-6 border-b pb-4 border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">FAQ #{idx + 1}</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          faqs: (prev.faqs ?? []).filter((_, i) => i !== idx),
                        }));
                      }}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          faqs: (prev.faqs ?? []).map((item, i) => i === idx ? { ...item, question: value } : item),
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <textarea
                      value={faq.answer}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          faqs: (prev.faqs ?? []).map((item, i) => i === idx ? { ...item, answer: value } : item),
                        }));
                      }}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mb-4">No FAQs added yet.</p>
            )}
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                faqs: [...(prev.faqs || []), { question: '', answer: '' }],
              }))}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 text-sm"
            >
              Add FAQ
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
