package com.monaco.peer_assessment_backend.mapper;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Mapper class responsible for converting a `Team` entity to a `TeamDTO` object.
 * 
 * This class uses the `mapToTeamDTO` method to transform the properties of the `Team` entity into a
 * data transfer object (DTO) that can be used in service layers or sent in API responses.
 */
@Component
public class TeamMapper {
    @Autowired
    private UserMapper userMapper;

    /**
     * Maps a `Team` entity to a `TeamDTO` object.
     * 
     * @param team the `Team` entity to be mapped.
     * @return the corresponding `TeamDTO` object.
     */
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
