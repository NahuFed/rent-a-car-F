import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URI_PICTURES } from '../../../../constants/endpoints-API';
import { UpdatePictureDto } from '../../../../types/car-pictures/updatePictureDto';
import { CarPictureType } from '../../../../types/car-pictures/carPictureType';
import { useParams } from 'react-router-dom';

interface UpdatePicturesProps {
    picture?: UpdatePictureDto | null;
    onClose: () => void;
    onPictureUpdated: () => Promise<void>;
}

const UpdatePictures: React.FC<UpdatePicturesProps> = ({ picture, onClose, onPictureUpdated }) => {
    const { id } = useParams<{ id: string }>()
    const [pictureData, setPictureData] = useState<UpdatePictureDto>({
        car: Number(id) || 0,
        src: '',
        description: '',
        title: '',
        type: { name: CarPictureType.OTHER },
        date: new Date(),
    });

    useEffect(() => {
        if (picture) {
            setPictureData({
                ...picture,
                date: picture.date ? new Date(picture.date) : new Date()
            });
        }
        console.log(picture);
    }, [picture]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setPictureData(prevPicture => ({
                ...prevPicture,
                [name]: checked,
            }));
        } else if (name === 'date') {
            setPictureData(prevPicture => ({
                ...prevPicture,
                [name]: new Date(value),
            }));
        } else {
            setPictureData(prevPicture => ({
                ...prevPicture,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!picture || !picture.id) {
            Swal.fire("Error", "No picture selected for update", "error");
            return;
        }
        try {
            const payload = {
                ...pictureData,
                car:pictureData.car
            };
            const response = await axios.patch(`${URI_PICTURES}/${picture.id}`, payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            if (response.status === 200 || response.status === 204) {
                Swal.fire("Success", "Picture updated successfully", "success");
                await onPictureUpdated();
            }
        } catch (error) {
            console.error('Error updating picture:', error);
            Swal.fire("Error", "There was an error updating the picture", "error");
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
                    <label>Src:</label>
                    <input 
                        type="text" 
                        name="src" 
                        value={pictureData.src || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Description:</label>
                    <input 
                        type="text" 
                        name="description" 
                        value={pictureData.description || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={pictureData.title || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Type:</label>
                    <select 
                        name="typeName" 
                        value={pictureData.type?.name || ''} 
                        onChange={handleChange} 
                        required 
                        style={{ border: '1px solid #ccc', padding: '5px', width: '100%' }}
                    >
                        <option value={CarPictureType.BACK}>Back</option>
                        <option value={CarPictureType.FRONT}>Front</option>
                        <option value={CarPictureType.SIDE}>Side</option>
                        <option value={CarPictureType.OTHER}>Other</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Date:</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={pictureData.date?.toISOString().split('T')[0] || ''} 
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
                    Update Picture
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

export default UpdatePictures;