export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/d017f584f49299eea470d7a8bc37f69744904b76?width=2930')"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-8 lg:px-16 xl:px-24 max-w-[1440px] mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-white font-sen text-4xl md:text-5xl lg:text-6xl xl:text-[75px] font-bold leading-tight mb-6">
            Welcome to Nellai Tourism
          </h1>
          
          <p className="text-white font-poppins text-lg md:text-xl font-bold mb-4">
            Discover Your Favorite Place with Us
          </p>
          
          <p className="text-white font-poppins text-base mb-8 leading-relaxed max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <button className="bg-tourism-primary text-white px-8 py-3 rounded font-poppins text-base font-semibold hover:bg-tourism-primary/90 transition-colors">
            Explore more
          </button>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute right-4 md:right-8 lg:right-16 xl:right-24 top-1/2 transform -translate-y-1/2 flex gap-3">
        <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
