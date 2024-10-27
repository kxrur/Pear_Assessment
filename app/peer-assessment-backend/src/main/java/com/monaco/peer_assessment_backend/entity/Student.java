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
@Table(name = "students", uniqueConstraints = @UniqueConstraint(columnNames = "student_id"))
public class Student extends User {
    @Column(name = "student_id", nullable = false) //Ensure that a student enters and ID
    private long studentID;
    @Column(name = "is_temp", nullable = false)
    private boolean isTemp =false;

}
