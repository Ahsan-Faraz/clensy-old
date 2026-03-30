import mongoose from "mongoose";

const MedicalCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Healthcare Services",
    },
    heroHeading: {
      type: String,
      default: "Medical & Healthcare Facility Cleaning",
    },
    heroSubheading: {
      type: String,
      default:
        "Specialized cleaning and sanitization services designed to meet the stringent requirements of healthcare environments, ensuring safety for patients and staff.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1974&auto=format&fit=crop",
    },
    heroServiceDuration: {
      type: String,
      default: "Healthcare Compliant",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicator1Number: {
      type: String,
      default: "350+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Healthcare Clients",
    },
    trustIndicator2Number: {
      type: String,
      default: "24/7",
    },
    trustIndicator2Text: {
      type: String,
      default: "Healthcare Support",
    },
    trustIndicator3Number: {
      type: String,
      default: "4.9",
    },
    trustIndicator3Text: {
      type: String,
      default: "Industry Rating",
    },
    trustIndicator4Number: {
      type: String,
      default: "100%",
    },
    trustIndicator4Text: {
      type: String,
      default: "Compliance Guarantee",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "Our Healthcare Cleaning Services",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "Specialized cleaning solutions tailored to the unique demands and strict requirements of healthcare environments.",
    },

    // Reception & Waiting Areas Section
    receptionTitle: {
      type: String,
      default: "Reception & Waiting Areas",
    },
    receptionDescription: {
      type: String,
      default:
        "Create a reassuring first impression for patients with meticulously cleaned reception and waiting areas that inspire confidence.",
    },
    receptionImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    },
    receptionFeatures: {
      type: [String],
      default: [
        "Thorough disinfection of all seating and surfaces",
        "Sanitization of high-touch areas like check-in kiosks",
        "Specialized cleaning of magazine racks and displays",
        "HEPA-filtered vacuuming of all floors and upholstery",
      ],
    },

    // Examination & Treatment Rooms Section
    examinationTitle: {
      type: String,
      default: "Examination & Treatment Rooms",
    },
    examinationDescription: {
      type: String,
      default:
        "Our specialized cleaning protocols ensure examination and treatment rooms meet the highest standards of hygiene and infection control.",
    },
    examinationImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
    },
    examinationFeatures: {
      type: [String],
      default: [
        "Terminal cleaning between patient visits",
        "Disinfection of examination tables and equipment",
        "Proper disposal of medical waste",
        "Application of hospital-grade disinfectants",
      ],
    },

    // Restrooms & Common Areas Section
    restroomsTitle: {
      type: String,
      default: "Restrooms & Common Areas",
    },
    restroomsDescription: {
      type: String,
      default:
        "Enhanced cleaning and disinfection protocols for healthcare facility restrooms and common areas to minimize cross-contamination.",
    },
    restroomsImage: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1298375809/photo/empty-luxury-modern-hospital-room.jpg?s=612x612&w=0&k=20&c=COJYNIiGvKfgiNITdE2IZmHo31tzUewK64jwuv8glgA=",
    },
    restroomsFeatures: {
      type: [String],
      default: [
        "Rigorous sanitization of all fixtures and surfaces",
        "Use of EPA-approved disinfectants effective against pathogens",
        "Regular replenishment of soap, sanitizer, and paper products",
        "Cleaning log maintenance for compliance verification",
      ],
    },

    // Why Choose Us Section
    whyChooseHeading: {
      type: String,
      default: "Why Choose Clensy for Healthcare Cleaning",
    },
    whyChooseSubheading: {
      type: String,
      default:
        "Our specialized expertise and commitment to healthcare-specific protocols set us apart in medical facility cleaning.",
    },

    // Feature 1: Healthcare Compliance
    feature1Title: {
      type: String,
      default: "Healthcare Compliance",
    },
    feature1Description: {
      type: String,
      default:
        "We adhere to all healthcare cleaning regulations, including CDC guidelines, OSHA requirements, and Joint Commission standards.",
    },
    feature1Icon: {
      type: String,
      default: "Shield",
    },

    // Feature 2: Specialized Training
    feature2Title: {
      type: String,
      default: "Specialized Training",
    },
    feature2Description: {
      type: String,
      default:
        "Our cleaning professionals undergo rigorous healthcare-specific training in infection control, bloodborne pathogens, and medical waste handling.",
    },
    feature2Icon: {
      type: String,
      default: "Heart",
    },

    // Feature 3: Advanced Technology
    feature3Title: {
      type: String,
      default: "Advanced Technology",
    },
    feature3Description: {
      type: String,
      default:
        "We employ state-of-the-art equipment including electrostatic sprayers, UV-C disinfection, and microfiber systems for superior results.",
    },
    feature3Icon: {
      type: String,
      default: "Activity",
    },

    // FAQ Section
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [
        {
          question: "Do you follow healthcare cleaning regulations?",
          answer:
            "Yes, we strictly adhere to all healthcare cleaning regulations including CDC guidelines, OSHA requirements, and Joint Commission standards. Our team is trained in infection control protocols specific to medical environments.",
        },
        {
          question: "How often should medical facilities be cleaned?",
          answer:
            "Medical facilities require daily cleaning with deep cleaning performed weekly or bi-weekly depending on the type of facility. High-traffic areas and patient rooms need more frequent attention than administrative areas.",
        },
        {
          question: "What cleaning products do you use in healthcare settings?",
          answer:
            "We use EPA-approved, hospital-grade disinfectants that are effective against healthcare-associated pathogens. All products are safe for use in patient care areas and meet stringent healthcare facility requirements.",
        },
        {
          question: "Can you accommodate after-hours cleaning schedules?",
          answer:
            "Absolutely! We understand that medical facilities operate around the clock. We offer flexible scheduling including after-hours, weekend, and holiday cleaning to minimize disruption to patient care and staff operations.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MedicalCleaning ||
  mongoose.model("MedicalCleaning", MedicalCleaningSchema);
