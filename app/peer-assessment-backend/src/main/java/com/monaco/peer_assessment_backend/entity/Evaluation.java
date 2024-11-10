package com.monaco.peer_assessment_backend.entity;

import jakarta.persistence.*;

@Entity
public class Evaluation{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evaluate_id", nullable = false)
    private Student evaluator;

    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;
    @ManyToOne
    @JoinColumn(name = "teammate_id", nullable = false)
    private Student teammate;

    private int cooperation_rating;
    private String cooperation_comment;

    private int conceptual_contribution_rating;
    private String conceptual_contribution_comment;

    private int practical_contribution_rating;
    private String practical_contribution_comment;

    private int work_ethic_rating;
    private String work_ethic_comment;

    private double average_rating;

    public Evaluation(){

    }

    public Evaluation(Student evaluator, Student teammate){
        this.evaluator = evaluator;
        this.teammate = teammate;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Student getEvaluator(){
        return evaluator;
    }

    public void setEvaluator(Student evaluator){
        this.evaluator = evaluator;
    }

    public Student getTeammate(){
        return teammate;
    }

    public void setTeammate(Student teammate){
        this.teammate = teammate;
    }

    public Team getTeam() {
        return team;
    }
    public void setTeam(Team team) {
        this.team = team;
    }

    public int getCooperationRating(){
        return cooperation_rating;
    }

    public void setCooperationRating(int cooperation_rating){
        this.cooperation_rating = cooperation_rating;
    }

    public String getCooperationComment() {
        return cooperation_comment;
    }

    public void setCooperationComment(String cooperationComment) {
        this.cooperation_comment = cooperationComment;
    }

    public int getConceptualContributionRating() {
        return conceptual_contribution_rating;
    }

    public void setConceptualContributionRating(int conceptual_contribution_rating) {
        this.conceptual_contribution_rating = conceptual_contribution_rating;
    }

    public String getConceptualContributionComment() {
        return conceptual_contribution_comment;
    }

    public void setConceptualContributionComment(String conceptual_contribution_comment) {
        this.conceptual_contribution_comment = conceptual_contribution_comment;
    }

    public int getPracticalContributionRating() {
        return practical_contribution_rating;
    }

    public void setPracticalContributionRating(int practical_contribution_rating) {
        this.practical_contribution_rating = practical_contribution_rating;
    }

    public String getPracticalContributionComment() {
        return practical_contribution_comment;
    }

    public void setPracticalContributionComment(String practical_contribution_comment) {
        this.practical_contribution_comment = practical_contribution_comment;
    }

    public int getWorkEthicRating() {
        return work_ethic_rating;
    }

    public void setWorkEthicRating(int work_ethic_rating) {
        this.work_ethic_rating = work_ethic_rating;
    }

    public String getWorkEthicComment() {
        return work_ethic_comment;
    }

    public void setWorkEthicComment(String work_ethic_comment) {
        this.work_ethic_comment = work_ethic_comment;
    }

    public double getAverageRating(){
        return average_rating;
    }

    public void setAverageRating(double average_rating){
        this.average_rating = average_rating;
    }
}
