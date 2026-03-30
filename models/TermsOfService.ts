import mongoose from 'mongoose';

const TermsOfServiceSchema = new mongoose.Schema({
  heroSection: {
    heading: {
      type: String,
      required: true,
      default: "Terms of Service"
    },
    description: {
      type: String,
      required: true,
      default: "Please read these terms and conditions carefully before using our services."
    }
  },
  companyInfo: {
    websiteUrl: {
      type: String,
      required: true,
      default: "https://clensycleaning.com"
    },
    email: {
      type: String,
      required: true,
      default: "contact@clensycleaning.com"
    },
    phone: {
      type: String,
      required: true,
      default: "1-800-CLENSY"
    }
  },
  sections: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  agreementSection: {
    description: {
      type: String,
      required: true,
      default: "By using our services, you agree to these terms and conditions. If you do not agree to these terms, please do not use our services."
    },
    lastUpdated: {
      type: String,
      required: true,
      default: "September 18, 2025"
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.TermsOfService || mongoose.model('TermsOfService', TermsOfServiceSchema);