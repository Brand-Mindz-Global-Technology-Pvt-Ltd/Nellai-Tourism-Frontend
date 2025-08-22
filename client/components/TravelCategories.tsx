export default function TravelCategories() {
  const categories = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a965d1fe3ee5a5426db1de2f70fa2771a3036c1d?width=852",
      title: "Couple Travel",
      buttonColor: "bg-tourism-secondary"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e4c10fe3a283ba9ecf021399bbf6e11b31a7e1a1?width=852",
      title: "Family Travel",
      buttonColor: "bg-tourism-secondary"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b9412142fdfd8da8dc2c578c767a4a8f64f0f2a7?width=874",
      title: "Corporate Party",
      buttonColor: "bg-tourism-secondary",
      featured: true
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e4708ca67dd306df73abfef4eff276d9fadb4971?width=678",
      title: "Adventure Travel",
      buttonColor: "bg-tourism-secondary"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6188719a63d4a99fa94167affb95b28af5bc8afe?width=852",
      title: "Solo Travel",
      buttonColor: "bg-tourism-secondary"
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer ${
                category.featured ? 'lg:col-span-2 lg:row-span-1' : ''
              } ${index < 2 ? 'md:col-span-1' : ''}`}
              style={{ minHeight: '220px' }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ 
                  backgroundImage: `url('${category.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg md:text-xl lg:text-2xl font-poppins font-semibold mb-3">
                  {category.title}
                </h3>
                
                <button className={`${category.buttonColor} text-white px-8 py-2.5 font-poppins text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}>
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
