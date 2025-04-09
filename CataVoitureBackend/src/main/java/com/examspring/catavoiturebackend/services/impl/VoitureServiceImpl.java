package com.examspring.catavoiturebackend.services.impl;

import com.examspring.catavoiturebackend.entities.Voiture;
import com.examspring.catavoiturebackend.repositories.VoitureRepository;
import com.examspring.catavoiturebackend.services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoitureServiceImpl implements VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    @Override
    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    @Override
    public List<Voiture> getVoituresByCategorieId(Long categorieId) {
        return voitureRepository.findByCategorieId(categorieId);
    }

    @Override
    public Voiture getVoitureById(Long id) {
        return voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture not found with id: " + id));
    }

    @Override
    public Voiture createVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    @Override
    public Voiture updateVoiture(Long id, Voiture voiture) {
        Voiture existingVoiture = getVoitureById(id);
        existingVoiture.setMarque(voiture.getMarque());
        existingVoiture.setModele(voiture.getModele());
        existingVoiture.setPrix(voiture.getPrix());
        existingVoiture.setImagePath(voiture.getImagePath());
        existingVoiture.setCategorie(voiture.getCategorie());
        return voitureRepository.save(existingVoiture);
    }

    @Override
    public void deleteVoiture(Long id) {
        voitureRepository.deleteById(id);
    }
} 