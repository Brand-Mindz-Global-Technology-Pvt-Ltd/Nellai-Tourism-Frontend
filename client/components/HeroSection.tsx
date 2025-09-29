  import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, cubicBezier, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const images = [
  {
    id: 1,
    src: "/images/hero/Frame.png",
    title: "Travel Beyond Ordinary",
    subtitle: " Welcome to Nellai Tourism",
    description:
      "Discover unforgettable journeys with Nellai Tours — from curated stays to seamless planning. Every trip is crafted for comfort, adventure, and memories.",
    callToAction: "Explore More",
    color: "#ffffff",
  },
  {
    id: 2,
    src: "/images/hero/herosection-2.jpg",
    title: "Singapore",
    subtitle: "Discover Dynamic Singapore",
    description:"Skylines, culture, and iconic attractions in one trip.",
    callToAction: "Explore More",
    color: "#f8f9fa",
  },
  {
    id: 3,
    src: "/images/hero/herosection-3.jpg",
    title: "Malaysia",
    subtitle: " Journey Through Malaysia",
    description:"Islands, heritage, and flavors for every traveler’s delight.",
    callToAction: "Explore More",
    color: "#fff5e6",
  },
  {
    id: 4,
    src: "/images/hero/herosection-4.jpg",
    title: " Indonesia",
    subtitle: "Uncover Indonesia’s Wonders",
    description:
      "Pristine beaches, culture, and adventures across the islands",
    callToAction: "Explore More",
    color: "#eef2f3",
  },
  {
    id: 5,
    src: "/images/hero/search-background.jpg",
    title: "Thailand",
    subtitle: "Experience Enchanting Thailand",
    description:"Golden temples, lively markets, and serene beach escapes.",
    callToAction: "Explore More",
    color: "#f9f9f9",
  },
  {
    id: 6,
    src: "/images/hero/herosection-2 (2).jpg",
    title: "Goreme Valley",
    subtitle: "Cappadocia, Turkey",
    description:
      "Witness the magical landscape of Cappadocia from a hot air balloon. The fairy chimneys and ancient cave dwellings of Goreme await.",
    callToAction: "Explore More",
    color: "#f7f8fa",
  },
];

const SEAMLESS_TRANSITION = {
  duration: 1.4,
  ease: cubicBezier(0.87, 0, 0.13, 1),
};

// Animation variants for the header
const headerVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};


