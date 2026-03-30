import mongoose from "mongoose";

// Individual FAQ Question Schema - Enhanced for comprehensive FAQ system
const FAQQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    index: 'text', // Enable text search
  },
  answer: {
    type: String,
    required: true,
    index: 'text', // Enable text search
  },
  category: {
    type: String,
    required: true,
    enum: [
      'general',
      'services',
      'pricing',
      'booking',
      'scheduling',
      'payment',
      'cleaning-products',
      'staff',
      'insurance',
      'policies',
      'special-requests',
      'maintenance',
      'commercial',
      'residential',
      'emergency'
    ],
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  priority: {
    type: Number,
    default: 0, // Higher numbers = higher priority (shown first)
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound text index for better search
FAQQuestionSchema.index({ 
  question: 'text', 
  answer: 'text', 
  tags: 'text' 
}, {
  weights: {
    question: 10,
    answer: 5,
    tags: 3
  }
});

// Create unique index on question text to prevent exact duplicates
FAQQuestionSchema.index({ question: 1 }, { unique: true });

const FAQItemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const FAQCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: [FAQItemSchema],
    required: true,
  },
});

const StillHaveQuestionsCardSchema = new mongoose.Schema({
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
  },
  buttonLink: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const TrustIndicatorSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const FAQSchema = new mongoose.Schema({
  heroSection: {
    topLabel: {
      type: String,
      required: true,
      default: "Answers to your questions",
    },
    heading: {
      type: String,
      required: true,
      default: "Frequently Asked <blue>Questions</blue>",
    },
    description: {
      type: String,
      required: true,
      default:
        "Find answers to common questions about our cleaning services, booking process, and pricing. Can't find what you're looking for? Contact us directly for personalized assistance.",
    },
  },

  faqCategories: {
    general: {
      name: {
        type: String,
        required: true,
        default: "General Questions",
      },
      questions: {
        type: [FAQItemSchema],
        required: true,
        default: [
          {
            question: "What areas do you serve?",
            answer:
              "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties. We serve all major cities and towns within these counties.",
          },
          {
            question: "Are your cleaners background checked?",
            answer:
              "Yes, all of our cleaning professionals undergo thorough background checks before joining our team. We prioritize your safety and security, and only employ trustworthy individuals with verified credentials.",
          },
          {
            question: "Are you insured and bonded?",
            answer:
              "Yes, we are fully insured and bonded. This provides protection for both our clients and our team in the rare event of an accident or damage during service.",
          },
          {
            question: "What cleaning products do you use?",
            answer:
              "We use a combination of industry-grade professional cleaning products and eco-friendly options. If you have specific preferences or concerns about allergies, we're happy to accommodate your needs with alternative products.",
          },
          {
            question: "Do I need to be home during the cleaning?",
            answer:
              "No, you don't need to be home during the cleaning service. Many of our clients provide a key or access instructions. We ensure secure handling of all property access methods and can arrange for secure key return or storage.",
          },
        ],
      },
    },
  },

  stillHaveQuestionsSection: {
    heading: {
      type: String,
      required: true,
      default: "Still Have Questions?",
    },
    description: {
      type: String,
      required: true,
      default: "Here are some other topics our customers frequently ask about.",
    },
    cards: {
      type: [StillHaveQuestionsCardSchema],
      required: true,
      default: [
        {
          title: "First-Time Customers",
          description:
            "Learn what to expect during your first cleaning appointment and how to prepare your space.",
          buttonText: "Get More Information",
          buttonLink: "/contact",
          icon: "clock",
        },
        {
          title: "Pricing & Estimates",
          description:
            "Learn more about our transparent pricing structure and how to get an accurate estimate for your property.",
          buttonText: "View Pricing",
          buttonLink: "#",
          icon: "credit-card",
        },
        {
          title: "Service Areas",
          description:
            "Find out if we service your area and learn about our coverage throughout Northern New Jersey.",
          buttonText: "Check Service Areas",
          buttonLink: "/locations/bergen",
          icon: "calendar",
        },
      ],
    },
  },

  contactSection: {
    heading: {
      type: String,
      required: true,
      default: "Can't Find Your Answer?",
    },
    description: {
      type: String,
      required: true,
      default:
        "Our customer service team is ready to help with any questions not addressed in our FAQ section. Contact us for personalized assistance.",
    },
    emailSection: {
      heading: {
        type: String,
        required: true,
        default: "Email Us",
      },
      description: {
        type: String,
        required: true,
        default: "Send us a message and we'll respond within 24 hours.",
      },
      email: {
        type: String,
        required: true,
        default: "info@clensy.com",
      },
    },
    callSection: {
      heading: {
        type: String,
        required: true,
        default: "Call Us",
      },
      description: {
        type: String,
        required: true,
        default: "Speak with our customer service team directly.",
      },
      phone: {
        type: String,
        required: true,
        default: "(551) 305-4081",
      },
    },
    contactButtonText: {
      type: String,
      required: true,
      default: "Contact Us",
    },
  },

  trustIndicatorsSection: {
    indicators: {
      type: [TrustIndicatorSchema],
      required: true,
      default: [
        {
          number: "1000+",
          description: "Questions Answered",
        },
        {
          number: "24/7",
          description: "Online Support",
        },
        {
          number: "5.0",
          description: "Customer Satisfaction",
        },
        {
          number: "15+",
          description: "Years of Experience",
        },
      ],
    },
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create models
const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);
const FAQQuestion = mongoose.models.FAQQuestion || mongoose.model("FAQQuestion", FAQQuestionSchema);

export default FAQ;
export { FAQQuestion };
