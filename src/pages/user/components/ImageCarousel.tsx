import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './image-carousel.css';

interface ImageCarouselProps {
    images: string[];
    containerClassName?: string;
    imageClassName?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    containerClassName = 'carousel-container',
    imageClassName = 'carousel-image'
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleImageClick = (image: string) => {
        Swal.fire({
            imageUrl: image,
            imageAlt: 'Car Image',
            showCloseButton: true,
            width: '80%',
            padding: '3em',
            background: '#fff',
            confirmButtonText: 'Cerrar'
        });
    };

    return (
        <div className={containerClassName}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`carousel-${index}`}
                    className={`${imageClassName} ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleImageClick(image)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </div>
    );
};

export default ImageCarousel;