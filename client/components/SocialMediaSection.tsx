import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

// Helper to determine video type (reels/portrait or landscape)
function getVideoType(width: number, height: number) {
  if (width === 0 || height === 0) return "unknown";
  const aspect = width / height;
  if (aspect < 0.8) return "reels"; // Portrait/reels (9:16, 4:5, etc)
  if (aspect > 1.2) return "landscape"; // Landscape (16:9, 4:3, etc)
  return "square";
}

// Format seconds to mm:ss
function formatTime(sec: number) {
  if (isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function SocialMediaSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoMeta, setVideoMeta] = useState<{ type: string; width: number; height: number }>({
    type: "unknown",
    width: 0,
    height: 0,
  });
  const [videoTime, setVideoTime] = useState({ current: 0, duration: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const items = [
    {
      type: "image",
      src: "/images/social-media/social-instagram-post.jpg",
    },
    {
      type: "video",
      src: "/images/social-media/nellai-tours.mp4",
      thumbnail: "/images/social-media/social-video-thumbnail.jpg",
    },
    {
      type: "image",
      src: "/images/social-media/social-video-thumbnail.jpg",
    },
  ];

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const width = video.videoWidth;
    const height = video.videoHeight;
    setVideoMeta({
      type: getVideoType(width, height),
      width,
      height,
    });
    setVideoTime({
      current: 0,
      duration: video.duration || 0,
    });
  };

  useEffect(() => {
    if (activeIndex !== 1 && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [activeIndex]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime({
        current: videoRef.current.currentTime,
        duration: videoRef.current.duration || 0,
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(e.target.value);
    }
  };

  const handleVideoPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  function getVideoTileClasses(isActive: boolean) {
    let w = "w-[500px]",
      h = "h-[450px]";
    if (videoMeta.type === "reels") {
      w = isActive ? "w-[340px]" : "w-[160px]";
      h = isActive ? "h-[600px]" : "h-[420px]";
    } else if (videoMeta.type === "landscape") {
      w = isActive ? "w-[600px]" : "w-[260px]";
      h = isActive ? "h-[340px]" : "h-[200px]";
    } else if (videoMeta.type === "square") {
      w = isActive ? "w-[450px]" : "w-[220px]";
      h = isActive ? "h-[450px]" : "h-[220px]";
    }
    return `${w} ${h}`;
  }

  function getTileAnimationClasses(isActive: boolean) {
    return isActive
      ? "z-50 scale-105 shadow-2xl"
      : "z-10 scale-95 opacity-80 hover:scale-100 hover:opacity-100";
  }

  return (
    <section
      className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-28 relative"
      style={{
        marginTop: "80px",
        zIndex: 1,
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-black font-lemo text-xl md:text-3xl font-normal uppercase mb-8 md:mb-10 text-center md:text-left">
          Social media pages
        </h2>

        {/* Mobile: horizontal scroll | Desktop: centered flex row */}
        <div className="flex justify-center items-center gap-6 overflow-x-auto md:overflow-visible pb-4 snap-x snap-mandatory scrollbar-hide md:flex-nowrap">
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            let tileClass =
              item.type === "video"
                ? `relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${getVideoTileClasses(isActive)} ${getTileAnimationClasses(isActive)} bg-black`
                : `relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "w-[500px] h-[450px]"
                      : "w-[220px] h-[420px] grayscale hover:grayscale-0"
                  } ${getTileAnimationClasses(isActive)}`;

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`${tileClass} flex-shrink-0 snap-center md:snap-none`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.5s cubic-bezier(.4,2,.3,1)",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {item.type === "video" ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={item.thumbnail}
                      preload="metadata"
                      onLoadedMetadata={handleVideoLoadedMetadata}
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={() => setIsVideoPlaying(false)}
                      style={{
                        borderRadius: "0.5rem",
                        background: "#000",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        transition: "all 0.5s",
                      }}
                    >
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {isActive && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] flex flex-col items-center z-20">
                        <div className="flex items-center w-full gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVideoPlay();
                            }}
                            className="flex items-center justify-center bg-white/30 hover:bg-white/50 rounded-full p-2 transition"
                          >
                            {isVideoPlaying ? (
                              <Pause className="w-5 h-5 text-white" />
                            ) : (
                              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                            )}
                          </button>
                          <span className="text-xs text-white font-mono min-w-[40px]">
                            {formatTime(videoTime.current)}
                          </span>
                          <input
                            type="range"
                            min={0}
                            max={videoTime.duration || 0}
                            step={0.1}
                            value={videoTime.current}
                            onChange={handleSeek}
                            className="flex-1 accent-tourism-primary h-1"
                            style={{ background: "rgba(255,255,255,0.5)" }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="text-xs text-white font-mono min-w-[40px]">
                            {formatTime(videoTime.duration)}
                          </span>
                        </div>
                      </div>
                    )}

                    {isActive && !isVideoPlaying && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoPlay();
                        }}
                      >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white hover:bg-white/30 transition-colors">
                          <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.src})` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind utility to hide scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          @media (max-width: 768px) {
            section {
              margin-top: 60px !important;
            }
            h2 {
              font-size: 1.25rem !important;
            }
            video, .bg-cover {
              border-radius: 0.5rem;
            }
          }
        `}
      </style>
    </section>
  );
}
