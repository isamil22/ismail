import React from 'react';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="category-list">
            <h2>Catégories</h2>
            <ul>
                <li
                    className={!selectedCategory ? 'active' : ''}
                    onClick={() => onSelectCategory(null)}
                >
                    Toutes les Voitures
                </li>
                {categories.map(category => (
                    <li
                        key={category.id}
                        className={selectedCategory?.id === category.id ? 'active' : ''}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category.nom}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList; 