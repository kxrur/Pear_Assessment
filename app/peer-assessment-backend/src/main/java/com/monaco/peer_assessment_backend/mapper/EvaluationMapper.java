package com.monaco.peer_assessment_backend.mapper;


import com.monaco.peer_assessment_backend.dto.EvaluationDTO;
import com.monaco.peer_assessment_backend.entity.Evaluation;
import org.springframework.stereotype.Component;

@Component
public class EvaluationMapper {

    public EvaluationDTO mapToEvaluationDTO(Evaluation evaluation){
        EvaluationDTO evaluationDTO = new EvaluationDTO();
        evaluationDTO.setId(evaluation.getId());
        evaluationDTO.setEvaluator(evaluation.getEvaluator());
        evaluationDTO.setTeammate(evaluation.getTeammate());
        evaluationDTO.setCooperation_rating(evaluation.getCooperationRating());
        return evaluationDTO;
    }
}
