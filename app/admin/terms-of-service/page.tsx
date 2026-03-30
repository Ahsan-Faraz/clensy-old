"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface TermsOfServiceSection {
  title: string;
  content: string;
  order: number;
}

interface TermsOfServiceData {
  heroSection: {
    heading: string;
    description: string;
  };
  companyInfo: {
    websiteUrl: string;
    email: string;
    phone: string;
  };
  sections: TermsOfServiceSection[];
  agreementSection: {
    description: string;
    lastUpdated: string;
  };
}

export default function TermsOfServiceAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<TermsOfServiceData>({
    heroSection: {
      heading: '',
      description: '',
    },
    companyInfo: {
      websiteUrl: '',
      email: '',
      phone: '',
    },
    sections: [],
    agreementSection: {
      description: '',
      lastUpdated: new Date().toLocaleDateString(),
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/cms/terms-of-service');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch terms of service data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch terms of service data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/cms/terms-of-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Terms of service updated successfully",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update terms of service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update terms of service",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSectionChange = (index: number, field: keyof TermsOfServiceSection, value: string) => {
    const newSections = [...data.sections];
    newSections[index] = {
      ...newSections[index],
      [field]: field === 'order' ? parseInt(value) : value,
    };
    setData({ ...data, sections: newSections });
  };

  const addSection = () => {
    const newOrder = data.sections.length > 0 
      ? Math.max(...data.sections.map(s => s.order)) + 1 
      : 1;
    setData({
      ...data,
      sections: [
        ...data.sections,
        { title: '', content: '', order: newOrder }
      ],
    });
  };

  const removeSection = (index: number) => {
    const newSections = data.sections.filter((_, i) => i !== index);
    setData({ ...data, sections: newSections });
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Edit Terms of Service</h1>

          {/* Hero Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={data.heroSection.heading}
                  onChange={(e) => setData({
                    ...data,
                    heroSection: { ...data.heroSection, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={data.heroSection.description}
                  onChange={(e) => setData({
                    ...data,
                    heroSection: { ...data.heroSection, description: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  value={data.companyInfo.websiteUrl}
                  onChange={(e) => setData({
                    ...data,
                    companyInfo: { ...data.companyInfo, websiteUrl: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={data.companyInfo.email}
                  onChange={(e) => setData({
                    ...data,
                    companyInfo: { ...data.companyInfo, email: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={data.companyInfo.phone}
                  onChange={(e) => setData({
                    ...data,
                    companyInfo: { ...data.companyInfo, phone: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Terms Sections</h2>
              <button
                onClick={addSection}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Section
              </button>
            </div>
            <div className="space-y-6">
              {data.sections.map((section, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium">Section {index + 1}</h3>
                    <button
                      onClick={() => removeSection(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                        className="w-full p-2 border rounded-md"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order
                      </label>
                      <input
                        type="number"
                        value={section.order}
                        onChange={(e) => handleSectionChange(index, 'order', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Agreement Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={data.agreementSection.description}
                  onChange={(e) => setData({
                    ...data,
                    agreementSection: { ...data.agreementSection, description: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated Date
                </label>
                <input
                  type="text"
                  value={data.agreementSection.lastUpdated}
                  onChange={(e) => setData({
                    ...data,
                    agreementSection: { ...data.agreementSection, lastUpdated: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}