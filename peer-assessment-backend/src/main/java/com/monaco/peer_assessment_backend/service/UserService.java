package com.monaco.peer_assessment_backend.service;

import com.monaco.peer_assessment_backend.dto.ProfessorDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {
//    public User createUser(User  newUser);
//    public List<User> getAllUsers();
//    public User updateUser(int id, User newUser);
//    public User deleteUser(int id);

    StudentDTO registerStudent(StudentDTO studentDTO) throws DuplicateUserException;

    ProfessorDTO registerProfessor(ProfessorDTO professorDTO) throws DuplicateUserException;

    UserDTO getUserById(Long id) throws UserNotFoundException;

}
