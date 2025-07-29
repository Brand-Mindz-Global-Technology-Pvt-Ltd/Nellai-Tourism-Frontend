export default function AdventureSection() {
  const adventures = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/66c18779ccac0813fb0f27ec336fdd03d32e7912?width=1528",
      title: "Adventure Travel",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/93afa1215b371694bc8a72f2309290d416696ca9?width=80",
      bgColor: "bg-orange-600"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4fa98871237a98152cdd2600e60382dc5a0ee988?width=1272",
      title: "Romantic Travel",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/62c8b937820d40eb1a7b711e65a4df90d8e33ad1?width=80",
      bgColor: "bg-pink-600"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/13d1840767418e6095373b48874bbffd2ef31b43?width=1350",
      title: "Mountains travel",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/b56d4e74ed50761f4cc9bd3d693a19be69e068f1?width=80",
      bgColor: "bg-blue-500"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a7777bb2f8f7982c9bb1baefea7b027c341efdc6?width=698",
      title: "Solo Travel",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
      bgColor: "bg-purple-800"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black font-sen text-3xl md:text-4xl font-semibold uppercase mb-4">
            pick Your Adventure
          </h2>
          <p className="text-black/80 font-poppins text-base max-w-4xl mx-auto">
            These travel styles often come with well-developed tourism infrastructure, offering a variety of accommodations, dining choices, and activities tailored to suit different kinds of travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {adventures.map((adventure, index) => (
            <div key={index} className="relative group">
              {/* Main Card */}
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${adventure.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80" />
                
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-white font-poppins text-xl font-medium">
                    {adventure.title}
                  </h3>
                </div>
              </div>

              {/* Floating Icon */}
              <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-16 ${adventure.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
                <img 
                  src={adventure.icon} 
                  alt={adventure.title}
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl h-1.5 bg-gray-300 rounded-full">
            <div className="w-4/5 h-full bg-tourism-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
