import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white py-4 shadow">
            <div className="container flex justify-between items-center px-4">
                <div className="text-2xl font-bold">
                    RentACar
                </div>
                <nav className="ml-auto">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-gray-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:text-gray-300">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-gray-300">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-gray-300">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-gray-300">
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;