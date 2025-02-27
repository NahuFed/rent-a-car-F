import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import CreatePicture from './CreatePicture';
import UpdatePicture from './UpdatePictures';
import Modal from 'react-modal';
import { URI_PICTURES } from '../../../../constants/endpoints-API';
import Swal from 'sweetalert2';
import { UpdatePictureDto } from '../../../../types/car-pictures/updatePictureDto';
import { useParams } from 'react-router-dom';
import { URI_GET_PICTURES_BY_CAR } from '../../../../constants/endpoints-API';
import { URI_CARS } from '../../../../constants/endpoints-API';

Modal.setAppElement('#root'); // Asegúrate de que el elemento raíz de tu aplicación esté configurado correctamente



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0)', // Fondo blanco con transparencia
        border: 'none',
        borderRadius: '10px',
        padding: '20px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con transparencia
    },
};

const ManagePictures: React.FC = () => {
    
    const { id } = useParams<{ id: string }>();
    const [carDetails, setCarDetails] = useState<any>({});
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`${URI_CARS}/${id}`);
                setCarDetails(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        if (id) {
            fetchCarDetails();
        }
    }, [id]);
    const [pictures, setPictures] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<UpdatePictureDto | null>(null);

    useEffect(() => {
        fetchPictures();
    }, [id]);

    const fetchPictures = async () => {
        try {
            const response = await axios.get(URI_GET_PICTURES_BY_CAR(Number(id)));
            setPictures(response.data);
        } catch (error) {
            console.error('Error fetching pictures:', error);
        }
    };

    const handleDelete = async (pictureId: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this picture?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${URI_PICTURES}/${pictureId}`);
                Swal.fire("Deleted!", "Picture deleted successfully", "success");
                fetchPictures();
            } catch (error) {
                console.error("Error deleting picture:", error);
                Swal.fire("Error", "There was a problem deleting the picture", "error");
            }
        }
    };

    return (
        <div className="container mx-auto ">

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Car Details</h2>
                <p><strong>ID:</strong> {carDetails.id}</p>
                <p><strong>Brand:</strong> {carDetails.brand}</p>
                <p><strong>Model:</strong> {carDetails.model}</p>
                
            </div>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Pictures</h1>
                <button
                    className="btn-admin bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <FaPlus className="mr-2" /> Add Picture
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 border-r">ID</th>
                        <th className="py-2 border-r">Src</th>
                        <th className="py-2 border-r">Description</th>
                        <th className="py-2 border-r">Title</th>
                        <th className="py-2 border-r">Type</th>
                        <th className="py-2 border-r">Date</th>
                        <th className="py-2 border-r">Created At</th>
                        <th className="py-2 border-r">Updated At</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pictures.map((picture: any) => (
                        <tr key={picture.id} className="border-b">
                            <td className="py-2 border-r">{picture.id}</td>
                            <td className="py-2 border-r">
                                <img src={picture.src} alt={picture.title} className="w-20 h-20 object-cover" />
                            </td>
                            <td className="py-2 border-r">{picture.description}</td>
                            <td className="py-2 border-r">{picture.title}</td>
                            <td className="py-2 border-r">{picture.type.name}</td>
                            <td className="py-2 border-r">{new Date(picture.date).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(picture.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(picture.updatedAt).toLocaleDateString()}</td>
                            <td className="py-2 flex space-x-2">
                                <button
                                    className="btn-admin bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
                                    onClick={() => {
                                        setSelectedPicture(picture);
                                        setIsUpdateModalOpen(true);
                                    }}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn-admin bg-red-500 text-white px-2 py-1 rounded flex items-center"
                                    onClick={() => handleDelete(picture.id)}
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
                contentLabel="Create Picture Modal"
                style={customStyles}
            >
                <CreatePicture onClose={() => setIsCreateModalOpen(false)} onPictureCreated={fetchPictures} />
            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setIsUpdateModalOpen(false)}
                contentLabel="Update Picture Modal"
                style={customStyles}
            >
                <UpdatePicture picture={selectedPicture} onClose={() => setIsUpdateModalOpen(false)} onPictureUpdated={fetchPictures} />
            </Modal>
        </div>
    );
};

export default ManagePictures;