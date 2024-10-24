package com.monaco.peer_assessment_backend.service.impl;

import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.entity.Evaluation;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.TeamNotFoundException;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.repository.EvaluationRepository;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.TeamRepository;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class TeamServiceImpl implements TeamService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private TeamMapper teamMapper;

    @Override
    public void createTeam(Long professorID, List<Long> studentIds, String teamName) {
        // Find the professor by their generated id
        Professor professor = (Professor) userRepository.findById(professorID)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Team team = new Team();
        team.setProfessor(professor);

        team.setTeamName(teamName);

        List<Student> studentList = studentRepository.findAllByStudentIDIn(studentIds);
        team.setStudents(studentList);

        teamRepository.save(team);
    }

    @Override
    public void saveSelectedTeammatesForEvaluation(Long evaluatorId, List<Long> selectedTeammateIds) {
        // Fetch the student who is evaluating
        Student evaluator = studentRepository.findById(evaluatorId)
                .orElseThrow(() -> new RuntimeException("Evaluator not found"));

        // Fetch the team of the evaluator
        List<Team> evaluatorTeams = teamRepository.findAll();
        Team evaluatorTeam = null;

        // Find the team the evaluator belongs to
        for (Team team : evaluatorTeams) {
            if (team.getStudents().contains(evaluator)) {
                evaluatorTeam = team;
                break;
            }
        }

        if (evaluatorTeam == null) {
            throw new RuntimeException("Evaluator is not part of any team");
        }

        // Fetch all selected teammates
        List<Student> selectedTeammates = studentRepository.findAllById(selectedTeammateIds);

        // Validate that all selected teammates are part of the same team
        for (Student selectedTeammate : selectedTeammates) {
            if (!evaluatorTeam.getStudents().contains(selectedTeammate)) {
                throw new RuntimeException("Selected teammate " + selectedTeammate.getUsername() + " is not in the same team.");
            }

             // Check if evaluation already exists
            Optional<Evaluation> existingEvaluation = evaluationRepository.findByEvaluator_IdAndTeammate_Id(evaluator.getId(), selectedTeammate.getId());
            if (existingEvaluation.isPresent()) {
                throw new RuntimeException("Selected teammate " + selectedTeammate.getUsername() + " has already been evaluated.");
        }
            // Save the evaluations
            Evaluation evaluation = new Evaluation();
            evaluation.setEvaluator(evaluator);
            evaluation.setTeammate(selectedTeammate);
            // Optionally add feedback or other details
            evaluationRepository.save(evaluation);
        }
    }

    /**
     * Returns a list of Teams for which the user is part of
     *
     * @param userId The user for which we are finding teams
     * @return a list of teams
     */
    @Override
    public List<Team> getCurrentTeamsForUser(Long userId) throws UserNotFoundException {
        // Based on the provided ID, the user may or may not exist
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User does not exist");
        }
        // Since there is a guaranteed user, we will store it in a User variable
        User user = userOptional.get();

        if (user instanceof Professor professor) {
            return teamRepository.findByProfessor(professor);
        } else if (user instanceof Student) {
            Student student = (Student) user;
            return teamRepository.findByStudentsContaining(student);
        } else {
            // Shouldn't technically be possible but we'll catch it anyways
            throw new UserNotFoundException("User is neither a student or a professor");
        }
    }

    @Override
    public void submitCooperationRating(Long evaluatorId, Long evaluateeId, int rating) {
        
        // Find the evaluator and evaluatee
        Student evaluator = studentRepository.findById(evaluatorId).orElseThrow(() -> new RuntimeException("Evaluator not found"));
        Student evaluatee = studentRepository.findById(evaluateeId).orElseThrow(() -> new RuntimeException("Evaluatee not found"));

        // Find existing evaluation or create a new one
        Optional<Evaluation> optionalEvaluation = evaluationRepository.findByEvaluatorAndTeammate(evaluator, evaluatee);
        
        Evaluation evaluation;

        if (optionalEvaluation.isPresent()) {
            evaluation = optionalEvaluation.get();
        } 
        
        else {
            evaluation = new Evaluation();
            evaluation.setEvaluator(evaluator);
            evaluation.setTeammate(evaluatee);
        }

        // Set the cooperation rating
        evaluation.setCooperationRating(rating);
        
        // Save the evaluation
        evaluationRepository.save(evaluation);
    }

    /**
     * Given a Team ID, delete the team from the database
     * @param teamId The id of the team being deleted
     * @return the TeamDTO of the team that was deleted
     */
    @Override
    public TeamDTO deleteTeamById(Long teamId) {
        // Find the Team By ID
        Optional<Team> optionalTeam = teamRepository.findById(teamId);
        if (optionalTeam.isEmpty()) {
            throw new TeamNotFoundException("Team not found");
        }
        Team team = optionalTeam.get();
        TeamDTO teamDTO = teamMapper.mapToTeamDTO(team);
        teamRepository.delete(team);

        return teamDTO;
    }
}
