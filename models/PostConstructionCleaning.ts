import mongoose from "mongoose";

const PostConstructionCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Post-Construction Cleaning Experts",
    },
    heroHeading: {
      type: String,
      default: "From Construction Zone to Move-In Ready",
    },
    heroSubheading: {
      type: String,
      default:
        "Specialized cleanup services to remove construction debris, dust, and residue, making your newly constructed or renovated space pristine and ready for use.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://progressivecleaningcorp.com/wp-content/uploads/2023/08/Post-Construction-Cleaning-Alexandria-VA.jpg",
    },
    heroServiceDuration: {
      type: String,
      default: "Thorough Service",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "Complete Post-Construction Cleanup Solution",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "Our specialized teams are equipped to tackle the unique challenges of construction cleanup, from removing fine dust to eliminating paint splatter and construction adhesives.",
    },

    // Debris Removal Section
    debrisRemovalTitle: {
      type: String,
      default: "Debris Removal",
    },
    debrisRemovalDescription: {
      type: String,
      default:
        "We remove all construction debris, nails, screws, and other potentially hazardous materials that may have been left behind.",
    },
    debrisRemovalImage: {
      type: String,
      default:
        "https://luxurycleaningny.com/wp-content/uploads/2021/07/post-construction-cleaning-services-1080x675.jpg",
    },
    debrisRemovalFeatures: {
      type: [String],
      default: [
        "Complete removal of all construction waste",
        "Detailed cleanup of small particles and leftover materials",
        "Safe disposal of hazardous materials",
        "Thorough inspection for hidden construction debris",
      ],
    },

    // Dust Elimination Section
    dustEliminationTitle: {
      type: String,
      default: "Dust Elimination",
    },
    dustEliminationDescription: {
      type: String,
      default:
        "We tackle the fine construction dust that settles everywhere, using specialized equipment and techniques to ensure a clean, breathable environment.",
    },
    dustEliminationImage: {
      type: String,
      default:
        "https://s1.kaercher-media.com/media/image/selection/127074/d0/bauendreinigung-header.webp",
    },
    dustEliminationFeatures: {
      type: [String],
      default: [
        "HEPA filtered vacuums for fine dust particles",
        "Comprehensive dusting of all surfaces",
        "Air filter cleaning or replacement",
        "Air vent and duct cleaning",
      ],
    },

    // Surface Finishing Section
    surfaceFinishingTitle: {
      type: String,
      default: "Surface Finishing",
    },
    surfaceFinishingDescription: {
      type: String,
      default:
        "We clean and polish all surfaces, from windows to fixtures, removing any construction residue to reveal the beauty of your new space.",
    },
    surfaceFinishingImage: {
      type: String,
      default:
        "https://fmccompanies.com/wp-content/uploads/2021/08/floorvac-1024x637.jpeg",
    },
    surfaceFinishingFeatures: {
      type: [String],
      default: [
        "Removal of paint splatter and adhesives",
        "Streak-free window and glass cleaning",
        "Fixture polishing and detail work",
        "Final touch-ups for a perfect finish",
      ],
    },

    // Before & After Section
    beforeAfterHeading: {
      type: String,
      default: "The Transformation",
    },
    beforeAfterSubheading: {
      type: String,
      default:
        "See the dramatic difference our post-construction cleaning makes.",
    },
    postConstructionDifference: [
      {
        heading: {
          type: String,
          default: "Living Room Transformation",
        },
        beforeImage: {
          type: String,
          default:
            "https://images.unsplash.com/photo-1593642532973-d31b1a5f4c8d?q=80&w=1470&auto=format&fit=crop",
        },
        afterImage: {
          type: String,
          default:
            "https://images.unsplash.com/photo-1593642532973-d31b1a5f4c8d?q=80&w=1470&auto=format&fit=crop",
        },
        caption: {
          type: String,
          default:
            "Experience the difference with our post-construction cleaning service. From dusty corners to sparkling surfaces, we leave no stone unturned.",
        },
      },
    ],
    // Process Section
    processHeading: {
      type: String,
      default: "Our Post-Construction Cleaning Process",
    },
    processSubheading: {
      type: String,
      default: "Our systematic approach ensures no detail is overlooked.",
    },

    // Process Step 1
    step1Title: {
      type: String,
      default: "Initial Assessment & Debris Removal",
    },
    step1Description: {
      type: String,
      default:
        "We begin by assessing the site and removing all large debris, construction materials, and trash. Our team carefully inspects for nails, screws, and other potentially hazardous items.",
    },

    // Process Step 2
    step2Title: {
      type: String,
      default: "Dust Elimination & Surface Cleaning",
    },
    step2Description: {
      type: String,
      default:
        "We use HEPA filter vacuums to remove construction dust from all surfaces, including hard-to-reach areas. Our team wipes down all surfaces to remove dust and debris.",
    },

    // Process Step 3
    step3Title: {
      type: String,
      default: "Floor & Surface Detailing",
    },
    step3Description: {
      type: String,
      default:
        "We deep clean all flooring surfaces, from hardwood to carpet, removing construction residue, paint drips, and adhesives. Baseboards, trim, and door frames are carefully wiped down.",
    },

    // Process Step 4
    step4Title: {
      type: String,
      default: "Final Detailing & Inspection",
    },
    step4Description: {
      type: String,
      default:
        "We add the finishing touches with detailed cleaning of fixtures, windows, and glass. A thorough inspection ensures all areas meet our high standards and your requirements.",
    },

    // Safety Standards Section
    safetyHeading: {
      type: String,
      default: "Our Construction Clean-up Safety Standards",
    },
    safetySubheading: {
      type: String,
      default:
        "We take safety seriously when handling post-construction cleanup. Our team follows strict protocols to protect both our staff and your property.",
    },

    // Safety Standard 1: PPE
    ppeTitle: {
      type: String,
      default: "Personal Protective Equipment",
    },
    ppeDescription: {
      type: String,
      default:
        "Our technicians are equipped with comprehensive PPE including respiratory protection for dust, safety glasses, gloves, and appropriate footwear to handle post-construction environments safely.",
    },
    ppeFeatures: {
      type: [String],
      default: [
        "OSHA-compliant safety equipment for all staff",
        "Regular safety training for construction site hazards",
      ],
    },

    // Safety Standard 2: Hazardous Material Handling
    hazmatTitle: {
      type: String,
      default: "Hazardous Material Handling",
    },
    hazmatDescription: {
      type: String,
      default:
        "Construction sites often contain hazardous materials. Our team is trained to identify, safely handle, and properly dispose of materials like paints, solvents, adhesives, and sharp objects.",
    },
    hazmatFeatures: {
      type: [String],
      default: [
        "Proper disposal procedures for construction chemicals",
        "Eco-friendly disposal methods when possible",
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
          question: "When is the best time to schedule post-construction cleaning?",
          answer:
            "The ideal time is after all construction work is complete, including painting, fixture installation, and any final inspections. We recommend waiting 24-48 hours after the last worker leaves to allow dust to settle before our team arrives.",
        },
        {
          question: "How long does post-construction cleaning take?",
          answer:
            "The duration depends on the size and condition of the space. Typically, a residential project takes 6-12 hours, while commercial spaces may require 1-3 days. We'll provide a detailed time estimate after assessing your specific project.",
        },
        {
          question: "Do you remove construction debris and materials?",
          answer:
            "Yes, we remove smaller construction debris like nails, screws, wood chips, and drywall dust. However, large materials like lumber, drywall sheets, or appliance packaging should be removed by the contractors before our arrival.",
        },
        {
          question: "What safety measures do you take during post-construction cleaning?",
          answer:
            "Our team uses professional-grade safety equipment including respirators, safety glasses, and protective clothing. We follow OSHA guidelines and use HEPA-filtered vacuums to safely remove construction dust and particles.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PostConstructionCleaning ||
  mongoose.model("PostConstructionCleaning", PostConstructionCleaningSchema);
