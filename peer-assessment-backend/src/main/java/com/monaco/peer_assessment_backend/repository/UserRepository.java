package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * JpaRepository will provide methods for CRUD operations
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Custom query to find a User by their username
     * @param username The username of the desired User
     * @return the desired User
     */
    Optional<User> findByUsername(String username);

    /**
     * Custom query to find a Student by their studentID
     * @param studentID The studentID of the desired Student
     * @return the desired Student
     */
    //Optional<User> (long studentID);
}
