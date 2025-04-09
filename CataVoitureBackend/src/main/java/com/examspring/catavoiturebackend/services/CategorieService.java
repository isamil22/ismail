package com.examspring.catavoiturebackend.services;

import com.examspring.catavoiturebackend.entities.Categorie;
import java.util.List;

public interface CategorieService {
    List<Categorie> getAllCategories();
    Categorie getCategoryById(Long id);
    Categorie createCategory(Categorie category);
    Categorie updateCategory(Long id, Categorie category);
    void deleteCategory(Long id);
} 