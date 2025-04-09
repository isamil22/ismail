import React from 'react';
import placeholder from '../uploads/placeholder.png';
const CarCard = ({ car }) => {
    const imageUrl = car.imagePath 
        ? `http://localhost:8080/api/images/${car.imagePath}`
        : 'http://localhost:8080/api/images/placeholder.png';

    return (
        <div className="car-card">
            <img src={placeholder} alt={``} />
            <div className="car-info">
                <h3>{car.marque} {car.modele}</h3>
                <p>Price: ${car.prix.toLocaleString()}</p>
                {car.categorie && <p>Category: {car.categorie.nom}</p>}
                {car.description && <p className="description">{car.description}</p>}
            </div>
        </div>
    );
};

export default CarCard; 