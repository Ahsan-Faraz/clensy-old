import mongoose from 'mongoose';

const PropertyCleaningSchema = new mongoose.Schema({
  // Hero Section
  heroTopLabel: {
    type: String,
    default: "Premium Property Services"
  },
  heroHeading: {
    type: String,
    default: "Property & Building Common Areas Cleaning"
  },
  heroSubheading: {
    type: String,
    default: "Specialized cleaning services for apartment buildings, condominiums, and commercial property common areas that enhance property value and resident satisfaction."
  },
  heroBackgroundImage: {
    type: String,
    default: "https://softwashaustralia.com.au/cdn/shop/articles/man-cleaning-patio-tiles-with-a-pressure-washer-in-2025-03-15-23-02-39-utc.jpg?v=1742306383&width=1500"
  },
  heroServiceDuration: {
    type: String,
    default: "Property Specialists"
  },
  heroServiceGuarantee: {
    type: String,
    default: "100% Satisfaction"
  },

  // Trust Indicators Section
  trustIndicator1Number: {
    type: String,
    default: "250+"
  },
  trustIndicator1Text: {
    type: String,
    default: "Buildings Serviced"
  },
  trustIndicator2Number: {
    type: String,
    default: "24/7"
  },
  trustIndicator2Text: {
    type: String,
    default: "Property Support"
  },
  trustIndicator3Number: {
    type: String,
    default: "4.9"
  },
  trustIndicator3Text: {
    type: String,
    default: "Management Rating"
  },
  trustIndicator4Number: {
    type: String,
    default: "100%"
  },
  trustIndicator4Text: {
    type: String,
    default: "Property Manager Satisfaction"
  },

  // What's Included Section
  includedSectionHeading: {
    type: String,
    default: "Our Property Cleaning Services"
  },
  includedSectionSubheading: {
    type: String,
    default: "We provide comprehensive cleaning solutions tailored to meet the unique demands of multi-unit residential and commercial properties."
  },

  // Lobbies & Entrance Areas Section
  lobbiesTitle: {
    type: String,
    default: "Lobbies & Entrance Areas"
  },
  lobbiesDescription: {
    type: String,
    default: "Create an impeccable first impression with meticulously maintained lobbies and entrances that welcome residents and visitors."
  },
  lobbiesImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=2070&auto=format&fit=crop"
  },
  lobbiesFeatures: {
    type: [String],
    default: [
      "Detailed floor cleaning tailored to your flooring type",
      "Glass door and window cleaning",
      "Dusting and cleaning of reception furniture and fixtures",
      "Disinfection of high-touch areas and surfaces"
    ]
  },

  // Hallways & Corridors Section
  hallwaysTitle: {
    type: String,
    default: "Hallways & Corridors"
  },
  hallwaysDescription: {
    type: String,
    default: "Maintain pristine, safe passageways throughout your property with our thorough hallway and corridor cleaning services."
  },
  hallwaysImage: {
    type: String,
    default: "https://sygrove.com/wp-content/uploads/2019/02/hallway-interior-design.jpg"
  },
  hallwaysFeatures: {
    type: [String],
    default: [
      "Vacuuming and floor maintenance for all corridor areas",
      "Spot cleaning of walls and surfaces",
      "Sanitization of handrails, door handles, and light switches",
      "Trash removal and maintenance of waste receptacles"
    ]
  },

  // Stairwells & Elevators Section
  stairwellsTitle: {
    type: String,
    default: "Stairwells & Elevators"
  },
  stairwellsDescription: {
    type: String,
    default: "Ensure safe, clean vertical transportation areas with our specialized stairwell and elevator cleaning services."
  },
  stairwellsImage: {
    type: String,
    default: "https://www.westcoastelevators.com.au/wp-content/uploads/2021/05/Location-1-The-Staircase-scaled.jpg"
  },
  stairwellsFeatures: {
    type: [String],
    default: [
      "Thorough cleaning of stair treads, risers, and handrails",
      "Complete disinfection of elevator buttons and panels",
      "Cleaning of elevator doors, tracks, and interior surfaces",
      "Maintenance of emergency exit signage and pathways"
    ]
  },

  // Why Choose Us Section
  whyChooseHeading: {
    type: String,
    default: "Why Choose Clensy for Your Property"
  },
  whyChooseSubheading: {
    type: String,
    default: "We understand the unique cleaning requirements of multi-unit buildings and deliver specialized solutions that enhance property value and resident satisfaction."
  },

  // Feature 1: Property Management Focus
  feature1Title: {
    type: String,
    default: "Property Management Focus"
  },
  feature1Description: {
    type: String,
    default: "We partner with property managers to develop customized cleaning programs that align with your operational goals and budget requirements."
  },
  feature1Icon: {
    type: String,
    default: "Building"
  },

  // Feature 2: Reliable Scheduling
  feature2Title: {
    type: String,
    default: "Reliable Scheduling"
  },
  feature2Description: {
    type: String,
    default: "Our consistent cleaning schedules ensure your property always looks its best, with flexibility to accommodate special events or seasonal needs."
  },
  feature2Icon: {
    type: String,
    default: "Clock"
  },

  // Feature 3: Resident Satisfaction
  feature3Title: {
    type: String,
    default: "Resident Satisfaction"
  },
  feature3Description: {
    type: String,
    default: "Our meticulous cleaning services create living environments that residents are proud to call home, enhancing tenant retention and property reputation."
  },
  feature3Icon: {
    type: String,
    default: "Home"
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
        question: "How often should common areas be professionally cleaned?",
        answer:
          "We recommend daily cleaning for high-traffic areas like lobbies and hallways, with weekly deep cleaning for stairwells and monthly comprehensive cleaning for all common areas. The frequency can be adjusted based on building size, resident count, and specific needs.",
      },
      {
        question: "Do you work with property management companies?",
        answer:
          "Yes, we specialize in working with property management companies and building owners. We provide customized cleaning programs, detailed reporting, and flexible scheduling to meet the unique needs of multi-unit residential and commercial properties.",
      },
      {
        question: "Can you provide emergency cleaning services?",
        answer:
          "Absolutely! We offer 24/7 emergency cleaning services for unexpected situations like spills, accidents, or urgent preparations for property showings or special events. Our rapid response team can be on-site quickly when needed.",
      },
      {
        question: "What's included in your property cleaning service?",
        answer:
          "Our comprehensive service includes lobby and entrance cleaning, hallway and corridor maintenance, stairwell cleaning, elevator sanitization, common bathroom maintenance, trash removal, and cleaning of all common area surfaces. We customize our service based on your property's specific layout and needs.",
      },
    ],
  }
}, {
  timestamps: true
});

export default mongoose.models.PropertyCleaning || mongoose.model('PropertyCleaning', PropertyCleaningSchema); 