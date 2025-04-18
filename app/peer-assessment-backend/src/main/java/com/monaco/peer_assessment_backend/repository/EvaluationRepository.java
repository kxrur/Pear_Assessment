package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Evaluation;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for performing CRUD operations on the `Evaluation` entity.
 * This interface extends `JpaRepository` to leverage Spring Data JPA functionalities for database interaction.
 * It includes various query methods for retrieving evaluations based on different criteria such as evaluator, teammate, and team.
 */
@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long>{
    List<Evaluation> findByEvaluator(Student evaluator);
    
    Optional<Evaluation> findByEvaluator_IdAndTeammate_Id(Long evaluatorId, Long teammateId);

    Optional<Evaluation> findByEvaluatorAndTeammate(Student evaluator, Student teammate);
    List<Evaluation> findByTeammate(Student teammate);
    List<Evaluation> findAllByEvaluatorInAndTeammateAndTeam
            (Collection<Student> evaluator, Student teammate, Team team);

    List<Evaluation> findAllByTeammateIdAndTeamId(Long teammateId, Long teamId);

    Evaluation findByTeammateId(Long i);
}
