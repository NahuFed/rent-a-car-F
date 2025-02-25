import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URI_CARS } from '../../../../constants/endpoints-API';

interface CreateCarProps {
    onClose: () => void;
    onCarCreated: () => Promise<void>;
}

const CreateCar: React.FC<CreateCarProps> = ({ onClose, onCarCreated }) => {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        passengers: 0,
        ac: false,
        pricePerDay: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCar({
            ...car,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI_CARS, car);           
            if (response.status === 201) {
                Swal.fire("Success", "Car created successfully", "success");
                await onCarCreated();
            }
        } catch (error) { 
            console.error('Error creating car:', error);
            Swal.fire("Error", "Error creating car", "error");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '50vw' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Brand:</label>
                    <input type="text" name="brand" value={car.brand} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Model:</label>
                    <input type="text" name="model" value={car.model} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Color:</label>
                    <input type="text" name="color" value={car.color} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Passengers:</label>
                    <input type="number" name="passengers" value={car.passengers} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>AC:</label>
                    <input type="checkbox" name="ac" checked={car.ac} onChange={handleChange} style={{ border: '1px solid #ccc', padding: '5px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Price Per Day:</label>
                    <input type="number" name="pricePerDay" value={car.pricePerDay} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <button type="submit" style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Create Car
                </button>
                <button type="button" onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Close
                </button>
            </form>
        </div>
    );
};

export default CreateCar;