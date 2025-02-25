import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URI_CARS } from '../../../../constants/endpoints-API';

interface UpdateCarDto {
    brand?: string;
    model?: string;
    color?: string;
    passengers?: number;
    ac?: boolean;
    pricePerDay?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UpdateCarProps {
    car: any;
    onClose: () => void;
    onCarUpdated: () => Promise<void>;
}

const UpdateCar: React.FC<UpdateCarProps> = ({ car, onClose, onCarUpdated }) => {
    const { id } = useParams<{ id: string }>();
    const [carData, setCarData] = useState<UpdateCarDto>({
        brand: '',
        model: '',
        color: '',
        passengers: 0,
        ac: false,
        pricePerDay: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    useEffect(() => {
        axios.get(`${URI_CARS}/${id}`)
            .then(response => {
                setCarData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the car data!', error);
            });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCarData(prevCar => ({
            ...prevCar,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.put(`${URI_CARS}/${id}`, carData)
            .then(response => {
                alert('Car updated successfully!');
                onCarUpdated();
            })
            .catch(error => {
                console.error('There was an error updating the car!', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Brand:</label>
                    <input type="text" name="brand" value={carData.brand} onChange={handleChange} />
                </div>
                <div>
                    <label>Model:</label>
                    <input type="text" name="model" value={carData.model} onChange={handleChange} />
                </div>
                <div>
                    <label>Color:</label>
                    <input type="text" name="color" value={carData.color} onChange={handleChange} />
                </div>
                <div>
                    <label>Passengers:</label>
                    <input type="number" name="passengers" value={carData.passengers} onChange={handleChange} />
                </div>
                <div>
                    <label>AC:</label>
                    <input type="checkbox" name="ac" checked={carData.ac} onChange={handleChange} />
                </div>
                <div>
                    <label>Price Per Day:</label>
                    <input type="number" name="pricePerDay" value={carData.pricePerDay} onChange={handleChange} />
                </div>
                <button type="submit">Update Car</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default UpdateCar;