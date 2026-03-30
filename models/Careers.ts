import mongoose from "mongoose";

// Schema for benefits
const BenefitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

// Schema for job positions
const PositionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: '',
  },
});

// Schema for employee testimonials
const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
});

// Main Careers schema
const CareersSchema = new mongoose.Schema({
  heroSection: {
    topLabel: {
      type: String,
      required: true,
      default: "Now Hiring - Multiple Positions",
    },
    heading: {
      type: String,
      required: true,
      default: "Join The Clensy Team",
    },
    description: {
      type: String,
      required: true,
      default:
        "Build a rewarding career with New Jersey's premier cleaning service. We offer competitive pay, great benefits, and opportunities for growth in a supportive environment.",
    },
    primaryButtonText: {
      type: String,
      required: true,
      default: "View Open Positions",
    },
    secondaryButtonText: {
      type: String,
      required: true,
      default: "Apply Now",
    },
    teamMembersCount: {
      type: String,
      required: true,
      default: "50+",
    },
    heroImage: {
      type: String,
      required: true,
      default: "https://www.stathakis.com/hs-fs/hubfs/cleaning-team-more-efficient.png?width=837&height=554&name=cleaning-team-more-efficient.png",
    },
  },

  benefitsSection: {
    heading: {
      type: String,
      required: true,
      default: "Why Work With Us?",
    },
    description: {
      type: String,
      required: true,
      default:
        "We believe in taking care of our team members because happy employees provide the best service to our customers.",
    },
    benefits: {
      type: [BenefitSchema],
      required: true,
      default: [
        {
          title: "Competitive Pay",
          description:
            "Above-market wages with performance bonuses and regular raises",
          icon: "DollarSign",
        },
        {
          title: "Health Benefits",
          description:
            "Comprehensive health, dental, and vision insurance coverage",
          icon: "Shield",
        },
        {
          title: "Flexible Schedule",
          description:
            "Work-life balance with flexible hours and part-time options",
          icon: "Clock",
        },
        {
          title: "Career Growth",
          description:
            "Training programs and advancement opportunities within the company",
          icon: "TrendingUp",
        },
        {
          title: "Team Environment",
          description:
            "Supportive team culture with collaborative work environment",
          icon: "Users",
        },
        {
          title: "Recognition Program",
          description:
            "Employee of the month awards and performance recognition",
          icon: "Award",
        },
      ],
    },
  },

  positionsSection: {
    heading: {
      type: String,
      required: true,
      default: "Open Positions",
    },
    description: {
      type: String,
      required: true,
      default:
        "Find the perfect role that matches your skills and career goals.",
    },
    positions: {
      type: [PositionSchema],
      required: true,
      default: [
        {
          title: "Residential Cleaner",
          type: "Full-time / Part-time",
          location: "Multiple NJ Counties",
          description:
            "Join our residential cleaning team and help families maintain beautiful, clean homes.",
          requirements: [
            "Previous cleaning experience preferred but not required",
            "Reliable transportation",
            "Attention to detail",
            "Physical ability to perform cleaning tasks",
            "Background check required",
          ],
          salary: "$18-22/hour",
          link: "",
        },
        {
          title: "Commercial Cleaner",
          type: "Full-time / Part-time",
          location: "Multiple NJ Counties",
          description:
            "Clean offices, medical facilities, and commercial spaces with our professional team.",
          requirements: [
            "Experience in commercial cleaning preferred",
            "Ability to work evenings/weekends",
            "Reliable and punctual",
            "Team player attitude",
            "Background check required",
          ],
          salary: "$19-23/hour",
          link: "",
        },
        {
          title: "Team Leader",
          type: "Full-time",
          location: "Bergen County",
          description:
            "Lead a team of cleaners and ensure quality standards are met on every job.",
          requirements: [
            "2+ years cleaning experience",
            "Leadership experience",
            "Valid driver's license",
            "Excellent communication skills",
            "Quality control mindset",
          ],
          salary: "$25-30/hour",
          link: "",
        },
        {
          title: "Customer Service Representative",
          type: "Full-time",
          location: "Remote/Office",
          description:
            "Help customers schedule services and manage their cleaning needs.",
          requirements: [
            "Customer service experience",
            "Excellent phone skills",
            "Computer proficiency",
            "Problem-solving abilities",
            "Bilingual (English/Spanish) preferred",
          ],
          salary: "$17-21/hour",
          link: "",
        },
      ],
    },
  },

  testimonialsSection: {
    heading: {
      type: String,
      required: true,
      default: "What Our Team Says",
    },
    description: {
      type: String,
      required: true,
      default:
        "Hear from our employees about their experience working at Clensy.",
    },
    testimonials: {
      type: [TestimonialSchema],
      required: true,
      default: [
        {
          name: "Sarah M.",
          position: "Residential Cleaner",
          content:
            "I love working at Clensy! The team is supportive, the pay is great, and I have the flexibility I need for my family.",
          rating: 5,
        },
        {
          name: "Mike Rodriguez",
          position: "Team Leader",
          content:
            "Started as a cleaner and worked my way up to team leader. Clensy really invests in their employees' growth.",
          rating: 5,
        },
        {
          name: "Lisa Chen",
          position: "Commercial Cleaner",
          content:
            "Best cleaning company I've worked for. They provide all the equipment and training you need to succeed.",
          rating: 5,
        },
      ],
    },
  },

  applicationSection: {
    heading: {
      type: String,
      required: true,
      default: "Ready to Join Our Team?",
    },
    description: {
      type: String,
      required: true,
      default:
        "Fill out the application below and we'll get back to you within 24 hours.",
    },
    submitButtonText: {
      type: String,
      required: true,
      default: "Submit Application",
    },
  },

  contactSection: {
    heading: {
      type: String,
      required: true,
      default: "Have Questions About Working With Us?",
    },
    description: {
      type: String,
      required: true,
      default:
        "Contact our HR team for more information about career opportunities.",
    },
    phoneText: {
      type: String,
      required: true,
              default: "Call Us: (551) 305-4081",
    },
    emailText: {
      type: String,
      required: true,
      default: "Email: careers@clensy.com",
    },
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Careers ||
  mongoose.model("Careers", CareersSchema);
