import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import {URI_ACCEPTED_RENTS} from '../../../../constants/endpoints-API';
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
        try {
            const response = await axios.get(URI_ACCEPTED_RENTS);
            setRents(response.data);
        } catch (error) {
            console.error('Error fetching rejected rents:', error);
        }
    };

    return (
        <div className="container mx-auto ">
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