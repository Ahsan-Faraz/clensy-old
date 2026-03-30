import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db/mongodb";
import PropertyCleaning from "@/models/PropertyCleaning";

export async function GET() {
  try {
    await dbConnect();

    let propertyCleaningData = await PropertyCleaning.findOne();

    if (!propertyCleaningData) {
      // Create default data if none exists
      propertyCleaningData = new PropertyCleaning({});
      await propertyCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: propertyCleaningData,
    });
  } catch (error) {
    console.error("Error fetching property cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch property cleaning data" },
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

    let propertyCleaningData = await PropertyCleaning.findOne();

    if (propertyCleaningData) {
      // Update existing data
      Object.assign(propertyCleaningData, data);
      await propertyCleaningData.save();
    } else {
      // Create new data
      propertyCleaningData = new PropertyCleaning(data);
      await propertyCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: propertyCleaningData,
    });
  } catch (error) {
    console.error("Error updating property cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update property cleaning data" },
      { status: 500 }
    );
  }
}
