package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * JpaRepository will provide methods for CRUD operations
 * Created in order to implement login by studentID for students only
 */
public interface StudentRepository extends JpaRepository<Student, Long> {
    /**
     * Custom query to find a Student by their StudentID
     *
     * @param studentID The studentID of the desired Student
     * @return the desired Student
     */
    Optional<Student> findByStudentID(long studentID);
}