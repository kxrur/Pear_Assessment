package Service;

import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.RoleRepository;
import com.monaco.peer_assessment_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public class UserService{
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

    public User signup(UserDTO userDTO) {
        // Encrypt the password before saving the user
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        
        // Map DTO to User entity and save
        User user = userMapper.mapToUserEntity(userDTO);
        return userRepository.save(user);
    }

    public Optional<User> login(String usernameOrStudentId, String password) {
        Optional<User> userOptional = userRepository.findByUsername(usernameOrStudentId);
        
        // If not found by username, search by student ID
        if (!userOptional.isPresent()) {
            try {
                long studentId = Long.parseLong(usernameOrStudentId);
                Optional<Student> studentOptional = studentRepository.findByStudentID(studentId);
                userOptional = studentOptional.map(Student.class::cast);
            } catch (NumberFormatException e) {
                // If input is not a valid number, ignore
            }
        }
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Check if the password matches
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        
        return Optional.empty(); // Return empty if login fails
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
