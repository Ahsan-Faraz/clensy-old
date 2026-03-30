"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import { formatText } from "@/lib/utils/formatText"


// Define types for our data structures
type CleaningType = "routine" | "deep" | "moving"
type RoomType = "kitchen" | "bathroom" | "bedroom" | "living"

interface ModalData {
  title: string
  routine: string[]
  deep: string[]
  moving: string[]
  image: string
}

// Default data in case the API call fails
const defaultData = {
  heading: "Our 50-Point Cleaning Checklist",
  description: "We don't miss a spot. Here's our comprehensive cleaning checklist for every room in your home.",
  checklistItems: {
    routine: {
      living: [
        "Sweep, Vacuum, & Mop Floors",
        "Upholstered furniture vacuumed",
        "Dust all surfaces and decor",
        "Dust electronics and TV stands",
        "Fluff and straighten couch cushions & pillows",
        "Clean mirrors and glass surfaces",
        "Light (5 minutes) Organization of room",
        "Trash emptied",
      ],
      kitchen: [
        "Sweep, Vacuum, & Mop Floors",
        "Wipe down countertops",
        "Wipe down Stove Top",
        "Clean exterior of appliances",
        "Sinks scrubbed and disinfected (dishes upon request)",
        "Wipe exterior of cabinets and handles",
        "Clean Stove Top",
        "Trash emptied",
      ],
      bathroom: [
        "Sweep, Vacuum, & Mop Floors",
        "Scrub and sanitize showers and tubs",
        "Clean and disinfect toilets",
        "Scrub and disinfect sink and countertops",
        "Chrome fixtures cleaned and shined",
        "Clean mirrors",
        "Towels neatly hung and folded",
        "Trash Emptied",
      ],
      bedroom: [
        "Sweep, Vacuum, & Mop Floors",
        "Beds made, linens changed (if linens are left on bed)",
        "Dust bedroom shelving, night stand, & bed frame",
        "Picture frames dusted",
        "Mirrors Cleaned",
        "Light (5 minutes) Organization of room",
        "Ensure overall room looks neat, tidy, and \"hotel-fresh\"",
        "Trash Emptied",
      ],
    },
    deep: {
      living: [
        "Everything in routine +",
        "Vacuum inside couch cushions (if removable)",
        "Ceiling fans and light fixtures dusted",
        "Remove cobwebs from corners and ceilings",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Behind/under furniture",
        "Window Sills",
      ],
      kitchen: [
        "Everything in routine +",
        "Clean inside microwave",
        "Kitchen Backsplash",
        "Degrease Stovetop",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Tables, chairs, & behind/under furniture",
        "Window Sills",
      ],
      bathroom: [
        "Everything in routine +",
        "Remove hard water stains (where possible)",
        "Scrub grout lines (moderate scrubbing)",
        "Ceiling fans and light fixtures dusted",
        "Dust vent covers and ceiling corners",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Window Sills",
      ],
      bedroom: [
        "Everything in routine +",
        "Ceiling fans and light fixtures dusted",
        "Remove cobwebs from corners and ceilings",
        "Wipe baseboards and molding",
        "Doors, door frames, & light switches",
        "Behind/under furniture",
        "Window Sills",
        "Wipe down decor items (vases, candle holders, etc.)",
      ],
    },
    moving: {
      living: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Dust and wipe all baseboards and molding",
        "Clean interior window glass and wipe window sills",
        "Remove cobwebs from ceilings and corners",
        "Clean doors, handles, and light switches",
        "Dust and wipe ceiling fans and light fixtures",
        "Clean inside closets and shelving (if any)",
        "Trash Emptied",
      ],
      kitchen: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Clean and disinfect inside and outside of all cabinets and drawers",
        "Clean inside and outside of refrigerator",
        "Clean inside and outside of oven",
        "Scrub and disinfect sink and faucet",
        "Wipe all countertops and backsplash",
        "Clean exterior and interior of microwave and other appliances",
        "Wipe down baseboards, door frames, and light switches",
      ],
      bathroom: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Scrub and disinfect toilet (inside, outside, and behind)",
        "Deep clean shower/tub (remove soap scum, mildew, grout scrubbing)",
        "Clean inside and outside of all drawers, cabinets, and vanities",
        "Scrub and polish sink, faucet, and countertops",
        "Clean mirrors and any glass shower doors",
        "Wipe baseboards and door trim",
        "Dust and clean vents, fan covers, and corners",
      ],
      bedroom: [
        "Sweep, Vacuum and mop floors thoroughly",
        "Clean inside closets, including shelving and floor",
        "Wipe baseboards and door trim",
        "Clean interior window glass and wipe window sills",
        "Dust and wipe ceiling fans and light fixtures",
        "Clean light switches, doors, and outlet covers",
        "Remove cobwebs and dust from ceiling corners",
        "Trash Emptied",
      ],
    },
  },
  buttonText: "View Full 50-Point Checklist",
}

