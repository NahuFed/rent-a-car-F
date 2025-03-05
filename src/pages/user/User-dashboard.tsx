import React from 'react';
import { Link } from 'react-router-dom';


const UserDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Browse Cars</h2>
                    <p>Explore our catalog of available cars and find the perfect one for your needs.</p>
                    <Link to="/browse-cars" className="text-blue-500 hover:underline">Go to Browse Cars</Link>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Rental Requests</h2>
                    <p>Submit a new rental request or view the status of your existing requests.</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p>Manage your account details and view your rental history.</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;