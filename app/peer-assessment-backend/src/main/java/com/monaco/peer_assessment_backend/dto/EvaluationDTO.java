package com.monaco.peer_assessment_backend.dto;


import com.monaco.peer_assessment_backend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This DTO is typically used in the peer assessment system to capture detailed ratings from peers 
 * for each of the specified dimensions of performance.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDTO {
    private Long id;
    private Student evaluator;
    private Student teammate;
    private int cooperation_rating;
    private String cooperation_comment;
    private int conceptual_contribution_rating;
    private String conceptual_contribution_comment;
    private int practical_contribution_rating;
    private String practical_contribution_comment;
    private int work_ethic_rating;
    private String work_ethic_comment;
}
