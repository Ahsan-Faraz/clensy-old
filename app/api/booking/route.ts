import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Pricing calculation logic
function calculatePricing(bookingData: any) {
  const baseRates = {
    routine: {
      house: { base: 120, perBedroom: 25, perBathroom: 20 },
      apartment: { base: 80, perBedroom: 20, perBathroom: 15 },
      condo: { base: 100, perBedroom: 20, perBathroom: 15 },
      office: { base: 150, perSqFt: 0.15 },
      commercial: { base: 200, perSqFt: 0.2 },
    },
    deep: {
      house: { base: 200, perBedroom: 40, perBathroom: 30 },
      apartment: { base: 150, perBedroom: 35, perBathroom: 25 },
      condo: { base: 180, perBedroom: 35, perBathroom: 25 },
      office: { base: 250, perSqFt: 0.25 },
      commercial: { base: 350, perSqFt: 0.3 },
    },
    moving: {
      house: { base: 300, perBedroom: 50, perBathroom: 40 },
      apartment: { base: 200, perBedroom: 40, perBathroom: 30 },
      condo: { base: 250, perBedroom: 40, perBathroom: 30 },
      office: { base: 400, perSqFt: 0.35 },
      commercial: { base: 500, perSqFt: 0.4 },
    },
  };

  const { serviceType, propertyType, propertySize } = bookingData;
  const rates =
    baseRates[serviceType as keyof typeof baseRates]?.[
      propertyType as keyof typeof baseRates.routine
    ];

  if (!rates) return { basePrice: 0, addOnsTotal: 0, total: 0 };

  let basePrice = rates.base;

  if (propertyType === "office" || propertyType === "commercial") {
    basePrice += (propertySize.squareFootage || 1000) * (rates as any).perSqFt;
  } else {
    basePrice += (propertySize.bedrooms || 1) * (rates as any).perBedroom;
    basePrice += (propertySize.bathrooms || 1) * (rates as any).perBathroom;
  }

  // Add-on services pricing
  const addOnPrices: { [key: string]: number } = {
    "inside-oven": 30,
    "inside-fridge": 25,
    "inside-cabinets": 40,
    "window-cleaning": 35,
    "garage-cleaning": 50,
    "basement-cleaning": 60,
  };

  const addOnsTotal = (bookingData.addOnServices || []).reduce(
    (total: number, addon: any) => {
      return total + (addOnPrices[addon.service] || 0);
    },
    0
  );

  // Frequency discount
  const frequencyDiscounts = {
    weekly: 0.15,
    "bi-weekly": 0.1,
    monthly: 0.05,
    "one-time": 0,
  };

  const discount =
    frequencyDiscounts[
      bookingData.frequency as keyof typeof frequencyDiscounts
    ] || 0;
  const subtotal = basePrice + addOnsTotal;
  const total = subtotal * (1 - discount);

  return {
    basePrice: Math.round(basePrice),
    addOnsTotal: Math.round(addOnsTotal),
    total: Math.round(total),
  };
}

// Email templates
function generateCustomerEmail(booking: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #007bff, #0056b3); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Booking Confirmation</h1>
        <p style="color: white; margin: 10px 0 0 0;">Thank you for choosing Clensy!</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #333;">Hello ${booking.firstName},</h2>
        <p style="color: #666; line-height: 1.6;">
          We've received your booking request and our team will contact you within 24 hours to confirm your appointment details.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
              booking.serviceType.charAt(0).toUpperCase() +
              booking.serviceType.slice(1)
            } Cleaning</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Property:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
              booking.propertyType.charAt(0).toUpperCase() +
              booking.propertyType.slice(1)
            }</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Address:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
              booking.address.street
            }, ${booking.address.city}, ${booking.address.state} ${
    booking.address.zipCode
  }</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Preferred Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date(
              booking.preferredDate
            ).toLocaleDateString()}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Preferred Time:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
              booking.preferredTime.charAt(0).toUpperCase() +
              booking.preferredTime.slice(1)
            }</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Estimated Total:</strong></td><td style="padding: 8px 0; color: #007bff; font-weight: bold;">$${
              booking.estimatedPrice.total
            }</td></tr>
          </table>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666;"><strong>Next Steps:</strong></p>
          <ul style="color: #666; margin: 10px 0;">
            <li>Our team will call you within 24 hours</li>
            <li>We'll confirm all details and finalize the appointment</li>
            <li>You'll receive a final confirmation email</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666;">Questions? Contact us:</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> (551) 305-4081</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> info@clensy.com</p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: white; margin: 0;">© 2024 Clensy - Professional Cleaning Services</p>
      </div>
    </div>
  `;
}

function generateAdminEmail(booking: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Booking Request</h1>
      </div>
      
      <div style="padding: 20px;">
        <h2>Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.firstName
          } ${booking.lastName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.email
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.phone
          }</td></tr>
        </table>
        
        <h2>Service Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Service Type:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.serviceType
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Frequency:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.frequency
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Preferred Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(
            booking.preferredDate
          ).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Preferred Time:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.preferredTime
          }</td></tr>
        </table>
        
        <h2>Property Information</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Address:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.address.street
          }, ${booking.address.city}, ${booking.address.state} ${
    booking.address.zipCode
  }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Property Type:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.propertyType
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Bedrooms:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.propertySize.bedrooms || "N/A"
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Bathrooms:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${
            booking.propertySize.bathrooms || "N/A"
          }</td></tr>
        </table>
        
        <h2>Pricing</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Base Price:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">$${
            booking.estimatedPrice.basePrice
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Add-ons:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">$${
            booking.estimatedPrice.addOnsTotal
          }</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f8f9fa;"><strong>Total:</strong></td><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #dc3545;">$${
            booking.estimatedPrice.total
          }</td></tr>
        </table>
        
        ${
          booking.specialInstructions
            ? `
        <h2>Special Instructions</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
          ${booking.specialInstructions}
        </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}

// POST endpoint for creating bookings
export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    // Connect to database
    await connectToDatabase();

    // Calculate pricing
    const pricing = calculatePricing(bookingData);

    // Create booking with calculated pricing
    const bookingWithPricing = {
      ...bookingData,
      estimatedPrice: pricing,
      submittedAt: new Date(),
      status: "pending",
    };

    // Save to database
    const newBooking = await Booking.create(bookingWithPricing);

    // Send emails
    try {
      // Email to customer
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: bookingData.email,
        subject: "Booking Confirmation - Clensy Professional Cleaning",
        html: generateCustomerEmail(newBooking),
      });

      // Email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || "admin@clensy.com",
        subject: `New Booking Request from ${bookingData.firstName} ${bookingData.lastName}`,
        html: generateAdminEmail(newBooking),
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
      bookingId: newBooking._id,
      estimatedPrice: pricing,
    });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit booking" },
      { status: 500 }
    );
  }
}

// GET endpoint for retrieving bookings (admin use)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    await connectToDatabase();

    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const bookings = await Booking.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
