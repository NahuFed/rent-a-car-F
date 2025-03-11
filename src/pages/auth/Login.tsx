import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { URI_LOGIN } from '../../constants/endpoints-API';
import { AuthContext } from '../../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI_LOGIN, {
                email: email,
                password: password
            });

            const { accessToken, role } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('role', role);
            login(role);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/forgot-password" className="text-red-500 hover:underline">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;