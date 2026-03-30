import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Careers from "@/models/Careers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heroSection: {
    topLabel: "Now Hiring - Multiple Positions",
    heading: "Join The Clensy Team",
    description:
      "Build a rewarding career with New Jersey's premier cleaning service. We offer competitive pay, great benefits, and opportunities for growth in a supportive environment.",
    primaryButtonText: "View Open Positions",
    secondaryButtonText: "Apply Now",
    teamMembersCount: "50+",
  },
  benefitsSection: {
    heading: "Why Work With Us?",
    description:
      "We believe in taking care of our team members because happy employees provide the best service to our customers.",
    benefits: [
      {
        title: "Competitive Pay",
        description:
          "Above-market wages with performance bonuses and regular raises",
        icon: "DollarSign",
      },
      {
        title: "Health Benefits",
        description:
          "Comprehensive health, dental, and vision insurance coverage",
        icon: "Shield",
      },
      {
        title: "Flexible Schedule",
        description:
          "Work-life balance with flexible hours and part-time options",
        icon: "Clock",
      },
      {
        title: "Career Growth",
        description:
          "Training programs and advancement opportunities within the company",
        icon: "TrendingUp",
      },
      {
        title: "Team Environment",
        description:
          "Supportive team culture with collaborative work environment",
        icon: "Users",
      },
      {
        title: "Recognition Program",
        description: "Employee of the month awards and performance recognition",
        icon: "Award",
      },
    ],
  },
  positionsSection: {
    heading: "Open Positions",
    description:
      "Find the perfect role that matches your skills and career goals.",
    positions: [
      {
        title: "Residential Cleaner",
        type: "Full-time / Part-time",
        location: "Multiple NJ Counties",
        description:
          "Join our residential cleaning team and help families maintain beautiful, clean homes.",
        requirements: [
          "Previous cleaning experience preferred but not required",
          "Reliable transportation",
          "Attention to detail",
          "Physical ability to perform cleaning tasks",
          "Background check required",
        ],
        salary: "$18-22/hour",
        link: "",
      },
      {
        title: "Commercial Cleaner",
        type: "Full-time / Part-time",
        location: "Multiple NJ Counties",
        description:
          "Clean offices, medical facilities, and commercial spaces with our professional team.",
        requirements: [
          "Experience in commercial cleaning preferred",
          "Ability to work evenings/weekends",
          "Reliable and punctual",
          "Team player attitude",
          "Background check required",
        ],
        salary: "$19-23/hour",
        link: "",
      },
      {
        title: "Team Leader",
        type: "Full-time",
        location: "Bergen County",
        description:
          "Lead a team of cleaners and ensure quality standards are met on every job.",
        requirements: [
          "2+ years cleaning experience",
          "Leadership experience",
          "Valid driver's license",
          "Excellent communication skills",
          "Quality control mindset",
        ],
        salary: "$25-30/hour",
        link: "",
      },
      {
        title: "Customer Service Representative",
        type: "Full-time",
        location: "Remote/Office",
        description:
          "Help customers schedule services and manage their cleaning needs.",
        requirements: [
          "Customer service experience",
          "Excellent phone skills",
          "Computer proficiency",
          "Problem-solving abilities",
          "Bilingual (English/Spanish) preferred",
        ],
        salary: "$17-21/hour",
        link: "",
      },
    ],
  },
  testimonialsSection: {
    heading: "What Our Team Says",
    description:
      "Hear from our employees about their experience working at Clensy.",
    testimonials: [
      {
        name: "Sarah M.",
        position: "Residential Cleaner",
        content:
          "I love working at Clensy! The team is supportive, the pay is great, and I have the flexibility I need for my family.",
        rating: 5,
      },
      {
        name: "Mike Rodriguez",
        position: "Team Leader",
        content:
          "Started as a cleaner and worked my way up to team leader. Clensy really invests in their employees' growth.",
        rating: 5,
      },
      {
        name: "Lisa Chen",
        position: "Commercial Cleaner",
        content:
          "Best cleaning company I've worked for. They provide all the equipment and training you need to succeed.",
        rating: 5,
      },
    ],
  },
  applicationSection: {
    heading: "Ready to Join Our Team?",
    description:
      "Fill out the application below and we'll get back to you within 24 hours.",
    submitButtonText: "Submit Application",
  },
  contactSection: {
    heading: "Have Questions About Working With Us?",
    description:
      "Contact our HR team for more information about career opportunities.",
          phoneText: "Call Us: (551) 305-4081",
    emailText: "Email: careers@clensy.com",
  },
};

// Get careers page data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await Careers.findOne().sort({ updatedAt: -1 });

    // If no data exists, create default data using the model defaults
    if (!data) {
      data = await Careers.create({});
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch careers page data" },
      { status: 500 }
    );
  }
}

// Update careers page data
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectToDatabase();

    // Remove MongoDB specific fields that shouldn't be updated
    const { _id, __v, ...updateData } = data;

    // Update or create the careers page
    const updatedData = await Careers.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Careers page updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update careers page" },
      { status: 500 }
    );
  }
}
