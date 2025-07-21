package com.sb.main.server.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sb.main.server.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<String>> handleAccessDenied(AccessDeniedException ex) {
        return new ResponseEntity<>(new ApiResponse<>(false, "Access denied", null), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiResponse<String>> handleNotFound(NoSuchElementException ex) {
        return new ResponseEntity<>(new ApiResponse<>(false, "Resource not found", null), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ApiResponse<String>> handleIOException(IOException ex) {
        return new ResponseEntity<>(new ApiResponse<>(false, "Failed to upload image", null), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<ApiResponse<String>> handleJsonError(JsonProcessingException ex) {
        return new ResponseEntity<>(new ApiResponse<>(false, "Invalid request format", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGeneric(Exception ex) {
        ex.printStackTrace(); // Optional: for debugging
        return new ResponseEntity<>(new ApiResponse<>(false, "Something went wrong", null), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
