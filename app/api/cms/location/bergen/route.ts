import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import BergenLocation from "@/models/BergenLocation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    title: "Bergen County",
    subtitle: "Professional Cleaning Services in Bergen County, NJ",
    backgroundImage: "https://www.northjersey.com/gcdn/presto/2020/11/27/PNJM/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002.JPG",
    ctaButton1: "SCHEDULE SERVICE",
    ctaButton2: "CALL US NOW"
  },
  contactSection: {
    title: "Contact Information",
    phone: "201-555-7890",
    email: "bergen@clensy.com",
    address: "123 Bergen Ave, Bergen County, NJ 07000",
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
    "Allendale", "Alpine", "Bergenfield", "Bogota", "Carlstadt", 
    "Cliffside Park", "Closter", "Cresskill", "Demarest", "Dumont", 
    "East Rutherford", "Edgewater", "Elmwood Park", "Emerson", 
    "Englewood", "Englewood Cliffs", "Fair Lawn", "Fairview", 
    "Fort Lee", "Franklin Lakes", "Garfield", "Glen Rock", 
    "Hackensack", "Harrington Park", "Hasbrouck Heights"
  ],
  aboutSection: {
    title: "About Our Bergen County Services",
    description: "Serving Bergen County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail."
  },
  seo: {
    title: "Professional Cleaning Services in Bergen County, NJ | Clensy",
    description: "Clensy offers professional cleaning services in Bergen County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.",
    keywords: [
      "cleaning services Bergen County",
      "house cleaning Bergen County",
      "commercial cleaning Bergen County",
      "professional cleaners Bergen",
      "maid service Bergen County",
      "office cleaning Bergen"
    ]
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await BergenLocation.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await BergenLocation.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Bergen location data" },
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
    
    const updatedData = await BergenLocation.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Bergen location data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Bergen location data" },
      { status: 500 }
    );
  }
}
