import mongoose from 'mongoose';


const FeatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clensy: {
    type: Boolean,
    required: true,
    default: true
  },
  others: {
    type: Boolean,
    required: true,
    default: false
  },
  icon: {
    type: String, 
    required: true,
  }
});


const ComparisonSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: "The Clensy <blue>Difference</blue>"
  },
  description: {
    type: String,
    required: true,
    default: "We're leading the cleaning industry in customer satisfaction and service quality. Try Clensy and see why cleaning is a big deal to us."
  },
  features: [FeatureSchema],
  buttonText: {
    type: String,
    required: true,
    default: "Experience the Clensy Difference"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Comparison || mongoose.model('Comparison', ComparisonSchema);