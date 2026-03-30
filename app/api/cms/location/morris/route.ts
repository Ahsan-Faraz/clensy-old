import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import MorrisLocation from "@/models/MorrisLocation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    title: "Morris County",
    subtitle: "Professional Cleaning Services in Morris County, NJ",
    backgroundImage: "https://admin.onlyinyourstate.com/wp-content/uploads/sites/2/2023/05/GettyImages-1403661247.jpg",
    ctaButton1: "SCHEDULE SERVICE",
    ctaButton2: "CALL US NOW"
  },
  contactSection: {
    title: "Contact Information",
    phone: "551-305-4081",
    email: "morris@clensy.com",
    address: "123 Morris Ave, Morristown, NJ 07960",
    hours: [
      { day: "Monday", hours: "8:00 am - 6:00 pm" },
      { day: "Tuesday", hours: "8:00 am - 6:00 pm" },
      { day: "Wednesday", hours: "8:00 am - 6:00 pm" },
      { day: "Thursday", hours: "8:00 am - 6:00 pm" },
      { day: "Friday", hours: "8:00 am - 6:00 pm" },
      { day: "Saturday", hours: "10:00 am - 2:00 pm" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  serviceAreas: [
    "Morristown", "Parsippany", "Troy Hills", "Rockaway", "Mount Olive",
    "Roxbury", "Randolph", "Chatham", "Denville", "Florham Park",
    "Hanover", "East Hanover", "Madison", "Boonton", "Butler",
    "Kinnelon", "Lincoln Park", "Morris Plains", "Mountain Lakes",
    "Chester", "Long Hill", "Mendham", "Mount Arlington", "Pequannock",
    "Riverdale"
  ],
  aboutSection: {
    title: "About Our Morris County Services",
    description: "Serving Morris County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.",
    content: [
      "Our Morris County location is centrally positioned in historic Morristown, making it convenient for clients throughout the region. From this location, we provide our full range of cleaning services to homes and businesses in Morristown, Parsippany, Rockaway, and surrounding areas.",
      "The Morris County team consists of experienced cleaning professionals who are familiar with the unique needs of local homes and businesses. Whether you live in a historic property in Morristown or a modern home in Parsippany, our team has the expertise to provide exceptional cleaning services.",
      "We take pride in serving the Morris County community and look forward to helping you maintain a clean, healthy environment in your home or business."
    ]
  },
  seo: {
    title: "Professional Cleaning Services in Morris County, NJ | Clensy",
    description: "Clensy offers professional cleaning services in Morris County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.",
    keywords: [
      "cleaning services Morris County",
      "house cleaning Morris County",
      "commercial cleaning Morris County",
      "professional cleaners Morristown",
      "maid service Morris County",
      "office cleaning Morris"
    ]
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await MorrisLocation.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await MorrisLocation.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Morris location data" },
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
    
    const updatedData = await MorrisLocation.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Morris location data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Error updating Morris location data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Morris location data" },
      { status: 500 }
    );
  }
}
