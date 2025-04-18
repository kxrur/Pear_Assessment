package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.*;
import com.monaco.peer_assessment_backend.entity.Evaluation;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.repository.EvaluationRepository;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

//Parameter 2 of constructor in
// com.monaco.peer_assessment_backend.controller.TeamController
// required a bean of type 'com.monaco.peer_assessment_backend.repository.EvaluationRepository'
// that could not be found.
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class TeamController {

  @Autowired
  private TeamService teamService;

  @Autowired
  private TeamMapper teamMapper;
  @Autowired
  private EvaluationRepository evaluationRepository;

  // Endpoint to create a new team
  @PostMapping("/teams/create")
  public ResponseEntity<?> createTeam(@RequestBody TeamCreationDTO teamDTO) {
    try {
      teamService.createTeam(teamDTO.getProfessorId(), teamDTO.getStudentIds(), teamDTO.getTeamName());
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
    // If team creation is successful, return a CREATED status
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  // Endpoint to get available teammates for evaluation
  @PostMapping("/teams/available-teammates")
  public ResponseEntity<List<StudentDTO>> getAvailableTeammates(
      @RequestBody Map<String, Long> requestBody) {
    Long teamId = requestBody.get("teamId");
    Long evaluatorId = requestBody.get("evaluatorId");

    try {
      // Call service to fetch available teammates
      List<StudentDTO> availableTeammates = teamService.getAvailableTeammatesForEvaluation(evaluatorId, teamId);
      // Return the list of available teammates
      return ResponseEntity.ok(availableTeammates);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(null);
    }
  }

   // Endpoint to allow the evaluator to select teammates for evaluation
  @PostMapping("/teams/evaluate")
  public ResponseEntity<String> evaluateTeammates(
      @RequestParam Long evaluatorId,
      @RequestBody List<Long> selectedTeammateIds) {

    if (selectedTeammateIds == null || selectedTeammateIds.isEmpty()) {
      // If no teammates are selected, return a BAD_REQUEST response
      return ResponseEntity.badRequest().body("No teammates selected for evaluation.");
    }

    try {
      // Call service to save the selected teammates for evaluation
      teamService.saveSelectedTeammatesForEvaluation(evaluatorId, selectedTeammateIds);
      return ResponseEntity.ok("Selected teammates for evaluation successfully.");
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  // Endpoint for submitting ratings and comments for a teammate
  @PostMapping("/teams/evaluate/{evaluatorId}/rate/{evaluateeId}")
  public ResponseEntity<?> submitCooperationRating(
      @PathVariable Long evaluatorId,
      @PathVariable Long evaluateeId,
      @RequestParam int cooperation_rating,
      @RequestParam String cooperation_comment,
      @RequestParam int conceptual_contribution_rating,
      @RequestParam String conceptual_contribution_comment,
      @RequestParam int practical_contribution_rating,
      @RequestParam String practical_contribution_comment,
      @RequestParam int work_ethic_rating,
      @RequestParam String work_ethic_comment,
      @RequestParam long team_id) {
    EvaluationDTO eval;

    try {
      // Call service to submit the evaluation and return the response
      return ResponseEntity
          .ok(teamService.submitEvaluation(evaluatorId, evaluateeId, cooperation_rating, conceptual_contribution_rating,
              practical_contribution_rating, work_ethic_rating,
              cooperation_comment, conceptual_contribution_comment,
              practical_contribution_comment, work_ethic_comment, team_id));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

   // Endpoint to fetch all teams associated with a user (either professor or student)
  @GetMapping("/teams/{userId}")
  public ResponseEntity<List<TeamDTO>> getTeams(@PathVariable Long userId) {
    try {
      List<Team> teamList = teamService.getCurrentTeamsForUser(userId);
      List<TeamDTO> teamDTOList = new ArrayList<>();
      // Convert each Team entity to TeamDTO using the mapper
      for (Team team : teamList) {
        teamDTOList.add(teamMapper.mapToTeamDTO(team));
      }
      return ResponseEntity.ok(teamDTOList);
    } catch (UserNotFoundException userNotFoundException) {
      // Return an error if the user does not exist
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } catch (Exception e) {
      // Handles any unexpected errors
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  /*
   * depending on what you prefer use either
   * the request body or path variable as we only need prof id;
   * if you see a duplicate the first line is the one associated with
   * path variable and the second version with the request body for example:
   * 
   * @GetMapping("/teams/summary-view/{profId}") is for the path variable version
   * 
   * @GetMapping("/teams/summary-view/") is for the request body version
   */
  @GetMapping("/teams/summary-view/{profId}")
  // @GetMapping("/teams/summary-view/")
  public ResponseEntity<List<StudentSumDTO>> getSummaryView(@PathVariable long profId) {
    // public ResponseEntity<List<StudentSumDTO>> getSummaryView(@RequestBody
    // ProfessorDTO professorDTO) {
    long id;
    List<StudentSumDTO> allStudentsSummary = new ArrayList<>();
    id = profId;
    // id = professorDTO.getId();

    try {
      List<Team> allTeams = teamService.getCurrentTeamsForUser(id);
      for (int i = 0; i < allTeams.size(); i++) {
        Team team = allTeams.get(i);
        String teamName = team.getTeamName();
        List<Student> students = team.getStudents();
        for (int j = 0; j < students.size(); j++) {
          Student student = students.get(j);
          StudentSumDTO studentToAdd = new StudentSumDTO();
          studentToAdd.setStudentId(student.getStudentID());
          studentToAdd.setFirstName(student.getFirstName());
          studentToAdd.setLastName(student.getLastName());
          studentToAdd.setTeamName(teamName);
          // Not just by teammate but by evaluators
          List<Evaluation> evaluations = evaluationRepository.findAllByEvaluatorInAndTeammateAndTeam(students, student,
              team);
          double conceptualRSum = 0, practicalRSum = 0, cooperationRSum = 0, workEthicSum = 0;
          int k;
          for (k = 0; k < evaluations.size(); k++) {
            Evaluation evaluation = evaluations.get(k);
            conceptualRSum += evaluation.getConceptualContributionRating();
            practicalRSum += evaluation.getPracticalContributionRating();
            cooperationRSum += evaluation.getCooperationRating();
            workEthicSum += evaluation.getWorkEthicRating();
          }

          studentToAdd.setNbResponses(k);
          studentToAdd.setConceptualR(conceptualRSum / k);
          studentToAdd.setCooperationR(cooperationRSum / k);
          studentToAdd.setPracticalR(practicalRSum / k);
          studentToAdd.setWorkEthic(workEthicSum / k);
          studentToAdd.setAverage((studentToAdd.getConceptualR() + studentToAdd.getCooperationR()
              + studentToAdd.getPracticalR() + studentToAdd.getWorkEthic()) / 4);
          allStudentsSummary.add(studentToAdd);
        }
      }

    } catch (UserNotFoundException e) {
      System.err.println("The user is not in the database");
    }
    return ResponseEntity.ok(allStudentsSummary);
  }

  // Endpoint to get a detailed view of a team's members and evaluations
  @PostMapping("/teams/detailed-view")
  public ResponseEntity<List<DetailedViewDTO>> getDetailedView(@RequestBody Map<String, Long> requestBody) {
    Long teamId = requestBody.get("teamId");

    try {
      // Fetch detailed view for the team and return the response
      List<DetailedViewDTO> detailedViewDTOList = teamService.getDetailedView(teamId);
      return ResponseEntity.ok(detailedViewDTOList);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(null);
    }
  }

  // Endpoint to delete a team by its ID
  @GetMapping("/teams/delete/{teamId}")
  public ResponseEntity<TeamDTO> deleteTeam(@PathVariable Long teamId) {
    TeamDTO savedTeam;
    try {
      // Call service to delete the team and fetch the deleted team details
      savedTeam = teamService.deleteTeamById(teamId);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
    return ResponseEntity.ok(savedTeam);
  }

}
