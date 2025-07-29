export default function LocalHappenings() {
  const happenings = [
    {
      title: "Taxi",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/68835b40af72c60c1b6918937781906ce4d7a41a?width=1578",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Private Party",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7e15d38b94bcf3465259e6de0036568ef97fb6f5?width=1572",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Restaurant",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/be9181cd175c1ef6b130f617c8f443fc02f943ae?width=1484",
      buttonColor: "bg-tourism-secondary"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h2 className="text-black font-sen text-3xl md:text-4xl font-semibold uppercase mb-4">
            Find Local Happenings
          </h2>
          <p className="text-black/80 font-poppins text-base max-w-4xl">
            Choose your events with ease—many are supported by well-developed infrastructure, offering a wide range of venues, dining options, and experiences tailored to suit every type of attendee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column - Taxi (Large) */}
          <div className="relative h-[600px] group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url('${happenings[0].image}')` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-poppins font-semibold mb-4">
                {happenings[0].title}
              </h3>
              <button className={`${happenings[0].buttonColor} text-white px-10 py-3 font-poppins text-base font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                Book now
              </button>
            </div>
          </div>

          {/* Right Column - Two stacked items */}
          <div className="flex flex-col">
            {/* Private Party */}
            <div className="relative h-[300px] group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url('${happenings[1].image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-poppins font-semibold mb-3">
                  {happenings[1].title}
                </h3>
                <button className={`${happenings[1].buttonColor} text-white px-8 py-2 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                  Book now
                </button>
              </div>
            </div>

            {/* Restaurant */}
            <div className="relative h-[300px] group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url('${happenings[2].image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-poppins font-semibold mb-3">
                  {happenings[2].title}
                </h3>
                <button className={`${happenings[2].buttonColor} text-white px-8 py-2 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
