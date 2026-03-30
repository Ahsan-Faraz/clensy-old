import mongoose from "mongoose";

const GymCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Fitness Facility Services",
    },
    heroHeading: {
      type: String,
      default: "Gym & Fitness Center Cleaning Services",
    },
    heroSubheading: {
      type: String,
      default:
        "Specialized cleaning and sanitization services designed for fitness environments, ensuring a healthy, hygienic space for members and staff alike.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
    },
    heroServiceDuration: {
      type: String,
      default: "Fitness Specialists",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicator1Number: {
      type: String,
      default: "300+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Fitness Clients",
    },
    trustIndicator2Number: {
      type: String,
      default: "24/7",
    },
    trustIndicator2Text: {
      type: String,
      default: "Facility Support",
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
      default: "Hygiene Guarantee",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "Our Fitness Facility Cleaning Services",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "We provide comprehensive cleaning solutions tailored to meet the unique demands of gyms and fitness centers.",
    },

    // Equipment & Workout Areas Section
    equipmentTitle: {
      type: String,
      default: "Equipment & Workout Areas",
    },
    equipmentDescription: {
      type: String,
      default:
        "Proper cleaning and sanitization of fitness equipment is essential for member health and safety. Our specialized protocols ensure every machine and surface is thoroughly disinfected.",
    },
    equipmentImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop",
    },
    equipmentFeatures: {
      type: [String],
      default: [
        "Disinfection of all equipment touchpoints and surfaces",
        "Cleaning of weight benches, racks, and free weight areas",
        "Sanitization of cardio machines and electronics",
        "Floor care specifically designed for workout areas",
      ],
    },

    // Locker Rooms & Shower Facilities Section
    lockerRoomsTitle: {
      type: String,
      default: "Locker Rooms & Shower Facilities",
    },
    lockerRoomsDescription: {
      type: String,
      default:
        "Locker rooms and showers require meticulous attention to prevent the spread of bacteria and fungi. Our deep cleaning protocols ensure these high-risk areas stay hygienic.",
    },
    lockerRoomsImage: {
      type: String,
      default:
        "https://www.kiilto.com/wp-content/uploads/2023/10/kiilto-wetroom-hygiene-concept-hygiene-in-locker-rooms-1300-x-650-px-1.jpg",
    },
    lockerRoomsFeatures: {
      type: [String],
      default: [
        "Deep cleaning of shower stalls and bathroom fixtures",
        "Sanitization of benches, lockers, and changing areas",
        "Treatment of floors with anti-fungal and anti-bacterial solutions",
        "Regular replenishment of soap and paper products",
      ],
    },

    // Studio & Class Spaces Section
    studioTitle: {
      type: String,
      default: "Studio & Class Spaces",
    },
    studioDescription: {
      type: String,
      default:
        "Group exercise areas need special attention between classes to maintain hygiene and create a welcoming environment for the next session.",
    },
    studioImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1770&auto=format&fit=crop",
    },
    studioFeatures: {
      type: [String],
      default: [
        "Cleaning and disinfection of studio floors and mirrors",
        "Sanitization of yoga mats, blocks, and other equipment",
        "Air purification and ventilation system maintenance",
        "Specialized floor treatments for dance and exercise rooms",
      ],
    },

    // Why Choose Us Section
    whyChooseHeading: {
      type: String,
      default: "Why Choose Clensy for Your Fitness Facility",
    },
    whyChooseSubheading: {
      type: String,
      default:
        "We understand the unique cleaning requirements of gym environments and deliver specialized solutions that promote health and hygiene.",
    },

    // Feature 1: Specialized Sanitization
    feature1Title: {
      type: String,
      default: "Specialized Sanitization",
    },
    feature1Description: {
      type: String,
      default:
        "We use hospital-grade disinfectants and antimicrobial treatments specifically designed to eliminate bacteria, viruses, and fungi common in fitness environments.",
    },
    feature1Icon: {
      type: String,
      default: "Shield",
    },

    // Feature 2: 24/7 Flexibility
    feature2Title: {
      type: String,
      default: "24/7 Flexibility",
    },
    feature2Description: {
      type: String,
      default:
        "We adapt to your facility's schedule, offering cleaning during off-peak hours, overnight, or during temporary closures to minimize disruption to your members.",
    },
    feature2Icon: {
      type: String,
      default: "Clock",
    },

    // Feature 3: Health-Focused Approach
    feature3Title: {
      type: String,
      default: "Health-Focused Approach",
    },
    feature3Description: {
      type: String,
      default:
        "Our cleaning protocols are designed with member health in mind, targeting high-touch surfaces and using eco-friendly products that are effective yet safe.",
    },
    feature3Icon: {
      type: String,
      default: "Heart",
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
          question: "How often should a gym be professionally cleaned?",
          answer:
            "We recommend daily cleaning for high-traffic areas like locker rooms and equipment, with deep cleaning performed weekly. During peak seasons or flu outbreaks, we can increase frequency to ensure optimal hygiene standards.",
        },
        {
          question: "What cleaning products do you use in fitness environments?",
          answer:
            "We use EPA-approved, hospital-grade disinfectants that are effective against bacteria, viruses, and fungi while being safe for gym equipment and member health. All products are specifically chosen for fitness facility environments.",
        },
        {
          question: "Can you clean around our operating hours?",
          answer:
            "Absolutely! We understand gyms operate on extended hours. We offer flexible scheduling including early morning, late evening, overnight, and weekend cleaning to minimize disruption to your members and operations.",
        },
        {
          question: "Do you provide specialized equipment cleaning?",
          answer:
            "Yes, we provide thorough cleaning and sanitization of all types of fitness equipment including cardio machines, weight equipment, yoga props, and specialized studio equipment. Our team is trained on proper cleaning protocols for different equipment types.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GymCleaning ||
  mongoose.model("GymCleaning", GymCleaningSchema);
