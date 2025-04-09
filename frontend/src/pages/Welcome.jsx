import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1>Bienvenue au Catalogue de Voitures</h1>
                <p>Découvrez votre voiture de rêve aujourd'hui</p>
                <Link to="/catalog" className="catalog-button">Explorer les Voitures</Link>
            </div>
        </div>
    );
};

export default Welcome; 