import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Comparison from "@/models/Comparison";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heading: "The Clensy <blue>Difference</blue>",
  description: "We're leading the cleaning industry in customer satisfaction and service quality. Try Clensy and see why cleaning is a big deal to us.",
  features: [
    {
      name: "Locally Owned and Operated",
      clensy: true,
      others: true,
      icon: "users"
    },
    {
      name: "Over The Phone Estimates",
      clensy: true,
      others: false,
      icon: "clock"
    },
    {
      name: "Bonded and Insured",
      clensy: true,
      others: false,
      icon: "shield-check"
    },
    {
      name: "Environmentally Friendly",
      clensy: true,
      others: false,
      icon: "leaf"
    },
    {
      name: "Customized Cleans",
      clensy: true,
      others: true,
      icon: "heart-handshake"
    },
    {
      name: "PRO Clean Promise",
      clensy: true,
      others: false,
      icon: "medal"
    },
    {
      name: "Background Checks",
      clensy: true,
      others: false,
      icon: "badge-check"
    }
  ],
  buttonText: "Experience the Clensy Difference"
};

// Get comparison section data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await Comparison.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!data) {
      data = await Comparison.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comparison section data" },
      { status: 500 }
    );
  }
}

// Update comparison section data
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
    
    // Update or create the comparison section
    const updatedData = await Comparison.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Comparison section updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update comparison section" },
      { status: 500 }
    );
  }
}