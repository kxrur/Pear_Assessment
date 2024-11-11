package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.exception.StorageFileNotFoundException;
import com.monaco.peer_assessment_backend.service.StorageService;
import com.monaco.peer_assessment_backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class FileControllerTests {
    @Mock
    private StorageService storageService;

    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private FileController fileController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testServeFile() {
        String filename = "test.txt";
        Resource resource = mock(Resource.class);
        when(storageService.loadAsResource(filename)).thenReturn(resource);

        ResponseEntity<Resource> response = fileController.serveFile(filename);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(resource, response.getBody());
    }

    @Test
    void testServeFile_NotFound() {
        String filename = "nonexistent.txt";
        when(storageService.loadAsResource(filename)).thenReturn(null);

        ResponseEntity<Resource> response = fileController.serveFile(filename);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testHandleStorageFileNotFound() {
        ResponseEntity<?> response = fileController.handleStorageFileNotFound(new StorageFileNotFoundException("File not found"));
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testParseStudents_AllValid() throws IOException, URISyntaxException {
        String fileName = "students.csv";
        Path fileToCheck = Paths.get(getClass().getResource("/students.csv").toURI());
        //Path mockPath = Path.of(fileName);
        when(storageService.load(fileName)).thenReturn(fileToCheck);

        // Here, assume userService.registerStudent returns a valid StudentDTO
        StudentDTO mockStudent = new StudentDTO(1L, "John", "Doe", Collections.singleton("STUDENT"), true, 123);
        try {
            when(userService.registerStudent(any(StudentDTO.class))).thenReturn(mockStudent);
        }catch(DuplicateUserException e){
            System.out.println("test parseStudents_AllValid did not pass");
        }
        // Call the parseStudents method
        validStudentsEntity result = fileController.parseStudents(fileName);

        assertEquals(1, result.getAddedStudents().size());
        assertEquals(1, result.getAnswer());
    }


}
