import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Booking through this site was so easy, and the entire trip exceeded our expectations! From the breathtaking views to the amazing local guides, every moment was magical. Highly recommend for anyone looking for a seamless and memorable travel experience!",
      author: "Jane Cooper",
      location: "Japan, 2023",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80"
    },
    {
      text: "This was our first time booking with this service, and it won't be the last! Every detail of our trip was perfectly organized, and we didn't have to worry about a thing. The itinerary struck a great balance between adventure and relaxation.",
      author: "David",
      location: "China, 2023",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80"
    },
    {
      text: "From the moment we booked, everything was smooth and hassle-free. The customer support was fantastic, and the recommendations were spot-on. We had a truly authentic experience exploring the hidden gems of our destination.",
      author: "Alex P",
      location: "Egypt, 2022",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80"
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/97368234b6a8db01e228a323161070de5979777c?width=2889')"
        }}
      >
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-black font-sen text-2xl md:text-3xl font-semibold uppercase mb-3">
            Testimonials
          </h2>
          <p className="text-black/70 font-poppins text-lg font-medium">
            we'd love to hear from our customers
          </p>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center gap-2.5 mt-6">
            <button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button className="w-6 h-6 bg-tourism-primary rounded-full flex items-center justify-center hover:bg-tourism-primary/90 transition-colors">
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${
                index === 1 ? 'lg:mt-8' : ''
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-tourism-gold text-tourism-gold" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-black/80 font-poppins text-sm font-medium leading-relaxed mb-5">
                {testimonial.text}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-black font-poppins text-base font-medium">
                    {testimonial.author}
                  </h4>
                  <p className="text-black/80 font-poppins text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
