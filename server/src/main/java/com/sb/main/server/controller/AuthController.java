package com.sb.main.server.controller;

import com.sb.main.server.dto.ApiResponse;
import com.sb.main.server.dto.AuthRequest;
import com.sb.main.server.dto.AuthResponse;
import com.sb.main.server.dto.RegisterRequest;
import com.sb.main.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        String token = String.valueOf(authService.login(request));
        AuthResponse response = new AuthResponse(token);
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", response));
    }

}
