import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import HowItWorks from "@/models/HowItWorks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  step1: {
    title: "Order online",
    description: "Our easy online pricing lets you set up a cleaning plan right now. See your price and get scheduled today.",
    featureText: "Takes less than 30 seconds"
  },
  step2: {
    title: "We clean your home",
    description: "Our professional team arrives on time and cleans your home according to our 50-point checklist.",
    featureText: "Trained and background-checked professionals"
  },
  step3: {
    title: "Enjoy your clean home",
    description: "Relax in your freshly cleaned space. We'll be back on your schedule - weekly, weekly, or monthly.",
    featureText: "Flexible scheduling to fit your lifestyle"
  },
  buttonText: "Book Now"
};

// Get how-it-works section data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await HowItWorks.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!data) {
      data = await HowItWorks.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch how-it-works section data" },
      { status: 500 }
    );
  }
}

// Update how-it-works section data
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
    
    // Update or create the how-it-works section
    const updatedData = await HowItWorks.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "How it works section updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update how-it-works section" },
      { status: 500 }
    );
  }
}