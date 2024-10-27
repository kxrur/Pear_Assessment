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
    @JoinColumn(name = "teammate_id", nullable = false)
    private Student teammate;

    private int cooperation_rating;

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

    public int getCooperationRating(){
        return cooperation_rating;
    }

    public void setCooperationRating(int cooperation_rating){
        this.cooperation_rating = cooperation_rating;
    }
    
}
