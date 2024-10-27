package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.TeamCreationDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.dto.TeammateSelectionDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamMapper teamMapper;

    @PostMapping("/teams/create")
    public ResponseEntity<?> createTeam(@RequestBody TeamCreationDTO teamDTO) {
        try {
            teamService.createTeam(teamDTO.getProfessorId(), teamDTO.getStudentIds(), teamDTO.getTeamName());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/teams/evaluate")
    public ResponseEntity<String> evaluateTeammates(
            @RequestParam Long evaluatorId,
            @RequestBody List<Long> selectedTeammateIds) {
        
        if (selectedTeammateIds == null || selectedTeammateIds.isEmpty()) {
            return ResponseEntity.badRequest().body("No teammates selected for evaluation.");
        }

        try {
            teamService.saveSelectedTeammatesForEvaluation(evaluatorId, selectedTeammateIds);
            return ResponseEntity.ok("Selected teammates for evaluation successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/teams/evaluate/{evaluatorId}/rate/{evaluateeId}")
    public ResponseEntity<String> submitCooperationRating(
            @PathVariable Long evaluatorId,
            @PathVariable Long evaluateeId,
            @RequestParam int rating) {
        try {
            teamService.submitCooperationRating(evaluatorId, evaluateeId, rating);
            return ResponseEntity.ok("Rating submitted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/teams/{userId}")
    public ResponseEntity<List<TeamDTO>> getTeams(@PathVariable Long userId) {
        try {
            List<Team> teamList = teamService.getCurrentTeamsForUser(userId);
            List<TeamDTO> teamDTOList = new ArrayList<>();
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

    @GetMapping("/teams/delete/{teamId}")
    public ResponseEntity<TeamDTO> deleteTeam(@PathVariable Long teamId) {
        TeamDTO savedTeam;
        try {
            savedTeam = teamService.deleteTeamById(teamId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return ResponseEntity.ok(savedTeam);
    }

}
