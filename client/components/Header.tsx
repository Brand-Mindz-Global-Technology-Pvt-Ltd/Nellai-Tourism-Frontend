import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-white py-4 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-[1440px] mx-auto">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 lg:gap-5 text-xs font-poppins">
            <div className="flex items-center gap-2 pr-6 border-r border-gray-300">
              <Phone className="w-[18px] h-[18px] text-tourism-primary" />
              <span>+91 81484 32978</span>
            </div>
            <div className="flex items-center gap-2 pr-6 border-r border-gray-300">
              <MessageCircle className="w-[18px] h-[18px] text-tourism-primary" />
              <span>+91 81484 32978</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-[18px] h-[18px] text-tourism-primary" />
              <span>radanholidays@gmail.com</span>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="w-7 h-7 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 17 17" fill="currentColor">
                <path d="M9.45573 9.12467H11.1224L11.7891 6.45801H9.45573V5.12467C9.45573 4.43801 9.45573 3.79134 10.7891 3.79134H11.7891V1.55134C11.5717 1.52267 10.7511 1.45801 9.8844 1.45801C8.0744 1.45801 6.78906 2.56267 6.78906 4.59134V6.45801H4.78906V9.12467H6.78906V14.7913H9.45573V9.12467Z"/>
              </svg>
            </div>
            <div className="w-7 h-7 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 17 17" fill="currentColor">
                <path d="M0.789062 1.45801H2.45573L12.4557 14.7913H10.7891L0.789062 1.45801ZM3.78906 1.45801H5.45573L15.4557 14.7913H13.7891L3.78906 1.45801Z"/>
                <path d="M2.125 1.45801H5.45833V2.79134H2.125V1.45801ZM10.7917 14.7913H14.125V13.458H10.7917V14.7913Z"/>
                <path d="M12.4583 1.45801H14.7917L3.45833 14.7913H1.125L12.4583 1.45801Z"/>
              </svg>
            </div>
            <div className="w-7 h-7 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 17 17" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.125 2.125C12.6554 2.125 13.1641 2.33571 13.5392 2.71079C13.9143 3.08586 14.125 3.59457 14.125 4.125V12.125C14.125 12.6554 13.9143 13.1641 13.5392 13.5392C13.1641 13.9143 12.6554 14.125 12.125 14.125H4.125C3.59457 14.125 3.08586 13.9143 2.71079 13.5392C2.33571 13.1641 2.125 12.6554 2.125 12.125V4.125C2.125 3.59457 2.33571 3.08586 2.71079 2.71079C3.08586 2.33571 3.59457 2.125 4.125 2.125H12.125ZM5.45833 6.79167C5.28152 6.79167 5.11195 6.8619 4.98693 6.98693C4.8619 7.11195 4.79167 7.28152 4.79167 7.45833V10.7917C4.79167 10.9685 4.8619 11.138 4.98693 11.2631C5.11195 11.3881 5.28152 11.4583 5.45833 11.4583C5.63514 11.4583 5.80471 11.3881 5.92974 11.2631C6.05476 11.138 6.125 10.9685 6.125 10.7917V7.45833C6.125 7.28152 6.05476 7.11195 5.92974 6.98693C5.80471 6.8619 5.63514 6.79167 5.45833 6.79167Z"/>
              </svg>
            </div>
            <div className="w-7 h-7 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 17 17" fill="currentColor">
                <path d="M8.81332 1.45801C9.56332 1.46001 9.94398 1.46401 10.2726 1.47334L10.402 1.47801C10.5513 1.48334 10.6986 1.49001 10.8766 1.49801C11.586 1.53134 12.07 1.64334 12.4946 1.80801C12.9346 1.97734 13.3053 2.20667 13.676 2.57667C14.0151 2.90983 14.2774 3.31299 14.4447 3.75801C14.6093 4.18267 14.7213 4.66667 14.7547 5.37667C14.7627 5.55401 14.7693 5.70134 14.7746 5.85134L14.7787 5.98067C14.7887 6.30867 14.7927 6.68934 14.794 7.43934L14.7947 7.93668V8.81001C14.7963 9.29628 14.7912 9.78255 14.7793 10.2687L14.7753 10.398C14.77 10.548 14.7633 10.6953 14.7553 10.8727C14.722 11.5827 14.6087 12.066 14.4447 12.4913C14.2774 12.9364 14.0151 13.3395 13.676 13.6727C13.3428 14.0118 12.9397 14.2741 12.4946 14.4413C12.07 14.606 11.586 14.718 10.8766 14.7513L10.402 14.7713L10.2726 14.7753C9.94398 14.7847 9.56332 14.7893 8.81332 14.7907L8.31598 14.7913H7.44332C6.95682 14.7931 6.47033 14.7879 5.98398 14.776L5.85465 14.772C5.69639 14.766 5.53817 14.7591 5.37998 14.7513C4.67065 14.718 4.18665 14.606 3.76132 14.4413C3.31654 14.274 2.91361 14.0117 2.58065 13.6727C2.24128 13.3396 1.97872 12.9364 1.81132 12.4913C1.64665 12.0667 1.53465 11.5827 1.50132 10.8727L1.48132 10.398L1.47798 10.2687C1.46569 9.78255 1.46014 9.29628 1.46132 8.81001V7.43934C1.45947 6.95307 1.46436 6.46681 1.47598 5.98067L1.48065 5.85134C1.48598 5.70134 1.49265 5.55401 1.50065 5.37667C1.53398 4.66667 1.64598 4.18334 1.81065 3.75801C1.97845 3.31281 2.24147 2.90963 2.58132 2.57667C2.91409 2.23771 3.31678 1.97539 3.76132 1.80801C4.18665 1.64334 4.66998 1.53134 5.37998 1.49801C5.55732 1.49001 5.70532 1.48334 5.85465 1.47801L5.98398 1.47401C6.47011 1.46216 6.95638 1.45705 7.44265 1.45867L8.81332 1.45801Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white w-full py-3 px-4 md:px-8 lg:px-16 xl:px-24 rounded-full mx-auto shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-[1440px] mx-auto gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/bf971480616ae304b06f187f6ece010db95a27d2?width=270" 
              alt="Nellai Tourism Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-8 lg:gap-16 text-sm font-poppins">
            <Link to="/" className="text-tourism-primary font-semibold hover:text-tourism-primary/80 transition-colors">
              Home
            </Link>
            <Link to="/packages" className="text-black hover:text-tourism-primary transition-colors">
              Packages
            </Link>
            <Link to="/about" className="text-black hover:text-tourism-primary transition-colors">
              About us
            </Link>
            <Link to="/contact" className="text-black hover:text-tourism-primary transition-colors">
              Contact us
            </Link>
          </nav>
          
          {/* Search and Sign In */}
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-black cursor-pointer hover:text-tourism-primary transition-colors" />
            <div className="w-px h-5 bg-gray-300" />
            <button className="bg-tourism-primary text-white px-6 py-2 rounded-2xl text-sm font-medium hover:bg-tourism-primary/90 transition-colors">
              Sign in / Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
