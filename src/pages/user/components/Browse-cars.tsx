import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { carType } from '../../../types/car/carType';
import './browse-car.css';
import { URI_CARS, URI_GET_PICTURES_BY_CAR_AND_TYPE } from '../../../constants/endpoints-API';
import { CarPictureType } from '../../../types/car-pictures/carPictureType';
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';

interface CarPictures {
    front: string[];
    back: string[];
    side: string[];
    other: string[];
}

const BrowseCars: React.FC = () => {
    const [cars, setCars] = useState<carType[]>([]);
    const [pictures, setPictures] = useState<{ [key: number]: CarPictures }>({});

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(URI_CARS);
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };
        fetchCars();
    }, []);

    useEffect(() => {
        const fetchPictures = async (carId: number, type: CarPictureType) => {
            try {
                const response = await axios.get(URI_GET_PICTURES_BY_CAR_AND_TYPE(carId, type));
                return response.data.map((picture: { src: string }) => picture.src);
            } catch (error) {
                console.error(`Error fetching ${type} picture:`, error);
                return [];
            }
        };

        const fetchAllPictures = async () => {
            const picturesData: { [key: number]: CarPictures } = {};
            for (const car of cars) {
                const front = await fetchPictures(car.id, CarPictureType.FRONT);
                const back = await fetchPictures(car.id, CarPictureType.BACK);
                const side = await fetchPictures(car.id, CarPictureType.SIDE);
                const other = await fetchPictures(car.id, CarPictureType.OTHER);
                picturesData[car.id] = { front, back, side, other };
            }
            setPictures(picturesData);
        };

        if (cars.length > 0) {
            fetchAllPictures();
        }
    }, [cars]);

    return (
        <div className="browse-cars-container">
            {cars.map((car, index) => {
                const carPictures = pictures[car.id] || { front: [], back: [], side: [], other: [] };

                return (
                    <div key={index} className="car-card">
                        <div className="car-images">
                            <ImageCarousel images={carPictures.front} />
                            <div className="small-images">
                                <ImageCarousel 
                                    images={carPictures.back} 
                                    containerClassName="carousel-container-small"
                                    imageClassName="carousel-image-small"
                                />
                                <ImageCarousel 
                                    images={carPictures.side} 
                                    containerClassName="carousel-container-small"
                                    imageClassName="carousel-image-small"
                                />
                                <ImageCarousel 
                                    images={carPictures.other} 
                                    containerClassName="carousel-container-small"
                                    imageClassName="carousel-image-small"
                                />
                            </div>
                        </div>
                        <div className="car-details">
                            <h2>{car.brand} {car.model}</h2>
                            <p>Color: {car.color}</p>
                            <p>Passengers: {car.passengers}</p>
                            <p>Air conditioning: {car.ac ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="car-footer">
                            <p className="price">{car.pricePerDay} per day</p>
                            <Link to={`/rent-form/${car.id}`} className="rent-button">Rent</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BrowseCars;
