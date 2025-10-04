import { useEffect, useRef } from 'react';
import { 
  Mountain, 
  Heart, 
  MapPin, 
  GraduationCap, 
  Utensils, 
  Building, 
  Crown, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AdventureSection() {
  const carouselRef = useRef(null);

  const adventures = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/66c18779ccac0813fb0f27ec336fdd03d32e7912?width=1528",
      title: "Adventure Travel",
      icon: Mountain,
      bgColor: "bg-orange-600"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4fa98871237a98152cdd2600e60382dc5a0ee988?width=1272",
      title: "Romantic Travel",
      icon: Heart,
      bgColor: "bg-pink-600"
    },
    {
      image: "/images/adventures/industrial IV.webp",
      title: "Industrial Visit",
      icon: MapPin,
      bgColor: "bg-blue-400"
    },
    {
      image: "/images/adventures/adventureimage-3.webp",
      title: "Education",
      icon: GraduationCap,
      bgColor: "bg-rose-700"
    },
    
    {
      image: "/images/adventures/family-travel.webp",
      title: "Family Travel",
      icon: Users,
      bgColor: "bg-teal-600"
    }
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

  useEffect(() => {
    const scrollContainer = carouselRef.current;
    const progressBar = document.getElementById('scroll-progress');

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
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h2 className="text-black text-2xl md:text-3xl font-normal font-lemo uppercase mb-3">
              pick Your Adventure
            </h2>
            <p className="text-black/80 font-normal text-base md:text-lg max-w-3xl" style={{fontFamily: 'Jost, sans-serif'}}>
              These travel styles often come with well-developed tourism infrastructure, offering a variety of accommodations, dining choices, and activities tailored to suit different kinds of travelers.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-4 mt-2 lg:mt-0">
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

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {adventures.map((adventure, index) => (
              <div key={index} className="relative group flex-shrink-0 w-[280px]">
                {/* Main Card */}
                <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg">
                  <div 
                    className="absolute inset-0 bg-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      backgroundImage: `url('${adventure.image}')`,
                      backgroundPosition: 
                        index === 2 ? 'left center' :  // Third image (index 2)
                        index === 3 ? 'left center' :  // Fourth image (index 3)
                        'center center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/60" />
                  
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
                    <h3 className="text-white font-poppins text-lg font-medium">
                      {adventure.title}
                    </h3>
                  </div>
                </div>

                {/* Floating Icon */}
                <div className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-14 h-14 ${adventure.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
                  <adventure.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Blue Scroll Indicator */}
          <div className="flex justify-center mt-6">
            <div className="w-full max-w-3xl h-1 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-300" id="scroll-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
