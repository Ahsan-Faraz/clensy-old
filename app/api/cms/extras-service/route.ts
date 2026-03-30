import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db/mongodb";
import ExtrasService from "@/models/ExtrasService";

export async function GET() {
  try {
    await dbConnect();
    
    let extrasService = await ExtrasService.findOne();
    
    // If no data exists, create default data
    if (!extrasService) {
      extrasService = new ExtrasService({});
      await extrasService.save();
    }
    
    return NextResponse.json({
      success: true,
      data: extrasService,
    });
  } catch (error) {
    console.error("Error fetching extras service data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch extras service data" },
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

    await dbConnect();
    
    const data = await request.json();
    
    // Use findOneAndUpdate to avoid version conflicts
    let extrasService = await ExtrasService.findOneAndUpdate(
      {}, // Empty filter to find the first document
      data,
      { 
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        runValidators: true // Run schema validators
      }
    );
    
    return NextResponse.json({
      success: true,
      data: extrasService,
    });
  } catch (error) {
    console.error("Error updating extras service data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update extras service data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const data = await request.json();
    
    // Use findOneAndUpdate to avoid version conflicts
    let extrasService = await ExtrasService.findOneAndUpdate(
      {}, // Empty filter to find the first document
      data,
      { 
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        runValidators: true // Run schema validators
      }
    );
    
    return NextResponse.json({
      success: true,
      data: extrasService,
    });
  } catch (error) {
    console.error("Error updating extras service data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update extras service data" },
      { status: 500 }
    );
  }
} 