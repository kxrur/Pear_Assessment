package com.monaco.peer_assessment_backend.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

import java.util.Set;

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
    @Column(name = "is_updated", nullable = false)
    private boolean is_updated =false;

    public Student(long id, String firstName, String lastName, @Nullable String username, String password, Set<Role> roles, long studentID, boolean isTemp) {
        super(id, firstName, lastName, username, password, roles);
        this.studentID = studentID;
        this.isTemp = isTemp;
    }
}
