package com.monaco.peer_assessment_backend.service.impl;

import com.monaco.peer_assessment_backend.entity.Evaluation;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.repository.EvaluationRepository;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.TeamRepository;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        }

        // Save the evaluations
        for (Student selectedTeammate : selectedTeammates) {
            Evaluation evaluation = new Evaluation();
            evaluation.setEvaluator(evaluator);
            evaluation.setTeammate(selectedTeammate);
            // Optionally add feedback or other details
            evaluationRepository.save(evaluation);
        }
    }  
}
