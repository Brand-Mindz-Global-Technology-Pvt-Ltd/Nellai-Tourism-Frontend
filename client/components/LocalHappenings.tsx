import { useState, useEffect } from 'react';

export default function LocalHappenings() {
  const [currentImage1, setCurrentImage1] = useState(0);
  const [currentImage2, setCurrentImage2] = useState(0);
  const [currentImage3, setCurrentImage3] = useState(0);
  
  const allHappenings = [
    {
      title: "Taxi",
      image: "/images/local-happenings/taxi-service.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Private Party",
      image: "/images/local-happenings/private-party.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Restaurant",
      image: "/images/local-happenings/restaurant.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Corporate Events",
      image: "/images/travel-categories/corporate-party.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Beach Activities",
      image: "/images/travel-categories/gallery-couple-beach.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Mountain Tours",
      image: "/images/gallery/gallery-mountain-view.jpg",
      buttonColor: "bg-tourism-secondary"
    }
  ];

  // First image changes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage1((prev) => (prev + 1) % allHappenings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Second image changes every 3 seconds, starts after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImage2((prev) => (prev + 1) % allHappenings.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Third image changes every 3 seconds, starts after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImage3((prev) => (prev + 1) % allHappenings.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h2 className="text-black font-sen text-3xl md:text-4xl font-semibold uppercase mb-4">
            Find Local Happenings
          </h2>
          <p className="text-black/80 font-poppins text-base max-w-4xl">
            Choose your events with ease—many are supported by well-developed infrastructure, offering a wide range of venues, dining options, and experiences tailored to suit every type of attendee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column - First item (Large) */}
          <div className="relative h-[600px] group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
              style={{ backgroundImage: `url('${allHappenings[currentImage1].image}')` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-poppins font-semibold mb-4">
                {allHappenings[currentImage1].title}
              </h3>
              <button className={`${allHappenings[currentImage1].buttonColor} text-white px-10 py-3 font-poppins text-base font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                Book now
              </button>
            </div>
          </div>

          {/* Right Column - Two stacked items */}
          <div className="flex flex-col">
            {/* Second item */}
            <div className="relative h-[300px] group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{ backgroundImage: `url('${allHappenings[currentImage2].image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-poppins font-semibold mb-3">
                  {allHappenings[currentImage2].title}
                </h3>
                <button className={`${allHappenings[currentImage2].buttonColor} text-white px-8 py-2 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                  Book now
                </button>
              </div>
            </div>

            {/* Third item */}
            <div className="relative h-[300px] group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{ backgroundImage: `url('${allHappenings[currentImage3].image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-poppins font-semibold mb-3">
                  {allHappenings[currentImage3].title}
                </h3>
                <button className={`${allHappenings[currentImage3].buttonColor} text-white px-8 py-2 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
