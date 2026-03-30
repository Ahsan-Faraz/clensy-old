import mongoose from 'mongoose';

// Schema for individual cleaning items for each room and cleaning type
const RoomCleaningItemsSchema = new mongoose.Schema({
  kitchen: {
    type: [String],
    required: true,
    default: []
  },
  bathroom: {
    type: [String],
    required: true,
    default: []
  },
  bedroom: {
    type: [String],
    required: true,
    default: []
  },
  living: {
    type: [String],
    required: true,
    default: []
  }
});

// Schema for all cleaning types
const CleaningTypesSchema = new mongoose.Schema({
  routine: {
    type: RoomCleaningItemsSchema,
    required: true,
    default: {
      kitchen: [
        "Sweep, Vacuum, & Mop Floors",
        "Wipe down countertops",
        "Wipe down Stove Top",
        "Clean exterior of appliances",
        "Sinks scrubbed and disinfected (dishes upon request)",
        "Wipe exterior of cabinets and handles",
        "Clean Stove Top",
        "Trash emptied"
      ],
      bathroom: [
        "Sweep, Vacuum, & Mop Floors",
        "Scrub and sanitize showers and tubs",
        "Clean and disinfect toilets",
        "Scrub and disinfect sink and countertops",
        "Chrome fixtures cleaned and shined",
        "Clean mirrors",
        "Towels neatly hung and folded",
        "Trash Emptied"
      ],
      bedroom: [
        "Sweep, Vacuum, & Mop Floors",
        "Beds made, linens changed (if linens are left on bed)",
        "Dust bedroom shelving, night stand, & bed frame",
        "Picture frames dusted",
        "Mirrors Cleaned",
        "Light (5 minutes) Organization of room",
        "Ensure overall room looks neat, tidy, and \"hotel-fresh\"",
        "Trash Emptied"
      ],
      living: [
        "Sweep, Vacuum, & Mop Floors",
        "Upholstered furniture vacuumed",
        "Dust all surfaces and decor",
        "Dust electronics and TV stands",
        "Fluff and straighten couch cushions & pillows",
        "Clean mirrors and glass surfaces",
        "Light (5 minutes) Organization of room",
        "Trash emptied"
      ]
    }
  },
  deep: {
    type: RoomCleaningItemsSchema,
    required: true,
    default: {
      kitchen: [
        "Everything in routine +",
        "Clean inside microwave",
        "Kitchen Backsplash",
        "Degrease Stovetop",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Tables, chairs, & behind/under furniture",
        "Window Sills"
      ],
      bathroom: [
        "Everything in routine +",
        "Remove hard water stains (where possible)",
        "Scrub grout lines (moderate scrubbing)",
        "Ceiling fans and light fixtures dusted",
        "Dust vent covers and ceiling corners",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Window Sills"
      ],
      bedroom: [
        "Everything in routine +",
        "Ceiling fans and light fixtures dusted",
        "Remove cobwebs from corners and ceilings",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Behind/under furniture",
        "Window Sills",
        "Wipe down decor items (vases, candle holders, etc.)"
      ],
      living: [
        "Everything in routine +",
        "Vacuum inside couch cushions (if removable)",
        "Ceiling fans and light fixtures dusted",
        "Remove cobwebs from corners and ceilings",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Behind/under furniture",
        "Window Sills"
      ]
    }
  },
  moving: {
    type: RoomCleaningItemsSchema,
    required: true,
    default: {
      kitchen: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Clean and disinfect inside and outside of all cabinets and drawers",
        "Clean inside and outside of refrigerator",
        "Clean inside and outside of oven",
        "Scrub and disinfect sink and faucet",
        "Wipe all countertops and backsplash",
        "Clean exterior and interior of microwave and other appliances",
        "Wipe down baseboards, door frames, and light switches"
      ],
      bathroom: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Scrub and disinfect toilet (inside, outside, and behind)",
        "Deep clean shower/tub (remove soap scum, mildew, grout scrubbing)",
        "Clean inside and outside of all drawers, cabinets, and vanities",
        "Scrub and polish sink, faucet, and countertops",
        "Clean mirrors and any glass shower doors",
        "Wipe baseboards and door trim",
        "Dust and clean vents, fan covers, and corners"
      ],
      bedroom: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Clean inside closets, including shelving and floor",
        "Wipe baseboards and door trim",
        "Clean interior window glass and wipe window sills",
        "Dust and wipe ceiling fans and light fixtures",
        "Clean light switches, doors, and outlet covers",
        "Remove cobwebs and dust from ceiling corners",
        "Trash Emptied"
      ],
      living: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Dust and wipe all baseboards and molding",
        "Clean interior window glass and wipe window sills",
        "Remove cobwebs from ceilings and corners",
        "Clean doors, handles, and light switches",
        "Dust and wipe ceiling fans and light fixtures",
        "Clean inside closets and shelving (if any)",
        "Trash Emptied"
      ]
    }
  }
});

// Main Checklist Page Schema
const ChecklistPageSchema = new mongoose.Schema({
  heroSection: {
    heading: {
      type: String,
      required: true,
      default: "Our 50-Point Cleaning Checklist"
    },
    description: {
      type: String,
      required: true,
      default: "Discover how we ensure your home receives a thorough clean, every time"
    },
    buttonText: {
      type: String,
      required: true,
      default: "Book Your Cleaning"
    }
  },

  interactiveGuideSection: {
    heading: {
      type: String,
      required: true,
      default: "Interactive Room Cleaning Guide"
    },
    description: {
      type: String,
      required: true,
      default: "Click on any room to see our detailed cleaning checklist"
    }
  },

  mainChecklistSection: {
    heading: {
      type: String,
      required: true,
      default: "Our 50-Point Checklist includes:"
    },
    description: {
      type: String,
      required: true,
      default: "We've developed a comprehensive cleaning system that ensures nothing is overlooked"
    },
    routineButtonText: {
      type: String,
      required: true,
      default: "Routine Cleaning"
    },
    deepButtonText: {
      type: String,
      required: true,
      default: "Deep Cleaning"
    },
    movingButtonText: {
      type: String,
      required: true,
      default: "Move In/Out Cleaning"
    },
    roomTitles: {
      kitchen: {
        type: String,
        required: true,
        default: "Kitchen"
      },
      bathroom: {
        type: String,
        required: true,
        default: "Bathrooms"
      },
      bedroom: {
        type: String,
        required: true,
        default: "Bedrooms"
      },
      living: {
        type: String,
        required: true,
        default: "Other Living Areas"
      }
    },
    cleaningItems: {
      type: CleaningTypesSchema,
      required: true,
      default: {}
    }
  },

  ctaSection: {
    heading: {
      type: String,
      required: true,
      default: "Ready for the Clensy Difference?"
    },
    description: {
      type: String,
      required: true,
      default: "Experience our 50-point checklist in action. Book your cleaning today and see the difference a thorough clean makes."
    },
    buttonText: {
      type: String,
      required: true,
      default: "Book Your Cleaning Today"
    }
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.ChecklistPage || mongoose.model('ChecklistPage', ChecklistPageSchema);