// Room images mapping
const roomImages = {
  living: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069416/website-images/ybxxaliusujslwciplyb.jpg",
  kitchen: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069417/website-images/y1jwhpsvkcdznrehbatk.jpg",
  bathroom: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069426/website-images/hbni4r1jfgawyay3od41.jpg",
  bedroom: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069425/website-images/of8tqpfw4nky9boexhhg.jpg",
}

interface ChecklistData {
  heading: string
  description: string
  checklistItems: {
    routine: {
      living: string[]
      kitchen: string[]
      bathroom: string[]
      bedroom: string[]
    }
    deep: {
      living: string[]
      kitchen: string[]
      bathroom: string[]
      bedroom: string[]
    }
    moving: {
      living: string[]
      kitchen: string[]
      bathroom: string[]
      bedroom: string[]
    }
  }
  buttonText: string
}

export default function ChecklistSection() {
  const [activeRoom, setActiveRoom] = useState("living")
  const [cleaningType, setCleaningType] = useState("routine")
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [isLoaded, setIsLoaded] = useState(false)
  const [checklistData, setChecklistData] = useState<ChecklistData>(defaultData)
  const [dataVersion, setDataVersion] = useState(0)


  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<ModalData>({
    title: "",
    routine: [],
    deep: [],
    moving: [],
    image: "",
  })
  const [activeCleaningType, setActiveCleaningType] = useState<CleaningType>("routine")

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Fetch checklist data from API
  useEffect(() => {
    const fetchChecklistData = async () => {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/cms/checklist?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
        const result = await response.json()
        if (result.success && result.data) {
          const newData = {
            heading: result.data.heading || defaultData.heading,
            description: result.data.description || defaultData.description,
            checklistItems: result.data.checklistItems || defaultData.checklistItems,
            buttonText: result.data.buttonText || defaultData.buttonText,
          }
          setChecklistData(newData)
        }
      } catch (error) {
        console.error("Error fetching checklist data:", error)
        // Keep using default data on error
      } finally {
        setIsLoaded(true)
      }
    }

    fetchChecklistData()
  }, [dataVersion])

  // Handle room click for modal
  const handleRoomClick = (room: RoomType) => {
    const roomTitles = {
      living: "Living Room",
      kitchen: "Kitchen",
      bathroom: "Bathroom",
      bedroom: "Bedroom",
    }

    setModalData({
      title: roomTitles[room],
      routine: checklistData.checklistItems.routine[room],
      deep: checklistData.checklistItems.deep[room],
      moving: checklistData.checklistItems.moving[room],
      image: roomImages[room],
    })
    setActiveCleaningType("routine")
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false);
    
    // Clear modal data after animation completes
    setTimeout(() => {
      setModalData({
        title: "",
        routine: [],
        deep: [],
        moving: [],
        image: "",
      })
    }, 300)
  }

  // Effect to handle body scroll locking when modal is open
  useEffect(() => {
    if (showModal) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Store scroll position in a more reliable way
      sessionStorage.setItem('modal-scroll-position', scrollY.toString());

      // Disable scrolling on both body and html
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Get stored scroll position
      const scrollY = sessionStorage.getItem('modal-scroll-position');

      // Re-enable scrolling
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";

      // Restore scroll position with multiple fallback methods
      if (scrollY) {
        const scrollPosition = parseInt(scrollY);
        
        // Use requestAnimationFrame for smoother restoration
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollPosition,
            left: 0,
            behavior: 'instant'
          });
          
          // Additional fallback after a short delay
          setTimeout(() => {
            window.scrollTo({
              top: scrollPosition,
              left: 0,
              behavior: 'instant'
            });
          }, 50);
        });
        
        // Clean up
        sessionStorage.removeItem('modal-scroll-position');
      }
    }

    // Cleanup function to ensure scrolling is restored
    return () => {
      const scrollY = sessionStorage.getItem('modal-scroll-position');
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      
      if (scrollY) {
        const scrollPosition = parseInt(scrollY);
        window.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: 'instant'
        });
        sessionStorage.removeItem('modal-scroll-position');
      }
    };
  }, [showModal])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Interactive house floor plan with improved sizing and positioning
  const renderHouseFloorPlan = () => {
    return (
      <div className="relative w-full rounded-lg overflow-hidden">
        {/* Main floor plan container - Made larger */}
        <div className="image-map-wrapper">
          <div className="image-container">
            <div className="image-wrapper">
              <picture>
                <source
                  media="(max-width:450px)"
                  srcSet="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069449/website-images/rzv9r7sgs6wgchwgh7kq.svg"
                />
                <source
                  media="(max-width:800px)"
                  srcSet="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069449/website-images/rzv9r7sgs6wgchwgh7kq.svg"
                />
                <source
                  media="(max-width:1200px)"
                  srcSet="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069449/website-images/rzv9r7sgs6wgchwgh7kq.svg"
                />
                <Image
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069438/website-images/j5wxvoguffksq4fwffuc.svg"
                  alt="The 50-Point Checklist"
                  width={1800}
                  height={1000}
                  className="image-wrapper-item w-full h-auto min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                  priority
                />
              </picture>
            </div>
            <div className="points-wrapper absolute inset-0" data-animation="inview-fade-up" data-inview="true">
              {/* Living Room Point - Repositioned */}
              <button
                className={`point absolute ${activeRoom === "living" ? "active" : ""}`}
                style={{ left: "42%", bottom: "35%" }}
                onClick={() => setActiveRoom("living")}
              >
                <span className="point-label icon-house">
                  <div
                    className={`point-icon ${
                      activeRoom === "living" ? "bg-[#007BFF]" : "bg-white/80"
                    } p-2 rounded-md shadow-lg mb-1`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        stroke={activeRoom === "living" ? "white" : "#007BFF"}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="text-center text-white font-bold text-sm bg-[#007BFF] py-1 px-3 rounded-md">
                    LIVING ROOM
                  </div>
                </span>
              </button>

              {/* Kitchen Point - Repositioned */}
              <button
                className={`point absolute ${activeRoom === "kitchen" ? "active" : ""}`}
                style={{ right: "12%", bottom: "25%" }}
                onClick={() => setActiveRoom("kitchen")}
              >
                <span className="point-label icon-plate-set">
                  <div
                    className={`point-icon ${
                      activeRoom === "kitchen" ? "bg-[#007BFF]" : "bg-white/80"
                    } p-2 rounded-md shadow-lg mb-1`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="4"
                        y="4"
                        width="16"
                        height="16"
                        stroke={activeRoom === "kitchen" ? "white" : "#007BFF"}
                        strokeWidth="2"
                      />
                      <path d="M4 8H20" stroke={activeRoom === "kitchen" ? "white" : "#007BFF"} strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="text-center text-white font-bold text-sm bg-[#007BFF] py-1 px-3 rounded-md">
                    KITCHEN
                  </div>
                </span>
              </button>

              {/* Bedroom Point - Repositioned */}
              <button
                className={`point absolute ${activeRoom === "bedroom" ? "active" : ""}`}
                style={{ left: "15%", top: "25%" }}
                onClick={() => setActiveRoom("bedroom")}
              >
                <span className="point-label icon-bed">
                  <div
                    className={`point-icon ${
                      activeRoom === "bedroom" ? "bg-[#007BFF]" : "bg-white/80"
                    } p-2 rounded-md shadow-lg mb-1`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 18V12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12V18"
                        stroke={activeRoom === "bedroom" ? "white" : "#007BFF"}
                        strokeWidth="2"
                      />
                      <path d="M2 18H22" stroke={activeRoom === "bedroom" ? "white" : "#007BFF"} strokeWidth="2" />
                      <path
                        d="M6 11V8C6 7.44772 6.44772 7 7 7H17C17.5523 7 18 7.44772 18 8V11"
                        stroke={activeRoom === "bedroom" ? "white" : "#007BFF"}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="text-center text-white font-bold text-sm bg-[#007BFF] py-1 px-3 rounded-md">
                    BEDROOMS
                  </div>
                </span>
              </button>

              {/* Bathroom Point - Repositioned */}
              <button
                className={`point absolute ${activeRoom === "bathroom" ? "active" : ""}`}
                style={{ right: "18%", top: "15%" }}
                onClick={() => setActiveRoom("bathroom")}
              >
                <span className="point-label icon-vanity">
                  <div
                    className={`point-icon ${
                      activeRoom === "bathroom" ? "bg-[#007BFF]" : "bg-white/80"
                    } p-2 rounded-md shadow-lg mb-1`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8H20" stroke={activeRoom === "bathroom" ? "white" : "#007BFF"} strokeWidth="2" />
                      <path d="M8 8V20" stroke={activeRoom === "bathroom" ? "white" : "#007BFF"} strokeWidth="2" />
                      <path d="M16 8V20" stroke={activeRoom === "bathroom" ? "white" : "#007BFF"} strokeWidth="2" />
                      <path d="M4 12H20" stroke={activeRoom === "bathroom" ? "white" : "#007BFF"} strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="text-center text-white font-bold text-sm bg-[#007BFF] py-1 px-3 rounded-md">
                    BATHROOMS
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section ref={ref} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {formatText(checklistData.heading)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {formatText(checklistData.description)}
            </motion.p>
          </div>


          {/* Cleaning Type Buttons - Fixed for mobile */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 w-full max-w-md">
              <button
                onClick={() => setCleaningType("routine")}
                className={`flex-1 px-3 py-3 font-medium text-sm transition-all duration-300 rounded-md ${
                  cleaningType === "routine" ? "bg-[#007BFF] text-white shadow-md" : "text-gray-600 hover:text-[#007BFF]"
                }`}
              >
                Routine
              </button>
              <button
                onClick={() => setCleaningType("deep")}
                className={`flex-1 px-3 py-3 font-medium text-sm transition-all duration-300 rounded-md ${
                  cleaningType === "deep" ? "bg-[#007BFF] text-white shadow-md" : "text-gray-600 hover:text-[#007BFF]"
                }`}
              >
                Deep
              </button>
              <button
                onClick={() => setCleaningType("moving")}
                className={`flex-1 px-3 py-3 font-medium text-sm transition-all duration-300 rounded-md ${
                  cleaningType === "moving" ? "bg-[#007BFF] text-white shadow-md" : "text-gray-600 hover:text-[#007BFF]"
                }`}
              >
                Moving
              </button>
            </div>
          </motion.div>

          {/* Mobile Room Selection Tabs */}
          <div className="md:hidden mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max p-2">
              {Object.entries({
                bedroom: "Bedroom",
                bathroom: "Bathroom",
                living: "Living Room",
                kitchen: "Kitchen"
              }).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveRoom(key)}
                  className={`
                    px-6 py-3 rounded-lg font-medium text-sm transition-all
                    ${activeRoom === key 
                      ? 'bg-[#007BFF] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          

          {/* Updated grid layout to give more space to the image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid lg:grid-cols-3 gap-8 items-start"
          >
            {/* Interactive House Floor Plan - Hidden on Mobile */}
            <motion.div variants={itemVariants} className="relative lg:col-span-2 order-2 lg:order-1 hidden md:block">
              {renderHouseFloorPlan()}
            </motion.div>

            {/* Checklist Content */}
            <motion.div variants={itemVariants} className="space-y-6 order-1 lg:order-2">
              <div className="p-4 lg:p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-6 capitalize flex items-center font-montserrat">
                  <div className="w-3 h-3 rounded-full bg-[#007BFF] mr-2"></div>
                  {activeRoom === "living" ? "Living Room" : activeRoom.charAt(0).toUpperCase() + activeRoom.slice(1)}
                </h3>
                <ul className="space-y-4">
                  {checklistData.checklistItems[cleaningType as keyof typeof checklistData.checklistItems][
                    activeRoom as keyof typeof checklistData.checklistItems.routine
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-[#007BFF]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                        }}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </motion.div>
                      <span className="text-gray-900 font-montserrat">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* View Full Checklist Button */}
              <div className="text-center">
                <Link
                  href="/company/checklist"
                  className="text-[#007BFF] border border-[#007BFF] hover:bg-[#007BFF]/10 px-6 py-2 rounded-full text-sm font-medium inline-flex items-center transition-all duration-300"
                >
                  {checklistData.buttonText}
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal for Room Details with Cleaning Types */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/60"
          >
            <div className="w-full max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="relative w-full bg-white shadow-2xl rounded-xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={
                        modalData.image ||
                        "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069406/website-images/gko1svk46tpiiewa5ln1.jpg"
                      }
                      alt={modalData.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h3 className="text-2xl font-bold text-white">{modalData.title}</h3>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 bg-white text-gray-800">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      Cleaning Checklist
                    </h3>

                    {/* Cleaning Type Tabs - Hidden on mobile, shown on desktop */}
                    <div className="hidden md:flex mb-6 border-b border-gray-200">
                      <button
                        onClick={() => setActiveCleaningType("routine")}
                        className={`py-2 px-4 font-medium text-sm ${
                          activeCleaningType === "routine"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-blue-500"
                        }`}
                      >
                        Routine Cleaning
                      </button>
                      <button
                        onClick={() => setActiveCleaningType("deep")}
                        className={`py-2 px-4 font-medium text-sm ${
                          activeCleaningType === "deep"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-blue-500"
                        }`}
                      >
                        Deep Cleaning
                      </button>
                      <button
                        onClick={() => setActiveCleaningType("moving")}
                        className={`py-2 px-4 font-medium text-sm ${
                          activeCleaningType === "moving"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-blue-500"
                        }`}
                      >
                        Move In/Out
                      </button>
                    </div>

                    <ul className="space-y-3 h-[300px] overflow-y-auto pr-2">
                      {modalData[activeCleaningType] &&
                        modalData[activeCleaningType].map((item: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                              <Check className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                    </ul>

                    <div className="mt-8">
                      <Link
                        href="/booking/"
                        className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-all duration-300 shadow-lg"
                      >
                        Book a cleaning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Mobile Cleaning Type Tabs - Below modal */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="flex justify-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveCleaningType("routine")}
                    className={`flex-1 py-2 px-3 font-medium text-xs rounded-md transition-all duration-300 ${
                      activeCleaningType === "routine"
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    Routine
                  </button>
                  <button
                    onClick={() => setActiveCleaningType("deep")}
                    className={`flex-1 py-2 px-3 font-medium text-xs rounded-md transition-all duration-300 ${
                      activeCleaningType === "deep"
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    Deep
                  </button>
                  <button
                    onClick={() => setActiveCleaningType("moving")}
                    className={`flex-1 py-2 px-3 font-medium text-xs rounded-md transition-all duration-300 ${
                      activeCleaningType === "moving"
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    Moving
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  )
}
