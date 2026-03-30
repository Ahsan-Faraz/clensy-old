import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import MovingCleaning from "@/models/MovingCleaning";

// Get moving cleaning data
export async function GET() {
  try {
    await connectToDatabase();

    let movingCleaningData = await MovingCleaning.findOne();

    // If no data exists, create default document
    if (!movingCleaningData) {
      movingCleaningData = new MovingCleaning({});
      await movingCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: movingCleaningData,
    });
  } catch (error) {
    console.error("Error fetching moving cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch moving cleaning data" },
      { status: 500 }
    );
  }
}

// Update moving cleaning data
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();

    // Remove MongoDB specific fields that shouldn't be updated
    const { _id, __v, ...updateData } = body;

    // Find existing document or create new one
    let movingCleaningData = await MovingCleaning.findOne();

    if (movingCleaningData) {
      // Update existing document (including faqs)
      Object.assign(movingCleaningData, updateData);
      await movingCleaningData.save();
    } else {
      // Create new document
      movingCleaningData = new MovingCleaning(updateData);
      await movingCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: movingCleaningData,
    });
  } catch (error) {
    console.error("Error updating moving cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update moving cleaning data" },
      { status: 500 }
    );
  }
}
