import mongoose from "mongoose";

const RetailCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Retail Services",
    },
    heroHeading: {
      type: String,
      default: "Retail Store & Shop Cleaning",
    },
    heroSubheading: {
      type: String,
      default:
        "Create an impeccable shopping environment that enhances customer experience and protects your merchandise with our specialized retail cleaning services.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    },
    heroServiceDuration: {
      type: String,
      default: "Retail Specialists",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicator1Number: {
      type: String,
      default: "400+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Retail Clients",
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
      default: "Customer Rating",
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
      default: "Our Retail Cleaning Services",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "We provide comprehensive cleaning solutions tailored to meet the unique needs of retail environments and shopping spaces.",
    },

    // Entrances & Display Areas Section
    entrancesTitle: {
      type: String,
      default: "Entrances & Display Areas",
    },
    entrancesDescription: {
      type: String,
      default:
        "First impressions matter. We ensure your store entrance and display areas shine to create a welcoming environment that attracts customers.",
    },
    entrancesImage: {
      type: String,
      default:
        "https://www.thimble.com/wp-content/uploads/2021/10/Retail-Store-Layout-Guide.jpg",
    },
    entrancesFeatures: {
      type: [String],
      default: [
        "Glass door and window cleaning for crystal clear visibility",
        "Dusting and cleaning of display shelves and fixtures",
        "Floor cleaning and polishing for high-traffic entryways",
        "Sanitizing of doorknobs, handles, and railings",
      ],
    },

    // Sales Floor & Merchandise Areas Section
    salesFloorTitle: {
      type: String,
      default: "Sales Floor & Merchandise Areas",
    },
    salesFloorDescription: {
      type: String,
      default:
        "Create an inviting shopping environment with meticulously cleaned sales floors that showcase your merchandise in the best light.",
    },
    salesFloorImage: {
      type: String,
      default:
        "https://cdn.prod.website-files.com/642b7859216b0f5b519de88a/642c66600054c7783cbff234_commercial.jpg",
    },
    salesFloorFeatures: {
      type: [String],
      default: [
        "Thorough floor care tailored to your flooring type",
        "Gentle dusting of merchandise shelves and product displays",
        "Sanitizing of high-touch surfaces throughout your store",
        "Cleaning and polishing of display cases and counters",
      ],
    },

    // Fitting Rooms & Customer Areas Section
    fittingRoomsTitle: {
      type: String,
      default: "Fitting Rooms & Customer Areas",
    },
    fittingRoomsDescription: {
      type: String,
      default:
        "Keep your fitting rooms and customer service areas pristine to enhance the shopping experience and encourage purchases.",
    },
    fittingRoomsImage: {
      type: String,
      default:
        "https://www.idcleaning.uk/img/pages/page_7/shutterstock_227609965.jpg",
    },
    fittingRoomsFeatures: {
      type: [String],
      default: [
        "Disinfection of fitting room surfaces and seating",
        "Mirror cleaning for smudge-free reflections",
        "Sanitization of customer service counters and points of sale",
        "Regular emptying and cleaning of fitting room waste receptacles",
      ],
    },

    // Why Choose Us Section
    whyChooseHeading: {
      type: String,
      default: "Why Choose Clensy for Your Retail Cleaning",
    },
    whyChooseSubheading: {
      type: String,
      default:
        "We understand the unique cleaning requirements of retail environments and deliver reliable, consistent service.",
    },

    // Feature 1: Flexible Scheduling
    feature1Title: {
      type: String,
      default: "Flexible Scheduling",
    },
    feature1Description: {
      type: String,
      default:
        "We work around your store hours, providing after-hours, early morning, or specialized scheduling to ensure cleaning never disrupts your business operations.",
    },
    feature1Icon: {
      type: String,
      default: "Clock",
    },

    // Feature 2: Retail Experience
    feature2Title: {
      type: String,
      default: "Retail Experience",
    },
    feature2Description: {
      type: String,
      default:
        "Our cleaning teams have specific experience with retail environments, understanding how to clean merchandise displays, fitting rooms, and customer areas with care.",
    },
    feature2Icon: {
      type: String,
      default: "Smile",
    },

    // Feature 3: Safe, Gentle Products
    feature3Title: {
      type: String,
      default: "Safe, Gentle Products",
    },
    feature3Description: {
      type: String,
      default:
        "We use retail-friendly cleaning products that effectively clean without damaging merchandise, displays, or sensitive surfaces in your store.",
    },
    feature3Icon: {
      type: String,
      default: "Sparkles",
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
          question: "Can you clean outside of retail business hours?",
          answer:
            "Yes, we offer flexible scheduling and can clean before opening or after closing to minimize disruption to your business and customers.",
        },
        {
          question: "Do you use safe cleaning products for retail environments?",
          answer:
            "We use only high-quality, eco-friendly cleaning products that are safe for both staff and customers. If you have specific preferences, let us know.",
        },
        {
          question: "Can you handle large or multi-location retail spaces?",
          answer:
            "Yes, our team is equipped to clean retail spaces of all sizes, including multi-location businesses. We can create a custom cleaning plan for your needs.",
        },
        {
          question: "What if I am not satisfied with the cleaning?",
          answer:
            "If you are not completely satisfied, contact us within 24 hours and we will return to address any concerns at no additional cost.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RetailCleaning ||
  mongoose.model("RetailCleaning", RetailCleaningSchema);
