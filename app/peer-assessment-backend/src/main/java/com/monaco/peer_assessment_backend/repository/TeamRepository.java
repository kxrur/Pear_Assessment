package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository <Team, Long> {
    List<Team> findByStudents_Id(Long studentId);

    /**
     * Get all the teams assigned to a professor
     * @param professor the professor whose teams we are looking for
     * @return a list of teams
     */
    List<Team> findByProfessor(Professor professor);

    /**
     * Get all the teams that the provided student is in
     * @param student the student whose teams we are looking for
     * @return a list of teams
     */
    List<Team> findByStudentsContaining(Student student);
}
