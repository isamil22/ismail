package com.examspring.catavoiturebackend.controllers;

import java.nio.file.Files;
import java.nio.file.Path;

import com.examspring.catavoiturebackend.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/images")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("Received file upload request for file: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize() + " bytes");
            System.out.println("Content type: " + file.getContentType());
            
            if (file.isEmpty()) {
                System.out.println("Empty file received");
                return ResponseEntity.badRequest().body("Please select a file to upload");
            }
            
            if (file.getSize() > 5 * 1024 * 1024) { // 5MB limit
                return ResponseEntity.badRequest().body("File size exceeds 5MB limit");
            }
            
            String fileName = fileStorageService.storeFile(file);
            System.out.println("File uploaded successfully: " + fileName);
            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            System.err.println("Error uploading file: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Could not upload the file: " + e.getMessage());
        }
    }

    @GetMapping("/{filename:.+}")
public ResponseEntity<Resource> getImage(@PathVariable String filename) {
    try {
        Resource file = fileStorageService.loadFile(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .body(file);
    } catch (Exception e) {
        System.err.println("Error loading file: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.notFound().build();
    }
}

} 