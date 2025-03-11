import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../../context/AuthContext';
import { carType } from '../../../types/car/carType';
import { URI_CARS, URI_RENTS, URI_UNAVAILABLE_DATES, URI_GET_PICTURES_BY_CAR } from '../../../constants/endpoints-API';
import Swal from 'sweetalert2';

interface DateRange {
    start: string;
    end: string;
}

const RentForm: React.FC = () => {
    const { carId } = useParams<{ carId: string }>();
    const [car, setCar] = useState<carType | null>(null);
    const [startingDate, setStartingDate] = useState<Date | null>(null);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const { isAuthenticated, userId } = useAuth();
    const [unavailableDates, setUnavailableDates] = useState<DateRange[]>([]);
    const [pictures, setPictures] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`${URI_CARS}/${carId}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car:', error);
            }
        };

        const fetchUnavailableDates = async () => {
            try {
                const response = await axios.get(URI_UNAVAILABLE_DATES(Number(carId)));
                setUnavailableDates(response.data.unavailableDates);
            } catch (error) {
                console.error('Error fetching unavailable dates:', error);
            }
        };

        const fetchPictures = async () => {
            try {
                const response = await axios.get(URI_GET_PICTURES_BY_CAR(Number(carId)));
           
                setPictures(response.data.map((p: { src: string }) => p.src));
            } catch (error) {
                console.error('Error fetching car pictures:', error);
            }
        };

        fetchCar();
        fetchUnavailableDates();
        fetchPictures();
    }, [carId]);

    const filterUnavailable = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date <= today) return false;

        const formattedDate = date.toISOString().split('T')[0];
        for (const range of unavailableDates) {
            if (formattedDate >= range.start && formattedDate <= range.end) {
                return false;
            }
        }
        return true;
    };

    const filterDueDate = (date: Date) => {
        if (!startingDate) return filterUnavailable(date);
        if (date <= startingDate) return false;
        return filterUnavailable(date);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            console.error('User not authenticated');
            return;
        }
        if (!userId) {
            console.error('User ID not found');
            return;
        }
        if (!startingDate || !dueDate) {
            console.error('Incomplete dates');
            return;
        }

        const rentData = {
            carId: Number(carId),
            pricePerDay: car?.pricePerDay,
            userId: userId,
            adminId: null,
            startingDate: startingDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            acceptedDated: null,
            rejected: false,
            endDate: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            await axios.post(URI_RENTS, rentData);
            Swal.fire({
                title: 'Success!',
                text: 'Rent created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/');
        } catch (error) {
            console.log(rentData);
            console.error('Error creating rent:', error);
            Swal.fire({
                title: 'Error',
                text: 'Could not create rent, please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        
        <div className="rent-form-container">
            <h2>Rent Form</h2>
            {car && (
                <div className="car-info">
                    <h3>{car.brand} {car.model}</h3>
                    <p>Color: {car.color}</p>
                    <p>Passengers: {car.passengers}</p>
                    <p>Air Conditioning: {car.ac ? 'Yes' : 'No'}</p>
                    <p>Price per day: ${car.pricePerDay}</p>
                </div>
            )}
           
           
                <div className="form-container" style={{ flex: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="startingDate">Start Date:</label>
                            <DatePicker
                                selected={startingDate}
                                onChange={(date: Date | null) => setStartingDate(date)}
                                filterDate={filterUnavailable}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select start date"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">End Date:</label>
                            <DatePicker
                                selected={dueDate}
                                onChange={(date: Date | null) => setDueDate(date)}
                                filterDate={filterDueDate}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select end date"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    <Link to="/browse-cars" className="back-button">See other cars/options</Link>
                </div>
            </div>
        
    );
};

export default RentForm;
