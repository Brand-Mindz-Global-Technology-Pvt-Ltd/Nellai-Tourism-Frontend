export default function PopularDestinations() {
  const destinations = [
    {
      number: "01",
      title: "Marina Bay Sands",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/12b05cd9147ab80327e2e186144ace9a20522ba9?width=922"
    },
    {
      number: "02",
      title: "Gardens by the Bay",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/adcfa8d38f483dcd3faedc958cb6537791e1100c?width=2212"
    },
    {
      number: "03",
      title: "Putrajaya",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/2a725d05762255d9e79faf8a54137c18f60ca35c?width=1868"
    },
    {
      number: "04",
      title: "Tioman Island",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c0dfb3172b68acf712608652b12309e79dc5e45c?width=1824"
    },
    {
      number: "05",
      title: "Dubai Marina",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/709d0efd55c9757034e8683ebc87994887052333?width=532"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-tourism-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-10">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/30b5b380063e62b80cfd3f38a0aa025eeeb18ece?width=1020" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-full h-24 opacity-10">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/47b04e25c9696b9538a6464ed140e2b4402e62cc?width=3254" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          <div>
            <h2 className="text-black font-sen text-3xl md:text-4xl font-semibold uppercase mb-4">
              Popular Destination
            </h2>
            <p className="text-black/80 font-poppins text-base max-w-2xl">
              These destinations often have well-developed tourism infrastructure, offering a range of accommodations, dining options, and activities that cater to various types of travelers.
            </p>
          </div>
          
          <button className="mt-6 lg:mt-0 bg-tourism-primary text-white px-8 py-3 rounded-xl font-poppins text-lg font-semibold hover:bg-tourism-primary/90 transition-colors">
            Explore more
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="relative h-[320px] md:h-[380px] lg:h-[450px] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url('${destination.image}')` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-3xl md:text-4xl font-poppins font-semibold mb-2">
                  {destination.number}
                </div>
                <h3 className="text-lg md:text-xl font-poppins font-semibold">
                  {destination.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
