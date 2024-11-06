package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AuthControllerTests {
    @Mock
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterStudent_Success() throws DuplicateUserException{
        StudentDTO newStudent = new StudentDTO();
        StudentDTO savedStudent = new StudentDTO();

        when(userService.registerStudent(newStudent)).thenReturn(savedStudent);

        ResponseEntity<StudentDTO> response = authController.registerStudent(newStudent);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedStudent, response.getBody());
    }

    @Test
    void testRegisterStudent_DuplicateUser() throws DuplicateUserException{
        StudentDTO newStudent = new StudentDTO();

        when(userService.registerStudent(newStudent)).thenThrow(new DuplicateUserException("Duplicate Student"));

        ResponseEntity<StudentDTO> response = authController.registerStudent(newStudent);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(newStudent, response.getBody());
    }

    @Test
    void testRegisterProfessor_Success() throws DuplicateUserException{
        ProfessorDTO newProfessor = new ProfessorDTO();
        ProfessorDTO savedProfessor = new ProfessorDTO();

        when(userService.registerProfessor(newProfessor)).thenReturn(savedProfessor);

        ResponseEntity<ProfessorDTO> response = authController.registerProfessor(newProfessor);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedProfessor, response.getBody());
    }

    @Test
    void testRegisterProfessor_DuplicateUser() throws DuplicateUserException{
        ProfessorDTO newProfessor = new ProfessorDTO();

        when(userService.registerProfessor(newProfessor)).thenThrow(new DuplicateUserException("Duplicate Professor"));

        ResponseEntity<ProfessorDTO> response = authController.registerProfessor(newProfessor);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(newProfessor, response.getBody());
    }

    @Test
    void testLoginStudent_Success() throws UserNotFoundException {
        String username = "studentUser";
        String password = "password";
        Optional<User> loggedStudent = Optional.of(new User());

        when(userService.login(username, password)).thenReturn(loggedStudent);

        ResponseEntity<Optional<User>> response = authController.loginStudent(username, password);

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals(loggedStudent, response.getBody());
    }

    @Test
    void testLoginStudent_NotFound() throws UserNotFoundException {
        String username = "studentUser";
        String password = "password";
        
        when(userService.login(username, password)).thenReturn(Optional.empty());

        ResponseEntity<Optional<User>> response = authController.loginStudent(username, password);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void testLoginProfessor_Success() {
        String username = "profUser";
        String password = "password";
        Optional<User> loggedProf = Optional.of(new User());

        when(userService.login(username, password)).thenReturn(loggedProf);

        ResponseEntity<Optional<User>> response = authController.loginProfessor(username, password);

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals(loggedProf, response.getBody());
    }

    @Test
    void testLoginProfessor_NotFound() {
        String username = "profUser";
        String password = "password";

        when(userService.login(username, password)).thenReturn(Optional.empty());

        ResponseEntity<Optional<User>> response = authController.loginProfessor(username, password);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}