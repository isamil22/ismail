package com.examspring.catavoiturebackend.repositories;

import com.examspring.catavoiturebackend.entities.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    List<Voiture> findByCategorieId(Long categorieId);
} 