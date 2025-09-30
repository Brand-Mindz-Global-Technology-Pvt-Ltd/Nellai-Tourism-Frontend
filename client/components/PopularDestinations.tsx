// PopularDestinations.jsx
import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
} from "framer-motion";
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

export default function PopularDestinations() {
  const containerRef = useRef(null);
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);
  const { openModal } = useEnquireModal();

  // Velocity-based scroll effect
  const { scrollY } = useScroll({ container: containerRef });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-2, 0, 2],
    { clamp: false }
  );

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${v}px`;
  });

  // Update position based on scroll velocity
  useLayoutEffect(() => {
    const unsubscribe = velocityFactor.on("change", (latest) => {
      const currentX = baseX.get();
      const newX = currentX + latest * 0.5; // Adjust multiplier for sensitivity
      baseX.set(newX);
    });
    return unsubscribe;
  }, [velocityFactor, baseX]);

  const destinations = [
    { number: "01", title: "Battam Tour", image: "/images/popular-destinations/popularbg-1.jpg" },
    { number: "02", title: "Temple Tour, India", image: "/images/popular-destinations/popularbg-2.jpg" },
    { number: "03", title: "Bangkok, ( Pattaya)", image: "/images/popular-destinations/popularbg-3.jpg" },
    { number: "04", title: "Bali Island, Thailand", image: "/images/popular-destinations/popularbg-4.jpg" },
    { number: "05", title: "Marina Bay Sands", image: "https://api.builder.io/api/v1/image/assets/TEMP/12b05cd9147ab80327e2e186144ace9a20522ba9?width=922" },
    { number: "06", title: "Gardens by the Bay", image: "https://api.builder.io/api/v1/image/assets/TEMP/adcfa8d38f483dcd3faedc958cb6537791e1100c?width=2212" },
    { number: "07", title: "Putrajaya", image: "https://api.builder.io/api/v1/image/assets/TEMP/2a725d05762255d9e79faf8a54137c18f60ca35c?width=1868" },
  ];

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12 bg-tourism-light relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="w-full lg:w-auto">
            <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-normal font-lemo uppercase mb-2 sm:mb-3" style={{ fontFamily: 'Lemon Milk, sans-serif' }}>
              Popular Destination
            </h2>
            <p className="text-black/80 font-normal text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed" style={{ fontFamily: 'Jost, sans-serif' }}>
              These destinations often have well-developed tourism infrastructure, offering a range
              of accommodations, dining options, and activities that cater to various types of travelers.
            </p>
          </div>

          <button 
            onClick={openModal}
            className="w-full sm:w-auto mt-2 lg:mt-0 bg-tourism-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-tourism-primary/90 transition-colors" 
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Explore more
          </button>
        </div>

        {/* Velocity-based scroll carousel */}
        <div className="mt-6 sm:mt-10 relative overflow-hidden">
          <div 
            ref={containerRef}
            className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory h-[300px] sm:h-[400px] md:h-[450px] lg:h-[520px]"
          >
            <motion.div 
              className="flex items-stretch gap-4 sm:gap-6 min-w-full pr-4 sm:pr-6"
              style={{ x }}
            >
              {destinations.map((destination, i) => (
                <motion.article
                  key={destination.number + destination.title}
                  className="snap-start shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[320px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden relative cursor-pointer group"
                  ref={i === 0 ? copyRef : null}
                >
                  {/* BG image */}
                  <div
                    className="absolute inset-0 bg-cover transition-all duration-700 ease-in-out group-hover:scale-125 group-hover:brightness-110 group-hover:contrast-110"
                    style={{ 
                      backgroundImage: `url('${destination.image}')`,
                      backgroundPosition: 
                        i === 0 ? 'right center' :
                        i === 1 ? 'left center' :
                        i === 2 ? 'center center' :
                        i === 3 ? 'left center' :
                        'center center'
                    }}
                  />

                  {/* Gradient - only at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end items-start text-white p-4 sm:p-6">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-semibold opacity-95 mb-1 sm:mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {destination.number}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-xl font-semibold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {destination.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar (all browsers) */}
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
