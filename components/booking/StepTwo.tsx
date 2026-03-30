"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { apiService } from "../../services/api";
import { toast } from "sonner";
import type {
  Question,
  PriceCalculation,
  BookingData,
  ServiceScope,
} from "../../types/booking";
import {
  Plus,
  Calculator,
  Home,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  DollarSign,
  MapPin,
  CreditCard,
  Clock,
  Info,
  X,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { RateModification, SelectedModification } from "@/types/rateModifications";
import { GiKitchenKnives, GiWashingMachine, GiWindow } from "react-icons/gi";
import { BsCup } from "react-icons/bs";
import { LuBlinds } from "react-icons/lu";
import { MdLocalLaundryService, MdOutlinePets  } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiOvenDuotone } from "react-icons/pi";




interface StepTwoProps {
  formData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface ValidationErrors {
  [key: string]: string | undefined;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  onUpdateData,
  onNext,
  onPrevious,
}) => {
  const [pricingQuestions, setPricingQuestions] = useState<Question[]>([]);

  const [priceCalculation, setPriceCalculation] =
    useState<PriceCalculation | null>(null);

  const [pricingAnswers, setPricingAnswers] = useState<Record<string, any>>({});
  const [rateModifications, setRateModifications] = useState<RateModification[]>([]);
  const [selectedModifications, setSelectedModifications] = useState<SelectedModification[]>([]);
  const [selectedServiceScope, setSelectedServiceScope] = useState<ServiceScope | null>(null);
  const [loading, setLoading] = useState({
    questions: true,
    calculating: false,
    saving: false,
    modifications: true
  });
  const [addressData, setAddressData] = useState(() => {
    // Try to get address data from local storage
    const savedAddress = localStorage.getItem('serviceAddress');
    const parsedAddress = savedAddress ? JSON.parse(savedAddress) : null;
    
    return {
      homeAddress1: parsedAddress?.street || "",
      homeAddress2: "",
      homeCity: parsedAddress?.city || "",
      homeRegion: parsedAddress?.state || "New Jersey", // Default to New Jersey if not set
      homePostalCode: parsedAddress?.zipCode || "",
      billingAddress1: "",
      billingAddress2: "",
      billingCity: "",
      billingRegion: "",
      billingPostalCode: "",
      sameBillingAddress: true,
    };
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [lastCalculatedState, setLastCalculatedState] = useState<string>("");
  const [questionTimer, setQuestionTimer] = useState<NodeJS.Timeout | null>(null);
  const [isDataRestoring, setIsDataRestoring] = useState<boolean>(true);
  const [expectedRestoredData, setExpectedRestoredData] = useState<{answers: Record<string, any>, modifications: any[], hasData: boolean} | null>(null);
  const [openTooltips, setOpenTooltips] = useState<Record<string, boolean>>({});
  const [timeModalOpen, setTimeModalOpen] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  // Time slots from 8 AM to 5 PM
  const timeSlots = [
    { value: "08:00", label: "08:00 AM" },
    { value: "09:00", label: "09:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "01:00 PM" },
    { value: "14:00", label: "02:00 PM" },
    { value: "15:00", label: "03:00 PM" },
    { value: "16:00", label: "04:00 PM" },
    { value: "17:00", label: "05:00 PM" },
  ];

  // Helper function to get restricted time slots based on start/end time
  const getAvailableTimeSlots = (questionText: string, currentAnswers: Record<string, any>) => {
    const isEndTime = questionText.toLowerCase().includes('end time');
    const isStartTime = questionText.toLowerCase().includes('start time');
    const isPrefer = questionText.toLowerCase().includes('prefer');
    const isExclude = questionText.toLowerCase().includes('exclude');
    
    // For end time selection
    if (isEndTime) {
      // Find the corresponding start time
      const startTimeQuestionId = pricingQuestions.find(q => 
        q.QuestionText.toLowerCase().includes('start time') &&
        q.QuestionText.toLowerCase().includes(isPrefer ? 'prefer' : 'exclude')
      )?.QuestionId;

      if (!startTimeQuestionId) {
        return timeSlots; // If no start time found, show all slots
      }

      const startTime = currentAnswers[startTimeQuestionId];
      if (!startTime) {
        return timeSlots; // If no start time selected, show all slots
      }

      // Filter slots to only show times >= start time
      const startTimeIndex = timeSlots.findIndex(slot => slot.value === startTime);
      return startTimeIndex >= 0 ? timeSlots.slice(startTimeIndex) : timeSlots;
    }
    
    // For start time selection
    if (isStartTime) {
      // Find the corresponding end time
      const endTimeQuestionId = pricingQuestions.find(q => 
        q.QuestionText.toLowerCase().includes('end time') &&
        q.QuestionText.toLowerCase().includes(isPrefer ? 'prefer' : 'exclude')
      )?.QuestionId;

      if (!endTimeQuestionId) {
        return timeSlots; // If no end time found, show all slots
      }

      const endTime = currentAnswers[endTimeQuestionId];
      if (!endTime) {
        return timeSlots; // If no end time selected, show all slots
      }

      // Filter slots to only show times <= end time
      const endTimeIndex = timeSlots.findIndex(slot => slot.value === endTime);
      return endTimeIndex >= 0 ? timeSlots.slice(0, endTimeIndex + 1) : timeSlots;
    }

    // Default: return all slots
    return timeSlots;
  };

  // Helper function to open time modal
  const openTimeModal = (questionId: string) => {
    setTimeModalOpen(questionId);
    setSelectedTimeSlot(pricingAnswers[questionId] || "");
  };

  // Helper function to close time modal
  const closeTimeModal = () => {
    setTimeModalOpen(null);
    setSelectedTimeSlot("");
  };

  // Helper function to select time
  const selectTime = (questionId: string, timeValue: string) => {
    handleAnswerChange(questionId, timeValue);
    closeTimeModal();
  };

  // Helper function to get quantity options based on service name
  const getQuantityOptions = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    
    // No quantity display - just able to select
    if (name.includes('excessive pet hair') || 
        name.includes('pet hair') ||
        name.includes('kitchen cabinet') || 
        name.includes('inside oven') || 
        name.includes('oven') ||
        name.includes('inside refrigerator') || 
        name.includes('refrigerator')) {
      return null; // No quantity selector
    }
    
    // Quantity 1-20
    if (name.includes('interior window') || 
        name.includes('window') ||
        name.includes('wet wipe blinds') || 
        name.includes('blind')) {
      return Array.from({length: 20}, (_, i) => i + 1);
    }
    
    // Quantity 1-3
    if (name.includes('laundry') || 
        name.includes('organization')) {
      return [1, 2, 3];
    }
    
    // Quantity 1-5
    if (name.includes('wash dishes') || 
        name.includes('dish')) {
      return [1, 2, 3, 4, 5];
    }
    
    // Default quantity 1-5 for any other services
    return [1, 2, 3, 4, 5];
  };

  // Helper functions for tooltip management
  const toggleTooltip = (questionId: string) => {
    setOpenTooltips(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const showTooltip = (questionId: string) => {
    setOpenTooltips(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const hideTooltip = (questionId: string) => {
    setOpenTooltips(prev => ({
      ...prev,
      [questionId]: false
    }));
  };

  // Calculate global form completion percentage across all steps
  const calculateProgress = (): number => {
    // Step 1: Basic information and service selection (40% of total)
    const step1Progress = 0.4; // Step 1 is always complete when we reach Step 2
    
    // Step 2: Pricing and address (40% of total)
    const requiredAddressFields = [
      "homeAddress1",
      "homeCity",
      "homeRegion",
      "homePostalCode",
    ];

    if (!addressData.sameBillingAddress) {
      requiredAddressFields.push(
        "billingAddress1",
        "billingCity",
        "billingRegion",
        "billingPostalCode"
      );
    }

    let step2Completed = 0;
    const step2Total = requiredAddressFields.length + pricingQuestions.filter((q) => q.IsRequired).length;

    // Check address fields
    requiredAddressFields.forEach((field) => {
      if (addressData[field as keyof typeof addressData]) {
        step2Completed++;
      }
    });

    // Check required questions
    pricingQuestions
      .filter((q) => q.IsRequired)
      .forEach((q) => {
        const answer = pricingAnswers[q.QuestionId];
        if (answer !== undefined && answer !== "" && answer !== null) {
          if (q.QuestionType === "Multiple Select List") {
            if (Array.isArray(answer) && answer.length > 0) {
              step2Completed++;
            }
          } else {
            step2Completed++;
          }
        }
      });

    const step2Progress = step2Total > 0 ? (step2Completed / step2Total) * 0.4 : 0;
    
    // Step 3: Date selection and payment (20% of total)
    const step3Progress = 0; // Will be calculated in StepThree
    
    return Math.round((step1Progress + step2Progress + step3Progress) * 100);
  };

  useEffect(() => {
    if (formData.lead.scopeIds.length > 0) {
      loadPricingData();
    }
  }, [formData.lead.scopeIds]);

  // Restore form data when returning from StepThree
  useEffect(() => {
    // Check if we're coming back from Step 3 (has saved data to restore)
    const hasDataToRestore = formData.lead.answers || formData.selectedModifications || formData.address;
    
    if (hasDataToRestore) {
      setIsDataRestoring(true);
      
      // Define what data we expect to restore
      let expectedAnswers: Record<string, any> = {};
      let expectedModifications: any[] = [];
      
      if (formData.lead.answers) {
        const stepOneQuestionIds = formData.lead.stepOneQuestions?.map(q => q.QuestionId) || [];
        Object.keys(formData.lead.answers).forEach(key => {
          const questionId = parseInt(key);
          if (!stepOneQuestionIds.includes(questionId)) {
            expectedAnswers[key] = formData.lead.answers[key];
          }
        });
      }
      
      if (formData.selectedModifications) {
        expectedModifications = formData.selectedModifications;
      }
      
      setExpectedRestoredData({
        answers: expectedAnswers,
        modifications: expectedModifications,
        hasData: true
      });
    } else {
      // First time on Step 2, no data to restore
      setIsDataRestoring(false);
      setExpectedRestoredData({ answers: {}, modifications: [], hasData: false });
    }
    
    // Restore pricing answers from lead answers if they exist
    if (formData.lead.answers) {
      // Filter out step 1 questions and only restore step 2 pricing questions
      const stepOneQuestionIds = formData.lead.stepOneQuestions?.map(q => q.QuestionId) || [];
      const pricingAnswersToRestore: Record<string, any> = {};
      
      Object.keys(formData.lead.answers).forEach(key => {
        const questionId = parseInt(key);
        if (!stepOneQuestionIds.includes(questionId)) {
          pricingAnswersToRestore[key] = formData.lead.answers[key];
        }
      });
      
      if (Object.keys(pricingAnswersToRestore).length > 0) {
        setPricingAnswers(pricingAnswersToRestore);
      }
    }
    
    // Restore selected modifications if they exist in formData
    if (formData.selectedModifications) {
      setSelectedModifications(formData.selectedModifications);
    }
    
    // Restore address data if it exists in formData
    if (formData.address) {
      setAddressData(prev => ({
        ...prev,
        homeAddress1: formData.address!.homeAddress1 || prev.homeAddress1,
        homeAddress2: formData.address!.homeAddress2 || prev.homeAddress2,
        homeCity: formData.address!.homeCity || prev.homeCity,
        homeRegion: formData.address!.homeRegion || prev.homeRegion,
        homePostalCode: formData.address!.homePostalCode || prev.homePostalCode,
        billingAddress1: formData.address!.billingAddress1 || prev.billingAddress1,
        billingAddress2: formData.address!.billingAddress2 || prev.billingAddress2,
        billingCity: formData.address!.billingCity || prev.homeCity,
        billingRegion: formData.address!.billingRegion || prev.homeRegion,
        billingPostalCode: formData.address!.billingPostalCode || prev.homePostalCode,
        sameBillingAddress: formData.address!.sameBillingAddress !== undefined ? formData.address!.sameBillingAddress : prev.sameBillingAddress,
      }));
    }

    // Set a timeout to mark data restoration as complete
    const restoreTimer = setTimeout(() => {
      setIsDataRestoring(false);
    }, 500); // Wait 500ms for all data to be restored

    return () => clearTimeout(restoreTimer);
  }, [formData]);

  // Check if data restoration is complete by comparing current data with expected restored data
  useEffect(() => {
    if (expectedRestoredData && expectedRestoredData.hasData && isDataRestoring) {
      // Check if current data matches what we expect to restore
      const currentAnswers = pricingAnswers;
      const currentModifications = selectedModifications;
      
      // Compare answers
      const answersMatch = JSON.stringify(currentAnswers) === JSON.stringify(expectedRestoredData.answers);
      
      // Compare modifications
      const modificationsMatch = JSON.stringify(currentModifications) === JSON.stringify(expectedRestoredData.modifications);
      
      if (answersMatch && modificationsMatch) {
        console.log('All expected data has been restored, waiting additional time for payload stability...');
        // Wait extra time to ensure payload is completely stable
        const stabilityTimer = setTimeout(() => {
          console.log('Data restoration complete and payload stable');
          setIsDataRestoring(false);
        }, 1000); // Additional 1 second after data matches
        
        return () => clearTimeout(stabilityTimer);
      } else {
        console.log('Data restoration in progress...', {
          answersMatch,
          modificationsMatch,
          currentAnswersCount: Object.keys(currentAnswers).length,
          expectedAnswersCount: Object.keys(expectedRestoredData.answers).length,
          currentModificationsCount: currentModifications.length,
          expectedModificationsCount: expectedRestoredData.modifications.length
        });
      }
    }
  }, [pricingAnswers, selectedModifications, expectedRestoredData, isDataRestoring]);

  // Auto-calculate price with different timeouts for questions vs modifications
  useEffect(() => {
    // Clear existing question timer
    if (questionTimer) {
      clearTimeout(questionTimer);
      setQuestionTimer(null);
    }

    // Create current state signatures
    const currentAnswersState = JSON.stringify(pricingAnswers);
    const currentModificationsState = JSON.stringify(selectedModifications.map(m => ({ id: m.modificationId, quantity: m.quantity })));
    const currentFullState = JSON.stringify({
      answers: pricingAnswers,
      modifications: selectedModifications.map(m => ({ id: m.modificationId, quantity: m.quantity }))
    });

    // Check what changed compared to last calculated state
    const lastState = lastCalculatedState ? JSON.parse(lastCalculatedState) : { answers: {}, modifications: [] };
    const lastAnswersState = JSON.stringify(lastState.answers || {});
    const lastModificationsState = JSON.stringify(lastState.modifications || []);

    const answersChanged = currentAnswersState !== lastAnswersState;
    const modificationsChanged = currentModificationsState !== lastModificationsState;
    const hasStateChanged = currentFullState !== lastCalculatedState;

    // Only proceed if all required questions are answered, not already calculating, state changed, and data restoration is complete
    const shouldAutoCalculate = isAllRequiredAnswered() && !loading.calculating && hasStateChanged && !isDataRestoring;
    
    if (shouldAutoCalculate) {
      if (modificationsChanged && !answersChanged) {
        // Rate modifications changed - immediate API call
        console.log('Rate modifications changed, calculating price immediately...');
        calculatePrice();
      } else if (answersChanged) {
        // Required questions changed - 1.5 second timeout
        console.log('Required questions changed, calculating price after 1.5 seconds...');
        const timer = setTimeout(() => {
          calculatePrice();
        }, 1500);
        setQuestionTimer(timer);
      }
    }

    // Cleanup timer on component unmount
    return () => {
      if (questionTimer) {
        clearTimeout(questionTimer);
      }
    };
  }, [pricingAnswers, selectedModifications, loading.calculating, lastCalculatedState, isDataRestoring]);

  const loadPricingData = async () => {
    try {
      setLoading((prev) => ({ ...prev, questions: true, modifications: true }));
      
      // Fetch ALL questions for the selected scopes, rate modifications, and service scope details
      const [allQuestions, modifications, serviceScopes] = await Promise.all([
        apiService.getQuestions(formData.lead.scopeIds),
        apiService.getRateModifications(formData.lead.MainScopeGroupId || formData.lead.scopeIds[0]),
        apiService.getScopes(formData.lead.MainScopeGroupId || formData.lead.scopeIds[0])
      ]);

      // Find the selected service scope
      const selectedScope = serviceScopes.find(scope => 
        scope.id === formData.lead.scopeIds[0]
      );
      setSelectedServiceScope(selectedScope || null);

      // Only include questions for step 2 (During Pricing) and step 3 (After Pricing)
      const filteredQuestions = Array.isArray(allQuestions)
        ? allQuestions
            .filter(
              (q) =>
                q.QuestionStepType === "2-During Pricing" ||
                q.QuestionStepType === "3-After Pricing"
            )
            .sort((a, b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0))
        : [];

      setPricingQuestions(filteredQuestions);
      
      // Filter modifications to only show those that match the selected scope IDs
      const filteredModifications = (modifications as any[]).filter((mod: any) => {
        // Check if the modification's ScopeId matches any of the user's selected scopeIds
        return formData.lead.scopeIds.includes(mod.ScopeId.toString());
      });

      // Group and deduplicate modifications by name (after filtering)
      const uniqueModifications = filteredModifications.reduce((acc, curr) => {
        const existing = acc.find((m: RateModification) => m.Name === curr.Name);
        if (!existing) {
          acc.push(curr as unknown as RateModification);
        }
        return acc;
      }, [] as RateModification[]);

      // Debug logging to show filtering process
      console.log('All Rate Modifications from API:', modifications);
      console.log('User Selected Scope IDs:', formData.lead.scopeIds);
      console.log('Filtered Modifications by Scope ID:', filteredModifications);
      console.log('Final Unique Modifications:', uniqueModifications);

      setRateModifications(uniqueModifications);

    } catch (error) {
      console.error("Failed to load pricing data:", error);
      toast.error("Failed to load service details");
    } finally {
      setLoading((prev) => ({
        ...prev,
        questions: false,
        modifications: false
      }));
    }
  };

  // Validation functions
  const validateRequired = (
    value: string,
    fieldName: string
  ): string | undefined => {
    if (!value || value.trim() === "") return `${fieldName} is required`;
    return undefined;
  };

  const validatePostalCode = (value: string): string | undefined => {
    if (!value) return "Postal code is required";
    if (value.length < 5) return "Postal code must be at least 5 characters";
    return undefined;
  };

  const validateNonNegative = (
    value: any,
    fieldName: string
  ): string | undefined => {
    if (value === undefined || value === null || value === "") return undefined;
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0)
      return `${fieldName} cannot be negative`;
    return undefined;
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));

    let error: string | undefined;
    switch (fieldName) {
      case "homeAddress1":
        error = validateRequired(value, "Street address");
        break;
      case "homeCity":
        error = validateRequired(value, "City");
        break;
      case "homeRegion":
        error = validateRequired(value, "State/Region");
        break;
      case "homePostalCode":
        error = validatePostalCode(value);
        break;
      case "billingAddress1":
        if (!addressData.sameBillingAddress) {
          error = validateRequired(value, "Billing street address");
        }
        break;
      case "billingCity":
        if (!addressData.sameBillingAddress) {
          error = validateRequired(value, "Billing city");
        }
        break;
      case "billingRegion":
        if (!addressData.sameBillingAddress) {
          error = validateRequired(value, "Billing state/region");
        }
        break;
      case "billingPostalCode":
        if (!addressData.sameBillingAddress) {
          error = validatePostalCode(value);
        }
        break;
    }

    setValidationErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Validate required questions
    const requiredQuestions = pricingQuestions.filter((q) => q.IsRequired);
    requiredQuestions.forEach((q) => {
      const val = pricingAnswers[q.QuestionId];
      if (q.QuestionType === "Multiple Select List") {
        if (!Array.isArray(val) || val.length === 0) {
          errors[`question_${q.QuestionId}`] = "This field is required";
        }
      } else if (val === undefined || val === "") {
        errors[`question_${q.QuestionId}`] = "This field is required";
      }

      // Add validation for numeric inputs to prevent negative values
      // Skip validation for numeric fields if the value is 0
      if (
        (q.QuestionType === "Decimal" || q.QuestionType === "Whole Number") &&
        val !== undefined &&
        val !== null &&
        val !== "" &&
        val !== "0" &&
        Number(val) !== 0
      ) {
        const negativeError = validateNonNegative(
          val,
          q.QuestionText || "This field"
        );
        if (negativeError) {
          errors[`question_${q.QuestionId}`] = negativeError;
        }
      }
    });

    // Validate address fields
    errors.homeAddress1 = validateRequired(
      addressData.homeAddress1,
      "Street address"
    );
    errors.homeCity = validateRequired(addressData.homeCity, "City");
    errors.homeRegion = validateRequired(
      addressData.homeRegion,
      "State/Region"
    );
    errors.homePostalCode = validatePostalCode(addressData.homePostalCode);

    if (!addressData.sameBillingAddress) {
      errors.billingAddress1 = validateRequired(
        addressData.billingAddress1,
        "Billing street address"
      );
      errors.billingCity = validateRequired(
        addressData.billingCity,
        "Billing city"
      );
      errors.billingRegion = validateRequired(
        addressData.billingRegion,
        "Billing state/region"
      );
      errors.billingPostalCode = validatePostalCode(
        addressData.billingPostalCode
      );
    }

    setValidationErrors(errors);
    setTouchedFields(
      Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return !Object.values(errors).some((error) => error !== undefined);
  };

  // Calculate price only on button click
  const calculatePrice = async () => {
    // Clear question timer if user manually triggers calculation
    if (questionTimer) {
      clearTimeout(questionTimer);
      setQuestionTimer(null);
    }

    // Validate required questions (excluding slider questions) before proceeding
    if (!isAllRequiredAnswered()) {
      // Show validation errors for required questions that are not answered
      const requiredQuestions = pricingQuestions.filter((q) => 
        q.IsRequired && q.QuestionType !== "Whole Number"
      );
      
      const errors: ValidationErrors = {};
      requiredQuestions.forEach((q) => {
        const val = pricingAnswers[q.QuestionId];
        if (q.QuestionType === "Multiple Select List") {
          if (!Array.isArray(val) || val.length === 0) {
            errors[`question_${q.QuestionId}`] = "This field is required";
          }
        } else if (val === undefined || val === "") {
          errors[`question_${q.QuestionId}`] = "This field is required";
        }
      });
      
      setValidationErrors(errors);
      setTouchedFields(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      
      toast.error("Please fill in all required fields before calculating price");
      return;
    }

    let leadId = formData.lead.id;
    if (!leadId) {
      try {
        const leadPayload = { ...formData.lead };
        delete leadPayload.id;
        const result = await apiService.createOrUpdateLead(leadPayload);
        leadId = result.leadId;
        if (leadId) {
          onUpdateData({ lead: { ...formData.lead, id: leadId } });
        } else {
          toast.error("Failed to create lead.");
          return;
        }
      } catch (err) {
        toast.error("Failed to create lead.");
        return;
      }
    }
    
    // Set default value of 0 for unfilled questions
    pricingQuestions.forEach(q => {
      if (!pricingAnswers[q.QuestionId]) {
        if (q.QuestionType === "Decimal" || q.QuestionType === "Whole Number") {
          pricingAnswers[q.QuestionId] = "0";
        } else if (q.QuestionType === "Multiple Select List") {
          pricingAnswers[q.QuestionId] = [];
        } else if (q.QuestionType === "Select List" || q.QuestionType === "Dropdown") {
          pricingAnswers[q.QuestionId] = q.Answers?.[0]?.AnswerId || "";
        }
      }
    });

    if (!leadId) {
      toast.error("Lead ID is still undefined after creation attempt.");
      return;
    }

    formData.lead.id = leadId;

    try {
      setLoading((prev) => ({ ...prev, calculating: true }));
      // Merge all questions from StepOne (formData.lead.answers) and StepTwo (pricingAnswers)
      const stepOneQuestions: Question[] = Array.isArray(
        formData.lead.stepOneQuestions
      )
        ? formData.lead.stepOneQuestions
        : [];
      const allQuestionsList: Question[] = [
        ...stepOneQuestions,
        ...pricingQuestions,
      ];
      const uniqueQuestionsMap = new Map<number, Question>();
      allQuestionsList.forEach((q) => {
        if (!uniqueQuestionsMap.has(q.QuestionId)) {
          uniqueQuestionsMap.set(q.QuestionId, q);
        }
      });
      const allQuestions = Array.from(uniqueQuestionsMap.values());

      const allAnswers: Record<number, any> = {
        ...(formData.lead.answers || {}),
        ...(pricingAnswers || {}),
      };

      const Questions = allQuestions
        .map((q) => {
          let answer = allAnswers[q.QuestionId];
          if (
            (q.QuestionType === "Select List" ||
              q.QuestionType === "Dropdown" ||
              q.QuestionType === "choice") &&
            q.Answers &&
            q.Answers.length
          ) {
            answer =
              answer !== undefined && answer !== null && answer !== ""
                ? String(answer)
                : undefined;
          } else if (
            q.QuestionType === "Multiple Select List" &&
            q.Answers &&
            q.Answers.length
          ) {
            answer =
              Array.isArray(answer) && answer.length > 0
                ? answer.map(String).join(",")
                : undefined;
          } else if (answer !== undefined && answer !== null) {
            answer = String(answer);
          } else {
            answer = undefined;
          }

          return {
            QuestionId: q.QuestionId,
            Answer: answer,
          };
        })
        .filter(
          (q) =>
            q.Answer !== undefined &&
            q.Answer !== "" &&
            !(Array.isArray(q.Answer) && q.Answer.length === 0)
        );

      const RateModifications = selectedModifications.map(mod => ({
        Quantity: mod.quantity || 1,
        RateModificationId: mod.modificationId,
        IsRecurring: true
      }));

      const ScopesOfWork = formData.lead.scopeIds.map((scopeId) => ({
        ScopeOfWorkId: Number(scopeId),
        FrequencyId:
          (formData.lead.frequencyIds && formData.lead.frequencyIds[scopeId]) ||
          "",
        RateModifications,
      }));

      const requestBody = {
        PostalCode: formData.lead.address.zipCode || "",
        ScopeGroupId: formData.lead.MainScopeGroupId
          ? Number(formData.lead.MainScopeGroupId)
          : Number(formData.lead.scopeIds[0]) || 1,
        ScopesOfWork,
        Questions,
      };

      // Debug log to verify rate modifications are included
      console.log('Calculate Price API Request - RateModifications:', RateModifications);
      console.log('Calculate Price API Request - ScopesOfWork:', ScopesOfWork);

      const response = await apiService.calculatePrice(requestBody);
      if (response.IsSuccess && response.Result && response.Result.length > 0) {
        const scope = response.Result[0];
        const freq = scope.Frequencies && scope.Frequencies[0];
        
        // Debug log to verify rate modifications in API response
        console.log('Price Calculation API Response - RateModifications:', freq?.RateModifications);
        
        if (freq) {
          // Show all price calculation details from API
          setPriceCalculation({
            basePrice: freq.CalculatedBaseCost || 0,
            modifications:
              freq.RateModifications?.reduce(
                (sum: number, mod: any) => sum + (mod.CalculatedCost || 0),
                0
              ) || 0,
            breakdown: [
              {
                item: `${freq.FrequencyName} (${freq.FrequencyId})`,
                amount: freq.CalculatedBaseCost || 0,
              },
              { item: "Minimum Cost", amount: freq.MinimumCost || 0 },
              { item: "Total Base Hours", amount: freq.TotalBaseHours || 0 },
              {
                item: "Total Recurring Hours",
                amount: freq.TotalRecurringHours || 0,
              },
              {
                item: "Total First Job Hours",
                amount: freq.TotalFirstJobHours || 0,
              },
            ],
            total: freq.TotalRecurringCost || 0,
            firstJobCost: freq.TotalFirstJobCost || 0,
            recurringCost: freq.TotalRecurringCost || 0,
            totalHours: freq.TotalRecurringHours || 0,
            frequencyName: freq.FrequencyName || "",
            rateModifications: freq.RateModifications || [],
          });
          
          // Save current state signature to prevent infinite auto-calculations
          const currentStateSignature = JSON.stringify({
            answers: pricingAnswers,
            modifications: selectedModifications.map(m => ({ id: m.modificationId, quantity: m.quantity }))
          });
          setLastCalculatedState(currentStateSignature);
          
          // toast.success("Price calculated successfully!");
        }
      } else {
        setPriceCalculation(null);
        // toast.error(response.Message || "Complete the form to calculate price");
      }
    } catch (error) {
      // toast.error("Complete the form to calculate price");
      setPriceCalculation(null);
    } finally {
      setLoading((prev) => ({ ...prev, calculating: false }));
    }
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    // For Select List/Dropdown, ensure we store the selected option value correctly
    setPricingAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setValidationErrors((prev) => ({
      ...prev,
      [`question_${questionId}`]: undefined,
    }));
  };

  // For multi-select
  const handleMultiSelectChange = (questionId: string, values: any[]) => {
    setPricingAnswers((prev) => ({
      ...prev,
      [questionId]: values,
    }));
    setValidationErrors((prev) => ({
      ...prev,
      [`question_${questionId}`]: undefined,
    }));
  };

  const renderQuestionInput = (question: Question) => {
    const questionKey = question.QuestionId;
    const hasError =
      validationErrors[`question_${questionKey}`] &&
      touchedFields[`question_${questionKey}`];

    const inputClassName = `w-full px-4 py-3 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
    }`;

    const handleBlur = () => {
      setTouchedFields((prev) => ({
        ...prev,
        [`question_${questionKey}`]: true,
      }));

      // Add validation for numeric inputs to prevent negative values
      if (
        question.QuestionType === "Decimal" ||
        question.QuestionType === "Whole Number"
      ) {
        const value = pricingAnswers[question.QuestionId];
        if (value !== undefined && value !== null && value !== "") {
          const error = validateNonNegative(
            value,
            question.QuestionText || "This field"
          );
          setValidationErrors((prev) => ({
            ...prev,
            [`question_${questionKey}`]: error,
          }));
        }
      }
    };

    switch (question.QuestionType) {
      case "Select List":
      case "Dropdown":
        return (
          <div>
            <div className="relative">
              <select
                className={`${inputClassName} appearance-none pr-10`}
                value={pricingAnswers[question.QuestionId] || ""}
                onChange={(e) => {
                  // Handle prefer/exclude selection properly
                  const selectedValue = e.target.value;
                  console.log('Selected value:', selectedValue); // Debug log
                  handleAnswerChange(
                    question.QuestionId.toString(),
                    selectedValue
                  );
                }}
                onBlur={handleBlur}
                required={question.IsRequired}
              >
                <option value="">Select an option</option>
                {question.Answers?.map((option, idx) => (
                  <option
                    key={
                      option.AnswerId !== 0
                        ? option.AnswerId
                        : `${option.AnswerId}-${idx}`
                    }
                    value={question.QuestionId === 13540 ? option.AnswerText : option.AnswerId.toString()}
                  >
                    {option.AnswerText}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
          </div>
        );

      case "Multiple Select List":
        return (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {question.Answers?.map((option, idx) => (
                <label
                  key={
                    option.AnswerId !== 0
                      ? option.AnswerId
                      : `${option.AnswerId}-${idx}`
                  }
                  className="flex items-center p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={(
                      pricingAnswers[question.QuestionId] || []
                    ).includes(option.AnswerId.toString())}
                    onChange={(e) => {
                      const currentValues =
                        pricingAnswers[question.QuestionId] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.AnswerId.toString()]
                        : currentValues.filter(
                            (id: string) => id !== option.AnswerId.toString()
                          );
                      handleMultiSelectChange(
                        question.QuestionId.toString(),
                        newValues
                      );
                    }}
                  />
                  <span className="ml-2 text-slate-700 text-sm font-medium">
                    {option.AnswerText}
                  </span>
                </label>
              ))}
            </div>

            {hasError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
          </div>
        );

      case "Decimal":
        return (
          <div>
            <input
              type="number"
              step="0.01"
              className={inputClassName}
              value={pricingAnswers[question.QuestionId] || ""}
              onChange={(e) =>
                handleAnswerChange(
                  question.QuestionId.toString(),
                  e.target.value
                )
              }
              onBlur={handleBlur}
              required={question.IsRequired}
              min="0"
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
          </div>
        );

      case "Whole Number":
        return (
          <div>
            <div>
              {/* Mobile Layout: Stack vertically */}
              <div className="sm:hidden">
                {/* Value Display */}
                <div className="text-center mb-3">
                  <span className="text-xl font-bold text-gray-700 bg-slate-100 px-3 py-2 rounded-lg">
                    {Number(pricingAnswers[question.QuestionId]) || 0}
                  </span>
                </div>
                
                {/* Slider - Full width */}
                <div className="mb-4">
                  <Slider
                    value={[Number(pricingAnswers[question.QuestionId]) || 0]}
                    onValueChange={(value) =>
                      handleAnswerChange(question.QuestionId.toString(), value[0].toString())
                    }
                    max={question.QuestionText.toLowerCase().includes('floors') || question.QuestionText.toLowerCase().includes('levels') ? 5 : 10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                {/* Buttons - Below slider */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      const currentValue = Number(pricingAnswers[question.QuestionId]) || 0;
                      if (currentValue > 0) {
                        handleAnswerChange(question.QuestionId.toString(), (currentValue - 1).toString());
                      }
                    }}
                    className="w-12 h-12 rounded-full border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={Number(pricingAnswers[question.QuestionId]) <= 0}
                  >
                    <span className="text-2xl font-bold text-slate-600">−</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const currentValue = Number(pricingAnswers[question.QuestionId]) || 0;
                      const maxValue = question.QuestionText.toLowerCase().includes('floors') || question.QuestionText.toLowerCase().includes('levels') ? 5 : 10;
                      if (currentValue < maxValue) {
                        handleAnswerChange(question.QuestionId.toString(), (currentValue + 1).toString());
                      }
                    }}
                    className="w-12 h-12 rounded-full border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={Number(pricingAnswers[question.QuestionId]) >= (question.QuestionText.toLowerCase().includes('floors') || question.QuestionText.toLowerCase().includes('levels') ? 5 : 10)}
                  >
                    <span className="text-2xl font-bold text-slate-600">+</span>
                  </button>
                </div>
              </div>

              {/* Desktop Layout: Keep original horizontal layout */}
              <div className="hidden sm:flex items-center gap-4">
                {/* Minus Button */}
                <button
                  type="button"
                  onClick={() => {
                    const currentValue = Number(pricingAnswers[question.QuestionId]) || 0;
                    if (currentValue > 0) {
                      handleAnswerChange(question.QuestionId.toString(), (currentValue - 1).toString());
                    }
                  }}
                  className="w-10 h-10 rounded-full border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Number(pricingAnswers[question.QuestionId]) <= 0}
                >
                  <span className="text-xl font-bold text-slate-600">−</span>
                </button>

                {/* Slider */}
                <Slider
                  value={[Number(pricingAnswers[question.QuestionId]) || 0]}
                  onValueChange={(value) =>
                    handleAnswerChange(question.QuestionId.toString(), value[0].toString())
                  }
                  max={question.QuestionText.toLowerCase().includes('floors') || question.QuestionText.toLowerCase().includes('levels') ? 5 : 10}
                  min={0}
                  step={1}
                  className="flex-1"
                />

                {/* Plus Button */}
                <button
                  type="button"
                  onClick={() => {
                    const currentValue = Number(pricingAnswers[question.QuestionId]) || 0;
                    const maxValue = question.QuestionText.toLowerCase().includes('floors') || question.QuestionText.toLowerCase().includes('levels') ? 5 : 10;
                    if (currentValue < maxValue) {
                      handleAnswerChange(question.QuestionId.toString(), (currentValue + 1).toString());
                    }
                  }}
                  className="w-10 h-10 rounded-full border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Number(pricingAnswers[question.QuestionId]) >= (question.QuestionText.toLowerCase().includes('floors') || question.QuestionText.toLowerCase().includes('levels') ? 5 : 10)}
                >
                  <span className="text-xl font-bold text-slate-600">+</span>
                </button>

                {/* Value Display */}
                <span className="text-lg font-semibold text-gray-700 min-w-[3rem] text-right">
                  {Number(pricingAnswers[question.QuestionId]) || 0}
                </span>
              </div>
            </div>
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-8 h-8 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
          </div>
        );

      case "Rich Text":
        return (
          <div>
            <textarea
              className={`${inputClassName} resize-none`}
              rows={4}
              value={pricingAnswers[question.QuestionId] || ""}
              onChange={(e) =>
                handleAnswerChange(
                  question.QuestionId.toString(),
                  e.target.value
                )
              }
              onBlur={handleBlur}
              required={question.IsRequired}
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
          </div>
        );

      case "Time":
        const availableSlots = getAvailableTimeSlots(question.QuestionText || "", pricingAnswers);
        const selectedTime = pricingAnswers[question.QuestionId];
        const selectedSlot = timeSlots.find(slot => slot.value === selectedTime);
        
        return (
          <div>
            <div className="relative">
              <input
                type="text"
                className={`${inputClassName} cursor-pointer`}
                value={selectedSlot ? selectedSlot.label : ""}
                placeholder="Select time"
                readOnly
                onClick={() => openTimeModal(question.QuestionId.toString())}
                onBlur={handleBlur}
                required={question.IsRequired}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
            
            {/* Time Selection Modal */}
            {timeModalOpen === question.QuestionId.toString() && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">Select Time Slot</h3>
                      <p className="text-sm text-slate-600 mt-1">{question.QuestionText}</p>
                    </div>
                    <button
                      onClick={closeTimeModal}
                      className="ml-4 p-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  
                  {/* Time Slots Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTime === slot.value;
                      const isDisabled = !availableSlots.some(availableSlot => availableSlot.value === slot.value);
                      
                      return (
                        <button
                          key={slot.value}
                          onClick={() => selectTime(question.QuestionId.toString(), slot.value)}
                          disabled={isDisabled}
                          className={`
                            p-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm
                            ${isSelected 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : isDisabled
                                ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                            }
                          `}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Modal Footer */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={closeTimeModal}
                      className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div>
            <input
              type="text"
              className={inputClassName}
              value={pricingAnswers[question.QuestionId] || ""}
              onChange={(e) =>
                handleAnswerChange(
                  question.QuestionId.toString(),
                  e.target.value
                )
              }
              onBlur={handleBlur}
              required={question.IsRequired}
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {validationErrors[`question_${questionKey}`]}
              </p>
            )}
          </div>
        );
    }
  };

  const handleNext = async () => {
    // Only validate address fields
    const addressErrors: ValidationErrors = {};
    addressErrors.homeAddress1 = validateRequired(addressData.homeAddress1, "Street address");
    addressErrors.homeCity = validateRequired(addressData.homeCity, "City");
    addressErrors.homeRegion = validateRequired(addressData.homeRegion, "State/Region");
    addressErrors.homePostalCode = validatePostalCode(addressData.homePostalCode);

    if (!addressData.sameBillingAddress) {
      addressErrors.billingAddress1 = validateRequired(addressData.billingAddress1, "Billing street address");
      addressErrors.billingCity = validateRequired(addressData.billingCity, "Billing city");
      addressErrors.billingRegion = validateRequired(addressData.billingRegion, "Billing state/region");
      addressErrors.billingPostalCode = validatePostalCode(addressData.billingPostalCode);
    }

    const hasAddressErrors = Object.values(addressErrors).some(error => error !== undefined);
    if (hasAddressErrors) {
      setValidationErrors(addressErrors);
      toast.error("Please provide valid address information");
      return;
    }

    if (!formData.lead.id) {
      toast.error("Lead information is missing");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, saving: true }));
      // Merge all questions from StepOne and StepTwo for the API payload
      const stepOneQuestions: Question[] = Array.isArray(
        formData.lead.stepOneQuestions
      )
        ? formData.lead.stepOneQuestions
        : [];
      const allQuestionsList: Question[] = [
        ...stepOneQuestions,
        ...pricingQuestions,
      ];
      const uniqueQuestionsMap = new Map<number, Question>();
      allQuestionsList.forEach((q) => {
        if (!uniqueQuestionsMap.has(q.QuestionId)) {
          uniqueQuestionsMap.set(q.QuestionId, q);
        }
      });
      const allQuestions = Array.from(uniqueQuestionsMap.values());

      // Merge answers from both steps
      const allAnswers: Record<number, any> = {
        ...(formData.lead.answers || {}),
        ...(pricingAnswers || {}),
      };

      // Build Questions array for API (all required questions, even if not shown in this step)
      let Questions = allQuestions
        .map((q) => {
          let answer = allAnswers[q.QuestionId];
          
          // Special handling for Prefer/Exclude question (QuestionId 13540)
          if (q.QuestionId === 13540) {
            if (answer === "Prefer" || answer === "P") answer = "P";
            else if (answer === "Exclude" || answer === "E") answer = "E";
          }

          // Special handling for "Prefer/Exclude Start/End Time" questions
          const isTimeField =
            typeof q.QuestionText === "string" &&
            (/prefer.*start time/i.test(q.QuestionText) ||
              /exclude.*start time/i.test(q.QuestionText) ||
              /prefer.*end time/i.test(q.QuestionText) ||
              /exclude.*end time/i.test(q.QuestionText));

          if (isTimeField && answer) {
            // Accepts answer as "14:05" or "14:05:00" and always outputs "HH:mm:ss"
            let timeStr = String(answer).trim();
            if (/^\d{1,2}:\d{2}$/.test(timeStr)) {
              // If only HH:mm, add :00 seconds
              timeStr = timeStr + ":00";
            } else if (/^\d{1,2}:\d{2}:\d{2}$/.test(timeStr)) {
              // Already in HH:mm:ss
            } else if (!isNaN(Date.parse(timeStr))) {
              // If a valid date string, extract time part
              const d = new Date(timeStr);
              const h = String(d.getHours()).padStart(2, "0");
              const m = String(d.getMinutes()).padStart(2, "0");
              const s = String(d.getSeconds()).padStart(2, "0");
              timeStr = `${h}:${m}:${s}`;
            } else {
              // Fallback: send as string
            }
            answer = timeStr;
          } else if (
            (q.QuestionType === "Select List" ||
              q.QuestionType === "Dropdown" ||
              q.QuestionType === "choice") &&
            q.Answers &&
            q.Answers.length
          ) {
            // Always post as string AnswerId
            answer =
              answer !== undefined && answer !== null && answer !== ""
                ? String(answer)
                : undefined;
          } else if (
            q.QuestionType === "Multiple Select List" &&
            q.Answers &&
            q.Answers.length
          ) {
            // Comma separated string of AnswerIds
            answer =
              Array.isArray(answer) && answer.length > 0
                ? answer.map(String).join(",")
                : undefined;
          } else if (answer !== undefined && answer !== null) {
            answer = String(answer);
          } else {
            answer = undefined;
          }

          return {
            QuestionId: q.QuestionId,
            Answer: answer,
          };
        })
        .filter(
          (q) =>
            q.Answer !== undefined &&
            q.Answer !== "" &&
            !(Array.isArray(q.Answer) && q.Answer.length === 0)
        );

      // Remove timing questions ONLY for CreateOrUpdateQuote API (QuestionId 13542, 13453, 13543)
      Questions = Questions.filter(
        (q) =>
          q.QuestionId !== 13542 &&
          q.QuestionId !== 13453 &&
          q.QuestionId !== 13543
      );

      // Build RateModifications array
      const RateModifications = selectedModifications.map(mod => ({
        Quantity: mod.quantity || 1,
        RateModificationId: mod.modificationId,
        IsRecurring: true
      }));

      // Build ScopesOfWork array
      const ScopesOfWork = formData.lead.scopeIds.map((scopeId) => ({
        ScopeOfWorkId: Number(scopeId),
        FrequencyId:
          (formData.lead.frequencyIds && formData.lead.frequencyIds[scopeId]) ||
          "",
        RateModifications,
      }));

      // Use the saved MainScopeGroupId for ScopeGroupId
      const scopeGroupId = formData.lead.MainScopeGroupId
        ? Number(formData.lead.MainScopeGroupId)
        : Number(formData.lead.scopeIds[0]) || 1;

      // Remove any invalid or empty date fields from the payload
      const quotePayload: any = {
        LeadId: Number(formData.lead.id),
        QuoteId: "00000000-0000-0000-0000-000000000000",
        HomeAddress1: addressData.homeAddress1,
        HomeAddress2: addressData.homeAddress2,
        HomeCity: addressData.homeCity,
        HomeRegion: addressData.homeRegion,
        HomePostalCode: addressData.homePostalCode,
        BillingAddress1: addressData.sameBillingAddress
          ? addressData.homeAddress1
          : addressData.billingAddress1,
        BillingAddress2: addressData.sameBillingAddress
          ? addressData.homeAddress2
          : addressData.billingAddress2,
        BillingCity: addressData.sameBillingAddress
          ? addressData.homeCity
          : addressData.billingCity,
        BillingRegion: addressData.sameBillingAddress
          ? addressData.homeRegion
          : addressData.billingRegion,
        BillingPostalCode: addressData.sameBillingAddress
          ? addressData.homePostalCode
          : addressData.billingPostalCode,
        SendQuoteEmail: true,
        AddToCampaigns: true,
        TriggerWebhook: true,
        ScopeGroupId: scopeGroupId,
        ScopesOfWork,
        Questions,
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
      };

      // Debug log to verify rate modifications are included in quote creation
      console.log('Create Quote API Request - RateModifications:', RateModifications);
      console.log('Create Quote API Request - ScopesOfWork:', ScopesOfWork);

      // Remove any keys with invalid or empty date values (e.g., empty string, null, or invalid date)
      Object.keys(quotePayload).forEach((key) => {
        if (/date/i.test(key) || /Date/i.test(key)) {
          if (
            quotePayload[key] === null ||
            quotePayload[key] === undefined ||
            quotePayload[key] === "" ||
            quotePayload[key] === 0 ||
            quotePayload[key] === false
          ) {
            delete quotePayload[key];
          } else {
            // If it's a string, check if it's a valid date
            if (
              typeof quotePayload[key] === "string" &&
              isNaN(Date.parse(quotePayload[key]))
            ) {
              delete quotePayload[key];
            }
          }
        }
      });

      const result = await apiService.createOrUpdateQuote(quotePayload);
      if (result.IsSuccess) {
        // Save pricing answers to lead answers for restoration when returning
        const updatedLead = {
          ...formData.lead,
          answers: {
            ...formData.lead.answers,
            ...pricingAnswers
          }
        };

        onUpdateData({
          lead: updatedLead,
          quote: {
            id: result.Result.QuoteId,
            quoteId: result.Result.QuoteId, // Save MaidCentral QuoteId here
            leadId: formData.lead.id,
            priceCalculation: priceCalculation || {
              basePrice: 0,
              modifications: 0,
              breakdown: [],
              total: 0,
              firstJobCost: 0,
              recurringCost: 0,
              totalHours: 0,
              frequencyName: ""
            },
            validUntil: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          address: addressData,
          selectedModifications: selectedModifications,
        });
        //toast.success("Quote created successfully!");
        onNext();
      } else {
        toast.error(result.Message || "Failed to create quote");
      }
    } catch (error) {
      console.error("Failed to save quote:", error);
      toast.error("Failed to save quote");
    } finally {
      setLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  const isAllRequiredAnswered = () => {
    // Filter required questions but exclude the 4 slider questions (Whole Number type)
    const requiredQuestions = pricingQuestions.filter((q) => 
      q.IsRequired && q.QuestionType !== "Whole Number"
    );
    
    return requiredQuestions.every((q) => {
      const val = pricingAnswers[q.QuestionId];
      if (q.QuestionType === "Multiple Select List") {
        return Array.isArray(val) && val.length > 0;
      }
      return val !== undefined && val !== "";
    });
  };

  const isStepValid = () => {
    const hasRequiredAddress =
      addressData.homeAddress1 &&
      addressData.homeCity &&
      addressData.homePostalCode;
    const hasBillingAddress =
      addressData.sameBillingAddress ||
      (addressData.billingAddress1 &&
        addressData.billingCity &&
        addressData.billingPostalCode);

    // Only check for address validation errors
    const addressErrors = Object.keys(validationErrors).filter(key => 
      key.includes('Address') || key.includes('City') || 
      key.includes('Region') || key.includes('PostalCode')
    );
    const hasAddressValidationErrors = addressErrors.some(
      key => validationErrors[key] !== undefined
    );

    return (
      hasRequiredAddress &&
      hasBillingAddress &&
      !hasAddressValidationErrors
    );
  };

  return (
    <div className="min-h-screen bg-white  relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 py-12 space-y-10"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
          >
            <Calculator className="w-8 h-8 text-blue-600" />
          </motion.div> */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 bg-gradient-to-r from-zinc-800 to-zinc-950 bg-clip-text text-transparent">
            Quote Creation & Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-2">
            Provide details to calculate your personalized quote and complete
            your service request
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
              <span className="text-sm font-medium text-gray-700">
                Form Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {calculateProgress()}%
              </span>
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
                color: calculateProgress() === 100 ? "#10B981" : "#6B7280",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-medium">
                {calculateProgress() === 100 ? "Complete!" : "Keep going..."}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Pricing Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=" rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6 md:p-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600" />
            </div>
            <h2 className="text-base sm:text-lg font-medium text-slate-900">
              Service Details
            </h2>
          </div>

          {loading.questions ? (
            <div className="flex justify-center py-8 sm:py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-col-2 gap-4">
              {pricingQuestions.map((question) => (
                <motion.div
                  key={question.QuestionId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className=""
                >
                  <div className="flex items-center mb-3">
                    <label className="text-sm font-semibold text-slate-700">
                      {question.QuestionText}{" "}
                      {question.IsRequired && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {question.HelpText && (
                      <div className="relative ml-2">
                        {/* Desktop: Hover tooltip */}
                        <div 
                          className="hidden md:block"
                          onMouseEnter={() => showTooltip(question.QuestionId.toString())}
                          onMouseLeave={() => hideTooltip(question.QuestionId.toString())}
                        >
                          <Info className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-help transition-colors" />
                          {openTooltips[question.QuestionId.toString()] && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                              <div className="text-xs text-slate-600 leading-relaxed">
                                {question.HelpText}
                              </div>
                              {/* Tooltip arrow */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
                            </div>
                          )}
                        </div>
                        
                        {/* Mobile: Click tooltip */}
                        <div className="md:hidden">
                          <Info 
                            className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" 
                            onClick={() => toggleTooltip(question.QuestionId.toString())}
                          />
                          {openTooltips[question.QuestionId.toString()] && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                              <div className="text-xs text-slate-600 leading-relaxed">
                                {question.HelpText}
                              </div>
                              {/* Tooltip arrow */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                                {renderQuestionInput(question)}
            </motion.div>
          ))}

          {/* Rate Modifications - Before Get Price Button */}
          {rateModifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-8 bg-white border border-slate-200 rounded-2xl shadow-lg"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Select Extras
                </h3>
                <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
                  If you'd like to add extras to your booking, you can choose them here. If your booking is already confirmed, please call or text us at <span className="text-red-600 font-semibold">551-305-4081</span>, and we'll be happy to add the extras to your next booking.
                </p>
              </div>

              {loading.modifications ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {rateModifications.map((modification) => {
                    const isSelected = selectedModifications.some(
                      (selected) => selected.modificationId === modification.RateModificationId
                    );
                    
                    return (
                      <motion.div
                        key={modification.RateModificationId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                            : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:scale-105"
                        }`}
                        style={{
                          minHeight: '140px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedModifications(prev =>
                              prev.filter(m => m.modificationId !== modification.RateModificationId)
                            );
                          } else {
                            setSelectedModifications(prev => [
                              ...prev,
                              {
                                modificationId: modification.RateModificationId,
                                name: modification.Name,
                                cost: modification.Cost,
                                scopeId: modification.ScopeId,
                                quantity: 1
                              }
                            ]);
                          }
                        }}
                      >
                        {/* Service Icon */}
                        <div className="flex justify-center mb-2 sm:mb-3">
                          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-blue-100 border-2 border-blue-300 text-black' : 'bg-white border-2 border-slate-200'
                          }`}>
                            {(() => {
                              const serviceName = modification.Name.toLowerCase();
                              if (serviceName.includes('kitchen') || serviceName.includes('cabinet')) {
                                return <img src="/icons/kitchen.png" alt="Kitchen Cabinet" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('oven')) {
                                return <img src="/icons/oven.png" alt="Oven" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('refrigerator') || serviceName.includes('fridge')) {
                                return <img src="/icons/refrigerator.png" alt="Refrigerator" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('window')) {
                                return <img src="/icons/window.png" alt="Window" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('blind')) {
                                return <img src="/icons/blinds.png" alt="Blind" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('dish')) {
                                return <img src="/icons/dish-washer.png" alt="Dishwasher" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('laundry')) {
                                return <img src="/icons/laundry-machine.png" alt="Laundry" className="w-6 h-6 sm:w-8 sm:h-8" />
                              } else if (serviceName.includes('organization')) {
                                return <img src="/icons/organization.png" alt="Organization" className="w-6 h-6 sm:w-8 sm:h-8" />;
                              } else if (serviceName.includes('pet') || serviceName.includes('hair')) {
                                return <img src="/icons/pet.png" alt="Pet" className="w-6 h-6 sm:w-8 sm:h-8" />;
                              } else {
                                return <i className="fi fi-rr-user"></i>;
                              }
                            })()}
                          </div>
                        </div>

                        {/* Service Name */}
                        <div className="text-center mb-2 flex-1">
                          <h4 className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight">
                            {modification.Name}
                          </h4>
                          {modification.Description && (
                            <p className="text-xs text-slate-600 mt-1 hidden sm:block">
                              {modification.Description}
                            </p>
                          )}
                        </div>

                        {/* Pricing */}
                        <div className="text-center mb-2 sm:mb-3">
                          {/* Concise pricing */}
                          <span className={`text-xs sm:text-sm font-bold ${
                            isSelected ? 'text-blue-600' : 'text-slate-700'
                          }`}>
                            {(() => {
                              const serviceName = modification.Name.toLowerCase();
                              if (serviceName.includes('organization') || serviceName.includes('per hour')) {
                                return `$${modification.Cost}/hr`;
                              } else if (serviceName.includes('window')) {
                                return `$${modification.Cost}/window`;
                              } else if (serviceName.includes('blind')) {
                                return `$${modification.Cost}/set`;
                              } else if (serviceName.includes('dish') || serviceName.includes('laundry') || serviceName.includes('per load')) {
                                return `$${modification.Cost}/load`;
                              } else {
                                return `$${modification.Cost}`;
                              }
                            })()}
                          </span>
                        </div>

                        {/* Selection Indicator */}
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? "bg-blue-500 border-blue-500" 
                              : "border-slate-300"
                          }`}>
                            {isSelected && (
                              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            )}
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        {isSelected && (() => {
                          const quantityOptions = getQuantityOptions(modification.Name);
                          
                          // If no quantity options, don't show quantity selector
                          if (!quantityOptions) {
                            return null;
                          }
                          
                          return (
                            <div className="mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-slate-200">
                              <div className="flex items-center justify-center gap-2 sm:gap-3">
                                <label className="text-xs text-slate-600 font-medium">Qty:</label>
                                <div className="flex items-center gap-1 sm:gap-2">
                                  {/* Minus Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentQuantity = selectedModifications.find(m => m.modificationId === modification.RateModificationId)?.quantity || 1;
                                      const minQuantity = Math.min(...quantityOptions);
                                      if (currentQuantity > minQuantity) {
                                        setSelectedModifications(prev =>
                                          prev.map(m =>
                                            m.modificationId === modification.RateModificationId
                                              ? { ...m, quantity: currentQuantity - 1 }
                                              : m
                                          )
                                        );
                                      }
                                    }}
                                    disabled={
                                      (selectedModifications.find(m => m.modificationId === modification.RateModificationId)?.quantity || 1) <= Math.min(...quantityOptions)
                                    }
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-transparent"
                                  >
                                    <span className="text-xs sm:text-sm font-bold text-slate-600">−</span>
                                  </button>
                                  
                                  {/* Quantity Display */}
                                  <span className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[1.5rem] sm:min-w-[2rem] text-center">
                                    {selectedModifications.find(m => m.modificationId === modification.RateModificationId)?.quantity || 1}
                                  </span>
                                  
                                  {/* Plus Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentQuantity = selectedModifications.find(m => m.modificationId === modification.RateModificationId)?.quantity || 1;
                                      const maxQuantity = Math.max(...quantityOptions);
                                      if (currentQuantity < maxQuantity) {
                                        setSelectedModifications(prev =>
                                          prev.map(m =>
                                            m.modificationId === modification.RateModificationId
                                              ? { ...m, quantity: currentQuantity + 1 }
                                              : m
                                          )
                                        );
                                      }
                                    }}
                                    disabled={
                                      (selectedModifications.find(m => m.modificationId === modification.RateModificationId)?.quantity || 1) >= Math.max(...quantityOptions)
                                    }
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-transparent"
                                  >
                                    <span className="text-xs sm:text-sm font-bold text-slate-600">+</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Selected Services Summary */}
              {selectedModifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                >
                  <h4 className="font-semibold text-blue-900 mb-3 text-center">
                    Selected Extras ({selectedModifications.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedModifications.map((mod) => (
                      <div key={mod.modificationId} className="flex items-center justify-between p-2 bg-white rounded-lg border border-blue-200">
                        <span className="text-blue-800 text-sm font-medium">
                          {mod.name} (Qty: {mod.quantity || 1})
                        </span>
                        <span className="font-bold text-blue-900">
                          ${mod.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Get Price Button */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end pt-4 sm:pt-6 gap-3">


            {/* Rate Modifications Summary */}
            {selectedModifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                {selectedModifications.length} modification{selectedModifications.length !== 1 ? 's' : ''} selected
              </motion.div>
            )}
            
            <motion.button
              type="button"
              className={`group flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                isAllRequiredAnswered() && !loading.calculating
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
              onClick={calculatePrice}
              disabled={!isAllRequiredAnswered() || loading.calculating}
              whileHover={
                isAllRequiredAnswered() && !loading.calculating
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                isAllRequiredAnswered() && !loading.calculating
                  ? { scale: 0.98 }
                  : {}
              }
            >
              {loading.calculating ? (
                <>
                  <LoadingSpinner size="sm" color="text-white" />
                  <span className="ml-2">Calculating...</span>
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Get Price
                </>
              )}
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>



        {/* Price Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-zinc-50 to-zinc-200 border-2 border-zinc-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
        >
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            {/* <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div> */}
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
              Price Calculation
            </h2>
          </div>

          {loading.calculating ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-zinc-700 font-medium text-sm sm:text-base">
                Calculating your personalized quote...
              </p>
            </div>
          ) : priceCalculation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="space-y-4">
                {/* Minimum Service Cost */}
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-700 font-medium">
                    Service: {selectedServiceScope?.name || 'Unknown Service'}
                    <br />
                    Frequency: {priceCalculation.frequencyName}
                  </span>
                  <span className="font-semibold text-zinc-800">
                    ${(priceCalculation.total - priceCalculation.modifications).toFixed(2)}
                  </span>
                </div>

                {/* Rate Modifications */}
                {priceCalculation.rateModifications && priceCalculation.rateModifications.length > 0 && (
                  <>
                    <div className="py-2 border-b border-slate-100">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Additional Services</h4>
                      <div className="space-y-2">
                        {priceCalculation.rateModifications.map((mod: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">
                              {mod.Name} (Qty: {mod.Quantity || 1})
                            </span>
                            <span className="font-medium text-slate-700">
                              +${mod.CalculatedCost?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Modifications Subtotal */}
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-700 font-medium">Additional Services Total</span>
                      <span className="font-semibold text-zinc-800">
                        +${priceCalculation.modifications.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}

                {/* Total Price */}
                <div className="pt-4 border-t-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-slate-900">
                      Total Price
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-800">
                      ${priceCalculation.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    {priceCalculation.frequencyName}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-zinv-800" />
              </div>
              <p className="text-zinc-800 font-medium text-sm sm:text-base">
                Complete the service details above to see pricing
              </p>
            </div>
          )}
        </motion.div>

        {/* Address Information - Show only after price calculation */}
        {priceCalculation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className=""
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Service Address
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    Street Address *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                        validationErrors.homeAddress1 &&
                        touchedFields.homeAddress1
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                          : addressData.homeAddress1
                          ? "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      value={addressData.homeAddress1}
                      onChange={(e) =>
                        setAddressData((prev) => ({
                          ...prev,
                          homeAddress1: e.target.value,
                        }))
                      }
                      onBlur={(e) =>
                        handleFieldBlur("homeAddress1", e.target.value)
                      }
                      required
                      placeholder="Enter street address"
                    />
                
                  </div>
                  {validationErrors.homeAddress1 &&
                    touchedFields.homeAddress1 && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.homeAddress1}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Apartment/Unit (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300"
                    value={addressData.homeAddress2}
                    onChange={(e) =>
                      setAddressData((prev) => ({
                        ...prev,
                        homeAddress2: e.target.value,
                      }))
                    }
                    placeholder="Apt, suite, unit, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                      validationErrors.homeCity && touchedFields.homeCity
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    value={addressData.homeCity}
                    onChange={(e) =>
                      setAddressData((prev) => ({
                        ...prev,
                        homeCity: e.target.value,
                      }))
                    }
                    onBlur={(e) => handleFieldBlur("homeCity", e.target.value)}
                    required
                    placeholder="Enter city"
                  />
                  {validationErrors.homeCity && touchedFields.homeCity && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {validationErrors.homeCity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    State/Region *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                      validationErrors.homeRegion && touchedFields.homeRegion
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    value={addressData.homeRegion}
                    onChange={(e) =>
                      setAddressData((prev) => ({
                        ...prev,
                        homeRegion: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      handleFieldBlur("homeRegion", e.target.value)
                    }
                    required
                    placeholder="Enter state/region"
                  />
                  {validationErrors.homeRegion && touchedFields.homeRegion && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {validationErrors.homeRegion}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                      validationErrors.homePostalCode &&
                      touchedFields.homePostalCode
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    value={addressData.homePostalCode}
                    onChange={(e) =>
                      setAddressData((prev) => ({
                        ...prev,
                        homePostalCode: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      handleFieldBlur("homePostalCode", e.target.value)
                    }
                    required
                    placeholder="Enter postal code"
                  />
                  {validationErrors.homePostalCode &&
                    touchedFields.homePostalCode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.homePostalCode}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  id="sameBillingAddress"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={addressData.sameBillingAddress}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      sameBillingAddress: e.target.checked,
                    }))
                  }
                />
                <label
                  htmlFor="sameBillingAddress"
                  className="ml-3 text-sm font-medium text-slate-700"
                >
                  Billing address is the same as service address
                </label>
              </div>

              {!addressData.sameBillingAddress && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6 pt-6 border-t border-slate-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Billing Address
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                          validationErrors.billingAddress1 &&
                          touchedFields.billingAddress1
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                        value={addressData.billingAddress1}
                        onChange={(e) =>
                          setAddressData((prev) => ({
                            ...prev,
                            billingAddress1: e.target.value,
                          }))
                        }
                        onBlur={(e) =>
                          handleFieldBlur("billingAddress1", e.target.value)
                        }
                        required
                        placeholder="Enter billing street address"
                      />
                      {validationErrors.billingAddress1 &&
                        touchedFields.billingAddress1 && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {validationErrors.billingAddress1}
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Apartment/Unit (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300"
                        value={addressData.billingAddress2}
                        onChange={(e) =>
                          setAddressData((prev) => ({
                            ...prev,
                            billingAddress2: e.target.value,
                          }))
                        }
                        placeholder="Apt, suite, unit, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                          validationErrors.billingCity &&
                          touchedFields.billingCity
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                        value={addressData.billingCity}
                        onChange={(e) =>
                          setAddressData((prev) => ({
                            ...prev,
                            billingCity: e.target.value,
                          }))
                        }
                        onBlur={(e) =>
                          handleFieldBlur("billingCity", e.target.value)
                        }
                        required
                        placeholder="Enter billing city"
                      />
                      {validationErrors.billingCity &&
                        touchedFields.billingCity && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {validationErrors.billingCity}
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        State/Region *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                          validationErrors.billingRegion &&
                          touchedFields.billingRegion
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                        value={addressData.billingRegion}
                        onChange={(e) =>
                          setAddressData((prev) => ({
                            ...prev,
                            billingRegion: e.target.value,
                          }))
                        }
                        onBlur={(e) =>
                          handleFieldBlur("billingRegion", e.target.value)
                        }
                        required
                        placeholder="Enter billing state/region"
                      />
                      {validationErrors.billingRegion &&
                        touchedFields.billingRegion && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {validationErrors.billingRegion}
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                          validationErrors.billingPostalCode &&
                          touchedFields.billingPostalCode
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                        value={addressData.billingPostalCode}
                        onChange={(e) =>
                          setAddressData((prev) => ({
                            ...prev,
                            billingPostalCode: e.target.value,
                          }))
                        }
                        onBlur={(e) =>
                          handleFieldBlur("billingPostalCode", e.target.value)
                        }
                        required
                        placeholder="Enter billing postal code"
                      />
                      {validationErrors.billingPostalCode &&
                        touchedFields.billingPostalCode && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {validationErrors.billingPostalCode}
                          </p>
                        )}
                    </div>
                  </div>
                </motion.div>
              )}
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
            onClick={() => {
              // Clear selected rate modifications when going back to step 1
              setSelectedModifications([]);
              // Also clear from formData to prevent restoration issues
              onUpdateData({ selectedModifications: [] });
              onPrevious();
            }}
            className="group flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Previous
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!isStepValid() || loading.saving}
            className={`group flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
              isStepValid() && !loading.saving
                ? "bg-gradient-to-r from-zinc-800 to-zinc-950 text-white hover:from-zinc-950 hover:to-zinc-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
            whileHover={isStepValid() && !loading.saving ? { scale: 1.02 } : {}}
            whileTap={isStepValid() && !loading.saving ? { scale: 0.98 } : {}}
          >
            {loading.saving ? (
              <>
                <LoadingSpinner size="sm" color="text-white" />
                <span className="ml-2">Saving Quote...</span>
              </>
            ) : (
              <>
                Continue to Booking
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepTwo;
