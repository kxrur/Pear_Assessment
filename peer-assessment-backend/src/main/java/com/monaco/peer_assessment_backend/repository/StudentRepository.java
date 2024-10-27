package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

/**
 * JpaRepository will provide methods for CRUD operations
 * Created in order to implement login by studentID for students only
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    /**
     * Custom query to find a Student by their StudentID
     *
     * @param studentID The studentID of the desired Student
     * @return the desired Student
     */
    Optional<Student> findByStudentID(long studentID);


    List<Student> findAllByStudentIDIn(List<Long> studentIds);
}