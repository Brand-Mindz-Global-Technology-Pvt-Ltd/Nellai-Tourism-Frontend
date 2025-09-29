import { User, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function EventsSection() {
  const events = [
    {
      title: "Airport In Singapore : The Jewel changi Airport ! (Indoor wall)",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e9bad5dfd42f149747f7bb58d2cbb322037846b8?width=1984",
      author: "Jones M",
      date: "19 jul, 2024",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
      size: "large"
    },
    {
      title: "Fulidhoo Island Guide: Shark & Stingray Beach In Maldives",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/9d904c6d6e0d1817b904926a1fa0be56e93f9a0c?width=1160",
      author: "Jones M",
      date: "19 jul, 2024",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
      size: "small"
    },
    {
      title: "13 Best Traditional Shrines & Temples To Visit In Japan",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b32c05bf724451f2ce196a8bdde2740ba08cced0?width=1060",
      author: "Jones M",
      date: "19 jul, 2024",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
      size: "small"
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-black  text-2xl md:text-3xl font-normal font-lemo uppercase">
              Destination Diaries
            </h2>
            <p className="text-black/80 font-normal text-base md:text-lg max-w-3xl mt-2" style={{ fontFamily: 'Jost, sans-serif' }}>
            Choose your events with ease—many are supported by well-developed infrastructure, offering a wide range of venues, dining options, and experiences tailored to suit every type of attendee.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2.5">
            <button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button className="w-6 h-6 bg-tourism-primary rounded-full flex items-center justify-center hover:bg-tourism-primary/90 transition-colors">
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large Event Card */}
          <div className="lg:col-span-2">
            <div className="relative h-[420px] rounded-xl overflow-hidden shadow-lg group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url('${events[0].image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-xl md:text-2xl font-poppins font-semibold mb-3 leading-tight">
                  {events[0].title}
                </h3>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={events[0].avatar}
                    alt={events[0].author}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-poppins text-base font-medium">{events[0].author}</p>
                    <p className="font-poppins text-xs opacity-90">{events[0].date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Event Cards */}
          <div className="space-y-6">
            {events.slice(1).map((event, index) => (
              <div key={index} className="relative h-[200px] rounded-xl overflow-hidden shadow-lg group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-base font-poppins font-semibold mb-2 leading-tight">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={event.avatar}
                      alt={event.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-poppins text-xs font-medium">{event.author}</p>
                      <p className="font-poppins text-[10px] opacity-90">{event.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
