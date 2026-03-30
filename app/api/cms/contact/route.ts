import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Contact from "@/models/Contact";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Default data to use if none exists
const defaultData = {
  heroSection: {
    topLabel: "We'd Love To Hear From You",
    heading: "Let's Start A <blue>Conversation</blue>",
    description: "Have questions or need a personalized cleaning solution? Our team is ready to provide the support you need for all your requirements.",
    sendMessageButtonText: "Send a Message",
    supportText: "24/7 Support",
    responseText: "Quick Response",
    image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847694/shutterstock_2478230727_bt7fos.jpg"
  },
  trustSection: {
    mainText: "Trusted by 5,000+ Customers",
    subtitle: "Professional cleaning for every need",
    serviceTags: [
      { name: "Residential" },
      { name: "Commercial" },
      { name: "Specialized" }
    ]
  },
  statsSection: {
    indicators: [
      {
        number: "24/7",
        description: "Customer Support"
      },
      {
        number: "1h", 
        description: "Response Time"
      },
      {
        number: "4.9",
        description: "Customer Rating"
      },
      {
        number: "100%",
        description: "Satisfaction Guarantee"
      }
    ]
  },
  contactInformation: {
    sectionTitle: "Contact Information",
    phone: {
      title: "Phone",
      description: "Speak directly with our customer service team",
      phoneNumber: "(123) 456-7890"
    },
    email: {
      title: "Email",
      description: "Get a response within 24 hours",
      emailAddress: "info@clensy.com"
    },
    officeLocation: {
      title: "Office Location",
      description: "Our headquarters",
      addressLine1: "123 Cleaning Street",
      addressLine2: "Suite 456",
      cityStateZip: "Jersey City, NJ 07302"
    },
    businessHours: {
      title: "Business Hours",
      description: "When you can reach us",
      hours: [
        {
          day: "Monday - Friday",
          hours: "8:00 AM - 6:00 PM"
        },
        {
          day: "Saturday",
          hours: "9:00 AM - 3:00 PM"
        },
        {
          day: "Sunday",
          hours: "Closed"
        }
      ]
    },
    immediateAssistance: {
      title: "Need Immediate Assistance?",
      description: "Our customer support team is available during business hours to help you with any questions.",
      buttonText: "Call Us Now"
    }
  },
  consultationSection: {
    heading: "Need a Personalized Cleaning Solution?",
    description: "Schedule a consultation with our cleaning experts to discuss your unique requirements and get a customized cleaning plan tailored to your specific needs.",
    buttonText: "Schedule a Consultation"
  }
};

// Get contact page data
export async function GET() {
  try {
    await connectToDatabase();
    let data = await Contact.findOne().sort({ updatedAt: -1 });
    
    // If no data exists, create default data
    if (!data) {
      data = await Contact.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact page data" },
      { status: 500 }
    );
  }
}

// Update contact page data
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
    
    // Update or create the contact page
    const updatedData = await Contact.findOneAndUpdate(
      {}, // Find the first document (or none)
      {
        ...updateData,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Contact page updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact page" },
      { status: 500 }
    );
  }
}