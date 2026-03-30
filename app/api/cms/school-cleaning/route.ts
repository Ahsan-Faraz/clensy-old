import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/db/mongodb";
import SchoolCleaning from "@/models/SchoolCleaning";

export async function GET() {
  try {
    await dbConnect();

    let schoolCleaningData = await SchoolCleaning.findOne();

    if (!schoolCleaningData) {
      // Create default data if none exists
      schoolCleaningData = new SchoolCleaning({});
      await schoolCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: schoolCleaningData,
    });
  } catch (error) {
    console.error("Error fetching school cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch school cleaning data" },
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

    const data = await request.json();

    await dbConnect();

    let schoolCleaningData = await SchoolCleaning.findOne();

    if (!schoolCleaningData) {
      schoolCleaningData = new SchoolCleaning(data);
    } else {
      Object.assign(schoolCleaningData, data);
    }

    await schoolCleaningData.save();

    return NextResponse.json({
      success: true,
      data: schoolCleaningData,
    });
  } catch (error) {
    console.error("Error updating school cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update school cleaning data" },
      { status: 500 }
    );
  }
}
