import mongoose from "mongoose";

const SchoolCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Educational Facility Services",
    },
    heroHeading: {
      type: String,
      default: "School & Childcare Cleaning Services",
    },
    heroSubheading: {
      type: String,
      default:
        "Specialized cleaning and sanitization services designed for educational environments, ensuring a healthy, safe space for students, teachers, and staff.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2032&auto=format&fit=crop",
    },
    heroServiceDuration: {
      type: String,
      default: "Education Specialists",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicator1Number: {
      type: String,
      default: "450+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Educational Facilities",
    },
    trustIndicator2Number: {
      type: String,
      default: "24/7",
    },
    trustIndicator2Text: {
      type: String,
      default: "School Support",
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
      default: "Safety Guarantee",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "Our Educational Facility Cleaning Services",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "We provide comprehensive cleaning solutions tailored to meet the unique demands of schools, daycares, and educational environments.",
    },

    // Classrooms & Learning Spaces Section
    classroomsTitle: {
      type: String,
      default: "Classrooms & Learning Spaces",
    },
    classroomsDescription: {
      type: String,
      default:
        "Create an optimal learning environment with thoroughly sanitized classrooms, desks, and educational equipment.",
    },
    classroomsImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop",
    },
    classroomsFeatures: {
      type: [String],
      default: [
        "Desk and chair sanitization",
        "Whiteboard and smartboard cleaning",
        "Educational equipment disinfection",
        "Floor cleaning and maintenance",
        "Window and glass surface cleaning",
        "Air vent cleaning and dust removal",
      ],
    },

    // Cafeterias & Food Service Areas Section
    cafeteriasTitle: {
      type: String,
      default: "Cafeterias & Food Service Areas",
    },
    cafeteriasDescription: {
      type: String,
      default:
        "Maintain the highest hygiene standards in food service areas with specialized cleaning protocols for health and safety compliance.",
    },
    cafeteriasImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    },
    cafeteriasFeatures: {
      type: [String],
      default: [
        "Food preparation surface sanitization",
        "Kitchen equipment deep cleaning",
        "Dining table and chair disinfection",
        "Floor degreasing and sanitization",
        "Trash removal and bin sanitization",
        "Health code compliance cleaning",
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
        "Ensure student and staff health with thorough sanitization of high-traffic areas and restroom facilities.",
    },
    restroomsImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop",
    },
    restroomsFeatures: {
      type: [String],
      default: [
        "Toilet and urinal deep cleaning",
        "Sink and faucet sanitization",
        "Mirror and fixture cleaning",
        "Floor mopping and disinfection",
        "Supply restocking and maintenance",
        "Hallway and corridor cleaning",
      ],
    },

    // Why Choose Us Section
    whyChooseHeading: {
      type: String,
      default: "Why Choose Our School Cleaning Services",
    },
    whyChooseSubheading: {
      type: String,
      default:
        "We understand the unique challenges of maintaining educational facilities and provide specialized solutions for a safe learning environment.",
    },

    // Feature 1: Child-Safe Products
    feature1Title: {
      type: String,
      default: "Child-Safe Products",
    },
    feature1Description: {
      type: String,
      default:
        "We use only non-toxic, eco-friendly cleaning products that are safe for children and meet all educational facility standards.",
    },
    feature1Icon: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
    },

    // Feature 2: Flexible Scheduling
    feature2Title: {
      type: String,
      default: "Flexible Scheduling",
    },
    feature2Description: {
      type: String,
      default:
        "Our cleaning services work around your school schedule, including after-hours, weekends, and holiday cleaning options.",
    },
    feature2Icon: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2784/2784459.png",
    },

    // Feature 3: Health-Focused Approach
    feature3Title: {
      type: String,
      default: "Health-Focused Approach",
    },
    feature3Description: {
      type: String,
      default:
        "Our specialized protocols reduce the spread of germs and create a healthier environment for students and staff.",
    },
    feature3Icon: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
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
          question: "Do you use child-safe cleaning products?",
          answer:
            "Yes, absolutely. We exclusively use non-toxic, eco-friendly cleaning products that are specifically approved for educational facilities. All our products are safe for children and meet or exceed school district safety standards.",
        },
        {
          question: "Can you clean during school hours?",
          answer:
            "We typically recommend after-hours cleaning to minimize disruption to classes and ensure thorough cleaning. However, we can work during school hours for emergency cleanings or specific areas as needed, following all safety protocols.",
        },
        {
          question: "How do you handle sensitive areas like computer labs and libraries?",
          answer:
            "We have specialized protocols for technology-rich environments. Our team uses appropriate cleaning methods for electronic equipment, delicate materials, and valuable resources while ensuring thorough sanitization of these important learning spaces.",
        },
        {
          question: "What's included in your school cleaning checklist?",
          answer:
            "Our comprehensive checklist includes classroom sanitization, restroom deep cleaning, cafeteria hygiene protocols, hallway maintenance, gym and sports facility cleaning, office areas, and specialized cleaning for labs and libraries. We customize our checklist based on your facility's specific needs.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SchoolCleaning ||
  mongoose.model("SchoolCleaning", SchoolCleaningSchema);
