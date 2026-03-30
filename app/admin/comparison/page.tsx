"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Check } from "lucide-react";

// Icon mapping for features
const iconMap = {
  "users": "👥",
  "clock": "⏰", 
  "shield-check": "🛡️",
  "leaf": "🍃",
  "heart-handshake": "🤝",
  "medal": "🏅",
  "badge-check": "✅"
};

interface Feature {
  name: string;
  clensy: boolean;
  others: boolean;
  icon: string;
}

interface FormData {
  heading: string;
  description: string;
  features: Feature[];
  buttonText: string;
}

export default function ComparisonEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    description: "",
    features: [],
    buttonText: ""
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/comparison');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          heading: result.data.heading || "",
          description: result.data.description || "",
          features: result.data.features || [],
          buttonText: result.data.buttonText || ""
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: 'error', text: 'Failed to load section data' });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save data
  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/cms/comparison', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Comparison section updated successfully' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update section' });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle feature name changes
  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, name: value } : feature
      )
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <Image 
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069431/website-images/x50aedpsjrpfubhn0d8b.png" 
                  alt="Clensy Logo" 
                  width={120} 
                  height={40} 
                  className="object-contain"
                />
                <span className="ml-4 text-sm font-medium text-gray-500">Admin Dashboard</span>
              </Link>
            </div>
            <div>
              <Link href="/admin" className="text-sm text-gray-700 hover:text-[#007bff]">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Comparison Section</h1>
          <Link href="/" target="_blank" className="text-sm text-[#007bff] hover:underline">
            View Live Site
          </Link>
        </div>

        {message.text && (
          <div className={`mb-6 p-3 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-8">
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-medium text-gray-900">Content Settings</h2>
            <p className="text-sm text-gray-500">
              Edit the content of your comparison section. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
          </div>

          <form onSubmit={saveData}>
            {/* Heading */}
            <div className="mb-6">
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="The Clensy <blue>Difference</blue>"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
              <p className="text-sm text-gray-500 mb-4">
                Edit the feature names. The checkmarks are automatically handled based on the original configuration.
              </p>
              
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{iconMap[feature.icon as keyof typeof iconMap] || "📋"}</span>
                      <span className="text-sm font-medium text-gray-700">Feature {index + 1}</span>
                    </div>
                    <input
                      type="text"
                      value={feature.name}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Feature name"
                      required
                    />
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span className={`flex items-center ${feature.clensy ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check className="h-4 w-4 mr-1" />
                        Clensy: {feature.clensy ? 'Yes' : 'No'}
                      </span>
                      <span className={`flex items-center ${feature.others ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check className="h-4 w-4 mr-1" />
                        Others: {feature.others ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button Text */}
            <div className="mb-8">
              <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  isSaving ? "bg-[#007bff]/70" : "bg-[#007bff] hover:bg-[#0069d9]"
                } transition-colors`}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6 bg-gray-50">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                {formatTextForPreview(formData.heading)}
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                {formatTextForPreview(formData.description)}
              </p>
              <div className="w-24 h-1 bg-[#007BFF] mx-auto mt-6"></div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-4xl mx-auto">
              {/* Header Row */}
              <div className="grid grid-cols-12 border-b border-gray-200">
                <div className="col-span-6 py-4 px-8">
                  <h3 className="text-lg font-semibold text-gray-800">Features</h3>
                </div>
                <div className="col-span-6 grid grid-cols-2">
                  <div className="bg-[#007BFF] text-white py-4 text-center font-semibold">
                    Clensy
                  </div>
                  <div className="bg-[#444b54] text-white py-4 text-center font-semibold">
                    Independent Maids
                  </div>
                </div>
              </div>

              {/* Feature Rows */}
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-12 ${
                    index !== formData.features.length - 1 ? "border-b border-gray-100" : ""
                  } ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="col-span-6 py-5 px-8 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border border-gray-100 flex items-center justify-center mr-4`}>
                      <span className="text-lg">{iconMap[feature.icon as keyof typeof iconMap] || "📋"}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{feature.name}</span>
                  </div>
                  <div className="col-span-6 grid grid-cols-2">
                    <div className="py-5 flex justify-center items-center">
                      <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="py-5 flex justify-center items-center">
                      {feature.others ? (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="text-center mt-10">
              <button className="px-8 py-3 bg-[#007BFF] text-white rounded-full font-medium shadow-lg">
                {formData.buttonText}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}