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

  return (
    <section className="w-full py-12 px-0 ">
      {/* Heading */}
      <div className="max-w-[1440px] mx-auto px-12">
        <h2 className="text-2xl md:text-3xl  font-normal tracking-wide font-lemo">
          Top Attraction Tickets Await
        </h2>
        <p className="text-base md:text-lg text-black/80 mt-3 max-w-4xl leading-relaxed font-normal" style={{fontFamily: 'Jost, sans-serif'}}>
          Discover the best experiences with our handpicked attraction tickets —
          from thrilling water parks to scenic cable car rides and exciting
          adventures for all ages
        </p>
      </div>

      {/* Velocity-based scrolling carousel */}
      <div className="mt-10 relative overflow-hidden">
        <VelocityCarousel
          baseVelocity={isHovered ? 0 : 20}
          className="flex items-center gap-8 py-8"
          parallaxClassName="relative"
          scrollerClassName="flex items-center gap-8"
        >
          {categories.map((item, i) => (
            <div
              key={i}
              className="shrink-0 grow-0 basis-[280px] md:basis-[300px] lg:basis-[380px] px-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.article
                className="relative w-full h-[280px] md:h-[300px] lg:h-[340px] rounded-3xl overflow-hidden cursor-pointer group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
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
                <div className="relative h-full flex flex-col justify-end items-center text-white text-center p-6 md:p-8">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
                    {item.title}
                  </h3>
                  <button className="bg-yellow-600 text-white px-6 md:px-7 lg:px-8 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wide rounded hover:opacity-90 transition-opacity">
                    Book Now
                  </button>
                </div>
              </motion.article>
            </div>
          ))}
        </VelocityCarousel>
      </div>
    </section>
  );
}
