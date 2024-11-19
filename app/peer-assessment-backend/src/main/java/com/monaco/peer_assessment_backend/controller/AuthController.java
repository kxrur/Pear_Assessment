package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.service.UserService;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.service.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register/student")
    public ResponseEntity<StudentDTO> registerStudent(@RequestBody StudentDTO newStudent) {

        StudentDTO savedStudent = null;

        try {
            savedStudent = userService.registerStudent(newStudent);
        } catch (DuplicateUserException duplicateUserException) {
            logger.info("Duplicate Student");
            return new ResponseEntity<>(newStudent, HttpStatus.BAD_REQUEST);
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
            return new ResponseEntity<>(newProfessor, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(savedProfessor, HttpStatus.CREATED);
    }

    @PostMapping("/login/student")
    public ResponseEntity<Optional<User>> loginStudent(@RequestParam String username, @RequestParam String password) throws UserNotFoundException {
        Optional<User> loggedStudent = userService.login(username,password);
        if (loggedStudent.isEmpty()) {
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(loggedStudent, HttpStatus.ACCEPTED);
        }
    }
    @PostMapping("/login/professor")
    public ResponseEntity<Optional<User>> loginProfessor(@RequestParam String username, @RequestParam String password) {
        Optional<User> loggedProf =  userService.login(username,password);
        if (loggedProf.isEmpty()) {
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(loggedProf,HttpStatus.ACCEPTED);
        }
    }
    @GetMapping("/check/updated")
    public ResponseEntity<?> isUserUpdated(@RequestParam long id){
        if (userService.isStudentUpdated(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }



}
