"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Calendar, Phone } from "lucide-react";

interface CTACard {
  title: string;
  description: string;
  buttonText: string;
}

interface FormData {
  heading: string;
  description: string;
  leftCard: CTACard;
  rightCard: CTACard;
}

export default function CTAEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    description: "",
    leftCard: {
      title: "",
      description: "",
      buttonText: ""
    },
    rightCard: {
      title: "",
      description: "",
      buttonText: ""
    }
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/cta');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          heading: result.data.heading || "",
          description: result.data.description || "",
          leftCard: {
            title: result.data.leftCard?.title || "",
            description: result.data.leftCard?.description || "",
            buttonText: result.data.leftCard?.buttonText || ""
          },
          rightCard: {
            title: result.data.rightCard?.title || "",
            description: result.data.rightCard?.description || "",
            buttonText: result.data.rightCard?.buttonText || ""
          }
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
      const response = await fetch('/api/cms/cta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'CTA section updated successfully' });
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

  // Handle basic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle card input changes
  const handleCardChange = (
    card: 'leftCard' | 'rightCard',
    field: keyof CTACard,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [card]: {
        ...prev[card],
        [field]: value
      }
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
          <h1 className="text-2xl font-bold text-gray-900">Edit CTA Section</h1>
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
              Edit the content of your CTA section. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
          </div>

          <form onSubmit={saveData}>
            {/* Main Heading */}
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
                required
              />
            </div>

            {/* Main Description */}
            <div className="mb-8">
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

            {/* Left Card */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-[#007BFF] mr-2" />
                <h3 className="text-lg font-medium">Left Card (Order Online)</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="leftCard_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    id="leftCard_title"
                    value={formData.leftCard.title}
                    onChange={(e) => handleCardChange('leftCard', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="leftCard_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Description
                  </label>
                  <textarea
                    id="leftCard_description"
                    value={formData.leftCard.description}
                    onChange={(e) => handleCardChange('leftCard', 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="leftCard_buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    id="leftCard_buttonText"
                    value={formData.leftCard.buttonText}
                    onChange={(e) => handleCardChange('leftCard', 'buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 text-[#007BFF] mr-2" />
                <h3 className="text-lg font-medium">Right Card (Call Us Now)</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="rightCard_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    id="rightCard_title"
                    value={formData.rightCard.title}
                    onChange={(e) => handleCardChange('rightCard', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rightCard_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Description
                  </label>
                  <textarea
                    id="rightCard_description"
                    value={formData.rightCard.description}
                    onChange={(e) => handleCardChange('rightCard', 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rightCard_buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text (Phone Number)
                  </label>
                  <input
                    type="text"
                    id="rightCard_buttonText"
                    value={formData.rightCard.buttonText}
                    onChange={(e) => handleCardChange('rightCard', 'buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
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
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6 bg-white">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
                {formatTextForPreview(formData.heading)}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {formatTextForPreview(formData.description)}
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Left Card */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {formatTextForPreview(formData.leftCard.title)}
                </h3>
                <p className="text-gray-600 mb-6">
                  {formatTextForPreview(formData.leftCard.description)}
                </p>
                <button className="bg-[#007BFF] text-white hover:bg-[#0069D9] px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors duration-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formData.leftCard.buttonText}
                </button>
              </div>

              {/* Right Card */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {formatTextForPreview(formData.rightCard.title)}
                </h3>
                <p className="text-gray-600 mb-6">
                  {formatTextForPreview(formData.rightCard.description)}
                </p>
                <button className="bg-[#007BFF] text-white hover:bg-[#0069D9] px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors duration-300">
                  <Phone className="h-4 w-4 mr-2" />
                  {formData.rightCard.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}