import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { URI_PENDING_RENTS, URI_ADMIT_RENT, URI_REJECT_RENT } from '../../../../constants/endpoints-API';
import Swal from 'sweetalert2';
import { RentType } from '../../../../types/rent/rentType';
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

const PendingRents: React.FC = () => {
    const [rents, setRents] = useState<RentType[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchRents();
    }, []);

    const fetchRents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(URI_PENDING_RENTS, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRents(response.data);
        } catch (error) {
            console.error('Error fetching rents:', error);
        }
    };

    const handleAdmit = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to accept this rent?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, accept it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(URI_ADMIT_RENT(id), {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  });
                Swal.fire("Accepted!", "Rent accepted successfully", "success");
                fetchRents();
            } catch (error: any) {    
                console.error("Error rejecting rent:", error);
                const errorMsg = error.response?.data?.message || "There was a problem rejecting the rent";
                Swal.fire("Error", errorMsg, "error");
            }
        }
    };

    const handleReject = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to reject this rent?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(URI_REJECT_RENT(id),{},{
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                Swal.fire("Rejected!", "Rent rejected successfully", "success");
                fetchRents();
            } catch (error) {
                console.error("Error rejecting rent:", error);
                Swal.fire("Error", "There was a problem rejecting the rent", "error");
            }
        }
    };

    return (
        <div className="container mx-auto ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Pending Rents</h1>
                <button
                    className="btn-admin bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <FaPlus className="mr-2" /> Create Rent
                </button>
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
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rents.map((rent) => (
                        <tr key={rent.id} className="border-b">
                            <td className="py-2 border-r">{rent.id}</td>
                            <td className="py-2 border-r">{rent.car.id}</td>
                            <td className="py-2 border-r">{rent.user.firstName + ' ' + rent.user.lastName}</td>
                            <td className="py-2 border-r">{rent.admin?.firstName + ' ' + rent.admin?.lastName}</td>
                            <td className="py-2 border-r">{rent.pricePerDay}</td>
                            <td className="py-2 border-r">{new Date(rent.startingDate).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(rent.dueDate).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{rent.acceptedDated ? new Date(rent.acceptedDated).toLocaleDateString() : 'N/A'}</td>
                            <td className="py-2 border-r">{rent.rejected ? 'Yes' : 'No'}</td>
                            <td className="py-2 border-r">{rent.endDate ? new Date(rent.endDate).toLocaleDateString() : 'N/A'}</td>
                            <td className="py-2 border-r">{new Date(rent.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(rent.updatedAt).toLocaleDateString()}</td>
                            <td className="py-2 flex space-x-2">
                                <button
                                    className="btn-admin bg-green-500 text-white px-2 py-1 rounded flex items-center"
                                    onClick={() => handleAdmit(rent.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn-admin bg-red-500 text-white px-2 py-1 rounded flex items-center"
                                    onClick={() => handleReject(rent.id)}
                                >
                                    Reject
                                </button>
                                <Link to={`/admin/documents/${rent.user.id}`}
                                    className="btn-admin bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
                                    
                                >
                                    Documents
                                </Link>
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
                {/* <CreateRent onClose={() => setIsCreateModalOpen(false)} onRentCreated={fetchRents} /> */}
            </Modal>
        </div>
    );
};

export default PendingRents;