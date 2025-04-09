const API_URL = 'http://localhost:8080/api'; // Updated URL for browser access

export const categoryService = {
    getAllCategories: async () => {
        const response = await fetch(`${API_URL}/categories`);
        return response.json();
    },

    addCategory: async (category) => {
        const response = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        return response.json();
    },

    updateCategory: async (id, category) => {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        return response.json();
    },

    deleteCategory: async (id) => {
        await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
        });
    }
}; 