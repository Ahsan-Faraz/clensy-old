import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import UnionLocation from "@/models/UnionLocation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    title: "Union County",
    subtitle: "Professional Cleaning Services in Union County, NJ",
    backgroundImage: "https://uploads.thealternativepress.com/uploads/photos/ff/2e92932ca009d6bbf5a9_44fa2dd46be6f378a435_IMG_1532__1_.JPG?id=1152529",
    ctaButton1: "SCHEDULE SERVICE",
    ctaButton2: "CALL US NOW"
  },
  contactSection: {
    title: "Contact Information",
    phone: "908-555-7890",
    email: "union@clensy.com",
    address: "123 Union Ave, Union County, NJ 07000",
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
    "Berkeley Heights", "Clark", "Cranford", "Elizabeth", "Fanwood", 
    "Garwood", "Hillside", "Kenilworth", "Linden", "Mountainside", 
    "New Providence", "Plainfield", "Rahway", "Roselle", "Roselle Park", 
    "Scotch Plains", "Springfield", "Summit", "Union", "Westfield"
  ],
  aboutSection: {
    title: "About Our Union County Services",
    description: "Serving Union County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail."
  },
  seo: {
    title: "Professional Cleaning Services in Union County, NJ | Clensy",
    description: "Clensy offers professional cleaning services in Union County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.",
    keywords: [
      "cleaning services Union County",
      "house cleaning Union County",
      "commercial cleaning Union County",
      "professional cleaners Union",
      "maid service Union County",
      "office cleaning Union"
    ]
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await UnionLocation.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await UnionLocation.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Union location data" },
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
    
    const updatedData = await UnionLocation.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Union location data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Union location data" },
      { status: 500 }
    );
  }
} 