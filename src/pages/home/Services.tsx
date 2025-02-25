import React from "react";

const Services: React.FC = () => {
  return (
    <div>
      <div
        className="w-full h-1/4 bg-cover bg-center"
        style={{ backgroundImage: "url('/path/to/your/banner-image.jpg')" }}
      >
        {/* Banner Image */}
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Our Car Rental Services</h1>
        <p className="mb-4">
          Welcome to Rent-A-Car! We offer a wide range of services to make your
          car rental experience as smooth and convenient as possible.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Wide selection of vehicles to suit your needs, from economy cars to
            luxury SUVs.
          </li>
          <li>Competitive pricing with no hidden fees.</li>
          <li>Easy online booking and payment process.</li>
          <li>24/7 customer support to assist you at any time.</li>
          <li>Flexible rental periods to fit your schedule.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Our Services Include:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Daily, weekly, and monthly car rentals.</li>
          <li>Long-term leasing options for businesses.</li>
          <li>One-way rentals for your convenience.</li>
          <li>Free delivery and pick-up service within city limits.</li>
          <li>Comprehensive insurance coverage for peace of mind.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Special Offers:</h2>
        <p className="mb-4">
          Check out our special offers and discounts for early bookings,
          long-term rentals, and corporate clients. We also provide seasonal
          promotions to help you save more on your car rental.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact Us:</h2>
        <p className="mb-4">
          Have any questions or need assistance? Our friendly customer support
          team is here to help. Contact us via phone, email, or live chat.
        </p>
      </div>
    </div>
  );
};

export default Services;
