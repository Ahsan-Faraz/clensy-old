"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Star } from "lucide-react";

interface FormData {
  heading: string;
  buttonText: string;
}

export default function ReviewsEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    buttonText: ""
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/reviews');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          heading: result.data.heading || "",
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
      const response = await fetch('/api/cms/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Reviews section updated successfully' });
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Reviews Section</h1>
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
              Edit the content of your reviews section. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
            <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-md">
              <strong>Note:</strong> You can only edit the heading and button text. The actual reviews are not editable through this interface.
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
                placeholder="What People Are <blue>Saying About Us</blue>"
                required
              />
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
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6 bg-gradient-to-b from-white to-blue-50">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {formatTextForPreview(formData.heading)}
              </h2>
            </div>

            {/* Sample review cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Sample Review 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Sarah Johnson</p>
                    <p className="text-gray-500 text-sm">1 day ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="#FBBC05" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Monica was excellent. Went beyond in helping me. My sheets and comforter were not just washed but perfectly folded. Everything was spotless!
                </p>
                <div className="inline-flex items-center">
                  <span className="text-xs text-gray-500">Google Review</span>
                </div>
              </div>

              {/* Sample Review 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Michael Chen</p>
                    <p className="text-gray-500 text-sm">3 days ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="#FBBC05" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Clensy does the best job taking care of our house. Bailey recently cleaned our home and did an amazing job. Very thorough and professional.
                </p>
                <div className="inline-flex items-center">
                  <span className="text-xs text-gray-500">Google Review</span>
                </div>
              </div>

              {/* Sample Review 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    E
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Emily Rodriguez</p>
                    <p className="text-gray-500 text-sm">1 week ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="#FBBC05" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Arrived as planned! Great job! Everything polished. Baseboards done. Kitchen and bathroom spotless. Will definitely book again.
                </p>
                <div className="inline-flex items-center">
                  <span className="text-xs text-gray-500">Google Review</span>
                </div>
              </div>

              {/* Sample Review 4 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    D
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">David Thompson</p>
                    <p className="text-gray-500 text-sm">2 weeks ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="#FBBC05" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  My house was cleaned by Clensy today. Susan did a great job. I asked them to pay special attention to the kitchen and they delivered.
                </p>
                <div className="inline-flex items-center">
                  <span className="text-xs text-gray-500">Google Review</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="text-center">
              <button className="px-8 py-3 rounded-full font-medium text-white bg-[#007AFF] shadow-sm">
                {formData.buttonText}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}