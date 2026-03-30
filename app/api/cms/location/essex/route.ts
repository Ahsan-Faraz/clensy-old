import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import EssexLocation from "@/models/EssexLocation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    title: "Essex County",
    subtitle: "Professional Cleaning Services in Essex County, NJ",
    backgroundImage: "https://images.squarespace-cdn.com/content/v1/619d5ebc238e542fb0c33dc1/1638832803220-BZGEE966XUF7ZT2OXSI3/pasted-image-0-1.png",
    ctaButton1: "SCHEDULE SERVICE",
    ctaButton2: "CALL US NOW"
  },
  contactSection: {
    title: "Contact Information",
    phone: "551-305-4081",
    email: "essex@clensy.com",
    address: "123 Essex Ave, Essex County, NJ 07000",
    hours: [
      { day: "Monday", hours: "8:00 am - 6:00 pm" },
      { day: "Tuesday", hours: "8:00 am - 6:00 pm" },
      { day: "Wednesday", hours: "8:00 am - 6:00 pm" },
      { day: "Thursday", hours: "8:00 am - 6:00 pm" },
      { day: "Friday", hours: "8:00 am - 6:00 pm" },
      { day: "Saturday", hours: "9:00 am - 3:00 pm" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  serviceAreas: [
    "Belleville", "Bloomfield", "Caldwell", "Cedar Grove", "East Orange",
    "Essex Fells", "Fairfield", "Glen Ridge", "Irvington", "Livingston",
    "Maplewood", "Millburn", "Montclair", "Newark", "North Caldwell",
    "Nutley", "Orange", "Roseland", "South Orange", "Verona",
    "West Caldwell", "West Orange"
  ],
  aboutSection: {
    title: "About Our Essex County Services",
    description: "Serving Essex County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail."
  },
  seo: {
    title: "Professional Cleaning Services in Essex County, NJ | Clensy",
    description: "Clensy offers professional cleaning services in Essex County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.",
    keywords: [
      "cleaning services Essex County",
      "house cleaning Essex County",
      "commercial cleaning Essex County",
      "professional cleaners Essex",
      "maid service Essex County",
      "office cleaning Essex"
    ]
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await EssexLocation.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await EssexLocation.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Essex location data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
    
    const updatedData = await EssexLocation.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Essex location data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Essex location data" },
      { status: 500 }
    );
  }
} 