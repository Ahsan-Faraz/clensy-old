import mongoose from "mongoose";

const AirbnbCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Specialized Airbnb & Vacation Rental Cleaning",
    },
    heroHeading: {
      type: String,
      default: "Boost Your Ratings with Professional Cleaning",
    },
    heroSubheading: {
      type: String,
      default:
        "Specialized cleaning services designed for Airbnb, VRBO, and vacation rental properties that ensure 5-star cleanliness reviews and quick turnovers.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1939&auto=format&fit=crop",
    },
    heroServiceDuration: {
      type: String,
      default: "Quick Turnovers",
    },
    heroServiceGuarantee: {
      type: String,
      default: "5-Star Results",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "What's Included in Our Airbnb Cleaning",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "Our specialized Airbnb cleaning service goes beyond standard cleaning to ensure your guests have a 5-star experience.",
    },

    // Guest-Ready Bedrooms Section
    bedroomsTitle: {
      type: String,
      default: "Guest-Ready Bedrooms",
    },
    bedroomsDescription: {
      type: String,
      default:
        "We prepare bedrooms to hotel standards, ensuring your guests enjoy a pristine and welcoming environment for a perfect night's sleep.",
    },
    bedroomsImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?q=80&w=1470&auto=format&fit=crop",
    },
    bedroomsFeatures: {
      type: [String],
      default: [
        "Fresh linens perfectly changed and presented",
        "Dust-free surfaces and furniture",
        "Vacuumed floors and rugs",
        "Sanitized light switches and door handles",
      ],
    },

    // Spotless Bathrooms Section
    bathroomsTitle: {
      type: String,
      default: "Spotless Bathrooms",
    },
    bathroomsDescription: {
      type: String,
      default:
        "Our bathroom cleaning service ensures every inch is immaculate, as bathrooms are one of the most scrutinized areas by guests.",
    },
    bathroomsImage: {
      type: String,
      default:
        "https://www.bellacollina.com/hs-fs/hubfs/Real%20Estate/Pre-Designed%20Portfolio/Ibiza%201432/Ibiza1432B_masterbath.jpg?width=1060&height=707&name=Ibiza1432B_masterbath.jpg",
    },
    bathroomsFeatures: {
      type: [String],
      default: [
        "Deep cleaned showers, tubs, and toilets",
        "Streak-free mirrors and glass surfaces",
        "Fresh, neatly folded towels and bath mats",
        "Replenished toiletries and amenities",
      ],
    },

    // Kitchen Excellence Section
    kitchenTitle: {
      type: String,
      default: "Kitchen Excellence",
    },
    kitchenDescription: {
      type: String,
      default:
        "We ensure your kitchen is ready for guests who want to cook, with every surface sanitized and all appliances cleaned inside and out.",
    },
    kitchenImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1556912173-46c336c7fd55?q=80&w=1471&auto=format&fit=crop",
    },
    kitchenFeatures: {
      type: [String],
      default: [
        "Sanitized countertops and backsplash",
        "Cleaned appliances, inside and out",
        "Spotless sink and fixtures",
        "Clean and organized utensils and dishware",
      ],
    },

    // Before & After Section
    beforeAfterHeading: {
      type: String,
      default: "The Airbnb Cleaning Difference",
    },
    beforeAfterSubheading: {
      type: String,
      default:
        "See how our specialized Airbnb cleaning transforms spaces for the perfect guest experience.",
    },
    airBNBCleaningDifference: [
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
    // Benefits Section
    benefitsHeading: {
      type: String,
      default: "Why Choose Our Airbnb Cleaning",
    },
    benefitsSubheading: {
      type: String,
      default:
        "See how our specialized service benefits hosts and property managers.",
    },

    // Benefit 1: Higher Ratings
    benefit1Title: {
      type: String,
      default: "Higher Ratings",
    },
    benefit1Description: {
      type: String,
      default:
        "Professional Airbnb cleaning consistently leads to higher cleanliness ratings, which significantly impacts your overall property rating and visibility.",
    },
    benefit1Icon: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },

    // Benefit 2: Efficient Turnovers
    benefit2Title: {
      type: String,
      default: "Efficient Turnovers",
    },
    benefit2Description: {
      type: String,
      default:
        "Our quick and thorough turnover cleaning allows you to maximize bookings with minimal time between guests, increasing your revenue potential.",
    },
    benefit2Icon: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },

    // Benefit 3: Delighted Guests
    benefit3Title: {
      type: String,
      default: "Delighted Guests",
    },
    benefit3Description: {
      type: String,
      default:
        "Our attention to detail and special touches create an exceptional first impression that leads to positive reviews and repeat bookings.",
    },
    benefit3Icon: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    },

    // Client Reviews Section
    clientReviewsHeading: {
      type: String,
      default: "What Our Hosts Say",
    },
    clientReviewsSubheading: {
      type: String,
      default: "Discover how our Airbnb cleaning service has helped hosts achieve better reviews and higher bookings.",
    },
    clientReviews: {
      type: [
        {
          name: { type: String, required: true },
          role: { type: String, required: true },
          avatar: { type: String, required: true },
          text: { type: String, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
        },
      ],
      default: [
        {
          name: "Emma Thompson",
          role: "Airbnb Superhost",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
          text: "Since using Clensy for my Airbnb cleaning, my 5-star cleanliness ratings increased by 30%. They're thorough, reliable, and guests constantly comment on how immaculate the space is.",
          rating: 5,
        },
        {
          name: "James Wilson",
          role: "Property Manager",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
          text: "Managing multiple listings became so much easier with Clensy's Airbnb cleaning service. Their turnover cleaning is quick, thorough, and they always leave special touches that delight our guests.",
          rating: 5,
        },
        {
          name: "Olivia Parker",
          role: "Vacation Rental Owner",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
          text: "The attention to detail is remarkable. From perfectly folded towels to spotless kitchens, Clensy's team knows exactly what vacation rental guests expect. Worth every penny!",
          rating: 5,
        },
      ],
    },

    // Service Features Section
    serviceFeatures: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
      default: [
        {
          title: "Quick Turnovers",
          description: "Fast, efficient cleaning between guest stays to maximize your booking potential",
          icon: "Clock",
        },
        {
          title: "Pristine Standards",
          description: "Meticulous attention to detail ensures 5-star cleanliness ratings",
          icon: "Star",
        },
        {
          title: "Flexible Scheduling",
          description: "Adaptable to your booking calendar with last-minute availability",
          icon: "Calendar",
        },
        {
          title: "Guest-Ready Touches",
          description: "Special amenity arrangement and presentation to delight your guests",
          icon: "Heart",
        },
      ],
    },

    // Success Stories Section
    successStoriesHeading: {
      type: String,
      default: "Success Stories",
    },
    successStoriesSubheading: {
      type: String,
      default: "See how our cleaning service has helped Airbnb hosts increase their bookings and revenue.",
    },
    successStories: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          metric: { type: String, required: true },
          hostName: { type: String, required: true },
          hostTitle: { type: String, required: true },
          avatarColor: { type: String, required: true },
        },
      ],
      default: [
        {
          title: "Downtown Loft",
          description: "After switching to Clensy, my guests consistently mention how clean and welcoming the space feels. I've seen a significant increase in positive reviews focusing on cleanliness.",
          metric: "Reviews up 45%",
          hostName: "Rachel",
          hostTitle: "Superhost since 2019",
          avatarColor: "pink-500",
        },
        {
          title: "Beachfront Villa",
          description: "Clensy's reliability means I can accept more last-minute bookings. Their quick turnovers and attention to detail have helped me become a Superhost.",
          metric: "Bookings up 40%",
          hostName: "David",
          hostTitle: "Property Manager",
          avatarColor: "blue-500",
        },
        {
          title: "Mountain Retreat",
          description: "With Clensy handling the cleaning, I've been able to raise my nightly rates. The quality of cleaning justifies the premium price, and guests are happy to pay it.",
          metric: "Revenue increased by 25%",
          hostName: "Sarah",
          hostTitle: "Host since 2017",
          avatarColor: "green-500",
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
          question: "How quickly can you turn over an Airbnb between guests?",
          answer:
            "We offer same-day turnovers for most Airbnb properties. Our team can typically complete a thorough cleaning and preparation within 2-3 hours, depending on the size of your property.",
        },
        {
          question: "Do you provide fresh linens and towels?",
          answer:
            "Yes, we can coordinate linen and towel services. We can either wash and replace your existing linens or provide fresh, hotel-quality linens as part of our turnover service.",
        },
        {
          question: "What if guests leave the property in poor condition?",
          answer:
            "We're equipped to handle all levels of cleaning challenges. For properties requiring deep cleaning or damage cleanup, we'll assess the situation and provide transparent pricing for additional services needed.",
        },
        {
          question: "Can you restock amenities and supplies?",
          answer:
            "Absolutely! We can restock toiletries, coffee, cleaning supplies, and other guest amenities as part of our service. Just provide us with a list of items you'd like us to maintain.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AirbnbCleaning ||
  mongoose.model("AirbnbCleaning", AirbnbCleaningSchema);
