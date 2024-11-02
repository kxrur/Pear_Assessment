package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class to manage interactions with Users
 */
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);


    @Autowired
    private final UserService userService;

    @GetMapping("/users/students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(userService.getAllStudents());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable long userId) {
        UserDTO savedUser = null;
        try {
            savedUser = userService.getUserById(userId);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (UserNotFoundException e) {
            logger.info("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            logger.info("Unexpected error");
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

}
