import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Animation variants for the header
const headerVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection for fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when scrolling
  useEffect(() => {
    if (isScrolled) {
      setIsMobileMenuOpen(false);
    }
  }, [isScrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {isScrolled ? (
          <motion.header
            key="sticky-header"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full z-50 py-3 px-6 md:px-10 flex justify-between items-center shadow-xl"
            style={{
              backgroundColor: "white",
            }}
          >
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo/nellai-tours-logo.png"
                  alt="Nellai Tourism Logo"
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-base font-medium text-[#2C2A6B] leading-tight tracking-wider font-lemo">
                    NELLAI TOURS
                  </h1>
                  <p className="text-[10px] font-normal text-black leading-tight tracking-widest font-lemo">
                    WORLD CLASS TRAVEL
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                to="/"
                className="text-[#2C2A6B] font-semibold hover:text-[#1a1a40] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
              >
                About us
              </Link>
              <Link
                to="/packages"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
              >
                Packages
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
              >
                Contact us
              </Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-purple-700 transition-colors" />
              <Link to="/signin" className="bg-tourism-primary text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-tourism-primary/90 transition-colors whitespace-nowrap">Sign in / Sign up</Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 sm:p-2 text-gray-700 hover:text-purple-700 transition-colors ml-2 mobile-menu-container"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </motion.header>
        ) : (
          <header
            key="initial-header"
            className="absolute top-3 sm:top-6 left-1/2 transform -translate-x-1/2 w-[95%] rounded-full z-50 py-2 sm:py-2 px-4 sm:px-6 md:px-10 flex justify-between items-center"
            style={{
              backgroundColor: "white",
            }}
          >
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <img
                  src="/images/logo/nellai-tours-logo.png"
                  alt="Nellai Tourism Logo"
                  className="h-8 sm:h-10 w-auto pb-1"
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-xs sm:text-base font-medium text-[#2C2A6B] leading-tight tracking-wider font-lemo">
                    NELLAI TOURS
                  </h1>
                  <p
                    className="text-[8px] sm:text-[10px] font-normal text-black leading-tight tracking-[0em] font-lemo"
                    style={{ maxWidth: "fit-content" }}
                  >
                    WORLD CLASS TRAVEL
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-20 text-sm font-semibold">
              <Link
                to="/"
                className="text-[#2C2A6B] font-semibold hover:text-[#1a1a40] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
              >
                About us
              </Link>
              <Link
                to="/packages"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
              >
                Packages
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors"
              >
                Contact us
              </Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-purple-700 transition-colors" />
              <Link to="/signin" className="bg-tourism-primary text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-tourism-primary/90 transition-colors whitespace-nowrap">Sign in / Sign up</Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 sm:p-2 text-gray-700 hover:text-purple-700 transition-colors ml-2 mobile-menu-container"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${isScrolled ? 'fixed' : 'absolute'} top-16 sm:top-20 left-1/2 transform -translate-x-1/2 w-[95%] z-50 bg-white rounded-2xl shadow-xl py-4 mobile-menu-container`}
          >
            <nav className="flex flex-col space-y-4 px-6">
              <Link
                to="/"
                className="text-[#2C2A6B] font-semibold hover:text-[#1a1a40] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/packages"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-[#2C2A6B] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </Link>
              <div className="flex items-center gap-3 pt-4 border-t">
                <Search className="w-5 h-5 text-gray-700" />
                <Link 
                  to="/signin" 
                  className="bg-tourism-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-tourism-primary/90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in / Sign up
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
