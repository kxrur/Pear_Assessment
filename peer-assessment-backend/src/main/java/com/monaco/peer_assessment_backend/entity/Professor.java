package com.monaco.peer_assessment_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "professors")
public class Professor extends User {

}
