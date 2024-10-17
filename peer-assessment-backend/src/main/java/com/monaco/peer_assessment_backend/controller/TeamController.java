package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.dto.TeammateSelectionDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @PostMapping("/teams/create")
    public ResponseEntity<?> createTeam(@RequestBody TeamDTO teamDTO) {
        teamService.createTeam(teamDTO.getProfessorID(), teamDTO.getStudentIDs(), teamDTO.getTeamName());
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
}
