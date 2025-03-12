import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URI_GET_MY_HISTORY } from '../../../constants/endpoints-API';
import './rental-history.css';

interface RentalHistoryItem {
    id: number;
    startingDate: string;
    dueDate: string;
    pricePerDay: number;
    acceptedDated: string | null;
    rejected: boolean;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
    car: {
        id: number;
        brand: string;
        model: string;
        color: string;
        passengers: number;
        ac: boolean;
        pricePerDay: number;
        craetedAt: string;
        updatedAt: string;
    };
    
}

const RentalHistory: React.FC = () => {
    
    const [history, setHistory] = useState<RentalHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHistory = async () => {

                const token = localStorage.getItem('token');
            
                try {
                    const response = await axios.get(URI_GET_MY_HISTORY, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setHistory(response.data);
                } catch (error) {
                    console.error('Error fetching rental history:', error);
                } finally {
                    setLoading(false);
                }
         
        };

        fetchHistory();
    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Rental History</h1>
            {history.length > 0 ? (
                <table className='history-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Car</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Price per Day</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.car.brand} {item.car.model}</td>
                                <td>{item.startingDate}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.pricePerDay}</td>
                                <td>
                                    {item.rejected 
                                        ? 'Rejected' 
                                        : (item.acceptedDated ? 'Approved' : 'Pending')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No rental history found.</p>
            )}
        </div>
    );
};

export default RentalHistory;