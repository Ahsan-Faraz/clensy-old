"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatTextForPreview } from "@/lib/utils/formatText";
import { Phone, Mail, MapPin, Clock, Calendar, Star } from "lucide-react";

interface ServiceTag {
  name: string;
}

interface StatIndicator {
  number: string;
  description: string;
}

interface BusinessHour {
  day: string;
  hours: string;
}

interface FormData {
  heroSection: {
    topLabel: string;
    heading: string;
    description: string;
    sendMessageButtonText: string;
    supportText: string;
    responseText: string;
    image: string;
  };
  trustSection: {
    mainText: string;
    subtitle: string;
    serviceTags: ServiceTag[];
  };
  statsSection: {
    indicators: StatIndicator[];
  };
  contactInformation: {
    sectionTitle: string;
    phone: {
      title: string;
      description: string;
      phoneNumber: string;
    };
    email: {
      title: string;
      description: string;
      emailAddress: string;
    };
    officeLocation: {
      title: string;
      description: string;
      addressLine1: string;
      addressLine2: string;
      cityStateZip: string;
    };
    businessHours: {
      title: string;
      description: string;
      hours: BusinessHour[];
    };
    immediateAssistance: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  consultationSection: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

export default function ContactEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    heroSection: {
      topLabel: "",
      heading: "",
      description: "",
      sendMessageButtonText: "",
      supportText: "",
      responseText: "",
      image: ""
    },
    trustSection: {
      mainText: "",
      subtitle: "",
      serviceTags: []
    },
    statsSection: {
      indicators: []
    },
    contactInformation: {
      sectionTitle: "",
      phone: {
        title: "",
        description: "",
        phoneNumber: ""
      },
      email: {
        title: "",
        description: "",
        emailAddress: ""
      },
      officeLocation: {
        title: "",
        description: "",
        addressLine1: "",
        addressLine2: "",
        cityStateZip: ""
      },
      businessHours: {
        title: "",
        description: "",
        hours: []
      },
      immediateAssistance: {
        title: "",
        description: "",
        buttonText: ""
      }
    },
    consultationSection: {
      heading: "",
      description: "",
      buttonText: ""
    }
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/contact');
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: 'error', text: 'Failed to load contact page data' });
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
      const response = await fetch('/api/cms/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Contact page updated successfully' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update contact page' });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle nested input changes
  const handleNestedChange = (
    section: keyof FormData,
    field: string,
    value: string,
    subField?: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: subField ? {
          ...(prev[section] as any)[field],
          [subField]: value
        } : value
      }
    }));
  };

  // Handle array changes for service tags
  const handleServiceTagChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      trustSection: {
        ...prev.trustSection,
        serviceTags: prev.trustSection.serviceTags.map((tag, i) => 
          i === index ? { name: value } : tag
        )
      }
    }));
  };

  // Handle array changes for stats
  const handleStatChange = (index: number, field: keyof StatIndicator, value: string) => {
    setFormData(prev => ({
      ...prev,
      statsSection: {
        indicators: prev.statsSection.indicators.map((stat, i) => 
          i === index ? { ...stat, [field]: value } : stat
        )
      }
    }));
  };

  // Handle business hours changes
  const handleBusinessHourChange = (index: number, field: keyof BusinessHour, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        businessHours: {
          ...prev.contactInformation.businessHours,
          hours: prev.contactInformation.businessHours.hours.map((hour, i) => 
            i === index ? { ...hour, [field]: value } : hour
          )
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Contact Page</h1>
          <Link href="/contact" target="_blank" className="text-sm text-[#007bff] hover:underline">
            View Live Page
          </Link>
        </div>

        {message.text && (
          <div className={`mb-6 p-3 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={saveData} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Hero Section</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Image URL
                </label>
                <input
                  type="text"
                  value={formData.heroSection.image}
                  onChange={(e) => handleNestedChange('heroSection', 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                {formData.heroSection.image && (
                  <div className="mt-2">
                    <Image
                      src={formData.heroSection.image}
                      alt="Hero Preview"
                      width={400}
                      height={250}
                      className="rounded border object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Label
                </label>
                <input
                  type="text"
                  value={formData.heroSection.topLabel}
                  onChange={(e) => handleNestedChange('heroSection', 'topLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.heroSection.heading}
                  onChange={(e) => handleNestedChange('heroSection', 'heading', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Use <blue>text</blue> for blue text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.heroSection.description}
                  onChange={(e) => handleNestedChange('heroSection', 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send Message Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.sendMessageButtonText}
                    onChange={(e) => handleNestedChange('heroSection', 'sendMessageButtonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.supportText}
                    onChange={(e) => handleNestedChange('heroSection', 'supportText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Response Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroSection.responseText}
                    onChange={(e) => handleNestedChange('heroSection', 'responseText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Trust Section</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Text
                </label>
                <input
                  type="text"
                  value={formData.trustSection.mainText}
                  onChange={(e) => handleNestedChange('trustSection', 'mainText', e.target.value)}
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
                  value={formData.trustSection.subtitle}
                  onChange={(e) => handleNestedChange('trustSection', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Service Tags
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.trustSection.serviceTags.map((tag, index) => (
                    <input
                      key={index}
                      type="text"
                      value={tag.name}
                      onChange={(e) => handleServiceTagChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder={`Service ${index + 1}`}
                      required
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Stats Section</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.statsSection.indicators.map((stat, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Stat {index + 1}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Number/Value
                      </label>
                      <input
                        type="text"
                        value={stat.number}
                        onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={stat.description}
                        onChange={(e) => handleStatChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-8">
              {/* Section Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={formData.contactInformation.sectionTitle}
                  onChange={(e) => handleNestedChange('contactInformation', 'sectionTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Phone */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Section
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={formData.contactInformation.phone.title}
                    onChange={(e) => handleNestedChange('contactInformation', 'phone', e.target.value, 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.phone.description}
                    onChange={(e) => handleNestedChange('contactInformation', 'phone', e.target.value, 'description')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Description"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.phone.phoneNumber}
                    onChange={(e) => handleNestedChange('contactInformation', 'phone', e.target.value, 'phoneNumber')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Section
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={formData.contactInformation.email.title}
                    onChange={(e) => handleNestedChange('contactInformation', 'email', e.target.value, 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.email.description}
                    onChange={(e) => handleNestedChange('contactInformation', 'email', e.target.value, 'description')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Description"
                    required
                  />
                  <input
                    type="email"
                    value={formData.contactInformation.email.emailAddress}
                    onChange={(e) => handleNestedChange('contactInformation', 'email', e.target.value, 'emailAddress')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>

              {/* Office Location */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Office Location
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={formData.contactInformation.officeLocation.title}
                    onChange={(e) => handleNestedChange('contactInformation', 'officeLocation', e.target.value, 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.officeLocation.description}
                    onChange={(e) => handleNestedChange('contactInformation', 'officeLocation', e.target.value, 'description')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Description"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.officeLocation.addressLine1}
                    onChange={(e) => handleNestedChange('contactInformation', 'officeLocation', e.target.value, 'addressLine1')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Address Line 1"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.officeLocation.addressLine2}
                    onChange={(e) => handleNestedChange('contactInformation', 'officeLocation', e.target.value, 'addressLine2')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Address Line 2"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.officeLocation.cityStateZip}
                    onChange={(e) => handleNestedChange('contactInformation', 'officeLocation', e.target.value, 'cityStateZip')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="City, State ZIP"
                    required
                  />
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Business Hours
                </h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.contactInformation.businessHours.title}
                    onChange={(e) => handleNestedChange('contactInformation', 'businessHours', e.target.value, 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.businessHours.description}
                    onChange={(e) => handleNestedChange('contactInformation', 'businessHours', e.target.value, 'description')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Description"
                    required
                  />
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-gray-600">Hours</label>
                    {formData.contactInformation.businessHours.hours.map((hour, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={hour.day}
                          onChange={(e) => handleBusinessHourChange(index, 'day', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Day(s)"
                          required
                        />
                        <input
                          type="text"
                          value={hour.hours}
                          onChange={(e) => handleBusinessHourChange(index, 'hours', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Hours"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Immediate Assistance */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Immediate Assistance Card
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={formData.contactInformation.immediateAssistance.title}
                    onChange={(e) => handleNestedChange('contactInformation', 'immediateAssistance', e.target.value, 'title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Title"
                    required
                  />
                  <textarea
                    value={formData.contactInformation.immediateAssistance.description}
                    onChange={(e) => handleNestedChange('contactInformation', 'immediateAssistance', e.target.value, 'description')}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Description"
                    required
                  />
                  <input
                    type="text"
                    value={formData.contactInformation.immediateAssistance.buttonText}
                    onChange={(e) => handleNestedChange('contactInformation', 'immediateAssistance', e.target.value, 'buttonText')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Button Text"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Consultation Section</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={formData.consultationSection.heading}
                  onChange={(e) => handleNestedChange('consultationSection', 'heading', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.consultationSection.description}
                  onChange={(e) => handleNestedChange('consultationSection', 'description', e.target.value)}
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
                  value={formData.consultationSection.buttonText}
                  onChange={(e) => handleNestedChange('consultationSection', 'buttonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
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

        {/* Preview Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Hero Preview */}
            <div className="bg-gray-900 text-white p-8">
              <div className="inline-block mb-4 px-3 py-1 bg-white/10 rounded-full">
                <span className="text-white/90 text-sm">
                  {formData.heroSection.topLabel}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">
                {formatTextForPreview(formData.heroSection.heading)}
              </h1>
              <p className="text-white/80 mb-6 max-w-xl">
                {formatTextForPreview(formData.heroSection.description)}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm">
                  {formData.heroSection.sendMessageButtonText}
                </button>
                <div className="flex items-center text-white/90 text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  {formData.heroSection.supportText}
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {formData.heroSection.responseText}
                </div>
              </div>
            </div>

            {/* Trust Section Preview */}
            <div className="p-6 bg-gray-50">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2">{formatTextForPreview(formData.trustSection.mainText)}</h2>
                <p className="text-gray-600 mb-4">{formatTextForPreview(formData.trustSection.subtitle)}</p>
                <div className="flex justify-center gap-2">
                  {formData.trustSection.serviceTags.map((tag, index) => (
                    <span key={index} className="bg-blue-600/20 text-blue-600 px-3 py-1 rounded-full text-xs">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {formData.statsSection.indicators.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    {stat.number === "4.9" && (
                      <div className="flex justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
                        ))}
                      </div>
                    )}
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Preview */}
            <div className="p-6 bg-gray-50">
              <h2 className="text-xl font-bold mb-6">{formatTextForPreview(formData.contactInformation.sectionTitle)}</h2>
              <div className="space-y-4">
                {/* Phone */}
                <div className="bg-white p-4 rounded-lg flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">{formatTextForPreview(formData.contactInformation.phone.title)}</h3>
                    <p className="text-gray-600 text-sm mb-1">{formData.contactInformation.phone.description}</p>
                    <p className="text-blue-600 font-medium">{formData.contactInformation.phone.phoneNumber}</p>
                  </div>
                </div>
                
                {/* Immediate Assistance */}
                <div className="bg-blue-600 text-white p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{formData.contactInformation.immediateAssistance.title}</h3>
                  <p className="text-white/90 mb-3 text-sm">{formData.contactInformation.immediateAssistance.description}</p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                    {formData.contactInformation.immediateAssistance.buttonText}
                  </button>
                </div>
              </div>
            </div>

            {/* Consultation Section Preview */}
            <div className="p-6 bg-gray-900 text-white text-center">
              <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">{formData.consultationSection.heading}</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">{formData.consultationSection.description}</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium">
                {formData.consultationSection.buttonText}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}