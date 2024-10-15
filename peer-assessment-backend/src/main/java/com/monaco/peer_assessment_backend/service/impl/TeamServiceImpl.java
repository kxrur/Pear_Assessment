package com.monaco.peer_assessment_backend.service.impl;

import com.monaco.peer_assessment_backend.entity.Professor;
import com.monaco.peer_assessment_backend.entity.Student;
import com.monaco.peer_assessment_backend.entity.Team;
import com.monaco.peer_assessment_backend.entity.User;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.repository.StudentRepository;
import com.monaco.peer_assessment_backend.repository.TeamRepository;
import com.monaco.peer_assessment_backend.repository.UserRepository;
import com.monaco.peer_assessment_backend.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamServiceImpl implements TeamService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public void createTeam(Long professorID, List<Long> studentIds, String teamName) {
        // Find the professor by their generated id
        Professor professor = (Professor) userRepository.findById(professorID)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Team team = new Team();
        team.setProfessor(professor);

        team.setTeamName(teamName);

        List<Student> studentList = studentRepository.findAllByStudentIDIn(studentIds);
        team.setStudents(studentList);

        teamRepository.save(team);
    }

    @Override
    public List<Student> fetchTeammates(long studentID) {
        List<Team> teams = teamRepository.findAll();

        List<Student> teammates = new ArrayList<>();

        for (Team team : teams){
            for (Student student : team.getStudents()){
                if (student.getStudentID() == studentID){
                    for (Student teammate : team.getStudents()){
                        // Exclude the student requesting the list
                        if (teammate.getStudentID() != studentID){
                            teammates.add(teammate);
                        }
                    }
                    return teammates;
                }
            }
        }
        // Return an empty list if no teammates are found
        return teammates;
    }

    /**
     * Returns a list of Teams for which the user is part of
     * @param userId The user for which we are finding teams
     * @return a list of teams
     */
    @Override
    public List<Team> getCurrentTeamsForUser(Long userId) throws UserNotFoundException {
        // Based on the provided ID, the user may or may not exist
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User does not exist");
        }
        // Since there is a guaranteed user, we will store it in a User variable
        User user = userOptional.get();

        if (user instanceof Professor professor) {
            return teamRepository.findByProfessor(professor);
        } else if (user instanceof Student) {
            Student student = (Student) user;
            return teamRepository.findByStudentsContaining(student);
        } else {
            // Shouldn't technically be possible but we'll catch it anyways
            throw new UserNotFoundException("User is neither a student or a professor");
        }
    }
}
