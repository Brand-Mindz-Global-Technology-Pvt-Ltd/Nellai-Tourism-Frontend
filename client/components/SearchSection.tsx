import { MapPin, Calendar, Users } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/69e682d02dec2a18b684bfc5aed1bb2d9ed4fe30?width=2906')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto text-center">
        <h2 className="text-white font-poppins text-2xl md:text-3xl font-bold mb-4">
          Discover Your Favorite Place with Us
        </h2>
        
        <p className="text-white font-poppins text-base mb-12 max-w-3xl mx-auto">
          This was our first time booking with this service, and it won't be the last!<br />
          Every detail of our trip was perfectly organized, and we didn't have to worry about a thing.
        </p>
        
        {/* Search Form */}
        <div className="bg-white rounded-xl p-6 max-w-4xl mx-auto shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Location */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4 text-tourism-primary" />
                <label className="text-tourism-primary font-poppins text-sm font-semibold">
                  Location
                </label>
              </div>
              <input 
                type="text" 
                placeholder="Search For A Destination"
                className="w-full text-tourism-accent font-poppins text-sm focus:outline-none"
              />
            </div>
            
            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-tourism-border mx-auto"></div>
            
            {/* Date */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-tourism-primary" />
                <label className="text-tourism-primary font-poppins text-sm font-semibold">
                  Date
                </label>
              </div>
              <input 
                type="text" 
                placeholder="Pick a date"
                className="w-full text-tourism-accent font-poppins text-sm focus:outline-none"
              />
            </div>
            
            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-tourism-border mx-auto"></div>
            
            {/* Guests */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-4 text-tourism-primary" />
                <label className="text-tourism-primary font-poppins text-sm font-semibold">
                  Guests
                </label>
              </div>
              <input 
                type="text" 
                placeholder="How many Guests?"
                className="w-full text-tourism-accent font-poppins text-sm focus:outline-none"
              />
            </div>
            
            {/* Search Button */}
            <div className="md:col-span-1">
              <button className="w-full bg-tourism-primary text-white py-4 px-8 rounded-full font-poppins text-base hover:bg-tourism-primary/90 transition-colors shadow-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
