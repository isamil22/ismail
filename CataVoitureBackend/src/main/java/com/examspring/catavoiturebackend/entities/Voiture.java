package com.examspring.catavoiturebackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String modele;
    private double prix;
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @JsonBackReference
    private Categorie categorie;
} 