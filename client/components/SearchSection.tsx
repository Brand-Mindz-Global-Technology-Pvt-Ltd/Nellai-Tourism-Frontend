import { MapPin, Calendar, Users } from "lucide-react";
import { useEnquireModal } from "../contexts/EnquireModalContext";

export default function SearchSection() {
  const { openModal } = useEnquireModal();

  return (
    <section className="relative w-full min-h-[280px] sm:min-h-[350px] md:h-[450px] flex justify-center">
      {/* Background Image */}
      <div
   className="absolute inset-0 bg-cover bg-fixed bg-[center_10%]" 
        style={{
          backgroundImage: "url('/images/hero/Singapore - Marina Bay Sands..webp')"
        }}
      >
        <div className="absolute inset-0 bg-black/30 sm:bg-black/20 md:bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl w-full pt-6 sm:pt-8 md:pt-14 px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-0">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
          Discover Your Favorite Place with Us
        </h2>
        <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 lg:mb-10 leading-relaxed max-w-2xl mx-auto line-clamp-2">
          This was our first time booking with this service, and it won't be the last! Every detail of our trip was perfectly organized, and we didn't have to worry about a thing.
        </p>

        {/* Search Container */}
        <div className="
          bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg
          flex flex-col sm:flex-row items-stretch sm:items-center
          overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto
        ">
          {/* Location */}
          <div className="
            flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex-1
            border-b sm:border-b-0 sm:border-r border-gray-200
          ">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-tourism-primary flex-shrink-0" />
            <div className="text-left w-full min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500">Location</p>
              <input
                type="text"
                placeholder="Search For A Destination"
                className="w-full text-[10px] sm:text-xs md:text-sm text-gray-700 focus:outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Events / Guests */}
          <div className="
            flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex-1
            border-b sm:border-b-0 sm:border-r border-gray-200
          ">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-tourism-primary flex-shrink-0" />
            <div className="text-left w-full min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500">Events</p>
              <input
                type="text"
                placeholder="How many Guests?"
                className="w-full text-[10px] sm:text-xs md:text-sm text-gray-700 focus:outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Date */}
          <div className="
            flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex-1
            border-b sm:border-b-0 sm:border-r border-gray-200
          ">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-tourism-primary flex-shrink-0" />
            <div className="text-left w-full min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500">Date</p>
              <input
                type="date"
                className="w-full text-[10px] sm:text-xs md:text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center justify-center">
            <button 
              type="button"
              onClick={openModal}
              className="
                bg-tourism-primary hover:bg-tourism-primary/90 text-white font-semibold
                px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-full shadow-md transition w-full sm:w-auto
                text-[10px] sm:text-xs md:text-sm lg:text-base
              "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}