import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      src: "/images/travel-categories/corporate-party.jpg", 
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

// Refined animation properties for a smoother, more "lookable" feel
const TRANSITION_DURATION = 1.4; 
const TRANSITION_EASE = [0.87, 0, 0.13, 1]; // A more professional ease-in-out curve

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayOrder, setDisplayOrder] = useState(
      images.map(img => img.id).filter(id => id !== images[0].id)
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showRestartEffect, setShowRestartEffect] = useState(false);

  const prevIndexRef = useRef(0);

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
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black select-none">

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
          exit={{ opacity: 0, scale: 0.9, transition: { duration: TRANSITION_DURATION / 2 } }}
          className="absolute inset-0 z-10"
          // --- MODIFICATION: Updated transition for a smoother feel ---
          transition={{ duration: TRANSITION_DURATION, ease: TRANSITION_EASE }}
        >
          <img src={activeImage.src} alt={activeImage.title} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50 z-20" />

      {/* --- MODIFICATION: Animated text content --- */}
      <div className="absolute top-0 left-0 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-2xl text-white z-30">
          <AnimatePresence>
            <motion.div
              // Give a key so AnimatePresence knows the content has changed
              key={`text-${activeImage.id}`}
              initial={{ opacity: 0, y: 20 }}
              // Animate in, but only after the banner has had time to expand
              animate={{ opacity: 1, y: 0, transition: { delay: TRANSITION_DURATION * 0.6, duration: 0.8, ease: TRANSITION_EASE } }}
              exit={{ opacity: 0 }}
            >
                <h2 className="text-sm tracking-widest">{activeImage.subtitle.toUpperCase()}</h2>
                <h1 className="text-7xl font-extrabold my-4">{activeImage.title.toUpperCase()}</h1>
                <p className="text-base max-w-md mb-8">{activeImage.description}</p>
                <button className="border border-white px-6 py-3 text-sm font-bold hover:bg-white hover:text-black transition-colors duration-300">
                    {activeImage.callToAction.toUpperCase()}
                </button>
            </motion.div>
          </AnimatePresence>
      </div>
       <div className="absolute bottom-12 right-[380px] z-40 text-white text-7xl font-bold">
          0{activeImage.id}
       </div>
      {/* --- END MODIFICATION --- */}


      <div
        className="absolute bottom-12 right-12 z-30 h-[240px]"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <div className="flex h-full" style={{ gap: 24 }}>
          <AnimatePresence>
            {displayOrder.slice(0, 4).map((id) => {
                const image = images.find(img => img.id === id);
                if (!image) return null;

                return (
                    <motion.div
                        key={image.id}
                        layoutId={`card-container-${image.id}`}
                        onClick={() => handleCardClick(image.id)}
                        className="relative flex-shrink-0 w-[220px] h-[220px] cursor-pointer rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, x: 150 }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: TRANSITION_DURATION * 0.2 } }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    >
                        <img src={image.src} alt={image.title} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-black/40"/>
                        
                        <motion.div
                            className="absolute bottom-4 left-4 text-white"
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        >
                            <h3 className="text-sm">{image.subtitle}</h3>
                            <p className="font-bold text-lg">{image.title.toUpperCase()}</p>
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