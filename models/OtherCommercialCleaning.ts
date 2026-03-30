import mongoose from "mongoose";

const OtherCommercialCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Commercial Services",
    },
    heroHeading: {
      type: String,
      default: "Specialized Commercial Cleaning Services",
    },
    heroSubheading: {
      type: String,
      default:
        "From bustling restaurants to sacred worship spaces, every specialized venue deserves exceptional care. Our customized cleaning solutions are crafted specifically for your unique commercial environment.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://5.imimg.com/data5/SELLER/Default/2021/1/GS/UV/BZ/207102/commercial-cleaning-services.jpg",
    },
    heroServiceDuration: {
      type: String,
      default: "Industry Specialists",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicator1Number: {
      type: String,
      default: "600+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Commercial Clients",
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
      default: "Quality Guarantee",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "Our Specialized Commercial Cleaning Services",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "We provide comprehensive cleaning solutions tailored to meet the unique demands of various commercial environments.",
    },

    // Restaurants & Food Service Section
    restaurantsTitle: {
      type: String,
      default: "Restaurants & Food Service",
    },
    restaurantsDescription: {
      type: String,
      default:
        "Maintain the highest standards of cleanliness and hygiene in food service environments with our specialized restaurant cleaning services.",
    },
    restaurantsImage: {
      type: String,
      default:
        "https://www.vip-cleaning-london.com/wp-content/uploads/2024/05/restaurant-cleaning-services-london.jpg",
    },
    restaurantsFeatures: {
      type: [String],
      default: [
        "Kitchen deep cleaning and sanitization",
        "Dining area and front-of-house cleaning",
        "Restroom sanitation and maintenance",
        "Compliance with food safety regulations",
      ],
    },

    // Warehouses & Industrial Spaces Section
    warehousesTitle: {
      type: String,
      default: "Warehouses & Industrial Spaces",
    },
    warehousesDescription: {
      type: String,
      default:
        "Keep your industrial facilities clean, safe, and efficient with our specialized warehouse and industrial cleaning services.",
    },
    warehousesImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    },
    warehousesFeatures: {
      type: [String],
      default: [
        "Large-area floor cleaning with industrial equipment",
        "Dust control and air quality maintenance",
        "Cleaning of machinery areas and equipment exteriors",
        "Staff facilities and break room maintenance",
      ],
    },

    // Places of Worship Section
    worshipTitle: {
      type: String,
      default: "Places of Worship",
    },
    worshipDescription: {
      type: String,
      default:
        "Provide a clean, welcoming environment for worship with our respectful, thorough church and religious facility cleaning services.",
    },
    worshipImage: {
      type: String,
      default:
        "https://cm.cleanmaster.ie/wp-content/uploads/2023/07/20220103-quiapo-church-aa.webp",
    },
    worshipFeatures: {
      type: [String],
      default: [
        "Sanctuary and worship area cleaning",
        "Community rooms and fellowship halls",
        "Offices and administrative areas",
        "Event cleanup and special service preparation",
      ],
    },

    // Why Choose Us Section
    whyChooseHeading: {
      type: String,
      default: "Why Choose Clensy for Your Specialized Space",
    },
    whyChooseSubheading: {
      type: String,
      default:
        "We understand the unique cleaning requirements of different commercial environments and deliver tailored solutions that meet industry-specific needs.",
    },

    // Feature 1: Industry Expertise
    feature1Title: {
      type: String,
      default: "Industry Expertise",
    },
    feature1Description: {
      type: String,
      default:
        "Our cleaning teams receive specialized training for different commercial environments, understanding the unique requirements of each industry.",
    },
    feature1Icon: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    // Feature 2: Custom Scheduling
    feature2Title: {
      type: String,
      default: "Custom Scheduling",
    },
    feature2Description: {
      type: String,
      default:
        "We work around your business hours and operational needs, providing cleaning services at times that minimize disruption to your activities.",
    },
    feature2Icon: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2784/2784459.png",
    },

    // Feature 3: Value-Focused Solutions
    feature3Title: {
      type: String,
      default: "Value-Focused Solutions",
    },
    feature3Description: {
      type: String,
      default:
        "Our cleaning programs are designed to deliver the highest standards of cleanliness while respecting your budget constraints and business priorities.",
    },
    feature3Icon: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },

    // Tailored Cleaning Plans & Pricing Section
    pricingHeading: {
      type: String,
      default: "Tailored Cleaning Plans & Pricing",
    },
    pricingSubheading: {
      type: String,
      default:
        "We understand that each commercial space has unique requirements. Our flexible packages are designed to provide exactly what your business needs.",
    },
    pricingPlans: {
      type: [
        {
          planName: { type: String, required: true },
          planSubtitle: { type: String, required: true },
          planPrice: { type: String, required: true },
          planPriceUnit: { type: String, required: true },
          planFeatures: { type: [String], required: true },
          planButtonText: { type: String, required: true },
          planButtonLink: { type: String, required: true },
          isPopular: { type: Boolean, default: false },
          planColor: { type: String, default: "blue-600" },
        },
      ],
      default: [
        {
          planName: "Essential Clean",
          planSubtitle: "For smaller businesses",
          planPrice: "Custom",
          planPriceUnit: "/ visit",
          planFeatures: [
            "Basic area cleaning & sanitization",
            "Restroom maintenance",
            "Trash removal & replacement",
            "High-touch surface disinfection",
          ],
          planButtonText: "Get Quote",
          planButtonLink: "/contact",
          isPopular: false,
          planColor: "blue-600",
        },
        {
          planName: "Professional Clean",
          planSubtitle: "For most businesses",
          planPrice: "Custom",
          planPriceUnit: "/ visit",
          planFeatures: [
            "All Essential Clean services",
            "Deep floor cleaning & treatment",
            "Window & glass cleaning",
            "Dusting of high & hard-to-reach areas",
            "Industry-specific sanitization",
          ],
          planButtonText: "Get Quote",
          planButtonLink: "/contact",
          isPopular: true,
          planColor: "blue-700",
        },
        {
          planName: "Premium Clean",
          planSubtitle: "For specialized facilities",
          planPrice: "Custom",
          planPriceUnit: "/ visit",
          planFeatures: [
            "All Professional Clean services",
            "Advanced equipment sanitization",
            "Specialized surface treatments",
            "Dedicated account manager",
            "24/7 emergency cleaning response",
          ],
          planButtonText: "Get Quote",
          planButtonLink: "/contact",
          isPopular: false,
          planColor: "blue-600",
        },
      ],
    },
    pricingCustomSectionHeading: {
      type: String,
      default: "Need More Flexibility?",
    },
    pricingCustomSectionDescription: {
      type: String,
      default:
        "We understand that every business has unique requirements. Contact us for a completely customized cleaning plan tailored to your specific needs, budget, and schedule.",
    },
    pricingCustomButton1Text: {
      type: String,
      default: "Contact for Custom Quote",
    },
    pricingCustomButton1Link: {
      type: String,
      default: "/contact",
    },
    pricingCustomButton2Text: {
      type: String,
      default: "Call (800) 555-1234",
    },
    pricingCustomButton2Link: {
      type: String,
      default: "/tel:+18005551234",
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
          question: "What types of commercial spaces do you clean?",
          answer:
            "We provide specialized cleaning for a wide variety of commercial environments including restaurants and food service facilities, warehouses and industrial spaces, places of worship, automotive dealerships, manufacturing facilities, banks, law offices, and other unique commercial venues. Each space receives customized cleaning protocols suited to its specific needs.",
        },
        {
          question: "Do you follow industry-specific cleaning standards?",
          answer:
            "Absolutely! We tailor our cleaning procedures to meet the specific regulatory requirements of each industry. For restaurants, we follow food safety protocols; for industrial spaces, we adhere to safety standards; and for places of worship, we use respectful, gentle cleaning methods appropriate for sacred spaces.",
        },
        {
          question: "Can you work around our business hours?",
          answer:
            "Yes, we understand that every business has unique operational schedules. We offer flexible scheduling including after-hours, weekend, and holiday cleaning to ensure minimal disruption to your business operations. We'll work with you to find the perfect cleaning schedule.",
        },
        {
          question: "How do you handle specialized equipment or delicate items?",
          answer:
            "Our team is trained to work around and carefully clean specialized equipment, delicate items, and valuable assets. We use appropriate cleaning methods and products for different surfaces and materials, and we can coordinate with your team for specific handling requirements or restricted areas.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.OtherCommercialCleaning ||
  mongoose.model("OtherCommercialCleaning", OtherCommercialCleaningSchema);
