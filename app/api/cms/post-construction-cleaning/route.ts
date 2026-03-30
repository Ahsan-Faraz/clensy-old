import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db/mongodb";
import PostConstructionCleaning from "@/models/PostConstructionCleaning";

export async function GET() {
  try {
    await connectToDatabase();

    let data = await PostConstructionCleaning.findOne();

    // If no data exists, create default data
    if (!data) {
      data = new PostConstructionCleaning({});
      await data.save();
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching post-construction cleaning data:", error);
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

    const body = await request.json();

    await connectToDatabase();

    // Update or create the post-construction cleaning data
    const data = await PostConstructionCleaning.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating post-construction cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 }
    );
  }
}
