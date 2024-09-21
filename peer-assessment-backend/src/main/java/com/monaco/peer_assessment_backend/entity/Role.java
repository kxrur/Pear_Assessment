package com.monaco.peer_assessment_backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Roles must be unique and not null
    @Column(length = 60, unique = true, nullable = false)
    private String name;
}
