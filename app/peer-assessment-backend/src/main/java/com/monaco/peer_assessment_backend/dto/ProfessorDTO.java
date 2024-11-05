package com.monaco.peer_assessment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
public class ProfessorDTO extends UserDTO {
    public ProfessorDTO(long id, String username, String firstName, String lastName, String password, Set<String> roles) {
        super(id, username, firstName, lastName, password, roles);
    }

}
