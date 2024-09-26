package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.service.UserService;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserService userService;



    @PostMapping("/register/student")
    public ResponseEntity<StudentDTO> registerStudent(@RequestBody StudentDTO newStudent) {

        StudentDTO savedStudent = null;

        try {
            savedStudent = userService.registerStudent(newStudent);
        } catch (DuplicateUserException duplicateUserException) {
            logger.info("Duplicate Student");
        }

        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @PostMapping("/register/professor")
    public ResponseEntity<ProfessorDTO> registerProfessor(@RequestBody ProfessorDTO newProfessor) {
        ProfessorDTO savedProfessor = null;

        try {
            savedProfessor = userService.registerProfessor(newProfessor);
        } catch (DuplicateUserException duplicateUserException) {
            logger.info("Duplicate Professor");
        }

        return new ResponseEntity<>(savedProfessor, HttpStatus.CREATED);
    }



}
