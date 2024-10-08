package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository <Team, Long> {
    List<Team> findByStudents_Id(Long studentId);
}
