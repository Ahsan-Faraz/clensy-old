import mongoose from "mongoose";

const unionLocationSchema = new mongoose.Schema(
  {
    heroSection: {
      title: String,
      subtitle: String,
      backgroundImage: String,
      ctaButton1: String,
      ctaButton2: String,
    },
    contactSection: {
      title: String,
      phone: String,
      email: String,
      address: String,
      hours: [
        {
          day: String,
          hours: String,
        },
      ],
    },
    serviceAreas: [String],
    aboutSection: {
      title: String,
      description: String,
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

const UnionLocation = mongoose.models.UnionLocation || mongoose.model("UnionLocation", unionLocationSchema);

export default UnionLocation; 