package com.monaco.peer_assessment_backend.dto;

import java.util.List;


public class TeammateSelectionDTO {

    private Long evaluatorId;
    private List<Long> teammateIds;

    // Getters and Setters

    public Long getEvaluatorId() {
        return evaluatorId;
    }

    public void setEvaluatorId(Long evaluatorId) {
        this.evaluatorId = evaluatorId;
    }

    public List<Long> getTeammateIds() {
        return teammateIds;
    }

    public void setTeammateIds(List<Long> teammateIds) {
        this.teammateIds = teammateIds;
    }
}

