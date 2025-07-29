import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Packages() {
  return (
    <div className="min-h-screen font-poppins">
      <Header />
      
      <main className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-sen font-bold text-tourism-primary mb-8">
            Travel Packages
          </h1>
          <p className="text-lg text-gray-600 font-poppins mb-8">
            This page is under construction. Please continue prompting to fill in the content for our amazing travel packages.
          </p>
          <div className="bg-tourism-light rounded-2xl p-16">
            <h2 className="text-2xl font-poppins font-semibold text-tourism-primary mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600">
              Our travel packages section will showcase amazing destinations and curated experiences.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
