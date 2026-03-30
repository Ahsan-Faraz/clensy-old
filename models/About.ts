import mongoose from 'mongoose';

// Schema for customer type cards in "Who We Serve" section
const CustomerTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

// Schema for "What Makes Us Different" sections
const DifferentiatorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

// Main About Us schema
const AboutSchema = new mongoose.Schema({
  heroSection: {
    heading: {
      type: String,
      required: true,
      default: "About Clensy"
    },
    tagline: {
      type: String, 
      required: true,
      default: "Raising the Standard, One Clean at a Time."
    }
  },

  ourStorySection: {
    heading: {
      type: String,
      required: true,
      default: "Our Story"
    },
    paragraph1: {
      type: String,
      required: true,
      default: "Clensy was built to solve a problem — the frustrating experience of unreliable cleaners who are late, don't communicate, and leave you wondering if the job will ever be done right."
    },
    paragraph2: {
      type: String,
      required: true,
      default: "We set out to create something better. A company that not only delivers amazing results — but makes the entire experience seamless from start to finish."
    },
    paragraph3: {
      type: String,
      required: true,
      default: "Whether you're managing a busy home, multiple Airbnb properties, or a commercial space that needs to stay spotless and presentable, Clensy is your go-to team."
    },
    // Optional image field for the story section
    image: {
      type: String,
      required: true,
      default: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg"
    }
  },

  whyWeStartedSection: {
    heading: {
      type: String,
      required: true,
      default: "Why We Started"
    },
    subtitle: {
      type: String,
      required: true,
      default: "Let's be honest: the cleaning industry is broken."
    },
    quoteText: {
      type: String,
      required: true,
      default: "My cleaner didn't show up. No one responded. The job was half-done."
    },
    paragraph1: {
      type: String,
      required: true,
      default: "We were tired of the low standards across the industry – Whether it's flaky independent cleaners or cookie-cutter franchises with zero customer service — it's hard to find a company that actually cares and does the job right."
    },
    paragraph2: {
      type: String,
      required: true,
      default: "We listened. And then we built Clensy — a cleaning company that actually shows up, delivers exceptional results, and treats every client like a priority."
    },
    paragraph3: {
      type: String,
      required: true,
      default: "We know that when you book a cleaning, you want peace of mind — not more headaches."
    }
  },

  whatMakesUsDifferentSection: {
    heading: {
      type: String,
      required: true,
      default: "What Makes Us Different?"
    },
    residentialCommercial: {
      title: {
        type: String,
        required: true,
        default: "Residential & Commercial Cleaning"
      },
      paragraph1: {
        type: String,
        required: true,
        default: "From homes and apartments to offices, retail spaces, gyms, medical facilities, and even construction sites — if it's indoors and needs to be cleaned, we've got it covered."
      },
      paragraph2: {
        type: String,
        required: true,
        default: "Not sure if we handle your specific needs? Chances are, we do. If you're looking for something custom, head over to our Contact Us page or give us a call. We're happy to create a tailored plan that fits exactly what you're looking for."
      }
    },
    eliteTeam: {
      title: {
        type: String,
        required: true,
        default: "Elite Team"
      },
      paragraph1: {
        type: String,
        required: true,
        default: "Out of every 100 applicants, we only hire 1 cleaner. Seriously. Our hiring process is extensive, and only the best make it through."
      },
      paragraph2: {
        type: String,
        required: true,
        default: "We're fully licensed, bonded, and insured, so you can feel confident knowing your home, business, or property is in trusted, professional hands."
      }
    },
    image: {
      type: String,
      required: false,
      default: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg"
    }
  },

  clientFocusedTech: {
    heading: {
      type: String,
      required: true,
      default: "Client-Focused Tech"
    },
    features: {
      type: [String],
      required: true,
      default: [
        "Customer portal to manage your bookings",
        "Text/email reminders before every job",
        "Real-time ETA when your cleaner is en route",
        "Easy rescheduling, communication, and payment — all online"
      ]
    }
  },

  whoWeServeSection: {
    heading: {
      type: String,
      required: true,
      default: "Who We Serve"
    },
    subtitle: {
      type: String,
      required: true,
      default: "Clensy is made for people and businesses who expect more from a cleaning company."
    },
    customerTypes: {
      type: [CustomerTypeSchema],
      required: true,
      default: [
        {
          title: "Busy parents",
          description: "Who need a safe, clean home without the stress"
        },
        {
          title: "Professionals and entrepreneurs", 
          description: "Focused on growing, not cleaning"
        },
        {
          title: "Property managers and business owners",
          description: "Who need reliable commercial upkeep"
        },
        {
          title: "Airbnb hosts",
          description: "Who demand fast, spotless turnovers"
        },
        {
          title: "Contractors or developers",
          description: "Who need sharp post-construction cleanup"
        },
        {
          title: "Anyone who values quality",
          description: "And needs a trustworthy cleaning service"
        }
      ]
    }
  },

  ourMissionSection: {
    heading: {
      type: String,
      required: true,
      default: "Our Mission"
    },
    paragraph1: {
      type: String,
      required: true,
      default: "We're obsessed with making the cleaning process feel effortless for our clients. You book. We show up. We do the job right — the first time."
    },
    paragraph2: {
      type: String,
      required: true,
      default: "No rescheduling nightmares. No communication breakdowns. No wondering if your space was actually cleaned."
    },
    paragraph3: {
      type: String,
      required: true,
      default: "With Clensy, you get a team that's committed to your satisfaction — from the first message to the final wipe-down."
    },
    paragraph4: {
      type: String,
      required: true,
      default: "If you're looking for a company that understands the value of your time, respects your space, and consistently delivers results — welcome to Clensy."
    },
    closingLine: {
      type: String,
      required: true,
      default: "We're here to raise the standard."
    }
  },

  ctaSection: {
    heading: {
      type: String,
      required: true,
      default: "Ready to Experience the Clensy Difference?"
    },
    description: {
      type: String,
      required: true,
      default: "Join thousands of satisfied customers who've discovered what a truly exceptional cleaning service feels like."
    },
    bookButtonText: {
      type: String,
      required: true,
      default: "Book Your Cleaning"
    },
    contactButtonText: {
      type: String,
      required: true,
      default: "Contact Us"
    }
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);