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
        evaluationDTO.setCooperation_comment(evaluation.getCooperationComment());
        evaluationDTO.setConceptual_contribution_rating(evaluation.getConceptualContributionRating());
        evaluationDTO.setConceptual_contribution_comment(evaluation.getConceptualContributionComment());
        evaluationDTO.setPractical_contribution_rating(evaluation.getPracticalContributionRating());
        evaluationDTO.setPractical_contribution_comment(evaluation.getPracticalContributionComment());
        evaluationDTO.setWork_ethic_rating(evaluation.getWorkEthicRating());
        evaluationDTO.setWork_ethic_comment(evaluation.getWorkEthicComment());
        return evaluationDTO;
    }
}
