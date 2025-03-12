import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaCar, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { URI_PENDING_RENTS } from '../../constants/endpoints-API';
import './admin.css';

const AdminDashboard: React.FC = () => {
  const [showRentRequests, setShowRentRequests] = useState(false);
  const [pendingCount, setPendingCount] = useState<number>(0);

  const toggleRentRequests = () => {
    setShowRentRequests((prev) => !prev);
  };

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get(URI_PENDING_RENTS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });        
        setPendingCount(response.data.length);
      } catch (error) {
        console.error('Error fetching pending rents count:', error);
      }
    };

    fetchPendingCount();
  }, []);

  return (
    <div className="flex min-h-screen border border-gray-300 shadow-lg">
      <aside className="w-64 bg-gray-800 text-white flex flex-col border-r border-gray-700 p-4">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-4">
            <li className="sidebar-item">
              <Link
                to="/admin/cars"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FaCar />
                <span>Manage Cars</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <div className="flex flex-col">
                <span
                  className="flex items-center space-x-2 hover:text-gray-300 cursor-pointer"
                  onClick={toggleRentRequests}
                >
                  <FaClipboardList />
                  <span>Manage Rental Requests</span>
                </span>
                <ul
                  className={`ml-6 mt-2 rent-requests-sublist ${
                    showRentRequests ? 'open' : ''
                  }`}
                >
                  <li className="relative">
                    <Link
                      to="/admin/rental-requests/pending"
                      className="hover:text-gray-300 block"
                    >
                      Pending
                      {pendingCount > 0 && (
                        <span className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          {pendingCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/rental-requests/rejected"
                      className="hover:text-gray-300 block"
                    >
                      Rejected
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/rental-requests/accepted"
                      className="hover:text-gray-300 block"
                    >
                      Accepted
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/rental-requests/finished"
                      className="hover:text-gray-300 block"
                    >
                      Finished
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;