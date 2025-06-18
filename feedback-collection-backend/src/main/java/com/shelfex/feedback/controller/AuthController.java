package com.shelfex.feedback.controller;

import com.shelfex.feedback.dto.AuthRequest;
import com.shelfex.feedback.dto.AuthResponse;
import com.shelfex.feedback.model.User;
import com.shelfex.feedback.repository.UserRepository;
import com.shelfex.feedback.service.CustomUserDetailsService;
import com.shelfex.feedback.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for auth endpoints from React
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            if (authentication.isAuthenticated()) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
                String token = jwtUtil.generateToken(userDetails);
                String role = userDetails.getAuthorities().stream()
                        .filter(a -> a.getAuthority().startsWith("ROLE_"))
                        .map(a -> a.getAuthority().substring(5)) // Remove "ROLE_" prefix
                        .findFirst()
                        .orElse("USER"); // Default to USER if no specific role found

                return ResponseEntity.ok(new AuthResponse(token, role));
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
            }
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Authentication error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials", e);
        }
    }

    // --- Optional: Endpoint to register a default admin user for initial setup ---
    // In a real application, user registration would be more robust.
    // This is just for easily creating an admin user to test.
    @PostMapping("/register-admin")
    public ResponseEntity<String> registerAdmin(@RequestBody AuthRequest authRequest) {
        if (userRepository.existsByUsername(authRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists!");
        }

        User adminUser = new User();
        adminUser.setUsername(authRequest.getUsername());
        adminUser.setPassword(passwordEncoder.encode(authRequest.getPassword())); // Encode password
        adminUser.setRole("ADMIN"); // Set role to ADMIN

        userRepository.save(adminUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin user registered successfully!");
    }
}