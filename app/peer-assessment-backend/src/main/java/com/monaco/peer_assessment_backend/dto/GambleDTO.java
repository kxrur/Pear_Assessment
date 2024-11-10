package com.monaco.peer_assessment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
/**
 * GambleDTO will return the value of the dice roll along with the current gambled grade to the frontend
 */
public class GambleDTO {
    private int diceRoll;
    private double gambledGrade;
}
