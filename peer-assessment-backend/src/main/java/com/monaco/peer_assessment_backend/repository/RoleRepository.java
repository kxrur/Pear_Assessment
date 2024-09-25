package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * JpaRepository will provide methods for CRUD operations on the MySQL database
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Custom query to find a Role by its name
     * @param name the name of the role
     * @return the Role with the name
     */
    Optional<Role> findByName(String name);
}
