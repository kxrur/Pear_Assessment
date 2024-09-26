package com.monaco.peer_assessment_backend.service;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
//    public User createUser(User  newUser);
//    public User getUserById(int id);
//    public List<User> getAllUsers();
//    public User updateUser(int id, User newUser);
//    public User deleteUser(int id);
public class UserService {

	  @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;


    StudentDTO registerStudent(StudentDTO studentDTO) throws DuplicateUserException;

    ProfessorDTO registorProfessor(ProfessorDTO professorDTO) throws DuplicateUserException;
}
