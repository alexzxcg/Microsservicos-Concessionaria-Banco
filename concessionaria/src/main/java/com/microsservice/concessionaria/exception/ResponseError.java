package com.microsservice.concessionaria.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

public record ResponseError(String message, HttpStatus httpStatus, LocalDateTime time, List<String> errors) {
    public ResponseError(String message, HttpStatus httpStatus, LocalDateTime time) {
        this(message, httpStatus, time, List.of());
    }
}

