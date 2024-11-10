package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.GambleDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.exception.GradeNotFoundException;
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
import java.util.Map;

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

    @GetMapping("/user/gamble/{teamId}/{userId}")
    public ResponseEntity<GambleDTO> studentGamble(@PathVariable long teamId, @PathVariable long userId) {
        GambleDTO savedGamble = null;
        try {
            savedGamble = userService.gambleGrade(userId, teamId);
        } catch (GradeNotFoundException e){
            logger.error("Student has no grade");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        catch (Exception e) {
            logger.error("Error while gambling");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return new ResponseEntity<>(savedGamble, HttpStatus.CREATED);

    }

    @PostMapping("/user/gamble/approve")
    public ResponseEntity<String> approveOrDenyGamble(@RequestBody Map<String, Object> requestBody) {
        Long studentId = Long.valueOf(requestBody.get("studentId").toString());
        Long teamId = Long.valueOf(requestBody.get("teamId").toString());
        boolean approve = Boolean.parseBoolean(requestBody.get("approve").toString());
    
        try {
            // Call the service method to approve or deny the gamble
            String responseMessage = userService.approveOrDenyGamble(studentId, teamId, approve);
            
            // Return success response to the frontend
            return ResponseEntity.ok(responseMessage);
        } catch (GradeNotFoundException ex) {
            // Handle the case where the gamble or grade is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Error: " + ex.getMessage());
        } catch (Exception ex) {
            // Handle any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error: An unexpected error occurred.");
        }
    }
    

}
