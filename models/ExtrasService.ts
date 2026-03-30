import mongoose from "mongoose";

const ExtrasServiceSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Premium Add-On Services",
    },
    heroHeading: {
      type: String,
      default: "Extra Cleaning Services On Demand",
    },
    heroSubheading: {
      type: String,
      default:
        "Enhance your regular cleaning experience with our specialized add-on services. From window cleaning to oven scrubbing, customize your cleaning package to address your specific needs.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/037/280/967/non_2x/ai-generated-minimalist-vivid-advertisment-spring-cleaning-background-with-copy-space-free-photo.jpeg",
    },
    heroServiceDuration: {
      type: String,
      default: "Customizable Services",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // Trust Indicators Section
    trustIndicatorsHeading: {
      type: String,
      default: "Why Choose Our Extra Services",
    },
    trustIndicator1Number: {
      type: String,
      default: "8+",
    },
    trustIndicator1Text: {
      type: String,
      default: "Extra Services",
    },
    trustIndicator2Number: {
      type: String,
      default: "100%",
    },
    trustIndicator2Text: {
      type: String,
      default: "Customizable",
    },
    trustIndicator3Number: {
      type: String,
      default: "5.0",
    },
    trustIndicator3Text: {
      type: String,
      default: "Satisfaction Rating",
    },
    trustIndicator4Number: {
      type: String,
      default: "1000+",
    },
    trustIndicator4Text: {
      type: String,
      default: "Extra Services Completed",
    },

    // Premium Extra Services Section
    extrasHeading: {
      type: String,
      default: "Our Premium Extra Services",
    },
    extrasSubheading: {
      type: String,
      default:
        "Customize your cleaning experience with these specialized add-on services, designed to address specific cleaning needs beyond our standard service packages.",
    },
    premiumExtraServices: {
      type: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          description: { type: String, required: true },
          image: { type: String, required: true },
          icon: { type: String, required: true },
          features: { type: [String], required: true },
        },
      ],
      default: [
        {
          id: "windows",
          name: "Window Cleaning",
          description: "Crystal clear windows inside and out",
          image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845184/image74_pnropc.png",
          icon: "Sparkles",
          features: [
            "Interior and exterior window cleaning",
            "Screen cleaning and frame wiping",
            "Streak-free finish",
            "Sill and track cleaning",
          ],
        },
        {
          id: "fridge",
          name: "Refrigerator Cleaning",
          description: "Thorough cleaning and sanitizing of refrigerators",
          image: "https://www.tasteofhome.com/wp-content/uploads/2023/01/GettyImages-484299846.jpg",
          icon: "Plus",
          features: [
            "Empty and clean all shelves and drawers",
            "Sanitize interior surfaces",
            "Clean exterior and handles",
            "Clean under and behind refrigerator when accessible",
          ],
        },
        {
          id: "oven",
          name: "Oven Cleaning",
          description: "Deep cleaning for ovens and ranges",
          image: "https://cdn.prod.website-files.com/6397d1f7c4e0e51d3bd5a80f/650a589d1e631adc7e916b04_Regular%20cleanings.webp",
          icon: "Plus",
          features: [
            "Removal of built-up grease and carbon",
            "Cleaning of racks, trays, and knobs",
            "Hood and filter cleaning",
            "Full sanitization of interior and exterior",
          ],
        },
        {
          id: "cabinets",
          name: "Cabinet Cleaning",
          description: "Interior and exterior cabinet cleaning",
          image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845302/shutterstock_1806194872_1_kszrsn.jpg",
          icon: "Plus",
          features: [
            "Empty and clean interior shelves",
            "Degrease and polish exteriors",
            "Clean handles and hardware",
            "Reorganize contents as desired",
          ],
        },
        {
          id: "organization",
          name: "Organization Service",
          description: "Professional organization of your spaces",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1470&auto=format&fit=crop",
          icon: "FolderOpen",
          features: [
            "Declutter and organize rooms",
            "Sort and categorize belongings",
            "Storage solution recommendations",
            "Labeling and maintenance tips",
          ],
        },
        {
          id: "laundry",
          name: "Laundry Service",
          description: "Complete laundry washing and folding",
          image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845558/shutterstock_2497352097_1_xavz0c.jpg",
          icon: "Shirt",
          features: [
            "Wash, dry, and fold clothes",
            "Separate colors and delicates",
            "Stain treatment when possible",
            "Organize and put away clean laundry",
          ],
        },
        {
          id: "wet-wipe-blinds",
          name: "Wet Wipe Blinds",
          description: "Deep cleaning of blinds with wet wiping",
          image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845646/shutterstock_2458948647_tx9wra.jpg",
          icon: "Droplets",
          features: [
            "Individual slat wet wiping",
            "Remove dust and grime buildup",
            "Sanitize blind surfaces",
            "Clean cords and hardware",
          ],
        },
        {
          id: "wash-dishes",
          name: "Wash Dishes",
          description: "Complete dish washing and kitchen cleanup",
          image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845709/shutterstock_2470888323_m4hl14.jpg",
          icon: "Utensils",
          features: [
            "Wash all dirty dishes and utensils",
            "Clean pots, pans, and cookware",
            "Dry and put away dishes",
            "Clean and sanitize sink area",
          ],
        },
      ],
    },

    // How To Add Extra Services Section
    howItWorksHeading: {
      type: String,
      default: "How To Add Extra Services",
    },
    howItWorksSubheading: {
      type: String,
      default:
        "Adding extra services to your cleaning package is simple and flexible.",
    },
    howToAddExtraServicesSteps: {
      type: [
        {
          stepNumber: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          badge: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
      default: [
        {
          stepNumber: 1,
          title: "Browse Available Extras",
          description:
            "Open our app or website and browse through our selection of premium add-on services that can be added to any cleaning appointment.",
          badge: "8+ specialized extra services available",
          icon: "Sparkles",
        },
        {
          stepNumber: 2,
          title: "Select Your Extras",
          description:
            "Simply tap to add the services you want. You can add multiple extras to customize your cleaning experience exactly to your needs.",
          badge: "Mix and match any combination of services",
          icon: "Check",
        },
        {
          stepNumber: 3,
          title: "Confirm and Schedule",
          description:
            "Review your selections, proceed to schedule your appointment, and our specialized team will take care of everything during your service.",
          badge: "Same-day and next-day scheduling available",
          icon: "Calendar",
        },
      ],
    },

    // Extras Pricing Section
    pricingHeading: {
      type: String,
      default: "Extras Pricing",
    },
    pricingSubheading: {
      type: String,
      default: "Transparent pricing for our most popular extra services.",
    },
    extrasPricing: {
      type: [
        {
          serviceId: { type: String, required: true },
          serviceName: { type: String, required: true },
          price: { type: String, required: true },
          priceUnit: { type: String, required: true },
          icon: { type: String, required: true },
          features: { type: [String], required: true },
        },
      ],
      default: [
        {
          serviceId: "windows",
          serviceName: "Window Cleaning",
          price: "$5",
          priceUnit: "per window",
          icon: "Sparkles",
          features: [
            "Interior glass and frame",
            "Window sill cleaning",
            "Streak-free finish",
          ],
        },
        {
          serviceId: "fridge",
          serviceName: "Refrigerator Cleaning",
          price: "$35",
          priceUnit: "per service",
          icon: "Plus",
          features: [
            "Complete emptying and organizing",
            "Shelf and drawer cleaning",
            "Interior and exterior wiping",
          ],
        },
        {
          serviceId: "oven",
          serviceName: "Oven Cleaning",
          price: "$35",
          priceUnit: "per service",
          icon: "Plus",
          features: [
            "Deep grease removal",
            "Rack and tray cleaning",
            "Interior and door cleaning",
          ],
        },
        {
          serviceId: "cabinets",
          serviceName: "Cabinet Cleaning",
          price: "$60",
          priceUnit: "per service",
          icon: "Plus",
          features: [
            "Interior and exterior cleaning",
            "Door and handle sanitizing",
            "Shelf organization",
          ],
        },
        {
          serviceId: "organization",
          serviceName: "Organization Service",
          price: "$60",
          priceUnit: "per service",
          icon: "FolderOpen",
          features: [
            "Declutter and organize rooms",
            "Sort and categorize belongings",
            "Storage solution recommendations",
          ],
        },
        {
          serviceId: "laundry",
          serviceName: "Laundry Service",
          price: "$20",
          priceUnit: "per service",
          icon: "Shirt",
          features: [
            "Wash, dry, and fold clothes",
            "Separate colors and delicates",
            "Organize and put away laundry",
          ],
        },
        {
          serviceId: "wet-wipe-blinds",
          serviceName: "Wet Wipe Blinds",
          price: "$5",
          priceUnit: "per blind",
          icon: "Droplets",
          features: [
            "Individual slat wet wiping",
            "Remove dust and grime buildup",
            "Clean cords and hardware",
          ],
        },
        {
          serviceId: "wash-dishes",
          serviceName: "Wash Dishes",
          price: "$20",
          priceUnit: "per service",
          icon: "Utensils",
          features: [
            "Wash all dirty dishes and utensils",
            "Clean pots, pans, and cookware",
            "Dry and put away dishes",
          ],
        },
      ],
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
          question: "Can I add extra services to my regular cleaning?",
          answer:
            "Absolutely! Extra services are designed to complement your regular cleaning. You can add any combination of our extra services when booking your appointment or even request them during a scheduled cleaning.",
        },
        {
          question: "How much extra time do these services add?",
          answer:
            "Extra services typically add 30 minutes to 2 hours depending on what you select. Window cleaning and organization services tend to take longer, while simpler additions like washing dishes or cleaning the fridge are quicker.",
        },
        {
          question: "Do you bring all the supplies for extra services?",
          answer:
            "Yes, we bring all professional-grade supplies and equipment needed for our extra services. This includes specialized window cleaning solutions, organization containers, and commercial-grade cleaning products.",
        },
        {
          question: "Can I request extra services on short notice?",
          answer:
            "While we recommend booking extra services in advance for the best scheduling, we can often accommodate same-day requests depending on availability and the complexity of the service requested.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const ExtrasService =
  mongoose.models.ExtrasService ||
  mongoose.model("ExtrasService", ExtrasServiceSchema);

export default ExtrasService;
