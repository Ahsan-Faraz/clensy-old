import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import PassaicLocation from "@/models/PassaicLocation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    title: "Passaic County",
    subtitle: "Professional Cleaning Services in Passaic County, NJ",
    backgroundImage: "https://www.northjersey.com/gcdn/presto/2020/11/27/PNJM/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002.JPG",
    ctaButton1: "SCHEDULE SERVICE",
    ctaButton2: "CALL US NOW"
  },
  contactSection: {
    title: "Contact Information",
    phone: "551-305-4081",
    email: "passaic@clensy.com",
    address: "123 Passaic Ave, Passaic County, NJ 07000",
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
    "Bloomingdale", "Clifton", "Haledon", "Hawthorne", "Little Falls",
    "North Haledon", "Passaic", "Paterson", "Pompton Lakes", "Prospect Park",
    "Ringwood", "Totowa", "Wanaque", "Wayne", "West Milford",
    "Woodland Park"
  ],
  aboutSection: {
    title: "About Our Passaic County Services",
    description: "Serving Passaic County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail."
  },
  seo: {
    title: "Professional Cleaning Services in Passaic County, NJ | Clensy",
    description: "Clensy offers professional cleaning services in Passaic County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.",
    keywords: [
      "cleaning services Passaic County",
      "house cleaning Passaic County",
      "commercial cleaning Passaic County",
      "professional cleaners Passaic",
      "maid service Passaic County",
      "office cleaning Passaic"
    ]
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await PassaicLocation.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await PassaicLocation.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Passaic location data" },
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
    
    const updatedData = await PassaicLocation.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Passaic location data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Passaic location data" },
      { status: 500 }
    );
  }
} 