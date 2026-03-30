import mongoose from 'mongoose';

const HeroSectionSchema = new mongoose.Schema({
  topLabel: {
    type: String,
    required: true,
    default: "Professional Cleaning Services"
  },
  heading: {
    type: String,
    required: true,
    default: "Professional cleaning for your home"
  },
  subheading: {
    type: String,
    required: true,
    default: "We make it easy to get your home cleaned. Professional cleaning services tailored to your needs."
  },
  buttonText: {
    type: String,
    required: true,
    default: "See my price"
  },
  feature1: {
    type: String,
    required: true,
    default: "30-second pricing"
  },
  feature2: {
    type: String,
    required: true,
    default: "100% Satisfaction guaranteed"
  },
  backgroundImage: {
    type: String,
    required: true,
    default: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shutterstock_2392393465__3_.jpg-0LMVCo8sUiQDVXDeUykdUtzKRTrvHa.jpeg"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.HeroSection || mongoose.model('HeroSection', HeroSectionSchema);