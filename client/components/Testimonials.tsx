// Testimonials.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

function StarSolid({ className = "w-4 h-4 text-yellow-400" }) {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.095 3.364a1 1 0 0 0 .95.69h3.538c.966 0 1.371 1.24.588 1.81l-2.863 2.08a1 1 0 0 0-.364 1.118l1.094 3.364c.3.921-.755 1.688-1.54 1.118l-2.863-2.08a1 1 0 0 0-1.176 0l-2.863 2.08c-.784.57-1.838-.197-1.539-1.118l1.094-3.364a1 1 0 0 0-.364-1.118L2.78 8.79c-.783-.57-.378-1.81.588-1.81h3.538a1 1 0 0 0 .95-.69l1.095-3.364Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Testimonials() {
  const scrollerRef = useRef(null);

  const testimonials = [
    {
      text:
        "Booking through this site was so easy, and the entire trip exceeded our expectations! From the breathtaking views to the amazing local guides, every moment was magical. Highly recommend for anyone looking for a seamless and memorable travel experience!",
      author: "Jane Cooper",
      location: "Japan, 2023",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
    },
    {
      text:
        "This was our first time booking with this service, and it won't be the last! Every detail of our trip was perfectly organized, and we didn't have to worry about a thing. The itinerary struck a great balance between adventure and relaxation.",
      author: "David",
      location: "China, 2023",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
    },
    {
      text:
        "From the moment we booked, everything was smooth and hassle-free. The customer support was fantastic, and the recommendations were spot-on. We had a truly authentic experience exploring the hidden gems of our destination.",
      author: "Alex P",
      location: "Egypt, 2022",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",
    },
  ];

  const scrollByCards = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".testi-card");
    const step = (card?.clientWidth || 360) + 24; // width + gap
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-12 md:py-16 px-4 md:px-8 lg:px-16 xl:px-28 overflow-hidden">
      {/* Background image (wavy lines) + soft white tint */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // Use your waves background
          backgroundImage:
            "url('/images/testimonials/Clip path group.png')",
        }}
      >
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header row: left-aligned title/subtitle, arrows on the right */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="text-black font-lemo text-2xl md:text-3xl font-normal uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-black/80 font-poppins font-normal text-base md:text-lg" style={{ fontFamily: 'Jost, sans-serif' }}>
              we’d love to hear from our customers
            </p>
          </div>

          {/* Arrows (top-right like screenshot) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByCards(-1)}
              className="w-7 h-7 rounded-full bg-gray-300 grid place-items-center hover:bg-gray-400 transition"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              className="w-7 h-7 rounded-full bg-tourism-primary grid place-items-center hover:bg-tourism-primary/90 transition"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Cards row (scrollable on small screens, 3-up on large) */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth"
        >
          <div className="min-w-full grid grid-cols-[repeat(3,minmax(280px,1fr))] gap-6 md:gap-8 lg:gap-10">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className={`testi-card bg-white rounded-xl p-6 border border-gray-200 
                            shadow-[0_10px_25px_rgba(0,0,0,0.08)] 
                            ${i === 1 ? "lg:mt-8" : ""}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarSolid key={s} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-black/80 font-normal text-base md:text-lg leading-relaxed mb-5" style={{ fontFamily: 'Jost, sans-serif' }}>
                  “{t.text}”
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-black font-poppins text-base font-medium">
                      {t.author}
                    </h4>
                    <p className="text-black/60 font-poppins text-xs">
                      {t.location}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
