import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { URI_CARS } from '../../../../constants/endpoints-API';
import { UpdateCarDto } from '../../../../types/car/updateCarDto';


interface UpdateCarProps {
    car?: UpdateCarDto | null; 
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
        if (car) {
            setCarData(car);
        } else if (id) {
      
            axios
                .get(`${URI_CARS}/${id}`)
                .then(response => {
                    setCarData(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the car data!', error);
                });
        }
    }, [car, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCarData(prevCar => ({
            ...prevCar,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${URI_CARS}/${id}`, carData);
            if (response.status === 200 || response.status === 204) {
                Swal.fire("Success", "Car updated successfully", "success");
                await onCarUpdated();
            }
        } catch (error) {
            console.error('Error updating car:', error);
            Swal.fire("Error", "There was an error updating the car", "error");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form 
                onSubmit={handleSubmit} 
                style={{ 
                    border: '1px solid #ccc', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    backgroundColor: '#fff', 
                    width: '50vw' 
                }}
            >
                <div style={{ marginBottom: '10px' }}>
                    <label>Brand:</label>
                    <input 
                        type="text" 
                        name="brand" 
                        value={carData.brand || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Model:</label>
                    <input 
                        type="text" 
                        name="model" 
                        value={carData.model || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Color:</label>
                    <input 
                        type="text" 
                        name="color" 
                        value={carData.color || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Passengers:</label>
                    <input 
                        type="number" 
                        name="passengers" 
                        value={carData.passengers !== undefined ? carData.passengers : 0} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>AC:</label>
                    <input 
                        type="checkbox" 
                        name="ac" 
                        checked={!!carData.ac} 
                        onChange={handleChange} 
                        style={{ border: '1px solid #ccc', padding: '5px' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Price Per Day:</label>
                    <input 
                        type="number" 
                        name="pricePerDay" 
                        value={carData.pricePerDay !== undefined ? carData.pricePerDay : 0} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ 
                        marginRight: '10px', 
                        padding: '10px 20px', 
                        backgroundColor: '#4CAF50', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                    }}
                    className="btn"
                >
                    Update Car
                </button>
                <button 
                    type="button" 
                    onClick={onClose} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#f44336', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                    }}
                    className="btn"
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default UpdateCar;