import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import HeroSection from "@/models/HeroSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get hero section data
export async function GET() {
  try {
    await connectToDatabase();
    let heroData = await HeroSection.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!heroData) {
      heroData = await HeroSection.create({});
    }
    
    return NextResponse.json({ success: true, data: heroData });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hero section data" },
      { status: 500 }
    );
  }
}

// Update hero section data
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
    
    // Update or create the hero section
    const updatedHero = await HeroSection.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Hero section updated successfully",
      data: updatedHero 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update hero section" },
      { status: 500 }
    );
  }
}