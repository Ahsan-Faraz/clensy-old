import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import TermsOfService from "@/models/TermsOfService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    heading: "Terms of Service",
    description: "Please read these terms and conditions carefully before using our services."
  },
  companyInfo: {
    websiteUrl: "https://clensycleaning.com",
    email: "contact@clensycleaning.com",
    phone: "1-800-CLENSY"
  },
  sections: [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.",
      order: 1
    },
    {
      title: "Service Description",
      content: "Clensy Cleaning provides professional cleaning services for residential and commercial properties. Our services include but are not limited to routine cleaning, deep cleaning, post-construction cleaning, and specialized cleaning services as described on our website.",
      order: 2
    },
    {
      title: "Booking and Scheduling",
      content: "All service bookings must be made through our website, phone, or authorized representatives. We reserve the right to accept or decline any service request. Scheduling is subject to availability and confirmation by our team.",
      order: 3
    },
    {
      title: "Cancellation Policy",
      content: "We require at least 24 hours notice for any cancellation or rescheduling of services. Late cancellations or no-shows may result in a cancellation fee or forfeiture of any prepaid amounts.",
      order: 4
    },
    {
      title: "Payment Terms",
      content: "Payment is required at the time of booking or upon completion of services as specified. We accept major credit cards and other payment methods as indicated on our website. Prices are subject to change without notice.",
      order: 5
    }
  ],
  agreementSection: {
    description: "By using our services, you agree to these terms and conditions. If you do not agree to these terms, please do not use our services.",
    lastUpdated: "September 18, 2025"
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await TermsOfService.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await TermsOfService.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch terms of service data" },
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
    
    const updatedData = await TermsOfService.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Terms of Service updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update terms of service" },
      { status: 500 }
    );
  }
}