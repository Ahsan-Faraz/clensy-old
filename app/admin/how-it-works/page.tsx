"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";

export default function HowItWorksEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form state
  const [formData, setFormData] = useState({
    step1: {
      title: "",
      description: "",
      featureText: ""
    },
    step2: {
      title: "",
      description: "",
      featureText: ""
    },
    step3: {
      title: "",
      description: "",
      featureText: ""
    },
    buttonText: ""
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/how-it-works');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          step1: {
            title: result.data.step1?.title || "",
            description: result.data.step1?.description || "",
            featureText: result.data.step1?.featureText || ""
          },
          step2: {
            title: result.data.step2?.title || "",
            description: result.data.step2?.description || "",
            featureText: result.data.step2?.featureText || ""
          },
          step3: {
            title: result.data.step3?.title || "",
            description: result.data.step3?.description || "",
            featureText: result.data.step3?.featureText || ""
          },
          buttonText: result.data.buttonText || "Book Now"
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
      const response = await fetch('/api/cms/how-it-works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'How it works section updated successfully' });
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    step: 'step1' | 'step2' | 'step3' | null,
    field?: string
  ) => {
    const { name, value } = e.target;
    
    if (step) {
      // Update nested step field
      setFormData(prev => ({
        ...prev,
        [step]: {
          ...prev[step],
          [field || name]: value
        }
      }));
    } else {
      // Update top-level field (buttonText)
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Edit How It Works Section</h1>
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
              Edit the content of your "How it works" section. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
          </div>

          <form onSubmit={saveData}>
            {/* Step 1 */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  1
                </div>
                <h3 className="text-lg font-medium">Step 1</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="step1_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="step1_title"
                    value={formData.step1.title}
                    onChange={(e) => handleChange(e, 'step1', 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="step1_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="step1_description"
                    value={formData.step1.description}
                    onChange={(e) => handleChange(e, 'step1', 'description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="step1_featureText" className="block text-sm font-medium text-gray-700 mb-1">
                    Feature Text (with clock icon)
                  </label>
                  <input
                    type="text"
                    id="step1_featureText"
                    value={formData.step1.featureText}
                    onChange={(e) => handleChange(e, 'step1', 'featureText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  2
                </div>
                <h3 className="text-lg font-medium">Step 2</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="step2_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="step2_title"
                    value={formData.step2.title}
                    onChange={(e) => handleChange(e, 'step2', 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="step2_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="step2_description"
                    value={formData.step2.description}
                    onChange={(e) => handleChange(e, 'step2', 'description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="step2_featureText" className="block text-sm font-medium text-gray-700 mb-1">
                    Feature Text (with check icon)
                  </label>
                  <input
                    type="text"
                    id="step2_featureText"
                    value={formData.step2.featureText}
                    onChange={(e) => handleChange(e, 'step2', 'featureText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  3
                </div>
                <h3 className="text-lg font-medium">Step 3</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="step3_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="step3_title"
                    value={formData.step3.title}
                    onChange={(e) => handleChange(e, 'step3', 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="step3_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="step3_description"
                    value={formData.step3.description}
                    onChange={(e) => handleChange(e, 'step3', 'description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="step3_featureText" className="block text-sm font-medium text-gray-700 mb-1">
                    Feature Text (with calendar icon)
                  </label>
                  <input
                    type="text"
                    id="step3_featureText"
                    value={formData.step3.featureText}
                    onChange={(e) => handleChange(e, 'step3', 'featureText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
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
                onChange={(e) => handleChange(e, null)}
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
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6">
            <h2 className="text-3xl text-center font-bold mb-12">How it works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{formatTextForPreview(formData.step1.title)}</h3>
                    <p className="text-gray-600 mb-4">{formatTextForPreview(formData.step1.description)}</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 text-[#007BFF] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatTextForPreview(formData.step1.featureText)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{formatTextForPreview(formData.step2.title)}</h3>
                    <p className="text-gray-600 mb-4">{formatTextForPreview(formData.step2.description)}</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 text-[#007BFF] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{formatTextForPreview(formData.step2.featureText)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{formatTextForPreview(formData.step3.title)}</h3>
                    <p className="text-gray-600 mb-4">{formatTextForPreview(formData.step3.description)}</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 text-[#007BFF] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatTextForPreview(formData.step3.featureText)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Button */}
                <div className="mt-4">
                  <button className="px-8 py-3 rounded-full text-white font-medium bg-[#007BFF]">
                    {formData.buttonText}
                  </button>
                </div>
              </div>
              
              {/* Placeholder for phone mockup (right side) */}
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center text-gray-500 text-sm">
                Phone mockup area (not editable)
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}