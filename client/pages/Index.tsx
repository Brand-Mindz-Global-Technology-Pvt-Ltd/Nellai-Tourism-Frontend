import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TravelCategories from "../components/TravelCategories";
import SearchSection from "../components/SearchSection";
import AdventureSection from "../components/AdventureSection";
import LocalHappenings from "../components/LocalHappenings";
import PopularDestinations from "../components/PopularDestinations";
import Gallery from "../components/Gallery";
import EventsSection from "../components/EventsSection";
import SocialMediaSection from "../components/SocialMediaSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen font-poppins">
      <Header />
      <HeroSection />
      <TravelCategories />
      <SearchSection />
      <AdventureSection />
      <LocalHappenings />
      <PopularDestinations />
      <Gallery />
      <EventsSection />
      <SocialMediaSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
