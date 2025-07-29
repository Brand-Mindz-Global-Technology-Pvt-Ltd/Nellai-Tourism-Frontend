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
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-black font-sen text-3xl md:text-4xl font-semibold uppercase">
            Events
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-7 h-7 bg-tourism-primary rounded-full flex items-center justify-center hover:bg-tourism-primary/90 transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large Event Card */}
          <div className="lg:col-span-2">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url('${events[0].image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl md:text-3xl font-poppins font-semibold mb-4 leading-tight">
                  {events[0].title}
                </h3>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={events[0].avatar}
                    alt={events[0].author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-poppins text-lg font-medium">{events[0].author}</p>
                    <p className="font-poppins text-sm opacity-90">{events[0].date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Event Cards */}
          <div className="space-y-8">
            {events.slice(1).map((event, index) => (
              <div key={index} className="relative h-[240px] rounded-xl overflow-hidden shadow-lg group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-poppins font-semibold mb-3 leading-tight">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={event.avatar}
                      alt={event.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-poppins text-sm font-medium">{event.author}</p>
                      <p className="font-poppins text-xs opacity-90">{event.date}</p>
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
