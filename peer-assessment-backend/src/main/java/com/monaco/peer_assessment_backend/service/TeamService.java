package com.monaco.peer_assessment_backend.service;

import java.util.List;

public interface TeamService {

    void createTeam(Long professorID, List<Long> studentIds, String teamName);
}
