"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
}

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

  // Kitchen Section
  kitchenTitle: string;
  kitchenDescription: string;
  kitchenImage: string;
  kitchenFeatures: string[];

  // Bathroom Section
  bathroomTitle: string;
  bathroomDescription: string;
  bathroomImage: string;
  bathroomFeatures: string[];

  // Living Areas Section
  livingAreasTitle: string;
  livingAreasDescription: string;
  livingAreasImage: string;
  livingAreasFeatures: string[];

  // Feature Section
  featureSectionHeading: string;
  featureSectionSubheading: string;
  featureSectionImage: string;
  featureSectionPoints: string[];

  // How It Works Section
  howItWorksHeading: string;
  howItWorksSubheading: string;

  // Step 1: Book Online
  step1Title: string;
  step1Description: string;
  step1Image: string;
  step1Badge: string;

  // Step 2: We Clean
  step2Title: string;
  step2Description: string;
  step2Image: string;

  // Step 3: Relax & Enjoy
  step3Title: string;
  step3Description: string;
  step3Image: string;

  // Benefits Section
  benefitsHeading: string;
  benefitsSubheading: string;
  benefitsImage: string;

  // Benefit 1: Consistent Excellence
  benefit1Title: string;
  benefit1Description: string;

  // Benefit 2: Reclaimed Time & Energy
  benefit2Title: string;
  benefit2Description: string;

  // Benefit 3: Enhanced Well-being
  benefit3Title: string;
  benefit3Description: string;

  // FAQ Section
  faqs: FAQItem[];
}

