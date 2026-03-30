import mongoose from "mongoose";

const OfficeCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Commercial Services",
    },
    heroHeading: {
      type: String,
      default: "Professional Office & Corporate Cleaning",
    },
    heroSubheading: {
      type: String,
      default:
        "Create a pristine work environment that boosts productivity and makes a lasting impression on clients and employees alike with our professional office cleaning services.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop",
    },
    heroServiceDuration: {
      type: String,
      default: "Tailored for Businesses",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicator1Number: {
      type: String,
      default: "500+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Corporate Clients",
    },
    trustIndicator2Number: {
      type: String,
      default: "24/7",
    },
    trustIndicator2Text: {
      type: String,
      default: "Business Support",
    },
    trustIndicator3Number: {
      type: String,
      default: "4.9",
    },
    trustIndicator3Text: {
      type: String,
      default: "Business Rating",
    },
    trustIndicator4Number: {
      type: String,
      default: "100%",
    },
    trustIndicator4Text: {
      type: String,
      default: "Satisfaction Guarantee",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "Our Office Cleaning Services",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "We provide comprehensive cleaning solutions tailored to meet the unique needs of offices and corporate environments.",
    },

    // Reception & Common Areas Section
    receptionTitle: {
      type: String,
      default: "Reception & Common Areas",
    },
    receptionDescription: {
      type: String,
      default:
        "First impressions matter. Our team ensures your reception areas and common spaces are immaculate, creating a welcoming environment for clients and staff.",
    },
    receptionImage: {
      type: String,
      default:
        "https://www.swipedon.com/hubfs/reception-are-ideas-blog-webres.jpg",
    },
    receptionFeatures: {
      type: [String],
      default: [
        "Dusting and polishing of reception desks and furniture",
        "Vacuuming and spot cleaning of carpets and mats",
        "Glass cleaning of entrance doors and partitions",
        "Sanitizing of high-touch surfaces and fixtures",
      ],
    },

    // Workstations & Office Areas Section
    workstationsTitle: {
      type: String,
      default: "Workstations & Office Areas",
    },
    workstationsDescription: {
      type: String,
      default:
        "Create a productive environment with meticulously cleaned workspaces that boost employee morale and efficiency.",
    },
    workstationsImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1470&auto=format&fit=crop",
    },
    workstationsFeatures: {
      type: [String],
      default: [
        "Dusting and wiping of desks, monitors, and equipment",
        "Sanitizing of phones, keyboards, and office supplies",
        "Emptying and cleaning of waste receptacles",
        "Detailed cleaning of desk chairs and furniture",
      ],
    },

    // Meeting & Conference Rooms Section
    meetingRoomsTitle: {
      type: String,
      default: "Meeting & Conference Rooms",
    },
    meetingRoomsDescription: {
      type: String,
      default:
        "Ensure your meeting spaces are always presentation-ready with our detailed cleaning services designed for collaborative areas.",
    },
    meetingRoomsImage: {
      type: String,
      default:
        "https://www.hommage-hotels.com/fileadmin/user_upload/Header_Veranstaltungen_K%C3%96_Desktopansicht___2_.png",
    },
    meetingRoomsFeatures: {
      type: [String],
      default: [
        "Cleaning and polishing of conference tables and furniture",
        "Dusting of projectors, screens, and AV equipment",
        "Sanitizing of whiteboards and shared meeting tools",
        "Vacuuming and spot treatment of carpets and flooring",
      ],
    },

    // Why Choose Us Section
    whyChooseHeading: {
      type: String,
      default: "Why Choose Clensy for Your Office Cleaning",
    },
    whyChooseSubheading: {
      type: String,
      default:
        "We understand the unique cleaning requirements of professional work environments and deliver reliable, consistent service.",
    },

    // Feature 1: Trained Professionals
    feature1Title: {
      type: String,
      default: "Trained Professionals",
    },
    feature1Description: {
      type: String,
      default:
        "Our cleaning team consists of vetted, background-checked professionals with specific training in commercial cleaning protocols.",
    },
    feature1Icon: {
      type: String,
      default: "Users",
    },

    // Feature 2: Flexible Scheduling
    feature2Title: {
      type: String,
      default: "Flexible Scheduling",
    },
    feature2Description: {
      type: String,
      default:
        "We work around your business hours, providing after-hours, early morning, or weekend services to minimize disruption to your operations.",
    },
    feature2Icon: {
      type: String,
      default: "Clock",
    },

    // Feature 3: Eco-Friendly Practices
    feature3Title: {
      type: String,
      default: "Eco-Friendly Practices",
    },
    feature3Description: {
      type: String,
      default:
        "We use environmentally responsible cleaning products and practices that are safe for your employees and better for the planet.",
    },
    feature3Icon: {
      type: String,
      default: "Sparkles",
    },

    updatedAt: {
      type: Date,
      default: Date.now,
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
          question: "Do I need to be present during the office cleaning?",
          answer:
            "No, you do not need to be present. Many clients provide access instructions so we can clean outside of business hours. Our team is fully vetted and insured for your peace of mind.",
        },
        {
          question: "Can you accommodate special cleaning requests for our office?",
          answer:
            "Absolutely! We tailor our cleaning services to your office's unique needs. Please let us know any special requirements or areas of focus when booking.",
        },
        {
          question: "What cleaning products do you use in offices?",
          answer:
            "We use high-quality, eco-friendly cleaning products that are safe for office environments. If you have specific product preferences, we are happy to accommodate them.",
        },
        {
          question: "What if we are not satisfied with the cleaning?",
          answer:
            "Your satisfaction is our priority. If any area does not meet your expectations, contact us within 24 hours and we will return to address the issue at no extra cost.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.OfficeCleaning ||
  mongoose.model("OfficeCleaning", OfficeCleaningSchema);
