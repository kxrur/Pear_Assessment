package com.monaco.peer_assessment_backend.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import com.monaco.peer_assessment_backend.exception.StorageException;
import com.monaco.peer_assessment_backend.exception.StorageFileNotFoundException;
import com.monaco.peer_assessment_backend.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileSystemStorageService implements StorageService {

    private final Path rootLocation;

    /**
     * Constructor to initialize the `FileSystemStorageService` with a provided location.
     * It validates the file storage location provided in `StorageProperties` and sets the root directory.
     * 
     * @param properties The storage properties that include the location for file storage.
     */
    @Autowired
    public FileSystemStorageService(StorageProperties properties) {

        if (properties.getLocation().trim().isEmpty()) {
            throw new StorageException("File upload location can not be Empty.");
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    /**
     * Stores the given file to the specified location. It checks for an empty file and ensures 
     * that the file is not stored outside the defined directory to prevent security vulnerabilities.
     * 
     * @param file The file to be stored.
     * @throws StorageException if the file is empty or an error occurs while storing the file.
     */
    @Override
    public void store(MultipartFile file) {
        System.out.println("In store");
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(file.getOriginalFilename()))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    /**
     * Loads all the files stored in the storage location.
     * 
     * @return A stream of Path objects representing all files in the storage location.
     * @throws StorageException if an error occurs while reading the files.
     */
    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    /**
     * Loads a specific file by its name.
     * 
     * @param filename The name of the file to be loaded.
     * @return The Path to the requested file.
     */
    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    /**
     * Loads a file as a resource. This can be used for streaming the file contents to the client.
     * 
     * @param filename The name of the file to be loaded as a resource.
     * @return The Resource representing the requested file.
     * @throws StorageFileNotFoundException if the file is not found or cannot be read.
     */
    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    /**
     * Deletes all files in the storage location.
     * 
     * This method will recursively delete all files and directories within the root storage location.
     */
    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    /**
     * Initializes the storage by creating the necessary directories for file storage.
     * 
     * @throws StorageException if an error occurs while creating the storage directories.
     */
    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}