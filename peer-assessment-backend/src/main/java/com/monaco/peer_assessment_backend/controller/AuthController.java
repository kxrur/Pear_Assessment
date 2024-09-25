package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.Service.UserService;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signIn/")
public class AuthController {
    UserService userS = new UserService();
    @PostMapping("/student-signUp")
    public ResponseEntity<?> registerStudent(@RequestBody StudentDTO newStudent) {
        userS.signup(newStudent);
        return ResponseEntity.ok("Student registered successfully!");
    }

}
