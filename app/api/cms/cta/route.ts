import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import CTA from "@/models/CTA";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heading: "Home cleaning you can trust",
  description: "Book our professional cleaning services today and experience the difference.",
  leftCard: {
    title: "Order online",
    description: "Our easy online pricing lets you set up a cleaning plan right now.",
    buttonText: "See my price"
  },
  rightCard: {
    title: "Call us now",
    description: "Need more information? Prefer a friendly voice over the phone?",
    buttonText: "(123) 456-7890"
  }
};

// Get CTA section data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await CTA.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!data) {
      data = await CTA.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch CTA section data" },
      { status: 500 }
    );
  }
}

// Update CTA section data
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
    
    // Update or create the CTA section
    const updatedData = await CTA.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "CTA section updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update CTA section" },
      { status: 500 }
    );
  }
}