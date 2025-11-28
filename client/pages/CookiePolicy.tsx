import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen font-poppins flex flex-col">
      <Header />
      <div className="relative">
        <Navbar />
        {/* Banner Section */}
        <div className="bg-tourism-primary/10 py-40 px-4 md:px-8 lg:px-16 xl:px-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-tourism-primary uppercase tracking-wide">
            Cookie Policy
          </h1>
        </div>
      </div>

      {/* Content Section */}
     <main className="flex-grow py-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#fafafa]">
  <div className="max-w-4/2xl mx-auto bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-[#111827] leading-relaxed space-y-6">

    <h2 className="text-2xl md:text-3xl font-semibold text-black">Cookie Policy</h2>

    <p>
      At Nellai Tours Pte. Ltd. (“Nellai Tours”, “we”, “us”, or “our”), we use cookies and similar technologies to
      enhance your browsing experience and provide personalized services. This Cookie Policy explains what cookies
      are, how we use them, and how you can manage them.
    </p>

    <p>
      By using our website 
      <span className="font-medium"> https://www.nellaitours.com </span>,
      you agree to the use of cookies in accordance with this policy.
    </p>

    <h3 className="text-xl font-semibold mt-4">What Are Cookies?</h3>
    <p>
      Cookies are small data files stored on your device (computer, tablet, or mobile phone) when you visit a
      website. They allow the site to remember your actions and preferences such as login, language, and display
      settings — so you don’t need to re-enter them whenever you return.
    </p>

    <h3 className="text-xl font-semibold mt-4">How We Use Cookies</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Recognize repeat visitors to our website.</li>
      <li>Enable essential website functions and security.</li>
      <li>Facilitate smooth navigation and booking functionality.</li>
      <li>Analyze website traffic and user behavior.</li>
      <li>Customize browsing content and preferences.</li>
      <li>Deliver targeted advertisements based on interests.</li>
      <li>Measure marketing performance and effectiveness.</li>
    </ul>

    <h3 className="text-xl font-semibold mt-4">Types of Cookies We Use</h3>

    <h4 className="font-semibold mt-2">1. Essential Cookies</h4>
    <p>These cookies enable core website features such as secure pages and booking services.</p>

    <h4 className="font-semibold mt-2">2. Functional Cookies</h4>
    <p>These cookies remember your settings like language, region, and login preferences.</p>

    <h4 className="font-semibold mt-2">3. Analytical / Performance Cookies</h4>
    <p>These help us understand user interactions like pages visited and time spent.</p>

    <h4 className="font-semibold mt-2">4. Marketing / Advertising Cookies</h4>
    <p>
      Used to show ads relevant to your interests and limit repetition. Third-party ad networks may use pixel tags
      to anonymously track browsing behavior.
    </p>

    <h3 className="text-xl font-semibold mt-4">Third-Party Cookies</h3>
    <p>
      You may encounter cookies from third-party service providers (e.g., airlines, hotels, payment partners).
      These sites may collect data for their own analytics and advertising. We recommend reviewing their respective
      privacy and cookie policies.
    </p>

    <h3 className="text-xl font-semibold mt-4">Managing Your Cookie Preferences</h3>
    <p>
      Most browsers accept cookies automatically, but you can modify or disable cookie settings. Note: disabling
      cookies may affect website performance or access to certain features.
    </p>

    <p>To manage or delete cookies, you may:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Review your browser’s help section/settings.</li>
      <li>Use cookie management or privacy tools.</li>
      <li>Opt-out using third-party platforms like Google Ads or Your Online Choices.</li>
    </ul>

    <h3 className="text-xl font-semibold mt-4">Tracking Technologies</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li><b>Pixel tags:</b> Track email opens or page visits.</li>
      <li><b>Session tracking:</b> Understand usage per visit.</li>
      <li><b>Clickstream data:</b> Analyze navigation behavior.</li>
    </ul>

    <p>
      All data collected is anonymized and used solely for improving services and marketing optimization.
    </p>

  </div>
</main>


      <Footer />
    </div>
  );
}
