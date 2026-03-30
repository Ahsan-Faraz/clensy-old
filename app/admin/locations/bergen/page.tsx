"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { Plus, Trash2, Loader2, MapPin, Phone, Mail, Clock, Calendar } from "lucide-react"

type Hours = { day: string; hours: string }

export interface BergenForm {
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
    hours: Hours[]
  }
  serviceAreas: string[]
  aboutSection: { title: string; description: string }
  seo: { title: string; description: string; keywords: string }
}

const empty: BergenForm = {
  heroSection: {
    title: "",
    subtitle: "",
    backgroundImage: "",
    ctaButton1: "",
    ctaButton2: "",
  },
  contactSection: {
    title: "",
    phone: "",
    email: "",
    address: "",
    hours: [
      { day: "Monday", hours: "" },
      { day: "Tuesday", hours: "" },
      { day: "Wednesday", hours: "" },
      { day: "Thursday", hours: "" },
      { day: "Friday", hours: "" },
      { day: "Saturday", hours: "" },
      { day: "Sunday", hours: "" },
    ],
  },
  serviceAreas: [""],
  aboutSection: { title: "", description: "" },
  seo: { title: "", description: "", keywords: "" },
}

export default function BergenLocationEditor() {
  const { status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<BergenForm>(empty)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  /* ───── Fetch existing data ───── */
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/protected")
      return
    }
    const run = async () => {
      try {
        const res = await fetch("/api/cms/location/bergen")
        const j = await res.json()
        if (j.success) {
          setData(j.data)
          setMessage({ type: "", text: "" })
        } else {
          setMessage({ type: "error", text: j.error || "Failed to load data" })
          toast.error(j.error || "Failed to load data")
        }
      } catch (err) {
        setMessage({ type: "error", text: "Network error while loading data" })
        toast.error("Network error while loading data")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [status, router])

  /* ───── Helpers ───── */
  const set = (path: string, value: any) =>
    setData((prev) => {
      const draft: any = { ...prev }
      const parts = path.split(".")
      let cur = draft
      while (parts.length > 1) cur = cur[parts.shift() as string]
      cur[parts[0]] = value
      return draft
    })

  const updateHour = (i: number, field: keyof Hours, value: string) =>
    setData((prev) => {
      const hrs = [...prev.contactSection.hours]
      hrs[i] = { ...hrs[i], [field]: value }
      return { ...prev, contactSection: { ...prev.contactSection, hours: hrs } }
    })

  const addArea = () => setData((prev) => ({ ...prev, serviceAreas: [...prev.serviceAreas, ""] }))

  const delArea = (idx: number) =>
    setData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== idx),
    }))

  /* ───── Submit ───── */
  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: "", text: "" })
    try {
      const res = await fetch("/api/cms/location/bergen", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
      const j = await res.json()
      if (j.success) {
        setMessage({ type: "success", text: "Bergen location updated successfully" })
        toast.success("Saved!")
      } else {
        setMessage({ type: "error", text: j.error || "Save failed" })
        toast.error(j.error || "Save failed")
      }
    } catch {
      setMessage({ type: "error", text: "Network error while saving" })
      toast.error("Network error while saving")
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-[#007bff]" />
      </div>
    )

  /* ───── Form ───── */
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Bergen Location</h1>
          <Link href="/locations/bergen" target="_blank" className="text-sm text-[#007bff] hover:underline">
            View Live Page
          </Link>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-3 rounded-md ${message.type === "error" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-8">
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-medium text-gray-900">Content Settings</h2>
            <p className="text-sm text-gray-500">
              Edit the content of your Bergen County location page. All fields are required.
            </p>
          </div>

          <form onSubmit={save} className="space-y-8">
            {/* Hero Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={data.heroSection.title}
                    onChange={(e) => set("heroSection.title", e.target.value)}
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={data.heroSection.subtitle}
                    onChange={(e) => set("heroSection.subtitle", e.target.value)}
                    placeholder="Subtitle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                  <input
                    type="text"
                    value={data.heroSection.backgroundImage}
                    onChange={(e) => set("heroSection.backgroundImage", e.target.value)}
                    placeholder="Background image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA Button</label>
                    <input
                      type="text"
                      value={data.heroSection.ctaButton1}
                      onChange={(e) => set("heroSection.ctaButton1", e.target.value)}
                      placeholder="Primary CTA text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary CTA Button</label>
                    <input
                      type="text"
                      value={data.heroSection.ctaButton2}
                      onChange={(e) => set("heroSection.ctaButton2", e.target.value)}
                      placeholder="Secondary CTA text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Heading</label>
                  <input
                    type="text"
                    value={data.contactSection.title}
                    onChange={(e) => set("contactSection.title", e.target.value)}
                    placeholder="Card heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={data.contactSection.phone}
                      onChange={(e) => set("contactSection.phone", e.target.value)}
                      placeholder="Phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={data.contactSection.email}
                      onChange={(e) => set("contactSection.email", e.target.value)}
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={data.contactSection.address}
                    onChange={(e) => set("contactSection.address", e.target.value)}
                    placeholder="Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Hours table */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-3">Hours of Operation</h4>
                  <div className="space-y-3">
                    {data.contactSection.hours.map((h, i) => (
                      <div key={h.day} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Day {i + 1}</label>
                          <input
                            type="text"
                            value={h.day}
                            onChange={(e) => updateHour(i, "day", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                          <input
                            type="text"
                            value={h.hours}
                            onChange={(e) => updateHour(i, "hours", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="8 am – 6 pm"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Areas</h3>
              <div className="space-y-4">
                {data.serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area {idx + 1}</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={area}
                          onChange={(e) =>
                            setData((prev) => {
                              const arr = [...prev.serviceAreas]
                              arr[idx] = e.target.value
                              return { ...prev, serviceAreas: arr }
                            })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Area name"
                          required
                        />
                        {data.serviceAreas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => delArea(idx)}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addArea}
                  className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white rounded-md hover:bg-[#0069d9] transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Area
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">About Section</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={data.aboutSection.title}
                    onChange={(e) => set("aboutSection.title", e.target.value)}
                    placeholder="Heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={data.aboutSection.description}
                    onChange={(e) => set("aboutSection.description", e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Paragraph(s)"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={data.seo.title}
                    onChange={(e) => set("seo.title", e.target.value)}
                    placeholder="SEO Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                  <textarea
                    value={data.seo.description}
                    onChange={(e) => set("seo.description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="SEO Description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                  <input
                    type="text"
                    value={data.seo.keywords}
                    onChange={(e) => set("seo.keywords", e.target.value)}
                    placeholder="Comma-separated keywords"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  saving ? "bg-[#007bff]/70" : "bg-[#007bff] hover:bg-[#0069d9]"
                } transition-colors`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Hero Preview */}
            <div className="relative h-80 bg-gray-900">
              {data.heroSection.backgroundImage && (
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-r from-black via-black/70 to-transparent absolute z-10"></div>
                  <img
                    src={data.heroSection.backgroundImage || "/placeholder.svg"}
                    alt="Background Preview"
                    className="w-full h-full object-cover brightness-90"
                  />
                </div>
              )}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <h1 className="text-3xl font-bold text-white mb-2">{data.heroSection.title || "Title goes here"}</h1>
                <p className="text-lg text-gray-300 mb-4">{data.heroSection.subtitle || "Subtitle goes here"}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-md inline-flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {data.heroSection.ctaButton1 || "Primary CTA"}
                  </div>
                  <div className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md inline-flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {data.heroSection.ctaButton2 || "Secondary CTA"}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Preview */}
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Column - Contact Info */}
                <div className="space-y-4">
                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-blue-900/80 to-gray-900 rounded-lg shadow-md overflow-hidden border border-blue-900/30 p-4">
                    <h3 className="text-white font-medium border-b border-gray-700 pb-2 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 text-blue-400 mr-2 mt-1" />
                        <div>
                          <p className="text-xs text-gray-300">Phone</p>
                          <p className="text-white text-sm">{data.contactSection.phone || "Phone number"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 text-blue-400 mr-2 mt-1" />
                        <div>
                          <p className="text-xs text-gray-300">Email</p>
                          <p className="text-white text-sm">{data.contactSection.email || "Email address"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-blue-400 mr-2 mt-1" />
                        <div>
                          <p className="text-xs text-gray-300">Address</p>
                          <p className="text-white text-sm">{data.contactSection.address || "Physical address"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hours Card */}
                  <div className="bg-gradient-to-br from-gray-900 to-blue-900/70 rounded-lg shadow-md overflow-hidden border border-blue-900/30 p-4">
                    <h3 className="text-white font-medium border-b border-gray-700 pb-2 mb-3 flex items-center">
                      <Clock className="h-4 w-4 text-blue-400 mr-2" />
                      Hours of Operation
                    </h3>
                    <div className="space-y-1">
                      {data.contactSection.hours.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-300">{h.day || `Day ${i + 1}`}</span>
                          <span className="text-white">{h.hours || "Hours"}</span>
                        </div>
                      ))}
                      {data.contactSection.hours.length > 3 && (
                        <p className="text-xs text-gray-400 text-center mt-2">
                          + {data.contactSection.hours.length - 3} more days
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Map and About */}
                <div className="md:col-span-2 space-y-4">
                  {/* Map Preview */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md overflow-hidden">
                    <h3 className="text-white font-medium border-b border-gray-700 p-3">Service Area</h3>
                    <div className="relative h-32 bg-blue-900/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-indigo-800 text-white py-2 px-4 flex justify-center">
                        <span className="text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> SCHEDULE A CLEANING
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* About Preview */}
                  <div className="bg-gradient-to-br from-indigo-900/70 to-gray-900 rounded-lg shadow-md overflow-hidden border border-indigo-900/30">
                    <h3 className="text-white font-medium border-b border-gray-700 p-3">
                      {data.aboutSection.title || "About This Location"}
                    </h3>
                    <div className="p-3">
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {data.aboutSection.description || "Description of this location will appear here."}
                      </p>
                      <div className="mt-3">
                        <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded">
                          Get a Free Quote
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Areas Preview */}
              <div className="mt-4">
                <div className="bg-gradient-to-br from-gray-900 to-blue-900/50 rounded-lg shadow-md overflow-hidden border border-blue-900/30">
                  <h3 className="text-white font-medium border-b border-gray-700 p-3">
                    Service Areas in Bergen County
                  </h3>
                  <div className="p-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {data.serviceAreas.slice(0, 6).map((area, i) => (
                        <div
                          key={i}
                          className="flex items-center py-1 px-2 bg-gray-700/50 border border-gray-700 rounded text-xs"
                        >
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-1"></div>
                          <span className="text-white truncate">{area || `Area ${i + 1}`}</span>
                        </div>
                      ))}
                      {data.serviceAreas.length > 6 && (
                        <div className="flex items-center py-1 px-2 bg-gray-700/50 border border-gray-700 rounded text-xs">
                          <span className="text-white">+{data.serviceAreas.length - 6} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
