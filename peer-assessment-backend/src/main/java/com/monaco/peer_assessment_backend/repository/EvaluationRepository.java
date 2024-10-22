package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Evaluation;
import com.monaco.peer_assessment_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long>{
    List<Evaluation> findByEvaluator(Student evaluator);
    
    Optional<Evaluation> findByEvaluator_IdAndTeammate_Id(Long evaluatorId, Long teammateId);

    Optional<Evaluation> findByEvaluatorAndTeammate(Student evaluator, Student teammate);
}
