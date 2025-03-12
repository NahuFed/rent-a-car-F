import React from 'react';
import { Link } from 'react-router-dom';


const UserDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/browse-cars" className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Browse Cars</h2>
                    <p>Explore our catalog of available cars and find the perfect one for your needs.</p>
                   
                </Link>
                <Link to="/rental-history" className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Rental Requests</h2>
                    <p>Submit a new rental request or view the status of your existing requests.</p>                    
                </Link>
                <Link to= "/my-profile" className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p>Manage your account details and view your rental history.</p>
                </Link>
                <Link to= "/documents" className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Documents</h2>
                    <p>Manage your personal documents relevant and necessary for renting a car.</p>
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;