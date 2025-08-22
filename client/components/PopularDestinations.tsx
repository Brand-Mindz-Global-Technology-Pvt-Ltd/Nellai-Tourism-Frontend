// PopularDestinations.jsx
import { useRef } from "react";

export default function PopularDestinations() {
  const stripRef = useRef(null);

  const destinations = [
    { number: "01", title: "Marina Bay Sands", image: "https://api.builder.io/api/v1/image/assets/TEMP/12b05cd9147ab80327e2e186144ace9a20522ba9?width=922" },
    { number: "02", title: "Gardens by the Bay", image: "https://api.builder.io/api/v1/image/assets/TEMP/adcfa8d38f483dcd3faedc958cb6537791e1100c?width=2212" },
    { number: "03", title: "Putrajaya", image: "https://api.builder.io/api/v1/image/assets/TEMP/2a725d05762255d9e79faf8a54137c18f60ca35c?width=1868" },
    { number: "04", title: "Tioman Island", image: "https://api.builder.io/api/v1/image/assets/TEMP/c0dfb3172b68acf712608652b12309e79dc5e45c?width=1824" },
    { number: "05", title: "Dubai Marina", image: "https://api.builder.io/api/v1/image/assets/TEMP/709d0efd55c9757034e8683ebc87994887052333?width=532" },
    // ➕ two more items
    { number: "06", title: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac5?q=80&w=1600&auto=format&fit=crop" },
    { number: "07", title: "Rome, Italy", image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1600&auto=format&fit=crop" }
  ];

  const scrollByCards = (dir = 1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector(".pd-card");
    const step = (card?.clientWidth || 320) + 20; // card width + gap
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-tourism-light relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-10 pointer-events-none">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/30b5b380063e62b80cfd3f38a0aa025eeeb18ece?width=1020"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-full h-24 opacity-10 pointer-events-none">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/47b04e25c9696b9538a6464ed140e2b4402e62cc?width=3254"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header row (placement like screenshot) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-black font-sen text-2xl md:text-3xl font-semibold uppercase mb-3">
              Popular Destination
            </h2>
            <p className="text-black/80 font-poppins text-sm md:text-base max-w-2xl">
              These destinations often have well-developed tourism infrastructure, offering a range
              of accommodations, dining options, and activities that cater to various types of travelers.
            </p>
          </div>

          <button
            onClick={() => scrollByCards(1)}
            className="mt-2 lg:mt-0 bg-tourism-primary text-white px-6 py-2.5 rounded-xl font-poppins text-sm font-semibold hover:bg-tourism-primary/90 transition-colors"
          >
            Explore more
          </button>
        </div>

        {/* Horizontal strip (exact placement + scroll) */}
        <div className="relative">
          {/* Edge fades (optional) */}
          
          <div
            ref={stripRef}
            className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            <div className="flex items-stretch gap-5 min-w-full pr-6">
              {destinations.map((destination, i) => (
                <article
                  key={destination.number + destination.title}
                  className="
                    pd-card snap-start shrink-0
                    w-[260px] md:w-[300px] lg:w-[320px]
                    h-[320px] md:h-[360px] lg:h-[400px]
                    rounded-2xl overflow-hidden relative
                    transition-transform duration-300 ease-out hover:scale-[1.03]
                  "
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url('${destination.image}')` }}
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Bottom content (number + title) */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-2xl md:text-3xl font-poppins font-semibold opacity-95">
                      {destination.number}
                    </div>
                    <h3 className="mt-1 text-base md:text-lg font-poppins font-semibold">
                      {destination.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar (all browsers) */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE/Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; } /* Chrome/Safari/Opera */
      `}</style>
    </section>
  );
}
