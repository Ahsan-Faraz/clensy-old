import mongoose from "mongoose";

const hudsonLocationSchema = new mongoose.Schema({
  heroSection: {
    title: String,
    subtitle: String,
    backgroundImage: String,
    ctaButton1: String,
    ctaButton2: String
  },
  contactSection: {
    title: String,
    phone: String,
    email: String,
    address: String,
    hours: [{
      day: String,
      hours: String
    }]
  },
  serviceAreas: [String],
  aboutSection: {
    title: String,
    description: String
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, { timestamps: true });

const HudsonLocation = mongoose.models.HudsonLocation || mongoose.model("HudsonLocation", hudsonLocationSchema);

export default HudsonLocation; 