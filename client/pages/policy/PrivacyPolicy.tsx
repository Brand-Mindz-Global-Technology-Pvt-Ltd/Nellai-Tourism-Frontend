import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen font-poppins flex flex-col">
      <Header />
      <div className="relative">
        <Navbar />
        {/* Banner Section */}
        <div
          className="relative py-44 px-4 md:px-8 lg:px-16 xl:px-24 text-center overflow-hidden"
          style={{
            backgroundImage: "url('/images/policies/policy.jpg')", // Replace with your actual image path
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <h1 className="relative z-10 text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content Section */}
<main className="flex-grow py-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#fafafa]">
  <div className="max-w-4/2xl mx-auto bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-200 text-[#111827] leading-relaxed space-y-6">

    <h2 className="text-2xl md:text-3xl font-semibold text-black">Privacy Policy</h2>

    <p>
      Nellai Tours Pte. Ltd. (“Nellai Tours”, “we”, “us” or “our”) respects your privacy and is committed to
      protecting the personal information you share with us. This Privacy Policy outlines how we collect, use,
      disclose, and safeguard your personal data when you use our website 
      <span className="font-medium"> https://www.nellaitours.com </span>
      or interact with us through any of our offices, including corporate offices, branch offices, or preferred
      sales partners.
    </p>

    <p>
      By accessing our website or providing your personal information to us, you agree to the terms and conditions
      of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our
      website or services.
    </p>

    {/* 1. Scope */}
    <h3 className="text-xl font-semibold mt-4">1. Scope of Policy</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>All individuals who book, purchase, or enquire about our travel-related services.</li>
      <li>Any interaction with Nellai Tours through our website, in person, or through our sales partners.</li>
      <li>Subsidiary companies under Nellai Tours Pte. Ltd.</li>
    </ul>

    {/* 2. Collection */}
    <h3 className="text-xl font-semibold mt-4">2. Collection of Personal Information</h3>
    <p>We may collect the following types of personal and sensitive information:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Personal Identification Details: Name, address, email ID, contact number, date of birth.</li>
      <li>Travel Documents: Passport number, issue/expiry dates, visa documents, national ID.</li>
      <li>Financial Information: Encrypted credit/debit card details, bank account details.</li>
      <li>Professional and Business Details: Job title, company name, business documents.</li>
      <li>Sensitive Personal Information: Medical history, disabilities, special requirements.</li>
      <li>Technical Data: IP address, browser type, operating system, usage data, location data.</li>
      <li>Correspondence records such as emails & calls (may be recorded for quality/training).</li>
    </ul>

    {/* 3. Purpose */}
    <h3 className="text-xl font-semibold mt-4">3. Purpose of Data Collection</h3>
    <p>Your data is collected to provide a safe, efficient, and personalized experience. This includes:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Processing bookings and purchases.</li>
      <li>Sending confirmations, itineraries, alerts and updates.</li>
      <li>Customer support and dispute resolution.</li>
      <li>Fraud detection & compliance with legal requirements.</li>
      <li>Enhancing website functionality and user experience.</li>
    </ul>

    {/* 4. Cookies */}
    <h3 className="text-xl font-semibold mt-4">4. Use of Cookies and Tracking Tools</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Improve website functionality and performance.</li>
      <li>Analyze browsing behavior and optimize content.</li>
      <li>Troubleshoot technical issues.</li>
      <li>Store user preferences for enhanced browsing.</li>
    </ul>
    <p>You can manage cookie preferences in your browser settings.</p>

    {/* 5. Disclosure */}
    <h3 className="text-xl font-semibold mt-4">5. Data Sharing and Disclosure</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Trusted third-party service providers for travel processing.</li>
      <li>Government authorities where required by law.</li>
      <li>Affiliates for internal administrative purposes.</li>
      <li>Marketing partners only with your consent.</li>
    </ul>
    <p>All third parties must comply with strict privacy guidelines.</p>

    {/* 6. Security */}
    <h3 className="text-xl font-semibold mt-4">6. Data Security</h3>
    <p>
      We apply reasonable technical and organizational measures to protect your data including encryption,
      firewalls, and restricted access. However, no system is completely secure and we cannot guarantee absolute
      security.
    </p>

    {/* 7. Retention */}
    <h3 className="text-xl font-semibold mt-4">7. Data Retention</h3>
    <p>We retain personal data:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>As long as required to fulfill stated business purposes.</li>
      <li>As required by law or regulatory mandates.</li>
      <li>For audit, fraud prevention, and dispute resolution.</li>
    </ul>

    {/* 8. User Rights */}
    <h3 className="text-xl font-semibold mt-4">8. Your Rights and Choices</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Access, correct, or update your information.</li>
      <li>Withdraw consent (where legally applicable).</li>
      <li>Request deletion of personal data.</li>
    </ul>
    <p>To exercise these rights, please contact us.</p>

    {/* 9. Third-party */}
    <h3 className="text-xl font-semibold mt-4">9. Third-Party Links</h3>
    <p>
      Our website may contain links to external sites. We are not responsible for the privacy practices or content
      of those websites.
    </p>

    {/* 10. Updates */}
    <h3 className="text-xl font-semibold mt-4">10. Policy Updates</h3>
    <p>
      We may update this Privacy Policy occasionally based on legal or business requirements. Revised versions will
      be posted with an updated “Effective Date”.
    </p>
  </div>
</main>


      <Footer />
    </div>
  );
}
