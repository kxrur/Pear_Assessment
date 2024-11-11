package com.monaco.peer_assessment_backend.service;


import com.monaco.peer_assessment_backend.exception.StorageException;
import com.monaco.peer_assessment_backend.exception.StorageFileNotFoundException;
import com.monaco.peer_assessment_backend.service.StorageService;
import com.monaco.peer_assessment_backend.service.impl.FileSystemStorageService;
import com.monaco.peer_assessment_backend.service.impl.StorageProperties;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.FileSystemUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.stream.Stream;

import static com.monaco.peer_assessment_backend.service.impl.StorageProperties.getResourcePath;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class StorageServiceTests {

   // private final Path rootLocation = getResourcePath("studentFiles");;

    @Mock
    private StorageProperties storageProperties;

    private final Path testStorageLocation = Paths.get("src/test/resources/studentFiles");
    private FileSystemStorageService storageService;

    @BeforeEach
    public void setUp() {
        // Initialize mocks first
        MockitoAnnotations.openMocks(this);

        // Mock the getLocation method to return a valid path
        when(storageProperties.getLocation()).thenReturn(testStorageLocation.toString());

        // Initialize FileSystemStorageService with mocked StorageProperties
        storageService = new FileSystemStorageService(storageProperties);

        // Ensure the storage location is created for testing
        storageService.init();
    }
    @AfterEach
    public void tearDown() {
        // Clean up test files after each test
        FileSystemUtils.deleteRecursively(testStorageLocation.toFile());
    }
    @Test
    void testStoreFileSuccessfully() throws IOException {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Sample content".getBytes());

        storageService.store(file);

        Path storedFile = testStorageLocation.resolve("test.txt");
        assertTrue(Files.exists(storedFile));

        // Clean up after test
        Files.deleteIfExists(storedFile);
    }

    @Test
    void testStoreEmptyFile() {
        MockMultipartFile emptyFile = new MockMultipartFile("file", "empty.txt", "text/plain", new byte[0]);

        assertThrows(StorageException.class, () -> storageService.store(emptyFile));
    }

    @Test
    void testStoreFileOutsideRoot() {
        MockMultipartFile file = new MockMultipartFile("file", "../outside.txt", "text/plain", "Content".getBytes());

        assertThrows(StorageException.class, () -> storageService.store(file));
    }

    @Test
    void testLoadAllFiles() throws IOException {
        Files.createFile(testStorageLocation.resolve("file3.txt"));
        Files.createFile(testStorageLocation.resolve("file4.txt"));

        Stream<Path> fileStream = storageService.loadAll();
        assertEquals(2, fileStream.count());

        // Clean up after test
        Files.deleteIfExists(testStorageLocation.resolve("file1.txt"));
        Files.deleteIfExists(testStorageLocation.resolve("file2.txt"));
    }

    @Test
    void testLoadFile() {
        Path path = storageService.load("test.txt");
        assertEquals(testStorageLocation.resolve("test.txt"), path);
    }

    @Test
    void testLoadAsResourceSuccess() throws IOException {
        Path testFile = testStorageLocation.resolve("test.txt");
        Files.createFile(testFile);

        Resource resource = storageService.loadAsResource("test.txt");
        assertTrue(resource.exists());

        // Clean up after test
        Files.deleteIfExists(testFile);
    }

    @Test
    void testLoadAsResourceFileNotFound() {
        assertThrows(StorageFileNotFoundException.class, () -> storageService.loadAsResource("nonexistent.txt"));
    }

    @Test
    void testDeleteAllFiles() throws IOException {
        Files.createFile(testStorageLocation.resolve("file1.txt"));
        Files.createFile(testStorageLocation.resolve("file2.txt"));

        storageService.deleteAll();

        assertFalse(Files.exists(testStorageLocation.resolve("file1.txt")));
        assertFalse(Files.exists(testStorageLocation.resolve("file2.txt")));
    }

    @Test
    void testInit() throws IOException {
        Path testDir = Paths.get("new-test-storage");
        when(storageProperties.getLocation()).thenReturn(testDir.toString());
        FileSystemStorageService newStorageService = new FileSystemStorageService(storageProperties);

        newStorageService.init();
        assertTrue(Files.exists(testDir));

        // Clean up after test
        FileSystemUtils.deleteRecursively(testDir);
    }


}
