const API_URL = 'http://localhost:8080/api'; // Use the Docker service name


export const carService = {
    getAllCars: async () => {
        const response = await fetch(`${API_URL}/voitures`);
        return response.json();
    },

    getCarsByCategory: async (categoryId) => {
        const response = await fetch(`${API_URL}/voitures/categorie/${categoryId}`);
        return response.json();
    },

    getCarById: async (id) => {
        const response = await fetch(`${API_URL}/voitures/${id}`);
        return response.json();
    },

    addCar: async (car) => {
        const response = await fetch(`${API_URL}/voitures`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        return response.json();
    },

    updateCar: async (id, car) => {
        const response = await fetch(`${API_URL}/voitures/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        return response.json();
    },

    deleteCar: async (id) => {
        await fetch(`${API_URL}/voitures/${id}`, {
            method: 'DELETE',
        });
    },

    uploadImage: async (file) => {
        try {
            console.log('Uploading file:', file.name);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/images/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'text/plain'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Upload failed:', errorText);
                throw new Error(errorText || 'Failed to upload image');
            }

            const fileName = await response.text();
            console.log('Upload successful:', fileName);
            return fileName;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
}; 