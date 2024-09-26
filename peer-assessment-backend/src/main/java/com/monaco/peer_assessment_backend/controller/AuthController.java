package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.Service.UserService;
import com.monaco.peer_assessment_backend.Service.impl.UserServiceImpl;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {

    private UserService userService;

    @PostMapping("/register/student")
    public ResponseEntity<StudentDTO> registerStudent(@RequestBody StudentDTO newStudent) {
        StudentDTO savedStudent = userService.registerStudent(newStudent);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

}
