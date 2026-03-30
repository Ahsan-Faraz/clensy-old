"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Minus, Save, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

interface ExtrasServiceData {
  // Hero Section
  heroTopLabel: string;
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  heroServiceDuration: string;
  heroServiceGuarantee: string;

  // Trust Indicators Section
  trustIndicatorsHeading: string;
  trustIndicator1Number: string;
  trustIndicator1Text: string;
  trustIndicator2Number: string;
  trustIndicator2Text: string;
  trustIndicator3Number: string;
  trustIndicator3Text: string;
  trustIndicator4Number: string;
  trustIndicator4Text: string;

  // Premium Extra Services Section
  extrasHeading: string;
  extrasSubheading: string;
  premiumExtraServices: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    icon: string;
    features: string[];
  }>;

  // How To Add Extra Services Section
  howItWorksHeading: string;
  howItWorksSubheading: string;
  howToAddExtraServicesSteps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    badge: string;
    icon: string;
  }>;

  // Extras Pricing Section
  pricingHeading: string;
  pricingSubheading: string;
  extrasPricing: Array<{
    serviceId: string;
    serviceName: string;
    price: string;
    priceUnit: string;
    icon: string;
    features: string[];
  }>;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ExtrasServiceAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<ExtrasServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/extras-service");
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        toast.error("Failed to load content", {
          description: "Could not fetch Extra Services data from the server.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Connection error", {
        description: "Could not connect to the server to load content.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    
    try {
      const response = await fetch("/api/cms/extras-service", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Extra Services content saved successfully!", {
          description: "All changes have been saved to the database.",
          duration: 4000,
        });
        // Update local data with the response to avoid version conflicts
        setData(result.data);
      } else {
        toast.error("Failed to save content", {
          description: result.error || "An unknown error occurred while saving.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Network error", {
        description: "Could not connect to the server. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof ExtrasServiceData, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  // Handler for FAQ changes
  const handleFaqChange = (
    index: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    if (!data) return;
    const newFaqs = [...data.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setData({ ...data, faqs: newFaqs });
  };

  // Handler for adding new FAQ
  const addFaq = () => {
    if (!data) return;
    const newFaqs = [...data.faqs, { question: "", answer: "" }];
    setData({ ...data, faqs: newFaqs });
  };

  // Handler for removing FAQ
  const removeFaq = (index: number) => {
    if (!data) return;
    const newFaqs = data.faqs.filter((_, i) => i !== index);
    setData({ ...data, faqs: newFaqs });
  };

  // Handler for Premium Extra Services
  const handleServiceChange = (
    index: number,
    field: keyof ExtrasServiceData['premiumExtraServices'][0],
    value: string | string[]
  ) => {
    if (!data) return;
    const newServices = [...data.premiumExtraServices];
    if (field === 'features') {
      newServices[index] = { ...newServices[index], [field]: value as string[] };
    } else {
      newServices[index] = { ...newServices[index], [field]: value as string };
    }
    setData({ ...data, premiumExtraServices: newServices });
  };

  // Handler for adding new service
  const addService = () => {
    if (!data) return;
    const newServices = [...data.premiumExtraServices, {
      id: "",
      name: "",
      description: "",
      image: "",
      icon: "Plus",
      features: []
    }];
    setData({ ...data, premiumExtraServices: newServices });
    toast.success("New service added", {
      description: "A new premium extra service has been added to the list.",
      duration: 2000,
    });
  };

  // Handler for removing service
  const removeService = (index: number) => {
    if (!data) return;
    const serviceName = data.premiumExtraServices[index]?.name || `Service ${index + 1}`;
    const newServices = data.premiumExtraServices.filter((_, i) => i !== index);
    setData({ ...data, premiumExtraServices: newServices });
    toast.success("Service removed", {
      description: `"${serviceName}" has been removed from the list.`,
      duration: 2000,
    });
  };

  // Handler for Steps
  const handleStepChange = (
    index: number,
    field: keyof ExtrasServiceData['howToAddExtraServicesSteps'][0],
    value: string | number
  ) => {
    if (!data) return;
    const newSteps = [...data.howToAddExtraServicesSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setData({ ...data, howToAddExtraServicesSteps: newSteps });
  };

  // Handler for adding new step
  const addStep = () => {
    if (!data) return;
    const newSteps = [...data.howToAddExtraServicesSteps, {
      stepNumber: data.howToAddExtraServicesSteps.length + 1,
      title: "",
      description: "",
      badge: "",
      icon: "Check"
    }];
    setData({ ...data, howToAddExtraServicesSteps: newSteps });
  };

  // Handler for removing step
  const removeStep = (index: number) => {
    if (!data) return;
    const newSteps = data.howToAddExtraServicesSteps.filter((_, i) => i !== index);
    setData({ ...data, howToAddExtraServicesSteps: newSteps });
  };

  // Handler for Pricing
  const handlePricingChange = (
    index: number,
    field: keyof ExtrasServiceData['extrasPricing'][0],
    value: string | string[]
  ) => {
    if (!data) return;
    const newPricing = [...data.extrasPricing];
    if (field === 'features') {
      newPricing[index] = { ...newPricing[index], [field]: value as string[] };
    } else {
      newPricing[index] = { ...newPricing[index], [field]: value as string };
    }
    setData({ ...data, extrasPricing: newPricing });
  };

  // Handler for adding new pricing
  const addPricing = () => {
    if (!data) return;
    const newPricing = [...data.extrasPricing, {
      serviceId: "",
      serviceName: "",
      price: "",
      priceUnit: "",
      icon: "Plus",
      features: []
    }];
    setData({ ...data, extrasPricing: newPricing });
  };

  // Handler for removing pricing
  const removePricing = (index: number) => {
    if (!data) return;
    const newPricing = data.extrasPricing.filter((_, i) => i !== index);
    setData({ ...data, extrasPricing: newPricing });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Extra Services CMS
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your extra services content
          </p>
        </div>

        <div className="space-y-8">
                     {/* Hero Section */}
           <div className="bg-white p-6 rounded-lg shadow-sm border">
             <h2 className="text-xl font-semibold mb-6 text-gray-900">
               Hero Section
             </h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Top Label
                 </label>
                 <input
                   type="text"
                   value={data.heroTopLabel}
                   onChange={(e) =>
                     handleInputChange("heroTopLabel", e.target.value)
                   }
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Heading
                 </label>
                 <input
                   type="text"
                   value={data.heroHeading}
                   onChange={(e) =>
                     handleInputChange("heroHeading", e.target.value)
                   }
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Subheading
                 </label>
                 <textarea
                   value={data.heroSubheading}
                   onChange={(e) =>
                     handleInputChange("heroSubheading", e.target.value)
                   }
                   rows={3}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Background Image URL
                 </label>
                 <input
                   type="url"
                   value={data.heroBackgroundImage}
                   onChange={(e) =>
                     handleInputChange("heroBackgroundImage", e.target.value)
                   }
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Service Duration
                   </label>
                   <input
                     type="text"
                     value={data.heroServiceDuration}
                     onChange={(e) =>
                       handleInputChange("heroServiceDuration", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Service Guarantee
                   </label>
                   <input
                     type="text"
                     value={data.heroServiceGuarantee}
                     onChange={(e) =>
                       handleInputChange("heroServiceGuarantee", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>
             </div>
           </div>

           {/* Trust Indicators Section */}
           <div className="bg-white p-6 rounded-lg shadow-sm border">
             <h2 className="text-xl font-semibold mb-6 text-gray-900">
               Trust Indicators Section
             </h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Section Heading
                 </label>
                 <input
                   type="text"
                   value={data.trustIndicatorsHeading}
                   onChange={(e) =>
                     handleInputChange("trustIndicatorsHeading", e.target.value)
                   }
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 1 Number
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator1Number}
                     onChange={(e) =>
                       handleInputChange("trustIndicator1Number", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 1 Text
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator1Text}
                     onChange={(e) =>
                       handleInputChange("trustIndicator1Text", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 2 Number
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator2Number}
                     onChange={(e) =>
                       handleInputChange("trustIndicator2Number", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 2 Text
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator2Text}
                     onChange={(e) =>
                       handleInputChange("trustIndicator2Text", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 3 Number
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator3Number}
                     onChange={(e) =>
                       handleInputChange("trustIndicator3Number", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 3 Text
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator3Text}
                     onChange={(e) =>
                       handleInputChange("trustIndicator3Text", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 4 Number
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator4Number}
                     onChange={(e) =>
                       handleInputChange("trustIndicator4Number", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Indicator 4 Text
                   </label>
                   <input
                     type="text"
                     value={data.trustIndicator4Text}
                     onChange={(e) =>
                       handleInputChange("trustIndicator4Text", e.target.value)
                     }
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
               </div>
             </div>
           </div>

          {/* Premium Extra Services - Dynamic Array */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Premium Extra Services
              </h2>
              <button
                type="button"
                onClick={addService}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.extrasHeading}
                  onChange={(e) =>
                    handleInputChange("extrasHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.extrasSubheading}
                  onChange={(e) =>
                    handleInputChange("extrasSubheading", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {data.premiumExtraServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Service #{index + 1}
                  </h3>
                  {data.premiumExtraServices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service ID
                    </label>
                    <input
                      type="text"
                      value={service.id}
                      onChange={(e) => handleServiceChange(index, 'id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., windows"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Window Cleaning"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief service description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Sparkles, Plus, FolderOpen"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={service.image}
                    onChange={(e) => handleServiceChange(index, 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...service.features];
                          newFeatures[featureIndex] = e.target.value;
                          handleServiceChange(index, 'features', newFeatures);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Service feature"
                      />
                      {service.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = service.features.filter((_, i) => i !== featureIndex);
                            handleServiceChange(index, 'features', newFeatures);
                          }}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newFeatures = [...service.features, ""];
                      handleServiceChange(index, 'features', newFeatures);
                    }}
                    className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How To Add Extra Services Steps - Dynamic Array */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                How To Add Extra Services
              </h2>
              <button
                type="button"
                onClick={addStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.howItWorksHeading}
                  onChange={(e) =>
                    handleInputChange("howItWorksHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.howItWorksSubheading}
                  onChange={(e) =>
                    handleInputChange("howItWorksSubheading", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {data.howToAddExtraServicesSteps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Step #{index + 1}
                  </h3>
                  {data.howToAddExtraServicesSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step Number
                    </label>
                    <input
                      type="number"
                      value={step.stepNumber}
                      onChange={(e) => handleStepChange(index, 'stepNumber', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Step title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={step.description}
                      onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Step description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={step.badge}
                      onChange={(e) => handleStepChange(index, 'badge', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Badge text"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={step.icon}
                    onChange={(e) => handleStepChange(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Sparkles, Check, Calendar"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Extras Pricing - Dynamic Array */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Extras Pricing
              </h2>
              <button
                type="button"
                onClick={addPricing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Pricing
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.pricingHeading}
                  onChange={(e) =>
                    handleInputChange("pricingHeading", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subheading
                </label>
                <textarea
                  value={data.pricingSubheading}
                  onChange={(e) =>
                    handleInputChange("pricingSubheading", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {data.extrasPricing.map((pricing, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pricing #{index + 1}
                  </h3>
                  {data.extrasPricing.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePricing(index)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service ID
                    </label>
                    <input
                      type="text"
                      value={pricing.serviceId}
                      onChange={(e) => handlePricingChange(index, 'serviceId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., windows"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={pricing.serviceName}
                      onChange={(e) => handlePricingChange(index, 'serviceName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Window Cleaning"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      value={pricing.price}
                      onChange={(e) => handlePricingChange(index, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., $5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Unit
                    </label>
                    <input
                      type="text"
                      value={pricing.priceUnit}
                      onChange={(e) => handlePricingChange(index, 'priceUnit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., per window"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={pricing.icon}
                      onChange={(e) => handlePricingChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Sparkles, Plus"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {pricing.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...pricing.features];
                          newFeatures[featureIndex] = e.target.value;
                          handlePricingChange(index, 'features', newFeatures);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Pricing feature"
                      />
                      {pricing.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = pricing.features.filter((_, i) => i !== featureIndex);
                            handlePricingChange(index, 'features', newFeatures);
                          }}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newFeatures = [...pricing.features, ""];
                      handlePricingChange(index, 'features', newFeatures);
                    }}
                    className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                FAQ Section
              </h2>
              <button
                type="button"
                onClick={addFaq}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </button>
            </div>

            {data.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    FAQ #{index + 1}
                  </h3>
                  {data.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter FAQ question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter FAQ answer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
                     </div>
         </div>
       </div>
       <Toaster 
         position="top-right"
         richColors
         closeButton
         duration={4000}
       />
     </div>
   );
 }
