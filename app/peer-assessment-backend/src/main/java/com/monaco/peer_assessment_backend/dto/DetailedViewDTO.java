package com.monaco.peer_assessment_backend.dto;

import java.util.List;

/**
 * This DTO is primarily used to provide a comprehensive view of a student's performance in the peer assessment system.
 * It contains the student's associated team, personal details, and a list of ratings and comments from their teammates.
 */
public class DetailedViewDTO {

    private TeamDTO team;
    private StudentDTO student;
    private List<StudentRatingDTO> studentRatings;

    public TeamDTO getTeam() {
        return team;
    }

    public void setTeam(TeamDTO team) {
        this.team = team;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public List<StudentRatingDTO> getStudentRatings() {
        return studentRatings;
    }

    public void setStudentRatings(List<StudentRatingDTO> studentRatings) {
        this.studentRatings = studentRatings;
    }

    public static class StudentRatingDTO {
        private String teammateName;
        private int cooperationRating;
        private int conceptualRating;
        private int practicalRating;
        private int workEthicRating;
        private String cooperationComment;
        private String conceptualComment;
        private String practicalComment;
        private String workEthicComment;
        private double averageRating;

        // Getters and setters
        public String getTeammateName() {
            return teammateName;
        }

        public void setTeammateName(String teammateName) {
            this.teammateName = teammateName;
        }

        public int getCooperationRating() {
            return cooperationRating;
        }

        public void setCooperationRating(int cooperationRating) {
            this.cooperationRating = cooperationRating;
        }

        public int getConceptualRating() {
            return conceptualRating;
        }

        public void setConceptualRating(int conceptualRating) {
            this.conceptualRating = conceptualRating;
        }

        public int getPracticalRating() {
            return practicalRating;
        }

        public void setPracticalRating(int practicalRating) {
            this.practicalRating = practicalRating;
        }

        public int getWorkEthicRating() {
            return workEthicRating;
        }

        public void setWorkEthicRating(int workEthicRating) {
            this.workEthicRating = workEthicRating;
        }

        public String getConceptualComment() {
            return conceptualComment;
        }

        public void setConceptualComment(String conceptualComment) {
            this.conceptualComment = conceptualComment;
        }

        public String getPracticalComment() {
            return practicalComment;
        }

        public void setPracticalComment(String practicalComment) {
            this.practicalComment = practicalComment;
        }

        public String getWorkEthicComment() {
            return workEthicComment;
        }

        public void setWorkEthicComment(String workEthicComment) {
            this.workEthicComment = workEthicComment;
        }

        public String getCooperationComment() {
            return cooperationComment;
        }

        public void setCooperationComment(String cooperationComment) {
            this.cooperationComment = cooperationComment;
        }

        public double getAverageRating() {
            return averageRating;
        }

        public void setAverageRating(double averageRating) {
            this.averageRating = averageRating;
        }
    }
}
