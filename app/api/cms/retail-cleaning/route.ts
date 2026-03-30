import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import RetailCleaning from "@/models/RetailCleaning";

export async function GET() {
  try {
    await connectToDatabase();

    let retailCleaningData = await RetailCleaning.findOne();

    if (!retailCleaningData) {
      // Create default data if none exists
      retailCleaningData = new RetailCleaning({});
      await retailCleaningData.save();
    }

    // Always ensure faqs field is present (merge with defaults if needed)
    if (!retailCleaningData.faqs || !Array.isArray(retailCleaningData.faqs) || retailCleaningData.faqs.length === 0) {
      retailCleaningData.faqs = [
        {
          question: "Can you clean outside of retail business hours?",
          answer:
            "Yes, we offer flexible scheduling and can clean before opening or after closing to minimize disruption to your business and customers.",
        },
        {
          question: "Do you use safe cleaning products for retail environments?",
          answer:
            "We use only high-quality, eco-friendly cleaning products that are safe for both staff and customers. If you have specific preferences, let us know.",
        },
        {
          question: "Can you handle large or multi-location retail spaces?",
          answer:
            "Yes, our team is equipped to clean retail spaces of all sizes, including multi-location businesses. We can create a custom cleaning plan for your needs.",
        },
        {
          question: "What if I am not satisfied with the cleaning?",
          answer:
            "If you are not completely satisfied, contact us within 24 hours and we will return to address any concerns at no additional cost.",
        },
      ];
      await retailCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: retailCleaningData,
    });
  } catch (error) {
    console.error("Error fetching retail cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch retail cleaning data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    await connectToDatabase();

    let retailCleaningData = await RetailCleaning.findOne();

    if (retailCleaningData) {
      // Update existing data
      Object.assign(retailCleaningData, data);
      await retailCleaningData.save();
    } else {
      // Create new data
      retailCleaningData = new RetailCleaning(data);
      await retailCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: retailCleaningData,
    });
  } catch (error) {
    console.error("Error updating retail cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update retail cleaning data" },
      { status: 500 }
    );
  }
}
