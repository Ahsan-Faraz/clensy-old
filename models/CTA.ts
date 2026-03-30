import mongoose from 'mongoose';

// Schema for each CTA card
const CTACardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  }
});

// Schema for the CTA section
const CTASchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: "Home cleaning you can trust"
  },
  description: {
    type: String,
    required: true,
    default: "Book our professional cleaning services today and experience the difference."
  },
  leftCard: CTACardSchema,
  rightCard: CTACardSchema,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.CTA || mongoose.model('CTA', CTASchema);