import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import { FAQQuestion } from "@/models/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST endpoint - Remove duplicate FAQ questions (Admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find all questions
    const allQuestions = await FAQQuestion.find({}).sort({ createdAt: 1 });
    
    // Group by question text to find duplicates
    const questionGroups = new Map();
    const duplicatesToDelete = [];

    for (const question of allQuestions) {
      const key = question.question.toLowerCase().trim();
      
      if (questionGroups.has(key)) {
        // This is a duplicate - mark for deletion (keep the first one)
        duplicatesToDelete.push(question._id);
      } else {
        // First occurrence - keep it
        questionGroups.set(key, question);
      }
    }

    // Delete duplicates
    if (duplicatesToDelete.length > 0) {
      await FAQQuestion.deleteMany({ _id: { $in: duplicatesToDelete } });
    }

    // Get final count
    const finalCount = await FAQQuestion.countDocuments();

    return NextResponse.json({
      success: true,
      message: `Cleanup completed. Removed ${duplicatesToDelete.length} duplicate questions.`,
      data: {
        duplicatesRemoved: duplicatesToDelete.length,
        remainingQuestions: finalCount
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cleanup duplicate questions" },
      { status: 500 }
    );
  }
}