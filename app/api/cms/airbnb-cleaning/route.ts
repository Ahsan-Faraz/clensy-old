import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db/mongodb";
import AirbnbCleaning from "@/models/AirbnbCleaning";

export async function GET() {
  try {
    await connectDB();

    let data = await AirbnbCleaning.findOne();

    // If no data exists, create default data
    if (!data) {
      data = new AirbnbCleaning({});
      await data.save();
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching Airbnb cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
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

    await connectDB();

    const body = await request.json();

    let data = await AirbnbCleaning.findOne();

    if (data) {
      // Update existing data
      Object.assign(data, body);
      await data.save();
    } else {
      // Create new data
      data = new AirbnbCleaning(body);
      await data.save();
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating Airbnb cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 }
    );
  }
}
