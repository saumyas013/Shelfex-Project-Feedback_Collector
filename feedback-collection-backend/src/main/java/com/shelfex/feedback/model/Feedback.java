package com.shelfex.feedback.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data // Lombok annotation for getters, setters, toString, equals, hashCode
@Document(collection = "feedbacks") // Maps this class to a MongoDB collection named 'feedbacks'
public class Feedback {

    @Id // Marks this field as the primary key
    private String id; // MongoDB uses String IDs by default

    private String name; // Optional
    private String email; // Optional
    private String feedbackText; // Required
    private Integer rating; // Required (1-5)
    private String productId; // To associate feedback with a product (we'll assume a dummy one for now)
    private LocalDateTime createdAt; // Timestamp of submission

    // Lombok handles constructors, getters, setters, etc.
}