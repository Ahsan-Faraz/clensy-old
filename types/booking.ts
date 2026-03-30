export interface ApiToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    expires_at: number;
  }
  
  export interface ScopeGroup {
    id: string;
    name: string;
    description: string;
  }
  
export interface Frequency {
  FrequencyId: string;
  Name: string;
}

export interface ServiceScope {
  id: string;
  name: string;
  description: string;
  scopeGroupId: string;
  frequencies?: Frequency[];
}
  
  export interface PostalCode {
    code: string;
    isValid: boolean;
    serviceArea: string;
  }
  
  export interface QuestionAnswer {
    AnswerId: number;
    AnswerText: string;
    Icon: string | null;
    Color: string | null;
    HelpText: string | null;
    SortOrder: number;
  }
  
  export interface Question {
    ScopeId: number;
    QuestionId: number;
    IsRequired: boolean;
    QuestionText: string;
    Answers: QuestionAnswer[];
    HelpText: string | null;
    Icon: string | null;
    Color: string | null;
    QuestionStepType: string;
    QuestionType: string;
    TextValue: string | null;
    PricingAdjustmentDescription: string;
    SortOrder: number;
  }
  
export interface Lead {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  scopeIds: string[];
  frequencyIds?: Record<string, string>; // key: scopeId, value: frequencyId
  MainScopeGroupId?: string; // The selected main scope group id (Clensy Service ID)
  answers: Record<string, any>;
  stepOneQuestions?: import("./booking").Question[]; // Store all questions from StepOne for use in StepTwo
  CustomerTagIds?: string[];
  HomeServiceTagIds?: string[];
}
  
  export interface RateModification {
    id: string;
    name: string;
    price: number;
    type: 'addon' | 'discount';
  }
  
  export interface PriceCalculation {
  basePrice: number
  modifications: number
  total: number
  firstJobCost?: number
  recurringCost?: number
  totalHours?: number
  frequencyName?: string
  breakdown: Array<{
    item: string
    amount: number
  }>
  rateModifications?: Array<{
    Quantity: number
    RateModificationId: number
    IsRecurring: boolean
    Name: string
    CalculatedCost: number
    CalculatedHours: number
  }>
}
  
export interface Quote {
  id?: string;
  leadId: string;
  priceCalculation: PriceCalculation;
  validUntil: string;
  quoteId?: string; // MaidCentral QuoteId for further use
}
  
  export interface AvailabilitySlot {
    date: string;
    timeSlots: string[];
  }
  
  export interface BillingTerm {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
  }
  
export interface BookingData {
  lead: Lead
  quote?: Quote
  address?: AddressData
  selectedDate?: string
  selectedTime?: string
  billingTermId?: string
  paymentMethod?: string
  selectedModifications?: import("./rateModifications").SelectedModification[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

  export interface AddressData {
  homeAddress1: string
  homeAddress2: string
  homeCity: string
  homeRegion: string
  homePostalCode: string
  billingAddress1: string
  billingAddress2: string
  billingCity: string
  billingRegion: string
  billingPostalCode: string
  sameBillingAddress: boolean
}

