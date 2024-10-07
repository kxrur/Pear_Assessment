package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository <Team, Long> {
}
