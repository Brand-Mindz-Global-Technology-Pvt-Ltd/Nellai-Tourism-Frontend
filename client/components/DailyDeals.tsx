// DailyDeals.jsx
// Rectangular cards, NO shadow. Horizontal scroll with 6 cards.
// Scrollbar completely hidden (Chrome/Safari/Opera/Edge/Firefox/IE).
// Added curved edge to the rectangle container

import { useRef } from "react";
import { useEnquireModal } from "../contexts/EnquireModalContext";

export default function DailyDeals() {
  const scrollerRef = useRef(null);
  const { openModal } = useEnquireModal();

  const deals = [
    {
      city: "Singapore cruise",
      region: "Asia",
      days: 8,
      people: "25K People Going",
      rating: 5,
      price: 260,
      oldPrice: 480,
      image: "/images/daily-deals/section7 -1.jpg",
      desc: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium internos.",
    },
    {
      city: "Malaysia WEEKED",
      region: "Asia",
      days: 5,
      people: "25K People Going",
      rating: 4.7,
      price: 160,
      oldPrice: 530,
      image: "/images/daily-deals/section7 -2.jpg",
      desc: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium internos.",
    },
    {
      city: "Singapore",
      region: "Asia",
      days: 6,
      people: "26K People Going",
      rating: 4.9,
      price: 99,
      oldPrice: 280,
      image: "/images/daily-deals/section7 -3.jpg",
      desc: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium internos.",
    },
    
  ];

  const scrollByCards = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".deal-card");
    const step = (card?.clientWidth || 360) + 24; // width + gap
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-20">
      {/* Added curved edge to the main rectangle container */}
      <div className="max-w-[1440px] mx-auto px-6 rounded-3xl bg-white shadow-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-black  text-2xl md:text-3xl font-normal uppercase mb-3 font-lemo">
              DAILY DEALS
            </h2>
            <p className="text-black/80 font-normal text-base md:text-lg max-w-3xl leading-relaxed" style={{ fontFamily: 'Jost, sans-serif' }}>
              These destinations often have well-developed tourism infrastructure, offering a
              range of accommodations, dining options, and activities that cater to various types
              of travelers.
            </p>
          </div>

          <button
            onClick={openModal}
            className="h-10 px-6 rounded-xl bg-tourism-primary text-white text-sm font-poppins font-semibold hover:bg-tourism-primary/90 transition-colors"
          >
            Explore more
          </button>
        </div>

        {/* Carousel */}
        <div className="relative mt-6">
          {/* Optional edge fades (adjust 'from-white' if page bg differs) */}

          {/* Strip */}
          <div
            ref={scrollerRef}
            className="relative overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            <div className="flex items-stretch gap-6 min-w-full pr-6">
              {deals.map((d, i) => (
                <article
                  key={`${d.city}-${i}`}
                  // Added curved edge to each card
                  className="deal-card snap-start shrink-0 w-[340px] md:w-[420px] h-[480px] rounded-2xl overflow-hidden relative"
                >
                  {/* Image */}
                  <img
                    src={d.image}
                    alt={d.city}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {/* Badges - Top Left of Content Area */}
                    {/* <div className="flex items-center gap-3 mb-4 text-white text-xs font-poppins">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                        <CalendarIcon className="w-4 h-4" />
                        {d.days} Days
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                        <UsersIcon className="w-4 h-4" />
                        {d.people}
                      </span>
                    </div> */}

                    {/* Title and Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-poppins font-semibold capitalize">{d.city}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} filled={idx < Math.round(d.rating)} className="w-4 h-4" />
                        ))}
                      </div>
                    </div>

                    {/* Price and Location */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-baseline gap-3">
                        <div className="text-3xl font-poppins font-medium tracking-tight text-yellow-400">
                          $ {d.price}
                        </div>
                        <div className="text-base font-poppins font-medium line-through opacity-80">
                          $ {d.oldPrice}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs opacity-90 font-poppins">
                        <GlobeIcon className="w-4 h-4" />
                        <span>{d.region}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed font-poppins mb-4">
                      {d.desc}
                    </p>

                    {/* Book Now Button */}
                    <div className="flex justify-end">
                      <button className="px-6 py-2.5 rounded-lg bg-blue-800 text-white text-sm font-poppins font-semibold hover:bg-blue-900 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HIDE SCROLLBAR — works across Chrome/Safari/Opera/Edge/Firefox/IE */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE & old Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;            /* Chrome, Safari, Opera */
          width: 0;
          height: 0;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb { background: transparent; }
        .hide-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </section>
  );
}

/* --- Small UI helpers --- */
function IconBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="size-9 rounded-full bg-white ring-1 ring-black/5 grid place-items-center hover:bg-gray-50 transition"
      aria-label="scroll"
    >
      {children}
    </button>
  );
}

/* ---- Tiny SVG icons ---- */
function CalendarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3.13A4 4 0 0120 7a4 4 0 01-1 2.65" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function GlobeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function Star({ filled = false, className }) {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.095 3.364a1 1 0 00.95.69h3.538c.966 0 1.371 1.24.588 1.81l-2.863 2.08a1 1 0 00-.364 1.118l1.094 3.364c.3.921-.755 1.688-1.54 1.118l-2.863-2.08a1 1 0 00-1.176 0l-2.863 2.08c-.784.57-1.838-.197-1.539-1.118l1.094-3.364a1 1 0 00-.364-1.118L2.78 8.79c-.783-.57-.378-1.81.588-1.81h3.538a1 1 0 00.95-.69l1.095-3.364z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? "0" : "1.4"}
      />
    </svg>
  );
}
