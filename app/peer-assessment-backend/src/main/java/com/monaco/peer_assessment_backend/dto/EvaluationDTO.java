package com.monaco.peer_assessment_backend.dto;


import com.monaco.peer_assessment_backend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDTO {
    private Long id;
    private Student evaluator;
    private Student teammate;
    private int cooperation_rating;
}
