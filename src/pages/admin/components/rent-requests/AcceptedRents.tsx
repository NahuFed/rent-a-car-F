import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { URI_ACCEPTED_RENTS, URI_CANCEL_RENT, URI_FINISH_RENT } from '../../../../constants/endpoints-API';
import { RentType } from '../../../../types/rent/rentType';

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

const AcceptedRents: React.FC = () => {
    const [rents, setRents] = useState<RentType[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchRents();
    }, []);

    const fetchRents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(URI_ACCEPTED_RENTS, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRents(response.data);
        } catch (error) {
            console.error('Error fetching accepted rents:', error);
        }
    };

    const handleCancelRent = async (rentId: number) => {
        const token = localStorage.getItem('token');
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this rent?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No'
        });
        if (result.isConfirmed) {
            try {
                await axios.patch(URI_CANCEL_RENT(rentId), {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Cancelled!', 'The rent has been cancelled.', 'success');
                fetchRents();
            } catch (error) {
                console.error('Error cancelling rent:', error);
                Swal.fire('Error', 'Unable to cancel rent', 'error');
            }
        }
    };

    const handleFinishRent = async (rentId: number) => {
        const token = localStorage.getItem('token');
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to finish this rent?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, finish it!',
            cancelButtonText: 'No'
        });
        if (result.isConfirmed) {
            try {
                await axios.patch(URI_FINISH_RENT(rentId), {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Finished!', 'The rent has been finished.', 'success');
                fetchRents();
            } catch (error) {
                console.error('Error finishing rent:', error);
                Swal.fire('Error', 'Unable to finish rent', 'error');
            }
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Accepted Rents</h1>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 border-r">ID</th>
                        <th className="py-2 border-r">Car</th>
                        <th className="py-2 border-r">User</th>
                        <th className="py-2 border-r">Admin</th>
                        <th className="py-2 border-r">Price Per Day</th>
                        <th className="py-2 border-r">Starting Date</th>
                        <th className="py-2 border-r">Due Date</th>
                        <th className="py-2 border-r">Accepted Date</th>
                        <th className="py-2 border-r">Rejected</th>
                        <th className="py-2 border-r">End Date</th>
                        <th className="py-2 border-r">Created At</th>
                        <th className="py-2 border-r">Updated At</th>
                        <th className="py-2 border-r">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rents.map((rent) => (
                        <tr key={rent.id} className="border-b">
                            <td className="py-2 border-r">{rent.id}</td>
                            <td className="py-2 border-r">{rent.car.id}</td>
                            <td className="py-2 border-r">{`${rent.user.firstName} ${rent.user.lastName}`}</td>
                            <td className="py-2 border-r">{rent.admin ? `${rent.admin.firstName} ${rent.admin.lastName}` : 'N/A'}</td>
                            <td className="py-2 border-r">{rent.pricePerDay}</td>
                            <td className="py-2 border-r">{new Date(rent.startingDate).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(rent.dueDate).toLocaleDateString()}</td>
                            <td className="py-2 border-r">
                                {rent.acceptedDated ? new Date(rent.acceptedDated).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-2 border-r">{rent.rejected ? 'Yes' : 'No'}</td>
                            <td className="py-2 border-r">
                                {rent.endDate ? new Date(rent.endDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-2 border-r">{new Date(rent.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(rent.updatedAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r flex flex-col gap-1">
                                <button
                                    onClick={() => handleCancelRent(rent.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors"
                                >
                                    Cancel Rent
                                </button>
                                <button
                                    onClick={() => handleFinishRent(rent.id)}
                                    className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition-colors"
                                >
                                    Finish Rent
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={() => setIsCreateModalOpen(false)}
                contentLabel="Create Rent Modal"
                style={customStyles}
            >
                {/* Aquí podrías incluir un formulario de creación si es necesario */}
            </Modal>
        </div>
    );
};

export default AcceptedRents;