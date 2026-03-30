"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Users, Award, Building2, Home, Target, Shield } from "lucide-react";

interface CustomerType {
  title: string;
  description: string;
}

interface FormData {
  heroSection: {
    heading: string;
    tagline: string;
  };
  ourStorySection: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    image?: string; // Optional image field
  };
  whyWeStartedSection: {
    heading: string;
    subtitle: string;
    quoteText: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  whatMakesUsDifferentSection: {
    heading: string;
    residentialCommercial: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    eliteTeam: {
      title: string;
      paragraph1: string;
      paragraph2: string;
      image?: string; // Optional image field
    };
  };
  clientFocusedTech: {
    heading: string;
    features: string[];
  };
  whoWeServeSection: {
    heading: string;
    subtitle: string;
    customerTypes: CustomerType[];
  };
  ourMissionSection: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    closingLine: string;
  };
  ctaSection: {
    heading: string;
    description: string;
    bookButtonText: string;
    contactButtonText: string;
  };
}

const defaultFormData: FormData = {
  heroSection: {
    heading: "",
    tagline: ""
  },
  ourStorySection: {
    heading: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    image: ""
  },
  whyWeStartedSection: {
    heading: "",
    subtitle: "",
    quoteText: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: ""
  },
  whatMakesUsDifferentSection: {
    heading: "",
    residentialCommercial: {
      title: "",
      paragraph1: "",
      paragraph2: ""
    },
    eliteTeam: {
      title: "",
      paragraph1: "",
      paragraph2: "",
      image: ""
    }
  },
  clientFocusedTech: {
    heading: "",
    features: []
  },
  whoWeServeSection: {
    heading: "",
    subtitle: "",
    customerTypes: []
  },
  ourMissionSection: {
    heading: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    closingLine: ""
  },
  ctaSection: {
    heading: "",
    description: "",
    bookButtonText: "",
    contactButtonText: ""
  }
};

// Icon mapping for customer types
const customerIcons = [Users, Award, Building2, Home, Target, Shield];

