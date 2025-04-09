import React, { useState } from 'react';
import { carService } from '../services/carService';
import { categoryService } from '../services/categoryService';

const AddCarForm = () => {
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        prix: '',
        description: '',
        categorie: null,
        imagePath: 'default-car.jpg'
    });
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryService.getAllCategories();
                setCategories(data);
                setError(null);
            } catch (err) {
                setError('Failed to load categories. Please try again later.');
                console.error('Error loading categories:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            setUploading(false);

            let imagePath = formData.imagePath;

            // Upload image if a file is selected
            if (selectedFile) {
                try {
                    setUploading(true);
                    console.log('Starting image upload...');
                    imagePath = await carService.uploadImage(selectedFile);
                    console.log('Image uploaded successfully:', imagePath);
                } catch (uploadError) {
                    console.error('Error uploading image:', uploadError);
                    setError('Failed to upload image. Please try again.');
                    return;
                } finally {
                    setUploading(false);
                }
            }

            // Prepare car data
            const carData = {
                ...formData,
                imagePath,
                prix: parseFloat(formData.prix)
            };

            console.log('Submitting car data:', carData);

            // Add car
            await carService.addCar(carData);
            
            // Reset form
            setFormData({
                marque: '',
                modele: '',
                prix: '',
                description: '',
                categorie: null,
                imagePath: 'default-car.jpg'
            });
            setSelectedFile(null);
            setPreviewUrl('');
            setSuccess(true);
            
            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error adding car:', error);
            setError('Failed to add car. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && categories.length === 0) {
        return <div>Loading categories...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="add-car-form">
        <h2>Ajouter une nouvelle voiture</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Voiture ajoutée avec succès !</div>}

        <div className="form-group">
            <label>Image :</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            {previewUrl && (
                <div className="image-preview">
                    <img src={previewUrl} alt="Aperçu" style={{ maxWidth: '200px' }} />
                </div>
            )}
        </div>

        <div className="form-group">
            <label>Marque :</label>
            <input
                type="text"
                value={formData.marque}
                onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                required
            />
        </div>

        <div className="form-group">
            <label>Modèle :</label>
            <input
                type="text"
                value={formData.modele}
                onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
                required
            />
        </div>

        <div className="form-group">
            <label>Prix :</label>
            <input
                type="number"
                value={formData.prix}
                onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                required
            />
        </div>

        <div className="form-group">
            <label>Description :</label>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
            />
        </div>

        <div className="form-group">
            <label>Catégorie :</label>
            <select
                value={formData.categorie?.id || ''}
                onChange={(e) => {
                    const selectedCategory = categories.find(cat => cat.id === parseInt(e.target.value));
                    setFormData({ ...formData, categorie: selectedCategory });
                }}
                required
                disabled={categories.length === 0}
            >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.nom}
                    </option>
                ))}
            </select>
            {categories.length === 0 && !error && (
                <p className="info-message">Aucune catégorie disponible</p>
            )}
        </div>

        <button 
            type="submit" 
            disabled={loading || uploading || categories.length === 0}
        >
            {loading ? 'Chargement...' : uploading ? 'Téléchargement de l\'image...' : 'Ajouter la voiture'}
        </button>
    </form>
    );
};

export default AddCarForm; 