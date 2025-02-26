import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaCar, FaClipboardList } from 'react-icons/fa';
import './admin.css';

const AdminDashboard: React.FC = () => {
    return (
        <div className="flex min-h-screen border border-gray-300 shadow-lg">
            <aside className="w-64 bg-gray-800 text-white flex flex-col border-r border-gray-700">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    Admin Dashboard
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/admin/cars" className="flex items-center space-x-2 hover:text-gray-300">
                                <FaCar />
                                <span>Manage Cars</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/rental-requests" className="flex items-center space-x-2 hover:text-gray-300">
                                <FaClipboardList />
                                <span>Manage Rental Requests</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {/* Aquí se renderizarán los componentes anidados */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;