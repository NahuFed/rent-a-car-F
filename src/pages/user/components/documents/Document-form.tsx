import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './documents.css';

const Documents: React.FC = () => {
  const { userId } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'User not authenticated',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!file) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a file',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }


    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'No token found',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);

      const response = await axios.post('http://localhost:3000/s3/upload/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: 'Success',
        text: 'Document uploaded successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });


      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
      Swal.fire({
        title: 'Error',
        text: 'Could not upload document, please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="documents-container">
      <div className="button-container">
        <Link to="/my-documents" className="my-documents-button">
          My Documents
        </Link>
      </div>
      <h1>Upload Document</h1>
      <form onSubmit={handleSubmit} className="document-upload-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Select Document:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="application/pdf, image/*"
            required
          />
        </div>
        <button type="submit">Upload Document</button>
      </form>
    </div>
  );
};

export default Documents;