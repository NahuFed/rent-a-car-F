import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { URI_UPDATE_USER } from '../../../constants/endpoints-API';
import { User } from '../../../types/user/userType';
import Swal from 'sweetalert2';
import './my-profile.css';

const MyProfile: React.FC = () => {
    const { userId } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Estados para el formulario
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    // Se asume que el endpoint URI_UPDATE_USER acepta GET para obtener los datos del usuario
                    const response = await axios.get(URI_UPDATE_USER(Number(userId)));
                    const fetchedUser: User = response.data;
                    setUser(fetchedUser);
                    setFirstName(fetchedUser.firstName);
                    setLastName(fetchedUser.lastName);
                    // Extrae solo la parte de la fecha (yyyy-MM-dd)
                    setDob(fetchedUser.dob.split('T')[0]);
                    setAddress(fetchedUser.address);
                    setCountry(fetchedUser.country);
                } catch (error) {
                    console.error('Error fetching user:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUser();
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && userId) {
            try {
                const updatedUser = {
                    ...user,
                    firstName,
                    lastName,
                    dob,                    
                    address,
                    country,
                };
                await axios.patch(URI_UPDATE_USER(Number(userId)), updatedUser);
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.error('Error updating profile:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update profile, please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="my-profile-container">
            <h1>My Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <button className='button-profile' type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default MyProfile;