export default function AboutEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/about');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData(result.data);
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
      const response = await fetch('/api/cms/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'About section updated successfully' });
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

  // Handle nested input changes
  const handleNestedChange = (section: string, field: string, value: string | string[], subField?: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: subField ? {
        ...prev[section as keyof FormData],
        [field]: {
          ...(prev[section as keyof FormData] as any)[field],
          [subField]: value
        }
      } : {
        ...prev[section as keyof FormData],
        [field]: value
      }
    }));
  };

  // Handle customer type changes
  const handleCustomerTypeChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      whoWeServeSection: {
        ...prev.whoWeServeSection,
        customerTypes: prev.whoWeServeSection.customerTypes.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
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
          <h1 className="text-2xl font-bold text-gray-900">Edit About Us Page</h1>
          <Link href="/company/about" target="_blank" className="text-sm text-[#007bff] hover:underline">
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
              Edit the content of your About Us page. Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;blue&gt;text&lt;/blue&gt;</code> to make text blue.
            </p>
          </div>

          <form onSubmit={saveData} className="space-y-8">
            {/* Hero Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.heading}
                    onChange={(e) => handleNestedChange('heroSection', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.tagline}
                    onChange={(e) => handleNestedChange('heroSection', 'tagline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Our Story Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.ourStorySection.heading}
                    onChange={(e) => handleNestedChange('ourStorySection', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 1
                  </label>
                  <textarea
                    value={formData.ourStorySection.paragraph1}
                    onChange={(e) => handleNestedChange('ourStorySection', 'paragraph1', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 2
                  </label>
                  <textarea
                    value={formData.ourStorySection.paragraph2}
                    onChange={(e) => handleNestedChange('ourStorySection', 'paragraph2', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 3
                  </label>
                  <textarea
                    value={formData.ourStorySection.paragraph3}
                    onChange={(e) => handleNestedChange('ourStorySection', 'paragraph3', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="text"
                    value={formData.ourStorySection.image}
                    onChange={(e) => handleNestedChange('ourStorySection', 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Why We Started Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Why We Started Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.whyWeStartedSection.heading}
                    onChange={(e) => handleNestedChange('whyWeStartedSection', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.whyWeStartedSection.subtitle}
                    onChange={(e) => handleNestedChange('whyWeStartedSection', 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quote Text
                  </label>
                  <textarea
                    value={formData.whyWeStartedSection.quoteText}
                    onChange={(e) => handleNestedChange('whyWeStartedSection', 'quoteText', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 1
                  </label>
                  <textarea
                    value={formData.whyWeStartedSection.paragraph1}
                    onChange={(e) => handleNestedChange('whyWeStartedSection', 'paragraph1', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 2
                  </label>
                  <textarea
                    value={formData.whyWeStartedSection.paragraph2}
                    onChange={(e) => handleNestedChange('whyWeStartedSection', 'paragraph2', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 3
                  </label>
                  <textarea
                    value={formData.whyWeStartedSection.paragraph3}
                    onChange={(e) => handleNestedChange('whyWeStartedSection', 'paragraph3', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* What Makes Us Different Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What Makes Us Different Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.whatMakesUsDifferentSection.heading}
                    onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                {/* Residential & Commercial */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-3">Residential & Commercial Cleaning</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.whatMakesUsDifferentSection.residentialCommercial.title}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'residentialCommercial', e.target.value, 'title')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paragraph 1
                      </label>
                      <textarea
                        value={formData.whatMakesUsDifferentSection.residentialCommercial.paragraph1}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'residentialCommercial', e.target.value, 'paragraph1')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paragraph 2
                      </label>
                      <textarea
                        value={formData.whatMakesUsDifferentSection.residentialCommercial.paragraph2}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'residentialCommercial', e.target.value, 'paragraph2')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Elite Team */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-3">Elite Team</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.whatMakesUsDifferentSection.eliteTeam.title}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'eliteTeam', e.target.value, 'title')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paragraph 1
                      </label>
                      <textarea
                        value={formData.whatMakesUsDifferentSection.eliteTeam.paragraph1}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'eliteTeam', e.target.value, 'paragraph1')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paragraph 2
                      </label>
                      <textarea
                        value={formData.whatMakesUsDifferentSection.eliteTeam.paragraph2}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'eliteTeam', e.target.value, 'paragraph2')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="text"
                        value={formData.whatMakesUsDifferentSection.eliteTeam.image}
                        onChange={(e) => handleNestedChange('whatMakesUsDifferentSection', 'eliteTeam', e.target.value, 'image')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client-Focused Tech Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Client-Focused Tech Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.clientFocusedTech?.heading ?? ""}
                    onChange={(e) => handleNestedChange('clientFocusedTech', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  <textarea
                    value={formData.clientFocusedTech?.features?.join('\n') || ""}
                    onChange={(e) => handleNestedChange('clientFocusedTech', 'features', e.target.value.split('\n').map(feature => feature.trim()))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Who We Serve Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Who We Serve Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.whoWeServeSection.heading}
                    onChange={(e) => handleNestedChange('whoWeServeSection', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <textarea
                    value={formData.whoWeServeSection.subtitle}
                    onChange={(e) => handleNestedChange('whoWeServeSection', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Customer Types */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Customer Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.whoWeServeSection.customerTypes.map((customer, index) => {
                      const IconComponent = customerIcons[index] || Users;
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="font-medium text-gray-700">Customer Type {index + 1}</span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                              </label>
                              <input
                                type="text"
                                value={customer.title}
                                onChange={(e) => handleCustomerTypeChange(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                value={customer.description}
                                onChange={(e) => handleCustomerTypeChange(index, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Our Mission Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Our Mission Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.ourMissionSection.heading}
                    onChange={(e) => handleNestedChange('ourMissionSection', 'heading', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 1
                  </label>
                  <textarea
                    value={formData.ourMissionSection.paragraph1}
                    onChange={(e) => handleNestedChange('ourMissionSection', 'paragraph1', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 2
                  </label>
                  <textarea
                    value={formData.ourMissionSection.paragraph2}
                    onChange={(e) => handleNestedChange('ourMissionSection', 'paragraph2', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 3
                  </label>
                  <textarea
                    value={formData.ourMissionSection.paragraph3}
                    onChange={(e) => handleNestedChange('ourMissionSection', 'paragraph3', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph 4
                  </label>
                  <textarea
                    value={formData.ourMissionSection.paragraph4}
                    onChange={(e) => handleNestedChange('ourMissionSection', 'paragraph4', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Closing Line
                  </label>
                  <input
                    type="text"
                    value={formData.ourMissionSection.closingLine}
                    onChange={(e) => handleNestedChange('ourMissionSection', 'closingLine', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Call-to-Action Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.ctaSection.heading}
                    onChange={(e) => handleNestedChange('ctaSection', 'heading', e.target.value)}
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
                    onChange={(e) => handleNestedChange('ctaSection', 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Book Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.ctaSection.bookButtonText}
                      onChange={(e) => handleNestedChange('ctaSection', 'bookButtonText', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.ctaSection.contactButtonText}
                      onChange={(e) => handleNestedChange('ctaSection', 'contactButtonText', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
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
          <div className="border border-gray-200 rounded-lg overflow-hidden p-6 bg-gray-50 space-y-8">
            {/* Hero Preview */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                {formatTextForPreview(formData.heroSection.heading)}
              </h1>
              <p className="text-lg text-gray-600">
                {formatTextForPreview(formData.heroSection.tagline)}
              </p>
            </div>

            {/* Our Story Preview */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {formatTextForPreview(formData.ourStorySection.heading)}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>{formatTextForPreview(formData.ourStorySection.paragraph1)}</p>
                <p>{formatTextForPreview(formData.ourStorySection.paragraph2)}</p>
                <p>{formatTextForPreview(formData.ourStorySection.paragraph3)}</p>
              </div>
            </div>

            {/* Why We Started Preview */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {formatTextForPreview(formData.whyWeStartedSection.heading)}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {formatTextForPreview(formData.whyWeStartedSection.subtitle)}
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <p className="text-xl text-gray-700 italic">
                  "{formatTextForPreview(formData.whyWeStartedSection.quoteText)}"
                </p>
              </div>
            </div>

            {/* CTA Preview */}
            <div className="text-center bg-blue-100 p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">
                {formatTextForPreview(formData.ctaSection.heading)}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {formatTextForPreview(formData.ctaSection.description)}
              </p>
              <div className="space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
                  {formData.ctaSection.bookButtonText}
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full">
                  {formData.ctaSection.contactButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}