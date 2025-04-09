package com.examspring.catavoiturebackend.controllers;

import com.examspring.catavoiturebackend.entities.Voiture;
import com.examspring.catavoiturebackend.services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @GetMapping
    public List<Voiture> getAllVoitures() {
        return voitureService.getAllVoitures();
    }

    @GetMapping("/categorie/{categorieId}")
    public List<Voiture> getVoituresByCategorie(@PathVariable Long categorieId) {
        return voitureService.getVoituresByCategorieId(categorieId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable Long id) {
        return ResponseEntity.ok(voitureService.getVoitureById(id));
    }

    @PostMapping
    public ResponseEntity<Voiture> createVoiture(@RequestBody Voiture voiture) {
        return ResponseEntity.ok(voitureService.createVoiture(voiture));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        return ResponseEntity.ok(voitureService.updateVoiture(id, voiture));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable Long id) {
        voitureService.deleteVoiture(id);
        return ResponseEntity.ok().build();
    }
} 