export default function TravelCategoriesMarquee() {
  const categories = [
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/a965d1fe3ee5a5426db1de2f70fa2771a3036c1d?width=852", title: "Couple Travel" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/e4c10fe3a283ba9ecf021399bbf6e11b31a7e1a1?width=852", title: "Family Travel" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/b9412142fdfd8da8dc2c578c767a4a8f64f0f2a7?width=874", title: "Attraction Ticket" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/e4708ca67dd306df73abfef4eff276d9fadb4971?width=678", title: "Adventure Travel" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/6188719a63d4a99fa94167affb95b28af5bc8afe?width=852", title: "Solo Travel" }
  ];

  const loop = [...categories, ...categories];

  return (
    <section className="w-full py-12 px-0">
      {/* Heading */}
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">WHAT WE OFFER</h2>
        <p className="text-base md:text-lg text-gray-600 mt-3 max-w-4xl leading-relaxed">
          These travel styles often come with well-developed tourism infrastructure, offering a variety
          of accommodations, dining choices, and activities tailored to different kinds of travelers.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 relative">
        <div className="overflow-hidden">
          <div className="scroller flex items-center gap-8">
            {loop.map((item, i) => (
              <div key={i} className="shrink-0 px-1 md:px-2">
                <article
                  className="
                    group relative transform-gpu will-change-[width,height,transform]
                    w-[280px] md:w-[300px] lg:w-[380px]
                    h-[200px] md:h-[240px] lg:h-[280px]
                    hover:w-[320px] md:hover:w-[340px] lg:hover:w-[420px]
                    hover:h-[230px] md:hover:h-[270px] lg:hover:h-[310px]
                    rounded-3xl overflow-hidden cursor-pointer
                    transition-[width,height,transform] duration-300 ease-out
                    hover:z-20
                  "
                >
                  {/* BG image (NO ZOOM ON HOVER) */}
                  <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-7 text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <button className="bg-yellow-600 text-white px-6 md:px-7 lg:px-8 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wide rounded hover:opacity-90 transition">
                      Book Now
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite scroll animation */}
      <style>{`
        .scroller {
          width: max-content;
          animation: travel-scroll 24s linear infinite;
        }
        .scroller:hover { animation-play-state: paused; }
        @keyframes travel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
