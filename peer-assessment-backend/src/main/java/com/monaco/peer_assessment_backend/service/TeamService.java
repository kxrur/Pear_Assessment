package com.monaco.peer_assessment_backend.service;

import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;

import java.util.List;

public interface TeamService {

    void createTeam(Long professorID, List<Long> studentIds, String teamName);

    //List<Student> fetchTeammates(long studentID);

    List<Team> getCurrentTeamsForUser(Long userId) throws UserNotFoundException;
    
    void saveSelectedTeammatesForEvaluation(Long evaluatorId, List<Long> selectedTeammateIds);

}
