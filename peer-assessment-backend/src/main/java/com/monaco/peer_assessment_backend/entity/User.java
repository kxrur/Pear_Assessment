package com.monaco.peer_assessment_backend.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;


@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"})
})
@Inheritance(strategy = InheritanceType.JOINED)

public class User {
    // Generate a unique user id for SQL table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private boolean isTemp;
    private String firstName;
    private String lastName;

    @Nullable
    private String username;

    private String password;

    // Students can have multiple roles and roles can have multiple students
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    // Creates a table that joins both the userId and the roleId
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name="userId", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "roleId", referencedColumnName = "id"))
    private Set<Role> roles;
}

