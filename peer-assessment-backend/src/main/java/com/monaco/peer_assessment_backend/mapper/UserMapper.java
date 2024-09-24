package com.monaco.peer_assessment_backend.mapper;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Role;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.repository.RoleRepository;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Class with static methods that map user objects from DTO (Data Transfer Object) to entity for storage in MySQL database.
 * Available for each user type.
 */
public class UserMapper {

    // Get the current roles available
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

        student.setStudentID(studentDTO.getStudentId());

        return student;
    }

    public Professor toProfessorEntity(ProfessorDTO professorDTO) {
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
