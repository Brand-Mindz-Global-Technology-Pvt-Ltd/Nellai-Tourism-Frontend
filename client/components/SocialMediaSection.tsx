import { Play } from "lucide-react";

export default function SocialMediaSection() {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-black font-sen text-2xl md:text-3xl font-semibold uppercase mb-10">
          Social media pages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Instagram Post */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ec8b3527307302feb1f32be130e36048d339d663?width=492"
              alt="Instagram post"
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* Video Post */}
          <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-700">
            <div 
              className="w-full h-[420px] bg-cover bg-center relative"
              style={{
                backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/24e3a3abbf59534f7c72d504600eb2972bac0807?width=974')"
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white cursor-pointer hover:bg-white/30 transition-colors">
                  <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>

          {/* Another Social Post */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <div 
              className="w-full h-[420px] bg-cover bg-center bg-gradient-to-t from-black/20 to-transparent"
              style={{
                backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/24e3a3abbf59534f7c72d504600eb2972bac0807?width=974')"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
