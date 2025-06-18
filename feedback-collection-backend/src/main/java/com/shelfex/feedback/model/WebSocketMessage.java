package com.shelfex.feedback.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebSocketMessage {
    private String type; // e.g., "newFeedback", "statsUpdate"
    private Object payload; // The actual data (Feedback object, stats object, etc.)
}