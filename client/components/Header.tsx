import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-white py-2 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-[1440px] mx-auto">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 lg:gap-4 text-xs font-poppins">
            <div className="flex items-center gap-2 pr-5 border-r border-gray-300">
              <Phone className="w-4 h-4 text-tourism-primary" />
              <span>+91 81484 32978</span>
            </div>
            <div className="flex items-center gap-2 pr-5 border-r border-gray-300">
              <MessageCircle className="w-4 h-4 text-tourism-primary" />
              <span>+91 81484 32978</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-tourism-primary" />
              <span>radanholidays@gmail.com</span>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <div className="w-6 h-6 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 17 17" fill="currentColor">
                <path d="M9.45573 9.12467H11.1224L11.7891 6.45801H9.45573V5.12467C9.45573 4.43801 9.45573 3.79134 10.7891 3.79134H11.7891V1.55134C11.5717 1.52267 10.7511 1.45801 9.8844 1.45801C8.0744 1.45801 6.78906 2.56267 6.78906 4.59134V6.45801H4.78906V9.12467H6.78906V14.7913H9.45573V9.12467Z"/>
              </svg>
            </div>
            <div className="w-6 h-6 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 17 17" fill="currentColor">
                <path d="M0.789062 1.45801H2.45573L12.4557 14.7913H10.7891L0.789062 1.45801ZM3.78906 1.45801H5.45573L15.4557 14.7913H13.7891L3.78906 1.45801Z"/>
                <path d="M2.125 1.45801H5.45833V2.79134H2.125V1.45801ZM10.7917 14.7913H14.125V13.458H10.7917V14.7913Z"/>
                <path d="M12.4583 1.45801H14.7917L3.45833 14.7913H1.125L12.4583 1.45801Z"/>
              </svg>
            </div>
            <div className="w-6 h-6 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div className="w-6 h-6 bg-tourism-primary rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
     
    </header>
  );
}
