import { MapPin, Calendar, Users } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/search-background.jpg')"
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
        <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Where are you going?"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
              />
            </div>
            
            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="date" 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
              />
            </div>
            
            {/* Travelers */}
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tourism-primary focus:border-transparent">
                <option>Travelers</option>
                <option>1 Traveler</option>
                <option>2 Travelers</option>
                <option>3 Travelers</option>
                <option>4+ Travelers</option>
              </select>
            </div>
            
            {/* Search Button */}
            <button className="bg-tourism-primary text-white px-8 py-3 rounded-lg font-poppins text-base font-semibold hover:bg-tourism-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
