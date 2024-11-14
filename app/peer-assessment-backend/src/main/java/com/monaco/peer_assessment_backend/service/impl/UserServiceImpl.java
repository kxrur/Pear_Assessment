package com.monaco.peer_assessment_backend.service.impl;

import com.monaco.peer_assessment_backend.dto.*;
import com.monaco.peer_assessment_backend.entity.*;
import com.monaco.peer_assessment_backend.entity.Gamble.ApprovalStatus;
import com.monaco.peer_assessment_backend.exception.DuplicateUserException;
import com.monaco.peer_assessment_backend.exception.GradeNotFoundException;
import com.monaco.peer_assessment_backend.exception.TeamNotFoundException;
import com.monaco.peer_assessment_backend.exception.UserNotFoundException;
import com.monaco.peer_assessment_backend.mapper.TeamMapper;
import com.monaco.peer_assessment_backend.mapper.UserMapper;
import com.monaco.peer_assessment_backend.repository.*;
import com.monaco.peer_assessment_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    // Injecting required repositories and dependencies for user operations
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private GambleRepository gambleRepository;

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TeamMapper teamMapper;

    /**
     * Registers a new student, ensuring the username is unique and password is
     * encrypted.
     * 
     * @param studentDTO the student data transfer object containing student details
     * @return the saved student DTO
     * @throws DuplicateUserException if the username already exists in the system
     */
    @Override
    public StudentDTO registerStudent(StudentDTO studentDTO) throws DuplicateUserException {
        Student student = userMapper.mapToStudentEntity(studentDTO);

        if (studentRepository.existsByStudentID(studentDTO.getStudentId())) {
            Optional<Student> optionalStudent = studentRepository.findByStudentID(studentDTO.getStudentId());
            if (optionalStudent.isPresent()) {
                if (optionalStudent.get().isTemp() && !studentDTO.isTemp())
                    student = updateStudent(optionalStudent, studentDTO);
            } else {
                throw new DuplicateUserException("Student ID already in use");
            }
        }

        if (userRepository.existsByUsername(studentDTO.getUsername()) && studentDTO.getUsername() != null) {
            throw new DuplicateUserException("Username already exists");
        }
        // Encrypt the password before saving the user
        student.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
        // Save the student in the database
        Student savedStudent = studentRepository.save(student);

        return userMapper.mapToStudentDTO(savedStudent);
    }

    public Student updateStudent(Optional<Student> optionalStudent, StudentDTO studentDTO) {

        Student studentToChange = optionalStudent.get();
        studentToChange.setTemp(false);
        studentToChange.setPassword(studentDTO.getPassword());
        studentToChange.setUsername(studentDTO.getUsername());
        // Make sure this is updated
        return studentToChange;
    }

    /**
     * Registers a new professor, ensuring the username is unique and password is
     * encrypted.
     * 
     * @param professorDTO the professor data transfer object containing professor
     *                     details
     * @return the saved professor DTO
     * @throws DuplicateUserException if the username already exists in the system
     */
    @Override
    public ProfessorDTO registerProfessor(ProfessorDTO professorDTO) throws DuplicateUserException {
        Professor professor = userMapper.mapToProfessorEntity(professorDTO);

        professor.setPassword(passwordEncoder.encode(professorDTO.getPassword()));

        if (userRepository.existsByUsername(professorDTO.getUsername())) {
            throw new DuplicateUserException("Username already exists");
        }

        // Save the professor in the database
        Professor savedProfessor = userRepository.save(professor);

        return userMapper.mapToProfessorDTO(savedProfessor);
    }

    /**
     * Handles the login process by checking both the username or student ID.
     * It verifies if the provided password matches the stored one.
     * 
     * @param usernameOrStudentId the username or student ID
     * @param password            the raw password entered by the user
     * @return an optional user if the login is successful, empty otherwise
     */
    public Optional<User> login(String usernameOrStudentId, String password) {
        boolean isTemp = false;
        // User is verified through their username
        Optional<User> userOptional = userRepository.findByUsername(usernameOrStudentId);

        // If not found by username, search by student ID
        if (!userOptional.isPresent()) {
            try {
                long studentId = Long.parseLong(usernameOrStudentId);
                Optional<Student> studentOptional = studentRepository.findByStudentID(studentId);
                if (studentOptional.isPresent())
                    isTemp = studentOptional.get().isTemp();
                userOptional = studentOptional.map(Student.class::cast);
            } catch (NumberFormatException e) {
                // If input is not a valid number, ignore the exception
            }
        }

        // Return the user if user exists and password matches
        if (userOptional.isPresent() && !isTemp) {
            User user = userOptional.get();
            // Check if the password matches
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }

        // Return empty if login fails
        return Optional.empty();
    }

    /**
     * Retrieves a user by their unique ID.
     * 
     *  id the user ID
     * @return an optional user if found, empty otherwise
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Fetches all users from the database.
     * 
     * @return a list of all users
     */
    @Override
    public UserDTO getUserById(Long id) throws UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));

        UserDTO userDTO = userMapper.mapToUserDTO(user);

        if (user instanceof Student) {
            Student student = (Student) user;
            StudentDTO studentDTO = userMapper.mapToStudentDTO(student);
            studentDTO.setStudentId(student.getStudentID());
            return studentDTO;
        } else if (user instanceof Professor) {
            Professor professor = (Professor) user;
            ProfessorDTO professorDTO = userMapper.mapToProfessorDTO(professor);
            return professorDTO;
        }

        // Return the general user if it was not a Student or Professor
        return userDTO;
    }

    /**
     * Return a list of all students currently in the database
     * 
     * @return A list of student DTO
     */
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        List<StudentDTO> studentDTOList = new ArrayList<>();
        for (Student student : students) {
            StudentDTO studentDTO = userMapper.mapToStudentDTO(student);
            studentDTOList.add(studentDTO);
        }

        return studentDTOList;
    }

    /**
     * Deletes a user by their unique ID.
     * 
     * @param id the user ID to be deleted
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Get the average score for a student for a specific team
     * @param studentId
     * @param teamId
     * @return
     */
    public double getAverageStudentGrade(Long studentId, Long teamId) {
        double averageScore = 0;
        try {

            // Get all evaluations given to a student for the given team
            List<Evaluation> evaluations = evaluationRepository.findAllByTeammateIdAndTeamId(studentId, teamId);

            if (evaluations.isEmpty()) {
                System.out.println("No evaluations found.");
                return -1;
            }
            double evaluationSum = 0;
            for (int i = 0; i < evaluations.size(); i++) {
                Evaluation evaluation = evaluations.get(i);
                evaluationSum += evaluation.getAverageRating();
            }

            averageScore = evaluationSum / (evaluations.size());
        } catch (TeamNotFoundException e) {
            System.out.println("Team with id " + teamId + " not found");
        }
        return averageScore;
    }

    /**
     * Implement the dice roll logic and return a student's gambled grade
     * @param studentId
     * @param teamId
     * @return
     */
    public GambleDTO gambleGrade(Long studentId, Long teamId) throws Exception {
        Gamble gamble = gambleRepository.findByStudentIdAndTeamId(studentId, teamId)
                .orElse(new Gamble());
        Optional<Team> team = teamRepository.findById(teamId);
        Optional<Student> student = studentRepository.findById(studentId);
        team.ifPresent(gamble::setTeam);
        student.ifPresent(gamble::setStudent);

        GambleDTO gambleDTO = new GambleDTO();
        Random random = new Random();
        // Generate a random number between 0 and 5
        int diceRoll = random.nextInt(6);
        // increment to set a lower bound
        diceRoll += 1;

        gambleDTO.setDiceRoll(diceRoll);

        double startingGrade = gamble.getGambledScore() != null
                ? gamble.getGambledScore()
                : getAverageStudentGrade(studentId, teamId);

        if (startingGrade == -1) {
            throw new GradeNotFoundException("Student has no grades");
        }

        if ((diceRoll % 2) == 1) {
            startingGrade += ((double) diceRoll / 10);
        } else {
            startingGrade -= ((double) diceRoll / 10);
        }

        gambleDTO.setGambledGrade(startingGrade);
        gamble.setGambledScore(startingGrade);
        gamble.setWasGambled(true);

        gambleRepository.save(gamble);
        return gambleDTO;
    }

    /**
     * Return the gambled grade, average grade, team, and student
     * @param studentId
     * @param teamId
     * @return
     * @throws Exception
     */
    public GradeDTO getGrades(Long studentId, Long teamId) throws Exception {

        Optional<Gamble> gamble = gambleRepository.findByStudentIdAndTeamId(studentId, teamId);
        GambleDTO gambleDTO = new GambleDTO();
        GradeDTO gradeDTO = new GradeDTO();
        Optional<Team> team = teamRepository.findById(teamId);
        Optional<Student> student = studentRepository.findById(studentId);
        TeamDTO teamDTO = null;
        StudentDTO studentDTO = null;
        if (team.isPresent()) {
            teamDTO = teamMapper.mapToTeamDTO(team.get());
        } else throw new TeamNotFoundException("Team with id " + teamId + " not found");

        if (student.isPresent()) {
            studentDTO = userMapper.mapToStudentDTO(student.get());
        } else throw new Exception("Student not found");

        if (gamble.isPresent()) {
            gambleDTO.setGambledGrade(gamble.get().getGambledScore());
            gradeDTO.setApprovalStatus(gamble.get().getApprovalStatus());
        } else {
            gambleDTO.setGambledGrade(-1);
        }

        gradeDTO.setTeam(teamDTO);
        gradeDTO.setStudent(studentDTO);
        gradeDTO.setGambledScore(gambleDTO.getGambledGrade());
        gradeDTO.setAverageScore(getAverageStudentGrade(studentId, teamId));

        return gradeDTO;
    }


    public String approveOrDenyGamble(Long studentId, Long teamId, boolean approve) throws GradeNotFoundException {
        // Retrieve the gamble record for the student and team, and throw an exception if not found
        Gamble gamble = gambleRepository.findByStudentIdAndTeamId(studentId, teamId)
                .orElseThrow(() -> new GradeNotFoundException("Gamble not found for student with id " + studentId + " and team " + teamId));
        
        // Check the current grade (original grade)
        double originalGrade = getAverageStudentGrade(studentId, teamId);
        if (originalGrade == -1) {
            throw new GradeNotFoundException("Student has no grades to update");
        }
        
        // If approved, set the approvedScore in the gamble entity
        if (approve) {
            // Mark the gamble as approved and update the approvedScore
            gamble.setApprovedScore(gamble.getGambledScore()); // Set the approved score to the gambled score
            gamble.setApprovalStatus(ApprovalStatus.APPROVED);
        } 
        
        else {
            // Denied: Remove the gambled score and replace with original grade
            gamble.setApprovalStatus(ApprovalStatus.REJECTED);
            gamble.setApprovedScore(originalGrade);
        }
        
        // Save the gamble record
        gambleRepository.save(gamble);
        
        // Return success message
        return "Gambled grade " + (approve ? "approved" : "denied") + " successfully";
    }
    
}
