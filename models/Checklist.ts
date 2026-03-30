import mongoose from 'mongoose';

const ChecklistSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: "Our 50-Point Cleaning Checklist"
  },
  description: {
    type: String,
    required: true,
    default: "We don't miss a spot. Here's our comprehensive cleaning checklist for every room in your home."
  },
  checklistItems: {
    routine: {
      living: {
        type: [String],
        default: [
          "Sweep, Vacuum, & Mop Floors",
          "Upholstered furniture vacuumed",
          "Dust all surfaces and decor",
          "Dust electronics and TV stands",
          "Fluff and straighten couch cushions & pillows",
          "Clean mirrors and glass surfaces",
          "Light (5 minutes) Organization of room",
          "Trash emptied"
        ]
      },
      kitchen: {
        type: [String],
        default: [
          "Sweep, Vacuum, & Mop Floors",
          "Wipe down countertops",
          "Wipe down Stove Top",
          "Clean exterior of appliances",
          "Sinks scrubbed and disinfected (dishes upon request)",
          "Wipe exterior of cabinets and handles",
          "Clean Stove Top",
          "Trash emptied"
        ]
      },
      bathroom: {
        type: [String],
        default: [
          "Sweep, Vacuum, & Mop Floors",
          "Scrub and sanitize showers and tubs",
          "Clean and disinfect toilets",
          "Scrub and disinfect sink and countertops",
          "Chrome fixtures cleaned and shined",
          "Clean mirrors",
          "Towels neatly hung and folded",
          "Trash Emptied"
        ]
      },
      bedroom: {
        type: [String],
        default: [
          "Sweep, Vacuum, & Mop Floors",
          "Beds made, linens changed (if linens are left on bed)",
          "Dust bedroom shelving, night stand, & bed frame",
          "Picture frames dusted",
          "Mirrors Cleaned",
          "Light (5 minutes) Organization of room",
          "Ensure overall room looks neat, tidy, and \"hotel-fresh\"",
          "Trash Emptied"
        ]
      }
    },
    deep: {
      living: {
        type: [String],
        default: [
          "Everything in routine +",
          "Vacuum inside couch cushions (if removable)",
          "Ceiling fans and light fixtures dusted",
          "Remove cobwebs from corners and ceilings",
          "Wipe baseboards and molding",
          "Doors, door frames, & light switches",
          "Behind/under furniture",
          "Window Sills"
        ]
      },
      kitchen: {
        type: [String],
        default: [
          "Everything in routine +",
          "Clean inside microwave",
          "Kitchen Backsplash",
          "Degrease Stovetop",
          "Wipe baseboards and molding",
          "Doors, door frames, & light switches",
          "Tables, chairs, & behind/under furniture",
          "Window Sills"
        ]
      },
      bathroom: {
        type: [String],
        default: [
          "Everything in routine +",
          "Remove hard water stains (where possible)",
          "Scrub grout lines (moderate scrubbing)",
          "Ceiling fans and light fixtures dusted",
          "Dust vent covers and ceiling corners",
          "Wipe baseboards and molding",
          "Doors, door frames, & light switches",
          "Window Sills"
        ]
      },
      bedroom: {
        type: [String],
        default: [
          "Everything in routine +",
          "Ceiling fans and light fixtures dusted",
          "Remove cobwebs from corners and ceilings",
          "Wipe baseboards and molding",
          "Doors, door frames, & light switches",
          "Behind/under furniture",
          "Window Sills",
          "Wipe down decor items (vases, candle holders, etc.)"
        ]
      }
    },
    moving: {
      living: {
        type: [String],
        default: [
          "Sweep, Vacuum and mop floors thoroughly",
          "Dust and wipe all baseboards and molding",
          "Clean interior window glass and wipe window sills",
          "Remove cobwebs from ceilings and corners",
          "Clean doors, handles, and light switches",
          "Dust and wipe ceiling fans and light fixtures",
          "Clean inside closets and shelving (if any)",
          "Trash Emptied"
        ]
      },
      kitchen: {
        type: [String],
        default: [
          "Sweep, Vacuum and mop floors thoroughly",
          "Clean and disinfect inside and outside of all cabinets and drawers",
          "Clean inside and outside of refrigerator",
          "Clean inside and outside of oven",
          "Scrub and disinfect sink and faucet",
          "Wipe all countertops and backsplash",
          "Clean exterior and interior of microwave and other appliances",
          "Wipe down baseboards, door frames, and light switches"
        ]
      },
      bathroom: {
        type: [String],
        default: [
          "Sweep, Vacuum and mop floors thoroughly",
          "Scrub and disinfect toilet (inside, outside, and behind)",
          "Deep clean shower/tub (remove soap scum, mildew, grout scrubbing)",
          "Clean inside and outside of all drawers, cabinets, and vanities",
          "Scrub and polish sink, faucet, and countertops",
          "Clean mirrors and any glass shower doors",
          "Wipe baseboards and door trim",
          "Dust and clean vents, fan covers, and corners"
        ]
      },
      bedroom: {
        type: [String],
        default: [
          "Sweep, Vacuum and mop floors thoroughly",
          "Clean inside closets, including shelving and floor",
          "Wipe baseboards and door trim",
          "Clean interior window glass and wipe window sills",
          "Dust and wipe ceiling fans and light fixtures",
          "Clean light switches, doors, and outlet covers",
          "Remove cobwebs and dust from ceiling corners",
          "Trash Emptied"
        ]
      }
    }
  },
  buttonText: {
    type: String,
    required: true,
    default: "View Full 50-Point Checklist"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Checklist || mongoose.model('Checklist', ChecklistSchema);