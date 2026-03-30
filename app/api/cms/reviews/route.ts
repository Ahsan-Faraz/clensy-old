import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Reviews from "@/models/Reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heading: "What People Are <blue>Saying About Us</blue>",
  buttonText: "Load More"
};

// Get reviews section data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await Reviews.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!data) {
      data = await Reviews.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews section data" },
      { status: 500 }
    );
  }
}

// Update reviews section data
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
    
    // Update or create the reviews section
    const updatedData = await Reviews.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Reviews section updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update reviews section" },
      { status: 500 }
    );
  }
}