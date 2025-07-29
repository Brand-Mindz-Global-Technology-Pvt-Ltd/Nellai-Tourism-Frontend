export default function Gallery() {
  const galleryImages = [
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/d3a238491e9d58b45a4477ab6a77356efb7a8f3b?width=1386",
      alt: "Couple on beach",
      size: "small"
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/d6c3e2c17c09579ad8a76649659ecce38dc11421?width=2624",
      alt: "Girl on James Bond Island",
      size: "large"
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/4b10ff2d2fb315feb60ea578e51b9fd9ca718e9f?width=1428",
      alt: "Woman taking photo with mountain view",
      size: "small"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-black font-sen text-4xl md:text-5xl font-semibold text-center uppercase tracking-wider mb-16">
          Our Gallery
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[600px]">
          {/* Left Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Center Large Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Right Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
