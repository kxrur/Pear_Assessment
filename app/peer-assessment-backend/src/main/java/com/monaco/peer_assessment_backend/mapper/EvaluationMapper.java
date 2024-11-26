package com.monaco.peer_assessment_backend.mapper;


import com.monaco.peer_assessment_backend.dto.EvaluationDTO;
import com.monaco.peer_assessment_backend.entity.Evaluation;
import org.springframework.stereotype.Component;

/**
 * Mapper class responsible for converting an `Evaluation` entity to an `EvaluationDTO` object.
 * 
 * This class uses the `mapToEvaluationDTO` method to transform the properties of the `Evaluation`
 * entity into a data transfer object (DTO) that can be sent in API responses or used in service layers.
 */
@Component
public class EvaluationMapper {

     /**
     * Maps an `Evaluation` entity to an `EvaluationDTO` object.
     * 
     * @param evaluation the `Evaluation` entity to be mapped.
     * @return the corresponding `EvaluationDTO` object.
     */
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
