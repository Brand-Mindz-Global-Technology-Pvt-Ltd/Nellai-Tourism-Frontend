import { useEnquireModal } from "../contexts/EnquireModalContext";

export default function  LocalHappenings() {
  const { openModal } = useEnquireModal();
  const happenings = [
    {
      title: "Taxi",
      image: "/images/local-happenings/section5 -1.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Private Party",
      image: "/images/local-happenings/section5 -2.jpg",
      buttonColor: "bg-tourism-secondary"
    },
    {
      title: "Restaurant",
      image: "/images/local-happenings/section5 -3.jpg",
      buttonColor: "bg-tourism-secondary"
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h2 className="text-black text-2xl md:text-3xl font-normal font-lemo uppercase mb-3">
            Find Local Happenings
          </h2>
          <p className="text-black/80 text-base md:text-lg max-w-3xl" style={{ fontFamily: 'Jost, sans-serif' }}>
            Choose your events with ease—many are supported by well-developed infrastructure, offering a wide range of venues, dining options, and experiences tailored to suit every type of attendee.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Column - First item (Large) - 40% width */}
          <div className="relative h-[600px] lg:h-[700px] group cursor-pointer lg:w-[40%]">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
              style={{ backgroundImage: `url('${happenings[0].image}')` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
              <h3 className="text-2xl font-poppins font-semibold mb-3">
                {happenings[0].title}
              </h3>
              <button 
                onClick={openModal}
                className={`${happenings[0].buttonColor} text-white px-8 py-2.5 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}
              >
                Book now
              </button>
            </div>
          </div>

          {/* Right Column - Two stacked items - 60% width */}
          <div className="flex flex-col lg:w-[60%]">
            {/* Second item */}
            <div className="relative h-[300px] lg:h-[350px] group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{ backgroundImage: `url('${happenings[1].image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {happenings[1].title}
                </h3>
                <button 
                  onClick={openModal}
                  className={`${happenings[1].buttonColor} text-white px-7 py-2 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}
                >
                  Book now
                </button>
              </div>
            </div>

            {/* Third item */}
            <div className="relative h-[300px] lg:h-[350px] group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{ backgroundImage: `url('${happenings[2].image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {happenings[2].title}
                </h3>
                <button 
                  onClick={openModal}
                  className={`${happenings[2].buttonColor} text-white px-7 py-2 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}
                >
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
