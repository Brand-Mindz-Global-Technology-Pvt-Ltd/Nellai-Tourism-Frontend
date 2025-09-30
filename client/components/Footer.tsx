import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEnquireModal } from "../contexts/EnquireModalContext";

// SVG icon components for visible social icons
const FacebookIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#1877F2" />
    <path
      d="M18.5 16H20l.5-3h-2V11.5c0-.6.2-1 1-1h1.1V8.2c-.2 0-.9-.2-1.7-.2-1.7 0-2.9 1-2.9 2.8V13H13v3h2v7h3.5v-7z"
      fill="#fff"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path
      d="M8.5 16c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5c0 1.6-.5 3.1-1.4 4.3l.8 2.9-3-.8c-1.1.6-2.3.9-3.6.9-4.1 0-7.5-3.4-7.5-7.5zm4.2-2.1c-.2 0-.4.1-.5.3-.1.2 0 .4.1.6.2.3.4.6.6.8.1.1.1.2.1.3 0 .2-.1.4-.3.5-.1.1-.2.1-.3.1-.2 0-.4-.1-.5-.3-.2-.3-.4-.6-.6-.9-.1-.2-.2-.4-.1-.6.1-.2.3-.3.5-.3.2 0 .4.1.5.3.1.1.1.2.1.3 0 .1 0 .2-.1.3-.1.1-.2.1-.3.1zm3.6 0c-.2 0-.4.1-.5.3-.1.2 0 .4.1.6.2.3.4.6.6.8.1.1.1.2.1.3 0 .2-.1.4-.3.5-.1.1-.2.1-.3.1-.2 0-.4-.1-.5-.3-.2-.3-.4-.6-.6-.9-.1-.2-.2-.4-.1-.6.1-.2.3-.3.5-.3.2 0 .4.1.5.3.1.1.1.2.1.3 0 .1 0 .2-.1.3-.1.1-.2.1-.3.1z"
      fill="#fff"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#E4405F" />
    <rect x="10" y="10" width="12" height="12" rx="3" stroke="#fff" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="16" r="3" stroke="#fff" strokeWidth="1.5" fill="none" />
    <circle cx="20.5" cy="11.5" r="1" fill="#fff" />
  </svg>
);

const socialLinks = [
  {
    href: "https://www.facebook.com/nellaitours",
    label: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    href: "https://www.instagram.com/nellai_tours_pte_ltd/",
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    href: "https://wa.me/6585022187",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
  },
];

export default function Footer() {
  const { openModal } = useEnquireModal();
  
  return (
    <footer className="w-full bg-white text-black">
      {/* === Top CTA Section === */}
      <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/c036b52ffa11a3811f2636e4d28da869b70f578c?width=2912')",
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 uppercase">
            READY TO EXPLORE THE WORLD?
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-6">
            Let us help you create unforgettable memories with our special tours and destinations.
          </p>
          <button 
            onClick={openModal}
            className="bg-yellow-400 text-black px-8 py-3 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Book now
          </button>
        </div>
      </section>

      {/* === Main Footer === */}
      <div className="py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-poppins">
              Nellai Tours is an online travel agency operated by a well-established & 
              reputed Travel Management Company Nellai Tours & Tours
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map(({ href, label, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer shadow-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-black font-semibold mb-4">Quick links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-tourism-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-tourism-primary">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-tourism-primary">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tourism-primary">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h4 className="text-black font-semibold mb-4">Corporate Office</h4>
            <div className="flex items-start gap-3 mb-6 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-tourism-primary mt-1" />
              <p>
                No: 138 Arcot Road,<br />
                Kodambakkam, Chennai<br />
                Tamilnadu, India - 600024
              </p>
            </div>

            <h4 className="text-black font-semibold mb-4">Head Office</h4>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-tourism-primary mt-1" />
              <p>
                No:1 Paya Lebar Link,<br />
                #04-01 Paya Lebar Quarter<br />
                Singapore - 408533
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-black font-semibold mb-4">Contact us</h4>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-tourism-primary" />
                <span>+65 85022187</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-tourism-primary" />
                <span>+65 85022187</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-tourism-primary" />
                <span>sales@nellaitours.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Branches Section === */}
      <div className="bg-tourism-primary py-4 px-4">
        <div className="max-w-[1440px] mx-auto text-center">
          <h3 className="text-white font-medium text-sm mb-2">Our Branches</h3>
          <p className="text-white text-xs leading-relaxed">
             Singapore | India 
          </p>
        </div>
      </div>

      {/* === Bottom Bar === */}
      <div className="py-6">
        <div className="max-w-[1440px] mx-auto px-4">
          {/* Top separator line */}
          <div className="w-full h-px bg-gray-300 mb-4"></div>
          
          {/* Copyright text */}
          <div className="text-center text-sm text-gray-600">
            Copyright © 2025 Nellai Tours Made with <span className="text-red-500">❤️ </span>{" "} by {" "}
            <a
              href="https://brandmindz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-tourism-primary transition"
            >
              Brand Mindz
            </a>{" "}
            | All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
