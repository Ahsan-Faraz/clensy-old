import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import GymCleaning from "@/models/GymCleaning";

export async function GET() {
  try {
    await connectToDatabase();

    let gymCleaningData = await GymCleaning.findOne();

    // If no data exists, create default data
    if (!gymCleaningData) {
      gymCleaningData = new GymCleaning();
      await gymCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: gymCleaningData,
    });
  } catch (error) {
    console.error("Error fetching gym cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gym cleaning data" },
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

    await connectToDatabase();

    const data = await request.json();

    let gymCleaningData = await GymCleaning.findOne();

    if (gymCleaningData) {
      // Update existing data
      Object.assign(gymCleaningData, data);
      await gymCleaningData.save();
    } else {
      // Create new data
      gymCleaningData = new GymCleaning(data);
      await gymCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: gymCleaningData,
    });
  } catch (error) {
    console.error("Error updating gym cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gym cleaning data" },
      { status: 500 }
    );
  }
}