export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayOrder, setDisplayOrder] = useState(
    images.map((img) => img.id).filter((id) => id !== images[0].id)
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showRestartEffect, setShowRestartEffect] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const prevIndexRef = useRef(0);

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        const nextIndex = (prev + 1) % images.length;
        if (nextIndex === 0) {
          setShowRestartEffect(true);
        }
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Update order
  useEffect(() => {
    const newActiveId = images[activeIdx].id;
    const prevActiveId = images[prevIndexRef.current].id;

    setDisplayOrder((currentOrder) => {
      let newOrder = currentOrder.filter((id) => id !== newActiveId);
      if (!newOrder.includes(prevActiveId)) {
        newOrder.push(prevActiveId);
      }
      return newOrder;
    });

    prevIndexRef.current = activeIdx;
  }, [activeIdx]);

  // Scroll detection for fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeImage = images[activeIdx];
  const handleCardClick = (id) => {
    const newIndex = images.findIndex((img) => img.id === id);
    if (newIndex === activeIdx) return;

    if (newIndex === 0 && activeIdx === images.length - 1) {
      setShowRestartEffect(true);
    }
    setActiveIdx(newIndex);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black select-none">
      {/* ✅ Header: Updated to use Framer Motion for a clean slide-down animation */}
      <AnimatePresence>
        {isScrolled ? (
          <motion.header
            key="sticky-header"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full z-50 py-3 px-6 md:px-10 flex justify-between items-center shadow-xl"
            style={{
              backgroundColor: activeImage.color,
            }}
          >
            {/* Header content is duplicated for simplicity, can be componentized */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo/nellai-tours-logo.png"
                  alt="Nellai Tourism Logo"
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-base font-medium text-[#2C2A6B] leading-tight tracking-wider font-lemo">
                    NELLAI TOURS
                  </h1>
                  <p className="text-[10px] font-normal text-black leading-tight tracking-widest font-lemo">
                    WORLD CLASS TRAVEL
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
                  to="/"
                  className="text-[#2C2A6B] font-semibold hover:text-[#1a1a40] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/packages"
                  className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
                >
                  Packages
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
                >
                  About us
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
                >
                  Contact us
                </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-purple-700 transition-colors" />
              <Link to="/signin" className="bg-tourism-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-tourism-primary/90 transition-colors">Sign in / Sign up</Link>
            </div>
          </motion.header>
        ) : (
          <header
            key="initial-header"
            className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] rounded-full z-50 py-2 px-6 md:px-10 flex justify-between items-center"
            style={{
              backgroundColor: "white",
            }}
          >
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo/nellai-tours-logo.png"
                  alt="Nellai Tourism Logo"
                  className="h-10 w-auto pb-1"
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-base font-medium text-[#2C2A6B] leading-tight tracking-wider font-lemo">
                    NELLAI TOURS
                  </h1>
                  <p
                    className="text-[10px] font-normal text-black leading-tight tracking-[0em] font-lemo "
                    style={{ maxWidth: "fit-content" }}
                  >
                    WORLD CLASS TRAVEL
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-20 text-sm font-semibold">
                <Link
                  to="/"
                  className="text-[#2C2A6B] font-semibold hover:text-[#1a1a40] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/packages"
                  className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
                >
                  Packages
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
                >
                  About us
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
                >
                  Contact us
                </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-purple-700 transition-colors" />
              <Link to="/signin" className="bg-tourism-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-tourism-primary/90 transition-colors">Sign in / Sign up</Link>
            </div>
          </header>
        )}
      </AnimatePresence>

      {/* The rest of your component remains the same... */}

      <AnimatePresence>
        {showRestartEffect && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => setShowRestartEffect(false)}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={activeImage.id}
          layoutId={`card-container-${activeImage.id}`}
          className="absolute inset-0 z-10"
          transition={SEAMLESS_TRANSITION}
        >
          <img
            src={activeImage.src}
            alt={activeImage.title}
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center'
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-20" />

      <div className="absolute top-0 left-0 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 w-full max-w-5xl text-white z-30">
        <AnimatePresence>
          <motion.div
            key={`text-${activeImage.id}`}
            initial={{ opacity: 0, y: 20, x: -40 }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              transition: {
                delay: SEAMLESS_TRANSITION.duration * 0.5,
                duration: 0.8,
                ease: SEAMLESS_TRANSITION.ease,
              },
            }}
            exit={{ opacity: 0, x: 40 }}
          >
            <h1
              className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-3"
              style={{
                fontFamily: 'Lemon Milk, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              {activeImage.title.toUpperCase()}
            </h1>
            <h2 className="text-lg md:text-xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {activeImage.subtitle}
            </h2>
            <p className="text-sm md:text-base max-w-2xl mb-6 leading-relaxed font-normal"  style={{ fontFamily: 'Jost, sans-serif' }}>
              {activeImage.description}
            </p>
            <button className="bg-purple-800 hover:bg-purple-900 text-white px-6 py-2.5 text-sm font-semibold rounded-md transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {activeImage.callToAction}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="absolute bottom-10 right-10 z-30 h-[280px]"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <div className="flex h-full" style={{ gap: 20 }}>
          <AnimatePresence>
            {displayOrder.slice(0, 4).map((id) => {
              const image = images.find((img) => img.id === id);
              if (!image) return null;

              return (
                <motion.div
                  key={image.id}
                  layoutId={`card-container-${image.id}`}
                  onClick={() => handleCardClick(image.id)}
                  className="relative flex-shrink-0 w-[200px] h-[260px] cursor-pointer rounded-2xl shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: 
                        image.id === 1 ? 'right center' :
                        image.id === 2 ? 'center center' :
                        image.id === 3 ? 'left center' :
                        image.id === 5 ? 'center center' :
                        image.id === 6 ? 'right center' :
                        'center center'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <motion.div
                    className="absolute bottom-4 left-4 text-white"
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  >
                    <h3 className="text-xs mb-1">{image.subtitle}</h3>
                    <p className="font-bold text-base mb-2">
                      {image.title.toUpperCase()}
                    </p>
                   
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}