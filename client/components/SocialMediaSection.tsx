import { useState } from "react";
import { Play } from "lucide-react";

export default function SocialMediaSection() {
  const [activeIndex, setActiveIndex] = useState(1); // center active by default

  const items = [
    {
      type: "image",
      src: "https://picsum.photos/id/1015/600/800", // left img
    },
    {
      type: "video",
      src: "https://picsum.photos/id/1011/800/800", // center (with play btn)
    },
    {
      type: "image",
      src: "https://picsum.photos/id/1016/600/800", // right img
    },
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        {/* Heading aligned properly */}
        <h2 className="text-black font-sen text-2xl md:text-3xl font-semibold uppercase mb-10">
          Social media pages
        </h2>

        {/* Flex row with smooth size transitions */}
        <div className="flex justify-center items-center gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${
                activeIndex === i
                  ? "w-[500px] h-[450px]" // active one bigger
                  : "w-[220px] h-[420px] grayscale hover:grayscale-0"
              }`}
            >
              {/* Image / Video Background */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.src})` }}
              >
                {/* Video play button overlay */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white hover:bg-white/30 transition-colors">
                      <Play
                        className="w-7 h-7 text-white ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
