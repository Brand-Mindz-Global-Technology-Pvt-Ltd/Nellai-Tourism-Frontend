import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function SocialMediaSection() {
  const [activeIndex, setActiveIndex] = useState(1); // center active by default
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const items = [
    {
      type: "image",
      src: "/images/social-media/social-instagram-post.jpg", // left img
    },
    {
      type: "video",
      src: "/images/social-media/nellai-tours.mp4", // center video
      thumbnail: "/images/social-media/social-video-thumbnail.jpg", // thumbnail
    },
    {
      type: "image",
      src: "/images/social-media/social-video-thumbnail.jpg", // right img
    },
  ];

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-28">
      <div className="max-w-[1440px] mx-auto">
        {/* Heading aligned properly */}
        <h2 className="text-black font-lemo text-2xl md:text-3xl font-normal uppercase mb-10">
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
              {/* Image / Video Content */}
              {item.type === "video" ? (
                <div className="relative w-full h-full">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster={item.thumbnail}
                    preload="metadata"
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play/Pause Button Overlay */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handleVideoPlay}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white hover:bg-white/30 transition-colors">
                      {isVideoPlaying ? (
                        <Pause className="w-7 h-7 text-white" />
                      ) : (
                        <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
