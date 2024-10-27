package com.monaco.peer_assessment_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;


@Getter
@Setter
@Entity
@Table(name = "professors")
public class Professor extends User {

}
