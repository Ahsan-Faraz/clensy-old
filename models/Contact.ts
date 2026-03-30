import mongoose from 'mongoose';

// Schema for stats indicators
const StatIndicatorSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

// Schema for service tags
const ServiceTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

// Schema for contact information cards
const ContactCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactValue: {
    type: String,
    required: true,
  }
});

// Schema for business hours
const BusinessHourSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  }
});

// Schema for office location
const OfficeLocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  cityStateZip: {
    type: String,
    required: true,
  }
});

// Schema for immediate assistance card
const ImmediateAssistanceSchema = new mongoose.Schema({
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

// Main Contact schema
const ContactSchema = new mongoose.Schema({
  heroSection: {
    topLabel: {
      type: String,
      required: true,
      default: "We'd Love To Hear From You"
    },
    heading: {
      type: String,
      required: true,
      default: "Let's Start A <blue>Conversation</blue>"
    },
    description: {
      type: String,
      required: true,
      default: "Have questions or need a personalized cleaning solution? Our team is ready to provide the support you need for all your requirements."
    },
    sendMessageButtonText: {
      type: String,
      required: true,
      default: "Send a Message"
    },
    supportText: {
      type: String,
      required: true,
      default: "24/7 Support"
    },
    responseText: {
      type: String,
      required: true,
      default: "Quick Response"
    },
    image: {
      type: String,
      required: true,
      default: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847694/shutterstock_2478230727_bt7fos.jpg"
    }
  },

  trustSection: {
    mainText: {
      type: String,
      required: true,
      default: "Trusted by 5,000+ Customers"
    },
    subtitle: {
      type: String,
      required: true,
      default: "Professional cleaning for every need"
    },
    serviceTags: {
      type: [ServiceTagSchema],
      required: true,
      default: [
        { name: "Residential" },
        { name: "Commercial" },
        { name: "Specialized" }
      ]
    }
  },

  statsSection: {
    indicators: {
      type: [StatIndicatorSchema],
      required: true,
      default: [
        {
          number: "24/7",
          description: "Customer Support"
        },
        {
          number: "1h", 
          description: "Response Time"
        },
        {
          number: "4.9",
          description: "Customer Rating"
        },
        {
          number: "100%",
          description: "Satisfaction Guarantee"
        }
      ]
    }
  },

  contactInformation: {
    sectionTitle: {
      type: String,
      required: true,
      default: "Contact Information"
    },
    phone: {
      title: {
        type: String,
        required: true,
        default: "Phone"
      },
      description: {
        type: String,
        required: true,
        default: "Speak directly with our customer service team"
      },
      phoneNumber: {
        type: String,
        required: true,
        default: "(123) 456-7890"
      }
    },
    email: {
      title: {
        type: String,
        required: true,
        default: "Email"
      },
      description: {
        type: String,
        required: true,
        default: "Get a response within 24 hours"
      },
      emailAddress: {
        type: String,
        required: true,
        default: "info@clensy.com"
      }
    },
    officeLocation: {
      title: {
        type: String,
        required: true,
        default: "Office Location"
      },
      description: {
        type: String,
        required: true,
        default: "Our headquarters"
      },
      addressLine1: {
        type: String,
        required: true,
        default: "123 Cleaning Street"
      },
      addressLine2: {
        type: String,
        required: true,
        default: "Suite 456"
      },
      cityStateZip: {
        type: String,
        required: true,
        default: "Jersey City, NJ 07302"
      }
    },
    businessHours: {
      title: {
        type: String,
        required: true,
        default: "Business Hours"
      },
      description: {
        type: String,
        required: true,
        default: "When you can reach us"
      },
      hours: {
        type: [BusinessHourSchema],
        required: true,
        default: [
          {
            day: "Monday - Friday",
            hours: "8:00 AM - 6:00 PM"
          },
          {
            day: "Saturday",
            hours: "9:00 AM - 3:00 PM"
          },
          {
            day: "Sunday",
            hours: "Closed"
          }
        ]
      }
    },
    immediateAssistance: {
      title: {
        type: String,
        required: true,
        default: "Need Immediate Assistance?"
      },
      description: {
        type: String,
        required: true,
        default: "Our customer support team is available during business hours to help you with any questions."
      },
      buttonText: {
        type: String,
        required: true,
        default: "Call Us Now"
      }
    }
  },

  consultationSection: {
    heading: {
      type: String,
      required: true,
      default: "Need a Personalized Cleaning Solution?"
    },
    description: {
      type: String,
      required: true,
      default: "Schedule a consultation with our cleaning experts to discuss your unique requirements and get a customized cleaning plan tailored to your specific needs."
    },
    buttonText: {
      type: String,
      required: true,
      default: "Schedule a Consultation"
    }
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);