import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import About from "@/models/About";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    heading: "About Clensy",
    tagline: "Raising the Standard, One Clean at a Time."
  },
  ourStorySection: {
    heading: "Our Story",
    paragraph1: "Clensy was built to solve a problem — the frustrating experience of unreliable cleaners who are late, don't communicate, and leave you wondering if the job will ever be done right.",
    paragraph2: "We set out to create something better. A company that not only delivers amazing results — but makes the entire experience seamless from start to finish.",
    paragraph3: "Whether you're managing a busy home, multiple Airbnb properties, or a commercial space that needs to stay spotless and presentable, Clensy is your go-to team.",
    image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg",
  },
  whyWeStartedSection: {
    heading: "Why We Started",
    subtitle: "Let's be honest: the cleaning industry is broken.",
    quoteText: "My cleaner didn't show up. No one responded. The job was half-done.",
    paragraph1: "We were tired of the low standards across the industry – Whether it's flaky independent cleaners or cookie-cutter franchises with zero customer service — it's hard to find a company that actually cares and does the job right.",
    paragraph2: "We listened. And then we built Clensy — a cleaning company that actually shows up, delivers exceptional results, and treats every client like a priority.",
    paragraph3: "We know that when you book a cleaning, you want peace of mind — not more headaches."
  },
  whatMakesUsDifferentSection: {
    heading: "What Makes Us Different?",
    residentialCommercial: {
      title: "Residential & Commercial Cleaning",
      paragraph1: "From homes and apartments to offices, retail spaces, gyms, medical facilities, and even construction sites — if it's indoors and needs to be cleaned, we've got it covered.",
      paragraph2: "Not sure if we handle your specific needs? Chances are, we do. If you're looking for something custom, head over to our Contact Us page or give us a call. We're happy to create a tailored plan that fits exactly what you're looking for."
    },
    eliteTeam: {
      title: "Elite Team",
      paragraph1: "Out of every 100 applicants, we only hire 1 cleaner. Seriously. Our hiring process is extensive, and only the best make it through.",
      paragraph2: "We're fully licensed, bonded, and insured, so you can feel confident knowing your home, business, or property is in trusted, professional hands.",
      image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847481/shutterstock_2200915291_vewsyn.jpg",
    }
  },
  clientFocusedTech: {
    heading: "Client-Focused Tech",
    features: [
      "Customer portal to manage your bookings",
      "Text/email reminders before every job",
      "Real-time ETA when your cleaner is en route",
      "Easy rescheduling, communication, and payment — all online"
    ]
  },
  whoWeServeSection: {
    heading: "Who We Serve",
    subtitle: "Clensy is made for people and businesses who expect more from a cleaning company.",
    customerTypes: [
      {
        title: "Busy parents",
        description: "Who need a safe, clean home without the stress"
      },
      {
        title: "Professionals and entrepreneurs", 
        description: "Focused on growing, not cleaning"
      },
      {
        title: "Property managers and business owners",
        description: "Who need reliable commercial upkeep"
      },
      {
        title: "Airbnb hosts",
        description: "Who demand fast, spotless turnovers"
      },
      {
        title: "Contractors or developers",
        description: "Who need sharp post-construction cleanup"
      },
      {
        title: "Anyone who values quality",
        description: "And needs a trustworthy cleaning service"
      }
    ]
  },
  ourMissionSection: {
    heading: "Our Mission",
    paragraph1: "We're obsessed with making the cleaning process feel effortless for our clients. You book. We show up. We do the job right — the first time.",
    paragraph2: "No rescheduling nightmares. No communication breakdowns. No wondering if your space was actually cleaned.",
    paragraph3: "With Clensy, you get a team that's committed to your satisfaction — from the first message to the final wipe-down.",
    paragraph4: "If you're looking for a company that understands the value of your time, respects your space, and consistently delivers results — welcome to Clensy.",
    closingLine: "We're here to raise the standard."
  },
  ctaSection: {
    heading: "Ready to Experience the Clensy Difference?",
    description: "Join thousands of satisfied customers who've discovered what a truly exceptional cleaning service feels like.",
    bookButtonText: "Book Your Cleaning",
    contactButtonText: "Contact Us"
  }
};


export async function GET() {
  try {
    await connectToDatabase();
    let data = await About.findOne().sort({ updatedAt: -1 });
    
    
    if (!data) {
      data = await About.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch about section data" },
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
    
    
    const updatedData = await About.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "About section updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update about section" },
      { status: 500 }
    );
  }
}