package com.examspring.catavoiturebackend.services.impl;

import com.examspring.catavoiturebackend.entities.Categorie;
import com.examspring.catavoiturebackend.repositories.CategorieRepository;
import com.examspring.catavoiturebackend.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieServiceImpl implements CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    @Override
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @Override
    public Categorie getCategoryById(Long id) {
        return categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    @Override
    public Categorie createCategory(Categorie category) {
        return categorieRepository.save(category);
    }

    @Override
    public Categorie updateCategory(Long id, Categorie category) {
        Categorie existingCategory = getCategoryById(id);
        existingCategory.setNom(category.getNom());
        return categorieRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        categorieRepository.deleteById(id);
    }
} 