import mongoose from 'mongoose';


const StepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featureText: {
    type: String,
    required: true,
  }
});


const HowItWorksSchema = new mongoose.Schema({
  step1: StepSchema,
  step2: StepSchema,
  step3: StepSchema,
  buttonText: {
    type: String,
    required: true,
    default: "Book Now"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.HowItWorks || mongoose.model('HowItWorks', HowItWorksSchema);