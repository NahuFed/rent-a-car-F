import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../../../context/AuthContext';
import { DocumentType } from '../../../../types/document/documentType';
import './documents.css';

const MyDocuments: React.FC = () => {
  const { userId } = useAuth();
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDocuments = async () => {
    if (!userId) return;
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
    }
    try {
        const response = await axios.get(`http://localhost:3000/document/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setDocuments(response.data);
    } catch (error) {
        console.error("Error fetching documents:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [userId]);

  const handleDelete = async (docId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This document will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/document/${docId}`);
          Swal.fire("Deleted!", "Your document has been deleted.", "success");
          fetchDocuments();
        } catch (error) {
          console.error("Error deleting document:", error);
          Swal.fire("Error", "Could not delete document.", "error");
        }
      }
    });
  };

  const handleEdit = async (doc: DocumentType) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Document",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Title" value="${doc.title}">` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="Description">${doc.description}</textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById("swal-input1") as HTMLInputElement)?.value;
        const description = (document.getElementById("swal-input2") as HTMLTextAreaElement)?.value;
        if (!title || !description) {
          Swal.showValidationMessage("Both fields are required");
        }
        return { title, description };
      }
    });

    if (formValues) {
      try {
        await axios.patch(`http://localhost:3000/document/${doc.id}`, formValues);
        Swal.fire("Updated!", "Your document has been updated.", "success");
        fetchDocuments();
      } catch (error) {
        console.error("Error updating document:", error);
        Swal.fire("Error", "Could not update document.", "error");
      }
    }
  };

  const handleView = (doc: DocumentType) => {
    Swal.fire({
      title: doc.title,
      imageUrl: doc.url,
      imageAlt: doc.title,
      confirmButtonText: "Close"
    });
  };

  if (loading) return <p>Loading documents...</p>;

  return (
    <div className="my-documents-container">
      <h1>My Documents</h1>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table className="documents-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.title}</td>
                <td>{doc.description}</td>
                <td>{new Date(doc.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleView(doc)}>View</button>
                  <button onClick={() => handleEdit(doc)}>Edit</button>
                  <button onClick={() => handleDelete(doc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyDocuments;