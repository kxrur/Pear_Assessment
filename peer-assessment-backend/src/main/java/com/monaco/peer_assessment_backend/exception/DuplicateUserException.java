package com.monaco.peer_assessment_backend.exception;

public class DuplicateUserException extends Exception {
    public DuplicateUserException(String errorMessage) {
        super(errorMessage);
    }
}
