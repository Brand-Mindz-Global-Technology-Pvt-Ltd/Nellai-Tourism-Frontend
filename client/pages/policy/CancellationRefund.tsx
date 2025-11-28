import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function CancellationRefund() {
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
         Cancellation & Refund Policy
          </h1>
        </div>
      </div>

      {/* Content Section */}
     <main className="flex-grow py-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#fafafa]">
  <div className="max-w-4/2xl mx-auto bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-[#111827] leading-relaxed space-y-6">

    <h2 className="text-2xl md:text-3xl font-semibold text-black">
      Cancellation & Refund Policy
    </h2>

    <p>
      At Nellai Tours Pte. Ltd. (“Nellai Tours”, “we”, “us”, or “our”), we understand that plans may change, and we
      strive to handle cancellations and refunds with fairness and transparency. This policy outlines the conditions
      under which cancellations and refunds will be processed for all our tour packages and services.
    </p>

    <p>
      This policy applies to all bookings made for Group Tours, Customized Holidays, MICE Tours, Inbound Holidays,
      or any independent service provided by Nellai Tours, including third-party services such as airlines, hotels,
      transportation, and sightseeing.
    </p>

    {/* 1. General Terms */}
    <h3 className="text-xl font-semibold mt-4">1. General Terms of Cancellation</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>All cancellations must be submitted in writing from the registered email to <b>sgnellaitours@gmail.com</b>.</li>
      <li>Once cancelled, bookings cannot be reinstated — new booking rules apply.</li>
      <li>Cancellation charges apply based on the date the cancellation email is received.</li>
      <li>Third-party supplier policies (airlines, hotels, cruises etc.) apply additionally.</li>
    </ul>

    {/* 2. Charges */}
    <h3 className="text-xl font-semibold mt-4">2. Cancellation Charges</h3>
    <p>
      Charges depend on timeline and service type. Cancellations close to departure may be non-refundable. Some
      services may have 100% cancellation fees. Processing and payment gateway fees are non-refundable.
    </p>

    {/* 3. Special circumstances */}
    <h3 className="text-xl font-semibold mt-4">3. Special Circumstances</h3>

    <h4 className="font-semibold mt-3">3.1 Guest-Initiated Cancellations</h4>
    <p>Due to illness, exams, leave issues, or family emergency → Standard cancellation fees apply.</p>

    <h4 className="font-semibold mt-3">3.2 Force Majeure / Uncontrollable Events</h4>
    <ul className="list-disc pl-6 space-y-1">
      <li>No refund applicable.</li>
      <li>Guests may reschedule to a future date.</li>
      <li>Price differences (if any) must be paid by the guest.</li>
      <li>Credit shells may be issued for future use.</li>
    </ul>

    <h4 className="font-semibold mt-3">3.3 Refusal of Revised Services</h4>
    <p>
      Guests refusing modified itinerary/services must cancel the booking with applicable cancellation fees.
    </p>

    {/* 4. Deemed cancellations */}
    <h3 className="text-xl font-semibold mt-4">4. Deemed Cancellations</h3>

    <h4 className="font-semibold mt-3">4.1 Visa Rejection or Delay</h4>
    <ul className="list-disc pl-6 space-y-1">
      <li>Considered cancelled on visa rejection date.</li>
      <li>Standard cancellation rules apply.</li>
    </ul>

    <h4 className="font-semibold mt-3">4.2 Non-Payment by Due Date</h4>
    <p>Booking will be cancelled automatically; charges apply.</p>

    <h4 className="font-semibold mt-3">4.3 No Show on Tour Departure</h4>
    <p>100% cancellation charges apply.</p>

    <h4 className="font-semibold mt-3">4.4 Discontinuation Mid-Tour</h4>
    <p>No refund. Additional arrangements are self-funded.</p>

    <h4 className="font-semibold mt-3">4.5 Single Room Sharing Cancellation</h4>
    <p>No refund for additional costs if roommate cancels.</p>

    {/* 5. Cancellation by Company */}
    <h3 className="text-xl font-semibold mt-4">5. Cancellation by Nellai Tours</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Full refund if company cancels due to operational reasons.</li>
      <li>Refund process within 10 working days.</li>
      <li>Refund through cheque or bank transfer.</li>
    </ul>

    {/* 6. Refund policy */}
    <h3 className="text-xl font-semibold mt-4">6. Refund Policy</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Refunds made within 10 working days after approval.</li>
      <li>Refund in SGD via Cheque / Bank Transfer / PayNow.</li>
      <li>Refunds only to the primary guest or paying institution.</li>
      <li>No interest applicable.</li>
    </ul>

    <p><u>Non-Refundable Components include:</u></p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Convenience fees on online/card payments.</li>
      <li>TCS (Tax Collected at Source) for international tours.</li>
      <li>Visa & insurance costs once processed.</li>
      <li>Holiday Design Fee for customized packages.</li>
      <li>Service charges for last-minute changes.</li>
    </ul>

    {/* 7. Transfer Requests */}
    <h3 className="text-xl font-semibold mt-4">7. Tour Transfer Requests</h3>
    <p>
      Transfer requests are treated as cancellation + new booking at updated price. Subject to availability.
    </p>

    {/* 8. Merging */}
    <h3 className="text-xl font-semibold mt-4">8. Merging or Modifying Tours</h3>
    <p>
      Tours may be merged due to low participation. Seating & services are prioritized based on booking order.
    </p>

    {/* 9. Right to admission */}
    <h3 className="text-xl font-semibold mt-4">9. Right to Admission / Termination</h3>
    <p>
      Nellai Tours may refuse or cancel bookings at any time. Guests causing disruption or violating group decorum
      may be removed from the tour without refund. Return travel costs must be self-funded.
    </p>

  </div>
</main>


      <Footer />
    </div>
  );
}
