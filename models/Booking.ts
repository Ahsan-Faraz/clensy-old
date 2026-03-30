import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // Customer Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Property Information
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
        default: "NJ",
      },
      zipCode: {
        type: String,
        required: true,
      },
    },

    propertyType: {
      type: String,
      required: true,
      enum: ["house", "apartment", "condo", "office", "commercial"],
    },

    propertySize: {
      squareFootage: Number,
      bedrooms: Number,
      bathrooms: Number,
      additionalRooms: [String], // kitchen, living room, etc.
    },

    // Service Information
    serviceType: {
      type: String,
      required: true,
      enum: [
        "routine",
        "deep",
        "moving",
        "commercial",
        "airbnb",
        "post-construction",
      ],
    },

    frequency: {
      type: String,
      enum: ["one-time", "weekly", "bi-weekly", "monthly"],
      default: "one-time",
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening", "flexible"],
    },

    // Additional Services
    addOnServices: [
      {
        service: String,
        price: Number,
      },
    ],

    // Special Instructions
    specialInstructions: {
      type: String,
      maxlength: 500,
    },

    // Pricing
    estimatedPrice: {
      basePrice: Number,
      addOnsTotal: Number,
      total: Number,
    },

    // Booking Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    // Marketing
    howDidYouHear: {
      type: String,
      enum: ["google", "facebook", "referral", "website", "other"],
    },

    // System Information
    submittedAt: {
      type: Date,
      default: Date.now,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
BookingSchema.index({ email: 1 });
BookingSchema.index({ submittedAt: -1 });
BookingSchema.index({ status: 1 });

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
