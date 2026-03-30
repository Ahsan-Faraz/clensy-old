"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Check, Plus, Trash2 } from "lucide-react";

// Define types for our complex data structure
type CleaningType = "routine" | "deep" | "moving";
type RoomType = "kitchen" | "bathroom" | "bedroom" | "living";

interface CleaningItems {
  routine: {
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
    living: string[];
  };
  deep: {
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
    living: string[];
  };
  moving: {
    kitchen: string[];
    bathroom: string[];
    bedroom: string[];
    living: string[];
  };
}

interface FormData {
  heroSection: {
    heading: string;
    description: string;
    buttonText: string;
  };
  interactiveGuideSection: {
    heading: string;
    description: string;
  };
  mainChecklistSection: {
    heading: string;
    description: string;
    routineButtonText: string;
    deepButtonText: string;
    movingButtonText: string;
    roomTitles: {
      kitchen: string;
      bathroom: string;
      bedroom: string;
      living: string;
    };
    cleaningItems: CleaningItems;
  };
  ctaSection: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

const roomNames = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  bedroom: "Bedroom",
  living: "Living Areas"
};

const cleaningTypes = {
  routine: "Routine",
  deep: "Deep",
  moving: "Moving"
};

export default function ChecklistPageEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState<CleaningType>('routine');
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    heroSection: {
      heading: "",
      description: "",
      buttonText: ""
    },
    interactiveGuideSection: {
      heading: "",
      description: ""
    },
    mainChecklistSection: {
      heading: "",
      description: "",
      routineButtonText: "",
      deepButtonText: "",
      movingButtonText: "",
      roomTitles: {
        kitchen: "",
        bathroom: "",
        bedroom: "",
        living: ""
      },
      cleaningItems: {
        routine: { kitchen: [], bathroom: [], bedroom: [], living: [] },
        deep: { kitchen: [], bathroom: [], bedroom: [], living: [] },
        moving: { kitchen: [], bathroom: [], bedroom: [], living: [] }
      }
    },
    ctaSection: {
      heading: "",
      description: "",
      buttonText: ""
    }
  });

  // Function to fetch data from BOTH endpoints
  const fetchData = async () => {
    try {
      // Fetch page-level text (hero, guide, CTA) from checklist-page API
      const pageResponse = await fetch('/api/cms/checklist-page');
      const pageResult = await pageResponse.json();
      
      // Fetch checklist items from the SAME source as landing page section
      const checklistResponse = await fetch('/api/cms/checklist');
      const checklistResult = await checklistResponse.json();
      
      if (pageResult.success && pageResult.data) {
        const pageData = pageResult.data;
        
        // If we have checklist data, override the cleaning items with it
        if (checklistResult.success && checklistResult.data?.checklistItems) {
          const items = checklistResult.data.checklistItems;
          pageData.mainChecklistSection = {
            ...pageData.mainChecklistSection,
            cleaningItems: {
              routine: {
                kitchen: items.routine?.kitchen || [],
                bathroom: items.routine?.bathroom || [],
                bedroom: items.routine?.bedroom || [],
                living: items.routine?.living || [],
              },
              deep: {
                kitchen: items.deep?.kitchen || [],
                bathroom: items.deep?.bathroom || [],
                bedroom: items.deep?.bedroom || [],
                living: items.deep?.living || [],
              },
              moving: {
                kitchen: items.moving?.kitchen || [],
                bathroom: items.moving?.bathroom || [],
                bedroom: items.moving?.bedroom || [],
                living: items.moving?.living || [],
              },
            },
          };
        }
        
        setFormData(pageData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: 'error', text: 'Failed to load page data' });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save data to BOTH endpoints
  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Save page-level text to checklist-page API
      const pageResponse = await fetch('/api/cms/checklist-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const pageResult = await pageResponse.json();

      // Also save checklist items to the checklist API (landing page source)
      const checklistPayload = {
        heading: formData.mainChecklistSection.heading,
        description: formData.mainChecklistSection.description,
        checklistItems: formData.mainChecklistSection.cleaningItems,
        buttonText: "View Full 50-Point Checklist",
      };
      const checklistResponse = await fetch('/api/cms/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checklistPayload),
      });
      const checklistResult = await checklistResponse.json();
      
      if (pageResult.success && checklistResult.success) {
        setMessage({ type: 'success', text: 'Checklist page and landing page section both updated successfully' });
      } else {
        const errors = [];
        if (!pageResult.success) errors.push('page text');
        if (!checklistResult.success) errors.push('checklist items');
        setMessage({ type: 'error', text: `Failed to update: ${errors.join(', ')}` });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle basic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, field: string) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData],
        [field]: value
      }
    }));
  };

  // Handle room title changes
  const handleRoomTitleChange = (room: RoomType, value: string) => {
    setFormData(prev => ({
      ...prev,
      mainChecklistSection: {
        ...prev.mainChecklistSection,
        roomTitles: {
          ...prev.mainChecklistSection.roomTitles,
          [room]: value
        }
      }
    }));
  };

  // Handle cleaning item changes
  const handleCleaningItemChange = (
    cleaningType: CleaningType,
    room: RoomType,
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      mainChecklistSection: {
        ...prev.mainChecklistSection,
        cleaningItems: {
          ...prev.mainChecklistSection.cleaningItems,
          [cleaningType]: {
            ...prev.mainChecklistSection.cleaningItems[cleaningType],
            [room]: prev.mainChecklistSection.cleaningItems[cleaningType][room].map((item, i) => 
              i === index ? value : item
            )
          }
        }
      }
    }));
  };

  // Add new cleaning item
  const addCleaningItem = (cleaningType: CleaningType, room: RoomType) => {
    setFormData(prev => ({
      ...prev,
      mainChecklistSection: {
        ...prev.mainChecklistSection,
        cleaningItems: {
          ...prev.mainChecklistSection.cleaningItems,
          [cleaningType]: {
            ...prev.mainChecklistSection.cleaningItems[cleaningType],
            [room]: [...prev.mainChecklistSection.cleaningItems[cleaningType][room], ""]
          }
        }
      }
    }));
  };

  // Remove cleaning item
  const removeCleaningItem = (cleaningType: CleaningType, room: RoomType, index: number) => {
    setFormData(prev => ({
      ...prev,
      mainChecklistSection: {
        ...prev.mainChecklistSection,
        cleaningItems: {
          ...prev.mainChecklistSection.cleaningItems,
          [cleaningType]: {
            ...prev.mainChecklistSection.cleaningItems[cleaningType],
            [room]: prev.mainChecklistSection.cleaningItems[cleaningType][room].filter((_, i) => i !== index)
          }
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Checklist Page</h1>
          <Link href="/company/checklist" target="_blank" className="text-sm text-[#007bff] hover:underline">
            View Live Page
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
              Edit the content of your checklist page. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
          </div>

          <form onSubmit={saveData} className="space-y-8">
            {/* Hero Section */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Hero Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Heading
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.heading}
                    onChange={(e) => handleChange(e, 'heroSection', 'heading')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.heroSection.description}
                    onChange={(e) => handleChange(e, 'heroSection', 'description')}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.buttonText}
                    onChange={(e) => handleChange(e, 'heroSection', 'buttonText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Interactive Guide Section */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Interactive Guide Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.interactiveGuideSection.heading}
                    onChange={(e) => handleChange(e, 'interactiveGuideSection', 'heading')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.interactiveGuideSection.description}
                    onChange={(e) => handleChange(e, 'interactiveGuideSection', 'description')}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Main Checklist Section */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Main Checklist Section</h3>
              
              {/* Basic Fields */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.mainChecklistSection.heading}
                    onChange={(e) => handleChange(e, 'mainChecklistSection', 'heading')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.mainChecklistSection.description}
                    onChange={(e) => handleChange(e, 'mainChecklistSection', 'description')}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Button Texts */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Routine Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.mainChecklistSection.routineButtonText}
                    onChange={(e) => handleChange(e, 'mainChecklistSection', 'routineButtonText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deep Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.mainChecklistSection.deepButtonText}
                    onChange={(e) => handleChange(e, 'mainChecklistSection', 'deepButtonText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moving Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.mainChecklistSection.movingButtonText}
                    onChange={(e) => handleChange(e, 'mainChecklistSection', 'movingButtonText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Room Titles */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-4">Room Titles</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(roomNames).map(([roomKey, roomLabel]) => (
                    <div key={roomKey}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {roomLabel} Title
                      </label>
                      <input
                        type="text"
                        value={formData.mainChecklistSection.roomTitles[roomKey as RoomType]}
                        onChange={(e) => handleRoomTitleChange(roomKey as RoomType, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cleaning Items */}
              <div>
                <h4 className="text-md font-medium mb-4">Cleaning Items</h4>
                
                {/* Cleaning Type Tabs */}
                <div className="flex space-x-2 mb-6">
                  {Object.entries(cleaningTypes).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveTab(key as CleaningType)}
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

                {/* Room Sections for Active Cleaning Type */}
                <div className="space-y-6">
                  {Object.entries(roomNames).map(([roomKey, roomLabel]) => (
                    <div key={`${activeTab}-${roomKey}`} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-md font-medium flex items-center">
                          <span className="w-3 h-3 rounded-full bg-[#007BFF] mr-2"></span>
                          {roomLabel} - {cleaningTypes[activeTab]} Cleaning
                        </h5>
                        <button
                          type="button"
                          onClick={() => addCleaningItem(activeTab, roomKey as RoomType)}
                          className="flex items-center text-sm text-[#007bff] hover:text-[#0056b3]"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.mainChecklistSection.cleaningItems[activeTab][roomKey as RoomType].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-5 h-5 rounded-full bg-[#007BFF] flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            </div>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleCleaningItemChange(
                                activeTab,
                                roomKey as RoomType,
                                index,
                                e.target.value
                              )}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeCleaningItem(activeTab, roomKey as RoomType, index)}
                              className="flex-shrink-0 mt-2 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-4">CTA Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.ctaSection.heading}
                    onChange={(e) => handleChange(e, 'ctaSection', 'heading')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.ctaSection.description}
                    onChange={(e) => handleChange(e, 'ctaSection', 'description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.ctaSection.buttonText}
                    onChange={(e) => handleChange(e, 'ctaSection', 'buttonText')}
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
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6 space-y-8">
            {/* Hero Preview */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {formatTextForPreview(formData.heroSection.heading)}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {formatTextForPreview(formData.heroSection.description)}
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                {formData.heroSection.buttonText}
              </button>
            </div>

            {/* Interactive Guide Preview */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {formatTextForPreview(formData.interactiveGuideSection.heading)}
              </h2>
              <p className="text-gray-600">
                {formatTextForPreview(formData.interactiveGuideSection.description)}
              </p>
            </div>

            {/* Main Checklist Preview */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {formatTextForPreview(formData.mainChecklistSection.heading)}
              </h2>
              <p className="text-gray-600 mb-6">
                {formatTextForPreview(formData.mainChecklistSection.description)}
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg">
                  {formData.mainChecklistSection.routineButtonText}
                </button>
                <button className="bg-blue-700/50 text-white px-4 py-2 rounded-lg">
                  {formData.mainChecklistSection.deepButtonText}
                </button>
                <button className="bg-blue-700/50 text-white px-4 py-2 rounded-lg">
                  {formData.mainChecklistSection.movingButtonText}
                </button>
              </div>
              
              {/* Sample room preview */}
              <div className="text-left max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-6xl font-bold text-gray-200 mr-4">K</span>
                  {formData.mainChecklistSection.roomTitles.kitchen}
                </h3>
                <ul className="space-y-2">
                  {formData.mainChecklistSection.cleaningItems.routine.kitchen.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center mt-1">
                        <Check className="h-2 w-2 text-blue-600" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                  <li className="text-gray-500 text-sm ml-6">... and more items</li>
                </ul>
              </div>
            </div>

            {/* CTA Preview */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {formatTextForPreview(formData.ctaSection.heading)}
              </h2>
              <p className="text-gray-600 mb-6">
                {formatTextForPreview(formData.ctaSection.description)}
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                {formData.ctaSection.buttonText}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}