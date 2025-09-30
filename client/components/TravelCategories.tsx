import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEnquireModal } from "../contexts/EnquireModalContext";

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

function VelocityCarousel({
  children,
  baseVelocity = 36, // Increased from 30 to 36 for a slightly faster scroll
  scrollContainerRef = null,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 2,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle = {},
  scrollerStyle = {},
}) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false },
  );

  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min, max, v) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <div className={className} key={i} ref={i === 0 ? copyRef : null}>
        {children}
      </div>,
    );
  }

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {spans}
      </motion.div>
    </div>
  );
}

export default function TravelCategoriesMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const { openModal } = useEnquireModal();

  const categories = [
    { image: "/images/section2/section2 -1.jpg", title: "TRICKEYE MUSEUM" },
    { image: "/images/section2/section2 -2.jpg", title: "SKYHELIX SENTOSA" },
    { image: "/images/section2/section2 -3.png", title: "SEA AQUARIUM" },
    {
      image: "/images/section2/section2 -4.jpg",
      title: "SCIENCE CENTER + KIDS STOP",
    },
    { image: "/images/section2/section2 -5.png", title: "NESTOPIA NESTOPIA" },
  ];

  // Manual scroll functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust scroll distance
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust scroll distance
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 px-0">
      {/* Heading with Navigation Controls */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-wide font-lemo">
              Top Attraction Tickets Await
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-black/80 mt-2 sm:mt-3 max-w-4xl leading-relaxed font-normal" style={{fontFamily: 'Jost, sans-serif'}}>
              Discover the best experiences with our handpicked attraction tickets —
              from thrilling water parks to scenic cable car rides and exciting
              adventures for all ages
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-3 sm:gap-4 mt-2 lg:mt-0">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Velocity-based scrolling carousel */}
      <div className="mt-6 sm:mt-8 md:mt-10 relative overflow-hidden">
        <div ref={carouselRef} className="overflow-x-auto hide-scrollbar">
          <VelocityCarousel
            baseVelocity={isHovered ? 0 : 20}
            className="flex items-center gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8"
            parallaxClassName="relative"
            scrollerClassName="flex items-center gap-4 sm:gap-6 md:gap-8"
          >
          {categories.map((item, i) => (
            <div
              key={i}
              className="shrink-0 grow-0 basis-[240px] sm:basis-[280px] md:basis-[300px] lg:basis-[380px] px-2 sm:px-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.article
                className="relative w-full h-[240px] sm:h-[280px] md:h-[300px] lg:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {/* BG image */}
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                {/* Gradient - only at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end items-center text-white text-center p-4 sm:p-6 md:p-8">
                  <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <button 
                    onClick={openModal}
                    className="bg-yellow-600 text-white px-4 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-2.5 text-xs sm:text-xs md:text-sm font-bold uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </button>
                </div>
              </motion.article>
            </div>
          ))}
          </VelocityCarousel>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE/Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; } /* Chrome/Safari/Opera */
      `}</style>
    </section>
  );
}
