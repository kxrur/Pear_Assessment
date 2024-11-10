package com.monaco.peer_assessment_backend.dto;

public class ApproveGambleDTO {
    private Long studentId;
    private Long teamId;
    private double finalGrade;
    private String approvalStatus;

    public Long getStudentId() { 
        return studentId; 
    }
    public void setStudentId(Long studentId) { 
        this.studentId = studentId; 
    }
    
    public Long getTeamId() { 
        return teamId; 
    }

    public void setTeamId(Long teamId) { 
        this.teamId = teamId; 
    }
    
    public double getFinalGrade() { 
        return finalGrade; 
    }
    public void setFinalGrade(double finalGrade) { 
        this.finalGrade = finalGrade; 
    }
    
    public String getApprovalStatus() { 
        return approvalStatus; 
    }
    public void setApprovalStatus(String approvalStatus) { 
        this.approvalStatus = approvalStatus; 
    }
}
