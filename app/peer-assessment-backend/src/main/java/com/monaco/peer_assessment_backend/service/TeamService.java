package com.monaco.peer_assessment_backend.service;

import com.monaco.peer_assessment_backend.dto.EvaluationDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;

import java.util.List;

public interface TeamService {

    void createTeam(Long professorID, List<Long> studentIds, String teamName);

    //List<Student> fetchTeammates(long studentID);

    List<Team> getCurrentTeamsForUser(Long userId) throws UserNotFoundException;
    
    void saveSelectedTeammatesForEvaluation(Long evaluatorId, List<Long> selectedTeammateIds);

    List<StudentDTO> getAvailableTeammatesForEvaluation(Long evaluatorId, Long teamId);

//    EvaluationDTO submitEvaluation(Long evaluatorId, Long evaluateeId, int cooperation_rating, int conceptual_contribution_rating,
//    int practical_contribution_rating, int work_ethic_rating,
//    String cooperation_comment, String conceptual_contribution_comment,
//    String practical_contribution_comment, String work_ethic_comment, long team_id);

    TeamDTO deleteTeamById(Long id);

}
