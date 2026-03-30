import mongoose from "mongoose";

const RoutineCleaningSchema = new mongoose.Schema({
  // Hero Section
  heroTopLabel: {
    type: String,
    required: true,
    default: "Premium Residential Services",
  },
  heroHeading: {
    type: String,
    required: true,
    default: "Experience Pristine Routine Cleaning",
  },
  heroSubheading: {
    type: String,
    required: true,
    default:
      "Our signature routine cleaning service maintains your home in immaculate condition with expert attention to detail. Perfect for busy professionals and families seeking consistent cleanliness.",
  },
  heroBackgroundImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=2070&auto=format&fit=crop",
  },
  heroServiceDuration: {
    type: String,
    required: true,
    default: "2-3 Hour Service",
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
    default: "What's Included in Our Routine Cleaning",
  },
  includedSectionSubheading: {
    type: String,
    required: true,
    default:
      "Our comprehensive routine cleaning service ensures every essential area of your home receives meticulous attention.",
  },

  // Kitchen Section
  kitchenTitle: {
    type: String,
    required: true,
    default: "Kitchen Excellence",
  },
  kitchenDescription: {
    type: String,
    required: true,
    default:
      "The heart of your home deserves special attention. Our routine kitchen cleaning ensures cooking spaces remain fresh and sanitized.",
  },
  kitchenImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1470&auto=format&fit=crop",
  },
  kitchenFeatures: {
    type: [String],
    required: true,
    default: [
      "Clean and sanitize countertops and backsplash",
      "Clean exterior of appliances and cabinet fronts",
      "Thoroughly clean and sanitize sink and fixtures",
      "Vacuum and mop floors, removing all debris",
    ],
  },

  // Bathroom Section
  bathroomTitle: {
    type: String,
    required: true,
    default: "Bathroom Refresh",
  },
  bathroomDescription: {
    type: String,
    required: true,
    default:
      "Our bathroom cleaning routines ensure these essential spaces remain hygienic and sparkling clean after every visit.",
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
      "Clean and disinfect toilet, shower, tub and sink",
      "Clean mirrors and glass surfaces to a streak-free shine",
      "Wipe down bathroom fixtures and cabinet fronts",
      "Vacuum and mop floors, removing all debris",
    ],
  },

  // Living Areas Section
  livingAreasTitle: {
    type: String,
    required: true,
    default: "Living Area Maintenance",
  },
  livingAreasDescription: {
    type: String,
    required: true,
    default:
      "The spaces where you relax and entertain deserve special attention to maintain comfort and cleanliness.",
  },
  livingAreasImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1470&auto=format&fit=crop",
  },
  livingAreasFeatures: {
    type: [String],
    required: true,
    default: [
      "Dust all accessible surfaces, including furniture",
      "Vacuum carpets, rugs, and upholstery",
      "Dust ceiling fans and light fixtures within reach",
      "Clean baseboards and remove cobwebs",
    ],
  },

  // Feature Section
  featureSectionHeading: {
    type: String,
    required: true,
    default: "Exceptional Cleaning Results, Every Time",
  },
  featureSectionSubheading: {
    type: String,
    required: true,
    default:
      "Our professional cleaners follow a meticulous process to ensure your home receives the highest standard of cleaning on every visit.",
  },
  featureSectionImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1770&auto=format&fit=crop",
  },
  featureSectionPoints: {
    type: [String],
    required: true,
    default: [
      "Consistently thorough cleaning with attention to detail",
      "Eco-friendly cleaning products for a healthier home",
      "Professionally trained and background-checked staff",
    ],
  },

  // How It Works Section
  howItWorksHeading: {
    type: String,
    required: true,
    default: "How Our Routine Cleaning Works",
  },
  howItWorksSubheading: {
    type: String,
    required: true,
    default:
      "Getting started with our premium routine cleaning service is seamless and convenient.",
  },

  // Step 1: Book Online
  step1Title: {
    type: String,
    required: true,
    default: "Book Online",
  },
  step1Description: {
    type: String,
    required: true,
    default:
      "Schedule your cleaning service online in minutes. Choose your preferred date and time that works for your schedule.",
  },
  step1Image: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=400&auto=format&fit=crop",
  },
  step1Badge: {
    type: String,
    required: true,
    default: "Instant Online Pricing",
  },

  // Step 2: We Clean
  step2Title: {
    type: String,
    required: true,
    default: "We Clean",
  },
  step2Description: {
    type: String,
    required: true,
    default:
      "Our professional team arrives promptly at your scheduled time and meticulously cleans your home to exceed your expectations.",
  },
  step2Image: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=400&auto=format&fit=crop",
  },

  // Step 3: Relax & Enjoy
  step3Title: {
    type: String,
    required: true,
    default: "Relax & Enjoy",
  },
  step3Description: {
    type: String,
    required: true,
    default:
      "Return to a pristine, fresh home. Set up recurring cleanings to maintain your immaculate living space effortlessly.",
  },
  step3Image: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop",
  },

  // Benefits Section
  benefitsHeading: {
    type: String,
    required: true,
    default: "Why Choose Our Routine Cleaning Service",
  },
  benefitsSubheading: {
    type: String,
    required: true,
    default:
      "Our premium routine cleaning service offers exceptional benefits to maintain your home in pristine condition with minimal effort.",
  },
  benefitsImage: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1287&auto=format&fit=crop",
  },

  // Benefit 1: Consistent Excellence
  benefit1Title: {
    type: String,
    required: true,
    default: "Consistent Excellence",
  },
  benefit1Description: {
    type: String,
    required: true,
    default:
      "Regular professional cleanings ensure your home maintains a consistently pristine appearance and feel, preventing the gradual accumulation of dirt and grime.",
  },

  // Benefit 2: Reclaimed Time & Energy
  benefit2Title: {
    type: String,
    required: true,
    default: "Reclaimed Time & Energy",
  },
  benefit2Description: {
    type: String,
    required: true,
    default:
      "Regain your valuable time and energy by entrusting your cleaning needs to our professional team, allowing you to focus on what matters most to you.",
  },

  // Benefit 3: Enhanced Well-being
  benefit3Title: {
    type: String,
    required: true,
    default: "Enhanced Well-being",
  },
  benefit3Description: {
    type: String,
    required: true,
    default:
      "Regular professional cleaning significantly reduces allergens, dust, and bacteria, creating a healthier living environment that promotes overall well-being for you and your family.",
  },

  // Client Testimonials Section
  clientTestimonialsHeading: {
    type: String,
    required: true,
    default: "What Our Clients Say",
  },
  clientTestimonialsSubheading: {
    type: String,
    required: true,
    default: "Hear from our satisfied clients about their experience with our routine cleaning service.",
  },
  clientTestimonials: {
    type: [
      {
        rating: { type: Number, required: true, min: 1, max: 5 },
        review: { type: String, required: true },
        clientName: { type: String, required: true },
        clientLocation: { type: String, required: true },
        avatarBgColor: { type: String, required: true },
      },
    ],
    default: [
      {
        rating: 5,
        review: "The attention to detail was incredible. My home has never felt so clean and fresh. I've tried other services before, but Clensy's routine cleaning is in a league of its own.",
        clientName: "Sarah Johnson",
        clientLocation: "New Jersey, NJ",
        avatarBgColor: "pink-500",
      },
      {
        rating: 5,
        review: "I've been using Clensy's routine cleaning for six months now, and it's been a game-changer. The consistency and reliability of their service is outstanding. My home always looks immaculate.",
        clientName: "Michael Rodriguez",
        clientLocation: "New Jersey, NJ",
        avatarBgColor: "blue-500",
      },
      {
        rating: 5,
        review: "As a busy professional, having Clensy's routine cleaning service has been life-changing. I come home to a spotless house every time, and their staff is always professional and thorough.",
        clientName: "Jennifer Park",
        clientLocation: "New Jersey, NJ",
        avatarBgColor: "green-500",
      },
    ],
  },

  // Cleaning Frequency Guide Section
  frequencyGuideHeading: {
    type: String,
    required: true,
    default: "How Often Should You Schedule Cleaning?",
  },
  frequencyGuideSubheading: {
    type: String,
    required: true,
    default: "Finding the right cleaning frequency depends on your household size, lifestyle, and preferences. Use our guide to determine what works best for you.",
  },
  
  // Weekly Option
  weeklyTitle: {
    type: String,
    required: true,
    default: "Weekly",
  },
  weeklyPerfectFor: {
    type: [String],
    required: true,
    default: [
      "Busy families with children",
      "Households with pets",
      "High-traffic homes",
      "Those who love consistently clean spaces",
    ],
  },
  weeklyBenefits: {
    type: [String],
    required: true,
    default: [
      "Maintains pristine condition",
      "Prevents buildup of dirt and grime",
      "Perfect for entertaining",
    ],
  },

  // Bi-Weekly Option  
  biWeeklyTitle: {
    type: String,
    required: true,
    default: "Bi-Weekly",
  },
  biWeeklyPerfectFor: {
    type: [String],
    required: true,
    default: [
      "Working professionals",
      "Small households (1-2 people)",
      "Neat and tidy homeowners",
      "Budget-conscious families",
    ],
  },
  biWeeklyBenefits: {
    type: [String],
    required: true,
    default: [
      "Great balance of cost and cleanliness",
      "Ideal for most lifestyles",
      "Keeps home consistently fresh",
    ],
  },

  // Monthly Option
  monthlyTitle: {
    type: String,
    required: true,
    default: "Monthly",
  },
  monthlyPerfectFor: {
    type: [String],
    required: true,
    default: [
      "Minimal-maintenance households",
      "Vacation homes",
      "Single professionals",
      "Supplemental to self-cleaning",
    ],
  },
  monthlyBenefits: {
    type: [String],
    required: true,
    default: [
      "Cost-effective option",
      "Perfect for deep maintenance",
      "Tackles overlooked areas",
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
        question: "Do I need to be home during the cleaning?",
        answer:
          "No, you don't need to be home. Many of our clients provide a key or access code so we can clean while they're at work. Our cleaners are thoroughly vetted, background-checked, and fully insured for your peace of mind.",
      },
      {
        question: "Can I change my cleaning schedule if needed?",
        answer:
          "Absolutely! We understand schedules change. You can reschedule cleanings with at least 48 hours notice without any fee. We also offer the flexibility to occasionally add additional cleanings when you need them.",
      },
      {
        question: "What cleaning products do you use?",
        answer:
          "We use high-quality, eco-friendly cleaning products as our standard. If you have specific product preferences or sensitivities, we're happy to use products you provide or make accommodations for allergies and preferences.",
      },
      {
        question: "What if I'm not satisfied with the cleaning?",
        answer:
          "Your satisfaction is guaranteed. If you're not completely satisfied with any area we've cleaned, contact us within 24 hours and we'll return to reclean that area at no additional cost to you.",
      },
    ],
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RoutineCleaning ||
  mongoose.model("RoutineCleaning", RoutineCleaningSchema);
