package com.examspring.catavoiturebackend.config;

import com.examspring.catavoiturebackend.entities.Categorie;
import com.examspring.catavoiturebackend.entities.Voiture;
import com.examspring.catavoiturebackend.repositories.CategorieRepository;
import com.examspring.catavoiturebackend.repositories.VoitureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(CategorieRepository categorieRepository, VoitureRepository voitureRepository) {
        return args -> {
            // Create categories
            Categorie suv = Categorie.builder()
                    .nom("SUV")
                    .build();

            Categorie sedan = Categorie.builder()
                    .nom("Sedan")
                    .build();

            Categorie sport = Categorie.builder()
                    .nom("Sport")
                    .build();

            // Save categories
            suv = categorieRepository.save(suv);
            sedan = categorieRepository.save(sedan);
            sport = categorieRepository.save(sport);

            // Create cars
            Voiture rav4 = Voiture.builder()
                    .marque("Toyota")
                    .modele("RAV4")
                    .prix(25000)
                    .imagePath("placeholder.png")
                    .categorie(suv)
                    .build();

            Voiture camry = Voiture.builder()
                    .marque("Toyota")
                    .modele("Camry")
                    .prix(22000)
                    .imagePath("placeholder.png")
                    .categorie(sedan)
                    .build();

            Voiture supra = Voiture.builder()
                    .marque("Toyota")
                    .modele("Supra")
                    .prix(45000)
                    .imagePath("placeholder.png")
                    .categorie(sport)
                    .build();

            // Save cars
            voitureRepository.save(rav4);
            voitureRepository.save(camry);
            voitureRepository.save(supra);
        };
    }
} 