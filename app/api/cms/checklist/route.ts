import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Checklist from "@/models/Checklist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heading: "Our 50-Point Cleaning Checklist",
  description: "We don't miss a spot. Here's our comprehensive cleaning checklist for every room in your home.",
  checklistItems: {
    routine: {
      living: [
        "Sweep, Vacuum, & Mop Floors",
        "Upholstered furniture vacuumed",
        "Dust all surfaces and decor",
        "Dust electronics and TV stands",
        "Fluff and straighten couch cushions & pillows",
        "Clean mirrors and glass surfaces",
        "Light (5 minutes) Organization of room",
        "Trash emptied"
      ],
      kitchen: [
        "Sweep, Vacuum, & Mop Floors",
        "Wipe down countertops",
        "Wipe down Stove Top",
        "Clean exterior of appliances",
        "Sinks scrubbed and disinfected (dishes upon request)",
        "Wipe exterior of cabinets and handles",
        "Clean Stove Top",
        "Trash emptied"
      ],
      bathroom: [
        "Sweep, Vacuum, & Mop Floors",
        "Scrub and sanitize showers and tubs",
        "Clean and disinfect toilets",
        "Scrub and disinfect sink and countertops",
        "Chrome fixtures cleaned and shined",
        "Clean mirrors",
        "Towels neatly hung and folded",
        "Trash Emptied"
      ],
      bedroom: [
        "Sweep, Vacuum, & Mop Floors",
        "Beds made, linens changed (if linens are left on bed)",
        "Dust bedroom shelving, night stand, & bed frame",
        "Picture frames dusted",
        "Mirrors Cleaned",
        "Light (5 minutes) Organization of room",
        "Ensure overall room looks neat, tidy, and \"hotel-fresh\"",
        "Trash Emptied"
      ]
    },
    deep: {
      living: [
        "Everything in routine +",
        "Vacuum inside couch cushions (if removable)",
        "Ceiling fans and light fixtures dusted",
        "Remove cobwebs from corners and ceilings",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Behind/under furniture",
        "Window Sills"
      ],
      kitchen: [
        "Everything in routine +",
        "Clean inside microwave",
        "Kitchen Backsplash",
        "Degrease Stovetop",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Tables, chairs, & behind/under furniture",
        "Window Sills"
      ],
      bathroom: [
        "Everything in routine +",
        "Remove hard water stains (where possible)",
        "Scrub grout lines (moderate scrubbing)",
        "Ceiling fans and light fixtures dusted",
        "Dust vent covers and ceiling corners",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Window Sills"
      ],
      bedroom: [
        "Everything in routine +",
        "Ceiling fans and light fixtures dusted",
        "Remove cobwebs from corners and ceilings",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Behind/under furniture",
        "Window Sills",
        "Wipe down decor items (vases, candle holders, etc.)"
      ]
    },
    moving: {
      living: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Dust and wipe all baseboards and molding",
        "Clean interior window glass and wipe window sills",
        "Remove cobwebs from ceilings and corners",
        "Clean doors, handles, and light switches",
        "Dust and wipe ceiling fans and light fixtures",
        "Clean inside closets and shelving (if any)",
        "Trash Emptied"
      ],
      kitchen: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Clean and disinfect inside and outside of all cabinets and drawers",
        "Clean inside and outside of refrigerator",
        "Clean inside and outside of oven",
        "Scrub and disinfect sink and faucet",
        "Wipe all countertops and backsplash",
        "Clean exterior and interior of microwave and other appliances",
        "Wipe down baseboards, door frames, and light switches"
      ],
      bathroom: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Scrub and disinfect toilet (inside, outside, and behind)",
        "Deep clean shower/tub (remove soap scum, mildew, grout scrubbing)",
        "Clean inside and outside of all drawers, cabinets, and vanities",
        "Scrub and polish sink, faucet, and countertops",
        "Clean mirrors and any glass shower doors",
        "Wipe baseboards and door trim",
        "Dust and clean vents, fan covers, and corners"
      ],
      bedroom: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Clean inside closets, including shelving and floor",
        "Wipe baseboards and door trim",
        "Clean interior window glass and wipe window sills",
        "Dust and wipe ceiling fans and light fixtures",
        "Clean light switches, doors, and outlet covers",
        "Remove cobwebs and dust from ceiling corners",
        "Trash Emptied"
      ]
    }
  },
  buttonText: "View Full 50-Point Checklist"
};

// Get checklist section data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await Checklist.findOne().sort({ updatedAt: -1 });

    // If no data exists, create default data
    if (!data) {
      data = await Checklist.create(defaultData);
    }

    const response = NextResponse.json({ success: true, data });
    
    // Add cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch checklist section data" },
      { status: 500 }
    );
  }
}

// Update checklist section data
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

    // Update or create the checklist section
    const updatedData = await Checklist.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Checklist section updated successfully",
      data: updatedData
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update checklist section" },
      { status: 500 }
    );
  }
}