package com.monaco.peer_assessment_backend.service;

import com.monaco.peer_assessment_backend.entity.Student;

import java.util.List;

public interface TeamService {

    void createTeam(Long professorID, List<Long> studentIds, String teamName);

    List<Student> fetchTeammates(long studentID);
}
