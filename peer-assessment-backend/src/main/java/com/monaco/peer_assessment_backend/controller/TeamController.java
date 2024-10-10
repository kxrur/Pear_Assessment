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

    
    @PostMapping("/submit")
    public ResponseEntity<String> submitTeammatesForEvaluation(@RequestBody TeammateSelectionDTO selection) {
        try {
            teamService.saveSelectedTeammatesForEvaluation(selection.getEvaluatorId(), selection.getTeammateIds());
            return ResponseEntity.ok("Teammates successfully selected for evaluation.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    

}
