package com.monaco.peer_assessment_backend.dto;

import com.monaco.peer_assessment_backend.entity.Gamble;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GradeDTO {
    private StudentDTO student;
    private TeamDTO team;
    private Double gambledScore;
    private Double averageScore;
    private Gamble.ApprovalStatus approvalStatus = Gamble.ApprovalStatus.PENDING;
}
