package com.monaco.peer_assessment_backend.service.impl;


import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.RoleRepository;
import com.monaco.peer_assessment_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    // Injecting required repositories and dependencies for user operations
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    /**
     * Registers a new student, ensuring the username is unique and password is encrypted.
     *
     * @param studentDTO the student data transfer object containing student details
     * @return the saved student DTO
     * @throws DuplicateUserException if the username already exists in the system
     */
    @Override
    public StudentDTO registerStudent(StudentDTO studentDTO) throws DuplicateUserException {
        Student student = userMapper.mapToStudentEntity(studentDTO);

        if (studentRepository.existsByStudentID(studentDTO.getStudentId())) {
            Optional<Student> optionalStudent = studentRepository.findByStudentID(studentDTO.getStudentId());
            if (optionalStudent.isPresent()) {
                if (optionalStudent.get().isTemp())
                   student = updateStudent(optionalStudent,studentDTO);
            }else {
                throw new DuplicateUserException("Student ID already in use");
            }
        }

        if (userRepository.existsByUsername(studentDTO.getUsername()) && studentDTO.getUsername() != null) {
            throw new DuplicateUserException("Username already exists");
        }
        // Encrypt the password before saving the user
        student.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
        // Save the student in the database
        Student savedStudent = studentRepository.save(student);

        return userMapper.mapToStudentDTO(savedStudent);
    }

    public Student updateStudent(Optional<Student> optionalStudent, StudentDTO studentDTO) {

        Student studentToChange = optionalStudent.get();
        studentToChange.setTemp(false);
        studentToChange.setPassword(studentDTO.getPassword());
        studentToChange.setUsername(studentDTO.getUsername());
        // Make sure this is updated
        return studentToChange;
    }


    /**
     * Registers a new professor, ensuring the username is unique and password is encrypted.
     *
     * @param professorDTO the professor data transfer object containing professor details
     * @return the saved professor DTO
     * @throws DuplicateUserException if the username already exists in the system
     */
    @Override
    public ProfessorDTO registerProfessor(ProfessorDTO professorDTO) throws DuplicateUserException {
        Professor professor = userMapper.mapToProfessorEntity(professorDTO);

        professor.setPassword(passwordEncoder.encode(professorDTO.getPassword()));

        if (userRepository.existsByUsername(professorDTO.getUsername())) {
            throw new DuplicateUserException("Username already exists");
        }

        // Save the professor in the database
        Professor savedProfessor = userRepository.save(professor);

        return userMapper.mapToProfessorDTO(savedProfessor);
    }

    /**
     * Handles the login process by checking both the username or student ID.
     * It verifies if the provided password matches the stored one.
     *
     * @param usernameOrStudentId the username or student ID
     * @param password            the raw password entered by the user
     * @return an optional user if the login is successful, empty otherwise
     */

    public Optional<User> login(String usernameOrStudentId, String password) {
        boolean isTemp = false;
        // User is verified through their username
        Optional<User> userOptional = userRepository.findByUsername(usernameOrStudentId);

        // If not found by username, search by student ID
        if (!userOptional.isPresent()) {
            try {
                long studentId = Long.parseLong(usernameOrStudentId);
                Optional<Student> studentOptional = studentRepository.findByStudentID(studentId);
                if (studentOptional.isPresent())
                    isTemp = studentOptional.get().isTemp();
                userOptional = studentOptional.map(Student.class::cast);
            } catch (NumberFormatException e) {
                // If input is not a valid number, ignore the exception
            }
        }

        // Return the user if user exists and password matches
        if (userOptional.isPresent() && !isTemp) {
            User user = userOptional.get();
            // Check if the password matches
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }

        // Return empty if login fails
        return Optional.empty();
    }

    /**
     * Retrieves a user by their unique ID.
     *
     * @return an optional user if found, empty otherwise
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Fetches all users from the database.
     *
     * @return a list of all users
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Deletes a user by their unique ID.
     *
     * @param id the user ID to be deleted
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
