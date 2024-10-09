package com.monaco.peer_assessment_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;;
import java.util.List;


/**
 * A class representing a Team entity for the database
 */
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Team {
    // Generate a unique id identifying the team
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Associate a professor to a team
    // A professor can have many teams but a team can only have one professor
    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    // A student can have many teams and a team can have many students
    // Creates a table that links a student ID to a team ID
    @ManyToMany
    @JoinTable (
            name = "team_students",
            joinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id")
    )
    private List<Student> students;

    private String teamName;

    public Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
