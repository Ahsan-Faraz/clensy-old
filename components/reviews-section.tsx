"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { formatText } from "@/lib/utils/formatText";

export default function ReviewsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(8); // Start with 8 reviews for desktop
  const [visibleMobileReviews, setVisibleMobileReviews] = useState(2); // Start with 2 reviews for mobile
  const [loadMoreClicks, setLoadMoreClicks] = useState(0); // Track load more clicks
  const [reviewsAfterFirstLoad, setReviewsAfterFirstLoad] = useState(8); // Track reviews after first load more
  const [reviewsData, setReviewsData] = useState({
    heading: "What People Are <blue>Saying About Us</blue>",
    buttonText: "Load More",
  });

  // Fetch reviews data from API
  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await fetch("/api/cms/reviews");
        const result = await response.json();

        if (result.success && result.data) {
          setReviewsData({
            heading:
              result.data.heading ||
              "What People Are <blue>Saying About Us</blue>",
            buttonText: result.data.buttonText || "Load More",
          });
        }
      } catch (error) {
        console.error("Error fetching reviews data:", error);
        // Keep using default data on error
      } finally {
        setIsLoaded(true);
      }
    };

    fetchReviewsData();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Expanded reviews array with 40+ reviews
  const allReviews = [
    {
      name: "Sarah Johnson",
      title: "1 day ago",
      text: "Monica was excellent. Went beyond in helping me. My sheets and comforter were not just washed but perfectly folded. Everything was spotless!",
      rating: 5,
      initial: "S",
      initialColor: "#9C27B0",
    },
    {
      name: "Michael Chen",
      title: "3 days ago",
      text: "Clensy does the best job taking care of our house. Bailey recently cleaned our home and did an amazing job. Very thorough and professional.",
      rating: 5,
      initial: "M",
      initialColor: "#4CAF50",
    },
    {
      name: "Emily Rodriguez",
      title: "1 week ago",
      text: "Arrived as planned! Great job! Everything polished. Baseboards done. Kitchen and bathroom spotless. Will definitely book again.",
      rating: 5,
      initial: "E",
      initialColor: "#E91E63",
    },
    {
      name: "David Thompson",
      title: "2 weeks ago",
      text: "My house was cleaned by Clensy today. Susan did a great job. I asked them to pay special attention to the kitchen and they delivered.",
      rating: 5,
      initial: "D",
      initialColor: "#FF5722",
    },
    {
      name: "Jennifer Lee",
      title: "1 month ago",
      text: "The team did a great job cleaning! They were professional, polite and very thorough. I'm so happy with the results!",
      rating: 5,
      initial: "J",
      initialColor: "#2196F3",
    },
    {
      name: "Robert Garcia",
      title: "2 months ago",
      text: "Awesome job by Rashida! Consistently excellent work! Keep it up! My home has never looked better.",
      rating: 5,
      initial: "R",
      initialColor: "#673AB7",
    },
    {
      name: "Maxine Patel",
      title: "3 months ago",
      text: "Maxine was terrific! Worked fast and accurate. Looking forward to her again!!!",
      rating: 5,
      initial: "P",
      initialColor: "#3F51B5",
    },
    {
      name: "Brandon Smith",
      title: "4 months ago",
      text: "Techs are so friendly and very efficient. You will not regret one single second!",
      rating: 5,
      initial: "B",
      initialColor: "#4CAF50",
    },
    {
      name: "Amanda Wilson",
      title: "5 days ago",
      text: "Outstanding service! The cleaning crew was punctual, professional, and left my home sparkling clean. Highly recommend!",
      rating: 5,
      initial: "A",
      initialColor: "#FF9800",
    },
    {
      name: "James Martinez",
      title: "1 week ago",
      text: "Been using Clensy for 6 months now. Consistent quality every time. They pay attention to details that others miss.",
      rating: 5,
      initial: "J",
      initialColor: "#795548",
    },
    {
      name: "Lisa Anderson",
      title: "2 weeks ago",
      text: "Amazing deep clean service! They cleaned areas I didn't even think about. My house feels brand new!",
      rating: 5,
      initial: "L",
      initialColor: "#607D8B",
    },
    {
      name: "Kevin Brown",
      title: "3 weeks ago",
      text: "Professional team, fair pricing, and excellent results. They even organized my closets without being asked!",
      rating: 5,
      initial: "K",
      initialColor: "#9E9E9E",
    },
    {
      name: "Rachel Green",
      title: "1 month ago",
      text: "The best cleaning service I've ever used. They're reliable, thorough, and always leave my home immaculate.",
      rating: 5,
      initial: "R",
      initialColor: "#4CAF50",
    },
    {
      name: "Thomas Davis",
      title: "1 month ago",
      text: "Exceptional service! The team was courteous and did an incredible job. Every surface was cleaned to perfection.",
      rating: 5,
      initial: "T",
      initialColor: "#FF5722",
    },
    {
      name: "Maria Gonzalez",
      title: "6 weeks ago",
      text: "I'm amazed by the quality of work. They cleaned my home better than I ever could. Worth every penny!",
      rating: 5,
      initial: "M",
      initialColor: "#E91E63",
    },
    {
      name: "Christopher Taylor",
      title: "2 months ago",
      text: "Reliable, professional, and thorough. The team always arrives on time and does an outstanding job.",
      rating: 5,
      initial: "C",
      initialColor: "#3F51B5",
    },
    {
      name: "Nicole White",
      title: "2 months ago",
      text: "Fantastic service! They cleaned my entire house in record time without compromising on quality. Highly recommended!",
      rating: 5,
      initial: "N",
      initialColor: "#9C27B0",
    },
    {
      name: "Daniel Miller",
      title: "3 months ago",
      text: "Best investment I've made! Coming home to a spotless house every week is such a blessing. Thank you Clensy!",
      rating: 5,
      initial: "D",
      initialColor: "#FF9800",
    },
    {
      name: "Ashley Clark",
      title: "3 months ago",
      text: "The attention to detail is incredible. They clean areas that other services completely ignore. Truly professional!",
      rating: 5,
      initial: "A",
      initialColor: "#795548",
    },
    {
      name: "Ryan Lewis",
      title: "4 months ago",
      text: "Excellent service from start to finish. Easy booking, fair pricing, and exceptional cleaning quality.",
      rating: 5,
      initial: "R",
      initialColor: "#607D8B",
    },
    {
      name: "Stephanie Hall",
      title: "4 months ago",
      text: "I've tried many cleaning services, but Clensy is by far the best. They're thorough, reliable, and professional.",
      rating: 5,
      initial: "S",
      initialColor: "#2196F3",
    },
    {
      name: "Matthew Young",
      title: "5 months ago",
      text: "Outstanding work! The team is always friendly and does an amazing job. My house has never looked better!",
      rating: 5,
      initial: "M",
      initialColor: "#4CAF50",
    },
    {
      name: "Kimberly King",
      title: "5 months ago",
      text: "Professional, efficient, and thorough. They transformed my messy house into a pristine home. Absolutely love them!",
      rating: 5,
      initial: "K",
      initialColor: "#E91E63",
    },
    {
      name: "Andrew Scott",
      title: "6 months ago",
      text: "Reliable service with consistent quality. The team is always punctual and does an excellent job every time.",
      rating: 5,
      initial: "A",
      initialColor: "#FF5722",
    },
    {
      name: "Melissa Adams",
      title: "6 months ago",
      text: "Amazing service! They pay attention to every detail and always exceed my expectations. Highly recommend!",
      rating: 5,
      initial: "M",
      initialColor: "#9C27B0",
    },
    {
      name: "Jonathan Wright",
      title: "7 months ago",
      text: "Best cleaning service in town! Professional, thorough, and reasonably priced. They never disappoint!",
      rating: 5,
      initial: "J",
      initialColor: "#3F51B5",
    },
    {
      name: "Samantha Turner",
      title: "7 months ago",
      text: "Exceptional quality and service. The team is friendly, professional, and always does an outstanding job.",
      rating: 5,
      initial: "S",
      initialColor: "#FF9800",
    },
    {
      name: "Gregory Phillips",
      title: "8 months ago",
      text: "Consistently excellent service! They clean my home better than I ever could. Worth every dollar!",
      rating: 5,
      initial: "G",
      initialColor: "#795548",
    },
    {
      name: "Brittany Campbell",
      title: "8 months ago",
      text: "Professional team with amazing attention to detail. They make my home sparkle every single time!",
      rating: 5,
      initial: "B",
      initialColor: "#607D8B",
    },
    {
      name: "Tyler Parker",
      title: "9 months ago",
      text: "Outstanding service! The team is reliable, thorough, and always professional. Couldn't be happier!",
      rating: 5,
      initial: "T",
      initialColor: "#2196F3",
    },
    {
      name: "Vanessa Evans",
      title: "9 months ago",
      text: "Amazing cleaning service! They're thorough, reliable, and always leave my home looking perfect.",
      rating: 5,
      initial: "V",
      initialColor: "#4CAF50",
    },
    {
      name: "Nathan Edwards",
      title: "10 months ago",
      text: "Best decision I made was hiring Clensy! Professional service with incredible attention to detail.",
      rating: 5,
      initial: "N",
      initialColor: "#E91E63",
    },
    {
      name: "Courtney Collins",
      title: "10 months ago",
      text: "Excellent service every time! The team is professional, efficient, and always does an amazing job.",
      rating: 5,
      initial: "C",
      initialColor: "#FF5722",
    },
    {
      name: "Marcus Stewart",
      title: "11 months ago",
      text: "Reliable, professional, and thorough. They consistently deliver exceptional results. Highly recommend!",
      rating: 5,
      initial: "M",
      initialColor: "#9C27B0",
    },
    {
      name: "Heather Morris",
      title: "11 months ago",
      text: "Outstanding cleaning service! They pay attention to every detail and always exceed expectations.",
      rating: 5,
      initial: "H",
      initialColor: "#3F51B5",
    },
    {
      name: "Jordan Rogers",
      title: "1 year ago",
      text: "Professional team with exceptional service. They make my home look and feel amazing every time!",
      rating: 5,
      initial: "J",
      initialColor: "#FF9800",
    },
    {
      name: "Alexis Reed",
      title: "1 year ago",
      text: "Best cleaning service I've ever used! Thorough, reliable, and always professional. Love them!",
      rating: 5,
      initial: "A",
      initialColor: "#795548",
    },
    {
      name: "Cameron Cook",
      title: "1 year ago",
      text: "Exceptional quality and service. The team is friendly, efficient, and does an incredible job every time.",
      rating: 5,
      initial: "C",
      initialColor: "#607D8B",
    },
    {
      name: "Taylor Bell",
      title: "1 year ago",
      text: "Amazing service! They transformed my home and continue to maintain it perfectly. Couldn't be happier!",
      rating: 5,
      initial: "T",
      initialColor: "#2196F3",
    },
    {
      name: "Morgan Cooper",
      title: "1 year ago",
      text: "Professional, reliable, and thorough. They consistently deliver outstanding results. Highly recommend!",
      rating: 5,
      initial: "M",
      initialColor: "#4CAF50",
    },
    {
      name: "Casey Richardson",
      title: "1 year ago",
      text: "Best cleaning service in the area! Professional team with incredible attention to detail.",
      rating: 5,
      initial: "C",
      initialColor: "#E91E63",
    },
    {
      name: "Alex Johnson",
      title: "2 days ago",
      text: "Incredible attention to detail! They cleaned every corner of my house perfectly. The team was professional and friendly.",
      rating: 5,
      initial: "A",
      initialColor: "#FF5722",
    },
    {
      name: "Priya Sharma",
      title: "4 days ago",
      text: "Outstanding service! My kitchen has never looked so clean. They even organized my pantry without being asked.",
      rating: 5,
      initial: "P",
      initialColor: "#4CAF50",
    },
    {
      name: "Carlos Rodriguez",
      title: "6 days ago",
      text: "Best cleaning service I've ever used! They're thorough, reliable, and always exceed expectations.",
      rating: 5,
      initial: "C",
      initialColor: "#2196F3",
    },
    {
      name: "Emma Thompson",
      title: "1 week ago",
      text: "Amazing deep clean! They cleaned areas I didn't even know needed cleaning. My house feels brand new!",
      rating: 5,
      initial: "E",
      initialColor: "#9C27B0",
    },
    {
      name: "Jake Williams",
      title: "1 week ago",
      text: "Professional team with excellent results. They arrived on time and left my home spotless. Highly recommend!",
      rating: 5,
      initial: "J",
      initialColor: "#FF9800",
    },
    {
      name: "Sophie Chen",
      title: "2 weeks ago",
      text: "Fantastic service! The team was courteous and did an incredible job. Every surface was cleaned to perfection.",
      rating: 5,
      initial: "S",
      initialColor: "#795548",
    },
    {
      name: "Marcus Davis",
      title: "2 weeks ago",
      text: "Exceptional quality! They cleaned my entire house better than I ever could. Worth every penny!",
      rating: 5,
      initial: "M",
      initialColor: "#607D8B",
    },
    {
      name: "Isabella Garcia",
      title: "3 weeks ago",
      text: "Outstanding work! The team is always friendly and professional. My house has never looked better!",
      rating: 5,
      initial: "I",
      initialColor: "#3F51B5",
    },
    {
      name: "Ryan Martinez",
      title: "3 weeks ago",
      text: "Reliable and thorough service. They pay attention to details that other services completely miss.",
      rating: 5,
      initial: "R",
      initialColor: "#E91E63",
    },
    {
      name: "Olivia Brown",
      title: "1 month ago",
      text: "Amazing service! They transformed my messy house into a pristine home. Absolutely love them!",
      rating: 5,
      initial: "O",
      initialColor: "#4CAF50",
    },
    {
      name: "Ethan Wilson",
      title: "1 month ago",
      text: "Best investment I've made! Coming home to a spotless house every week is such a blessing.",
      rating: 5,
      initial: "E",
      initialColor: "#FF5722",
    },
    {
      name: "Ava Anderson",
      title: "5 weeks ago",
      text: "Professional, efficient, and thorough. They consistently deliver exceptional results every time.",
      rating: 5,
      initial: "A",
      initialColor: "#2196F3",
    },
    {
      name: "Noah Taylor",
      title: "6 weeks ago",
      text: "Excellent service from start to finish. Easy booking, fair pricing, and exceptional cleaning quality.",
      rating: 5,
      initial: "N",
      initialColor: "#9C27B0",
    },
    {
      name: "Mia Johnson",
      title: "2 months ago",
      text: "The attention to detail is incredible. They clean areas that other services completely ignore.",
      rating: 5,
      initial: "M",
      initialColor: "#FF9800",
    },
    {
      name: "Liam Miller",
      title: "2 months ago",
      text: "Fantastic service! They cleaned my home in record time without compromising on quality.",
      rating: 5,
      initial: "L",
      initialColor: "#795548",
    },
    {
      name: "Charlotte Davis",
      title: "2 months ago",
      text: "Reliable service with consistent quality. The team is always punctual and professional.",
      rating: 5,
      initial: "C",
      initialColor: "#607D8B",
    },
    {
      name: "Benjamin Garcia",
      title: "3 months ago",
      text: "Outstanding cleaning service! They're thorough, reliable, and always leave my home immaculate.",
      rating: 5,
      initial: "B",
      initialColor: "#3F51B5",
    },
    {
      name: "Amelia Rodriguez",
      title: "3 months ago",
      text: "Amazing team! They pay attention to every detail and always exceed my expectations.",
      rating: 5,
      initial: "A",
      initialColor: "#E91E63",
    },
    {
      name: "Lucas Martinez",
      title: "3 months ago",
      text: "Best cleaning service in town! Professional, thorough, and reasonably priced.",
      rating: 5,
      initial: "L",
      initialColor: "#4CAF50",
    },
    {
      name: "Harper Wilson",
      title: "4 months ago",
      text: "Exceptional quality and service. The team is friendly, professional, and always outstanding.",
      rating: 5,
      initial: "H",
      initialColor: "#FF5722",
    },
    {
      name: "Mason Anderson",
      title: "4 months ago",
      text: "Consistently excellent service! They clean my home better than I ever could. Highly recommend!",
      rating: 5,
      initial: "M",
      initialColor: "#2196F3",
    },
    {
      name: "Evelyn Taylor",
      title: "4 months ago",
      text: "Professional team with amazing attention to detail. They make my home sparkle every time!",
      rating: 5,
      initial: "E",
      initialColor: "#9C27B0",
    },
    {
      name: "Logan Thomas",
      title: "5 months ago",
      text: "Outstanding service! The team is reliable, thorough, and always professional. Couldn't be happier!",
      rating: 5,
      initial: "L",
      initialColor: "#FF9800",
    },
    {
      name: "Abigail Jackson",
      title: "5 months ago",
      text: "Amazing cleaning service! They're thorough, reliable, and always leave my home looking perfect.",
      rating: 5,
      initial: "A",
      initialColor: "#795548",
    },
    {
      name: "Sebastian White",
      title: "5 months ago",
      text: "Best decision I made was hiring Clensy! Professional service with incredible attention to detail.",
      rating: 5,
      initial: "S",
      initialColor: "#607D8B",
    },
    {
      name: "Ella Harris",
      title: "6 months ago",
      text: "Excellent service every time! The team is professional, efficient, and always does amazing work.",
      rating: 5,
      initial: "E",
      initialColor: "#3F51B5",
    },
    {
      name: "Jackson Martin",
      title: "6 months ago",
      text: "Reliable, professional, and thorough. They consistently deliver exceptional results every visit.",
      rating: 5,
      initial: "J",
      initialColor: "#E91E63",
    },
    {
      name: "Avery Thompson",
      title: "6 months ago",
      text: "Outstanding cleaning service! They pay attention to every detail and always exceed expectations.",
      rating: 5,
      initial: "A",
      initialColor: "#4CAF50",
    },
    {
      name: "Aiden Garcia",
      title: "7 months ago",
      text: "Professional team with exceptional service. They make my home look and feel amazing every time!",
      rating: 5,
      initial: "A",
      initialColor: "#FF5722",
    },
    {
      name: "Scarlett Martinez",
      title: "7 months ago",
      text: "Best cleaning service I've ever used! Thorough, reliable, and always professional. Love them!",
      rating: 5,
      initial: "S",
      initialColor: "#2196F3",
    },
    {
      name: "Carter Rodriguez",
      title: "7 months ago",
      text: "Exceptional quality and service. The team is friendly, efficient, and does incredible work.",
      rating: 5,
      initial: "C",
      initialColor: "#9C27B0",
    },
    {
      name: "Madison Wilson",
      title: "8 months ago",
      text: "Amazing service! They transformed my home and continue to maintain it perfectly. So happy!",
      rating: 5,
      initial: "M",
      initialColor: "#FF9800",
    },
    {
      name: "Grayson Anderson",
      title: "8 months ago",
      text: "Professional, reliable, and thorough. They consistently deliver outstanding results. Highly recommend!",
      rating: 5,
      initial: "G",
      initialColor: "#795548",
    },
    {
      name: "Layla Taylor",
      title: "8 months ago",
      text: "Best cleaning service in the area! Professional team with incredible attention to detail.",
      rating: 5,
      initial: "L",
      initialColor: "#607D8B",
    },
    {
      name: "Luke Thomas",
      title: "9 months ago",
      text: "Outstanding work! The team is always friendly and does an amazing job. House looks perfect!",
      rating: 5,
      initial: "L",
      initialColor: "#3F51B5",
    },
    {
      name: "Chloe Jackson",
      title: "9 months ago",
      text: "Professional, efficient, and thorough. They transformed my messy house into a pristine home.",
      rating: 5,
      initial: "C",
      initialColor: "#E91E63",
    },
    {
      name: "Owen White",
      title: "9 months ago",
      text: "Reliable service with consistent quality. The team is always punctual and does excellent work.",
      rating: 5,
      initial: "O",
      initialColor: "#4CAF50",
    },
    {
      name: "Zoey Harris",
      title: "10 months ago",
      text: "Amazing service! They pay attention to every detail and always exceed my expectations.",
      rating: 5,
      initial: "Z",
      initialColor: "#FF5722",
    },
    {
      name: "Wyatt Martin",
      title: "10 months ago",
      text: "Best cleaning service in town! Professional, thorough, and reasonably priced. Never disappoint!",
      rating: 5,
      initial: "W",
      initialColor: "#2196F3",
    },
    {
      name: "Grace Thompson",
      title: "10 months ago",
      text: "Exceptional quality and service. The team is friendly, professional, and always outstanding.",
      rating: 5,
      initial: "G",
      initialColor: "#9C27B0",
    },
    {
      name: "Jayden Garcia",
      title: "11 months ago",
      text: "Consistently excellent service! They clean my home better than I ever could. Worth every dollar!",
      rating: 5,
      initial: "J",
      initialColor: "#FF9800",
    },
    {
      name: "Victoria Martinez",
      title: "11 months ago",
      text: "Professional team with amazing attention to detail. They make my home sparkle every single time!",
      rating: 5,
      initial: "V",
      initialColor: "#795548",
    },
    {
      name: "Easton Rodriguez",
      title: "11 months ago",
      text: "Outstanding service! The team is reliable, thorough, and always professional. Couldn't be happier!",
      rating: 5,
      initial: "E",
      initialColor: "#607D8B",
    },
    {
      name: "Aubrey Wilson",
      title: "1 year ago",
      text: "Amazing cleaning service! They're thorough, reliable, and always leave my home looking perfect.",
      rating: 5,
      initial: "A",
      initialColor: "#3F51B5",
    },
    {
      name: "Nolan Anderson",
      title: "1 year ago",
      text: "Best decision I made was hiring Clensy! Professional service with incredible attention to detail.",
      rating: 5,
      initial: "N",
      initialColor: "#E91E63",
    },
    {
      name: "Brooklyn Taylor",
      title: "1 year ago",
      text: "Excellent service every time! The team is professional, efficient, and always does amazing work.",
      rating: 5,
      initial: "B",
      initialColor: "#4CAF50",
    },
    {
      name: "Eli Thomas",
      title: "1 year ago",
      text: "Reliable, professional, and thorough. They consistently deliver exceptional results every visit.",
      rating: 5,
      initial: "E",
      initialColor: "#FF5722",
    },
    {
      name: "Savannah Jackson",
      title: "1 year ago",
      text: "Outstanding cleaning service! They pay attention to every detail and always exceed expectations.",
      rating: 5,
      initial: "S",
      initialColor: "#2196F3",
    },
    {
      name: "Adrian White",
      title: "1 year ago",
      text: "Professional team with exceptional service. They make my home look and feel amazing every time!",
      rating: 5,
      initial: "A",
      initialColor: "#9C27B0",
    },
    {
      name: "Bella Harris",
      title: "1 year ago",
      text: "Best cleaning service I've ever used! Thorough, reliable, and always professional. Love them!",
      rating: 5,
      initial: "B",
      initialColor: "#FF9800",
    },
    {
      name: "Ian Martin",
      title: "1 year ago",
      text: "Exceptional quality and service. The team is friendly, efficient, and does incredible work every time.",
      rating: 5,
      initial: "I",
      initialColor: "#795548",
    },
    {
      name: "Leah Thompson",
      title: "1 year ago",
      text: "Amazing service! They transformed my home and continue to maintain it perfectly. So satisfied!",
      rating: 5,
      initial: "L",
      initialColor: "#607D8B",
    },
    {
      name: "Colton Garcia",
      title: "1 year ago",
      text: "Professional, reliable, and thorough. They consistently deliver outstanding results. Highly recommend!",
      rating: 5,
      initial: "C",
      initialColor: "#3F51B5",
    },
    {
      name: "Hazel Martinez",
      title: "1 year ago",
      text: "Best cleaning service in the area! Professional team with incredible attention to detail and care.",
      rating: 5,
      initial: "H",
      initialColor: "#E91E63",
    },
    {
      name: "Axel Rodriguez",
      title: "1 year ago",
      text: "Outstanding work! The team is always friendly and does an amazing job. House always looks perfect!",
      rating: 5,
      initial: "A",
      initialColor: "#4CAF50",
    },
    {
      name: "Violet Wilson",
      title: "1 year ago",
      text: "Professional, efficient, and thorough. They transformed my messy house into a pristine, beautiful home.",
      rating: 5,
      initial: "V",
      initialColor: "#FF5722",
    },
    {
      name: "Jaxon Anderson",
      title: "1 year ago",
      text: "Reliable service with consistent quality. The team is always punctual and does excellent, thorough work.",
      rating: 5,
      initial: "J",
      initialColor: "#2196F3",
    },
    {
      name: "Aurora Taylor",
      title: "1 year ago",
      text: "Amazing service! They pay attention to every detail and always exceed my expectations. Truly exceptional!",
      rating: 5,
      initial: "A",
      initialColor: "#9C27B0",
    },
    {
      name: "Cooper Thomas",
      title: "1 year ago",
      text: "Best cleaning service in town! Professional, thorough, and reasonably priced. They never disappoint!",
      rating: 5,
      initial: "C",
      initialColor: "#FF9800",
    },
    {
      name: "Nova Jackson",
      title: "1 year ago",
      text: "Exceptional quality and service. The team is friendly, professional, and always delivers outstanding results.",
      rating: 5,
      initial: "N",
      initialColor: "#795548",
    },
    {
      name: "Kai White",
      title: "1 year ago",
      text: "Consistently excellent service! They clean my home better than I ever could. Worth every single penny!",
      rating: 5,
      initial: "K",
      initialColor: "#607D8B",
    },
    {
      name: "Genesis Harris",
      title: "1 year ago",
      text: "Professional team with amazing attention to detail. They make my home sparkle and shine every time!",
      rating: 5,
      initial: "G",
      initialColor: "#3F51B5",
    },
    {
      name: "Ryder Martin",
      title: "1 year ago",
      text: "Outstanding service! The team is reliable, thorough, and always professional. Couldn't be any happier!",
      rating: 5,
      initial: "R",
      initialColor: "#E91E63",
    },
    {
      name: "Willow Thompson",
      title: "1 year ago",
      text: "Amazing cleaning service! They're thorough, reliable, and always leave my home looking absolutely perfect.",
      rating: 5,
      initial: "W",
      initialColor: "#4CAF50",
    },
    {
      name: "Declan Garcia",
      title: "1 year ago",
      text: "Best decision I made was hiring Clensy! Professional service with incredible attention to every detail.",
      rating: 5,
      initial: "D",
      initialColor: "#FF5722",
    },
    {
      name: "Ivy Martinez",
      title: "1 year ago",
      text: "Excellent service every time! The team is professional, efficient, and always does absolutely amazing work.",
      rating: 5,
      initial: "I",
      initialColor: "#2196F3",
    },
    {
      name: "Rowan Rodriguez",
      title: "1 year ago",
      text: "Reliable, professional, and thorough. They consistently deliver exceptional results with every single visit.",
      rating: 5,
      initial: "R",
      initialColor: "#9C27B0",
    },
    {
      name: "Sage Wilson",
      title: "1 year ago",
      text: "Outstanding cleaning service! They pay attention to every detail and always exceed all my expectations.",
      rating: 5,
      initial: "S",
      initialColor: "#FF9800",
    },
    {
      name: "Phoenix Anderson",
      title: "1 year ago",
      text: "Professional team with exceptional service. They make my home look and feel amazing every single time!",
      rating: 5,
      initial: "P",
      initialColor: "#795548",
    },
  ];

  const handleLoadMore = () => {
    // For desktop
    setVisibleReviews((prev) => {
      const newCount = Math.min(prev + 8, allReviews.length);
      console.log(`Loading more reviews: ${prev} -> ${newCount}`);

      // After first load more click, save the count for hide functionality
      if (loadMoreClicks === 0) {
        setReviewsAfterFirstLoad(newCount);
      }

      return newCount;
    });
    
    // For mobile - load 4 more reviews
    setVisibleMobileReviews((prev) => Math.min(prev + 4, allReviews.length));
    setLoadMoreClicks((prev) => prev + 1);
  };

  const handleHide = () => {
    setVisibleReviews(reviewsAfterFirstLoad); // Hide to reviews after first load more
    setLoadMoreClicks(1); // Reset to 1 click (after first load more)
  };

  // Defensive: never show more than allReviews.length
  const displayedReviews = allReviews.slice(
    0,
    Math.min(visibleReviews, allReviews.length)
  );

  const displayedMobileReviews = allReviews.slice(
    0,
    Math.min(visibleMobileReviews, allReviews.length)
  );

  // Check if there are more reviews to show
  const hasMoreReviews = visibleReviews < allReviews.length;
  const hasMoreMobileReviews = visibleMobileReviews < allReviews.length;

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {formatText(reviewsData.heading)}
          </h2>
        </motion.div>

        {/* Desktop Reviews Grid - Hidden on mobile */}
        <motion.div
          variants={containerVariants}
          initial="visible"
          animate={controls}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayedReviews.map((review, index) => (
            <motion.div
              key={`${review.name}-${index}`}
              variants={cardVariants}
              initial="visible"
              animate="visible"
              className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full"
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3"
                  style={{ backgroundColor: review.initialColor }}
                >
                  {review.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.title}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    fill="#FBBC05"
                    stroke="none"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm flex-grow mb-4">
                {review.text}
              </p>
              <div className="mt-auto">
                <div className="inline-flex items-center">
                  <img
                    src="google-icon.svg"
                    alt="Google"
                    className="h-4 w-4 mr-1"
                  />
                  <span className="text-xs text-gray-500">Review</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Reviews Grid - Visible only on mobile */}
        <motion.div
          variants={containerVariants}
          initial="visible"
          animate={controls}
          className="md:hidden grid grid-cols-1 gap-6"
        >
          {displayedMobileReviews.map((review, index) => (
            <motion.div
              key={`mobile-${review.name}-${index}`}
              variants={cardVariants}
              initial="visible"
              animate="visible"
              className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3"
                  style={{ backgroundColor: review.initialColor }}
                >
                  {review.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.title}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    fill="#FBBC05"
                    stroke="none"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm flex-grow mb-4">
                {review.text}
              </p>
              <div className="mt-auto">
                <div className="inline-flex items-center">
                  <img
                    src="google-icon.svg"
                    alt="Google"
                    className="h-4 w-4 mr-1"
                  />
                  <span className="text-xs text-gray-500">Review</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More and Hide Buttons */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-12"
        >
          <div className="flex justify-center gap-4 flex-wrap">
            {/* Load More Button - Desktop version */}
            {hasMoreReviews && (
              <motion.button
                onClick={handleLoadMore}
                disabled={!hasMoreReviews}
                whileHover={{
                  scale: hasMoreReviews ? 1.03 : 1,
                  boxShadow: hasMoreReviews
                    ? "0 4px 12px rgba(0, 122, 255, 0.2)"
                    : "none",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: hasMoreReviews ? 0.98 : 1 }}
                className={`hidden md:inline-flex px-8 py-3 rounded-full font-medium shadow-sm transition-all duration-200 ${
                  hasMoreReviews
                    ? "text-white bg-[#007AFF] hover:bg-[#0069D9] cursor-pointer"
                    : "text-gray-400 bg-gray-200 cursor-not-allowed"
                }`}
              >
                {reviewsData.buttonText}
              </motion.button>
            )}

            {/* Load More Button - Mobile version */}
            {hasMoreMobileReviews && (
              <motion.button
                onClick={handleLoadMore}
                disabled={!hasMoreMobileReviews}
                whileHover={{
                  scale: hasMoreMobileReviews ? 1.03 : 1,
                  boxShadow: hasMoreMobileReviews
                    ? "0 4px 12px rgba(0, 122, 255, 0.2)"
                    : "none",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: hasMoreMobileReviews ? 0.98 : 1 }}
                className={`md:hidden px-8 py-3 rounded-full font-medium shadow-sm transition-all duration-200 ${
                  hasMoreMobileReviews
                    ? "text-white bg-[#007AFF] hover:bg-[#0069D9] cursor-pointer"
                    : "text-gray-400 bg-gray-200 cursor-not-allowed"
                }`}
              >
                {reviewsData.buttonText}
              </motion.button>
            )}

            {/* Hide Button - Only show after 2 load more clicks */}
            {loadMoreClicks >= 2 && (
              <motion.button
                onClick={handleHide}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 4px 12px rgba(107, 114, 128, 0.2)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-full font-medium shadow-sm transition-all duration-200 text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300"
              >
                Hide
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Show total reviews count when all are loaded */}
        {!hasMoreReviews && (
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-center mt-8"
          >
            <p className="text-gray-600 text-sm">
              Showing all {allReviews.length} reviews
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
