package com.monaco.peer_assessment_backend.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "professors")
public class Professor extends User {
    public Professor(long id, String firstName, String lastName, @Nullable String username, String password, Set<Role> roles) {
        super(id, firstName, lastName, username, password, roles);
    }
}
