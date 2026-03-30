import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import PrivacyPolicy from "@/models/PrivacyPolicy";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    heading: "Privacy Policy",
    description: "Your privacy is important to us. Learn how we collect, use, and protect your information."
  },
  companyInfo: {
    websiteUrl: "https://clensycleaning.com",
    email: "contact@clensycleaning.com",
    phone: "1-800-CLENSY"
  },
  sections: [
    {
      title: "Who We Are",
      content: "At Clensy Cleaning, we are committed to maintaining the trust and confidence of all visitors to our website. We value your privacy, and we want you to know that we are not in the business of selling, renting, or trading email lists with other companies or businesses for marketing purposes.",
      order: 1
    },
    {
      title: "Information We Collect",
      content: "We collect personal information that you voluntarily provide when you use our services, interact with our website, or communicate with us. This includes name, email address, phone number, mailing address, and payment information (for transactions).",
      order: 2
    },
    {
      title: "How We Use Your Information",
      content: "Your personal information is used to provide our services, communicate with you about bookings and updates, process payments, and improve our services.",
      order: 3
    },
    {
      title: "Data Protection",
      content: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
      order: 4
    },
    {
      title: "Cookies",
      content: "We use cookies to provide services and enhance your experience on our website. Cookies allow us to track user activity and improve our content. You can clear cookies at any time by adjusting your browser settings.",
      order: 5
    }
  ],
  smsConsent: {
    description: "By providing your phone number to Clensy Cleaning, you are consenting to receive SMS messages related to the services you've requested, such as appointment reminders, service confirmations, and promotions. Your SMS consent will not be shared with third parties for marketing purposes.",
    optOutInstructions: "You can opt-out at any time by replying \"STOP\" to any SMS message."
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await PrivacyPolicy.findOne().sort({ updatedAt: -1 });
    
    if (!data) {
      data = await PrivacyPolicy.create(defaultData);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch privacy policy data" },
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
    
    const updatedData = await PrivacyPolicy.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Privacy Policy updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update privacy policy" },
      { status: 500 }
    );
  }
}