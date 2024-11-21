package com.monaco.peer_assessment_backend.mapper;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Role;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Class with static methods that map user objects from DTO (Data Transfer Object) to entity for storage in MySQL database.
 * Available for each user type.
 */
@Component
public class UserMapper {

    private RoleRepository roleRepository;


    /**
     * Maps a userDTO to an entity
     * @param userDTO the user DTO
     * @return The corresponding entity
     */
    public User mapToUserEntity(UserDTO userDTO) {
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        // Convert role names (Strings) to Role entities
        Set<Role> roles = userDTO.getRoles().stream()
                .map(roleName -> roleRepository.findByName(roleName).orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
                .collect(Collectors.toSet());

        user.setRoles(roles);

        return user;
    }

    /**
     * Given an entity, return the corresponding UserDTO
     * @param user the entity we are mapping
     * @return the corresponding DTO
     */
    public UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());

        Set<String> roles = user.getRoles().stream()
                .map(Role::getName) // Assuming Role has a getName() method
                .collect(Collectors.toSet());

        userDTO.setRoles(roles);

        return userDTO;
    }

    /**
     * Maps a studentDTO to a student entity
     * @param studentDTO the student DTO
     * @return the corresponding student entity
     */
    public Student mapToStudentEntity(StudentDTO studentDTO) {
        Student student = new Student();
        User user = mapToUserEntity(studentDTO);
        student.setId(user.getId());
        student.setFirstName(user.getFirstName());
        student.setLastName(user.getLastName());
        student.setUsername(user.getUsername());
        student.setPassword(user.getPassword());
        student.setRoles(user.getRoles());
        student.setTemp(studentDTO.isTemp());
        student.setStudentID(studentDTO.getStudentId());

        return student;
    }

    public StudentDTO mapToStudentDTO(Student student) {
        StudentDTO studentDTO = new StudentDTO();

        studentDTO.setId(student.getId());
        studentDTO.setStudentId(student.getStudentID());
        studentDTO.setPassword(student.getPassword());
        studentDTO.setUsername(student.getUsername());
        studentDTO.setFirstName(student.getFirstName());
        studentDTO.setLastName(student.getLastName());
        Set<String> roles = student.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
        studentDTO.setRoles(roles);
        studentDTO.setTemp(student.isTemp());
        return studentDTO;
    }


    public ProfessorDTO mapToProfessorDTO(Professor professor) {
        ProfessorDTO professorDTO = new ProfessorDTO();

        // Set common fields from the Professor entity to ProfessorDTO
        professorDTO.setId(professor.getId());
        professorDTO.setPassword(professor.getPassword());
        professorDTO.setUsername(professor.getUsername());
        professorDTO.setFirstName(professor.getFirstName());
        professorDTO.setLastName(professor.getLastName());

        // Map roles from the Professor entity to a Set of Strings in ProfessorDTO
        Set<String> roles = professor.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        professorDTO.setRoles(roles);

        return professorDTO;
    }


    public Professor mapToProfessorEntity(ProfessorDTO professorDTO) {
        Professor professor = new Professor();
        User user = mapToUserEntity(professorDTO);
        professor.setId(user.getId());
        professor.setFirstName(user.getFirstName());
        professor.setLastName(user.getLastName());
        professor.setUsername(user.getUsername());
        professor.setPassword(user.getPassword());
        professor.setRoles(user.getRoles());

        return professor;
    }
}
