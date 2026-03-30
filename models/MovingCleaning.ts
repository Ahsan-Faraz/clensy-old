import mongoose from "mongoose";

const MovingCleaningSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTopLabel: {
      type: String,
      default: "Moving Cleaning Services",
    },
    heroHeading: {
      type: String,
      default: "Fresh Start, Clean Slate",
    },
    heroSubheading: {
      type: String,
      default:
        "Specialized cleaning services for when you're moving out of your old place or into your new home. We ensure a smooth transition with professional, thorough cleaning.",
    },
    heroBackgroundImage: {
      type: String,
      default:
        "https://thecleanstart.com/wp-content/uploads/2022/04/Move-In-Move-Out-Cleaning.jpg",
    },
    heroServiceDuration: {
      type: String,
      default: "5-8 Hour Service",
    },
    heroServiceGuarantee: {
      type: String,
      default: "100% Satisfaction",
    },

    // What's Included Section
    includedSectionHeading: {
      type: String,
      default: "What's Included in Our Moving Cleaning",
    },
    includedSectionSubheading: {
      type: String,
      default:
        "Our comprehensive moving cleaning service ensures your old or new home receives thorough attention for a seamless transition.",
    },

    // Move-Out Cleaning Section
    moveOutTitle: {
      type: String,
      default: "Move-Out Cleaning",
    },
    moveOutDescription: {
      type: String,
      default:
        "Our move-out cleaning service ensures you leave your rental property in pristine condition, maximizing the chances of getting your security deposit back in full.",
    },
    moveOutImage: {
      type: String,
      default:
        "https://5.imimg.com/data5/OE/NU/GLADMIN-71204126/move-in-move-out-cleaning.jpg",
    },
    moveOutFeatures: {
      type: [String],
      default: [
        "Deep cleaning of all rooms, including hard-to-reach areas",
        "Wall cleaning and scuff/mark removal where possible",
        "Inside cabinet and drawer cleaning",
        "Appliance cleaning inside and out (if remaining)",
      ],
    },

    // Move-In Cleaning Section
    moveInTitle: {
      type: String,
      default: "Move-In Cleaning",
    },
    moveInDescription: {
      type: String,
      default:
        "Start fresh in your new home with our comprehensive move-in cleaning service, ensuring every surface is sanitized and ready for your belongings.",
    },
    moveInImage: {
      type: String,
      default:
        "https://www.repairsmax.com/wp-content/uploads/2022/12/b6ec1672e296fba3ecba1e732512f4a0.jpg",
    },
    moveInFeatures: {
      type: [String],
      default: [
        "Sanitization of all surfaces, especially high-touch areas",
        "Deep cleaning of bathrooms and kitchen",
        "Thorough dusting of all surfaces and light fixtures",
        "Window cleaning and floor treatments",
      ],
    },

    // Post-Renovation Cleaning Section
    postRenovationTitle: {
      type: String,
      default: "Post-Renovation Cleaning",
    },
    postRenovationDescription: {
      type: String,
      default:
        "If your new home has undergone renovations, our specialized cleaning removes dust, debris, and construction residue before you move in.",
    },
    postRenovationImage: {
      type: String,
      default:
        "https://biocleaning.ie/wp-content/uploads/2024/02/post-construction-cleaning-checklist.jpg.jpg",
    },
    postRenovationFeatures: {
      type: [String],
      default: [
        "Removal of construction dust from all surfaces",
        "Cleaning of vents and air ducts to remove debris",
        "Interior window and frame cleaning",
        "Final sanitization of all living spaces",
      ],
    },

    // Before & After Section
    beforeAfterHeading: {
      type: String,
      default: "The Moving Cleaning Difference",
    },
    beforeAfterSubheading: {
      type: String,
      default:
        "See the dramatic transformation our moving cleaning services deliver for both move-in and move-out situations.",
    },

    // Benefits Section
    benefitsHeading: {
      type: String,
      default: "Benefits of Professional Moving Cleaning",
    },
    benefitsSubheading: {
      type: String,
      default:
        "Why investing in professional moving cleaning services is essential for a smooth transition.",
    },

    // Benefit 1: Secure Your Deposit
    benefit1Title: {
      type: String,
      default: "Secure Your Deposit",
    },
    benefit1Description: {
      type: String,
      default:
        "Our thorough move-out cleaning significantly increases your chances of receiving your full security deposit back from your landlord.",
    },
    benefit1Icon: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhMVFRUXFhcaGBgYFxgWHxoXFxUXGBcVFxcaHSggGBolGxgdIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzciICUvLS8tNS4vMS03LS0vNS8vLS0tNS0vLTctLS01NSstNS0tLS8tLS0rLS0tLS0tLS8tLf/AABEIAMUBAAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEEBQYDB//EAEUQAAEDAQUFBAYHBgYCAwEAAAECAxEABAUSITEGIkFRYRNxgaEHMkJTsdEUUmJygrHhIzOSovAFFSQnc8EWUzhUJTT/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEEBQYDB//EAEUQAAEDAQUFBAYHBgYCAwEAAAECAxEABAUSITEGIkFRYRNxgaEHMkJTsdEUUmJygrHhIzOSovAFFSQnc8EWUyhUJTT/xAAbAAABBQEBAAAAAQAAAAAAAAABAAIDBAUGB//EADSESAAA",
    },

    // Benefit 2: Reduce Moving Stress
    benefit2Title: {
      type: String,
      default: "Reduce Moving Stress",
    },
    benefit2Description: {
      type: String,
      default:
        "Let professionals handle the cleaning while you focus on the many other aspects of your move, significantly reducing your stress.",
    },
    benefit2Icon: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMVFRUXFxcYGBgYFxgWHxoXFxUXGBcVFxcaHSggGBolGxgdIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzciICUvLS8tNS4vMS03LS0vNS8vLS0tNS0vLTctLS01NSstNS0tLS8tLS0rLS0tLS0tLS8tLf/",
    },

    // Benefit 3: Health Protection
    benefit3Title: {
      type: String,
      default: "Health Protection",
    },
    benefit3Description: {
      type: String,
      default:
        "Our sanitization process eliminates allergens, bacteria, and germs from previous occupants, creating a healthier environment in your new home.",
    },
    benefit3Icon: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df?q=80&w=100&auto=format&fit=crop",
    },

    // FAQ Section
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [
        {
          question: "Do I need to empty the house before moving cleaning?",
          answer:
            "For best results, we recommend the space be as empty as possible. We can clean around remaining furniture or items, but empty spaces allow for a more thorough clean.",
        },
        {
          question: "Can you clean after my movers finish?",
          answer:
            "Yes, we can schedule your moving cleaning after your movers have finished, ensuring your old or new home is spotless before you settle in or hand over the keys.",
        },
        {
          question: "What areas are included in a moving cleaning?",
          answer:
            "Our moving cleaning covers all rooms, inside cabinets, appliances, and closets. We ensure the property is ready for move-in or move-out inspection.",
        },
        {
          question: "What if I am not satisfied with the cleaning?",
          answer:
            "If you are not completely satisfied, contact us within 24 hours and we will return to address any concerns at no additional cost.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const MovingCleaning =
  mongoose.models.MovingCleaning ||
  mongoose.model("MovingCleaning", MovingCleaningSchema);

export default MovingCleaning;
 