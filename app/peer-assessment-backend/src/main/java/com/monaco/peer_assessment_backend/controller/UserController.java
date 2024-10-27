package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller class to manage interactions with Users
 */
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private final UserService userService;

    @GetMapping("/users/students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(userService.getAllStudents());
    }
}
