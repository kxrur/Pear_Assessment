package com.monaco.peer_assessment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentSumDTO {
    long studentId;
    String lastName;
    String firstName;
    String teamName;
    double cooperationR;
    double conceptualR;
    double practicalR;
    double workEthic;
    double average;
    int nbResponses;
}
