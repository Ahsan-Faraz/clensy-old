"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Check } from "lucide-react";

interface ChecklistItems {
  routine: {
    living: string[];
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
  };
  deep: {
    living: string[];
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
  };
  moving: {
    living: string[];
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
  };
}

interface FormData {
  heading: string;
  description: string;
  checklistItems: ChecklistItems;
  buttonText: string;
}

const roomNames = {
  living: "Living Room",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  bedroom: "Bedroom"
};

const cleaningTypes = {
  routine: "Routine",
  deep: "Deep",
  moving: "Moving"
};

export default function ChecklistEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState<keyof ChecklistItems>('routine');
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    description: "",
    checklistItems: {
      routine: { living: [], kitchen: [], bathroom: [], bedroom: [] },
      deep: { living: [], kitchen: [], bathroom: [], bedroom: [] },
      moving: { living: [], kitchen: [], bathroom: [], bedroom: [] }
    },
    buttonText: ""
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/checklist');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          heading: result.data.heading || "",
          description: result.data.description || "",
          checklistItems: result.data.checklistItems || {
            routine: { living: [], kitchen: [], bathroom: [], bedroom: [] },
            deep: { living: [], kitchen: [], bathroom: [], bedroom: [] },
            moving: { living: [], kitchen: [], bathroom: [], bedroom: [] }
          },
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
      const response = await fetch('/api/cms/checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Checklist section updated successfully' });
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

  // Handle checklist item changes
  const handleChecklistItemChange = (
    cleaningType: keyof ChecklistItems,
    room: keyof ChecklistItems['routine'],
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      checklistItems: {
        ...prev.checklistItems,
        [cleaningType]: {
          ...prev.checklistItems[cleaningType],
          [room]: prev.checklistItems[cleaningType][room].map((item, i) => 
            i === index ? value : item
          )
        }
      }
    }));
  };

  // Add checklist item
  const handleAddChecklistItem = (
    cleaningType: keyof ChecklistItems,
    room: keyof ChecklistItems['routine']
  ) => {
    setFormData(prev => ({
      ...prev,
      checklistItems: {
        ...prev.checklistItems,
        [cleaningType]: {
          ...prev.checklistItems[cleaningType],
          [room]: [...prev.checklistItems[cleaningType][room], ""]
        }
      }
    }));
  };

  // Delete checklist item
  const handleDeleteChecklistItem = (
    cleaningType: keyof ChecklistItems,
    room: keyof ChecklistItems['routine'],
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      checklistItems: {
        ...prev.checklistItems,
        [cleaningType]: {
          ...prev.checklistItems[cleaningType],
          [room]: prev.checklistItems[cleaningType][room].filter((_, i) => i !== index)
        }
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Checklist Section</h1>
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
              Edit the content of your checklist section. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
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

            {/* Cleaning Type Tabs */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Checklist Items</h3>
              <div className="flex space-x-2 mb-6">
                {Object.entries(cleaningTypes).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key as keyof ChecklistItems)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === key
                        ? 'bg-[#007bff] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label} Cleaning
                  </button>
                ))}
              </div>

              {/* Room Sections */}
              <div className="space-y-6">
                {Object.entries(roomNames).map(([roomKey, roomLabel]) => (
                  <div key={roomKey} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-[#007BFF] mr-2"></span>
                      {roomLabel} - {cleaningTypes[activeTab]} Cleaning
                    </h4>
                    <div className="space-y-3">
                      {formData.checklistItems[activeTab][roomKey as keyof ChecklistItems['routine']].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-5 h-5 rounded-full bg-[#007BFF] flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChecklistItemChange(
                              activeTab,
                              roomKey as keyof ChecklistItems['routine'],
                              index,
                              e.target.value
                            )}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            required
                          />
                          <button
                            type="button"
                            aria-label="Delete item"
                            className="ml-2 text-red-500 hover:text-red-700 text-xs px-2 py-1 border border-red-200 rounded"
                            onClick={() => handleDeleteChecklistItem(activeTab, roomKey as keyof ChecklistItems['routine'], index)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-2 px-3 py-1 bg-[#007BFF] text-white rounded text-xs hover:bg-[#005bb5]"
                        onClick={() => handleAddChecklistItem(activeTab, roomKey as keyof ChecklistItems['routine'])}
                      >
                        + Add Item
                      </button>
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
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6 bg-white">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {formatTextForPreview(formData.heading)}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {formatTextForPreview(formData.description)}
              </p>
            </div>

            {/* Cleaning Type buttons */}
            <div className="flex justify-center mb-8 space-x-2">
              {Object.entries(cleaningTypes).map(([type, label]) => (
                <button
                  key={type}
                  className={`px-6 py-2 rounded-full text-sm font-medium ${
                    type === 'routine'
                      ? "text-white bg-[#007BFF]"
                      : "text-gray-700 bg-gray-100 border border-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sample checklist preview (showing routine living room) */}
            <div className="max-w-md mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-6 capitalize flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#007BFF] mr-2"></div>
                  Living Room - Routine Cleaning
                </h3>
                <ul className="space-y-4">
                  {formData.checklistItems.routine.living.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-[#007BFF]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-900 text-sm">{item}</span>
                    </li>
                  ))}
                  {formData.checklistItems.routine.living.length > 4 && (
                    <li className="text-gray-500 text-sm ml-8">
                      ... and {formData.checklistItems.routine.living.length - 4} more items
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-center">
                <button className="text-[#007BFF] border border-[#007BFF] hover:bg-[#007BFF]/10 px-6 py-2 rounded-full text-sm font-medium inline-flex items-center">
                  {formData.buttonText}
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}