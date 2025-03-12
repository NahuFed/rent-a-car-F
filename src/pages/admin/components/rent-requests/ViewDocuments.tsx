import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { DocumentType } from '../../../../types/document/documentType';
import { URI_DOCUMENTS, URI_USERS } from '../../../../constants/endpoints-API';
import { User } from '../../../../types/user/userType';

const ViewDocuments: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchDocuments();
        fetchUser();
    }, [id]);
    const fetchDocuments = async () => {
        console.log(id)
        try {
            const response = await axios.get(`${URI_DOCUMENTS}/user/${id}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setDocuments(response.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${URI_USERS}/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleViewImage = (url: string) => {
        Swal.fire({
            imageUrl: url,
            imageAlt: 'Document Image',
            showCloseButton: true,
            width: '80%',
            padding: '3em',
            background: '#fff',
            confirmButtonText: 'Close'
        });
    };

    if (loading) {
        return <p>Loading documents...</p>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{user?.firstName} {user?.lastName}</h1>
            <ul className="mb-4">
                <li><strong>Email:</strong> {user?.email}</li>                
                <li><strong>Address:</strong> {user?.address}</li>                
                <li><strong>Country:</strong> {user?.country}</li>
                <li><strong>Date of Birth:</strong> {user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''}</li>
                
            </ul>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 border-r">ID</th>
                        <th className="py-2 border-r">Title</th>
                        <th className="py-2 border-r">Description</th>
                        <th className="py-2 border-r">Created At</th>
                        <th className="py-2 border-r">Updated At</th>
                        <th className="py-2 border-r">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.id} className="border-b">
                            <td className="py-2 border-r">{doc.id}</td>
                            <td className="py-2 border-r">{doc.title}</td>
                            <td className="py-2 border-r">{doc.description}</td>
                            <td className="py-2 border-r">{new Date(doc.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">{new Date(doc.updatedAt).toLocaleDateString()}</td>
                            <td className="py-2 border-r">
                                <button
                                    onClick={() => handleViewImage(doc.url)}
                                    className="text-blue-500  my-documents-button"
                                >
                                    View Image
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewDocuments;