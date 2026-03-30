"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, MapPin, Phone, Mail, Clock } from "lucide-react"
import { toast } from "sonner"
import PassaicCountyPage from "@/app/locations/passaic/page"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface PassaicForm {
  heroSection: {
    title: string
    subtitle: string
    backgroundImage: string
    ctaButton1: string
    ctaButton2: string
  }
  contactSection: {
    title: string
    phone: string
    email: string
    address: string
    hours: { day: string; hours: string }[]
  }
  serviceAreas: string[]
  aboutSection: {
    title: string
    description: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

const emptyForm: PassaicForm = {
  heroSection: {
    title: "",
    subtitle: "",
    backgroundImage: "",
    ctaButton1: "",
    ctaButton2: ""
  },
  contactSection: {
    title: "",
    phone: "",
    email: "",
    address: "",
    hours: []
  },
  serviceAreas: [],
  aboutSection: {
    title: "",
    description: ""
  },
  seo: {
    title: "",
    description: "",
    keywords: []
  }
}

export default function PassaicLocationEditor() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState<PassaicForm>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/protected")
    }
  }, [status, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cms/location/passaic")
        const result = await response.json()
        
        if (result.success) {
          setForm(result.data)
        } else {
          toast.error("Failed to load data")
        }
      } catch (error) {
        toast.error("An error occurred while fetching data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateField = (section: keyof PassaicForm, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateHours = (index: number, field: "day" | "hours", value: string) => {
    setForm(prev => ({
      ...prev,
      contactSection: {
        ...prev.contactSection,
        hours: prev.contactSection.hours.map((hour, i) => 
          i === index ? { ...hour, [field]: value } : hour
        )
      }
    }))
  }

  const addServiceArea = () => {
    setForm(prev => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, ""]
    }))
  }

  const updateServiceArea = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.map((area, i) => 
        i === index ? value : area
      )
    }))
  }

  const deleteServiceArea = (index: number) => {
    setForm(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch("/api/cms/location/passaic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Changes saved successfully")
      } else {
        toast.error(result.error || "Failed to save changes")
      }
    } catch (error) {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin">
                <Image 
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069431/website-images/x50aedpsjrpfubhn0d8b.png" 
                  alt="Clensy Logo" 
                  width={120} 
                  height={40} 
                  className="object-contain"
                />
              </Link>
              <span className="ml-4 text-sm font-medium text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">
                {session?.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/protected" })}
                className="text-sm text-gray-700 hover:text-[#007bff]"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Passaic County Location</h1>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Form Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hero Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={form.heroSection.title}
                      onChange={(e) => updateField("heroSection", "title", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input
                      type="text"
                      value={form.heroSection.subtitle}
                      onChange={(e) => updateField("heroSection", "subtitle", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Background Image URL</label>
                    <input
                      type="text"
                      value={form.heroSection.backgroundImage}
                      onChange={(e) => updateField("heroSection", "backgroundImage", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CTA Button 1</label>
                    <input
                      type="text"
                      value={form.heroSection.ctaButton1}
                      onChange={(e) => updateField("heroSection", "ctaButton1", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CTA Button 2</label>
                    <input
                      type="text"
                      value={form.heroSection.ctaButton2}
                      onChange={(e) => updateField("heroSection", "ctaButton2", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Section</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={form.contactSection.title}
                      onChange={(e) => updateField("contactSection", "title", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={form.contactSection.phone}
                      onChange={(e) => updateField("contactSection", "phone", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={form.contactSection.email}
                      onChange={(e) => updateField("contactSection", "email", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={form.contactSection.address}
                      onChange={(e) => updateField("contactSection", "address", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hours</label>
                    {form.contactSection.hours.map((hour, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={hour.day}
                          onChange={(e) => updateHours(index, "day", e.target.value)}
                          placeholder="Day"
                          className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                        />
                        <input
                          type="text"
                          value={hour.hours}
                          onChange={(e) => updateHours(index, "hours", e.target.value)}
                          placeholder="Hours"
                          className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Service Areas</h2>
                    <button
                      type="button"
                      onClick={addServiceArea}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#007bff] hover:bg-[#0056b3]"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Area
                    </button>
                  </div>
                  {form.serviceAreas.map((area, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => updateServiceArea(index, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                      />
                      <button
                        type="button"
                        onClick={() => deleteServiceArea(index)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* About Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">About Section</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={form.aboutSection.title}
                      onChange={(e) => updateField("aboutSection", "title", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={form.aboutSection.description}
                      onChange={(e) => updateField("aboutSection", "description", e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                </div>

                {/* SEO Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">SEO</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={form.seo.title}
                      onChange={(e) => updateField("seo", "title", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={form.seo.description}
                      onChange={(e) => updateField("seo", "description", e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Keywords</label>
                    <textarea
                      value={form.seo.keywords.join(", ")}
                      onChange={(e) => updateField("seo", "keywords", e.target.value.split(", "))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007bff] focus:ring-[#007bff]"
                      placeholder="Enter keywords separated by commas"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="border rounded-lg overflow-hidden">
                <PassaicCountyPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 