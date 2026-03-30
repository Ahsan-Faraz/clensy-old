import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/db/mongodb";
import OtherCommercialCleaning from "@/models/OtherCommercialCleaning";

export async function GET() {
  try {
    await dbConnect();

    let data = await OtherCommercialCleaning.findOne();

    if (!data) {
      // Create default data if none exists
      data = await OtherCommercialCleaning.create({});
    } else {
      // Check if pricing data exists, if not, add defaults
      if (!data.pricingHeading || !data.pricingPlans || data.pricingPlans.length === 0) {
        const defaultPricingData = {
          pricingHeading: "Tailored Cleaning Plans & Pricing",
          pricingSubheading: "We understand that each commercial space has unique requirements. Our flexible packages are designed to provide exactly what your business needs.",
          pricingPlans: [
            {
              planName: "Essential Clean",
              planSubtitle: "For smaller businesses",
              planPrice: "Custom",
              planPriceUnit: "/ visit",
              planFeatures: [
                "Basic area cleaning & sanitization",
                "Restroom maintenance",
                "Trash removal & replacement",
                "High-touch surface disinfection",
              ],
              planButtonText: "Get Quote",
              planButtonLink: "/contact",
              isPopular: false,
              planColor: "blue-600",
            },
            {
              planName: "Professional Clean",
              planSubtitle: "For most businesses",
              planPrice: "Custom",
              planPriceUnit: "/ visit",
              planFeatures: [
                "All Essential Clean services",
                "Deep floor cleaning & treatment",
                "Window & glass cleaning",
                "Dusting of high & hard-to-reach areas",
                "Industry-specific sanitization",
              ],
              planButtonText: "Get Quote",
              planButtonLink: "/contact",
              isPopular: true,
              planColor: "blue-700",
            },
            {
              planName: "Premium Clean",
              planSubtitle: "For specialized facilities",
              planPrice: "Custom",
              planPriceUnit: "/ visit",
              planFeatures: [
                "All Professional Clean services",
                "Advanced equipment sanitization",
                "Specialized surface treatments",
                "Dedicated account manager",
                "24/7 emergency cleaning response",
              ],
              planButtonText: "Get Quote",
              planButtonLink: "/contact",
              isPopular: false,
              planColor: "blue-600",
            },
          ],
          pricingCustomSectionHeading: "Need More Flexibility?",
          pricingCustomSectionDescription: "We understand that every business has unique requirements. Contact us for a completely customized cleaning plan tailored to your specific needs, budget, and schedule.",
          pricingCustomButton1Text: "Contact for Custom Quote",
          pricingCustomButton1Link: "/contact",
          pricingCustomButton2Text: "Call (800) 555-1234",
          pricingCustomButton2Link: "/tel:+18005551234",
        };

        // Update the document with pricing data
        data = await OtherCommercialCleaning.findByIdAndUpdate(
          data._id,
          { $set: defaultPricingData },
          { new: true }
        );
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching other commercial cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    let data = await OtherCommercialCleaning.findOne();

    if (data) {
      // Update existing data
      data = await OtherCommercialCleaning.findByIdAndUpdate(data._id, body, {
        new: true,
      });
    } else {
      // Create new data
      data = await OtherCommercialCleaning.create(body);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating other commercial cleaning data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 }
    );
  }
}
