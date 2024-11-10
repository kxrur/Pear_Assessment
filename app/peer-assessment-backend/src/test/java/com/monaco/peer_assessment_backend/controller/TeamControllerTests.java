package com.monaco.peer_assessment_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.TeamCreationDTO;
import com.monaco.peer_assessment_backend.dto.TeamDTO;
import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Role;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.repository.EvaluationRepository;
import com.monaco.peer_assessment_backend.service.TeamService;
import com.monaco.peer_assessment_backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.*;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = TeamController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class TeamControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    /**
     * Inject all the dependencies for the TeamController class using @MockBean
     */
    @MockBean
    private TeamService teamService;

    @MockBean
    private EvaluationRepository evaluationRepository;


    @MockBean
    private TeamMapper teamMapper;

    /**
     * These are real objects
     */
    private StudentDTO studentDTO;
    private Student student;
    private TeamCreationDTO teamCreationDTO;
    private Professor professor;
    private Team team;
    private TeamDTO teamDTO;

    /**
     *  Any behaviour that needs to be done before the tests.
     *  Here I set up the objects that I defined earlier
     */
    @BeforeEach
    public void setup() {
        Role studentRole = new Role(2, "STUDENT");
        Role professorRole = new Role(1, "PROFESSOR");
        Set<Role> studentRoles = new HashSet<>();
        Set<Role> professorRoles = new HashSet<>();

        professorRoles.add(professorRole);

        studentRoles.add(studentRole);
        student = new Student(1L, "Bob", "Ross", "bobross123",
                "password", studentRoles, 1234567L, false);

        Set<String> rolesDTO = new HashSet<>();
        rolesDTO.add("STUDENT");
        studentDTO = new StudentDTO(1L, "Bob", "Ross",
                rolesDTO, false, 1234567L);

        List<Long> studentIdList = new ArrayList<>();

        List<Student> studentList = new ArrayList<>();
        studentList.add(student);

        studentIdList.add(1L);

        professor = new Professor(1L, "Rob", "Boss", "robboss123", "password",
                professorRoles);

        teamCreationDTO = new TeamCreationDTO(1L, "TEST", studentIdList);

        team = new Team(1L, professor, studentList, "TEST");

    }

    @DisplayName("Testing Create Team Request")
    @Test
    public void createTeamRequest() throws Exception {
        // Send a request to the api endpoint
        // It takes in a teamCreationDTO but since we don't want to give an object we convert it to string
        ResultActions response = mockMvc.perform(post("/api/teams/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(teamCreationDTO)));

        // We expect the response to return a HttpStatus.CREATED
        response.andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Testing Get Available Teammates Request")
    public void getAvailableTeammatesRequest() throws Exception {
        List<StudentDTO> teammates = List.of(studentDTO);
        when(teamService.getAvailableTeammatesForEvaluation(1L, 1L)).thenReturn(teammates);

        ResultActions response = mockMvc.perform(post("/api/teams/available-teammates")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"teamId\":1, \"evaluatorId\":1}"));

        response.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("Bob"));
    }

    @Test
    @DisplayName("Testing Evaluate Teammate")
    public void evaluateTeammatesRequest() throws Exception {
        List<Long> selectedIds = List.of(2L, 3L);
        ResultActions response = mockMvc.perform(post("/api/teams/evaluate")
                        .param("evaluatorId", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(selectedIds)));

        response.andExpect(status().isOk())
                .andExpect(content().string("Selected teammates for evaluation successfully."));
    }

//    @Test
//    @DisplayName("Testing Submit Rating")
//    public void submitCooperationRatingRequest() throws Exception {
//        ResultActions response = mockMvc.perform(post("/api/teams/evaluate/1/rate/2")
//                .param("cooperation_rating", "4")
//                .param("cooperation_comment", "Good teamwork")
//                .param("conceptual_contribution_rating", "5")
//                .param("conceptual_contribution_comment", "Excellent ideas")
//                .param("practical_contribution_rating", "3")
//                .param("practical_contribution_comment", "Needs improvement")
//                .param("work_ethic_rating", "4")
//                .param("work_ethic_comment", "Solid effort")
//                .param("team_id","4")
//                .contentType(MediaType.APPLICATION_JSON));
//        response.andExpect(status().isOk());
//    }

    @DisplayName("Testing Get Teams for a User")
    @Test
    public void getTeamsRequest() throws Exception {
        Long userId = 1L;

        when(teamService.getCurrentTeamsForUser(userId)).thenReturn(Collections.singletonList(team));
        when(teamMapper.mapToTeamDTO(team)).thenReturn(teamDTO);

        ResultActions response = mockMvc.perform(get("/api/teams/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0]").value(teamDTO)); // json is returned as a list, get the first expression

        System.out.println(response);
        // Check if the API call executed this method
        verify(teamService).getCurrentTeamsForUser(userId);
    }

    @Test
    @DisplayName("Testing Delete Team")
    public void deleteTeamRequest() throws Exception {
        TeamDTO teamDTO1 = new TeamDTO();
        teamDTO1.setTeamName("TEST");
        when(teamService.deleteTeamById(1L)).thenReturn(teamDTO1);



        mockMvc.perform(get("/api/teams/delete/{teamId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.teamName").value("TEST"));
    }
}
