import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import OfficeCleaning from "@/models/OfficeCleaning";

// Get office cleaning data
export async function GET() {
  try {
    await connectToDatabase();

    let data = await OfficeCleaning.findOne();

    // If no data exists, create default data (including default FAQs)
    if (!data) {
      data = await OfficeCleaning.create({});
    }

    // Always ensure faqs field is present (merge with defaults if needed)
    if (!data.faqs || !Array.isArray(data.faqs) || data.faqs.length === 0) {
      data.faqs = [
        {
          question: "Do I need to be present during the office cleaning?",
          answer:
            "No, you do not need to be present. Many clients provide access instructions so we can clean outside of business hours. Our team is fully vetted and insured for your peace of mind.",
        },
        {
          question: "Can you accommodate special cleaning requests for our office?",
          answer:
            "Absolutely! We tailor our cleaning services to your office's unique needs. Please let us know any special requirements or areas of focus when booking.",
        },
        {
          question: "What cleaning products do you use in offices?",
          answer:
            "We use high-quality, eco-friendly cleaning products that are safe for office environments. If you have specific product preferences, we are happy to accommodate them.",
        },
        {
          question: "What if we are not satisfied with the cleaning?",
          answer:
            "Your satisfaction is our priority. If any area does not meet your expectations, contact us within 24 hours and we will return to address the issue at no extra cost.",
        },
      ];
      await data.save();
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch office cleaning data" },
      { status: 500 }
    );
  }
}

// Update office cleaning data
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

    // Find existing document or create new one
    let officeCleaningData = await OfficeCleaning.findOne();

    if (officeCleaningData) {
      // Update each field explicitly to ensure Mongoose change tracking
      for (const key of Object.keys(updateData)) {
        officeCleaningData[key] = updateData[key];
      }
      await officeCleaningData.save();
    } else {
      // Create new document
      officeCleaningData = new OfficeCleaning(updateData);
      await officeCleaningData.save();
    }

    // Refetch the updated document to ensure latest data (esp. for arrays)
    const freshData = await OfficeCleaning.findById(officeCleaningData._id);

    return NextResponse.json({
      success: true,
      message: "Office cleaning data updated successfully",
      data: freshData,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update office cleaning data" },
      { status: 500 }
    );
  }
}
