import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import { FAQQuestion } from "@/models/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Comprehensive FAQ questions data - 110 questions covering all aspects
const comprehensiveFAQs = [
  // General Questions (15)
  {
    question: "What areas do you serve?",
    answer: "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties. We serve all major cities and towns within these counties.",
    category: "general",
    tags: ["service area", "location", "coverage"],
    priority: 10
  },
  {
    question: "Are your cleaners background checked?",
    answer: "Yes, all of our cleaning professionals undergo thorough background checks before joining our team. We prioritize your safety and security, and only employ trustworthy individuals with verified credentials.",
    category: "staff",
    tags: ["background check", "safety", "security", "staff"],
    priority: 9
  },
  {
    question: "Are you insured and bonded?",
    answer: "Yes, we are fully insured and bonded. This provides protection for both our clients and our team in the rare event of an accident or damage during service.",
    category: "insurance",
    tags: ["insurance", "bonded", "protection", "liability"],
    priority: 9
  },
  {
    question: "What cleaning products do you use?",
    answer: "We use a combination of industry-grade professional cleaning products and eco-friendly options. If you have specific preferences or concerns about allergies, we're happy to accommodate your needs with alternative products.",
    category: "cleaning-products",
    tags: ["products", "eco-friendly", "allergies", "chemicals"],
    priority: 8
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No, you don't need to be home during the cleaning service. Many of our clients provide a key or access instructions. We ensure secure handling of all property access methods and can arrange for secure key return or storage.",
    category: "general",
    tags: ["home presence", "keys", "access", "security"],
    priority: 8
  },
  {
    question: "How long has Clensy been in business?",
    answer: "Clensy has been providing professional cleaning services for over 15 years. We've built our reputation on reliability, quality service, and customer satisfaction throughout Northern New Jersey.",
    category: "general",
    tags: ["experience", "history", "reputation"],
    priority: 7
  },
  {
    question: "What makes Clensy different from other cleaning services?",
    answer: "We combine professional expertise with personalized service. Our team is fully trained, insured, and bonded. We use eco-friendly products, offer flexible scheduling, and provide a satisfaction guarantee on all our services.",
    category: "general",
    tags: ["difference", "unique", "advantages", "benefits"],
    priority: 7
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes, we provide free, no-obligation estimates for all our cleaning services. You can get an instant quote through our online booking system or contact us directly for a personalized assessment.",
    category: "pricing",
    tags: ["estimate", "quote", "free", "pricing"],
    priority: 8
  },
  {
    question: "What is your satisfaction guarantee policy?",
    answer: "We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll return within 24 hours to address any concerns at no additional cost.",
    category: "policies",
    tags: ["guarantee", "satisfaction", "policy", "quality"],
    priority: 8
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach our customer service team by phone at (551) 305-4081, email us at info@clensy.com, or use the contact form on our website. We typically respond to inquiries within 2-4 hours during business hours.",
    category: "general",
    tags: ["contact", "customer service", "support"],
    priority: 6
  },
  {
    question: "Do you provide cleaning supplies and equipment?",
    answer: "Yes, we bring all necessary cleaning supplies, equipment, and tools. Our professional-grade supplies ensure the best results. If you prefer us to use your own products, we're happy to accommodate that request.",
    category: "cleaning-products",
    tags: ["supplies", "equipment", "tools", "professional"],
    priority: 7
  },
  {
    question: "Are your services available on weekends?",
    answer: "Yes, we offer cleaning services seven days a week, including weekends. Weekend appointments may have limited availability, so we recommend booking in advance.",
    category: "scheduling",
    tags: ["weekend", "availability", "schedule", "flexible"],
    priority: 6
  },
  {
    question: "What if I need to cancel or reschedule my appointment?",
    answer: "We understand plans change. You can cancel or reschedule your appointment up to 24 hours before the scheduled time without any fees. Changes made with less than 24 hours notice may incur a rescheduling fee.",
    category: "policies",
    tags: ["cancel", "reschedule", "policy", "fees"],
    priority: 7
  },
  {
    question: "Do you offer discounts for regular customers?",
    answer: "Yes, we offer attractive discounts for recurring cleaning services. Weekly clients receive 15% off, bi-weekly clients get 10% off, and monthly clients receive 5% off regular pricing.",
    category: "pricing",
    tags: ["discount", "regular", "recurring", "savings"],
    priority: 6
  },
  {
    question: "How do I prepare my home for a cleaning service?",
    answer: "Minimal preparation is needed. We recommend picking up personal items, securing valuable objects, and ensuring clear access to areas to be cleaned. Our team will handle the rest!",
    category: "general",
    tags: ["preparation", "home", "ready", "tips"],
    priority: 5
  },

  // Services Questions (20)
  {
    question: "What types of cleaning services do you offer?",
    answer: "We offer comprehensive cleaning services including routine cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleanup, office cleaning, Airbnb cleaning, and specialized commercial services.",
    category: "services",
    tags: ["types", "services", "comprehensive", "variety"],
    priority: 9
  },
  {
    question: "What's included in your routine cleaning service?",
    answer: "Our routine cleaning includes dusting all surfaces, vacuuming carpets and rugs, mopping floors, cleaning bathrooms (toilets, sinks, showers, mirrors), kitchen cleaning (counters, sink, stovetop, outside of appliances), and trash removal.",
    category: "services",
    tags: ["routine", "regular", "included", "standard"],
    priority: 8
  },
  {
    question: "What's the difference between routine and deep cleaning?",
    answer: "Routine cleaning maintains your home's cleanliness with regular tasks. Deep cleaning is more thorough, including inside appliances, baseboards, light fixtures, window sills, and areas typically not covered in routine cleaning.",
    category: "services",
    tags: ["difference", "routine", "deep", "thorough"],
    priority: 8
  },
  {
    question: "Do you clean inside appliances?",
    answer: "Inside appliance cleaning is included in our deep cleaning service. This covers inside ovens, refrigerators, microwaves, and dishwashers. It's not typically included in routine cleaning but can be added as an extra service.",
    category: "services",
    tags: ["appliances", "inside", "deep cleaning", "extra"],
    priority: 6
  },
  {
    question: "Do you clean windows?",
    answer: "We clean interior windows as part of our standard service. Exterior window cleaning is available as an additional service. We also clean window sills, frames, and tracks during deep cleaning.",
    category: "services",
    tags: ["windows", "interior", "exterior", "additional"],
    priority: 6
  },
  {
    question: "Can you clean my carpets and upholstery?",
    answer: "We provide basic carpet vacuuming as part of our standard service. For deep carpet cleaning and upholstery cleaning, we partner with specialized services and can arrange these for you at competitive rates.",
    category: "services",
    tags: ["carpet", "upholstery", "specialized", "partnership"],
    priority: 5
  },
  {
    question: "Do you offer laundry services?",
    answer: "Basic laundry services like washing, drying, and folding can be added to your cleaning service for an additional fee. We don't provide dry cleaning or handle delicate items requiring special care.",
    category: "services",
    tags: ["laundry", "washing", "folding", "additional"],
    priority: 4
  },
  {
    question: "Can you organize and declutter my home?",
    answer: "We offer basic organization services as an add-on. This includes organizing items you've already sorted and light decluttering. For major organization projects, we recommend our professional organizing partners.",
    category: "services",
    tags: ["organize", "declutter", "add-on", "basic"],
    priority: 4
  },
  {
    question: "Do you clean garages and basements?",
    answer: "Yes, we can clean finished garages and basements. Unfinished spaces may require special consideration and pricing. We'll assess the area and provide a customized quote for these spaces.",
    category: "services",
    tags: ["garage", "basement", "finished", "unfinished"],
    priority: 4
  },
  {
    question: "What about cleaning after parties or events?",
    answer: "We specialize in post-event cleanup! Whether it's after a house party, family gathering, or special event, we can restore your home to pristine condition. Contact us for same-day or next-day service.",
    category: "services",
    tags: ["party", "event", "post-event", "cleanup"],
    priority: 5
  },
  {
    question: "Do you provide move-in/move-out cleaning?",
    answer: "Absolutely! Our move-in/move-out cleaning is perfect for transitions. We deep clean empty homes, including inside all appliances, cabinets, closets, and detailed cleaning of all surfaces.",
    category: "services",
    tags: ["move-in", "move-out", "transition", "empty"],
    priority: 7
  },
  {
    question: "Can you clean during construction or renovation?",
    answer: "Yes, we offer post-construction cleaning services. This specialized service removes construction dust, debris, and residue. We use appropriate equipment and techniques for construction cleanup.",
    category: "services",
    tags: ["construction", "renovation", "dust", "debris"],
    priority: 6
  },
  {
    question: "Do you offer green/eco-friendly cleaning options?",
    answer: "Yes! We offer completely eco-friendly cleaning using non-toxic, biodegradable products. This service is perfect for families with children, pets, or anyone with chemical sensitivities.",
    category: "cleaning-products",
    tags: ["green", "eco-friendly", "non-toxic", "safe"],
    priority: 7
  },
  {
    question: "What areas of the house do you not clean?",
    answer: "For safety reasons, we don't clean heights requiring ladders over 2 steps, handle biohazard materials, or clean inside personal safes. We also don't move heavy furniture without prior arrangement.",
    category: "services",
    tags: ["limitations", "safety", "restrictions", "biohazard"],
    priority: 5
  },
  {
    question: "Can you clean my office or commercial space?",
    answer: "Yes, we provide comprehensive commercial cleaning services for offices, retail spaces, medical facilities, and other commercial properties. We offer flexible scheduling including after-hours service.",
    category: "commercial",
    tags: ["office", "commercial", "business", "flexible"],
    priority: 7
  },
  {
    question: "Do you clean Airbnb or rental properties?",
    answer: "Absolutely! We specialize in Airbnb and vacation rental cleaning with quick turnaround times. We can coordinate with your booking schedule and provide same-day service when needed.",
    category: "services",
    tags: ["airbnb", "rental", "vacation", "turnaround"],
    priority: 6
  },
  {
    question: "What's included in your deep cleaning service?",
    answer: "Deep cleaning includes everything in routine cleaning plus: inside appliances, baseboards, light fixtures, ceiling fans, window sills, door frames, inside cabinets, and detailed cleaning of all overlooked areas.",
    category: "services",
    tags: ["deep cleaning", "detailed", "thorough", "comprehensive"],
    priority: 8
  },
  {
    question: "Can you clean my pool area or outdoor spaces?",
    answer: "We can clean covered outdoor areas like patios, screened porches, and pool houses. Outdoor furniture cleaning and basic pool deck cleaning are available as additional services.",
    category: "services",
    tags: ["outdoor", "pool", "patio", "deck"],
    priority: 4
  },
  {
    question: "Do you offer one-time cleaning services?",
    answer: "Yes, we welcome one-time cleaning requests! Whether you need a deep clean before a special event, seasonal cleaning, or just want to try our services, we're happy to help.",
    category: "services",
    tags: ["one-time", "trial", "seasonal", "event"],
    priority: 6
  },
  {
    question: "What's your process for handling delicate or valuable items?",
    answer: "We treat all items with care, but we recommend securing extremely valuable or fragile items before our arrival. Our team is trained in careful handling, and we're fully insured for your protection.",
    category: "policies",
    tags: ["delicate", "valuable", "careful", "secure"],
    priority: 5
  },

  // Pricing Questions (15)
  {
    question: "How do you determine pricing for cleaning services?",
    answer: "Our pricing is based on several factors: home size (square footage and number of rooms), type of service, frequency of cleaning, current condition of the home, and any special requests or add-on services.",
    category: "pricing",
    tags: ["factors", "calculation", "size", "frequency"],
    priority: 9
  },
  {
    question: "Do you charge by the hour or have flat rates?",
    answer: "We primarily use flat-rate pricing based on your specific needs and home size. This gives you predictable costs and ensures our team focuses on quality rather than speed.",
    category: "pricing",
    tags: ["flat rate", "hourly", "predictable", "quality"],
    priority: 8
  },
  {
    question: "What's the average cost for routine cleaning?",
    answer: "Routine cleaning typically ranges from $120-$300 depending on home size and specific requirements. We provide free estimates to give you exact pricing for your unique situation.",
    category: "pricing",
    tags: ["average", "routine", "range", "estimate"],
    priority: 8
  },
  {
    question: "How much does deep cleaning cost?",
    answer: "Deep cleaning usually costs 50-100% more than routine cleaning due to the additional time and detailed work involved. Prices typically range from $200-$500 depending on home size and condition.",
    category: "pricing",
    tags: ["deep cleaning", "cost", "range", "detailed"],
    priority: 7
  },
  {
    question: "Are there any hidden fees or extra charges?",
    answer: "No hidden fees! We provide transparent, upfront pricing. The only additional charges would be for extra services you specifically request or if your home requires significantly more time than estimated.",
    category: "pricing",
    tags: ["transparent", "hidden fees", "upfront", "honest"],
    priority: 8
  },
  {
    question: "Do you offer package deals or discounts?",
    answer: "Yes! We offer recurring service discounts (5-15% off), seasonal packages, and first-time customer promotions. We also provide discounts for booking multiple services at once.",
    category: "pricing",
    tags: ["packages", "discounts", "recurring", "promotions"],
    priority: 6
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, check, all major credit cards (Visa, MasterCard, American Express, Discover), and electronic payments. Payment is due upon completion of service.",
    category: "payment",
    tags: ["payment methods", "credit cards", "cash", "check"],
    priority: 7
  },
  {
    question: "When is payment due?",
    answer: "Payment is due immediately upon completion of the cleaning service. For recurring customers, we can set up automatic billing for your convenience.",
    category: "payment",
    tags: ["payment due", "completion", "automatic billing"],
    priority: 6
  },
  {
    question: "Do you require a deposit or advance payment?",
    answer: "For most residential services, no deposit is required. Large commercial jobs or extensive deep cleaning projects may require a 25% deposit to secure your booking.",
    category: "payment",
    tags: ["deposit", "advance", "commercial", "booking"],
    priority: 5
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Rather than refunds, we prefer to make things right. If you're not satisfied, we'll return within 24 hours to address any concerns at no additional charge. Your satisfaction is guaranteed.",
    category: "policies",
    tags: ["refund", "satisfaction", "guarantee", "return"],
    priority: 7
  },
  {
    question: "How much do add-on services cost?",
    answer: "Add-on services are priced individually: interior oven cleaning ($25), refrigerator interior ($20), laundry service ($15/load), garage cleaning ($50-100), and window cleaning ($3-5 per window).",
    category: "pricing",
    tags: ["add-on", "individual", "extras", "specific"],
    priority: 6
  },
  {
    question: "Do prices vary by location within your service area?",
    answer: "Our pricing is consistent throughout our service area in Northern New Jersey. Travel time is factored into our base pricing, so there are no additional travel charges.",
    category: "pricing",
    tags: ["location", "consistent", "travel", "service area"],
    priority: 4
  },
  {
    question: "What factors might increase the cost of cleaning?",
    answer: "Costs may increase for: heavily soiled homes requiring extra time, homes with excessive pet hair, hoarding situations, post-construction cleanup, or homes that haven't been cleaned in over 6 months.",
    category: "pricing",
    tags: ["increase", "factors", "extra time", "condition"],
    priority: 5
  },
  {
    question: "Do you offer senior or military discounts?",
    answer: "Yes, we proudly offer a 10% discount for seniors (65+) and active military personnel or veterans. Please mention this when booking to receive your discount.",
    category: "pricing",
    tags: ["senior", "military", "veteran", "discount"],
    priority: 5
  },
  {
    question: "Is tipping expected or included in the price?",
    answer: "Tipping is not required but is always appreciated by our team members. If you're happy with the service, a tip of 10-20% is customary but never expected or included in our pricing.",
    category: "pricing",
    tags: ["tipping", "optional", "appreciated", "customary"],
    priority: 4
  },

  // Booking & Scheduling Questions (15)
  {
    question: "How do I book a cleaning service?",
    answer: "You can book online through our website, call us at (551) 305-4081, or email us at info@clensy.com. Our online booking system provides instant quotes and real-time scheduling.",
    category: "booking",
    tags: ["book", "online", "phone", "email"],
    priority: 9
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 48-72 hours in advance, especially during busy seasons. However, we often accommodate same-day or next-day requests based on availability.",
    category: "booking",
    tags: ["advance", "48 hours", "same-day", "availability"],
    priority: 8
  },
  {
    question: "Can I schedule recurring cleaning services?",
    answer: "Absolutely! We offer weekly, bi-weekly, and monthly recurring services. Recurring customers receive priority scheduling and discounted rates.",
    category: "scheduling",
    tags: ["recurring", "weekly", "bi-weekly", "monthly"],
    priority: 8
  },
  {
    question: "What time of day do you typically clean?",
    answer: "We typically schedule cleanings between 8 AM and 6 PM, Monday through Saturday. Sunday appointments are available but limited. We'll work with your schedule to find convenient times.",
    category: "scheduling",
    tags: ["time", "schedule", "8am-6pm", "convenient"],
    priority: 7
  },
  {
    question: "How long does a typical cleaning take?",
    answer: "Cleaning time varies by home size and service type. Routine cleaning typically takes 1-3 hours, while deep cleaning can take 3-6 hours. We'll provide an estimated timeframe when booking.",
    category: "scheduling",
    tags: ["duration", "time", "varies", "estimate"],
    priority: 7
  },
  {
    question: "Can I request the same cleaning team each time?",
    answer: "Yes! We try to assign the same team for recurring customers to maintain consistency and build familiarity with your home and preferences.",
    category: "scheduling",
    tags: ["same team", "consistency", "familiarity", "recurring"],
    priority: 6
  },
  {
    question: "What if I need to change my regular cleaning day?",
    answer: "We understand schedules change. Contact us at least 24 hours in advance to reschedule your regular cleaning day. We'll do our best to accommodate your new preferred schedule.",
    category: "scheduling",
    tags: ["change", "reschedule", "24 hours", "accommodate"],
    priority: 6
  },
  {
    question: "Do you clean on holidays?",
    answer: "We're closed on major holidays (Christmas, New Year's Day, Thanksgiving). For other holidays, we operate with limited availability. Holiday cleaning may include a small surcharge.",
    category: "scheduling",
    tags: ["holidays", "closed", "limited", "surcharge"],
    priority: 4
  },
  {
    question: "Can I book multiple services at once?",
    answer: "Yes, you can book multiple services together and often receive package discounts. For example, combine routine cleaning with window cleaning or organize multiple properties in one booking.",
    category: "booking",
    tags: ["multiple", "package", "discount", "combine"],
    priority: 5
  },
  {
    question: "What information do you need when I book?",
    answer: "We need your contact information, property address, preferred date/time, type of service needed, home size (bedrooms/bathrooms), any special requests, and how you heard about us.",
    category: "booking",
    tags: ["information", "contact", "address", "preferences"],
    priority: 6
  },
  {
    question: "Can I book emergency or same-day cleaning?",
    answer: "We offer emergency cleaning services based on availability. Same-day service may include a rush fee. Call us directly for urgent cleaning needs and we'll do our best to help.",
    category: "booking",
    tags: ["emergency", "same-day", "rush fee", "urgent"],
    priority: 6
  },
  {
    question: "How do I know my booking is confirmed?",
    answer: "You'll receive a confirmation email or text within 2 hours of booking. This includes appointment details, team information, and our contact number for any questions.",
    category: "booking",
    tags: ["confirmation", "email", "text", "details"],
    priority: 5
  },
  {
    question: "What if no one is home during the scheduled time?",
    answer: "If you've arranged for key access, we can clean while you're away. If no access is arranged and no one is home, you may be charged a trip fee and will need to reschedule.",
    category: "scheduling",
    tags: ["not home", "key access", "trip fee", "reschedule"],
    priority: 5
  },
  {
    question: "Can I pause or temporarily stop my recurring service?",
    answer: "Yes, you can pause your recurring service for vacations or other reasons. Just give us at least one week's notice. We'll resume your regular schedule when you're ready.",
    category: "scheduling",
    tags: ["pause", "stop", "vacation", "resume"],
    priority: 4
  },
  {
    question: "How do I modify my cleaning checklist or preferences?",
    answer: "You can update your preferences anytime by calling, emailing, or using our customer portal. We'll note all special requests and ensure your team is informed before each visit.",
    category: "booking",
    tags: ["modify", "checklist", "preferences", "update"],
    priority: 5
  },

  // Staff & Team Questions (10)
  {
    question: "How do you train your cleaning staff?",
    answer: "All team members undergo comprehensive training covering cleaning techniques, product knowledge, customer service, and safety protocols. We provide ongoing training to maintain high standards.",
    category: "staff",
    tags: ["training", "comprehensive", "techniques", "standards"],
    priority: 7
  },
  {
    question: "Are your employees or independent contractors?",
    answer: "Our cleaning professionals are employees, not contractors. They receive benefits, ongoing training, and are covered under our insurance policies for your protection and theirs.",
    category: "staff",
    tags: ["employees", "benefits", "training", "insurance"],
    priority: 6
  },
  {
    question: "What if I'm not happy with a particular team member?",
    answer: "We want you to be completely comfortable with our team. If you have concerns about any team member, please contact us immediately and we'll address the situation and make appropriate changes.",
    category: "staff",
    tags: ["concerns", "comfortable", "address", "changes"],
    priority: 6
  },
  {
    question: "Do your staff speak English?",
    answer: "Yes, all our team members speak English and can communicate effectively with clients. We believe clear communication is essential for providing excellent service.",
    category: "staff",
    tags: ["english", "communicate", "clear", "essential"],
    priority: 5
  },
  {
    question: "How do you ensure staff reliability and trustworthiness?",
    answer: "We conduct thorough background checks, verify references, and maintain strict hiring standards. Our team members are bonded and insured, and we regularly review performance and conduct.",
    category: "staff",
    tags: ["reliability", "trustworthy", "background", "bonded"],
    priority: 8
  },
  {
    question: "Will the same person clean my home each time?",
    answer: "We strive to provide consistency by assigning the same team to recurring customers. Occasionally, due to illness or scheduling, we may send a different trained professional.",
    category: "staff",
    tags: ["consistency", "same team", "illness", "trained"],
    priority: 6
  },
  {
    question: "What should I do if a team member gets injured in my home?",
    answer: "Our team is covered by workers' compensation insurance. If an injury occurs, please call us immediately. Do not attempt to provide medical care - we'll handle all necessary procedures.",
    category: "staff",
    tags: ["injury", "workers compensation", "medical", "procedures"],
    priority: 4
  },
  {
    question: "Can I leave special instructions for the cleaning team?",
    answer: "Absolutely! We encourage detailed instructions about your preferences, areas of focus, items to avoid, or any special requirements. We'll ensure the team receives and follows your instructions.",
    category: "staff",
    tags: ["instructions", "preferences", "focus", "requirements"],
    priority: 6
  },
  {
    question: "How do you handle staff turnover?",
    answer: "We maintain low turnover through competitive compensation and good working conditions. When changes occur, we ensure new team members are fully trained and briefed on your specific preferences.",
    category: "staff",
    tags: ["turnover", "compensation", "training", "briefed"],
    priority: 4
  },
  {
    question: "Are your staff members uniformed and identifiable?",
    answer: "Yes, our team members wear Clensy uniforms and carry identification badges. They arrive in marked company vehicles for easy identification and your security.",
    category: "staff",
    tags: ["uniform", "identification", "badges", "security"],
    priority: 5
  },

  // Insurance & Policies Questions (10)
  {
    question: "What does your insurance cover?",
    answer: "Our comprehensive insurance includes general liability, property damage, theft protection, and workers' compensation. We carry $1 million in liability coverage for your complete peace of mind.",
    category: "insurance",
    tags: ["coverage", "liability", "property", "theft"],
    priority: 8
  },
  {
    question: "What if something gets broken during cleaning?",
    answer: "Accidents are rare, but if damage occurs, we'll repair or replace the item through our insurance. Please report any damage immediately so we can address it promptly.",
    category: "insurance",
    tags: ["broken", "damage", "repair", "replace"],
    priority: 7
  },
  {
    question: "Do you have a privacy policy?",
    answer: "Yes, we maintain strict confidentiality about your home, schedule, and personal information. Our staff signs confidentiality agreements and we never share client information with third parties.",
    category: "policies",
    tags: ["privacy", "confidentiality", "personal", "agreements"],
    priority: 6
  },
  {
    question: "What's your policy on pets during cleaning?",
    answer: "We love pets! For safety, please secure aggressive animals. Friendly pets can stay, but we recommend keeping them in a separate area to avoid stress and ensure thorough cleaning.",
    category: "policies",
    tags: ["pets", "safety", "secure", "separate"],
    priority: 6
  },
  {
    question: "What if I have security systems or alarms?",
    answer: "Please provide alarm codes and instructions when booking. Our team is experienced with various security systems and will follow your specific protocols for arming/disarming.",
    category: "policies",
    tags: ["security", "alarms", "codes", "protocols"],
    priority: 5
  },
  {
    question: "How do you handle keys and home access?",
    answer: "We treat key access with utmost security. Keys are stored in a secure lockbox system, never taken off-site, and access is logged for your protection. We can also arrange lockbox installation.",
    category: "policies",
    tags: ["keys", "access", "secure", "lockbox"],
    priority: 7
  },
  {
    question: "What's your policy on children being home during cleaning?",
    answer: "Children are welcome to be home during cleaning. For safety, we ask that young children be supervised by an adult and kept away from cleaning areas until we're finished.",
    category: "policies",
    tags: ["children", "supervised", "safety", "adult"],
    priority: 5
  },
  {
    question: "Do you have COVID-19 safety protocols?",
    answer: "Yes, we follow CDC guidelines including health screenings, mask wearing when requested, sanitizing equipment between homes, and maintaining social distancing when possible.",
    category: "policies",
    tags: ["covid", "safety", "cdc", "sanitizing"],
    priority: 6
  },
  {
    question: "What's your weather cancellation policy?",
    answer: "We clean in most weather conditions. Severe weather (blizzards, hurricanes) may require rescheduling for safety. We'll contact you as soon as possible if weather affects your appointment.",
    category: "policies",
    tags: ["weather", "cancellation", "severe", "rescheduling"],
    priority: 4
  },
  {
    question: "How do you ensure quality control?",
    answer: "We conduct regular quality inspections, follow detailed checklists, provide team leader oversight, and actively seek customer feedback. Unsatisfied customers receive priority re-cleaning at no charge.",
    category: "policies",
    tags: ["quality", "inspections", "checklists", "feedback"],
    priority: 6
  },

  // Special Requests & Maintenance Questions (10)
  {
    question: "Can you accommodate special cleaning requests?",
    answer: "Yes! We're happy to accommodate special requests like cleaning specific areas, using particular products, or following unique instructions. Just let us know your needs when booking.",
    category: "special-requests",
    tags: ["accommodate", "special", "requests", "unique"],
    priority: 6
  },
  {
    question: "Do you clean homes with hoarding situations?",
    answer: "We can help with light to moderate hoarding situations. Severe cases may require specialized services. We approach these situations with sensitivity and can recommend additional resources if needed.",
    category: "special-requests",
    tags: ["hoarding", "specialized", "sensitivity", "resources"],
    priority: 4
  },
  {
    question: "Can you clean homes with medical equipment?",
    answer: "Yes, we can clean around medical equipment with proper precautions. Please inform us of any medical equipment or special sanitization needs when booking so we can prepare appropriately.",
    category: "special-requests",
    tags: ["medical", "equipment", "precautions", "sanitization"],
    priority: 5
  },
  {
    question: "Do you offer allergy-specific cleaning?",
    answer: "Absolutely! We can use hypoallergenic products, focus on dust mite reduction, and employ HEPA filtration vacuums. Please specify allergies and sensitivities when booking.",
    category: "special-requests",
    tags: ["allergy", "hypoallergenic", "dust mites", "hepa"],
    priority: 6
  },
  {
    question: "What about homes with multiple pets?",
    answer: "We're experienced with multi-pet homes. We use specialized equipment for pet hair removal, odor elimination, and can focus extra attention on areas where pets spend time.",
    category: "special-requests",
    tags: ["multiple pets", "pet hair", "odor", "specialized"],
    priority: 5
  },
  {
    question: "Can you help prepare my home for sale?",
    answer: "Yes! Our pre-sale deep cleaning makes homes show-ready. We focus on details that matter to buyers: sparkling bathrooms, pristine kitchens, and overall freshness that helps homes sell faster.",
    category: "special-requests",
    tags: ["home sale", "show-ready", "buyers", "details"],
    priority: 5
  },
  {
    question: "Do you clean vacation homes or seasonal properties?",
    answer: "Yes, we provide opening and closing services for seasonal homes, maintenance cleaning for vacant properties, and pre-arrival cleaning for vacation rentals.",
    category: "special-requests",
    tags: ["vacation", "seasonal", "maintenance", "vacant"],
    priority: 4
  },
  {
    question: "Can you clean after illness or contamination?",
    answer: "We can handle standard post-illness cleaning with appropriate sanitization. For serious contamination or infectious diseases, we may recommend specialized biohazard cleaning services.",
    category: "special-requests",
    tags: ["illness", "contamination", "sanitization", "biohazard"],
    priority: 4
  },
  {
    question: "What about cleaning extremely dirty or neglected homes?",
    answer: "We can handle heavily soiled properties, though these may require multiple visits or extended time. We'll assess the situation and provide a realistic timeline and pricing for restoration.",
    category: "special-requests",
    tags: ["dirty", "neglected", "multiple visits", "restoration"],
    priority: 4
  },
  {
    question: "Do you provide maintenance between deep cleans?",
    answer: "Yes, we can provide light maintenance visits between scheduled deep cleans. This might include quick tidying, bathroom touch-ups, or kitchen maintenance to keep your home fresh.",
    category: "maintenance",
    tags: ["maintenance", "light", "touch-ups", "fresh"],
    priority: 4
  }
];

