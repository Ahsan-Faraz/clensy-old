import mongoose from 'mongoose';

const ReviewsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: "What People Are <blue>Saying About Us</blue>"
  },
  buttonText: {
    type: String,
    required: true,
    default: "Load More"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Reviews || mongoose.model('Reviews', ReviewsSchema);