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
    { image: "/images/section2/section2 -1.webp", title: "TRICKEYE MUSEUM" },
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
    <section className="w-full py-6 sm:py-8 md:py-12 px-0">
      {/* Heading with Navigation Controls */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal tracking-wide font-lemo">
              Top Attraction Tickets Await
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black/80 mt-1.5 sm:mt-2 md:mt-3 max-w-4xl leading-relaxed font-normal" style={{fontFamily: 'Jost, sans-serif'}}>
              Discover the best experiences with our handpicked attraction tickets —
              from thrilling water parks to scenic cable car rides and exciting
              adventures for all ages
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 mt-1.5 sm:mt-2 lg:mt-0">
            <button
              onClick={scrollLeft}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Velocity-based scrolling carousel */}
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 relative overflow-hidden">
        <div ref={carouselRef} className="overflow-x-auto hide-scrollbar">
          <VelocityCarousel
            baseVelocity={isHovered ? 0 : 20}
            className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-3 sm:py-4 md:py-6 lg:py-8"
            parallaxClassName="relative"
            scrollerClassName="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          >
          {categories.map((item, i) => (
            <div
              key={i}
              className="shrink-0 grow-0 basis-[200px] sm:basis-[240px] md:basis-[280px] lg:basis-[300px] xl:basis-[380px] px-1.5 sm:px-2 md:px-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.article
                className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] xl:h-[340px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end items-center text-white text-center p-3 sm:p-4 md:p-6 lg:p-8">
                  <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 leading-tight whitespace-nowrap">
                    {item.title}
                  </h3>
                  <button 
                    onClick={openModal}
                    className="bg-yellow-600 text-white px-3 sm:px-4 md:px-6 lg:px-7 xl:px-8 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
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
