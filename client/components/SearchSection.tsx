import { MapPin, Calendar, Users } from "lucide-react";
import { useEnquireModal } from "../contexts/EnquireModalContext";

export default function SearchSection() {
  const { openModal } = useEnquireModal();

  return (
    <section className="relative w-full min-h-[350px] md:h-[450px] flex justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: "url('/images/hero/search-background.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl w-full pt-14 px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Discover Your Favorite Place with Us
        </h2>
        <p className="text-xs sm:text-sm md:text-base mb-6 md:mb-10 leading-relaxed">
          This was our first time booking with this service, and it won’t be the
          last! <br className="hidden md:block" />
          Every detail of our trip was perfectly organized, and we didn’t have
          to worry about a thing.
        </p>

        {/* Search Container */}
        <div className="
          bg-white rounded-2xl shadow-lg
          flex flex-col sm:flex-row items-stretch sm:items-center
          overflow-hidden w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto
        ">
          {/* Location */}
          <div className="
            flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 flex-1
            border-b sm:border-b-0 sm:border-r border-gray-200
          ">
            <MapPin className="w-5 h-5 text-tourism-primary" />
            <div className="text-left w-full">
              <p className="text-xs font-semibold text-gray-500">Location</p>
              <input
                type="text"
                placeholder="Search For A Destination"
                className="w-full text-xs sm:text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Events / Guests */}
          <div className="
            flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 flex-1
            border-b sm:border-b-0 sm:border-r border-gray-200
          ">
            <Users className="w-5 h-5 text-tourism-primary" />
            <div className="text-left w-full">
              <p className="text-xs font-semibold text-gray-500">Events</p>
              <input
                type="text"
                placeholder="How many Guests?"
                className="w-full text-xs sm:text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Date */}
          <div className="
            flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 flex-1
            border-b sm:border-b-0 sm:border-r border-gray-200
          ">
            <Calendar className="w-5 h-5 text-tourism-primary" />
            <div className="text-left w-full">
              <p className="text-xs font-semibold text-gray-500">Date</p>
              <input
                type="date"
                className="w-full text-xs sm:text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center">
            <button 
              type="button"
              onClick={openModal}
              className="
                bg-tourism-primary hover:bg-tourism-primary/90 text-white font-semibold
                px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md transition w-full sm:w-auto
                text-sm sm:text-base
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
