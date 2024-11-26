package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
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

import java.util.Map;
import java.util.Optional;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserServiceImpl userService;

    /**
     * Registers a new student.
     * 
     * @param newStudent the StudentDTO object containing student details.
     * @return a ResponseEntity containing the saved student details or an error status.
     */
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

    /**
     * Registers a new professor.
     * 
     * @param newProfessor the ProfessorDTO object containing professor details.
     * @return a ResponseEntity containing the saved professor details or an error status.
     */
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

    /**
     * Logs in a student.
     * 
     * @param username the student's username.
     * @param password the student's password.
     * @return a ResponseEntity containing the logged-in user details or an error status.
     * @throws UserNotFoundException if the user is not found.
     */
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

    /**
     * Logs in a professor.
     * 
     * @param username the professor's username.
     * @param password the professor's password.
     * @return a ResponseEntity containing the logged-in user details or an error status.
     */
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

    /**
     * Checks if the user with the given ID has been updated.
     * 
     * @param id the user ID.
     * @return a ResponseEntity with an HTTP status indicating the result.
     */
    @GetMapping("/check/updated/{id}")
    public ResponseEntity<?> isUserUpdated(@PathVariable long id){
        if (userService.isStudentUpdated(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * Resets a user's password.
     * 
     * @param requestBody a map containing the username and new password.
     * @return a ResponseEntity indicating the result of the operation.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, Object> requestBody) {
        String username = requestBody.get("username").toString();
        String newPassword = requestBody.get("newPassword").toString();
    
        try {
            userService.resetPassword(username, newPassword);
            return ResponseEntity.ok("Password reset successfully.");
        } 
        
        catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Error: " + ex.getMessage());
        } 
        
        catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error: An unexpected error occurred.");
        }
    }
}
