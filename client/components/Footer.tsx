import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Call to Action Section */}
      <section className="relative w-full py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/c036b52ffa11a3811f2636e4d28da869b70f578c?width=2912')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto text-center">
          <h2 className="text-white font-oswald text-3xl md:text-4xl font-semibold mb-3">
            READY TO EXPLORE THE WORLD?
          </h2>
          <p className="text-white font-poppins text-sm font-medium mb-6">
            Let us help you create unforgettable memories with our special tours and destinations.
          </p>
          <button className="bg-tourism-primary text-white px-6 py-2.5 rounded font-poppins text-sm font-semibold hover:bg-tourism-primary/90 transition-colors">
            Book now
          </button>
        </div>
      </section>

      {/* Branches Section */}
      <div className="bg-tourism-primary py-5 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto text-center">
          <h3 className="text-white font-poppins text-sm font-medium mb-2">
            Our Branches
          </h3>
          <div className="w-40 h-px bg-white mx-auto mb-3"></div>
          <p className="text-white font-poppins text-xs tracking-wider">
            Chennai | Coimbatore | Trichy | Madurai | Tutucoin | Nagarcoil |Cochin | Bangalore | Mumbai | UAE -Dubai | China | Russia | Singapore |Europe -Italy | United Kingdom | USA
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-10 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1dce51ba7eddab862e1e7859e7e4443daaa3d47a?width=306" 
              alt="Nellai Tourism Logo" 
              className="h-9 w-auto mb-5"
            />
            <p className="text-gray-600 font-poppins text-xs mb-5 leading-relaxed">
              Radan holidays is an online travel agency operated by a well-established & reputed Travel Management Company Radan Travel & Tours
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-tourism-primary transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 17 17" fill="currentColor">
                  <path d="M9.45573 9.12467H11.1224L11.7891 6.45801H9.45573V5.12467C9.45573 4.43801 9.45573 3.79134 10.7891 3.79134H11.7891V1.55134C11.5717 1.52267 10.7511 1.45801 9.8844 1.45801C8.0744 1.45801 6.78906 2.56267 6.78906 4.59134V6.45801H4.78906V9.12467H6.78906V14.7913H9.45573V9.12467Z"/>
                </svg>
              </div>
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-tourism-primary transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 17 17" fill="currentColor">
                  <path d="M0.789062 1.45801H2.45573L12.4557 14.7913H10.7891L0.789062 1.45801ZM3.78906 1.45801H5.45573L15.4557 14.7913H13.7891L3.78906 1.45801Z"/>
                </svg>
              </div>
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-tourism-primary transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 17 17" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.125 2.125C12.6554 2.125 13.1641 2.33571 13.5392 2.71079C13.9143 3.08586 14.125 3.59457 14.125 4.125V12.125C14.125 12.6554 13.9143 13.1641 13.5392 13.5392C13.1641 13.9143 12.6554 14.125 12.125 14.125H4.125C3.59457 14.125 3.08586 13.9143 2.71079 13.5392C2.33571 13.1641 2.125 12.6554 2.125 12.125V4.125C2.125 3.59457 2.33571 3.08586 2.71079 2.71079C3.08586 2.33571 3.59457 2.125 4.125 2.125H12.125Z"/>
                </svg>
              </div>
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-tourism-primary transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 17 17" fill="currentColor">
                  <path d="M8.81332 1.45801C9.56332 1.46001 9.94398 1.46401 10.2726 1.47334L10.402 1.47801C10.5513 1.48334 10.6986 1.49001 10.8766 1.49801C11.586 1.53134 12.07 1.64334 12.4946 1.80801Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-tourism-primary font-poppins text-sm font-medium mb-5">
              Quick links
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 font-poppins text-xs hover:text-tourism-primary transition-colors">Home</Link></li>
              <li><Link to="/packages" className="text-gray-600 font-poppins text-xs hover:text-tourism-primary transition-colors">Packages</Link></li>
              <li><Link to="/about" className="text-gray-600 font-poppins text-xs hover:text-tourism-primary transition-colors">About us</Link></li>
              <li><Link to="/contact" className="text-gray-600 font-poppins text-xs hover:text-tourism-primary transition-colors">Contact us</Link></li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h4 className="text-tourism-primary font-poppins text-sm font-medium mb-5">
              Corporate Office
            </h4>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-3 h-4 text-tourism-primary mt-1 flex-shrink-0" />
              <p className="text-gray-600 font-poppins text-xs leading-relaxed">
                No: 138 Arcot Road,<br />
                Kodambakkam, Chennai Tamilnadu, India-600024
              </p>
            </div>
            
            <h4 className="text-tourism-primary font-poppins text-sm font-medium mb-5">
              Head Office
            </h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-3 h-4 text-tourism-primary mt-1 flex-shrink-0" />
              <p className="text-gray-600 font-poppins text-xs leading-relaxed">
                No:1 Paya Lebar Link,<br />
                #04-01 Paya Lebar Quarter<br />
                Singapore-408533
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-tourism-primary font-poppins text-sm font-medium mb-5">
              Contact us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-tourism-primary" />
                <span className="text-gray-600 font-poppins text-xs">+91 81484 32978</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-tourism-primary" />
                <span className="text-gray-600 font-poppins text-xs">+91 81484 32978</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-tourism-primary" />
                <span className="text-gray-600 font-poppins text-xs">radanholidays@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-6 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-poppins text-black">
            <span>Copyright © 2025 Radan Holidays. All rights reserved</span>
            <div className="flex items-center gap-4 border-l border-gray-300 pl-4">
              <Link to="/privacy" className="hover:text-tourism-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-tourism-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