export default function RoutineCleaningAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    // Hero Section
    heroTopLabel: "Premium Residential Services",
    heroHeading: "Experience Pristine Routine Cleaning",
    heroSubheading:
      "Our signature routine cleaning service maintains your home in immaculate condition with expert attention to detail. Perfect for busy professionals and families seeking consistent cleanliness.",
    heroBackgroundImage:
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=2070&auto=format&fit=crop",
    heroServiceDuration: "2-3 Hour Service",
    heroServiceGuarantee: "100% Satisfaction",

    // What's Included Section
    includedSectionHeading: "What's Included in Our Routine Cleaning",
    includedSectionSubheading:
      "Our comprehensive routine cleaning service ensures every essential area of your home receives meticulous attention.",

    // Kitchen Section
    kitchenTitle: "Kitchen Excellence",
    kitchenDescription:
      "The heart of your home deserves special attention. Our routine kitchen cleaning ensures cooking spaces remain fresh and sanitized.",
    kitchenImage:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1470&auto=format&fit=crop",
    kitchenFeatures: [
      "Clean and sanitize countertops and backsplash",
      "Clean exterior of appliances and cabinet fronts",
      "Thoroughly clean and sanitize sink and fixtures",
      "Vacuum and mop floors, removing all debris",
    ],

    // Bathroom Section
    bathroomTitle: "Bathroom Refresh",
    bathroomDescription:
      "Our bathroom cleaning routines ensure these essential spaces remain hygienic and sparkling clean after every visit.",
    bathroomImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop",
    bathroomFeatures: [
      "Clean and disinfect toilet, shower, tub and sink",
      "Clean mirrors and glass surfaces to a streak-free shine",
      "Wipe down bathroom fixtures and cabinet fronts",
      "Vacuum and mop floors, removing all debris",
    ],

    // Living Areas Section
    livingAreasTitle: "Living Area Maintenance",
    livingAreasDescription:
      "The spaces where you relax and entertain deserve special attention to maintain comfort and cleanliness.",
    livingAreasImage:
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1470&auto=format&fit=crop",
    livingAreasFeatures: [
      "Dust all accessible surfaces, including furniture",
      "Vacuum carpets, rugs, and upholstery",
      "Dust ceiling fans and light fixtures within reach",
      "Clean baseboards and remove cobwebs",
    ],

    // Feature Section
    featureSectionHeading: "Exceptional Cleaning Results, Every Time",
    featureSectionSubheading:
      "Our professional cleaners follow a meticulous process to ensure your home receives the highest standard of cleaning on every visit.",
    featureSectionImage:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1770&auto=format&fit=crop",
    featureSectionPoints: [
      "Consistently thorough cleaning with attention to detail",
      "Eco-friendly cleaning products for a healthier home",
      "Professionally trained and background-checked staff",
    ],

    // How It Works Section
    howItWorksHeading: "How Our Routine Cleaning Works",
    howItWorksSubheading:
      "Getting started with our premium routine cleaning service is seamless and convenient.",

    // Step 1: Book Online
    step1Title: "Book Online",
    step1Description:
      "Schedule your cleaning service online in minutes. Choose your preferred date and time that works for your schedule.",
    step1Image:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=400&auto=format&fit=crop",
    step1Badge: "Instant Online Pricing",

    // Step 2: We Clean
    step2Title: "We Clean",
    step2Description:
      "Our professional team arrives promptly at your scheduled time and meticulously cleans your home to exceed your expectations.",
    step2Image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=400&auto=format&fit=crop",

    // Step 3: Relax & Enjoy
    step3Title: "Relax & Enjoy",
    step3Description:
      "Return to a pristine, fresh home. Set up recurring cleanings to maintain your immaculate living space effortlessly.",
    step3Image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop",

    // Benefits Section
    benefitsHeading: "Why Choose Our Routine Cleaning Service",
    benefitsSubheading:
      "Our premium routine cleaning service offers exceptional benefits to maintain your home in pristine condition with minimal effort.",
    benefitsImage:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1287&auto=format&fit=crop",

    // Benefit 1: Consistent Excellence
    benefit1Title: "Consistent Excellence",
    benefit1Description:
      "Regular professional cleanings ensure your home maintains a consistently pristine appearance and feel, preventing the gradual accumulation of dirt and grime.",

    // Benefit 2: Reclaimed Time & Energy
    benefit2Title: "Reclaimed Time & Energy",
    benefit2Description:
      "Regain your valuable time and energy by entrusting your cleaning needs to our professional team, allowing you to focus on what matters most to you.",

    // Benefit 3: Enhanced Well-being
    benefit3Title: "Enhanced Well-being",
    benefit3Description:
      "Regular professional cleaning significantly reduces allergens, dust, and bacteria, creating a healthier living environment that promotes overall well-being for you and your family.",

    // FAQ Section
    faqs: [
      {
        question: "Do I need to be home during the cleaning?",
        answer:
          "No, you don't need to be home. Many of our clients provide a key or access code so we can clean while they're at work. Our cleaners are thoroughly vetted, background-checked, and fully insured for your peace of mind.",
      },
      {
        question: "Can I change my cleaning schedule if needed?",
        answer:
          "Absolutely! We understand schedules change. You can reschedule cleanings with at least 48 hours notice without any fee. We also offer the flexibility to occasionally add additional cleanings when you need them.",
      },
      {
        question: "What cleaning products do you use?",
        answer:
          "We use high-quality, eco-friendly cleaning products as our standard. If you have specific product preferences or sensitivities, we're happy to use products you provide or make accommodations for allergies and preferences.",
      },
      {
        question: "What if I'm not satisfied with the cleaning?",
        answer:
          "Your satisfaction is guaranteed. If you're not completely satisfied with any area we've cleaned, contact us within 24 hours and we'll return to reclean that area at no additional cost to you.",
      },
    ],
  });

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || session?.user?.role !== "admin") {
      router.push("/");
      return;
    }

    fetchData();
  }, [status, session, router]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/routine-cleaning");
      const result = await response.json();
      if (result.success) {
        setFormData({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    arrayName: keyof FormData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (arrayName: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] as string[]), ""],
    }));
  };

  const removeArrayItem = (arrayName: keyof FormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/cms/routine-cleaning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: "Data saved successfully!" });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to save data",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while saving" });
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Routine Cleaning CMS
              </h1>
              <p className="mt-2 text-gray-600">
                Manage content for the routine cleaning service page
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
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
                      type="text"
                      name="heroBackgroundImage"
                      value={formData.heroBackgroundImage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                      type="text"
                      name="kitchenImage"
                      value={formData.kitchenImage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("kitchenFeatures", index)
                          }
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("kitchenFeatures")}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add Feature
                    </button>
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
                      type="text"
                      name="bathroomImage"
                      value={formData.bathroomImage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("bathroomFeatures", index)
                          }
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("bathroomFeatures")}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
                      type="text"
                      name="livingAreasImage"
                      value={formData.livingAreasImage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("livingAreasFeatures", index)
                          }
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("livingAreasFeatures")}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature Section - "Exceptional Cleaning Results, Every Time" */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Feature Section - "Exceptional Cleaning Results, Every Time"
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading
                    </label>
                    <input
                      type="text"
                      name="featureSectionHeading"
                      value={formData.featureSectionHeading}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subheading
                    </label>
                    <textarea
                      name="featureSectionSubheading"
                      value={formData.featureSectionSubheading}
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
                      type="text"
                      name="featureSectionImage"
                      value={formData.featureSectionImage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feature Points
                    </label>
                    {formData.featureSectionPoints.map((point, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) =>
                            handleArrayChange(
                              "featureSectionPoints",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("featureSectionPoints", index)
                          }
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("featureSectionPoints")}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add Point
                    </button>
                  </div>
                </div>
              </div>

              {/* How It Works Section */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  How It Works Section
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      name="howItWorksHeading"
                      value={formData.howItWorksHeading}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Subheading
                    </label>
                    <textarea
                      name="howItWorksSubheading"
                      value={formData.howItWorksSubheading}
                      onChange={handleChange}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Step 1: Book Online */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Step 1: Book Online
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="step1Title"
                        value={formData.step1Title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="step1Description"
                        value={formData.step1Description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="step1Image"
                        value={formData.step1Image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        name="step1Badge"
                        value={formData.step1Badge}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: We Clean */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Step 2: We Clean
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="step2Title"
                        value={formData.step2Title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="step2Description"
                        value={formData.step2Description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="step2Image"
                        value={formData.step2Image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Relax & Enjoy */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Step 3: Relax & Enjoy
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="step3Title"
                        value={formData.step3Title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="step3Description"
                        value={formData.step3Description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="step3Image"
                        value={formData.step3Image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section - "Why Choose Our Routine Cleaning Service" */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Benefits Section - "Why Choose Our Routine Cleaning Service"
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      name="benefitsHeading"
                      value={formData.benefitsHeading}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Subheading
                    </label>
                    <textarea
                      name="benefitsSubheading"
                      value={formData.benefitsSubheading}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Image URL
                    </label>
                    <input
                      type="text"
                      name="benefitsImage"
                      value={formData.benefitsImage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Benefit 1: Consistent Excellence */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Benefit 1: Consistent Excellence
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="benefit1Title"
                        value={formData.benefit1Title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="benefit1Description"
                        value={formData.benefit1Description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Benefit 2: Reclaimed Time & Energy */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Benefit 2: Reclaimed Time & Energy
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="benefit2Title"
                        value={formData.benefit2Title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="benefit2Description"
                        value={formData.benefit2Description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Benefit 3: Enhanced Well-being */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">
                    Benefit 3: Enhanced Well-being
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="benefit3Title"
                        value={formData.benefit3Title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="benefit3Description"
                        value={formData.benefit3Description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white shadow rounded-lg p-6 mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">FAQ Section</h2>
                <p className="text-gray-600 mb-4">Manage the Frequently Asked Questions for the Routine Cleaning service page.</p>
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
                              faqs: prev.faqs.filter((_, i) => i !== idx),
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
                              faqs: prev.faqs.map((item, i) => i === idx ? { ...item, question: value } : item),
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
                              faqs: prev.faqs.map((item, i) => i === idx ? { ...item, answer: value } : item),
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
                    faqs: [...prev.faqs, { question: '', answer: '' }],
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
    </div>
  );
}
