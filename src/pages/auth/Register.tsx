import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URI_REGISTER } from '../../constants/endpoints-API';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface CreateUserDto {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
  address: string;
  country: string;
  role: { name: string };
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/;

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUserDto>({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    address: '',
    country: '',
    role: { name: 'user' }
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {   
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'password') {
      if (!passwordRegex.test(value)) {
        setPasswordError('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

   
    if (formData.password !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      await axios.post(URI_REGISTER, formData);
      Swal.fire({
        title: 'Success',
        text: 'Registration complete!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        title: 'Error',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">
                {passwordError}
              </p>
            )}
          </div>
          
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;