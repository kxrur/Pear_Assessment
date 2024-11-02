package com.monaco.peer_assessment_backend.service;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.Role;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
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
import java.util.HashSet;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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

    /**
     *  Any behaviour that needs to be done before the tests.
     *  Here I set up the objects that I defined earlier
     */
    @BeforeEach
    public void setup() {
        Role role = new Role(2, "STUDENT");
        Set<Role> roles = new HashSet<>();

        roles.add(role);
        student = new Student(1L, "Bob", "Ross", "bobross123",
                "password", roles, 1234567L, false);

        Set<String> rolesDTO = new HashSet<>();
        rolesDTO.add("STUDENT");
        studentDTO = new StudentDTO(1L, "Bob", "Ross",
                rolesDTO, false, 1234567L);

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
         * as @Mock. So any methods that are called by 'registerStudent()' must be manually defined
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
}

