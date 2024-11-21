package com.monaco.peer_assessment_backend.mapper;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TeamMapper {

    private UserMapper userMapper;

    public TeamDTO mapToTeamDTO(Team team) {
        TeamDTO teamDTO = new TeamDTO();
        teamDTO.setId(team.getId());
        teamDTO.setProfessorID(team.getProfessor().getId());
        List<StudentDTO> studentDTOList = new ArrayList<>();
        for (Student student : team.getStudents()) {
            studentDTOList.add(userMapper.mapToStudentDTO(student));
        }
        teamDTO.setStudents(studentDTOList);
        teamDTO.setTeamName(team.getTeamName());

        return teamDTO;
    }
}
