package com.examspring.catavoiturebackend.controllers;

import com.examspring.catavoiturebackend.entities.Categorie;
import com.examspring.catavoiturebackend.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categorieService.getCategoryById(id));
    }

    @PostMapping
    public ResponseEntity<Categorie> createCategory(@RequestBody Categorie category) {
        return ResponseEntity.ok(categorieService.createCategory(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategory(@PathVariable Long id, @RequestBody Categorie category) {
        return ResponseEntity.ok(categorieService.updateCategory(id, category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categorieService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
} 