package com.examspring.catavoiturebackend.repositories;

import com.examspring.catavoiturebackend.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
} 