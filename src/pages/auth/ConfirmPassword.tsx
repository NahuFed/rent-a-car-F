import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { URI_CONFIRM_PASSWORD } from '../../constants/endpoints-API';
import { useNavigate } from 'react-router-dom';

const ConfirmPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPasswordSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(URI_CONFIRM_PASSWORD, {
                email,
                confirmationCode,
                newPassword
            });
            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password reset successfully. You will be redirected to the login page.',
                    icon: 'success',
                    timer: 5000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            }
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-3/5 border p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Confirm Password</h2>
                <form onSubmit={handleResetPasswordSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-2 block w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700">Confirmation Code:</label>
                        <input
                            type="text"
                            id="confirmationCode"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            required
                            className="mt-1 p-2 block w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 p-2 block w-full border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <p className="text-sm text-gray-600 mt-2">
                            Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character.
                        </p>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Reset Password</button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default ConfirmPassword;