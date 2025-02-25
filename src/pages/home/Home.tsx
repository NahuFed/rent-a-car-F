import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to Rent-A-Car</h1>
            <p className="text-lg mb-4">Explore and enjoy our car rental services.</p>
            <Link to="/register" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-4">
                Register Now
            </Link>
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-2">Why Choose Us?</h2>
                <p className="mb-4">We offer a wide range of vehicles to suit your needs, from economy cars to luxury SUVs. Enjoy competitive rates, flexible rental periods, and exceptional customer service.</p>
                <Link to="/services" className="text-blue-500 hover:underline">
                    Learn More About Our Services
                </Link>
            </div>
        </div>
    );
};

export default Home;