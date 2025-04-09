package com.examspring.catavoiturebackend.services;

import com.examspring.catavoiturebackend.entities.Voiture;
import java.util.List;

public interface VoitureService {
    List<Voiture> getAllVoitures();
    List<Voiture> getVoituresByCategorieId(Long categorieId);
    Voiture getVoitureById(Long id);
    Voiture createVoiture(Voiture voiture);
    Voiture updateVoiture(Long id, Voiture voiture);
    void deleteVoiture(Long id);
} 