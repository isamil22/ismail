package com.examspring.catavoiturebackend.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService() {
        // Use the configured upload directory from application.properties
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
            System.out.println("Upload directory initialized at: " + this.fileStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    public String storeFile(MultipartFile file) {
        try {
            String originalName = StringUtils.cleanPath(file.getOriginalFilename());
            String ext = originalName.substring(originalName.lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;
            Path targetPath = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File stored at: " + targetPath);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

   public Resource loadFile(String filename) {
    try {
        Path file = Paths.get("").toAbsolutePath().resolve("uploads").resolve(filename).normalize();
        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("File not found or not readable");
        }
    } catch (MalformedURLException e) {
        throw new RuntimeException("Invalid file path", e);
    }
}

}
