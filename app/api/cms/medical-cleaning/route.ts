import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import MedicalCleaning from "@/models/MedicalCleaning";

export async function GET() {
  try {
    await connectToDatabase();

    let medicalCleaningData = await MedicalCleaning.findOne();

    // If no data exists, create default data
    if (!medicalCleaningData) {
      medicalCleaningData = new MedicalCleaning({});
      await medicalCleaningData.save();
    }

    return NextResponse.json({
      success: true,
      data: medicalCleaningData,
    });
  } catch (error) {
    console.error("Error fetching medical cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch medical cleaning data" },
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

    await connectToDatabase();

    // Update or create the medical cleaning data
    const medicalCleaningData = await MedicalCleaning.findOneAndUpdate(
      {},
      data,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      data: medicalCleaningData,
    });
  } catch (error) {
    console.error("Error updating medical cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update medical cleaning data" },
      { status: 500 }
    );
  }
}
