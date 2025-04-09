import React, { useState, useEffect } from 'react';
import { carService } from '../services/carService';
import { categoryService } from '../services/categoryService';
import CarGrid from '../components/CarGrid';
import CategoryList from '../components/CategoryList';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching data...');
                
                // Always fetch categories
                const categoriesData = await categoryService.getAllCategories();
                setCategories(categoriesData);
                
                // Fetch cars based on selected category
                let carsData;
                if (selectedCategory) {
                    console.log('Fetching cars for category:', selectedCategory);
                    carsData = await carService.getCarsByCategory(selectedCategory.id);
                } else {
                    console.log('Fetching all cars');
                    carsData = await carService.getAllCars();
                }
                
                console.log('Cars data:', carsData);
                setCars(carsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Échec du chargement des données. Veuillez réessayer.');
                // Retry after 2 seconds if retry count is less than 3
                if (retryCount < 3) {
                    setTimeout(() => {
                        setRetryCount(prev => prev + 1);
                    }, 2000);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory, retryCount]);

    if (loading && !error) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="home-page">
            <header>
                <h1>Catalogue de Voitures</h1>
            </header>
            {error && (
                <div className="error-message">
                    {error}
                    {retryCount < 3 && <p>Nouvelle tentative dans 2 secondes...</p>}
                </div>
            )}
            <div className="content">
                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
                <main>
                    {cars.length > 0 ? (
                        <CarGrid cars={cars} />
                    ) : !error && (
                        <p className="info-message">Aucune voiture disponible</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home; 