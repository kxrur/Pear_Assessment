package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Gamble;
import com.monaco.peer_assessment_backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GambleRepository extends JpaRepository<Gamble, Long> {

    /**
     * Query to get the gamble associated with a student and their team
     * @param studentId
     * @param teamId
     * @return
     */
    Optional<Gamble> findByStudentIdAndTeamId(Long studentId, Long teamId);

}
