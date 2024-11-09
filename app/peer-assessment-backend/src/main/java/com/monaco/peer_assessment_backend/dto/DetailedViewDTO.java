package com.monaco.peer_assessment_backend.dto;

import java.util.List;

public class DetailedViewDTO {

    private String teamName;
    private List<StudentRatingDTO> studentRatings;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public List<StudentRatingDTO> getStudentRatings() {
        return studentRatings;
    }

    public void setStudentRatings(List<StudentRatingDTO> studentRatings) {
        this.studentRatings = studentRatings;
    }

    // Inner class to represent the individual student details
    public static class StudentRatingDTO {
        private String studentName;
        private int cooperationRating;
        private int conceptualRating;
        private int practicalRating;
        private int workEthicRating;
        private String cooperationComment;
        private String conceptualComment;
        private String practicalComment;
        private String workEthicComment;
        private double averageRating;

        public String getStudentName() {
            return studentName;
        }

        public void setStudentName(String studentName) {
            this.studentName = studentName;
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

        public String getConceptualComment(){
            return conceptualComment;
        }

        public void setConceptualComment(String conceptualComment){
            this.conceptualComment = conceptualComment;
        }

        public String getPracticalComment(){
            return practicalComment;
        }

        public void setPracticalComment(String practicalComment){
            this.practicalComment = practicalComment;
        }

        public String getWorkEthicComment(){
            return workEthicComment;
        }

        public void setWorkEthicComment(String workEthicComment){
            this.workEthicComment = workEthicComment;
        }

        public String getCooperationComment(){
            return cooperationComment;
        }

        public void setCooperationComment(String cooperationComment){
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
