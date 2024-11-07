package com.monaco.peer_assessment_backend.service;
import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Role;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    /**
     * First define all the objects that are used in the class you are defining tests for
     * @Mock means that we're not instantiating an object but a 'Mock' of the object.
     * You'll see later how we have to manually define any methods we want to use.
     */
    @Mock
    private UserRepository userRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserMapper userMapper;

    /**
     * For the class we want to test, use @InjectMocks, this will do the dependency
     * injection of all the 'Mock' classes that we just defined
     */
    @InjectMocks
    private UserServiceImpl userService;

    /**
     * These are real objects
     */
    private StudentDTO studentDTO;
    private Student student;
    private Professor professor;
    private ProfessorDTO professorDTO;
    private User user;

    /**
     *  Any behaviour that needs to be done before the tests.
     *  Here I set up the objects that I defined earlier
     */
    @BeforeEach
    public void setup() {
        Role studentRole = new Role(2, "STUDENT");
        Role professorRole = new Role(1, "PROFESSOR");
        Set<Role> studentRoles = new HashSet<>();
        Set<Role> professorRoles = new HashSet<>();

        professorRoles.add(professorRole);

        studentRoles.add(studentRole);
        student = new Student(1L, "Bob", "Ross", "bobross123",
                "password", studentRoles, 1234567L, false);

        Set<String> studentRolesDTO = new HashSet<>();
        studentRolesDTO.add("STUDENT");
        studentDTO = new StudentDTO(1L, "Bob", "Ross",
                studentRolesDTO, false, 1234567L);

        professor = new Professor(1L, "Rob", "Boss", "robboss123", "password",
                professorRoles);
        Set<String> professorRolesDTO = new HashSet<>();
        professorRolesDTO.add("PROFESSOR");
        
        professorDTO = new ProfessorDTO(1L, "robboss123", "Rob", "Boss", "ppassword",
                professorRolesDTO);

        user = new User();

        user.setUsername("user");
        user.setPassword("password");

    }

    /**
     * This is the first test, can name it with @DisplayName so that it shows up nicely when you run tests
     * @throws DuplicateUserException
     */
    @DisplayName("Testing Student Registration")
    @Test
    public void testStudentRegistration() throws DuplicateUserException {

        /**
         * This is where you have to manually define the behaviour of all the objects that were defined
         * as @Mock. So any methods that are called by 'registerStudent()' must be manually defined.
         * when(x behavior).thenReturn(what you want to return)
         */
        when(userMapper.mapToStudentEntity(studentDTO)).thenReturn(student);
        when(studentRepository.existsByStudentID(studentDTO.getStudentId())).thenReturn(false);
        when(userRepository.existsByUsername(studentDTO.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(studentDTO.getPassword())).thenReturn("encodedPassword");
        when(studentRepository.save(student)).thenReturn(student);
        when(userMapper.mapToStudentDTO(student)).thenReturn(studentDTO);

        /**
         * This is where the actual method we are trying to test is called (after we just defined the behaviours
         * of the methods that 'registerStudent()' calls)
         */
        StudentDTO result = userService.registerStudent(studentDTO);

        // Ensure that the result is not null
        assertNotNull(result);
        // Test that the Student we registered has one of the expected fields (could be any)
        assertEquals("Bob", result.getFirstName());
        // The 'verify' does a check to see if the 'save' was actually called.
        // Here we are making sure that the student was saved in the studentRepository
        verify(studentRepository).save(student);
    }

    @DisplayName("Testing Professor Registration")
    @Test
    public void testRegisterProfessor() throws DuplicateUserException {
        when(userMapper.mapToProfessorEntity(professorDTO)).thenReturn(professor);
        when(passwordEncoder.encode(professorDTO.getPassword())).thenReturn("encodedPassword");
        when(userRepository.existsByUsername(professorDTO.getUsername())).thenReturn(false);
        when(userRepository.save(professor)).thenReturn(professor);
        when(userMapper.mapToProfessorDTO(professor)).thenReturn(professorDTO);

        ProfessorDTO result = userService.registerProfessor(professorDTO);

        assertNotNull(result);
        assertEquals("robboss123", result.getUsername());
        verify(userRepository).save(professor);
    }

    @DisplayName("Testing Login by Username")
    @Test
    public void testLoginByUsername() {
        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "password")).thenReturn(true);

        Optional<User> result = userService.login("user", "password");

        assertTrue(result.isPresent());
        assertEquals("user", result.get().getUsername());
    }

    @DisplayName("Testing Get User by ID")
    @Test
    public void testGetUserById() throws UserNotFoundException {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userMapper.mapToUserDTO(user)).thenReturn(new UserDTO());

        UserDTO result = userService.getUserById(1L);

        assertNotNull(result);
        verify(userRepository).findById(1L);
    }

    @DisplayName("Testing Get All Students")
    @Test
    public void testGetAllStudents() {
        List<Student> students = new ArrayList<>();
        students.add(student);
        when(studentRepository.findAll()).thenReturn(students);
        when(userMapper.mapToStudentDTO(student)).thenReturn(studentDTO);

        List<StudentDTO> result = userService.getAllStudents();


        assertEquals(1, result.size());
        assertEquals("Bob", result.get(0).getFirstName()
        );
        verify(studentRepository).findAll();
    }

    @DisplayName("Testing Delete User")
    @Test
    public void testDeleteUser() {
        userService.deleteUser(1L);
        verify(userRepository).deleteById(1L);
    }

    @DisplayName("Testing Update Student")
    @Test
    public void testUpdateStudent() {
        // Arrange
        Student existingStudent = new Student();
        existingStudent.setTemp(true);
        existingStudent.setPassword("oldPassword");
        existingStudent.setUsername("oldUsername");

        Optional<Student> optionalStudent = Optional.of(existingStudent);

        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setPassword("newPassword");
        studentDTO.setUsername("newUsername");
        studentDTO.setTemp(false);

        Student updatedStudent = userService.updateStudent(optionalStudent, studentDTO);

        assertNotNull(updatedStudent);
        assertFalse(updatedStudent.isTemp());
        assertEquals("newPassword", updatedStudent.getPassword());
        assertEquals("newUsername", updatedStudent.getUsername());
    }

}

