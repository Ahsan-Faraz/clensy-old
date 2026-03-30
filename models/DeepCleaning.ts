import mongoose from "mongoose";
import { difference } from "next/dist/build/utils";

const DeepCleaningSchema = new mongoose.Schema({
  // Hero Section
  heroTopLabel: {
    type: String,
    required: true,
    default: "Premium Deep Cleaning",
  },
  heroHeading: {
    type: String,
    required: true,
    default: "Revitalize Your Space With Deep Cleaning",
  },
  heroSubheading: {
    type: String,
    required: true,
    default:
      "Our comprehensive deep cleaning service targets built-up dirt, grime, and allergens to transform your home with an intensive cleaning experience beyond the surface.",
  },
  heroBackgroundImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop",
  },
  heroServiceDuration: {
    type: String,
    required: true,
    default: "4-6 Hour Service",
  },
  heroServiceGuarantee: {
    type: String,
    required: true,
    default: "100% Satisfaction",
  },

  // What's Included Section
  includedSectionHeading: {
    type: String,
    required: true,
    default: "What's Included in Our Deep Cleaning",
  },
  includedSectionSubheading: {
    type: String,
    required: true,
    default:
      "Our deep cleaning service goes beyond standard cleaning to address areas that require special attention.",
  },

  // Bathroom Section
  bathroomTitle: {
    type: String,
    required: true,
    default: "Bathroom Transformation",
  },
  bathroomDescription: {
    type: String,
    required: true,
    default:
      "Our deep cleaning service gives your bathrooms a complete refresh, targeting built-up soap scum, water stains, and hidden dirt in overlooked areas.",
  },
  bathroomImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop",
  },
  bathroomFeatures: {
    type: [String],
    required: true,
    default: [
      "Deep clean tile grout and remove mold/mildew",
      "Descale shower heads and faucets",
      "Deep clean behind toilet and under sink",
      "Sanitize all surfaces, including light switches and door knobs",
    ],
  },

  // Kitchen Section
  kitchenTitle: {
    type: String,
    required: true,
    default: "Kitchen Deep Clean",
  },
  kitchenDescription: {
    type: String,
    required: true,
    default:
      "Our kitchen deep cleaning targets grease build-up, appliance interiors, and hidden dirt in cabinets and drawers for a truly fresh kitchen.",
  },
  kitchenImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1470&auto=format&fit=crop",
  },
  kitchenFeatures: {
    type: [String],
    required: true,
    default: [
      "Clean inside oven, microwave, and refrigerator",
      "Degrease range hood, stovetop, and backsplash",
      "Deep clean cabinet fronts and drawer pulls",
      "Sanitize countertops and disinfect sink",
    ],
  },

  // Living Areas Section
  livingAreasTitle: {
    type: String,
    required: true,
    default: "Living Areas Deep Clean",
  },
  livingAreasDescription: {
    type: String,
    required: true,
    default:
      "We thoroughly clean all living spaces, focusing on areas that accumulate dust, allergens, and everyday wear.",
  },
  livingAreasImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1470&auto=format&fit=crop",
  },
  livingAreasFeatures: {
    type: [String],
    required: true,
    default: [
      "Deep vacuum all carpets and upholstery",
      "Clean baseboards, window sills, and light fixtures",
      "Dust and polish all furniture surfaces",
      "Clean mirrors, glass surfaces, and picture frames",
    ],
  },

  // Deep Cleaning Difference Section
  differenceHeading: {
    type: String,
    required: true,
    default: "The Deep Cleaning Difference",
  },
  differenceSubheading: {
    type: String,
    required: true,
    default:
      "See the dramatic transformation our deep cleaning service delivers. These before and after comparisons showcase our thorough approach.",
  },
  deepCleaningDifference: [
    {
      heading: {
        type: String,
        required: true,
        default: "Kitchen Transformation",
      },
      beforeImage: {
        type: String,
        required: true,
        default:
          "https://images.unsplash.com/photo-1593642532973-d31b1a5f4c8d?q=80&w=1470&auto=format&fit=crop",
      },
      afterImage: {
        type: String,
        required: true,
        default:
          "https://images.unsplash.com/photo-1593642532973-d31b1a5f4c8d?q=80&w=1470&auto=format&fit=crop",
      },
      caption: {
        type: String,
        required: true,
        default:
          "Experience the difference with our deep cleaning service. From dusty corners to sparkling surfaces, we leave no stone unturned.",
      },
    },
  ],

  // When to Choose Deep Cleaning Section
  whenToChooseHeading: {
    type: String,
    required: true,
    default: "When to Choose Deep Cleaning",
  },
  whenToChooseSubheading: {
    type: String,
    required: true,
    default:
      "Our deep cleaning service is ideal for specific situations when standard cleaning isn't enough.",
  },

  // When to Choose - Card 1: Moving
  movingTitle: {
    type: String,
    required: true,
    default: "Moving In or Out",
  },
  movingDescription: {
    type: String,
    required: true,
    default:
      "Start fresh in your new home or ensure you leave your old one in perfect condition for the next residents. Deep cleaning addresses years of accumulated dirt.",
  },
  movingIcon: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=100&auto=format&fit=crop",
  },

  // When to Choose - Card 2: Seasonal
  seasonalTitle: {
    type: String,
    required: true,
    default: "Seasonal Refresh",
  },
  seasonalDescription: {
    type: String,
    required: true,
    default:
      "Ideal for spring cleaning or seasonal refreshes when homes need extra attention after prolonged indoor time during winter months.",
  },
  seasonalIcon: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=100&auto=format&fit=crop",
  },

  // When to Choose - Card 3: Special Occasions
  specialOccasionsTitle: {
    type: String,
    required: true,
    default: "Special Occasions",
  },
  specialOccasionsDescription: {
    type: String,
    required: true,
    default:
      "Preparing for holidays, important guests, or events? Deep cleaning ensures your home is immaculate for those special moments that matter.",
  },
  specialOccasionsIcon: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=100&auto=format&fit=crop",
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
        question: "How often should I get a deep cleaning?",
        answer:
          "For most homes, we recommend a deep cleaning 2-4 times per year, depending on your lifestyle and needs. Many customers opt for seasonal deep cleanings, while maintaining regular routine cleanings in between.",
      },
      {
        question: "How long does deep cleaning take?",
        answer:
          "A deep cleaning typically takes 4-6 hours depending on the size of your home and its condition. For larger homes or homes requiring extensive deep cleaning, we may recommend a team of cleaners or multiple sessions.",
      },
      {
        question: "What's the difference between routine and deep cleaning?",
        answer:
          "Routine cleaning focuses on maintaining everyday cleanliness, while deep cleaning addresses built-up dirt, grime, and hard-to-reach areas. Deep cleaning includes tasks like cleaning inside appliances, behind furniture, tackling grout, and addressing areas that aren't part of regular maintenance.",
      },
      {
        question: "Should I prepare my home before a deep cleaning?",
        answer:
          "For the most effective deep cleaning, we recommend removing clutter from surfaces and floors. This allows our team to focus on the detailed cleaning tasks rather than organizing your belongings.",
      },
    ],
  },

  // Client Reviews Section
  clientReviewsHeading: {
    type: String,
    required: true,
    default: "What Our Clients Say",
  },
  clientReviewsSubheading: {
    type: String,
    required: true,
    default: "Hear from our satisfied clients about their experience with our deep cleaning service.",
  },
  clientReviews: {
    type: [{
      rating: { type: Number, required: true, min: 1, max: 5 },
      review: { type: String, required: true },
      clientName: { type: String, required: true },
      clientLocation: { type: String, required: true },
      avatarBgColor: { type: String, required: true }
    }],
    default: [
      {
        rating: 5,
        review: "I couldn't believe the difference after Clensy's deep cleaning service. Areas I didn't even notice were dirty are now spotless. The attention to detail was incredible and it feels like we have a brand new home!",
        clientName: "Rebecca Thompson",
        clientLocation: "Montclair, NJ",
        avatarBgColor: "purple-500"
      },
      {
        rating: 5,
        review: "We had Clensy do a deep clean before moving into our new home. The previous owners had pets, and there was dust everywhere. After the deep cleaning, it felt like a completely different house - fresh, clean, and ready for our family.",
        clientName: "Daniel Morgan",
        clientLocation: "Jersey City, NJ",
        avatarBgColor: "orange-500"
      },
      {
        rating: 5,
        review: "I scheduled a deep cleaning after renovating my kitchen and bathroom. The construction dust was everywhere! Clensy's team removed every trace of dust and grime. Their deep cleaning service is worth every penny for the results they deliver.",
        clientName: "Jennifer Park",
        clientLocation: "Hoboken, NJ",
        avatarBgColor: "teal-500"
      }
    ]
  },

  // Deep vs Regular Cleaning Comparison Section
  comparisonHeading: {
    type: String,
    required: true,
    default: "Deep Cleaning vs. Regular Cleaning"
  },
  comparisonSubheading: {
    type: String,
    required: true,
    default: "Understanding the difference between our deep cleaning and regular cleaning services helps you choose the right option for your needs."
  },
  regularCleaning: {
    title: {
      type: String,
      required: true,
      default: "Regular Cleaning"
    },
    subtitle: {
      type: String,
      required: true,
      default: "Maintenance cleaning for already-clean homes"
    },
    features: {
      type: [{
        title: { type: String, required: true },
        description: { type: String, required: true }
      }],
      default: [
        {
          title: "Surface dusting",
          description: "Dust visible surfaces and areas"
        },
        {
          title: "Bathroom basics",
          description: "Clean toilets, sinks, and shower surfaces"
        },
        {
          title: "Kitchen cleaning",
          description: "Wipe countertops and appliance exteriors"
        },
        {
          title: "Floor maintenance",
          description: "Vacuum carpets and mop hard floors"
        }
      ]
    },
    frequency: {
      type: String,
      required: true,
      default: "Weekly or bi-weekly"
    }
  },
  deepCleaning: {
    title: {
      type: String,
      required: true,
      default: "Deep Cleaning"
    },
    subtitle: {
      type: String,
      required: true,
      default: "Intensive cleaning for neglected or heavily used areas"
    },
    features: {
      type: [{
        title: { type: String, required: true },
        description: { type: String, required: true }
      }],
      default: [
        {
          title: "Comprehensive dusting",
          description: "Dust all surfaces including baseboards, door frames, and ceiling fans"
        },
        {
          title: "Deep bathroom sanitizing",
          description: "Descale shower heads, clean grout, sanitize behind toilets"
        },
        {
          title: "Inside appliance cleaning",
          description: "Clean inside ovens, refrigerators, and cabinet interiors"
        },
        {
          title: "Detailed floor care",
          description: "Edge vacuuming, move furniture, clean under rugs"
        }
      ]
    },
    frequency: {
      type: String,
      required: true,
      default: "Quarterly or seasonally"
    }
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.DeepCleaning ||
  mongoose.model("DeepCleaning", DeepCleaningSchema);
