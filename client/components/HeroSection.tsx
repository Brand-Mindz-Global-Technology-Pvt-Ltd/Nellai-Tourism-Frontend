import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// --- Data for the slides (No changes here) ---
const images = [
    { 
      id: 1, 
      src: "/images/hero/hero-background.jpg", 
      title: "Saint Antonien", 
      subtitle: "Switzerland Alps", 
      description: "Mauris malesuada-erat ut amet, cursus accumsan. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.", 
      callToAction: "Discover Location" 
    },
    { 
      id: 2, 
      src: "/images/hero/search-background.jpg", 
      title: "Nagano Prefecture", 
      subtitle: "Japan Alps", 
      description: "Experience the serene beauty of the Japan Alps. Home to snow monkeys and stunning mountain vistas, Nagano offers a unique adventure.", 
      callToAction: "Explore Nagano" 
    },
    { 
      id: 3, 
      src: "/images/adventures/adventure-travel.jpg", 
      title: "Marrakech Merzouga", 
      subtitle: "Sahara Desert", 
      description: "Embark on an unforgettable journey through the sweeping dunes of the Sahara. From the vibrant markets of Marrakech to the tranquil desert.", 
      callToAction: "Start Your Journey" 
    },
    { 
      id: 4, 
      src: "/images/gallery/gallery-mountain-view.jpg", 
      title: "Yosemite Park", 
      subtitle: "Sierra Nevada", 
      description: "Discover the majestic granite cliffs, giant sequoia groves, and breathtaking waterfalls of Yosemite. A jewel of America's national parks.", 
      callToAction: "Visit The Park" 
    },
    { 
      id: 5, 
      src: "/images/hero/Frame.png", 
      title: "Los Lances", 
      subtitle: "Tarifa, Spain", 
      description: "Feel the thrill of kitesurfing on the windy shores of Tarifa. Los Lances is a world-renowned destination for water sports enthusiasts.", 
      callToAction: "Ride The Waves" 
    },
    { 
      id: 6, 
      src: "/images/hero/hero-background.jpg", 
      title: "Goreme Valley", 
      subtitle: "Cappadocia, Turkey",
      description: "Witness the magical landscape of Cappadocia from a hot air balloon. The fairy chimneys and ancient cave dwellings of Goreme await.", 
      callToAction: "Book a Flight" 
    },
];

// --- Animation Constants ---
const SEAMLESS_TRANSITION = {
    duration: 1.4,
    ease: cubicBezier(0.87, 0, 0.13, 1),
};

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayOrder, setDisplayOrder] = useState(
      images.map(img => img.id).filter(id => id !== images[0].id)
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showRestartEffect, setShowRestartEffect] = useState(false);

  const prevIndexRef = useRef(0);
  
  // All hooks and handlers remain exactly the same as your original code
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

  useEffect(() => {
    const newActiveId = images[activeIdx].id;
    const prevActiveId = images[prevIndexRef.current].id;
    
    setDisplayOrder(currentOrder => {
      let newOrder = currentOrder.filter(id => id !== newActiveId);
      if (!newOrder.includes(prevActiveId)) {
        newOrder.push(prevActiveId);
      }
      return newOrder;
    });
    
    prevIndexRef.current = activeIdx;
  }, [activeIdx]);
  
  const activeImage = images[activeIdx];

  const handleCardClick = (id) => {
    const newIndex = images.findIndex(img => img.id === id);
    if (newIndex === activeIdx) return; 

    if (newIndex === 0 && activeIdx === images.length - 1) {
        setShowRestartEffect(true);
    }
    setActiveIdx(newIndex);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  return (
    // Adjusted height to accommodate header better, but you can change it back to h-screen
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black select-none">
      {/* 
        --- HEADER UPDATED AS PER IMAGE ---
        The header is now styled and positioned correctly over the hero section.
      */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/bf971480616ae304b06f187f6ece010db95a27d2?apiKey=292063705b92436bb94b46c243884394&width=270" // Placeholder, replace with your actual logo URL
                  alt="Nellai Tourism Logo" 
                  className="h-8 w-auto" // Adjusted size
                />
            </div>
          
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link to="/" className="text-white font-semibold hover:text-gray-200 transition-colors">
                  Home
                </Link>
                <Link to="/packages" className="text-gray-300 hover:text-white transition-colors">
                  Packages
                </Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About us
                </Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact us
                </Link>
            </nav>
          
            {/* Search and User Actions in a Pill Container */}
            <div className="flex items-center gap-4 px-4 py-2 border border-white/50 rounded-full">
                <Search className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                <Link to="/signin" className="text-white text-sm font-medium hover:text-gray-200 transition-colors">
                  Sign in / Sign up
                </Link>
            </div>
        </div>
      </header>

      {/* Wipe effect remains as it is part of the original logic */}
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
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-20" />

      <div className="absolute top-0 left-0 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-2xl text-white z-30">
        <AnimatePresence>
          <motion.div
            key={`text-${activeImage.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: SEAMLESS_TRANSITION.duration * 0.5, duration: 0.8, ease: SEAMLESS_TRANSITION.ease } }}
            exit={{ opacity: 0 }}
          >
              <h2 className="text-xs tracking-widest">{activeImage.subtitle.toUpperCase()}</h2>
              <h1 className="text-5xl md:text-6xl font-extrabold my-3">{activeImage.title.toUpperCase()}</h1>
              <p className="text-sm max-w-md mb-6">{activeImage.description}</p>
              <button className="border border-white px-5 py-2.5 text-sm font-bold hover:bg-white hover:text-black transition-colors duration-300">
                  {activeImage.callToAction.toUpperCase()}
              </button>
          </motion.div>
        </AnimatePresence>
      </div>
       <div className="absolute bottom-10 right-[300px] z-40 text-white text-5xl font-bold">
          0{activeImage.id}
       </div>


      <div
        className="absolute bottom-10 right-10 z-30 h-[200px]"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <div className="flex h-full" style={{ gap: 20 }}>
          <AnimatePresence>
            {displayOrder.slice(0, 4).map((id) => {
                const image = images.find(img => img.id === id);
                if (!image) return null;

                return (
                    <motion.div
                        key={image.id}
                        layoutId={`card-container-${image.id}`}
                        onClick={() => handleCardClick(image.id)}
                        className="relative flex-shrink-0 w-[180px] h-[180px] cursor-pointer rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    >
                        <img src={image.src} alt={image.title} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-black/40"/>
                        
                        <motion.div
                            className="absolute bottom-4 left-4 text-white"
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        >
                            <h3 className="text-xs">{image.subtitle}</h3>
                            <p className="font-bold text-base">{image.title.toUpperCase()}</p>
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