package com.monaco.peer_assessment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collections;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentDTO extends UserDTO {
    private long studentId;
    private boolean isTemp;

    public StudentDTO(long id, String firstName, String lastName, Set<String> roles, boolean isTemp, int studentId) {
        super(id, null, firstName, lastName, " ", roles);
        this.isTemp = isTemp;
        this.studentId = studentId;
    }
}
