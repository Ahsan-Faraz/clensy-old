"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "./LoadingSpinner"
import { apiService } from "../../services/api"
import { toast } from "sonner"
import type { AvailabilitySlot, BillingTerm, BookingData, ServiceScope } from "../../types/booking"
import {
  Calendar,
  CreditCard,
  CheckCircle,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  AlertCircle,
  Star,
} from "lucide-react"

interface StepThreeProps {
  formData: BookingData
  onUpdateData: (data: Partial<BookingData>) => void
  onComplete: () => void
  onPrevious: () => void
}

interface ValidationErrors {
  selectedDate?: string
  selectedTime?: string
  paymentMethod?: string
  billingTermId?: string
  [key: string]: string | undefined
}

export const StepThree: React.FC<StepThreeProps> = ({ formData, onUpdateData, onComplete, onPrevious }) => {
  // CardConnect token state and ref (must be inside component)
  const [cardToken, setCardToken] = useState<string>("")
  const [cardExpiry, setCardExpiry] = useState<string>("")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // CardConnect message handler
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const tokenData = JSON.parse(event.data)
        const tokenValue = tokenData.message
        const expiryValue = tokenData.expiry
        setCardToken(tokenValue)
        setCardExpiry(expiryValue)
        console.log("Token received: " + tokenValue)
        console.log("Expiry received: " + expiryValue)
        console.log("Token received from: " + event.data)
      } catch (error) {
        console.error("Error parsing token data:", error)
      }
    }

    window.addEventListener("message", handleMessage, false)
    return () => {
      window.removeEventListener("message", handleMessage, false)
    }
  }, [])

  // No need to fetch or display booking questions in Step 3
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [billingTerms, setBillingTerms] = useState<BillingTerm[]>([])
  const [bookingAnswers, setBookingAnswers] = useState<Record<string, any>>({})
  const [selectedServiceScope, setSelectedServiceScope] = useState<ServiceScope | null>(null)

  // Calculate global form completion percentage across all steps
  const calculateProgress = (): number => {
    // Step 1: Basic information and service selection (40% of total)
    const step1Progress = 0.4; // Step 1 is always complete when we reach Step 3
    
    // Step 2: Pricing and address (40% of total)
    const step2Progress = 0.4; // Step 2 is always complete when we reach Step 3
    
    // Step 3: Date selection and payment (20% of total)
    let step3Completed = 0
    let step3Total = 2 // selectedDate and card token
    
    // Check if date is selected
    if (formData.selectedDate) {
      step3Completed++
    }
    
    // Check if card token is received (payment info filled)
    if (cardToken) {
      step3Completed++
    }
    
    const step3Progress = (step3Completed / step3Total) * 0.2; // 20% weight
    
    return Math.round((step1Progress + step2Progress + step3Progress) * 100)
  }
  const [loading, setLoading] = useState({
    questions: true,
    availability: true,
    billingTerms: true,
    booking: false,
  })
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    // Only fetch availability and billing terms
    const loadBookingData = async () => {
      try {
        setLoading((prev) => ({ ...prev, availability: true, billingTerms: true }))
        const mainScopeGroupId = formData.lead.MainScopeGroupId
          ? formData.lead.MainScopeGroupId
          : formData.lead.scopeIds[0]

        const [availability, terms, serviceScopes] = await Promise.all([
          apiService.getAvailability(mainScopeGroupId, 2),
          apiService.getBillingTerms(),
          apiService.getScopes(mainScopeGroupId)
        ])

        // Find the selected service scope
        const selectedScope = serviceScopes.find(scope => 
          scope.id === formData.lead.scopeIds[0]
        );
        setSelectedServiceScope(selectedScope || null);

        // Only set availabilitySlots if the data is AvailabilitySlot[]
        if (
          Array.isArray(availability) &&
          availability.length > 0 &&
          typeof availability[0] === "object" &&
          availability[0] !== null &&
          "date" in availability[0]
        ) {
          setAvailabilitySlots(availability as AvailabilitySlot[])
        } else {
          setAvailabilitySlots([])
        }

        setBillingTerms(Array.isArray(terms) ? terms : [])

        // Extract available dates from availability (API may return array of strings or objects)
        let dates: Date[] = []
        if (Array.isArray(availability) && availability.length > 0) {
          if (typeof availability[0] === "string") {
            dates = (availability as string[])
              .map((d) => {
                const date = new Date(d)
                return isNaN(date.getTime()) ? null : date
              })
              .filter(Boolean) as Date[]
          } else if (typeof availability[0] === "object" && availability[0] !== null && "date" in availability[0]) {
            dates = (availability as AvailabilitySlot[])
              .map((slot) => {
                const date = new Date(slot.date)
                return isNaN(date.getTime()) ? null : date
              })
              .filter(Boolean) as Date[]
          }
        }

        setAvailableDates(dates)

        // Set default billing term
        if (Array.isArray(terms)) {
          const defaultTerm = terms.find((term) => term.isDefault)
          if (defaultTerm) {
            onUpdateData({ billingTermId: defaultTerm.id })
          }
        }

        // Set default values
        onUpdateData({
          paymentMethod: "Credit Card",
          billingTermId: "2",
        })
      } catch (error) {
        console.error("Failed to load booking data:", error)
      } finally {
        setLoading((prev) => ({
          ...prev,
          availability: false,
          billingTerms: false,
        }))
      }
    }

    loadBookingData()
  }, [])

  // Validation functions
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!formData.selectedDate) {
      errors.selectedDate = "Please select a date"
    }

    setValidationErrors(errors)
    setTouchedFields(Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    return !Object.values(errors).some((error) => error !== undefined)
  }

  const handleAnswerChange = (questionId: string, value: any) => {
    setBookingAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Custom Calendar Component
  const CustomCalendar = () => {
    const today = new Date()
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayWeekday = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const isDateAvailable = (date: Date) => {
      return availableDates.some((availableDate) => {
        return (
          availableDate.getDate() === date.getDate() &&
          availableDate.getMonth() === date.getMonth() &&
          availableDate.getFullYear() === date.getFullYear()
        )
      })
    }

    const isDateSelected = (date: Date) => {
      if (!formData.selectedDate) return false
      // Parse the ISO date string as local date to avoid timezone issues
      const [year, month, day] = formData.selectedDate.split('-').map(Number)
      return (
        day === date.getDate() &&
        month - 1 === date.getMonth() && // Month in Date object is 0-indexed
        year === date.getFullYear()
      )
    }

    const handleDateClick = (date: Date) => {
      if (isDateAvailable(date)) {
        // Fix: Create ISO date string using local date components to avoid timezone issues
        const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        onUpdateData({ selectedDate: isoDate, selectedTime: undefined })
        setValidationErrors((prev) => ({ ...prev, selectedDate: undefined, selectedTime: undefined }))
        setShowCalendar(false)
      }
    }

    const navigateMonth = (direction: "prev" | "next") => {
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev)
        if (direction === "prev") {
          newMonth.setMonth(prev.getMonth() - 1)
        } else {
          newMonth.setMonth(prev.getMonth() + 1)
        }
        return newMonth
      })
    }

    const renderCalendarDays = () => {
      const days = []

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDayWeekday; i++) {
        days.push(<div key={`empty-${i}`} className="h-12 md:h-16" />)
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const isAvailable = isDateAvailable(date)
        const isSelected = isDateSelected(date)
        const isPast = date < today

        days.push(
          <motion.button
            key={day}
            type="button"
            className={`h-12 md:h-16 rounded-xl font-medium transition-all duration-200 ${
              isSelected
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : isAvailable
                  ? "bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50 shadow-sm"
                  : isPast
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-50 text-slate-300 cursor-not-allowed"
            }`}
            onClick={() => handleDateClick(date)}
            disabled={!isAvailable}
            whileHover={isAvailable ? { scale: 1.05 } : {}}
            whileTap={isAvailable ? { scale: 0.95 } : {}}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-sm md:text-base">{day}</span>
              {isAvailable && <div className="w-1 h-1 bg-current rounded-full mt-1 opacity-60" />}
            </div>
          </motion.button>,
        )
      }

      return days
    }

    return (
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Select Date</h2>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <motion.button
                    onClick={() => navigateMonth("prev")}
                    className="p-3 hover:bg-slate-100 rounded-xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-600" />
                  </motion.button>

                  <h3 className="text-xl font-semibold text-slate-900">
                    {monthNames[month]} {year}
                  </h3>

                  <motion.button
                    onClick={() => navigateMonth("next")}
                    className="p-3 hover:bg-slate-100 rounded-xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6 text-slate-600" />
                  </motion.button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded mr-2" />
                    <span className="text-slate-600">Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border-2 border-blue-200 rounded mr-2" />
                    <span className="text-slate-600">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-slate-100 rounded mr-2" />
                    <span className="text-slate-600">Unavailable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // For calendar picker
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      // Fix: Create ISO date string using local date components to avoid timezone issues
      const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      onUpdateData({ selectedDate: isoDate, selectedTime: undefined })
      setValidationErrors((prev) => ({ ...prev, selectedDate: undefined, selectedTime: undefined }))
    }
  }

  const handleTimeSelect = (time: string) => {
    onUpdateData({ selectedTime: time })
    setValidationErrors((prev) => ({ ...prev, selectedTime: undefined }))
  }

  const handleBillingTermSelect = (termId: string) => {
    onUpdateData({ billingTermId: termId })
    setValidationErrors((prev) => ({ ...prev, billingTermId: undefined }))
  }

  const handlePaymentMethodSelect = (method: string) => {
    onUpdateData({ paymentMethod: method })
    setValidationErrors((prev) => ({ ...prev, paymentMethod: undefined }))
  }

  const handleCompleteBooking = async () => {
    if (!validateForm()) {
      toast.error("Please complete all required fields")
      return
    }

    try {
      setLoading((prev) => ({ ...prev, booking: true }))
      // Build the request body for bookQuote
      const {
        lead,
        quote,
        selectedDate,
        selectedTime,
        billingTermId,
        paymentMethod,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
      } = formData

      // Compose ScopesOfWork from selected scopeIds and frequencyIds in formData.lead
      const scopesOfWork = (lead.scopeIds || []).map((scopeId: string) => ({
        FirstJobDate: selectedDate ? new Date(selectedDate).toISOString() : undefined,
        FirstJobInstructions: "", // You can update this if you have instructions
        FirstJobTagIds: [], // Update if you have tag IDs
        ServiceSetTagIds: [], // Update if you have service set tag IDs
        TeamIds: [], // Update if you have team IDs
        ScopeOfWorkId: Number.parseInt(scopeId, 10),
        FrequencyId: lead.frequencyIds ? lead.frequencyIds[scopeId] : undefined,
        RateModifications: formData.selectedModifications ? formData.selectedModifications
          .filter(mod => mod.scopeId === Number.parseInt(scopeId, 10))
          .map(mod => ({
            Quantity: mod.quantity || 1,
            RateModificationId: mod.modificationId,
            IsRecurring: true
          })) : [],
      }))

      // Debug log to verify rate modifications are included in book quote
      console.log('Book Quote API Request - Selected Modifications:', formData.selectedModifications);
      console.log('Book Quote API Request - ScopesOfWork with RateModifications:', scopesOfWork);

      // Compose the request body
      const requestBody = {
        LeadId: lead.id,
        QuoteId: quote?.id,
        SendBookedEmail: true,
        SendCustomerPortalInvite: true,
        AddToCampaigns: true,
        TriggerWebhook: true,
        ScopeGroupId: lead.MainScopeGroupId || lead.scopeIds[0],
        ScopesOfWork: scopesOfWork,
        BillingTermsId: 2, // Always pass 2 as per requirements
        Token: paymentMethod === "Credit Card" ? cardToken : undefined,
        Expiry: paymentMethod === "Credit Card" ? cardExpiry : undefined,
        CustomerTagIds: lead.CustomerTagIds || [],
        HomeServiceTagIds: lead.HomeServiceTagIds || [],
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
      }

      // Ensure the request body is sent as a flat object, not nested under a key
      const result = await apiService.bookQuote({ ...requestBody })

      // Create a note for the booking
      await apiService.createNote(lead.id!, `Booking completed. Booking ID: ${result.bookingId}.`)

     //toast.success("Booking completed successfully!")
      onComplete()
    } catch (error) {
      console.error("Failed to complete booking:", error)
      toast.error("Failed to complete booking, Please fill the card details correctly and try again")
    } finally {
      setLoading((prev) => ({ ...prev, booking: false }))
    }
  }

  // Step is valid when date is selected, no validation errors, and card details are received
  const isStepValid = () => {
    return formData.selectedDate && 
           !Object.values(validationErrors).some((error) => error !== undefined) &&
           cardToken && 
           cardExpiry
  }

  const getSelectedAvailabilitySlot = () => {
    return availabilitySlots.find((slot) => slot.date === formData.selectedDate)
  }

  return (
    <div className="min-h-screen bg-white relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-6 sm:space-y-8 md:space-y-10"
      >
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
          >
            <Star className="w-8 h-8 text-blue-600" />
          </motion.div> */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 bg-gradient-to-r from-zinc-800 to-zinc-950 bg-clip-text text-transparent">
            Final Booking
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-2">
            Select your preferred date and time to complete your booking and get started with our service
          </p>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-md mx-auto px-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Form Progress</span>
              <span className="text-sm font-medium text-gray-700">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-black to-gray-800 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <motion.div 
              className="mt-2 text-center"
              animate={{ 
                scale: calculateProgress() === 100 ? [1, 1.05, 1] : 1,
                color: calculateProgress() === 100 ? "#10B981" : "#6B7280"
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-medium">
                {calculateProgress() === 100 ? "Ready to book!" : "Almost there..."}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          // className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
            </div>
            <h2 className="text-base sm:text-lg font-medium text-slate-900">Select Date</h2>
          </div>

          {loading.availability ? (
            <div className="flex justify-center py-8 sm:py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <motion.button
                onClick={() => setShowCalendar(true)}
                className={`relative w-full p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 ${
                  formData.selectedDate
                    ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100"
                    : validationErrors.selectedDate && touchedFields.selectedDate
                      ? "border-red-400 bg-red-50"
                      : "border-slate-300 hover:border-zinc-300 bg-white"
                }`}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-center">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-zinc-800" />
                  <div className="text-left">
                    <div className="text-base sm:text-lg font-semibold text-slate-900">
                      {formData.selectedDate
                        ? (() => {
                            // Parse ISO date string as local date to avoid timezone issues
                            const [year, month, day] = formData.selectedDate.split('-').map(Number)
                            const localDate = new Date(year, month - 1, day) // month is 0-indexed
                            return localDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          })()
                        : "Choose a date"}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">
                      {formData.selectedDate ? "Click to change date" : "Click to open calendar"}
                    </div>
                  </div>
                  {formData.selectedDate && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    </motion.div>
                  )}
                </div>
              </motion.button>

              {validationErrors.selectedDate && touchedFields.selectedDate && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.selectedDate}
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Credit Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          // className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
            </div>
            <h2 className="text-base sm:text-lg font-medium text-slate-900">Credit Card Details</h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-zinc-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-800" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-slate-900">Enter Card Details</h3>
            </div>

            <form name="tokenform" id="tokenform">
              <div className="mb-4 sm:mb-6">
                <iframe
                  ref={iframeRef}
                  id="tokenFrame"
                  name="tokenFrame"
                  src="https://fts.cardconnect.com/itoke/ajax-tokenizer.html?useexpiry=true&useexpiryfield=true&usecvv=true&formatinput=true&cardinputmaxlength=19&cardnumbernumericonly=true&invalidcreditcardevent=true&invalidcvvevent=true&invalidexpiryevent=true&cvvlabel=%20&expirylabel=Expiration%20Date&placeholder=1234%201234%201234%201234&placeholdercvv=3%20or%204%20digits&placeholdermonth=MM&placeholderyear=YYYY&autofocus=true&orientation=horizontal&css=input%2Cselect%7Bmargin-bottom%3A20px%3Bpadding%3A10px%3Bfont-size%3A16px%3Bfont-weight%3Anormal%3Bcolor%3A%23333%3Bbackground-color%3A%23fff%3Bborder%3A1px%20solid%20%23e5e5e5%3Bbox-shadow%3Anone%3Btransition%3Aborder-colorease-in-out.15s%2Cbox-shadowease-in-out.15s%3B-webkit-border-radius%3A4px%3B-moz-border-radius%3A4px%3B-ms-border-radius%3A4px%3B-o-border-radius%3A4px%3Bborder-radius%3A4px%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%22SegoeUI%22%2CRoboto%2COxygen%2CUbuntu%2CCantarell%2C%22OpenSans%22%2C%22HelveticaNeue%22%2Csans-serif%3B%7Dlabel%7Bfont-weight%3A400%3Bfont-size%3A14px%3Bdisplay%3Ainline-block%3Bmax-width%3A100.0%25%3Bmargin-bottom%3A5px%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%22SegoeUI%22%2CRoboto%2COxygen%2CUbuntu%2CCantarell%2C%22OpenSans%22%2C%22HelveticaNeue%22%2Csans-serif%3B%7D%23cccvvlabel%7Bleft%3A195px%21important%3Bposition%3Aabsolute%3B%7D%0A"
                  frameBorder="0"
                  scrolling="no"
                  className="w-full h-48 sm:h-64 border-0 rounded-lg"
                  title="CardConnect Card Entry"
                  allow="payment *; clipboard-write"
                />
              </div>

              <input type="hidden" name="mytoken" id="mytoken" value={cardToken} />
              <input type="hidden" name="myexpiry" id="myexpiry" value={cardExpiry} />
            </form>

            {/* {(cardToken || cardExpiry) && (
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-2" />
                  <h4 className="text-xs sm:text-sm font-semibold text-blue-800">Card Details Received</h4>
                </div>
                {cardToken && (
                  <p className="text-xs sm:text-sm text-blue-700 mb-1">
                    <strong>Token:</strong> {cardToken}
                  </p>
                )}
                {cardExpiry && (
                  <p className="text-xs sm:text-sm text-blue-700">
                    <strong>Expiry:</strong> {cardExpiry}
                  </p>
                )}
              </div>
            )} */}
          </div>
        </motion.div>

        {/* Quote Summary */}
        {formData.quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-zinc-50 to-zinc-50 border-2 border-zinc-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-800" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Quote Summary</h2>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="space-y-4">
                {/* Minimum Service Cost */}
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-700 font-medium">
                    Service: {selectedServiceScope?.name || 'Unknown Service'}
                    <br />
                    Frequency: {formData.quote.priceCalculation.frequencyName}
                  </span>
                  <span className="font-semibold text-zinc-800">
                    ${(formData.quote.priceCalculation.total - formData.quote.priceCalculation.modifications).toFixed(2)}
                  </span>
                </div>

                {/* Rate Modifications */}
                {formData.selectedModifications && formData.selectedModifications.length > 0 && (
                  <>
                    <div className="py-2 border-b border-slate-100">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Additional Services</h4>
                      <div className="space-y-2">
                        {formData.selectedModifications.map((mod, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">
                              {mod.name} (Qty: {mod.quantity || 1})
                            </span>
                            <span className="font-medium text-slate-700">
                              +${mod.cost}
                    </span>
                  </div>
                ))}
                      </div>
                    </div>
                    
                    {/* Modifications Subtotal */}
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-700 font-medium">Additional Services Total</span>
                      <span className="font-semibold text-zinc-800">
                        +${formData.quote.priceCalculation.modifications.toFixed(2)}
                      </span>
                </div>
                  </>
                )}

                {/* Total Price */}
                <div className="pt-4 border-t-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-slate-900">Total Price</span>
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-800">
                      ${formData.quote.priceCalculation.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    {formData.quote.priceCalculation.frequencyName}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-0 pt-4 sm:pt-6"
        >
          <motion.button
            onClick={onPrevious}
            className="group flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Previous
          </motion.button>

          <motion.button
            onClick={handleCompleteBooking}
            disabled={!isStepValid() || loading.booking}
            className={`group flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
              isStepValid() && !loading.booking
                ? "bg-gradient-to-r from-zinc-950 to-zinc-700 text-white hover:from-zinc-800 hover:to-zinc-950 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
            whileHover={isStepValid() && !loading.booking ? { scale: 1.02 } : {}}
            whileTap={isStepValid() && !loading.booking ? { scale: 0.98 } : {}}
          >
            {loading.booking ? (
              <>
                <LoadingSpinner size="sm" color="text-white" />
                <span className="ml-2">Completing Booking...</span>
              </>
            ) : (
              <>
                Complete Booking
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform duration-300 group-hover:scale-110" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Custom Calendar Component */}
        <CustomCalendar />
      </motion.div>
    </div>
  )
}
