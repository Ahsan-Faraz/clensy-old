"use client";

import type React from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { apiService } from "../../services/api";
import { toast } from "sonner";
import type {
  ScopeGroup,
  ServiceScope,
  Question,
  Lead,
} from "../../types/booking";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CheckCircle,
  ChevronRight,
  Star,
  AlertCircle,
} from "lucide-react";

interface StepOneProps {
  formData: Lead;
  onUpdateData: (data: Partial<Lead>) => void;
  onNext: () => void;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  scopeIds?: string;
  frequencies?: string;
  [key: string]: string | undefined;
}

export const StepOne: React.FC<StepOneProps> = ({
  formData,
  onUpdateData,
  onNext,
}) => {
  const [scopeGroups, setScopeGroups] = useState<ScopeGroup[]>([]);
  const [availableScopes, setAvailableScopes] = useState<ServiceScope[]>([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<
    Record<string, string>
  >({}); // scopeId -> frequencyId
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState({
    scopeGroups: true,
    scopes: false,
    questions: false,
  });
  const [selectedScopeGroup, setSelectedScopeGroup] = useState<string>("");
  const [postalCodeValid, setPostalCodeValid] = useState<boolean | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  // Google Maps Places Autocomplete
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !streetInputRef.current) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(streetInputRef.current, {
        componentRestrictions: { country: ["us"] },
        fields: ["address_components", "formatted_address"],
        types: ["address"]
      });

      // Add place_changed event listener
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place?.address_components) return;

        let streetNumber = "";
        let route = "";
        let city = "";
        let state = "";
        let zipCode = "";

        // Extract address components
        place.address_components.forEach((component: google.maps.GeocoderAddressComponent) => {
          const type = component.types[0];
          switch (type) {
            case "street_number":
              streetNumber = component.long_name;
              break;
            case "route":
              route = component.long_name;
              break;
            case "locality":
              city = component.long_name;
              break;
            case "administrative_area_level_1":
              state = component.short_name;
              break;
            case "postal_code":
              zipCode = component.long_name;
              break;
          }
        });

        // Debug logging to see what we extracted
        console.log('Google Maps Address Components:', {
          streetNumber,
          route,
          city,
          state,
          zipCode
        });

        // Update form data with extracted address components
        onUpdateData({
          address: {
            ...formData.address,
            street: `${streetNumber} ${route}`.trim(),
            city,
            state,
            zipCode
          }
        });

        // Validate all address fields with the new values (but don't save to localStorage yet)
        setTouchedFields((prev) => ({ 
          ...prev, 
          street: true,
          city: true,
          zipCode: true,
          state: true
        }));

        // Save service address to local storage with the actual extracted values
        const serviceAddress = {
          street: `${streetNumber} ${route}`.trim(),
          city: city || "",
          zipCode: zipCode || "",
          state: state || ""
        };
        
        console.log('Saving Google Maps data to localStorage:', serviceAddress);
        localStorage.setItem('serviceAddress', JSON.stringify(serviceAddress));
        
        // Validate postal code if it was filled
        if (zipCode) {
          validatePostalCode(zipCode);
        }
      });

      setIsGoogleMapsLoaded(true);
    };

    // Check if Google Maps is loaded
    if (window.google && window.google.maps) {
      initAutocomplete();
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initAutocomplete();
        }
      }, 100);

      // Cleanup
      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  // Calculate global form completion percentage across all steps
  const calculateProgress = (): number => {
    // Step 1: Basic information and service selection (40% of total)
    const step1Fields = [
      "firstName",
      "lastName", 
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zipCode",
      "scopeIds",
    ];
    
    let step1Completed = 0;
    const step1Total = step1Fields.length + questions.filter((q) => q.IsRequired).length + 1; // +1 for frequency
    
    // Check basic fields
    if (formData.firstName) step1Completed++;
    if (formData.lastName) step1Completed++;
    if (formData.email) step1Completed++;
    if (formData.phone) step1Completed++;
    if (formData.address.street) step1Completed++;
    if (formData.address.city) step1Completed++;
    if (formData.address.state) step1Completed++;
    if (formData.address.zipCode) step1Completed++;
    if (formData.scopeIds.length > 0) step1Completed++;
    
    // Check frequency selection
    if (formData.scopeIds.length > 0 && selectedFrequencies[formData.scopeIds[0]]) {
      step1Completed++;
    }
    
    // Check required questions
    questions.filter((q) => q.IsRequired).forEach((q) => {
      const answer = formData.answers?.[q.QuestionId];
      if (answer !== undefined && answer !== "" && answer !== null) {
        step1Completed++;
      }
    });
    
    const step1Progress = (step1Completed / step1Total) * 0.4; // 40% weight
    
    // Step 2: Pricing and address (40% of total)
    const step2Progress = 0; // Will be calculated in StepTwo
    
    // Step 3: Date selection and payment (20% of total)
    const step3Progress = 0; // Will be calculated in StepThree
    
    return Math.round((step1Progress + step2Progress + step3Progress) * 100);
  };

  useEffect(() => {
    loadScopeGroups();
    // Validate existing form data if present
    if (formData) {
      validateExistingFormData();
    }
  }, []);

  useEffect(() => {
    if (selectedScopeGroup) {
      loadScopes(selectedScopeGroup);
    }
  }, [selectedScopeGroup]);

  // Validate existing form data when returning from Step Two
  const validateExistingFormData = () => {
    if (formData) {
      // Validate basic fields
      const errors: ValidationErrors = {};
      if (formData.firstName) handleFieldBlur('firstName', formData.firstName);
      if (formData.lastName) handleFieldBlur('lastName', formData.lastName);
      if (formData.email) handleFieldBlur('email', formData.email);
      if (formData.phone) handleFieldBlur('phone', formData.phone);
      if (formData.address.street) handleFieldBlur('street', formData.address.street);
      if (formData.address.city) handleFieldBlur('city', formData.address.city);
      if (formData.address.state) handleFieldBlur('state', formData.address.state);
      if (formData.address.zipCode) handleFieldBlur('zipCode', formData.address.zipCode);
      
      // Validate postal code if it exists
      if (formData.address.zipCode) {
        validatePostalCode(formData.address.zipCode);
      }

      // Mark fields as touched if they have data
      const touched: Record<string, boolean> = {};
      if (formData.firstName) touched.firstName = true;
      if (formData.lastName) touched.lastName = true;
      if (formData.email) touched.email = true;
      if (formData.phone) touched.phone = true;
      if (formData.address.street) touched.street = true;
      if (formData.address.city) touched.city = true;
      if (formData.address.state) touched.state = true;
      if (formData.address.zipCode) touched.zipCode = true;
      setTouchedFields(touched);
    }
  };

  useEffect(() => {
    if (formData.scopeIds.length > 0) {
      loadQuestions();
    }
  }, [formData.scopeIds]);

  // Save all StepOne questions to formData for use in StepTwo
  useEffect(() => {
    if (questions && questions.length > 0) {
      onUpdateData({ stepOneQuestions: questions });
    }
  }, [questions]);

  const loadScopeGroups = async () => {
    try {
      setLoading((prev) => ({ ...prev, scopeGroups: true }));
      const groups = await apiService.getScopeGroups();
      setScopeGroups(groups);
      setSelectedScopeGroup("1282");
      onUpdateData({ scopeIds: [], MainScopeGroupId: "1282" }); // Save main scope group id
      setValidationErrors((prev) => ({ ...prev, scopeIds: undefined }));
    } catch (error) {
      console.error("Failed to load scope groups:", error);
    } finally {
      setLoading((prev) => ({ ...prev, scopeGroups: false }));
    }
  };

  const loadScopes = async (scopeGroupId: string) => {
    try {
      setLoading((prev) => ({ ...prev, scopes: true }));
      const scopes = await apiService.getScopes(scopeGroupId);
      setAvailableScopes(scopes);
    } catch (error) {
      console.error("Failed to load scopes:", error);
    } finally {
      setLoading((prev) => ({ ...prev, scopes: false }));
    }
  };

  const loadQuestions = async () => {
    try {
      setLoading((prev) => ({ ...prev, questions: true }));
      const allQuestions = await apiService.getQuestions(formData.scopeIds);
      // Only include questions for step 1 (Before Pricing)
      const beforePricingQuestions = Array.isArray(allQuestions)
        ? allQuestions
            .filter((q) => q.QuestionStepType === "1-Before Pricing")
            .sort((a, b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0))
        : [];
      setQuestions(beforePricingQuestions);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading((prev) => ({ ...prev, questions: false }));
    }
  };

  const validatePostalCode = async (code: string) => {
    if (code.length >= 5) {
      try {
        const result = await apiService.validatePostalCode(code);
        setPostalCodeValid(result.isValid);
        if (!result.isValid) {
          toast.error("Service not available in this area");
          setValidationErrors((prev) => ({
            ...prev,
            zipCode: "Service not available in this area",
          }));
        } else {
          setValidationErrors((prev) => ({ ...prev, zipCode: undefined }));
        }
      } catch (error) {
        setPostalCodeValid(false);
        setValidationErrors((prev) => ({
          ...prev,
          zipCode: "Unable to validate postal code",
        }));
      }
    }
  };

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return "Phone number is required";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) return "Phone number must be 10 digits";
    return undefined;
  };

  const validateRequired = (
    value: string,
    fieldName: string
  ): string | undefined => {
    if (!value || value.trim() === "") return `${fieldName} is required`;
    return undefined;
  };

  const formatPhoneNumber = (value: string): string => {
    const phoneDigits = value.replace(/\D/g, "");
    if (phoneDigits.length <= 3) return phoneDigits;
    if (phoneDigits.length <= 6)
      return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3)}`;
    return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(
      3,
      6
    )}-${phoneDigits.slice(6, 10)}`;
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));

    // Save address fields to local storage
    if (['street', 'city', 'zipCode', 'state'].includes(fieldName)) {
      const addressData = {
        street: fieldName === 'street' ? value : formData.address.street,
        city: fieldName === 'city' ? value : formData.address.city,
        zipCode: fieldName === 'zipCode' ? value : formData.address.zipCode,
        state: fieldName === 'state' ? value : (formData.address.state || "New Jersey"), // Default to New Jersey if not set
      };
      localStorage.setItem('serviceAddress', JSON.stringify(addressData));
    }

    let error: string | undefined;
    switch (fieldName) {
      case "firstName":
        error = validateRequired(value, "First name");
        break;
      case "lastName":
        error = validateRequired(value, "Last name");
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "street":
        error = validateRequired(value, "Street address");
        break;
      case "city":
        error = validateRequired(value, "City");
        break;
      case "state":
        error = validateRequired(value, "State");
        break;
      case "zipCode":
        error = validateRequired(value, "ZIP code");
        if (!error && value.length < 5)
          error = "ZIP code must be at least 5 digits";
        break;
    }

    setValidationErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Basic field validation
    errors.firstName = validateRequired(formData.firstName, "First name");
    errors.lastName = validateRequired(formData.lastName, "Last name");
    errors.email = validateEmail(formData.email);
    errors.phone = validatePhone(formData.phone);
    errors.street = validateRequired(formData.address.street, "Street address");
    errors.city = validateRequired(formData.address.city, "City");
    errors.state = validateRequired(formData.address.state, "State");
    errors.zipCode = validateRequired(formData.address.zipCode, "ZIP code");

    // Service selection validation
    if (formData.scopeIds.length === 0) {
      errors.scopeIds = "Please select at least one service";
    } else {
      // Clear service error if a service is selected
      errors.scopeIds = undefined;
    }

    // Frequency validation
    const selectedScopes = formData.scopeIds || [];
    const missingFrequencies = selectedScopes.filter((scopeId) => {
      const scope = availableScopes.find((s) => s.id === scopeId);
      return (
        scope &&
        scope.frequencies &&
        scope.frequencies.length > 0 &&
        !selectedFrequencies[scopeId]
      );
    });

    if (missingFrequencies.length > 0) {
      errors.frequencies = "Please select frequency for all services";
    } else if (selectedScopes.length > 0) {
      // Clear frequency error if all required frequencies are selected
      errors.frequencies = undefined;
    }

    // Postal code validation
    if (postalCodeValid !== true) {
      errors.zipCode =
        errors.zipCode || "Please enter a valid ZIP code in our service area";
    }

    // Required questions validation
    const requiredQuestions = questions.filter((q) => q.IsRequired);
    requiredQuestions.forEach((q) => {
      const answer = formData.answers?.[q.QuestionId];
      if (answer === undefined || answer === "" || answer === null) {
        errors[`question_${q.QuestionId}`] = "This field is required";
      }
    });

    setValidationErrors(errors);
    setTouchedFields(
      Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Return true if no errors
    return !Object.values(errors).some((error) => error !== undefined);
  };

  const handleScopeGroupSelect = (groupId: string) => {
    setSelectedScopeGroup(groupId);
    onUpdateData({ scopeIds: [], MainScopeGroupId: groupId }); // Save main scope group id
    setValidationErrors((prev) => ({ ...prev, scopeIds: undefined }));
    console.log("MainScopeGroupId set to:", groupId);
  };

  const handleScopeToggle = (scopeId: string) => {
    // For single service selection, replace the scope ID instead of adding to array
    let newScopes: string[];
    const newFrequencies = { ...selectedFrequencies };

    if (scopeId === "") {
      // If empty selection, clear all scopes
      newScopes = [];
      // Clear all frequencies
      Object.keys(newFrequencies).forEach(key => delete newFrequencies[key]);
      setValidationErrors(prev => ({
        ...prev,
        scopeIds: "Please select at least one service",
        frequencies: undefined
      }));
    } else {
      // Replace with single scope ID
      newScopes = [scopeId];
      
      // Clear previous frequencies and set default frequency if only one exists
      Object.keys(newFrequencies).forEach(key => delete newFrequencies[key]);
      const scope = availableScopes.find((s) => s.id === scopeId);
      if (scope && scope.frequencies && scope.frequencies.length === 1) {
        newFrequencies[scopeId] = scope.frequencies[0].FrequencyId;
        console.log(
          "Auto-selected frequency for scope",
          scopeId,
          ":",
          scope.frequencies[0].FrequencyId
        );
        // Clear frequency error if we auto-selected a frequency
        setValidationErrors(prev => ({
          ...prev,
          scopeIds: undefined,
          frequencies: undefined
        }));
      } else {
        // Clear only the scopeIds error since a service is selected
        setValidationErrors(prev => ({
          ...prev,
          scopeIds: undefined
        }));
      }
    }

    setSelectedFrequencies(newFrequencies);
    onUpdateData({ scopeIds: newScopes, frequencyIds: newFrequencies });
    setValidationErrors((prev) => ({
      ...prev,
      scopeIds: undefined,
      frequencies: undefined,
    }));
    console.log(
      "Selected scopeIds:",
      newScopes,
      "Selected frequencyIds:",
      newFrequencies
    );
  };

  const handleFrequencyChange = (scopeId: string, frequencyId: string) => {
    const newFrequencies = { ...selectedFrequencies, [scopeId]: frequencyId };
    setSelectedFrequencies(newFrequencies);
    onUpdateData({ frequencyIds: newFrequencies });
    
    // Clear both service and frequency validation errors since we have both selected
    setValidationErrors((prev) => ({ 
      ...prev, 
      frequencies: undefined,
      scopeIds: undefined 
    }));
    
    // Mark fields as touched
    setTouchedFields(prev => ({
      ...prev,
      frequencies: true,
      scopeIds: true
    }));
    
    console.log("Frequency selected for scope", scopeId, ":", frequencyId);
  };

  const handleAnswerChange = (questionId: number, value: any) => {
    onUpdateData({
      answers: {
        ...formData.answers,
        [questionId]: value,
      },
    });
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

    switch (question.QuestionType) {
      case "Select List":
        return (
          <div>
            <select
              className={`w-full relative px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                hasError
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}
              value={formData.answers?.[questionKey] || ""}
              onChange={(e) => handleAnswerChange(questionKey, e.target.value)}
              onBlur={() =>
                setTouchedFields((prev) => ({
                  ...prev,
                  [`question_${questionKey}`]: true,
                }))
              }
              required={question.IsRequired}
            >
              <option value="">Select an option</option>
              {question.Answers.map((answer) => (
                <option key={answer.AnswerId} value={answer.AnswerId}>
                  {answer.AnswerText}
                </option>
              ))}
            </select>
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
            <div className="space-y-3">
              {question.Answers.map((answer) => (
                <label
                  key={answer.AnswerId}
                  className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={(formData.answers?.[questionKey] || []).includes(
                      answer.AnswerId
                    )}
                    onChange={(e) => {
                      const currentValues =
                        formData.answers?.[questionKey] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, answer.AnswerId]
                        : currentValues.filter(
                            (id: number) => id !== answer.AnswerId
                          );
                      handleAnswerChange(questionKey, newValues);
                    }}
                  />
                  <span className="ml-3 text-slate-700 font-medium">
                    {answer.AnswerText}
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

      case "Whole Number":
        return (
          <div>
            <input
              type="number"
              className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                hasError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              value={formData.answers?.[questionKey] || ""}
              onChange={(e) =>
                handleAnswerChange(
                  questionKey,
                  Number.parseInt(e.target.value) || 0
                )
              }
              onBlur={() =>
                setTouchedFields((prev) => ({
                  ...prev,
                  [`question_${questionKey}`]: true,
                }))
              }
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

      case "Decimal":
        return (
          <div>
            <input
              type="number"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                hasError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              value={formData.answers?.[questionKey] || ""}
              onChange={(e) =>
                handleAnswerChange(
                  questionKey,
                  Number.parseFloat(e.target.value) || 0
                )
              }
              onBlur={() =>
                setTouchedFields((prev) => ({
                  ...prev,
                  [`question_${questionKey}`]: true,
                }))
              }
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

      case "Rich Text":
        return (
          <div>
            <textarea
              className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 resize-none ${
                hasError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              rows={4}
              value={formData.answers?.[questionKey] || ""}
              onChange={(e) => handleAnswerChange(questionKey, e.target.value)}
              onBlur={() =>
                setTouchedFields((prev) => ({
                  ...prev,
                  [`question_${questionKey}`]: true,
                }))
              }
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
        return (
          <div>
            <div className="relative">
              <input
                type="time"
                className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 cursor-pointer ${
                  hasError
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                value={formData.answers?.[questionKey] || ""}
                onChange={(e) => handleAnswerChange(questionKey, e.target.value)}
                onBlur={() =>
                  setTouchedFields((prev) => ({
                    ...prev,
                    [`question_${questionKey}`]: true,
                  }))
                }
                required={question.IsRequired}
                onClick={(e) => {
                  // Make the entire input field clickable to open time picker
                  e.currentTarget.showPicker?.();
                }}
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-3">
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
                    d="M12 8v4l3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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

      default:
        return (
          <div>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                hasError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              value={formData.answers?.[questionKey] || ""}
              onChange={(e) => handleAnswerChange(questionKey, e.target.value)}
              onBlur={() =>
                setTouchedFields((prev) => ({
                  ...prev,
                  [`question_${questionKey}`]: true,
                }))
              }
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
    if (!validateForm()) {
      toast.error("Please fix the errors below and try again");
      return;
    }

    try {
      // The API returns { IsSuccess, Message, Result: { LeadId, ... }, ... }
      const response = await apiService.createOrUpdateLead(formData);
      // Support both { leadId } and { Result: { LeadId } }
      let leadId = response.leadId;
      console.log("Response from lead creation:", response);

      if (!leadId && (response as any).Result && (response as any).Result.LeadId) {
        leadId = (response as any).Result.LeadId;
      }

      if (leadId) {
        onUpdateData({ id: String(leadId) });
        console.log("Lead created and saved with id:", leadId);
        // toast.success("Lead information saved successfully");
        onNext();
      } else {
        toast.error("Failed to save lead: No lead id returned");
        console.error("Lead creation response missing id:", response);
      }
    } catch (error) {
      console.error("Failed to save lead:", error);
      toast.error("Failed to save lead information");
    }
  };

  const isStepValid = () => {
    const basicFieldsValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address.street &&
      formData.address.city &&
      formData.address.state &&
      formData.address.zipCode &&
      formData.scopeIds.length > 0 &&
      postalCodeValid === true;

    // Check required questions
    const requiredQuestions = questions.filter((q) => q.IsRequired);
    const answeredRequiredQuestions = requiredQuestions.every((q) => {
      const answer = formData.answers?.[q.QuestionId];
      return answer !== undefined && answer !== "" && answer !== null;
    });

    // Check frequencies
    const selectedScopes = formData.scopeIds || [];
    const allFrequenciesSelected = selectedScopes.every((scopeId) => {
      const scope = availableScopes.find((s) => s.id === scopeId);
      return (
        !scope ||
        !scope.frequencies ||
        scope.frequencies.length === 0 ||
        selectedFrequencies[scopeId]
      );
    });

    // Check validation errors
    const hasValidationErrors = Object.values(validationErrors).some(
      (error) => error !== undefined
    );

    return (
      basicFieldsValid &&
      answeredRequiredQuestions &&
      allFrequenciesSelected &&
      !hasValidationErrors
    );
  };

  return (
    <div className="min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-10"
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
            Lead Information & Service Selection
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-2">
            Tell us about yourself and select the services you need to get
            started with your personalized quote
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

        {/* Service Category Selection */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5 text-zinc-800" />
            </div>
            <h2 className="text-lg font-medium text-slate-900">Select Service Category</h2>
          </div>

          {loading.scopeGroups ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 relative">
              {scopeGroups.map((group) => (
                <motion.div
                  key={group.id}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedScopeGroup === group.id
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                      : "border-slate-200 hover:border-blue-300 hover:shadow-md bg-white"
                  }`}
                  onClick={() => handleScopeGroupSelect(group.id)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedScopeGroup === group.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">{group.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{group.description}</p>
                </motion.div>
              ))}

               <select
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 border-slate-300 focus:border-blue-500"
                    value={formData.MainScopeGroupId || ""}
                    onChange={e => handleScopeGroupSelect(e.target.value)}
                  >
                    <option value="">Select a service</option>
                     {scopeGroups.map((group) => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
            </div>
          )}
        </motion.div> */}

        {/* Service Selection */}
        {selectedScopeGroup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
              </div>
              <h2 className="text-base sm:text-lg font-medium text-slate-900">
                Select Services
              </h2>
            </div>

            {loading.scopes ? (
              <div className="flex justify-center py-6 sm:py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
                {/* Service Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Choose a Service *
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 border-slate-300 focus:border-blue-500"
                    value={formData.scopeIds[0] || ""}
                    onChange={(e) => handleScopeToggle(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {availableScopes.map((scope) => (
                      <option key={scope.id} value={scope.id}>
                        {scope.name}
                      </option>
                    ))}
                  </select>
                  {validationErrors.scopeIds && touchedFields.scopeIds && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.scopeIds}
                      </p>
                    </div>
                  )}
                </div>

                {/* Frequency Dropdown for selected service */}
                {formData.scopeIds[0] &&
                  (() => {
                    const selectedScope = availableScopes.find(
                      (s) => s.id === formData.scopeIds[0]
                    );
                    if (
                      selectedScope &&
                      selectedScope.frequencies &&
                      selectedScope.frequencies.length > 0
                    ) {
                      return (
                        <div className="">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Choose Frequency *
                          </label>
                          <select
                            className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 border-slate-300 focus:border-blue-500"
                            value={
                              selectedFrequencies[formData.scopeIds[0]] || ""
                            }
                            onChange={(e) =>
                              handleFrequencyChange(
                                formData.scopeIds[0],
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select frequency</option>
                            {selectedScope.frequencies.map((frequency) => (
                              <option
                                key={frequency.FrequencyId}
                                value={frequency.FrequencyId}
                              >
                                {frequency.Name}
                              </option>
                            ))}
                          </select>
                          {validationErrors.frequencies &&
                            touchedFields.frequencies && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-700 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {validationErrors.frequencies}
                                </p>
                              </div>
                            )}
                        </div>
                      );
                    }
                    return null;
                  })()}
              </div>
            )}
          </motion.div>
        )}

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
            </div>
            <h2 className="text-base sm:text-lg font-medium text-slate-900">
              Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                First Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                    validationErrors.firstName && touchedFields.firstName
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : formData.firstName
                      ? "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={formData.firstName}
                  onChange={(e) => onUpdateData({ firstName: e.target.value })}
                  onBlur={(e) => handleFieldBlur("firstName", e.target.value)}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              {validationErrors.firstName && touchedFields.firstName && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.firstName}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Last Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                    validationErrors.lastName && touchedFields.lastName
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : formData.lastName
                      ? "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={formData.lastName}
                  onChange={(e) => onUpdateData({ lastName: e.target.value })}
                  onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
                  required
                  placeholder="Enter your last name"
                />
              </div>
              {validationErrors.lastName && touchedFields.lastName && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.lastName}
                </p>
              )}
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {/* <Mail className="h-4 w-4 mr-2 text-blue-600" /> */}
                Email *
              </label>
              <input
                type="email"
                className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                  validationErrors.email && touchedFields.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                value={formData.email}
                onChange={(e) => onUpdateData({ email: e.target.value })}
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                required
                placeholder="Enter your email address"
              />
              {validationErrors.email && touchedFields.email && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {/* <Phone className="h-4 w-4 mr-2 text-blue-600" /> */}
                Phone *
              </label>
              <input
                type="tel"
                className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                  validationErrors.phone && touchedFields.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                value={formData.phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  onUpdateData({ phone: formatted });
                }}
                onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                required
                placeholder="999-999-9999"
                maxLength={12}
              />
              {validationErrors.phone && touchedFields.phone && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.phone}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
            </div>
            <h2 className="text-base sm:text-lg font-medium text-slate-900">
              Service Address
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="relative">
                <input
                  ref={streetInputRef}
                  type="text"
                  placeholder="Street Address *"
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                    validationErrors.street && touchedFields.street
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={formData.address.street}
                  onChange={(e) =>
                    onUpdateData({
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                  onBlur={(e) => handleFieldBlur("street", e.target.value)}
                  required
                />
                {!isGoogleMapsLoaded && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <LoadingSpinner size="sm" />
                  </div>
                )}
              </div>
              {validationErrors.street && touchedFields.street && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.street}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="City *"
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                    validationErrors.city && touchedFields.city
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={formData.address.city}
                  onChange={(e) =>
                    onUpdateData({
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  onBlur={(e) => handleFieldBlur("city", e.target.value)}
                  required
                />
                {validationErrors.city && touchedFields.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.city}
                  </p>
                )}
              </div>

              <input
                type="text"
                placeholder="State *"
                className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 ${
                  validationErrors.state && touchedFields.state
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                value={formData.address.state}
                onChange={(e) =>
                  onUpdateData({
                    address: { ...formData.address, state: e.target.value },
                  })
                }
                onBlur={(e) => handleFieldBlur("state", e.target.value)}
                required
              />
              {validationErrors.state && touchedFields.state && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.state}
                </p>
              )}

              <div className="relative">
                <input
                  type="text"
                  placeholder="ZIP Code *"
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 bg-white shadow-sm transition-all duration-200 ${
                    validationErrors.zipCode && touchedFields.zipCode
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : postalCodeValid === false
                      ? "border-red-400 hover:border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={formData.address.zipCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    onUpdateData({
                      address: { ...formData.address, zipCode: value },
                    });
                    validatePostalCode(value);
                  }}
                  onBlur={(e) => handleFieldBlur("zipCode", e.target.value)}
                  required
                />
                {postalCodeValid === true && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {validationErrors.zipCode && touchedFields.zipCode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.zipCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Questions */}
        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-100 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
              </div>
              <h2 className="text-base sm:text-lg font-medium text-slate-900">
                Additional Information
              </h2>
            </div>

            {loading.questions ? (
              <div className="flex justify-center py-6 sm:py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {questions
                  .sort((a, b) => a.SortOrder - b.SortOrder)
                  .map((question) => (
                    <motion.div
                      key={question.QuestionId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      // className="bg-slate-50 border border-slate-200 p-6 rounded-xl"
                    >
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        {question.QuestionText}{" "}
                        {question.IsRequired && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      {question.HelpText && (
                        <p className="text-xs text-slate-500 mb-4 bg-blue-50 p-2 rounded-lg border border-blue-200">
                          {question.HelpText}
                        </p>
                      )}

                      {renderQuestionInput(question)}
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center sm:justify-end pt-4 sm:pt-6"
        >
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`group flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
              isStepValid()
                ? "bg-gradient-to-r from-zinc-800 to-zinc-950 text-white hover:from-zinc-950 hover:to-zinc-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Continue to Pricing
            <ChevronRight
              className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                isStepValid() ? "group-hover:translate-x-1" : ""
              }`}
            />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
