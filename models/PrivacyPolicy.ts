import mongoose from 'mongoose';

const PrivacyPolicySchema = new mongoose.Schema({
  heroSection: {
    heading: {
      type: String,
      required: true,
      default: "Privacy Policy"
    },
    description: {
      type: String,
      required: true,
      default: "Your privacy is important to us. Learn how we collect, use, and protect your information."
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
  smsConsent: {
    description: {
      type: String,
      required: true,
      default: "By providing your phone number to Clensy Cleaning, you are consenting to receive SMS messages related to the services you've requested, such as appointment reminders, service confirmations, and promotions. Your SMS consent will not be shared with third parties for marketing purposes."
    },
    optOutInstructions: {
      type: String,
      required: true,
      default: "You can opt-out at any time by replying \"STOP\" to any SMS message."
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.PrivacyPolicy || mongoose.model('PrivacyPolicy', PrivacyPolicySchema);