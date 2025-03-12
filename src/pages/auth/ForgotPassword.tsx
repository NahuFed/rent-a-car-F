import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URI_FORGOT_PASSWORD } from '../../constants/endpoints-API';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showConfirmationButton, setShowConfirmationButton] = useState(false);
    const navigate = useNavigate();

    const handleForgotPasswordSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(URI_FORGOT_PASSWORD, { email });
            if (response.status === 201) {
                setMessage('Check your email for the confirmation code.');
                setShowConfirmationButton(true);
            }
        } catch (error) {
            setMessage('Error sending password reset email. Please try again.');
        }
    };

    const handleConfirmationButtonClick = () => {
        navigate('/confirm-password');
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-3/5 border p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPasswordSubmit}>
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Send Reset Link</button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
                {showConfirmationButton && (
                    <button
                        onClick={handleConfirmationButtonClick}
                        className="w-full bg-green-500 text-white py-2 rounded-md mt-4"
                    >
                        I have the code
                    </button>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;