// GET endpoint - Fetch all FAQ questions with search and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectToDatabase();

    // Build query
    let query: any = { isActive: true };

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Execute query with pagination
    const questions = await FAQQuestion.find(query)
      .sort(search ? { score: { $meta: 'textScore' }, priority: -1 } : { priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalQuestions = await FAQQuestion.countDocuments(query);

    // Get categories for filter
    const categories = await FAQQuestion.distinct('category', { isActive: true });

    return NextResponse.json({
      success: true,
      data: {
        questions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalQuestions / limit),
          totalQuestions,
          hasMore: skip + questions.length < totalQuestions
        },
        categories
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQ questions" },
      { status: 500 }
    );
  }
}

// POST endpoint - Create new FAQ question (Admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    await connectToDatabase();

    // If this is an initialization request, create all default questions
    if (data.initialize) {
      // Check if questions already exist
      const existingCount = await FAQQuestion.countDocuments();
      
      if (existingCount === 0) {
        // Use insertMany with ordered: false to continue on duplicates
        try {
          await FAQQuestion.insertMany(comprehensiveFAQs, { ordered: false });
        } catch (error: any) {
          // Ignore duplicate key errors during initialization
          if (error.code !== 11000) {
            throw error;
          }
        }
        
        const finalCount = await FAQQuestion.countDocuments();
        return NextResponse.json({
          success: true,
          message: `Initialized ${finalCount} FAQ questions`,
          count: finalCount
        });
      } else {
        // Clean up any potential duplicates
        const allQuestions = await FAQQuestion.find({}).sort({ createdAt: 1 });
        const questionTexts = new Set();
        const duplicatesToDelete = [];

        for (const question of allQuestions) {
          const key = question.question.toLowerCase().trim();
          if (questionTexts.has(key)) {
            duplicatesToDelete.push(question._id);
          } else {
            questionTexts.add(key);
          }
        }

        if (duplicatesToDelete.length > 0) {
          await FAQQuestion.deleteMany({ _id: { $in: duplicatesToDelete } });
        }

        const cleanCount = await FAQQuestion.countDocuments();
        return NextResponse.json({
          success: true,
          message: duplicatesToDelete.length > 0 
            ? `FAQ questions exist. Cleaned ${duplicatesToDelete.length} duplicates.`
            : "FAQ questions already exist",
          count: cleanCount
        });
      }
    }

    // Create single question
    try {
      const question = await FAQQuestion.create({
        ...data,
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: "FAQ question created successfully",
        data: question
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return NextResponse.json({
          success: false,
          error: "A question with this exact text already exists"
        }, { status: 400 });
      }
      throw error;
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create FAQ question" },
      { status: 500 }
    );
  }
}