import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import DeepCleaning from "@/models/DeepCleaning";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get deep cleaning data
export async function GET() {
  try {
    await connectToDatabase();
    let deepCleaningData = await DeepCleaning.findOne().sort({ updatedAt: -1 });

    // If no data exists, create default data
    if (!deepCleaningData) {
      deepCleaningData = await DeepCleaning.create({});
    }

    // Ensure all fields have values (in case of missing fields from older records)
    const defaultValues = {
      differenceHeading: "The Deep Cleaning Difference",
      differenceSubheading:
        "See the dramatic transformation our deep cleaning service delivers. These before and after comparisons showcase our thorough approach.",
      whenToChooseHeading: "When to Choose Deep Cleaning",
      whenToChooseSubheading:
        "Our deep cleaning service is ideal for specific situations when standard cleaning isn't enough.",
      // Client Reviews Section
      clientReviewsHeading: "What Our Clients Say",
      clientReviewsSubheading: "Hear from our satisfied clients about their experience with our deep cleaning service.",
      clientReviews: [
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
      ],
      // Deep vs Regular Cleaning Comparison Section
      comparisonHeading: "Deep Cleaning vs. Regular Cleaning",
      comparisonSubheading: "Understanding the difference between our deep cleaning and regular cleaning services helps you choose the right option for your needs.",
      regularCleaning: {
        title: "Regular Cleaning",
        subtitle: "Maintenance cleaning for already-clean homes",
        features: [
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
        ],
        frequency: "Weekly or bi-weekly"
      },
      deepCleaning: {
        title: "Deep Cleaning",
        subtitle: "Intensive cleaning for neglected or heavily used areas",
        features: [
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
        ],
        frequency: "Quarterly or seasonally"
      },
      movingTitle: "Moving In or Out",
      movingDescription:
        "Start fresh in your new home or ensure you leave your old one in perfect condition for the next residents. Deep cleaning addresses years of accumulated dirt.",
      movingIcon:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=100&auto=format&fit=crop",
      seasonalTitle: "Seasonal Refresh",
      seasonalDescription:
        "Ideal for spring cleaning or seasonal refreshes when homes need extra attention after prolonged indoor time during winter months.",
      seasonalIcon:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=100&auto=format&fit=crop",
      specialOccasionsTitle: "Special Occasions",
      specialOccasionsDescription:
        "Preparing for holidays, important guests, or events? Deep cleaning ensures your home is immaculate for those special moments that matter.",
      specialOccasionsIcon:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=100&auto=format&fit=crop",
      // FAQ Section
      faqs: [
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
    };

    // Merge existing data with default values for any missing fields
    const completeData = {
      ...defaultValues,
      ...deepCleaningData.toObject(),
      faqs: deepCleaningData.faqs && deepCleaningData.faqs.length > 0
        ? deepCleaningData.faqs
        : defaultValues.faqs,
    };

    return NextResponse.json({ success: true, data: completeData });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch deep cleaning data" },
      { status: 500 }
    );
  }
}

// Update deep cleaning data
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectToDatabase();

    // Remove MongoDB specific fields that shouldn't be updated
    const { _id, __v, ...updateData } = data;

    // Update or create the deep cleaning data
    const updatedData = await DeepCleaning.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Deep cleaning data updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update deep cleaning data" },
      { status: 500 }
    );
  }
}
