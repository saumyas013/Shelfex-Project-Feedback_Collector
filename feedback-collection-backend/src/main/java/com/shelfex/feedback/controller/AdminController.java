//package com.shelfex.feedback.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/admin")
//@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for admin endpoints from React
//public class AdminController {
//
//    @GetMapping("/test")
//    @PreAuthorize("hasRole('ADMIN')") // Only users with 'ADMIN' role can access this
//    public ResponseEntity<String> testAdminAccess() {
//        return ResponseEntity.ok("Hello Admin! You have successfully accessed a protected resource.");
//    }
//}




//package com.shelfex.feedback.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/admin")
//@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for admin endpoints from React
//public class AdminController {
//
//    @GetMapping("/test")
//    @PreAuthorize("hasRole('ADMIN')") // Only users with 'ADMIN' role can access this
//    public ResponseEntity<String> testAdminAccess() {
//        return ResponseEntity.ok("Hello Admin! You have successfully accessed a protected resource.");
//    }
//}


//package com.shelfex.feedback.controller;

//import com.shelfex.feedback.model.Feedback;
//import com.shelfex.feedback.service.FeedbackService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/admin")
//@CrossOrigin(origins = "http://localhost:3000") // Allow CORS from React frontend
//@PreAuthorize("hasRole('ADMIN')") // All methods in this controller require ADMIN role
//public class AdminController {
//
//    @Autowired
//    private FeedbackService feedbackService;
//
//    // The test endpoint from previous step
//    @GetMapping("/test")
//    public ResponseEntity<String> testAdminAccess() {
//        return ResponseEntity.ok("Hello Admin! You have successfully accessed a protected resource.");
//    }
//
//    // New: Endpoint to get all feedback
//    @GetMapping("/feedbacks")
//    public ResponseEntity<List<Feedback>> getAllFeedbacks(
//            @RequestParam(required = false) String productId,
//            @RequestParam(required = false) Integer rating,
//            @RequestParam(defaultValue = "createdAt") String sortBy, // Default sort by creation date
//            @RequestParam(defaultValue = "desc") String sortOrder) { // Default sort order descending
//
//        List<Feedback> feedbacks = feedbackService.getAllFeedback(productId, rating, sortBy, sortOrder);
//        return ResponseEntity.ok(feedbacks);
//    }
//
//    // New: Endpoint to get feedback statistics
//    @GetMapping("/stats")
//    public ResponseEntity<Map<String, Object>> getFeedbackStats() {
//        Map<String, Object> stats = feedbackService.getFeedbackStats();
//        return ResponseEntity.ok(stats);
//    }
//}




package com.shelfex.feedback.controller;

import com.shelfex.feedback.model.Feedback;
import com.shelfex.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000") // React frontend
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/test")
    public ResponseEntity<String> testAdminAccess() {
        return ResponseEntity.ok("Hello Admin! You have successfully accessed a protected resource.");
    }

    @GetMapping("/feedbacks")
    public ResponseEntity<List<Feedback>> getAllFeedbacks(
            @RequestParam(required = false) String productId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder) {

        List<Feedback> feedbacks = feedbackService.getAllFeedback(productId, rating, sortBy, sortOrder);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getFeedbackStats() {
        Optional<Map<String, Object>> statsOpt = feedbackService.getFeedbackStats();
        return statsOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}
