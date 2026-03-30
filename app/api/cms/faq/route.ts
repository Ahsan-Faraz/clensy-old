import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import FAQ from "@/models/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultData = {
  heroSection: {
    topLabel: "Answers to your questions",
    heading: "Frequently Asked <blue>Questions</blue>",
    description:
      "Find answers to common questions about our cleaning services, booking process, and pricing. Can't find what you're looking for? Contact us directly for personalized assistance.",
  },
  faqCategories: {
    general: {
      name: "General Questions",
      questions: [
        {
          question: "What areas do you serve?",
          answer:
            "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties. We serve all major cities and towns within these counties.",
        },
        {
          question: "Are your cleaners background checked?",
          answer:
            "Yes, all of our cleaning professionals undergo thorough background checks before joining our team. We prioritize your safety and security, and only employ trustworthy individuals with verified credentials.",
        },
        {
          question: "Are you insured and bonded?",
          answer:
            "Yes, we are fully insured and bonded. This provides protection for both our clients and our team in the rare event of an accident or damage during service.",
        },
        {
          question: "What cleaning products do you use?",
          answer:
            "We use a combination of industry-grade professional cleaning products and eco-friendly options. If you have specific preferences or concerns about allergies, we're happy to accommodate your needs with alternative products.",
        },
        {
          question: "Do I need to be home during the cleaning?",
          answer:
            "No, you don't need to be home during the cleaning service. Many of our clients provide a key or access instructions. We ensure secure handling of all property access methods and can arrange for secure key return or storage.",
        },
      ],
    },
  },
  stillHaveQuestionsSection: {
    heading: "Still Have Questions?",
    description:
      "Here are some other topics our customers frequently ask about.",
    cards: [
      {
        title: "First-Time Customers",
        description:
          "Learn what to expect during your first cleaning appointment and how to prepare your space.",
        buttonText: "Get More Information",
        buttonLink: "/contact",
        icon: "clock",
      },
      {
        title: "Pricing & Estimates",
        description:
          "Learn more about our transparent pricing structure and how to get an accurate estimate for your property.",
        buttonText: "View Pricing",
        buttonLink: "/booking",
        icon: "credit-card",
      },
      {
        title: "Service Areas",
        description:
          "Find out if we service your area and learn about our coverage throughout Northern New Jersey.",
        buttonText: "Check Service Areas",
        buttonLink: "/locations/bergen",
        icon: "calendar",
      },
    ],
  },
  contactSection: {
    heading: "Can't Find Your Answer?",
    description:
      "Our customer service team is ready to help with any questions not addressed in our FAQ section. Contact us for personalized assistance.",
    emailSection: {
      heading: "Email Us",
      description: "Send us a message and we'll respond within 24 hours.",
      email: "info@clensy.com",
    },
    callSection: {
      heading: "Call Us",
      description: "Speak with our customer service team directly.",
      phone: "(551) 305-4081",
    },
    contactButtonText: "Contact Us",
  },
  trustIndicatorsSection: {
    indicators: [
      {
        number: "1000+",
        description: "Questions Answered",
      },
      {
        number: "24/7",
        description: "Online Support",
      },
      {
        number: "5.0",
        description: "Customer Satisfaction",
      },
      {
        number: "15+",
        description: "Years of Experience",
      },
    ],
  },
};

export async function GET() {
  try {
    await connectToDatabase();
    let data = await FAQ.findOne().sort({ updatedAt: -1 });

    if (!data) {
      data = await FAQ.create(defaultData);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQ section data" },
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

    const updatedData = await FAQ.findOneAndUpdate(
      {},
      {
        ...data,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "FAQ section updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update FAQ section" },
      { status: 500 }
    );
  }
}
