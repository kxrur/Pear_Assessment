package com.monaco.peer_assessment_backend.service;

import com.monaco.peer_assessment_backend.dto.EvaluationDTO;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.entity.*;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.EvaluationMapper;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.*;
import com.monaco.peer_assessment_backend.service.impl.TeamServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

public class TeamServiceTests {
     @Mock
    private UserRepository userRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private EvaluationRepository evaluationRepository;

    @Mock
    private TeamMapper teamMapper;

    @Mock
    private EvaluationMapper evaluationMapper;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private TeamServiceImpl teamService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTeam() {
        Long professorID = 1L;
        List<Long> studentIds = List.of(2L, 3L);
        String teamName = "Team A";

        Professor professor = new Professor();
        List<Student> students = List.of(new Student(), new Student());

        when(userRepository.findById(professorID)).thenReturn(Optional.of(professor));
        when(studentRepository.findAllByStudentIDIn(studentIds)).thenReturn(students);

        teamService.createTeam(professorID, studentIds, teamName);

        verify(teamRepository, times(1)).save(any(Team.class));
    }

    @Test
    void testGetCurrentTeamsForUser_UserNotFound() {
        Long userId = 1L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> teamService.getCurrentTeamsForUser(userId));
    }

    @Test
    void testGetCurrentTeamsForUser_Professor() throws UserNotFoundException {
        Professor professor = new Professor();
        Long userId = 1L;
        List<Team> teams = List.of(new Team());

        when(userRepository.findById(userId)).thenReturn(Optional.of(professor));
        when(teamRepository.findByProfessor(professor)).thenReturn(teams);

        List<Team> result = teamService.getCurrentTeamsForUser(userId);

        assertEquals(teams, result);
    }

    @Test
    void testSubmitEvaluation() {
        // Setup mock data
        Long evaluatorId = 1L;
        Long evaluateeId = 2L;
        int cooperationRating = 4;
        int conceptualContributionRating = 5;
        int practicalContributionRating = 3;
        int workEthicRating = 4;
        String cooperationComment = "Great cooperation!";
        String conceptualContributionComment = "Solid theoretical understanding";
        String practicalContributionComment = "Good practical application";
        String workEthicComment = "Consistent and hard-working";

        // Mock the student repository to return mock students
        Student evaluator = new Student();
        evaluator.setId(evaluatorId);
        evaluator.setUsername("Evaluator");

        Student evaluatee = new Student();
        evaluatee.setId(evaluateeId);
        evaluatee.setUsername("Evaluatee");

        when(studentRepository.findById(evaluatorId)).thenReturn(Optional.of(evaluator));
        when(studentRepository.findById(evaluateeId)).thenReturn(Optional.of(evaluatee));

        // Create a mock evaluation object to return from the mapper
        EvaluationDTO expectedEvaluationDTO = new EvaluationDTO();
        expectedEvaluationDTO.setEvaluator(evaluator);
        expectedEvaluationDTO.setTeammate(evaluatee);
        expectedEvaluationDTO.setCooperation_rating(cooperationRating);
        expectedEvaluationDTO.setConceptual_contribution_rating(conceptualContributionRating);
        expectedEvaluationDTO.setPractical_contribution_rating(practicalContributionRating);
        expectedEvaluationDTO.setWork_ethic_rating(workEthicRating);
        expectedEvaluationDTO.setCooperation_comment(cooperationComment);
        expectedEvaluationDTO.setConceptual_contribution_comment(conceptualContributionComment);
        expectedEvaluationDTO.setPractical_contribution_comment(practicalContributionComment);
        expectedEvaluationDTO.setWork_ethic_comment(workEthicComment);

        // Mock the evaluation mapper to return the expected DTO
        when(evaluationMapper.mapToEvaluationDTO(any(Evaluation.class))).thenReturn(expectedEvaluationDTO);

        // Mock the evaluation repository save
        Evaluation evaluation = new Evaluation();
        when(evaluationRepository.save(any(Evaluation.class))).thenReturn(evaluation);

        // Call the method to test
        EvaluationDTO evaluationDTO = teamService.submitEvaluation(
                evaluatorId, evaluateeId, cooperationRating, conceptualContributionRating, 
                practicalContributionRating, workEthicRating, cooperationComment, 
                conceptualContributionComment, practicalContributionComment, workEthicComment);

        // Verify the repository interaction
        verify(studentRepository, times(1)).findById(evaluatorId);
        verify(studentRepository, times(1)).findById(evaluateeId);
        verify(evaluationRepository, times(1)).save(any(Evaluation.class));

        // Verify the correct EvaluationDTO is returned
        assertNotNull(evaluationDTO);
        assertEquals(evaluator, evaluationDTO.getEvaluator());
        assertEquals(evaluatee, evaluationDTO.getTeammate());
        assertEquals(cooperationRating, evaluationDTO.getCooperation_rating());
        assertEquals(conceptualContributionRating, evaluationDTO.getConceptual_contribution_rating());
        assertEquals(practicalContributionRating, evaluationDTO.getPractical_contribution_rating());
        assertEquals(workEthicRating, evaluationDTO.getWork_ethic_rating());
        assertEquals(cooperationComment, evaluationDTO.getCooperation_comment());
        assertEquals(conceptualContributionComment, evaluationDTO.getConceptual_contribution_comment());
        assertEquals(practicalContributionComment, evaluationDTO.getPractical_contribution_comment());
        assertEquals(workEthicComment, evaluationDTO.getWork_ethic_comment());
    }

    @Test
    void testSaveSelectedTeammatesForEvaluation() {
        // Setup mock data
        Long evaluatorId = 1L;
        List<Long> selectedTeammateIds = new ArrayList<>();
        selectedTeammateIds.add(2L);
        selectedTeammateIds.add(3L);

        // Mock the evaluator student
        Student evaluator = new Student();
        evaluator.setId(evaluatorId);
        evaluator.setUsername("Evaluator");

        // Mock teammates (students)
        Student teammate1 = new Student();
        teammate1.setId(2L);
        teammate1.setUsername("Teammate1");

        Student teammate2 = new Student();
        teammate2.setId(3L);
        teammate2.setUsername("Teammate2");

        // Mock the team that the evaluator belongs to
        Team evaluatorTeam = new Team();
        evaluatorTeam.setId(1L);
        List<Student> teamStudents = new ArrayList<>();
        teamStudents.add(evaluator);
        teamStudents.add(teammate1);
        teamStudents.add(teammate2);
        evaluatorTeam.setStudents(teamStudents);

        // Mock the repositories
        when(studentRepository.findById(evaluatorId)).thenReturn(Optional.of(evaluator));
        when(studentRepository.findAllById(selectedTeammateIds)).thenReturn(List.of(teammate1, teammate2));
        when(teamRepository.findAll()).thenReturn(List.of(evaluatorTeam));
        when(evaluationRepository.findByEvaluator_IdAndTeammate_Id(any(Long.class), any(Long.class)))
                .thenReturn(Optional.empty()); // No existing evaluations for these teammates

        // Mock the evaluation repository save
        Evaluation evaluation = new Evaluation();
        when(evaluationRepository.save(any(Evaluation.class))).thenReturn(evaluation);

        // Call the method to test
        teamService.saveSelectedTeammatesForEvaluation(evaluatorId, selectedTeammateIds);

        // Verify repository interactions
        verify(studentRepository, times(1)).findById(evaluatorId);
        verify(studentRepository, times(1)).findAllById(selectedTeammateIds);
        verify(teamRepository, times(1)).findAll();
        verify(evaluationRepository, times(2)).save(any(Evaluation.class)); // One for each teammate

        // Assert that the evaluations were saved correctly
        // (you can extend this by verifying the specific evaluations that were saved)
        verify(evaluationRepository, times(1)).save(argThat(evaluationArg -> evaluationArg.getEvaluator().equals(evaluator) &&
                evaluationArg.getTeammate().equals(teammate1)));

        verify(evaluationRepository, times(1)).save(argThat(evaluationArg -> evaluationArg.getEvaluator().equals(evaluator) &&
                evaluationArg.getTeammate().equals(teammate2)));
    }

    @Test
    void testSaveSelectedTeammatesForEvaluation_TeammateNotInSameTeam() {
        // Setup mock data
        Long evaluatorId = 1L;
        List<Long> selectedTeammateIds = new ArrayList<>();
        selectedTeammateIds.add(2L);

        // Mock the evaluator student
        Student evaluator = new Student();
        evaluator.setId(evaluatorId);
        evaluator.setUsername("Evaluator");

        // Mock teammates (students)
        Student teammate1 = new Student();
        teammate1.setId(2L);
        teammate1.setUsername("Teammate1");

        // Mock the team that the evaluator belongs to (doesn't include teammate1)
        Team evaluatorTeam = new Team();
        evaluatorTeam.setId(1L);
        List<Student> teamStudents = new ArrayList<>();
        teamStudents.add(evaluator);  // Only evaluator, no teammate1
        evaluatorTeam.setStudents(teamStudents);

        // Mock the repositories
        when(studentRepository.findById(evaluatorId)).thenReturn(Optional.of(evaluator));
        when(studentRepository.findAllById(selectedTeammateIds)).thenReturn(List.of(teammate1));
        when(teamRepository.findAll()).thenReturn(List.of(evaluatorTeam));

        // Call the method and expect a RuntimeException due to teammate not being in the same team
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            teamService.saveSelectedTeammatesForEvaluation(evaluatorId, selectedTeammateIds));
        
        assertEquals("Selected teammate Teammate1 is not in the same team.", exception.getMessage());
    }

    @Test
    void testSaveSelectedTeammatesForEvaluation_AlreadyEvaluated() {
        // Setup mock data
        Long evaluatorId = 1L;
        List<Long> selectedTeammateIds = new ArrayList<>();
        selectedTeammateIds.add(2L);

        // Mock the evaluator student
        Student evaluator = new Student();
        evaluator.setId(evaluatorId);
        evaluator.setUsername("Evaluator");

        // Mock teammates (students)
        Student teammate1 = new Student();
        teammate1.setId(2L);
        teammate1.setUsername("Teammate1");

        // Mock the team that the evaluator belongs to
        Team evaluatorTeam = new Team();
        evaluatorTeam.setId(1L);
        List<Student> teamStudents = new ArrayList<>();
        teamStudents.add(evaluator);
        teamStudents.add(teammate1);
        evaluatorTeam.setStudents(teamStudents);

        // Mock the repositories
        when(studentRepository.findById(evaluatorId)).thenReturn(Optional.of(evaluator));
        when(studentRepository.findAllById(selectedTeammateIds)).thenReturn(List.of(teammate1));
        when(teamRepository.findAll()).thenReturn(List.of(evaluatorTeam));
        when(evaluationRepository.findByEvaluator_IdAndTeammate_Id(any(Long.class), any(Long.class)))
                .thenReturn(Optional.of(new Evaluation())); // Existing evaluation for teammate

        // Call the method and expect a RuntimeException due to already existing evaluation
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            teamService.saveSelectedTeammatesForEvaluation(evaluatorId, selectedTeammateIds));

        assertEquals("Selected teammate Teammate1 has already been evaluated.", exception.getMessage());
    }
}