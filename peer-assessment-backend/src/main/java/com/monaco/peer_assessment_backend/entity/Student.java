package com.monaco.peer_assessment_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students", uniqueConstraints = @UniqueConstraint(columnNames = "studentID"))
public class Student extends User {
    @Column(nullable = false) //Ensure that a student enters and ID
    private long studentID;
}
