import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-poppins">
      <Header />
      
      <main className="flex flex-col items-center justify-center min-h-[60vh] py-24 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-sen font-bold text-tourism-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-gray-800 mb-4">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 font-poppins mb-8 max-w-md">
            The page you're looking for doesn't exist. Let's get you back to exploring amazing destinations.
          </p>
          <Link
            to="/"
            className="bg-tourism-primary text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-tourism-primary/90 transition-colors"
          >
            Go home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
