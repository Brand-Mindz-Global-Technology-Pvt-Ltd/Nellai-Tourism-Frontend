// PopularDestinations.tsx
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEnquireModal } from "../contexts/EnquireModalContext";

export default function PopularDestinations() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useEnquireModal();

  const destinations = [
    { number: "01", title: "Batam Tour", image: "/images/popular-destinations/popularbg-1.jpg" },
    { number: "02", title: "Temple Tour, India", image: "/images/popular-destinations/popularbg-2.jpg" },
    { number: "03", title: "Bangkok, ( Pattaya)", image: "/images/popular-destinations/popularbg-3.jpg" },
    { number: "04", title: "Bali Island", image: "/images/popular-destinations/popularbg-4.jpg" },
    // { number: "05", title: "Marina Bay Sands", image: "https://api.builder.io/api/v1/image/assets/TEMP/12b05cd9147ab80327e2e186144ace9a20522ba9?width=922" },
    // { number: "06", title: "Gardens by the Bay", image: "https://api.builder.io/api/v1/image/assets/TEMP/adcfa8d38f483dcd3faedc958cb6537791e1100c?width=2212" },
    // { number: "07", title: "Putrajaya", image: "https://api.builder.io/api/v1/image/assets/TEMP/2a725d05762255d9e79faf8a54137c18f60ca35c?width=1868" },
  ];

  // Manual scroll functions
  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = 320; // Adjust scroll distance to match card width
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = 320; // Adjust scroll distance to match card width
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll progress bar effect
  useEffect(() => {
    const scrollContainer = containerRef.current;
    const progressBar = document.getElementById('popular-scroll-progress');

    if (scrollContainer && progressBar) {
      const updateScrollProgress = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      };

      scrollContainer.addEventListener('scroll', updateScrollProgress);

      // Initial update
      updateScrollProgress();

      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollProgress);
      };
    }
  }, []);

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
      {/* Updated container to match DailyDeals style: max-w, px, rounded, bg, shadow-none */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-white shadow-none">
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

          <div className="flex flex-col items-end w-full sm:w-auto gap-2 lg:items-start">
            <button 
              onClick={openModal}
              className="w-full sm:w-auto mt-2 lg:mt-0 bg-tourism-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-tourism-primary/90 transition-colors" 
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Explore more
            </button>
            <div className="flex gap-4 mt-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel with scroll buttons and progress bar */}
        <div className="mt-6 sm:mt-10 relative overflow-visible">
          {/* Desktop/Tablet: Horizontal scrollable carousel */}
          <div
            ref={containerRef}
            className="hidden sm:flex gap-4 sm:gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory"
            style={{ height: "520px" }} // Fixed height for the carousel container
          >
            {destinations.map((destination, i) => (
              <div
                key={destination.number + destination.title}
                className="snap-start shrink-0 w-[280px] md:w-[320px] lg:w-[320px] rounded-2xl overflow-hidden relative cursor-pointer group"
                style={{ height: "100%" }} // Each tile fills the container height, no internal scroll
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
                      'center center',
                    height: "100%",
                  }}
                />

                {/* Gradient - only at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end items-start text-white p-6">
                  <div className="text-3xl md:text-4xl font-semibold opacity-95 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {destination.number}
                  </div>
                  <h3 className="text-base md:text-xl font-semibold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {destination.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Standard tile grid (no horizontal scroll) */}
          <div className="flex flex-col gap-4 sm:hidden">
            {destinations.map((destination, i) => (
              <div
                key={destination.number + destination.title}
                className="w-full rounded-xl overflow-hidden relative cursor-pointer group"
                style={{ height: "220px" }} // Fixed height for mobile tiles, no scroll
              >
                {/* BG image */}
                <div
                  className="absolute inset-0 bg-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-110"
                  style={{
                    backgroundImage: `url('${destination.image}')`,
                    backgroundPosition:
                      i === 0 ? 'right center' :
                      i === 1 ? 'left center' :
                      i === 2 ? 'center center' :
                      i === 3 ? 'left center' :
                      'center center',
                    height: "100%",
                  }}
                />

                {/* Gradient - only at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end items-start text-white p-4">
                  <div className="text-xl font-semibold opacity-95 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {destination.number}
                  </div>
                  <h3 className="text-sm font-semibold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {destination.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Blue Scroll Indicator (only show on desktop/tablet) */}
          <div className="hidden sm:flex justify-center mt-6">
            <div className="w-full max-w-3xl h-1 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-300" id="popular-scroll-progress"></div>
            </div>
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
