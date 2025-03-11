import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import CreateCar from './CreateCar';
import UpdateCar from './UpdateCar';
import Modal from 'react-modal';
import { URI_CARS } from '../../../../constants/endpoints-API';
import Swal from 'sweetalert2';
import { UpdateCarDto } from '../../../../types/car/updateCarDto';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0)', 
        border: 'none',
        borderRadius: '10px',
        padding: '20px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
};

const ManageCars: React.FC = () => {
    const [cars, setCars] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<UpdateCarDto | null>(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get(URI_CARS);
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this car?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${URI_CARS}/${id}`);
                Swal.fire("Deleted!", "Car deleted successfully", "success");
                
                fetchCars();
            } catch (error) {
                console.error("Error deleting car:", error);
                Swal.fire("Error", "There was a problem deleting the car", "error");
            }
        }
    };

    return (


        <div className="container mx-auto ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Cars</h1>
                <button
                    className="btn-admin bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <FaPlus className="mr-2" /> Create Car
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 border-r">ID</th>
                        <th className="py-2 border-r">Brand</th>
                        <th className="py-2 border-r">Model</th>
                        <th className="py-2 border-r">Color</th>
                        <th className="py-2 border-r">Passengers</th>
                        <th className="py-2 border-r">AC</th>
                        <th className="py-2 border-r">Price Per Day</th>
                        <th className="py-2 border-r">Created At</th>
                        <th className="py-2 border-r">Updated At</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car: any) => (
                        <tr key={car.id} className="border-b">
                            <td className="py-2 border-r">{car.id}</td>
                            <td className="py-2 border-r">{car.brand}</td>
                            <td className="py-2 border-r">{car.model}</td>
                            <td className="py-2 border-r">{car.color}</td>
                            <td className="py-2 border-r">{car.passengers}</td>
                            <td className="py-2 border-r">{car.ac ? 'Yes' : 'No'}</td>
                            <td className="py-2 border-r">{car.pricePerDay}</td>
                            <td className="py-2 border-r">{new Date(car.craetedAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(car.updatedAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">
                <Link 
                    to={`/admin/cars/${car.id}/pictures/`}
                    className="btn-admin bg-blue-500 text-white px-2 py-1 rounded flex items-center"
                >
                    Gallery
                </Link>
            </td>
                            <td className="py-2 flex space-x-2">
                                <button
                                    className="btn-admin bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
                                    onClick={() => {
                                        setSelectedCar(car);
                                        setIsUpdateModalOpen(true);
                                    }}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn-admin bg-red-500 text-white px-2 py-1 rounded flex items-center"
                                    onClick={() => handleDelete(car.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={() => setIsCreateModalOpen(false)}
                contentLabel="Create Car Modal"
                style={customStyles}
            >
                <CreateCar onClose={() => setIsCreateModalOpen(false)} onCarCreated={fetchCars} />
            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setIsUpdateModalOpen(false)}
                contentLabel="Update Car Modal"
                style={customStyles}
            >
                <UpdateCar car={selectedCar} onClose={() => setIsUpdateModalOpen(false)} onCarUpdated={fetchCars} />
            </Modal>
        </div>
    );
};

export default ManageCars;