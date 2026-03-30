import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import { FAQQuestion } from "@/models/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET single FAQ question
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const question = await FAQQuestion.findById(params.id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: "FAQ question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: question });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQ question" },
      { status: 500 }
    );
  }
}

// PUT update FAQ question (Admin only)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectToDatabase();

    const question = await FAQQuestion.findByIdAndUpdate(
      params.id,
      {
        ...data,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!question) {
      return NextResponse.json(
        { success: false, error: "FAQ question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "FAQ question updated successfully",
      data: question
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update FAQ question" },
      { status: 500 }
    );
  }
}

// DELETE FAQ question (Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const question = await FAQQuestion.findByIdAndDelete(params.id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: "FAQ question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "FAQ question deleted successfully"
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete FAQ question" },
      { status: 500 }
    );
  }
}