"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatTextForPreview } from "@/lib/utils/formatText";
import Image from "next/image";
import Link from "next/link";

export default function HeroEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form state
  const [formData, setFormData] = useState({
    topLabel: "",
    heading: "",
    subheading: "",
    buttonText: "",
    feature1: "",
    feature2: "",
    backgroundImage: ""
  });

  // Function to fetch hero data
  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/cms/hero');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          topLabel: result.data.topLabel || "",
          heading: result.data.heading || "",
          subheading: result.data.subheading || "",
          buttonText: result.data.buttonText || "",
          feature1: result.data.feature1 || "",
          feature2: result.data.feature2 || "",
          backgroundImage: result.data.backgroundImage || ""
        });
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setMessage({ type: 'error', text: 'Failed to load hero section data' });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save hero data
  const saveHeroData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/cms/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Hero section updated successfully' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update hero section' });
      }
    } catch (error) {
      console.error("Error saving hero data:", error);
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

  // Check authentication and load data
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/protected");
    } else if (status === "authenticated") {
      fetchHeroData();
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Hero Section</h1>
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
              Edit the content of your hero section. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
          </div>

          <form onSubmit={saveHeroData}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="topLabel" className="block text-sm font-medium text-gray-700 mb-1">
                  Top Label (Pill Button)
                </label>
                <input
                  type="text"
                  id="topLabel"
                  name="topLabel"
                  value={formData.topLabel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <textarea
                  id="heading"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">This will appear as the main heading. Original: "Professional cleaning for your home"</p>
              </div>

              <div>
                <label htmlFor="subheading" className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading
                </label>
                <textarea
                  id="subheading"
                  name="subheading"
                  value={formData.subheading}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">This will appear below the heading. Original: "We make it easy to get your home cleaned. Professional cleaning services tailored to your needs."</p>
              </div>

              <div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="feature1" className="block text-sm font-medium text-gray-700 mb-1">
                    Feature 1 Text
                  </label>
                  <input
                    type="text"
                    id="feature1"
                    name="feature1"
                    value={formData.feature1}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="feature2" className="block text-sm font-medium text-gray-700 mb-1">
                    Feature 2 Text
                  </label>
                  <input
                    type="text"
                    id="feature2"
                    name="feature2"
                    value={formData.feature2}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Background Image URL
                </label>
                <input
                  type="text"
                  id="backgroundImage"
                  name="backgroundImage"
                  value={formData.backgroundImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Enter the URL of the background image. Leave as is to keep current image.</p>
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

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative bg-black h-64 flex items-center">
              {formData.backgroundImage && (
                <>
                  <div className="absolute inset-0 z-0">
                    <div className="w-full h-full relative">
                      <Image 
                        src={formData.backgroundImage}
                        alt="Hero background"
                        fill
                        className="object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    </div>
                  </div>
                </>
              )}
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-lg">
                  <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                    <span className="text-white/90 text-sm font-medium">
                      {formData.topLabel}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight mb-4">
                    {formatTextForPreview(formData.heading)}
                    </h1>
                    <p className="text-base text-white/80 mb-6">
                    {formatTextForPreview(formData.subheading)}
                    </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium inline-flex items-center justify-center w-40">
                      {formData.buttonText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}