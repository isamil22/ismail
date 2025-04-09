import React, { useState, useEffect } from 'react';
import { carService } from '../services/carService';
import { categoryService } from '../services/categoryService';
import AddCarForm from '../components/AddCarForm';

const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await categoryService.getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCar = async (carData) => {
        try {
            await carService.addCar(carData);
            alert('Car added successfully!');
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Error adding car. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-page">
            <header>
                <h1>Admin Panel</h1>
            </header>
            <main>
                <AddCarForm
                    categories={categories}
                    onSubmit={handleAddCar}
                />
            </main>
        </div>
    );
};

export default Admin; 