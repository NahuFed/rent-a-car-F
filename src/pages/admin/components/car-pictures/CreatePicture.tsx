import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URI_PICTURES, URI_S3_UPLOAD_CAR } from '../../../../constants/endpoints-API';
import { CreatePictureDto } from '../../../../types/car-pictures/createPictureDto';
import { CarPictureType } from '../../../../types/car-pictures/carPictureType';
import { useParams } from 'react-router-dom';

interface CreatePictureProps {
    onClose: () => void;
    onPictureCreated: () => Promise<void>;
}

const CreatePicture: React.FC<CreatePictureProps> = ({ onClose, onPictureCreated }) => {
    const { id } = useParams<{ id: string }>();
    const [picture, setPicture] = useState<CreatePictureDto>({
        car: Number(id),
        src: '',
        description: '',
        title: '',
        type: { name: CarPictureType.OTHER },
        date: new Date(),
    });
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setPicture({
                ...picture,
                [name]: checked,
            });
        } else {
            setPicture({
                ...picture,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!file) {
                Swal.fire("Error", "Please select a file", "error");
                return;
            }
            
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire("Error", "No token found", "error");
                return;
            }
            
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await axios.post(URI_S3_UPLOAD_CAR, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (uploadResponse.status === 201) {
                const fileUrl = uploadResponse.data.url;
                
                const payload = {
                    ...picture,
                    src: fileUrl,
                    car: {id: picture.car}
                };

                const response = await axios.post(`${URI_PICTURES}`, payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 201) {
                    Swal.fire("Success", "Picture created successfully", "success");
                    await onPictureCreated();
                }
            }
        } catch (error) {
            console.error('Error creating picture:', error);
            Swal.fire("Error", "Error creating picture", "error");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '50vw' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Image:</label>
                    <input type="file" name="file" onChange={handleFileChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Description:</label>
                    <input type="text" name="description" value={picture.description} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Title:</label>
                    <input type="text" name="title" value={picture.title} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Type:</label>
                    <select name="type" value={picture.type.name} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }}>
                        <option value={CarPictureType.BACK}>Back</option>
                        <option value={CarPictureType.FRONT}>Front</option>
                        <option value={CarPictureType.SIDE}>Side</option>
                        <option value={CarPictureType.OTHER}>Other</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Date:</label>
                    <input type="date" name="date" value={picture.date.toISOString().split('T')[0]} onChange={handleChange} required style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} />
                </div>
                <button type="submit" className='btn-admin' style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Create Picture
                </button>
                <button type="button" className='btn-admin' onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Close
                </button>
            </form>
        </div>
    );
};

export default CreatePicture;