package com.monaco.peer_assessment_backend.controller;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.dto.UserDTO;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class UserControllerTests {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    private StudentDTO studentDTO;
    private List<StudentDTO> studentList;

    @BeforeEach
    public void setup() {

        Set<String> rolesDTO = new HashSet<>();
        rolesDTO.add("STUDENT");

        studentDTO = new StudentDTO(1L, "Bob", "Ross",
                rolesDTO, false, 1234567L);
        studentList = new ArrayList<>();
        studentList.add(studentDTO);
    }

    @DisplayName("Testing Get All Students")
    @Test
    public void getAllStudentsRequest() throws Exception {
        when(userService.getAllStudents()).thenReturn(studentList);

        mockMvc.perform(get("/api/users/students")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].firstName").value("Bob"));

        verify(userService).getAllStudents();
    }

    @DisplayName("Testing get User by ID")
    @Test
    public void getUserByIdRequest() throws Exception {
        Long userId = 1L;

        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        userDTO.setFirstName("Bob");

        when(userService.getUserById(userId)).thenReturn(userDTO);

        mockMvc.perform(get("/api/user/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(userId))
                .andExpect(jsonPath("$.firstName").value("Bob"));
    }
}
