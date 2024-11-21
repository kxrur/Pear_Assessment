package com.monaco.peer_assessment_backend.service.impl;

import com.monaco.peer_assessment_backend.dto.EvaluationDTO;
import com.monaco.peer_assessment_backend.dto.DetailedViewDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.Evaluation;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.TeamNotFoundException;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.EvaluationMapper;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.EvaluationRepository;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.TeamRepository;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class TeamServiceImpl implements TeamService {

    private UserRepository userRepository;

    private StudentRepository studentRepository;

    private TeamRepository teamRepository;

    private EvaluationRepository evaluationRepository;

    private TeamMapper teamMapper;

    private EvaluationMapper evaluationMapper;

    private UserMapper userMapper;

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
    public List<StudentDTO> getAvailableTeammatesForEvaluation(Long evaluatorId, Long teamId) {
        // Fetch the evaluator and the team
        Student evaluator = studentRepository.findById(evaluatorId)
                .orElseThrow(() -> new RuntimeException("Evaluator not found"));
        
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Ensure the evaluator is part of the team
        if (!team.getStudents().contains(evaluator)) {
            throw new RuntimeException("Evaluator is not a part of this team");
        }

        // Get all students in the team
        List<Student> allTeammates = team.getStudents();

        // Get already evaluated teammate IDs
        List<Evaluation> evaluations = evaluationRepository.findByEvaluator(evaluator);
        List<Long> evaluatedIds = new ArrayList<>();
        for (Evaluation evaluation : evaluations) {
            evaluatedIds.add(evaluation.getTeammate().getId());
        }

        List<Student> unevaluatedTeammates = new ArrayList<>();
        for (Student teammate : allTeammates) {
            // Check if the teammate is neither the evaluator nor already evaluated
            if (teammate.getId() != evaluator.getId() && !evaluatedIds.contains(teammate.getId())) {
                unevaluatedTeammates.add(teammate);
            }
        }

        // Convert List<Student> to List<StudentDTO> without using streams
        List<StudentDTO> unevaluatedTeammateDTOs = new ArrayList<>();
        for (Student student : unevaluatedTeammates) {
            unevaluatedTeammateDTOs.add(userMapper.mapToStudentDTO(student));
        }

        return unevaluatedTeammateDTOs;
    }


    @Override
    public EvaluationDTO submitEvaluation(Long evaluatorId, Long evaluateeId, int cooperation_rating,
                                      int conceptual_contribution_rating, int practical_contribution_rating,
                                      int work_ethic_rating,
                                      String cooperation_comment, String conceptual_contribution_comment,
                                      String practical_contribution_comment, String work_ethic_comment,long team_id) {

        Student evaluator = studentRepository.findById(evaluatorId)
                .orElseThrow(() -> new RuntimeException("Evaluator not found"));

        Student evaluatee = studentRepository.findById(evaluateeId)
                .orElseThrow(() -> new RuntimeException("Evaluatee not found"));

        evaluatee.set_updated(true);
        studentRepository.save(evaluatee);

        Evaluation evaluation = new Evaluation();
        evaluation.setEvaluator(evaluator);
        evaluation.setTeammate(evaluatee);
        evaluation.setCooperationRating(cooperation_rating);
        evaluation.setConceptualContributionRating(conceptual_contribution_rating);
        evaluation.setPracticalContributionRating(practical_contribution_rating);
        evaluation.setWorkEthicRating(work_ethic_rating);

        evaluation.setCooperationComment(cooperation_comment);
        evaluation.setConceptualContributionComment(conceptual_contribution_comment);
        evaluation.setPracticalContributionComment(practical_contribution_comment);
        evaluation.setWorkEthicComment(work_ethic_comment);

        double totalRating = (double) cooperation_rating + conceptual_contribution_rating +
                            practical_contribution_rating + work_ethic_rating;

        double averageRating = totalRating / 4.0;
        if (teamRepository.findById(team_id).isPresent())
            evaluation.setTeam(teamRepository.getReferenceById(team_id));
        evaluation.setAverageRating(averageRating);
        evaluationRepository.save(evaluation);

        // Return the DTO
        return evaluationMapper.mapToEvaluationDTO(evaluation);
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

    @Override
    public List<DetailedViewDTO> getDetailedView(Long teamId) throws TeamNotFoundException {
        // Retrieve the team and map it to TeamDTO
        Optional<Team> team = teamRepository.findById(teamId);
        if (!team.isPresent()) {
            throw new TeamNotFoundException("Team with id " + teamId + " not found");
        }
        TeamDTO teamDTO = teamMapper.mapToTeamDTO(team.get());

        // List to store each student's detailed view
        List<DetailedViewDTO> detailedViewDTOList = new ArrayList<>();

        // Iterate through each student in the team
        for (Student student : team.get().getStudents()) {
            // Create a DetailedViewDTO instance for each student and set the team
            DetailedViewDTO detailedViewDTO = new DetailedViewDTO();
            detailedViewDTO.setTeam(teamDTO);

            // Map the Student entity to StudentDTO
            StudentDTO studentDTO = userMapper.mapToStudentDTO(student);
            detailedViewDTO.setStudent(studentDTO);

            // Fetch evaluations for this student within the team
            List<Evaluation> evaluations = evaluationRepository.findAllByEvaluatorInAndTeammateAndTeam(
                    team.get().getStudents(), student, team.get());

            // Prepare list to hold individual StudentRatingDTO entries
            List<DetailedViewDTO.StudentRatingDTO> teammateRatings = new ArrayList<>();

            // Iterate over evaluations to create StudentRatingDTOs
            for (Evaluation evaluation : evaluations) {
                DetailedViewDTO.StudentRatingDTO teammateRatingDTO = new DetailedViewDTO.StudentRatingDTO();
                teammateRatingDTO.setTeammateName(evaluation.getEvaluator().getFirstName() + " " + evaluation.getEvaluator().getLastName());
                teammateRatingDTO.setCooperationRating(evaluation.getCooperationRating());
                teammateRatingDTO.setConceptualRating(evaluation.getConceptualContributionRating());
                teammateRatingDTO.setPracticalRating(evaluation.getPracticalContributionRating());
                teammateRatingDTO.setWorkEthicRating(evaluation.getWorkEthicRating());

                // Set comments for each rating
                teammateRatingDTO.setCooperationComment(evaluation.getCooperationComment());
                teammateRatingDTO.setConceptualComment(evaluation.getConceptualContributionComment());
                teammateRatingDTO.setPracticalComment(evaluation.getPracticalContributionComment());
                teammateRatingDTO.setWorkEthicComment(evaluation.getWorkEthicComment());

                // Calculate average rating and set it
                double averageRating = (evaluation.getCooperationRating() + evaluation.getConceptualContributionRating()
                        + evaluation.getPracticalContributionRating() + evaluation.getWorkEthicRating()) / 4.0;
                teammateRatingDTO.setAverageRating(averageRating);

                // Add this teammate rating to the list
                teammateRatings.add(teammateRatingDTO);
            }

            // Set the ratings list in the detailed view DTO
            detailedViewDTO.setStudentRatings(teammateRatings);

            // Add this student's detailed view to the list
            detailedViewDTOList.add(detailedViewDTO);
        }

        return detailedViewDTOList;
    }
            
}
