import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import ChecklistPage from "@/models/ChecklistPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heroSection: {
    heading: "Our 50-Point Cleaning Checklist",
    description: "Discover how we ensure your home receives a thorough clean, every time",
    buttonText: "Book Your Cleaning"
  },
  interactiveGuideSection: {
    heading: "Interactive Room Cleaning Guide",
    description: "Click on any room to see our detailed cleaning checklist"
  },
  mainChecklistSection: {
    heading: "Our 50-Point Checklist includes:",
    description: "We've developed a comprehensive cleaning system that ensures nothing is overlooked",
    routineButtonText: "Routine Cleaning",
    deepButtonText: "Deep Cleaning",
    movingButtonText: "Move In/Out Cleaning",
    roomTitles: {
      kitchen: "Kitchen",
      bathroom: "Bathrooms",
      bedroom: "Bedrooms",
      living: "Other Living Areas"
    },
    cleaningItems: {
      routine: {
        kitchen: [
          "Appliance exteriors cleaned (interiors upon request)",
          "Microwave exterior/interior cleaned",
          "Tables and chairs cleaned",
          "Countertops and backsplash disinfected (all items removed and replaced)",
          "Cabinet fronts cleaned",
          "Sinks scrubbed and disinfected (dishes upon request)",
          "Floor vacuumed and/or washed",
          "Baseboards dusted",
          "Fingerprints removed from all woodwork, doorframes and switch plates",
          "Trash emptied",
          "Windowsills cleaned (blinds dusted upon request)"
        ],
        bathroom: [
          "Tub and shower tiles scrubbed, disinfected and rinsed",
          "Toilets disinfected inside and out",
          "Chrome fixtures cleaned and shined",
          "Towels neatly hung and folded",
          "Countertops disinfected (all items removed and replaced)",
          "Cabinet front cleaned",
          "Sinks scrubbed and disinfected",
          "Mirrors cleaned",
          "Floors vacuumed and/or washed",
          "Baseboards dusted",
          "Trash emptied",
          "Fingerprints removed from all woodwork, doorframes and switch plates"
        ],
        bedroom: [
          "Beds made (linens changed upon request)",
          "Lamps cleaned and lampshades dusted",
          "Picture frames dusted",
          "Furniture dusted - top, front and underneath",
          "Floors vacuumed and/or washed (under bed if accessible)",
          "Windowsills cleaned (blinds dusted upon request)",
          "Baseboards dusted",
          "Fingerprints removed from all woodwork, doorframes and switch plates",
          "Trash emptied",
          "Mirrors cleaned"
        ],
        living: [
          "Upholstered furniture vacuumed",
          "Cushions and pillows fluffed and straightened",
          "Ceiling fans dusted (height restrictions apply)",
          "Lamps cleaned and lampshades dusted",
          "Picture frames dusted",
          "Furniture dusted - on top, on front and underneath",
          "Floors vacuumed and/or washed",
          "Baseboards dusted",
          "Windowsills cleaned (blinds dusted upon request)",
          "Fingerprints removed from all woodwork, doorframes and switch plates",
          "Trash emptied",
          "Mirrors cleaned"
        ]
      },
      deep: {
        kitchen: [
          "All routine cleaning items",
          "Inside of refrigerator cleaned and sanitized",
          "Inside of oven cleaned",
          "Inside of dishwasher cleaned",
          "Inside of cabinets and drawers cleaned",
          "Light fixtures removed and cleaned",
          "Walls spot cleaned",
          "Backsplash deep cleaned with degreaser",
          "All small appliances moved and cleaned beneath",
          "Hood range and filter deep cleaned",
          "Pantry reorganized and cleaned"
        ],
        bathroom: [
          "All routine cleaning items",
          "Deep cleaning of shower and tub (soap scum, hard water stains removed)",
          "Tile and grout deep cleaned",
          "Inside of vanity cabinets cleaned",
          "Exhaust fan cleaned",
          "Light fixtures cleaned",
          "All drawers cleaned inside",
          "Walls spot cleaned",
          "All toiletry items organized",
          "Inside of medicine cabinet cleaned",
          "Shower curtain washed or replaced (if provided)"
        ],
        bedroom: [
          "All routine cleaning items",
          "Mattress vacuumed",
          "Under bed thoroughly cleaned",
          "Inside of nightstands cleaned",
          "Inside of dresser drawers cleaned upon request",
          "Closet floors vacuumed",
          "Light fixtures cleaned",
          "Walls spot cleaned",
          "Window tracks cleaned",
          "Ceiling fans deep cleaned",
          "Curtains/drapes vacuumed"
        ],
        living: [
          "All routine cleaning items",
          "Furniture moved and cleaned beneath",
          "Bookshelves thoroughly dusted",
          "Entertainment centers cleaned inside and out",
          "Light fixtures cleaned thoroughly",
          "Ceiling fans deep cleaned",
          "Wall decor dusted and cleaned",
          "Walls spot cleaned",
          "Window tracks cleaned",
          "Blinds deep cleaned",
          "Upholstery spot cleaned as needed"
        ]
      },
      moving: {
        kitchen: [
          "All deep cleaning items",
          "Cabinet shelves thoroughly cleaned",
          "All appliances thoroughly cleaned inside and out",
          "Removal of all food items upon request",
          "Thorough cleaning inside all cabinets and drawers",
          "Walls completely washed top to bottom",
          "Door frames and doors fully washed",
          "Deep cleaning of light fixtures and exhaust fans",
          "Moldings and trim cleaned",
          "Areas behind refrigerator and oven cleaned"
        ],
        bathroom: [
          "All deep cleaning items",
          "Complete wall washing",
          "Deep clean of toilet bowl, tank, and base",
          "Descaling of all fixtures",
          "Deep cleaning behind toilet",
          "Complete cleaning of all drawers and cabinets",
          "Door frames and doors fully washed",
          "Moldings and trim cleaned",
          "Bathtub deep cleaned (including jets if applicable)",
          "Shower door tracks thoroughly cleaned"
        ],
        bedroom: [
          "All deep cleaning items",
          "Complete wall washing",
          "Thorough cleaning inside all furniture to be left behind",
          "Complete baseboards cleaning",
          "Complete closet cleaning (shelves, racks, floors)",
          "Door frames and doors fully washed",
          "Window frames cleaned",
          "Light switch plates cleaned and sanitized",
          "Moldings and trim cleaned",
          "HVAC vents cleaned"
        ],
        living: [
          "All deep cleaning items",
          "Complete wall washing",
          "All cabinets and shelves thoroughly cleaned (inside and out)",
          "Light fixtures completely cleaned",
          "Door frames and doors fully washed",
          "Complete window cleaning including frames",
          "Deep cleaning of all vents and returns",
          "Thorough cleaning in all corners",
          "Moldings and trim cleaned",
          "Fireplace cleaned (if applicable)"
        ]
      }
    }
  },
  ctaSection: {
    heading: "Ready for the Clensy Difference?",
    description: "Experience our 50-point checklist in action. Book your cleaning today and see the difference a thorough clean makes.",
    buttonText: "Book Your Cleaning Today"
  }
};

// Get checklist page data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await ChecklistPage.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!data) {
      data = await ChecklistPage.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch checklist page data" },
      { status: 500 }
    );
  }
}

// Update checklist page data
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
    
    // Update or create the checklist page
    const updatedData = await ChecklistPage.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Checklist page updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update checklist page" },
      { status: 500 }
    );
  }
}