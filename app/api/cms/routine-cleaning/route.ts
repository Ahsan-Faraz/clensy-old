import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import RoutineCleaning from "@/models/RoutineCleaning";

// Get routine cleaning data
export async function GET() {
  try {
    await connectToDatabase();
    let routineCleaningData = await RoutineCleaning.findOne().sort({
      updatedAt: -1,
    });

    // If no data exists, create default data
    if (!routineCleaningData) {
      routineCleaningData = await RoutineCleaning.create({});
    } else {
      // Ensure all fields exist with proper defaults for existing records
      const defaultValues = {
        // Hero Section
        heroTopLabel: "Premium Residential Services",
        heroHeading: "Experience Pristine Routine Cleaning",
        heroSubheading:
          "Our signature routine cleaning service maintains your home in immaculate condition with expert attention to detail. Perfect for busy professionals and families seeking consistent cleanliness.",
        heroBackgroundImage:
          "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=2070&auto=format&fit=crop",
        heroServiceDuration: "2-3 Hour Service",
        heroServiceGuarantee: "100% Satisfaction",

        // What's Included Section
        includedSectionHeading: "What's Included in Our Routine Cleaning",
        includedSectionSubheading:
          "Our comprehensive routine cleaning service ensures every essential area of your home receives meticulous attention.",

        // Kitchen Section
        kitchenTitle: "Kitchen Excellence",
        kitchenDescription:
          "The heart of your home deserves special attention. Our routine kitchen cleaning ensures cooking spaces remain fresh and sanitized.",
        kitchenImage:
          "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1470&auto=format&fit=crop",
        kitchenFeatures: [
          "Clean and sanitize countertops and backsplash",
          "Clean exterior of appliances and cabinet fronts",
          "Thoroughly clean and sanitize sink and fixtures",
          "Vacuum and mop floors, removing all debris",
        ],

        // Bathroom Section
        bathroomTitle: "Bathroom Refresh",
        bathroomDescription:
          "Our bathroom cleaning routines ensure these essential spaces remain hygienic and sparkling clean after every visit.",
        bathroomImage:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop",
        bathroomFeatures: [
          "Clean and disinfect toilet, shower, tub and sink",
          "Clean mirrors and glass surfaces to a streak-free shine",
          "Wipe down bathroom fixtures and cabinet fronts",
          "Vacuum and mop floors, removing all debris",
        ],

        // Living Areas Section
        livingAreasTitle: "Living Area Maintenance",
        livingAreasDescription:
          "The spaces where you relax and entertain deserve special attention to maintain comfort and cleanliness.",
        livingAreasImage:
          "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1470&auto=format&fit=crop",
        livingAreasFeatures: [
          "Dust all accessible surfaces, including furniture",
          "Vacuum carpets, rugs, and upholstery",
          "Dust ceiling fans and light fixtures within reach",
          "Clean baseboards and remove cobwebs",
        ],

        // Feature Section
        featureSectionHeading: "Exceptional Cleaning Results, Every Time",
        featureSectionSubheading:
          "Our professional cleaners follow a meticulous process to ensure your home receives the highest standard of cleaning on every visit.",
        featureSectionImage:
          "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1770&auto=format&fit=crop",
        featureSectionPoints: [
          "Consistently thorough cleaning with attention to detail",
          "Eco-friendly cleaning products for a healthier home",
          "Professionally trained and background-checked staff",
        ],

        // How It Works Section
        howItWorksHeading: "How Our Routine Cleaning Works",
        howItWorksSubheading:
          "Getting started with our premium routine cleaning service is seamless and convenient.",

        // Step 1: Book Online
        step1Title: "Book Online",
        step1Description:
          "Schedule your cleaning service online in minutes. Choose your preferred date and time that works for your schedule.",
        step1Image:
          "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=400&auto=format&fit=crop",
        step1Badge: "Instant Online Pricing",

        // Step 2: We Clean
        step2Title: "We Clean",
        step2Description:
          "Our professional team arrives promptly at your scheduled time and meticulously cleans your home to exceed your expectations.",
        step2Image:
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=400&auto=format&fit=crop",

        // Step 3: Relax & Enjoy
        step3Title: "Relax & Enjoy",
        step3Description:
          "Return to a pristine, fresh home. Set up recurring cleanings to maintain your immaculate living space effortlessly.",
        step3Image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop",

        // Benefits Section
        benefitsHeading: "Why Choose Our Routine Cleaning Service",
        benefitsSubheading:
          "Our premium routine cleaning service offers exceptional benefits to maintain your home in pristine condition with minimal effort.",
        benefitsImage:
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1287&auto=format&fit=crop",

        // Benefit 1: Consistent Excellence
        benefit1Title: "Consistent Excellence",
        benefit1Description:
          "Regular professional cleanings ensure your home maintains a consistently pristine appearance and feel, preventing the gradual accumulation of dirt and grime.",

        // Benefit 2: Reclaimed Time & Energy
        benefit2Title: "Reclaimed Time & Energy",
        benefit2Description:
          "Regain your valuable time and energy by entrusting your cleaning needs to our professional team, allowing you to focus on what matters most to you.",

        // Benefit 3: Enhanced Well-being
        benefit3Title: "Enhanced Well-being",
        benefit3Description:
          "Regular professional cleaning significantly reduces allergens, dust, and bacteria, creating a healthier living environment that promotes overall well-being for you and your family.",
        // FAQ Section
        faqs: [
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
      };

      // Merge existing data with defaults for any missing fields
      routineCleaningData = {
        ...defaultValues,
        ...routineCleaningData.toObject(),
        faqs: routineCleaningData.faqs && routineCleaningData.faqs.length > 0
          ? routineCleaningData.faqs
          : defaultValues.faqs || [],
      };
    }

    return NextResponse.json({ success: true, data: routineCleaningData });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch routine cleaning data" },
      { status: 500 }
    );
  }
}

// Update routine cleaning data
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectToDatabase();

    // Only allow updating whitelisted fields (including faqs)
    const allowedFields = [
      // ...other fields...
      'faqs',
      'heroTopLabel','heroHeading','heroSubheading','heroBackgroundImage','heroServiceDuration','heroServiceGuarantee',
      'includedSectionHeading','includedSectionSubheading',
      'kitchenTitle','kitchenDescription','kitchenImage','kitchenFeatures',
      'bathroomTitle','bathroomDescription','bathroomImage','bathroomFeatures',
      'livingAreasTitle','livingAreasDescription','livingAreasImage','livingAreasFeatures',
      'featureSectionHeading','featureSectionSubheading','featureSectionImage','featureSectionPoints',
      'howItWorksHeading','howItWorksSubheading',
      'step1Title','step1Description','step1Image','step1Badge',
      'step2Title','step2Description','step2Image',
      'step3Title','step3Description','step3Image',
      'benefitsHeading','benefitsSubheading','benefitsImage',
      'benefit1Title','benefit1Description',
      'benefit2Title','benefit2Description',
      'benefit3Title','benefit3Description',
    ];
    const updatePayload: any = { updatedAt: new Date() };
    for (const key of allowedFields) {
      if (key in data) updatePayload[key] = data[key];
    }
    const updatedData = await RoutineCleaning.findOneAndUpdate(
      {},
      updatePayload,
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update routine cleaning data" },
      { status: 500 }
    );
  }
}
