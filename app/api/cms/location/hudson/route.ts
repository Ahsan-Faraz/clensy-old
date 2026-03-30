import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import HudsonLocation from "@/models/HudsonLocation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    title: "Hudson County",
    subtitle: "Professional Cleaning Services in Hudson County, NJ",
    backgroundImage: "https://pyxis.nymag.com/v1/imgs/c31/3a5/c01b3f0cb3f32f34ac1670ff10991d9e47-hoboken-lede.2x.rsocial.w600.jpg",
    ctaButton1: "SCHEDULE SERVICE",
    ctaButton2: "CALL US NOW"
  },
  contactSection: {
    title: "Contact Information",
    phone: "201-555-7890",
    email: "hudson@clensy.com",
    address: "123 Hudson Ave, Hudson County, NJ 07000",
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
    "Bayonne", "East Newark", "Guttenberg", "Harrison", "Hoboken", 
    "Jersey City", "Kearny", "North Bergen", "Secaucus", "Union City", 
    "Weehawken", "West New York"
  ],
  aboutSection: {
    title: "About Our Hudson County Services",
    description: "Serving Hudson County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail."
  },
  seo: {
    title: "Professional Cleaning Services in Hudson County, NJ | Clensy",
    description: "Clensy offers professional cleaning services in Hudson County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.",
    keywords: [
      "cleaning services Hudson County",
      "house cleaning Hudson County",
      "commercial cleaning Hudson County",
      "professional cleaners Hudson",
      "maid service Hudson County",
      "office cleaning Hudson"
    ]
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await HudsonLocation.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await HudsonLocation.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Hudson location data" },
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
    
    const updatedData = await HudsonLocation.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Hudson location data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Hudson location data" },
      { status: 500 }
    );
  }
} 