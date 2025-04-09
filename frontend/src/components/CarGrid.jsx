import React from 'react';
import CarCard from './CarCard';
import './CarGrid.css';

const CarGrid = ({ cars }) => {
    return (
        <div className="car-grid">
            {cars.map(car => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarGrid; 